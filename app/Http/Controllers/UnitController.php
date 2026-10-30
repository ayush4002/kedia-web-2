<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Models\Project;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    /**
     * Display a specific unit product page with real-time price sheet, specs, and booking CTA.
     */
    public function show($unitCode)
    {
        $unit = Unit::with('project')
            ->where('unit_code', $unitCode)
            ->orWhere('id', $unitCode)
            ->firstOrFail();

        $pricing = $unit->computePricing();

        $similarUnits = Unit::where('project_id', $unit->project_id)
            ->where('id', '!=', $unit->id)
            ->where('status', 'available')
            ->take(4)
            ->get();

        return view('pages.units.show', compact('unit', 'pricing', 'similarUnits'));
    }
}
