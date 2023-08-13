<?php

use Illuminate\Support\Facades\Route;
use Kodeingatan\Invitation\Http\Controllers\AccountInvitationController;
use Kodeingatan\Invitation\Http\Controllers\InvitationController;
use Kodeingatan\Invitation\Http\Controllers\LandingPageController;

Route::get('/invitation/assets', [InvitationController::class, 'assets'])->name('invitation.assets');

Route::group([
    'prefix' => config('invitation.landing_page.prefix'),
    'as' => 'invitation.',
], function () {

    Route::as('landing_page.')->group(function () {
        Route::get("/", [LandingPageController::class, 'index'])->name('index');
    });

    Route::prefix('account')->as('account.')->group(function () {
        Route::prefix('invitation')->as('invitation.')->group(function () {
            Route::get('/create', [AccountInvitationController::class, 'create'])->name('create');
        });
    });
});
