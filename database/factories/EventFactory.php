<?php

namespace Database\Factories;

use App\Models\EventType;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->catchPhrase,
            'code' => strtoupper($this->faker->bothify('EVT##')),
            'event_type_id' => EventType::inRandomOrder()->first()?->id ?? 1,
            'date_debut' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'date_fin' => $this->faker->dateTimeBetween('now', '+10 days'),
            'created_at' => now()->subDays(rand(0, 30)),
            'updated_at' => now(),
        ];
    }
}
