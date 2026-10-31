<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('units', function (Blueprint $table) {
            $table->id();
            $table->string('unit_code');
            $table->string('unit_number');
            $table->string('project_slug');
            $table->string('project_name');
            $table->string('tower_or_block')->default('Phase 1');
            $table->string('unit_type')->default('Villa'); // Villa, Plot, Apartment
            $table->string('configuration');
            $table->integer('bedrooms')->default(3);
            $table->integer('bathrooms')->default(3);
            $table->integer('area_sqft')->default(0);
            $table->decimal('area_sqyd', 8, 2)->default(0);
            $table->string('facing')->default('East');
            $table->string('floor_level')->default('Ground');
            $table->string('status')->default('available'); // available, on_hold, sold
            $table->bigInteger('base_price')->default(0);
            $table->bigInteger('development_charges')->default(0);
            $table->bigInteger('club_membership')->default(0);
            $table->bigInteger('parking_charges')->default(0);
            $table->bigInteger('gst')->default(0);
            $table->bigInteger('stamp_duty_registration')->default(0);
            $table->bigInteger('total_price')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->json('specifications')->nullable();
            $table->string('possession')->nullable();
            $table->timestamps();

            $table->unique(['project_slug', 'unit_code']);
            $table->index('project_slug');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
