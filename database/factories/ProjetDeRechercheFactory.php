<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Equipe;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjetDeRechercheFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'user_id' => User::inRandomOrder()->first()?->id,
            'equipe_id' => Equipe::inRandomOrder()->first()?->id,
            'date_debut' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'date_fin' => $this->faker->dateTimeBetween('now', '+1 year'),
            'status' => $this->faker->randomElement(['publique', 'prive']),
            'created_at' => now()->subDays(rand(0, 30)),
            'updated_at' => now(),
        ];
    }
}
