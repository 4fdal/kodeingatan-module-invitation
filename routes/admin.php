<?php

use App\Utils\KiAdminRoute;
use Illuminate\Support\Facades\Route;
use Kodeingatan\Invitation\Http\Controllers\Admin\InvitationTemplateController;
use Kodeingatan\Invitation\Http\Controllers\Admin\TemplateSettingController;

Route::middleware('web', 'auth', 'permission:admin')->prefix('/admin')->as('admin.')->group(function () {
    Route::prefix('/invitation')->as('invitation.')->group(function () {
        KiAdminRoute::makeCRUD(InvitationTemplateController::class, "/template", "template.");
        Route::prefix('/template/settings/{invitation_template_key}/{table}')->as('template.setting.')->group(function () {
            Route::get('/', [TemplateSettingController::class, 'index'])->name('index');
            Route::post('/', [TemplateSettingController::class, 'store'])->name('store');
        });
    });
});
