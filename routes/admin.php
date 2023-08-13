<?php

use App\Utils\KiAdminRoute;
use Illuminate\Support\Facades\Route;
use Kodeingatan\Invitation\Http\Controllers\Admin\InvitationTemplateController;

Route::middleware('web', 'auth', 'permission:admin')->prefix('/admin')->as('admin.')->group(function () {
    Route::prefix('/invitation')->as('invitation.')->group(function () {
        KiAdminRoute::makeCRUD(InvitationTemplateController::class, "/template", "template.");
    });
});
