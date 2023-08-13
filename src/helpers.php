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
