<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Unit;

class HomeController extends Controller
{
    public function index()
    {
        // Featured Developments
        $featuredProjects = Project::whereIn('slug', [
            'kedias-landmark',
            'nikunj-villas',
            'kedias-atulyam',
            'kedias-tulsi',
            'jagannathpuri',
            'kedia-aravali'
        ])->get();

        if ($featuredProjects->isEmpty()) {
            $featuredProjects = Project::take(6)->get();
        }

        // Projects for Blueprint switcher
        $allProjects = Project::all();

        // Catalog Units for Living Blueprint
        $units = Unit::all();

        // Ticker Ribbon Items
        $tickerItems = [
            ['label' => __('messages.ticker_1'), 'img' => '/media/img/2025/04/DJI_0788-3-scaled-900.webp'],
            ['label' => __('messages.ticker_2'), 'img' => '/media/img/2025/04/DSC07902-900.webp'],
            ['label' => __('messages.ticker_3'), 'img' => '/media/img/2025/04/DJI_0744-scaled-900.webp'],
            ['label' => __('messages.ticker_4'), 'img' => '/media/img/2025/04/LANDMARK-001-900.webp'],
            ['label' => __('messages.ticker_5'), 'img' => '/media/img/2025/04/DSC07808-900.webp'],
            ['label' => __('messages.ticker_6'), 'img' => '/media/img/2025/04/DJI_0791-900.webp'],
        ];

        // Executive Leadership
        $leaders = [
            [
                'name' => 'Mr. Rajendra Kedia',
                'role' => 'Founder & Chairman',
                'exp' => 'Since 1980 · 4+ Decades of Footprints',
                'bio' => 'Laid the foundation in 1980 and pioneered master land development in Jaipur, delivering over 200+ residential and commercial landmarks.',
                'photo' => '/media/img/2021/04/WhatsApp-Image-2021-04-09-at-12.01.29-PM.webp'
            ],
            [
                'name' => 'Mr. Saurabh Kedia',
                'role' => 'Director',
                'exp' => "Master's from Bhawani Niketan · 10+ Yrs Exp",
                'bio' => "Hands-on leader setting the highest standards for construction quality, engineering rigor, and prompt handovers across all active Jaipur schemes.",
                'photo' => '/media/img/2021/04/WhatsApp-Image-2021-04-09-at-12.01.28-PM-1.webp'
            ],
            [
                'name' => 'Mr. Gaurav Kedia',
                'role' => 'Chief Executive Officer',
                'exp' => "B.Com from Commerce College · 8+ Yrs Exp",
                'bio' => "The behind-the-scenes strategist studying buyer demographics to create highly desirable and functional modern residences.",
                'photo' => '/media/img/2021/04/WhatsApp-Image-2021-04-09-at-12.01.28-PM.webp'
            ]
        ];

        return view('pages.home', compact('featuredProjects', 'allProjects', 'units', 'tickerItems', 'leaders'));
    }
}
