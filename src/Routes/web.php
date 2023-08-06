<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => config('invitation.prefix'),
    'as' => 'invitation.',
], function () {
});
