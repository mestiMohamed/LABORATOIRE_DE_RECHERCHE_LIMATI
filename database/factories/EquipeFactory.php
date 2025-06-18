<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EquipeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'description' => $this->faker->paragraph,
            'created_at' => now()->subDays(rand(0, 30)),
            'updated_at' => now(),
        ];
    }
}
