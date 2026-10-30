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

    /**
     * Recompute statutory fees and total price whenever base price updates
     */
    public static function computePricing(int $basePrice, string $unitType = 'Villa'): array
    {
        $idc = (int) round($basePrice * 0.04);
        $club = ($unitType === 'Villa') ? 75000 : 35000;
        $parking = ($unitType === 'Villa') ? 150000 : 0;
        $gst = (int) round(($basePrice + $idc) * 0.05);
        $reg = (int) round($basePrice * 0.06);
        $total = $basePrice + $idc + $club + $parking + $gst + reg;

        return [
            'base_price' => $basePrice,
            'development_charges' => $idc,
            'club_membership' => $club,
            'parking_charges' => $parking,
            'gst' => $gst,
            'stamp_duty_registration' => $reg,
            'total_price' => $total,
        ];
    }
}
