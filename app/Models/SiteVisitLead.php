<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteVisitLead extends Model
{
    protected $table = 'site_visit_leads';

    protected $fillable = [
        'lead_code',
        'name',
        'phone',
        'email',
        'project',
        'preferred_date',
        'preferred_time',
        'message',
        'source',
        'status', // new, contacted, site_visit_scheduled, closed
        'assigned_advisor'
    ];
}
