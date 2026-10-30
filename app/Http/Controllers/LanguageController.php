<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
    /**
     * Switch application language between English ('en') and Hindi ('hi').
     */
    public function switch($locale, Request $request)
    {
        if (in_array($locale, ['en', 'hi'])) {
            $request->session()->put('app_locale', $locale);
            app()->setLocale($locale);
        }

        return redirect()->back();
    }
}
