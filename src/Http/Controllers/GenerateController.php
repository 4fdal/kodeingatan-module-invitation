<?php

namespace Kodeingatan\Invitation\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GenerateController extends Controller
{
    public function textToInputObject(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'text' => ['required']
        ]);

        if ($validator->fails()) {
            if ($request->header('Accept') == 'application/json') {
                return response()->json([
                    'message' => 'Terjadi kesalahan penginputan data',
                    'data' => null,
                    'errors' => $validator->errors()
                ], 422);
            } else {
                return redirect()->back()->withInput($request->all())->with($validator->errors());
            }
        }

        $input_object = text_to_input_object($request->text);

        if ($request->header('Accept') == 'application/json') {
            return response()->json([
                'message' => "Berhasil",
                'data' => (object) $input_object,
                'errors' => null,
            ]);
        }
    }
}
