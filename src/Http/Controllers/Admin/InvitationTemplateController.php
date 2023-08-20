<?php

namespace Kodeingatan\Invitation\Http\Controllers\Admin;

use App\Http\Controllers\BaseCRUDController;
use Illuminate\Http\Request;
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

    protected function editModelRelation($model)
    {
        return $model;
    }

    protected function getDataStore(Request $request): array
    {
        $data = $request->only(['slug', 'name']);
        $data['key'] = \Str::uuid();

        return $data;
    }

    protected function handleUpdateValidate(Request $request, $model): void
    {
        $request->validate([
            'slug' => ['required'],
            'name' => ['required'],
        ]);
    }

    protected function getDataUpdate(Request $request, $model): array
    {
        $data = $request->only(['slug', 'name']);

        return $data;
    }
}
