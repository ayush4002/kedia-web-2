<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Models\Project;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    /**
     * Step 1 - 4: E-Commerce Style Booking Checkout View.
     */
    public function checkout($unitCode)
    {
        $unit = Unit::with('project')
            ->where('unit_code', $unitCode)
            ->orWhere('id', $unitCode)
            ->firstOrFail();

        if ($unit->status === 'sold') {
            return redirect()->route('units.show', $unit->unit_code)
                ->with('error', 'This unit has already been reserved or sold.');
        }

        $pricing = $unit->computePricing();

        return view('pages.booking.checkout', compact('unit', 'pricing'));
    }

    /**
     * Process Token Booking and Simulate Payment Gateway (Test Mode).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_id' => 'required|exists:units,id',
            'customer_name' => 'required|string|max:120',
            'customer_email' => 'required|email|max:120',
            'customer_phone' => 'required|string|max:20',
            'customer_pan' => 'nullable|string|max:20',
            'customer_aadhaar' => 'nullable|string|max:20',
            'customer_city' => 'nullable|string|max:80',
            'payment_method' => 'required|string|in:upi,card,netbanking,neft',
            'notes' => 'nullable|string|max:500',
        ]);

        $unit = Unit::with('project')->findOrFail($validated['unit_id']);

        if ($unit->status === 'sold') {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, this unit was just sold or reserved by another buyer.'
            ], 422);
        }

        $pricing = $unit->computePricing();
        $bookingId = 'KB-' . strtoupper(Str::random(7));

        // Create booking record
        $booking = Booking::create([
            'booking_id' => $bookingId,
            'unit_id' => $unit->id,
            'project_id' => $unit->project_id,
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'customer_pan' => $validated['customer_pan'] ?? 'XXXXX0000X',
            'customer_aadhaar' => $validated['customer_aadhaar'] ?? 'XXXX-XXXX-0000',
            'customer_city' => $validated['customer_city'] ?? 'Jaipur, Rajasthan',
            'token_amount' => $pricing['token_amount'],
            'total_amount' => $pricing['grand_total'],
            'payment_status' => 'paid',
            'payment_method' => $validated['payment_method'],
            'transaction_ref' => 'TXN-' . strtoupper(Str::random(10)),
            'booking_status' => 'confirmed',
            'cost_breakdown' => $pricing,
            'payment_schedule' => [
                ['milestone' => 'Token Advance Booking', 'percentage' => 5, 'amount' => $pricing['token_amount'], 'status' => 'Paid', 'due_date' => now()->format('Y-m-d')],
                ['milestone' => 'On Execution of Agreement to Sale (30 Days)', 'percentage' => 20, 'amount' => round($pricing['grand_total'] * 0.20), 'status' => 'Upcoming', 'due_date' => now()->addDays(30)->format('Y-m-d')],
                ['milestone' => 'On Foundation & Plinth Completion', 'percentage' => 35, 'amount' => round($pricing['grand_total'] * 0.35), 'status' => 'Upcoming', 'due_date' => now()->addDays(90)->format('Y-m-d')],
                ['milestone' => 'On Superstructure & Internal Plaster', 'percentage' => 30, 'amount' => round($pricing['grand_total'] * 0.30), 'status' => 'Upcoming', 'due_date' => now()->addDays(180)->format('Y-m-d')],
                ['milestone' => 'On Registry & Possession Handover', 'percentage' => 10, 'amount' => round($pricing['grand_total'] * 0.10) - $pricing['token_amount'], 'status' => 'Upcoming', 'due_date' => now()->addDays(270)->format('Y-m-d')],
            ],
            'notes' => $validated['notes'] ?? 'Online E-commerce reservation via Kedia Portal',
        ]);

        // Mark unit as on_hold or sold
        $unit->status = 'on_hold';
        $unit->save();

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'redirect_url' => route('booking.confirmation', ['bookingId' => $booking->booking_id]),
                'booking' => $booking,
            ]);
        }

        return redirect()->route('booking.confirmation', ['bookingId' => $booking->booking_id]);
    }

    /**
     * Display Booking Confirmation and Downloadable Receipt.
     */
    public function confirmation($bookingId)
    {
        $booking = Booking::with(['unit', 'project'])
            ->where('booking_id', $bookingId)
            ->firstOrFail();

        return view('pages.booking.confirmation', compact('booking'));
    }
}
