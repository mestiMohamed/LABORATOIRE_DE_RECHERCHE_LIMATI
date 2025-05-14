<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameTitreToNameInProjetsDeRechercheTable extends Migration
{
    public function up()
    {
        Schema::table('projet_de_recherches', function (Blueprint $table) {
            $table->renameColumn('titre', 'name');
        });
    }

    public function down()
    {
        Schema::table('projet_de_recherches', function (Blueprint $table) {
            $table->renameColumn('name', 'titre');
        });
    }
}
