<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocaleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = Session::get('locale', Session::get('app_locale'));
        if ($locale && in_array($locale, ['en', 'hi'])) {
            App::setLocale($locale);
        }

        return $next($request);
    }
}
