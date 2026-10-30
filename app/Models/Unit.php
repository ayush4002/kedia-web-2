<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unit extends Model
{
    protected $fillable = [
        'unit_code',
        'unit_number',
        'project_slug',
        'project_name',
        'tower_or_block',
        'unit_type',
        'configuration',
        'bedrooms',
        'bathrooms',
        'area_sqft',
        'area_sqyd',
        'facing',
        'floor_level',
        'status', // available, on_hold, sold
        'base_price',
        'development_charges',
        'club_membership',
        'parking_charges',
        'gst',
        'stamp_duty_registration',
        'total_price',
        'is_featured',
        'specifications',
        'possession'
    ];

    protected $casts = [
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'area_sqft' => 'integer',
        'area_sqyd' => 'float',
        'base_price' => 'integer',
        'development_charges' => 'integer',
        'club_membership' => 'integer',
        'parking_charges' => 'integer',
        'gst' => 'integer',
        'stamp_duty_registration' => 'integer',
        'total_price' => 'integer',
        'is_featured' => 'boolean',
        'specifications' => 'array',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_slug', 'slug');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'unit_code', 'unit_code');
    }

    // Accessor aliases for view compatibility
    public function getTitleAttribute(): string
    {
        return $this->configuration ?: ($this->bedrooms . ' BHK ' . ($this->unit_type ?? 'Villa'));
    }

    public function getPriceFormattedAttribute(): string
    {
        $price = $this->total_price ?: $this->base_price;
        return '₹ ' . number_format($price / 100000, 2) . ' Lakh';
    }

    public function getPriceNumAttribute(): int
    {
        return (int) ($this->total_price ?: $this->base_price);
    }

    public function getPlotSizeSqydAttribute(): float
    {
        return (float) $this->area_sqyd;
    }

    public function getFloorAttribute(): string
    {
        return $this->floor_level ?? 'Ground';
    }

    public function getTypeAttribute(): string
    {
        return $this->unit_type ?? 'Villa';
    }

    /**
     * Compute full itemized pricing breakdown with statutory dues and token
     */
    public function computePricing(?int $basePrice = null): array
    {
        $base = $basePrice ?? ($this->base_price ?: 3500000);
        $type = $this->unit_type ?? 'Villa';

        $idc = (int) round($base * 0.04);
        $club = ($type === 'Villa') ? 75000 : 35000;
        $maintenance = (int) round($base * 0.025);
        $gst = (int) round($base * 0.05);
        $reg = (int) round($base * 0.06);
        $total = $base + $idc + $club + $maintenance + $gst + $reg;
        $token = (int) round($total * 0.05);

        return [
            'base_price' => $base,
            'development_charges' => $idc,
            'club_charges' => $club,
            'maintenance' => $maintenance,
            'gst' => $gst,
            'stamp_duty_estimate' => $reg,
            'grand_total' => $total,
            'token_amount' => $token,
        ];
    }
}
