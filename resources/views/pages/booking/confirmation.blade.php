@extends('layouts.app')

@section('title', 'Booking Confirmed #' . $booking->booking_id . ' | Kedia Builders & Colonizers')

@section('content')

<section class="py-16 bg-[#FAF8F5]">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Success Banner -->
        <div class="text-center mb-8 space-y-3">
            <div class="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-500/20">
                ✓
            </div>
            <span class="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">Provisional Allotment Confirmed</span>
            <h1 class="font-serif text-3xl sm:text-4xl font-bold text-[#0E1520]">
                Congratulations, {{ $booking->customer_name }}!
            </h1>
            <p class="text-xs sm:text-sm text-[#0E1520]/70 max-w-md mx-auto">
                Your unit reservation has been successfully locked into our central inventory. An official confirmation email with payment receipt has been dispatched to <strong>{{ $booking->customer_email }}</strong>.
            </p>
        </div>

        <!-- Official Allotment Receipt Card (Printable) -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-[#0E1520]/10 shadow-2xl space-y-8 relative overflow-hidden" id="printableReceipt">
            
            <!-- Watermark / Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0E1520]/10">
                <div>
                    <img src="/assets/logo-navy.png" alt="Kedia Builders" class="h-10 w-auto mb-2" onerror="this.src='/assets/logo-white.png'; this.classList.add('invert');">
                    <div class="text-[11px] font-mono text-[#0E1520]/60">Kedia Builders &amp; Colonizers · Jaipur, Rajasthan</div>
                </div>
                <div class="text-left sm:text-right font-mono text-xs">
                    <div class="text-[#0E1520]/50 uppercase text-[10px]">Booking Reference</div>
                    <div class="text-base font-bold text-[#0E1520] tracking-wider">{{ $booking->booking_id }}</div>
                    <div class="text-[10px] text-emerald-700 font-semibold mt-0.5">● Payment Status: PAID (TEST MODE)</div>
                </div>
            </div>

            <!-- Booking & Unit Summary Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
                <div>
                    <div class="text-[#0E1520]/50 text-[10px] uppercase">Property Unit</div>
                    <div class="font-bold text-sm text-[#0E1520] mt-0.5">{{ $booking->unit->title ?? 'Luxury Residence' }} ({{ $booking->unit->unit_code ?? 'P-11' }})</div>
                </div>
                <div>
                    <div class="text-[#0E1520]/50 text-[10px] uppercase">Township</div>
                    <div class="font-bold text-sm text-[#0E1520] mt-0.5">{{ $booking->project->title ?? 'Kedia Landmark' }}</div>
                </div>
                <div>
                    <div class="text-[#0E1520]/50 text-[10px] uppercase">RERA Number</div>
                    <div class="font-bold text-sm text-[#0E1520] mt-0.5">{{ $booking->project->rera_number ?? 'RAJ/P/2021/1480' }}</div>
                </div>
                <div>
                    <div class="text-[#0E1520]/50 text-[10px] uppercase">Allottee Name</div>
                    <div class="font-bold text-sm text-[#0E1520] mt-0.5">{{ $booking->customer_name }}</div>
                </div>
                <div>
                    <div class="text-[#0E1520]/50 text-[10px] uppercase">Contact Phone</div>
                    <div class="font-bold text-sm text-[#0E1520] mt-0.5">{{ $booking->customer_phone }}</div>
                </div>
                <div>
                    <div class="text-[#0E1520]/50 text-[10px] uppercase">Transaction Ref</div>
                    <div class="font-bold text-sm text-[#0E1520] mt-0.5">{{ $booking->transaction_ref }}</div>
                </div>
            </div>

            <!-- Payment Breakdown Table -->
            <div class="border border-[#0E1520]/10 rounded-2xl overflow-hidden font-mono text-xs">
                <div class="bg-[#FAF8F5] p-3 font-bold text-[#0E1520] border-b border-[#0E1520]/10 flex items-center justify-between">
                    <span>Payment Summary</span>
                    <span>Amount (INR)</span>
                </div>
                <div class="p-4 space-y-2.5">
                    <div class="flex justify-between text-[#0E1520]/70">
                        <span>Total Property Agreement Value:</span>
                        <span class="font-semibold text-[#0E1520]">₹ {{ number_format($booking->total_amount) }}</span>
                    </div>
                    <div class="flex justify-between text-emerald-700 font-bold pt-2 border-t border-[#0E1520]/10">
                        <span>Advance Booking Token Paid (5%):</span>
                        <span class="text-sm">₹ {{ number_format($booking->token_amount) }}</span>
                    </div>
                    <div class="flex justify-between text-[#0E1520]/60 text-[11px]">
                        <span>Remaining Balance in Construction Milestones:</span>
                        <span>₹ {{ number_format($booking->total_amount - $booking->token_amount) }}</span>
                    </div>
                </div>
            </div>

            <!-- 5-Stage Construction Milestone Schedule -->
            @if(!empty($booking->payment_schedule))
                <div class="space-y-3 font-mono text-xs">
                    <h4 class="font-serif text-lg font-bold text-[#0E1520]">Construction Linked Payment Schedule</h4>
                    <div class="divide-y divide-[#0E1520]/5 border border-[#0E1520]/10 rounded-2xl overflow-hidden">
                        @foreach($booking->payment_schedule as $stage)
                            <div class="p-3 flex items-center justify-between bg-white hover:bg-[#FAF8F5]">
                                <div>
                                    <div class="font-semibold text-[#0E1520]">{{ $stage['milestone'] }} ({{ $stage['percentage'] }}%)</div>
                                    <div class="text-[10px] text-[#0E1520]/50">Due Target: {{ $stage['due_date'] }}</div>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold text-[#0E1520]">₹ {{ number_format($stage['amount']) }}</div>
                                    <span class="inline-block text-[10px] uppercase font-bold {{ $stage['status'] === 'Paid' ? 'text-emerald-600' : 'text-amber-600' }}">
                                        ● {{ $stage['status'] }}
                                    </span>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif

            <!-- 72-Hour Holding Notice -->
            <div class="bg-[#FAF8F5] p-4 rounded-2xl border border-[#D4E845] text-xs font-mono text-[#0E1520]/80 space-y-1">
                <div class="font-bold text-[#0E1520] flex items-center gap-1.5">
                    <span>⏱</span> 72-Hour Guaranteed Unit Hold
                </div>
                <p class="leading-relaxed">
                    This unit has been set to <strong>ON HOLD</strong> in our live inventory. Our executive relationship manager will contact you within 24 hours to schedule document verification and agreement signing.
                </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#0E1520]/10">
                <button type="button" onclick="window.print()" class="px-6 py-3 rounded-full bg-[#FAF8F5] hover:bg-[#0E1520] text-[#0E1520] hover:text-white border border-[#0E1520]/20 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2">
                    <span>🖨</span>
                    <span>Print Allotment Voucher</span>
                </button>

                <a href="{{ route('customer.dashboard') }}" class="px-6 py-3 rounded-full bg-[#D4E845] hover:bg-[#c2d733] text-[#0E1520] font-bold text-xs uppercase tracking-wider transition-colors shadow">
                    View Patron Dashboard &rarr;
                </a>
            </div>

        </div>

    </div>
</section>

@endsection
