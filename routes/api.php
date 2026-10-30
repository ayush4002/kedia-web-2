<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Unit;
use App\Models\Project;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/units', function (Request $request) {
    $query = Unit::with('project');
    if ($request->filled('project_id')) {
        $query->where('project_id', $request->project_id);
    }
    if ($request->filled('status')) {
        $query->where('status', $request->status);
    }
    return response()->json($query->get());
});

Route::get('/units/{code}', function ($code) {
    $unit = Unit::with('project')->where('unit_code', $code)->orWhere('id', $code)->firstOrFail();
    return response()->json([
        'unit' => $unit,
        'pricing' => $unit->computePricing()
    ]);
});
