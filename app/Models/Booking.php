<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'booking_id',
        'unit_code',
        'unit_number',
        'project_slug',
        'project_name',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_pan',
        'customer_aadhar',
        'address',
        'booking_date',
        'token_amount_paid',
        'total_unit_amount',
        'payment_method',
        'payment_reference',
        'status', // confirmed, pending_verification, agreement_pending, allotted, registry_complete, cancelled
        'payment_schedule',
        'cost_breakdown'
    ];

    protected $casts = [
        'booking_date' => 'datetime',
        'token_amount_paid' => 'integer',
        'total_unit_amount' => 'integer',
        'payment_schedule' => 'array',
        'cost_breakdown' => 'array',
    ];

    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'unit_code', 'unit_code');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_slug', 'slug');
    }
}
