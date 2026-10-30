<?php

namespace App\Http\Controllers;

use App\Models\SiteVisitLead;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    /**
     * Store an inbound site visit request or callback inquiry.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:120',
            'project_name' => 'nullable|string|max:120',
            'preferred_date' => 'nullable|date',
            'time_slot' => 'nullable|string|max:50',
            'pickup_requested' => 'nullable|boolean',
            'source' => 'nullable|string|max:60',
            'message' => 'nullable|string|max:500',
        ]);

        $lead = SiteVisitLead::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'project_name' => $validated['project_name'] ?? 'General Inquiry',
            'preferred_date' => $validated['preferred_date'] ?? now()->addDay()->toDateString(),
            'time_slot' => $validated['time_slot'] ?? '11:00 AM - 01:00 PM',
            'pickup_requested' => $request->has('pickup_requested'),
            'source' => $validated['source'] ?? 'website_modal',
            'message' => $validated['message'] ?? null,
            'status' => 'new',
        ]);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Thank you! Our relationship manager will confirm your private site tour shortly.',
                'lead' => $lead,
            ]);
        }

        return back()->with('success', 'Thank you! Our relationship manager will contact you at ' . $validated['phone'] . ' shortly to confirm your visit.');
    }
}
