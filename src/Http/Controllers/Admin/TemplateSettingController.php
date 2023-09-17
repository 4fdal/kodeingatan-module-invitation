<?php

namespace Kodeingatan\Invitation\Http\Controllers\Admin;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Kodeingatan\Invitation\Http\Controllers\Controller;
use Kodeingatan\Invitation\Models\InvitationTemplate;
use ZipArchive;

class TemplateSettingController extends Controller
{
    public function index(Request $request, $invitation_template_key, $table)
    {

        switch ($request->header('Accept')) {
            case 'application/json':

                // temukan template dengan key query
                $invitation_template = InvitationTemplate::where('key', $invitation_template_key)->first();

                // jika tidak ditemukan
                if (!isset($invitation_template)) return response()->json([
                    'errors' => null,
                    'message' => 'Invitation template tidak ditemukan',
                    'data' => null,
                ], 404);

                $table_name = $table . "_html";

                // buat model setting template berdasarkan invitation template id
                $setting_model =
                    \DB::table($table_name)->where('invitation_template_id', $invitation_template->id);

                // jika id ditemukan pada request maka ambil data pada setting template yang pertama
                if ($request->get('id', false)) {
                    $setting_model = $setting_model->where('id', $request->id);
                    $setting_model = $setting_model->first();
                } else {
                    // jika tidak ditemukan id ambil semua data
                    $setting_model = $setting_model->get();
                }

                // berikan respon sesuai dengan table yang di minta, respon data berisikan data setting template sesuai dengan kondisi sebelumnya
                switch ($table) {
                    case 'asset':
                        return response()->json([
                            'message' => 'Berhasil, data ditemukan',
                            'data' => $setting_model,
                            'error' => null,
                        ], 200);
                        break;

                    default:
                        return response()->json([
                            'message' => 'Berhasil, data ditemukan',
                            'data' => $setting_model,
                            'error' => null,
                        ], 200);
                        break;
                }

                break;

            default:
                return abort(404);
                break;
        }
    }

    public function store(Request $request, $invitation_template_key, $table)
    {

        // temukan data invitation template berdasakan key
        $invitation_template = InvitationTemplate::where('key', $invitation_template_key)->first();
        if (!isset($invitation_template)) return response()->json([
            'errors' => null,
            'message' => 'Invitation template tidak ditemukan',
            'data' => null,
        ], 404);

        switch ($request->header('Accept')) {
            case 'application/json':



                $table_name = $table . "_html";

                // buat query builder terhadap setting template berdasarkan invitaion template key 
                $setting_builder =
                    \DB::table($table_name)->where('invitation_template_id', $invitation_template->id);

                // proses akan dilakukan bersarkan nama table yang diberikan
                switch ($table) {
                    case 'asset':

                        // rule validasi awal mula hanya berupa id dan name
                        // id nullable sebagai kondisi dari prosess jika ditemukan id pada request maka proses akan menuju update jika tidak ditemukan proses akan menuju insert
                        // name harus selalu ada pada setiap proses insert atau update
                        $rules = [
                            'id' => ['nullable'],
                            'name' => ['required'],
                        ];

                        // jika tidak ditemukan id pada inputan maka, rules baru akan bertambah untuk penguploadan file zip diperlukan 
                        if (!isset($request->id)) {
                            $rules = array_merge($rules, [
                                'file_zip' => ['required'],
                                'file_zip.type' => ['required', function ($key,  $value, $fail) {
                                    if ($value != 'application/zip') $fail("File upload harus berupa .zip");
                                }],
                                'file_zip.name' => ['required'],
                                'file_zip.base64' => ['required'],
                            ]);
                        }

                        $validator = Validator::make($request->all(), $rules);

                        // kembalikan respon kesalahan jika tidak sesuai dengan rule yang diberikan 
                        if ($validator->fails()) {
                            return response()->json([
                                'message' => 'Terjadi kesalahan penginputan data',
                                'data' => null,
                                'errors' => $validator->errors()
                            ], 422);
                        }

                        $name = $request->name;
                        // $asset_html_builder = $setting_builder->where('name', $name);

                        $asset_html = null;
                        // jika ditemukan id pada inputan, makan temukan data invitation template setting berdasarkan id tersebut 
                        if ($request->get('id', false)) {
                            $asset_html_builder = $setting_builder->where('id', $request->id);
                            $asset_html = $asset_html_builder->first();
                        }

                        // old dir path sebagai temp untuk penghapusan directory pada file invitaion template setting yang telah di upload sebelumnya 
                        $old_dir_path = null;
                        if (isset($asset_html)) {
                            $old_dir_path =
                                $asset_html->dir_path;
                        }

                        // jika pada permintaan terdapat penguploadan file zip maka lakukan proses dibawah ini
                        if ($request->get('file_zip', false)) {
                            $file_zip = $request->file_zip;
                            $file_zip_name = $file_zip['name'];
                            $file_zip_base64 = $file_zip['base64'];

                            // default directory path file 
                            $dir_file_path = "app/admin/invitation/template";
                            // simpan data file_zip dengan encode64 kedalam $directory path
                            $file_zip = base64_store_file($file_zip_base64, $file_zip_name, $dir_file_path);

                            // file zip path menuntukan path file zip yang telah berhasil di upload
                            $file_zip_path = storage_path($file_zip['file_path']);
                            $zip = new ZipArchive();

                            // $dir_path sebelumnya 'app/admin/invitation/template/{nama_file_zip.zip}' masih memiliki format 
                            $dir_path = $dir_file_path . "/" . substr($file_zip['file_name'], 0, strpos($file_zip['file_name'], '.'));
                            // $dir_path setelah format dihilangkan 'app/admin/invitation/template/{nama_file_zip}'  

                            $storage_dir_path =  storage_path($dir_path);

                            // buka file path $dir_path = 'app/admin/invitation/template/{nama_file_zip.zip}' yang memiliki format 
                            if ($zip->open($file_zip_path)) {

                                $zip->extractTo($storage_dir_path);
                                // extract file zip path 'app/admin/invitation/template/{nama_file_zip.zip}' dan sekarang berada pada directory 'app/admin/invitation/template/{nama_directory_zip}' 
                                $zip->close();

                                // hapus file zip sebelumnya
                                if (file_exists($file_zip_path)) unlink($file_zip_path);

                                // hapus directory sebelmunya jika ada
                                if ($old_dir_path) delete_directory(storage_path($old_dir_path));
                            }
                        }


                        $data_result = [];

                        $id = null;
                        // jika asset html ditemukan, maka lakukan update pada data dan hasil dari perubahan simpan kedalam $data_result
                        if (isset($asset_html)) {
                            $asset_html->name = $request->name;
                            $asset_html->updated_at = date('Y-m-d H:i:s');

                            if ($request->get('file_zip', false)) {
                                $asset_html->dir_path = $dir_path;
                            }

                            $asset_html_builder->update((array) $asset_html);
                            $data_result = $asset_html;
                        } else {
                            // jika tidak adat asset html ditemukan maka buat asset asset html baru dan hasil dari pembuatan beserta id simpan kedalam $data_result
                            $data_create = [
                                'invitation_template_id' => $invitation_template->id,
                                'name' => $name,
                                'dir_path' => $dir_path,
                                'created_at' => date('Y-m-d H:i:s'),
                                'updated_at' => date('Y-m-d H:i:s'),
                            ];
                            $id  = $setting_builder->insertGetId($data_create);
                            $data_create['id'] = $id;
                            $data_result = $data_create;
                        }

                        return response()->json([
                            'message' => 'Berhasil, memperbarui data',
                            'data' => $data_result,
                            'errors' => null,
                        ]);

                        break;

                    case 'wrap':
                        // rule validasi awal mula hanya berupa id dan name
                        // id nullable sebagai kondisi dari prosess jika ditemukan id pada request maka proses akan menuju update jika tidak ditemukan proses akan menuju insert
                        // name harus selalu ada pada setiap proses insert atau update
                        $rules = [
                            'id' => ['nullable'],
                            'name' => ['required'],
                            'upperbody' => ['required'],
                            'lowerbody' => ['required'],
                        ];


                        $validator = Validator::make($request->all(), $rules);

                        // kembalikan respon kesalahan jika tidak sesuai dengan rule yang diberikan 
                        if ($validator->fails()) {
                            return response()->json([
                                'message' => 'Terjadi kesalahan penginputan data',
                                'data' => null,
                                'errors' => $validator->errors()
                            ], 422);
                        }


                        // buat query builder berdasrkan invitation template id dan id dari data invitation templat settings
                        $setting_builder =
                            \DB::table($table_name)->where('invitation_template_id', $invitation_template->id);

                        // jika data invitation template setting beradaskan id tidak ditemukan munculkan pesan kesalahan 
                        $has_update = false;
                        $setting_model = null;
                        if ($request->get('id', false)) {
                            $setting_builder = $setting_builder->where('id', $request->id);
                            $setting_model = $setting_builder->first();
                            if (!isset($setting_model)) return response()->json([
                                'message' => 'Data tidak ditemukan silakah ulangi kembali',
                            ], '404');

                            $has_update = true;
                        }

                        $data_result = null;
                        $message = null;

                        if ($has_update) {
                            $setting_model->updated_at = date('Y-m-d H:i:s');
                            $setting_model->upperbody_html = $request->upperbody;
                            $setting_model->lowerbody_html = $request->lowerbody;
                            $setting_builder->update((array) $setting_model);

                            $message = 'Berhasil memperbarui data wrap html ';
                            $data_result = (array) $setting_model;
                        } else {
                            $timestamp = date('Y-m-d H:i:s');
                            $data_create = [
                                'invitation_template_id' => $invitation_template->id,
                                'name' => $request->name,
                                'upperbody_html' => $request->upperbody,
                                'lowerbody_html' => $request->lowerbody,
                                'created_at' => $timestamp,
                                'updated_at' => $timestamp
                            ];
                            $id = $setting_builder->insertGetId($data_create);
                            $data_create['id'] = $id;

                            $message = 'Berhasil menambahkan data wrap html baru';
                            $data_result = $data_create;
                        }

                        return response()->json([
                            'message' => $message,
                            'data' => $data_result,
                            'errors' => null
                        ]);

                    default:

                        // rule validasi awal mula hanya berupa id dan name
                        // id nullable sebagai kondisi dari prosess jika ditemukan id pada request maka proses akan menuju update jika tidak ditemukan proses akan menuju insert
                        // name harus selalu ada pada setiap proses insert atau update
                        $rules = [
                            'id' => ['nullable'],
                            'name' => ['required'],
                            'html' => ['required'],
                            'input_config' => ['nullable'],
                        ];


                        $validator = Validator::make($request->all(), $rules);

                        // kembalikan respon kesalahan jika tidak sesuai dengan rule yang diberikan 
                        if ($validator->fails()) {
                            return response()->json([
                                'message' => 'Terjadi kesalahan penginputan data',
                                'data' => null,
                                'errors' => $validator->errors()
                            ], 422);
                        }


                        // buat query builder berdasrkan invitation template id dan id dari data invitation templat settings
                        $setting_builder =
                            \DB::table($table_name)->where('invitation_template_id', $invitation_template->id);

                        // jika data invitation template setting beradaskan id tidak ditemukan munculkan pesan kesalahan 
                        $has_update = false;
                        $setting_model = null;
                        if ($request->get('id', false)) {
                            $setting_builder = $setting_builder->where('id', $request->id);
                            $setting_model = $setting_builder->first();
                            if (!isset($setting_model)) return response()->json([
                                'message' => 'Data tidak ditemukan silakah ulangi kembali',
                            ], '404');

                            $has_update = true;
                        }

                        $input_config = $request->get('input_config', '{}');

                        $data_result = null;
                        $message = null;

                        if ($has_update) {
                            $setting_model->updated_at = date('Y-m-d H:i:s');
                            $setting_model->name = $request->name;
                            $setting_model->html = $request->html;
                            $setting_model->input_config = $input_config;
                            $setting_builder->update((array) $setting_model);

                            $message = "Berhasil memperbarui data $table html ";
                            $data_result = (array) $setting_model;
                        } else {
                            $timestamp = date('Y-m-d H:i:s');
                            $data_create = [
                                'invitation_template_id' => $invitation_template->id,
                                'name' => $request->name,
                                'html' => $request->html,
                                'input_config' => $input_config,
                                'created_at' => $timestamp,
                                'updated_at' => $timestamp
                            ];
                            $id = $setting_builder->insertGetId($data_create);
                            $data_create['id'] = $id;

                            $message = "Berhasil menambahkan data $table html baru";
                            $data_result = $data_create;
                        }

                        return response()->json([
                            'message' => $message,
                            'data' => $data_result,
                            'errors' => null
                        ]);

                        break;
                }

                break;

            default:
                return abort(404);
                break;
        }
    }

    public function show(Request $request, $invitation_template_key, $table)
    {

        // temukan invitation template berdasarkan key 
        $invitation_template = InvitationTemplate::where('key', $invitation_template_key)->first();
        if (!isset($invitation_template)) return response()->json([
            'errors' => null,
            'message' => 'Invitation template tidak ditemukan',
            'data' => null,
        ], 404);

        $table_name = $table . "_html";

        $validator = Validator::make($request->all(), [
            'wrap_id' => ['required', 'exists:wrap_html,id'],
            'id' => ['nullable', "exists:$table_name,id"],
        ]);

        // jika tidak ditemukan id pada requiest munculkan pesan kesalahan dan data tidak sama dengan table bbersangkutan
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Terjadi kesalahan penginputan data',
                'data' => null,
                'errors' => $validator->errors()
            ], 422);
        }

        $wrap_html_model = \DB::table('wrap_html')->where('id', $request->wrap_id)->first();

        // buat query builder berdasrkan invitation template id dan id dari data invitation templat settings
        $content_builder =
            \DB::table($table_name)->where('invitation_template_id', $invitation_template->id)->where('id', $request->id);

        // jika data invitation template setting beradaskan id tidak ditemukan munculkan pesan kesalahan 
        $content_model = $content_builder->first();
        if (!isset($content_model)) return response()->json([
            'message' => 'Data tidak ditemukan silakah ulangi kembali',
        ], '404');



        switch ($request->header('Accept')) {
            case 'application/json':



                switch ($table) {

                    default:
                        return response()->json([
                            'message' => 'Data tidak ditemukan',
                            'errors' => null,
                            'data' => null,
                        ], 404);
                }

                break;

            default:

                switch ($table) {
                    case 'wrap':

                        $upperbody_html = $wrap_html_model->upperbody_html;
                        $lowerbody_html = $wrap_html_model->lowerbody_html;
                        $_html = "{$upperbody_html} {$lowerbody_html}";

                        return response($_html);

                    default:

                        $upperbody_html = $wrap_html_model->upperbody_html;
                        $lowerbody_html = $wrap_html_model->lowerbody_html;

                        $input_config = json_decode($content_model->input_config, true);
                        $content_html = $content_model->html;

                        $str_arr_searches = [];
                        $str_arr_replaces = [];
                        foreach ($input_config['input_configs'] as $index => $input) {
                            $value = null;
                            switch ($input['type']) {
                                case 'params':
                                    $value = $request->get($input['name'], $input['default_value']);
                                    break;
                                default:
                                    $value = $input['value'];
                                    break;
                            }

                            $str_arr_searches[$index] = base64_decode($input_config['input_matches'][$index]);
                            $str_arr_replaces[$index] = $value;
                        }

                        $content_html = str_replace($str_arr_searches, $str_arr_replaces, $content_html);

                        $_html = "{$upperbody_html} {$content_html} {$lowerbody_html}";

                        return response($_html);
                }

                break;
        }
    }

    public function delete(Request $request, $invitation_template_key, $table)
    {
        switch ($request->header('Accept')) {
            case 'application/json':

                // temukan invitation template berdasarkan key 
                $invitation_template = InvitationTemplate::where('key', $invitation_template_key)->first();
                if (!isset($invitation_template)) return response()->json([
                    'errors' => null,
                    'message' => 'Invitation template tidak ditemukan',
                    'data' => null,
                ], 404);

                $table_name = $table . "_html";

                $validator = Validator::make($request->all(), [
                    'id' => ['required', "exists:$table_name,id"],
                ]);

                // jika tidak ditemukan id pada requiest munculkan pesan kesalahan dan data tidak sama dengan table bbersangkutan
                if ($validator->fails()) {
                    return response()->json([
                        'message' => 'Terjadi kesalahan penginputan data',
                        'data' => null,
                        'errors' => $validator->errors()
                    ], 422);
                }

                // buat query builder berdasrkan invitation template id dan id dari data invitation templat settings
                $setting_builder =
                    \DB::table($table_name)->where('invitation_template_id', $invitation_template->id)->where('id', $request->id);

                // jika data invitation template setting beradaskan id tidak ditemukan munculkan pesan kesalahan 
                $setting_model = $setting_builder->first();
                if (!isset($setting_model)) return response()->json([
                    'message' => 'Data tidak ditemukan silakah ulangi kembali',
                ], '404');

                switch ($table) {
                    case 'asset':
                        // hapus data invitation template setting
                        $setting_builder->delete();

                        // hapus directory invitation template setting
                        delete_directory(storage_path($setting_model->dir_path));
                        return response()->json([
                            'message' => "Delete $setting_model->name berhasil",
                        ]);


                    default:

                        // hapus data invitation template setting
                        $setting_builder->delete();
                        return response()->json([
                            'message' => "Delete $setting_model->name berhasil",
                        ]);
                }

                break;

            default:
                return abort(404);
                break;
        }
    }

    public function asset(Request $request)
    {
        $rules = [
            'file_path' => ['required'],
            'dir_path' => ['required', 'exists:asset_html,dir_path']
        ];


        $invitation_template_path = "admin/invitation/template";
        if (substr($request->get('dir_path', ""), 0, strlen($invitation_template_path)) == $invitation_template_path) {
            $rules['dir_path'] = ['required'];
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Terjadi kesalahan penginputan data',
                'data' => null,
                'errors' => $validator->errors()
            ], 422);
        }

        $dir_path = $request->dir_path;
        if (strpos($dir_path, "app/") !== false) {
            $dir_path = substr($dir_path, strlen("app/"));
        }

        $file_path = $dir_path . "" . $request->file_path;
        $file_path = str_replace(["../", "./"], "/", $file_path);

        return \Storage::response($file_path);
    }

    public function assetStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file_upload' => ['required', 'file'],
            'table' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Terjadi kesalahan penginputan data',
                'data' => null,
                'errors' => $validator->errors()
            ], 422);
        }

        $default_dir_path = "admin/invitation/template";
        $table = str_replace(["../", './'], '', $request->table) . "_html";

        // simpan file ke storage 
        $dir_path = $default_dir_path . "/{$table}";
        $file_path = $request->file('file_upload')->store($dir_path);

        // dir1/dir2/filename.ext
        // tampilkan file path
        $dir_path = substr($file_path, 0, strrpos($file_path, "/")); // output : dir1/dir2
        $file_path = route('admin.invitation.asset', [
            'dir_path' =>  $dir_path,
            'file_path' => substr($file_path, strlen($dir_path)), //  output : /filename.ext
        ]); // output : https://host/admin/invitation/template/asset?dir_path=dir1/dir2&file_path=/filename.ext
        $file_path = substr($file_path, (strpos($file_path, $default_dir_path) ?? 1) - 1); // output : /admin/invitation/template/asset?dir_path=dir1/dir2&file_path=/filename.ext

        return response()->json([
            'message' => 'success',
            'data' => compact('file_path'),
            'error' => null,
        ]);
    }
}
