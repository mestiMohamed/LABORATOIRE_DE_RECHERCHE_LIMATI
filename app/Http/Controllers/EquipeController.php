<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipeRequest;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEquipeRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EquipeResource;
use App\Http\Resources\EventResource;
use App\Models\Equipe;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EquipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return EquipeResource::collection(Equipe::with('users')->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEquipeRequest $request)
    {
        $formFields = $request->validated();
        $equipe = Equipe::create($formFields);
        $response = new EquipeResource($equipe);
        return response()->json([
            'equipe' => $response,
            'message' => __('Equipe created successfully')
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

    public function getMembers()
    {
        $user = auth()->user();

        // Une ou plusieurs équipes (au cas où il est chef de plusieurs)
        $equipes = Equipe::with('membres')->where('chef_id', $user->id)->get();

        $membres = $equipes->flatMap(function ($equipe) {
            return $equipe->membres;
        })->unique('id')->values();

        return response()->json($membres);
    }


   



    public function getProjets()
    {
        $user = auth()->user();
        $equipes = Equipe::with('projets')->where('chef_id', $user->id)->get();

        $projets = $equipes->flatMap(function ($equipe) {
            return $equipe->projets;
        })->values();

        return response()->json($projets);
    }
}
