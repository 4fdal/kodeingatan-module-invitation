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

                $invitation_template = InvitationTemplate::where('key', $invitation_template_key)->first();
                if (!isset($invitation_template)) return response()->json([
                    'errors' => null,
                    'message' => 'Invitation template tidak ditemukan',
                    'data' => null,
                ], 404);

                $table_name = $table . "_html";
                $setting_model =
                    \DB::table($table_name)->where('invitation_template_id', $invitation_template->id);
                if ($request->get('id', false)) {
                    $setting_model = $setting_model->where('id', $request->id);
                    $setting_model = $setting_model->first();
                } else {
                    $setting_model = $setting_model->get();
                }

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

        switch ($request->header('Accept')) {
            case 'application/json':

                $invitation_template = InvitationTemplate::where('key', $invitation_template_key)->first();
                if (!isset($invitation_template)) return response()->json([
                    'errors' => null,
                    'message' => 'Invitation template tidak ditemukan',
                    'data' => null,
                ], 404);

                $table_name = $table . "_html";
                $setting_builder =
                    \DB::table($table_name)->where('invitation_template_id', $invitation_template->id);

                switch ($table) {
                    case 'asset':


                        $rules = [
                            'id' => ['nullable'],
                            'name' => ['required'],
                        ];

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
                        if ($request->get('id', false)) {
                            $asset_html_builder = $setting_builder->where('id', $request->id);
                            $asset_html = $asset_html_builder->first();
                        }

                        $old_dir_path = null;
                        if (isset($asset_html)) {
                            $old_dir_path =
                                $asset_html->dir_path;
                        }

                        if ($request->get('file_zip', false)) {
                            $file_zip = $request->file_zip;
                            $file_zip_name = $file_zip['name'];
                            $file_zip_base64 = $file_zip['base64'];

                            $dir_file_path = "app/admin/invitation/template";
                            $file_zip = base64_store_file($file_zip_base64, $file_zip_name, $dir_file_path);

                            $file_zip_path = storage_path($file_zip['file_path']);
                            $zip = new ZipArchive();

                            $dir_path = $dir_file_path . "/" . substr($file_zip['file_name'], 0, strpos($file_zip['file_name'], '.'));
                            $storage_dir_path =  storage_path($dir_path);
                            if ($zip->open($file_zip_path)) {
                                $zip->extractTo($storage_dir_path);
                                $zip->close();
                                if (file_exists($file_zip_path)) unlink($file_zip_path);

                                if ($old_dir_path) delete_directory(storage_path($old_dir_path));
                            }
                        }


                        $data_result = [];

                        $id = null;
                        if (isset($asset_html)) {
                            $asset_html->name = $request->name;
                            $asset_html->updated_at = date('Y-m-d H:i:s');

                            if ($request->get('file_zip', false)) {
                                $asset_html->dir_path = $dir_path;
                            }

                            $asset_html_builder->update((array) $asset_html);
                            $data_result = $asset_html;
                        } else {
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

                    default:

                        break;
                }

                break;

            default:
                return abort(404);
                break;
        }
    }

    public function delete(Request $request, $invitation_template_key, $table)
    {
        switch ($request->header('Accept')) {
            case 'application/json':

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

                if ($validator->fails()) {
                    return response()->json([
                        'message' => 'Terjadi kesalahan penginputan data',
                        'data' => null,
                        'errors' => $validator->errors()
                    ], 422);
                }

                $setting_builder =
                    \DB::table($table_name)->where('invitation_template_id', $invitation_template->id)->where('id', $request->id);

                $setting_model = $setting_builder->first();
                if (!isset($setting_model)) return response()->json([
                    'message' => 'Data tidak ditemukan silakah ulangi kembali',
                ], '404');

                switch ($table) {
                    case 'asset':
                        $setting_builder->delete();
                        delete_directory(storage_path($setting_model->dir_path));
                        return response()->json([
                            'message' => "Delete $setting_model->name berhasil",
                        ]);
                        break;

                    default:

                        break;
                }

                break;

            default:
                return abort(404);
                break;
        }
    }
}
