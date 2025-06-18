<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EventTypeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'code' => strtoupper($this->faker->bothify('EVT###')),
            'created_at' => now()->subDays(rand(0, 30)),
            'updated_at' => now(),
        ];
    }
}
