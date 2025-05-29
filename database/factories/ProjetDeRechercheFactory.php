<?php

namespace Database\Factories;

use App\Models\ProjetDeRecherche;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjetDeRechercheFactory extends Factory
{
    protected $model = ProjetDeRecherche::class;

    public function definition(): array
    {
        $type = $this->faker->randomElement(['user', 'equipe']);

        return [
            'name' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(5),
            'user_id' => $type === 'user' ? User::inRandomOrder()->first()?->id : null,
            'equipe_id' => $type === 'equipe' ? $this->faker->randomElement([2, 3, 4]) : null,
            'date_debut' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'date_fin' => $this->faker->dateTimeBetween('now', '+2 years'),
            'status' => $this->faker->randomElement(['publique', 'prive']),
        ];
    }
}
