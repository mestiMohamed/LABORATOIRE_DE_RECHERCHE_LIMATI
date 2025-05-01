<?php

use App\Models\Equipe;
use App\Models\User;
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
        Schema::create('projet_de_recherches', function (Blueprint $table) {
            $table->id();
            $table->string('titre'); // Titre du projet
            $table->text('description')->nullable(); // Description détaillée
            $table->foreignIdFor(User::class)->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Equipe::class)->nullable()->constrained()->cascadeOnDelete();
            $table->date('date_debut')->nullable(); // Date de début du projet
            $table->date('date_fin')->nullable(); // Date de fin
            $table->enum('status', ['publique', 'prive'])->default('prive'); // Projet actif ou non
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projet_de_recherches');
    }
};
