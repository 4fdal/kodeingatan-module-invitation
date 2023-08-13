<?php

namespace Kodeingatan\Invitation\Http\Controllers;

class AccountInvitationController extends Controller
{
    public function create()
    {
        return view('invitation::pages.account.invitation.create');
    }
}
