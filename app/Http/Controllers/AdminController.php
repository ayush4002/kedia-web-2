<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Unit;
use App\Models\Booking;
use App\Models\SiteVisitLead;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminController extends Controller
{
    /**
     * E-Commerce Real Estate Command Center.
     */
    public function dashboard(Request $request)
    {
        $projects = Project::withCount('units')->get();
        $totalUnits = Unit::count();
        $availableUnits = Unit::where('status', 'available')->count();
        $onHoldUnits = Unit::where('status', 'on_hold')->count();
        $soldUnits = Unit::where('status', 'sold')->count();

        // GMV & Financial KPIs
        $totalGMV = Unit::whereIn('status', ['sold', 'on_hold'])->sum('price_num');
        $tokenRevenue = Booking::where('payment_status', 'paid')->sum('token_amount');
        $totalBookingsCount = Booking::count();

        // Filter units by project if requested
        $selectedProjectSlug = $request->get('project', 'all');
        $unitsQuery = Unit::with('project')->latest('id');

        if ($selectedProjectSlug !== 'all') {
            $unitsQuery->whereHas('project', function ($q) use ($selectedProjectSlug) {
                $q->where('slug', $selectedProjectSlug);
            });
        }

        // Search unit code
        if ($request->filled('search')) {
            $search = $request->search;
            $unitsQuery->where(function ($q) use ($search) {
                $q->where('unit_code', 'like', "%{$search}%")
                  ->orWhere('title', 'like', "%{$search}%");
            });
        }

        $units = $unitsQuery->paginate(25);
        $recentBookings = Booking::with(['unit', 'project'])->latest()->take(10)->get();
        $recentLeads = SiteVisitLead::latest()->take(10)->get();

        return view('pages.admin.dashboard', compact(
            'projects',
            'units',
            'recentBookings',
            'recentLeads',
            'totalUnits',
            'availableUnits',
            'onHoldUnits',
            'soldUnits',
            'totalGMV',
            'tokenRevenue',
            'totalBookingsCount',
            'selectedProjectSlug'
        ));
    }

    /**
     * AJAX or Form Toggle Unit Status (Available, On Hold, Sold).
     */
    public function updateUnitStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:available,on_hold,sold'
        ]);

        $unit = Unit::findOrFail($id);
        $unit->status = $request->status;
        $unit->save();

        if ($request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => "Unit {$unit->unit_code} status updated to {$unit->status}.",
                'status' => $unit->status,
            ]);
        }

        return back()->with('success', "Unit {$unit->unit_code} status updated to {$unit->status}.");
    }

    /**
     * AJAX or Form Update Unit Price.
     */
    public function updateUnitPrice(Request $request, $id)
    {
        $request->validate([
            'price_num' => 'required|numeric|min:100000',
            'price_formatted' => 'nullable|string'
        ]);

        $unit = Unit::findOrFail($id);
        $unit->price_num = $request->price_num;
        if ($request->filled('price_formatted')) {
            $unit->price_formatted = $request->price_formatted;
        } else {
            $unit->price_formatted = '₹ ' . number_format($request->price_num / 100000, 2) . ' Lakh';
        }
        $unit->save();

        if ($request->ajax() || $request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => "Price for Unit {$unit->unit_code} updated successfully.",
                'unit' => $unit,
            ]);
        }

        return back()->with('success', "Price for Unit {$unit->unit_code} updated.");
    }

    /**
     * Add new inventory unit.
     */
    public function storeUnit(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'unit_code' => 'required|string|unique:units,unit_code',
            'title' => 'required|string',
            'type' => 'required|string',
            'status' => 'required|in:available,on_hold,sold',
            'area_sqft' => 'required|numeric',
            'plot_size_sqyd' => 'nullable|numeric',
            'bedrooms' => 'nullable|integer',
            'bathrooms' => 'nullable|integer',
            'facing' => 'nullable|string',
            'price_num' => 'required|numeric',
            'floor' => 'nullable|string',
        ]);

        $validated['price_formatted'] = '₹ ' . number_format($validated['price_num'] / 100000, 2) . ' Lakh';

        $unit = Unit::create($validated);

        return back()->with('success', "New unit {$unit->unit_code} created successfully.");
    }

    /**
     * Delete an inventory unit.
     */
    public function destroyUnit($id)
    {
        $unit = Unit::findOrFail($id);
        $code = $unit->unit_code;
        $unit->delete();

        return back()->with('success', "Unit {$code} removed from inventory.");
    }

    /**
     * Update Booking Status.
     */
    public function updateBookingStatus(Request $request, $id)
    {
        $request->validate([
            'booking_status' => 'required|in:confirmed,holding,cancelled,refunded'
        ]);

        $booking = Booking::findOrFail($id);
        $booking->booking_status = $request->booking_status;
        $booking->save();

        return back()->with('success', "Booking #{$booking->booking_id} status changed to {$booking->booking_status}.");
    }

    /**
     * Export all online booking orders to CSV.
     */
    public function exportOrders(): StreamedResponse
    {
        $fileName = 'kedia-orders-' . date('Y-m-d-His') . '.csv';
        $bookings = Booking::with(['unit', 'project'])->latest()->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$fileName\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        return response()->stream(function () use ($bookings) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Booking ID', 'Date', 'Customer Name', 'Phone', 'Email', 'Project', 'Unit Code', 'Status', 'Token Paid (INR)', 'Total Value (INR)', 'Payment Ref']);

            foreach ($bookings as $b) {
                fputcsv($handle, [
                    $b->booking_id,
                    $b->created_at->format('Y-m-d H:i'),
                    $b->customer_name,
                    $b->customer_phone,
                    $b->customer_email,
                    $b->project ? $b->project->title : 'N/A',
                    $b->unit ? $b->unit->unit_code : 'N/A',
                    $b->booking_status,
                    $b->token_amount,
                    $b->total_amount,
                    $b->transaction_ref,
                ]);
            }
            fclose($handle);
        }, 200, $headers);
    }

    /**
     * Export unit catalog to JSON or CSV.
     */
    public function exportCatalog()
    {
        $units = Unit::with('project:id,title,slug,location')->get();
        return response()->json($units, 200, ['Content-Disposition' => 'attachment; filename="kedia-inventory-catalog.json"']);
    }
}
