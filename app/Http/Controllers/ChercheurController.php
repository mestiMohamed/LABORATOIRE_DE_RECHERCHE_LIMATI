<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChercheurRequest;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateChercheurRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\ChercheurResource;
use App\Http\Resources\EventResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class ChercheurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        //
        return ChercheurResource::collection(User::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChercheurRequest $request)
    {
        $formFields = $request->validated();
        $chercheur = User::create($formFields);
        $response = new ChercheurResource($chercheur);
        return response()->json([
            'event' => $response,
            'message' => __('Chercheur ajouté avec succees')
        ]);
    }

    /**
     * Display the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChercheurRequest $request, User $user)
    {
        $formFields = $request->validated();

        // Gestion de l'image
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('users', 'public');
            $formFields['image'] = $path;
        }

        // Gestion du mot de passe
        if (!empty($formFields['password'])) {
            $formFields['password'] = bcrypt($formFields['password']);
        } else {
            unset($formFields['password']);
        }
        dd($formFields);
        $user->update($formFields);

        return response()->json([
            'user' => new ChercheurResource($user->fresh()),
            'message' => __('Chercheur updated successfully')
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return new ChercheurResource($user);
    }

    public function toggleActive(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->is_active = $request->boolean('is_active');
        $user->save();

        return response()->json([
            'message' => 'Statut mis à jour avec succès.',
            'is_active' => $user->is_active,
        ]);
    }

    // Retourne les utilisateurs sans équipe
    public function chercheursDisponibles()
    {
        return User::whereNull('equipe_id')->get();
    }

    // Attribue une équipe à un utilisateur
    public function assignEquipe(Request $request, User $user)
    {
        $request->validate([
            'equipe_id' => 'required|exists:equipes,id',
        ]);

        $user->equipe_id = $request->equipe_id;
        $user->save();

        return response()->json(['message' => 'Membre ajouté à l’équipe.']);
    }

    public function removeEquipe($userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->equipe_id = null; // Retirer l'equipe_id
        $user->save();

        return response()->json(['message' => 'Équipe supprimée avec succès'], 200);
    }

    public function publicationsParMois()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();

        $publications = DB::table('publications')
            ->select(DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"), DB::raw("count(*) as count"))
            ->where('user_id', $user->id)
            ->where('created_at', '>=', $sixMonthsAgo)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Créer les 6 derniers mois avec 0 par défaut
        $months = [];
        for ($i = 0; $i < 6; $i++) {
            $m = Carbon::now()->subMonths(5 - $i)->format('Y-m');
            $months[$m] = 0;
        }

        foreach ($publications as $pub) {
            $months[$pub->month] = $pub->count;
        }

        // Formater pour le frontend
        $result = [];
        foreach ($months as $month => $count) {
            $result[] = [
                'month' => $month,
                'count' => $count,
            ];
        }

        return response()->json($result);
    }

    public function ProjetsParMois()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();

        $projets = DB::table('projet_de_recherches')
            ->select(DB::raw("DATE_FORMAT(date_debut, '%Y-%m') as month"), DB::raw("count(*) as count"))
            ->where('user_id', $user->id)
            ->where('date_debut', '>=', $sixMonthsAgo)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Créer les 6 derniers mois avec 0 par défaut
        $months = [];
        for ($i = 0; $i < 6; $i++) {
            $m = Carbon::now()->subMonths(5 - $i)->format('Y-m');
            $months[$m] = 0;
        }

        foreach ($projets as $pr) {
            $months[$pr->month] = $pr->count;
        }

        // Formater pour le frontend
        $result = [];
        foreach ($months as $month => $count) {
            $result[] = [
                'month' => $month,
                'count' => $count,
            ];
        }

        return response()->json($result);
    }


    public function updateProfile(UpdateChercheurRequest $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $data = $request->validated();

        Log::info('Data reçue pour update:', $data);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $data['image'] = $path;
        }

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        Log::info('User après update:', $user->toArray());

        return response()->json([
            'message' => 'Profil mis à jour avec succès.',
            'user' => new ChercheurResource($user->fresh()),
        ]);
    }
}
