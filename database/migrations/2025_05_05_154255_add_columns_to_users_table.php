<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToUsersTable extends Migration

{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->date('date_of_birth')->nullable();
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
            ])->nullable();
            $table->string('phone')->unique()->nullable();
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
            $table->dropColumn([
                'date_of_birth',
                'gender',
                'address',
                'blood_type',
                'phone',
                'is_chef_equipe'
            ]);
            $table->dropSoftDeletes();

        });
    }
}
