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
        Schema::table('users', function (Blueprint $table) {
            $table->dateTime('date_of_birth')->nullable();
            $table->enum('gender', ['m', 'f'])->nullable();
            $table->string('address')->nullable();
            $table->enum('blood_type', [
                'O-',
                'O+',
                'A+',
                'A-',
                'B+',
                'B-',
                'AB+',
                'AB-'
            ]);
            $table->string('phone', 10)->unique();
            $table->boolean('is_chef_equipe')->default(false);
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('date_of_birth');
            $table->dropColumn('gender');
            $table->dropColumn('address');
            $table->dropColumn('blood_type');
            $table->dropColumn('phone');
            $table->dropColumn('is_chef_equipe');
        });
    }
};
