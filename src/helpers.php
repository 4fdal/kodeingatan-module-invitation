<?php


if (!function_exists('invitation_asset')) {
    function invitation_asset($path)
    {
        return route('invitation.assets', compact('path'));
    }
}

if (!function_exists('module_invitation_path')) {
    function module_invitation_path($path)
    {
        return dirname(__DIR__, 1) . $path;
    }
}


if (!function_exists('text_to_input_object')) {
    function text_to_input_object($text)
    {
        preg_match_all('/\\{\\{[^}]*\\}\\}/i', $text, $matches);
        $input_configs = [];
        $input_matches = [];
        $input_names = [];

        $index = 0;
        foreach ($matches as $matche) {
            foreach ($matche as $str_json) {

                $input_config =
                    json_decode(substr($str_json, 1, strlen($str_json) - 2), true);

                $input_configs[$index] = $input_config;
                $input_matches[$index] = base64_encode($str_json);
                $input_names[$index] = $input_config['name'] ?? null;

                $index++;
            }
        }

        return compact('input_configs', 'input_matches', 'input_names');
    }
}
