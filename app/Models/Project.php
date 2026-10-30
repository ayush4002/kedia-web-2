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
}
