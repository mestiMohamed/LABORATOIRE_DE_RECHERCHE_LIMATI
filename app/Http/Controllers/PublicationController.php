<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipeRequest;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\StorePublicationRequest;
use App\Http\Requests\UpdateEquipeRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EquipeResource;
use App\Http\Resources\EventResource;
use App\Http\Resources\PublicationResource;
use App\Models\Equipe;
use App\Models\Publication;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return PublicationResource::collection(Publication::with('user')->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePublicationRequest $request)
    {
        $formFields = $request->validated();
        $pub = Publication::create($formFields);
        $response = new PublicationResource($pub);
        return response()->json([
            'publication' => $response,
            'message' => __('Publication created successfully')
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
