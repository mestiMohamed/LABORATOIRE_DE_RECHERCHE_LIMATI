<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Publication;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Faker\Factory as Faker;

class PublicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        DB::beginTransaction();

        try {
            // Supprimer les publications existantes (optionnel)
            // Publication::truncate();

            for ($i = 0; $i < 30; $i++) {
                $date = Carbon::now()->subDays(29 - $i)->startOfDay();
                $publicationsCount = rand(3, 7); // entre 3 et 7 publications par jour

                for ($j = 0; $j < $publicationsCount; $j++) {
                    $createdAt = $date->copy()->addHours(rand(8, 18))->addMinutes(rand(0, 59));

                    Publication::create([
                        'titre' => $faker->sentence(6),
                        'contenu' => $faker->paragraph(4),
                        'user_id' => rand(1, 3), // adapter selon les utilisateurs existants
                        'status' => $faker->randomElement(['publique', 'prive']),
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                        'deleted_at' => null,
                    ]);
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            echo "Erreur lors du seeding : " . $e->getMessage();
        }
    }
}
