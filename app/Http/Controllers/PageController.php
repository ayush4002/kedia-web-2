<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * About Kedia Builders & Colonizers (Founders, Vision, Mission, Why Invest).
     */
    public function about()
    {
        $leadership = [
            [
                'name' => 'Mr Rajendra Kedia',
                'role' => 'Founder & Chairman',
                'tenure' => 'Pioneering since 1980 (4+ Decades)',
                'bio' => 'Laid the bedrock of modern colonization in Jaipur. Over four decades, Mr. Rajendra Kedia has guided the development of 200+ landmark townships with unwavering integrity and architectural foresight.',
                'image' => '/assets/about-chairperson.png',
            ],
            [
                'name' => 'Mr Saurabh Kedia',
                'role' => 'Director',
                'tenure' => '10+ Years in Infrastructure',
                'bio' => 'Master\'s from Bhawani Niketan. Hands-on visionary who leads project engineering from the ground up, enforcing world-class quality benchmarks and modern construction standards.',
                'image' => '/assets/director.png',
            ],
            [
                'name' => 'Mr Gaurav Kedia',
                'role' => 'Chief Executive Officer',
                'tenure' => '8+ Years in Market Architecture',
                'bio' => 'B.Com from Commerce College. Mastermind of consumer-centric architecture, brand trust, and digital transformation in luxury Rajasthan residential communities.',
                'image' => '/assets/ceo.png',
            ]
        ];

        return view('pages.about', compact('leadership'));
    }

    /**
     * Visual Archives & Project Gallery.
     */
    public function gallery()
    {
        $projects = Project::all();
        return view('pages.gallery', compact('projects'));
    }

    /**
     * Dedicated NRI Investment Desk.
     */
    public function nri()
    {
        return view('pages.nri');
    }

    /**
     * Careers at Kedia Builders.
     */
    public function careers()
    {
        return view('pages.careers');
    }

    /**
     * Contact Headquarters & Site Offices.
     */
    public function contact()
    {
        return view('pages.contact');
    }

    /**
     * Legal, RERA & Privacy Disclosures.
     */
    public function legal()
    {
        return view('pages.legal');
    }
}
