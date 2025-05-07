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
}
