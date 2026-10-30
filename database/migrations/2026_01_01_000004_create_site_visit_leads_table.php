<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_visit_leads', function (Blueprint $table) {
            $table->id();
            $table->string('lead_code')->unique();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('project');
            $table->string('preferred_date')->nullable();
            $table->string('preferred_time')->nullable();
            $table->text('message')->nullable();
            $table->string('source')->default('website_modal');
            $table->string('status')->default('new'); // new, contacted, site_visit_scheduled, closed
            $table->string('assigned_advisor')->default('Kedia Relationship Desk');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_visit_leads');
    }
};
