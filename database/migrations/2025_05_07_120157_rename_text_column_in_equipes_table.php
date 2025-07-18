<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('equipes', function (Blueprint $table) {
            $table->renameColumn('text', 'description');
        });
    }

    public function down(): void
    {
        Schema::table('equipes', function (Blueprint $table) {
            $table->renameColumn('description', 'text');
        });
    }
};
