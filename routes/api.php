<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => ['api'],
    'prefix' => config('invitation.api.prefix'),
    'as' => 'invitation.api.',
], function () {
});
