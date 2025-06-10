<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipeRequest;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\StorePublicationRequest;
use App\Http\Requests\UpdateEquipeRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Requests\UpdatePublicationRequest;
use App\Http\Resources\EquipeResource;
use App\Http\Resources\EventResource;
use App\Http\Resources\PublicationResource;
use App\Models\Equipe;
use Illuminate\Http\Request;
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
    public function update(UpdatePublicationRequest $request, $id)
    {
        $publication = Publication::find($id);

        if (!$publication) {
            return response()->json(['message' => 'Publication introuvable'], 404);
        }

        $formFields = $request->validated();
        $publication->update($formFields);

        return response()->json([
            'pub' => $publication,
            'message' => __('Publication mise à jour avec succès'),
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $pub = Publication::find($id);

        if (!$pub) {
            return response()->json(['message' => 'Publication not found'], 404);
        }

        $pub->delete();

        // Recharger la publication supprimée avec les données soft-deleted
        $deletedPub = Publication::withTrashed()->find($id);

        return new PublicationResource($deletedPub);
    }



    public function getMyPublications(Request $request)
    {
        $user = $request->user();

        $publications = Publication::with('user')->where('user_id', $user->id)->get();

        return PublicationResource::collection($publications);
    }

    public function getPubs(): AnonymousResourceCollection
    {
        return PublicationResource::collection(
            Publication::with('user')->paginate(6) // 6 publications par page
        );
    }
}
