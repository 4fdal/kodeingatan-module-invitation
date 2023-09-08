<?php

use App\Utils\KiAdminRoute;
use Illuminate\Support\Facades\Route;
use Kodeingatan\Invitation\Http\Controllers\Admin\InvitationTemplateController;
use Kodeingatan\Invitation\Http\Controllers\Admin\TemplateSettingController;
use Kodeingatan\Invitation\Http\Controllers\GenerateController;

Route::middleware('web', 'auth', 'permission:admin')->prefix('/admin')->as('admin.')->group(function () {
    Route::prefix('/invitation')->as('invitation.')->group(function () {
        KiAdminRoute::makeCRUD(InvitationTemplateController::class, "/template", "template.");

        Route::prefix('generate')->as('generate.')->group(function () {
            Route::post("/text/to/input-object", [GenerateController::class, 'textToInputObject'])->name('text.to.input-object');
        });

        Route::get('/template/asset', [TemplateSettingController::class, 'asset'])->name('asset');
        Route::post('/template/asset', [TemplateSettingController::class, 'assetStore'])->name('asset.store');
        Route::prefix('/template/settings/{invitation_template_key}/{table}')->as('template.setting.')->group(function () {
            Route::get('/', [TemplateSettingController::class, 'index'])->name('index');
            Route::get('/show', [TemplateSettingController::class, 'show'])->name('show');
            Route::post('/', [TemplateSettingController::class, 'store'])->name('store');
            Route::delete('/', [TemplateSettingController::class, 'delete'])->name('delete');
        });
    });
});
