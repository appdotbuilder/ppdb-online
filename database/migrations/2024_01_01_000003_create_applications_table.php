<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Student data
            $table->string('student_name');
            $table->date('birth_date');
            $table->text('full_address');
            $table->string('previous_school');
            
            // Parent/guardian data
            $table->string('parent_name');
            $table->string('parent_contact');
            
            // Application status
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};