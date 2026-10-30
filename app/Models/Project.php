<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'type',
        'classification',
        'status',
        'location',
        'address',
        'description',
        'latitude',
        'longitude',
        'rera_number',
        'rera_verified',
        'price_label',
        'starting_price',
        'possession_label',
        'cover_image',
        'logo_image',
        'brochure_path',
        'sales_phone',
        'sort_order',
        'amenities',
        'configs',
        'images',
        'specs',
        'aerial_backdrop'
    ];

    protected $casts = [
        'rera_verified' => 'boolean',
        'starting_price' => 'integer',
        'amenities' => 'array',
        'configs' => 'array',
        'images' => 'array',
        'specs' => 'array',
    ];

    public function units(): HasMany
    {
        return $this->hasMany(Unit::class, 'project_slug', 'slug');
    }

    public function availableUnits(): HasMany
    {
        return $this->units()->where('status', 'available');
    }

    // Accessor aliases for view compatibility
    public function getTitleAttribute(): string
    {
        return $this->name ?? 'Kedia Township';
    }

    public function getHeroImageAttribute(): string
    {
        if (!empty($this->cover_image)) {
            if (str_starts_with($this->cover_image, '/') || str_starts_with($this->cover_image, 'http')) {
                return $this->cover_image;
            }
            return '/media/' . ltrim($this->cover_image, '/') . '-1920.webp';
        }
        return '/media/img/2021/04/Kedia-Nikunj-1-1920.webp';
    }

    public function getPriceRangeAttribute(): string
    {
        return $this->price_label ?? ('Starting at ₹ ' . number_format($this->starting_price / 100000, 2) . ' Lakh');
    }

    public function getPriceStartNumAttribute(): int
    {
        return (int) $this->starting_price;
    }

    public function getIsFeaturedAttribute(): bool
    {
        return $this->sort_order <= 3;
    }
}
