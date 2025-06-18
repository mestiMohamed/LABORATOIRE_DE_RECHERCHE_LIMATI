<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PublicationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'titre' => $this->faker->sentence,
            'contenu' => $this->faker->paragraph(5),
            'user_id' => User::inRandomOrder()->first()?->id ?? 1,
            'status' => $this->faker->randomElement(['publique', 'prive']),
            'created_at' => now()->subDays(rand(0, 30)),
            'updated_at' => now(),
        ];
    }
}

