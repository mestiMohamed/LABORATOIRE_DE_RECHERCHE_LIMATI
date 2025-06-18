<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Equipe;
use App\Models\Publication;
use App\Models\ProjetDeRecherche;
use App\Models\Event;
use App\Models\EventType;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory(10)->create();
        Equipe::factory(5)->create();
        EventType::factory(5)->create();
        Event::factory(20)->create();
        Publication::factory(50)->create();
        ProjetDeRecherche::factory(30)->create();
    }
}
