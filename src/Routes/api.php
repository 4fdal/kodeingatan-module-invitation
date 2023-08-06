<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => config('invitation.prefix') . "/api",
    'as' => 'invitation.api.',
], function () {
});
