<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipeRequest;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\StoreProjetDeRechercheRequest;
use App\Http\Requests\UpdateEquipeRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EquipeResource;
use App\Http\Resources\EventResource;
use App\Http\Resources\ProjetDeRechercheResource;
use App\Models\Equipe;
use App\Models\ProjetDeRecherche;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjteDeRecherchecontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return ProjetDeRechercheResource::collection(ProjetDeRecherche::all());
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
    public function update(UpdateEquipeRequest $request, Equipe $equipe)
    {
        $formFields = $request->validated();
        $equipe->update($formFields);
        return response()->json([
            'parent' => $equipe,
            'message' => __('Equipe updated successfully')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Equipe $equipe)
    {
        $equipe->delete();
        return new EquipeResource($equipe);
    }
}
