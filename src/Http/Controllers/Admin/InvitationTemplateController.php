<?php

namespace Kodeingatan\Invitation\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseCRUDController;
use Inertia\Inertia;
use Kodeingatan\Invitation\Models\InvitationTemplate;

class InvitationTemplateController extends BaseCRUDController
{
    protected function getBaseModelClassName(): string
    {
        return InvitationTemplate::class;
    }

    protected function getBaseInertiaDirPath(): string
    {
        return "Admin/Template/";
    }

    protected function getAsRouteGroupName(): string
    {
        return "invitation.template.";
    }

    protected function handleStoreValidate(Request $request): void
    {
        $request->validate([]);
    }

    protected function getDataStore(Request $request): array
    {
        $data = $request->only(['name', 'guard_name', 'allow_pathname']);
        if ($request->allow_methods) $data['allow_methods'] = json_encode($request->allow_methods);

        return $data;
    }

    protected function handleUpdateValidate(Request $request, $model): void
    {
        $request->validate([]);
    }

    protected function getDataUpdate(Request $request, $model): array
    {
        $data = $request->only(['name', 'guard_name', 'allow_pathname']);
        if ($request->allow_methods) $data['allow_methods'] = json_encode($request->allow_methods);

        return $data;
    }
}
