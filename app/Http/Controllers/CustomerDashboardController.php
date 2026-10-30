<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Unit;
use App\Models\Project;
use Illuminate\Http\Request;

class CustomerDashboardController extends Controller
{
    /**
     * Customer Portal & Holding Dashboard.
     */
    public function index(Request $request)
    {
        // For demonstration, retrieve the most recent booking or query by phone/email if supplied
        $search = $request->get('search');
        $query = Booking::with(['unit', 'project'])->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_phone', 'like', "%{$search}%")
                  ->orWhere('customer_email', 'like', "%{$search}%")
                  ->orWhere('booking_id', 'like', "%{$search}%");
            });
        }

        $bookings = $query->take(5)->get();
        $primaryBooking = $bookings->first();

        // Sample construction milestone track
        $constructionTimeline = [
            ['phase' => 'JDA Sanction & Land Clearance', 'progress' => 100, 'date' => 'Completed - Jan 2025', 'status' => 'done'],
            ['phase' => 'Sub-structure & Raft Foundation', 'progress' => 100, 'date' => 'Completed - Apr 2025', 'status' => 'done'],
            ['phase' => 'Superstructure RCC Framing', 'progress' => 85, 'date' => 'In Progress - Oct 2026', 'status' => 'current'],
            ['phase' => 'Internal Finishing & Jaali Facade', 'progress' => 20, 'date' => 'Upcoming - Mar 2027', 'status' => 'pending'],
            ['phase' => 'Possession & RERA Completion Handover', 'progress' => 0, 'date' => 'Target - Dec 2027', 'status' => 'pending'],
        ];

        return view('pages.customer.dashboard', compact('bookings', 'primaryBooking', 'constructionTimeline'));
    }
}
