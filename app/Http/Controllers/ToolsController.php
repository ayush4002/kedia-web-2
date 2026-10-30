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
        $projects = Project::all();
        return view('pages.tools', compact('projects'));
    }
}
