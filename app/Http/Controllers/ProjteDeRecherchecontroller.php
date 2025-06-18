<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipeRequest;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\StoreProjetDeRechercheRequest;
use App\Http\Requests\UpdateEquipeRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Requests\UpdateProjetDeRechercheRequest;
use App\Http\Resources\EquipeResource;
use App\Http\Resources\EventResource;
use App\Http\Resources\ProjetDeRechercheResource;
use App\Models\Equipe;
use App\Models\ProjetDeRecherche;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class ProjteDeRecherchecontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return ProjetDeRechercheResource::collection(
            ProjetDeRecherche::with(['user', 'equipe'])->get()
        );
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjetDeRechercheRequest $request)
    {
        $formFields = $request->validated();
        $projet = ProjetDeRecherche::create($formFields);
        $response = new ProjetDeRechercheResource($projet);
        return response()->json([
            'projet' => $response,
            'message' => __('Projet created successfully')
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjetDeRechercheRequest $request, ProjetDeRecherche $projet)
    {
        $formFields = $request->validated();
        $projet->update($formFields);
        return response()->json([
            'projet' => $projet,
            'message' => __('Projet updated successfully')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjetDeRecherche $projet)
    {
        $projet->delete();
        return new ProjetDeRechercheResource($projet);
    }


    public function parType()
    {
        $now = Carbon::now();
        $startDate = $now->copy()->subMonths(5)->startOfMonth();
        $endDate = $now->copy()->endOfMonth();

        // Requête optimisée en une seule requête SQL
        $results = ProjetDeRecherche::query()
            ->selectRaw('
            DATE_FORMAT(date_debut, "%Y-%m") as month,
            SUM(CASE WHEN user_id IS NOT NULL AND equipe_id IS NULL THEN 1 ELSE 0 END) as chercheur,
            SUM(CASE WHEN equipe_id IS NOT NULL THEN 1 ELSE 0 END) as equipe
        ')
            ->whereBetween('date_debut', [$startDate, $endDate])
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Générer tous les mois demandés même sans données
        $months = collect();
        for ($i = 5; $i >= 0; $i--) {
            $month = $now->copy()->subMonths($i)->startOfMonth();
            $months->push([
                'key' => $month->format('Y-m'),
                'name' => $month->format('F')
            ]);
        }

        // Formater les résultats avec tous les mois
        $data = $months->map(function ($month) use ($results) {
            $monthData = $results->firstWhere('month', $month['key']);

            return [
                'month' => $month['name'],
                'chercheur' => $monthData ? $monthData->chercheur : 0,
                'equipe' => $monthData ? $monthData->equipe : 0
            ];
        });

        return response()->json($data);
    }

    public function getMyProject(Request $request)
    {
        $user = $request->user();

        $projets = ProjetDeRecherche::with('user')->where('user_id', $user->id)->get();

        return ProjetDeRechercheResource::collection($projets);
    }

    public function projectsLast5Months()
    {
        $now = Carbon::now();
        $startMonth = $now->copy()->subMonths(5)->startOfMonth();
        $endMonth = $now->copy()->startOfMonth(); // mois courant exclu

        // Obtenir la liste des 5 mois avant le mois courant, au format YYYY-MM
        $months = [];
        for ($i = 5; $i >= 1; $i--) {
            $months[] = $now->copy()->subMonths($i)->format('Y-m');
        }

        // Récupérer les projets de cette année (filtrés par date)
        $thisYearData = DB::table('projet_de_recherches')
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->whereBetween('created_at', [$startMonth, $endMonth])
            ->whereYear('created_at', $now->year)
            ->groupBy('month')
            ->pluck('count', 'month')
            ->toArray();

        // Récupérer les projets de l'année dernière (pour les mêmes mois)
        $lastYearStart = $startMonth->copy()->subYear();
        $lastYearEnd = $endMonth->copy()->subYear();

        $lastYearData = DB::table('projet_de_recherches')
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->whereBetween('created_at', [$lastYearStart, $lastYearEnd])
            ->whereYear('created_at', $now->year - 1)
            ->groupBy('month')
            ->pluck('count', 'month')
            ->toArray();

        // Construire la réponse : 5 mois avec counts thisYear et lastYear
        $formattedData = [];
        foreach ($months as $month) {
            // Construire le même mois pour l'année dernière (YYYY-MM)
            $dt = Carbon::createFromFormat('Y-m', $month);
            $lastYearMonth = $dt->copy()->subYear()->format('Y-m');

            $formattedData[] = [
                'month' => $month,
                'thisYear' => $thisYearData[$month] ?? 0,
                'lastYear' => $lastYearData[$lastYearMonth] ?? 0,
            ];
        }

        return response()->json($formattedData);
    }
}
