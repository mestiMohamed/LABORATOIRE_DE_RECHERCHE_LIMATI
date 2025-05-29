<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Projet;
use App\Models\Event;
use App\Models\ProjetDeRecherche;
use App\Models\Publication;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminStatsController extends Controller
{
    //
    public function countChercheurs()
    {
        $total = User::count();
        $lastMonth = User::where('created_at', '>=', Carbon::now()->subMonth())->count();

        $growth = ($total - $lastMonth) > 0 ? round(($lastMonth / ($total - $lastMonth)) * 100) : 0;

        return response()->json([
            'total' => $total,
            'growth' => $growth
        ]);
    }
    public function countEvents()
    {
        $total = Event::count();
        $lastMonth = Event::where('created_at', '>=', Carbon::now()->subMonth())->count();

        $growth = ($total - $lastMonth) > 0 ? round(($lastMonth / ($total - $lastMonth)) * 100) : 0;

        return response()->json([
            'total' => $total,
            'growth' => $growth
        ]);
    }
    public function countPublications()
    {
        $total = Publication::count();
        $lastMonth = Publication::where('created_at', '>=', Carbon::now()->subMonth())->count();

        $growth = ($total - $lastMonth) > 0 ? round(($lastMonth / ($total - $lastMonth)) * 100) : 0;

        return response()->json([
            'total' => $total,
            'growth' => $growth
        ]);
    }
    public function countProjets()
    {
        $total = ProjetDeRecherche::count();
        $lastMonth = ProjetDeRecherche::where('created_at', '>=', Carbon::now()->subMonth())->count();

        $growth = ($total - $lastMonth) > 0 ? round(($lastMonth / ($total - $lastMonth)) * 100) : 0;

        return response()->json([
            'total' => $total,
            'growth' => $growth
        ]);
    }
}
