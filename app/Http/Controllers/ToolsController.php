<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ToolsController extends Controller
{
    /**
     * Interactive Financial & Estimation Suite.
     */
    public function index()
    {
        $projects = Project::select('id', 'title', 'slug', 'price_start_num', 'location')->get();
        return view('pages.tools', compact('projects'));
    }
}
