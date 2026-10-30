<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_id')->unique();
            $table->string('unit_code');
            $table->string('unit_number');
            $table->string('project_slug');
            $table->string('project_name');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->string('customer_pan')->nullable();
            $table->string('customer_aadhar')->nullable();
            $table->text('address')->nullable();
            $table->dateTime('booking_date');
            $table->bigInteger('token_amount_paid')->default(100000);
            $table->bigInteger('total_unit_amount')->default(0);
            $table->string('payment_method')->default('UPI'); // UPI, Card, NetBanking, NEFT
            $table->string('payment_reference')->nullable();
            $table->string('status')->default('confirmed'); // confirmed, pending_verification, agreement_pending, allotted, registry_complete, cancelled
            $table->json('payment_schedule')->nullable();
            $table->json('cost_breakdown')->nullable();
            $table->timestamps();

            $table->index('unit_code');
            $table->index('project_slug');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
