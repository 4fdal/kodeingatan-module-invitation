<?php

namespace Kodeingatan\Invitation\Http\Controllers;

class LandingPageController extends Controller
{
    public function index()
    {
        return view('invitation::pages.welcome');
    }
}
