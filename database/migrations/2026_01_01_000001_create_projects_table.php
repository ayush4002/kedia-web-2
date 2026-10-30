<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('type'); // Residential Plots, Villas, Apartments
            $table->string('classification')->default('Residential');
            $table->string('status')->default('ongoing');
            $table->string('location');
            $table->text('address')->nullable();
            $table->text('description')->nullable();
            $table->decimal('latitude', 10, 6)->nullable();
            $table->decimal('longitude', 10, 6)->nullable();
            $table->string('rera_number')->nullable();
            $table->boolean('rera_verified')->default(false);
            $table->string('price_label')->nullable();
            $table->bigInteger('starting_price')->default(0);
            $table->string('possession_label')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('logo_image')->nullable();
            $table->string('brochure_path')->nullable();
            $table->string('sales_phone')->nullable();
            $table->integer('sort_order')->default(0);
            $table->json('amenities')->nullable();
            $table->json('configs')->nullable();
            $table->json('images')->nullable();
            $table->json('specs')->nullable();
            $table->string('aerial_backdrop')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
