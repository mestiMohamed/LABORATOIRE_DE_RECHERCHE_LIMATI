<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\ChercheurResource;
use App\Http\Resources\EventResource;
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
    /*public function store(StoreEventRequest $request)
    {
        $formFields = $request->validated();
        $event = Event::create($formFields);
        $response = new ChercheurResource($event);
        return response()->json([
            'event' => $response,
            'message' => __('Event created successfully')
          ]);
    }

    /**
     * Display the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    /*public function update(UpdateEventRequest $request, Event $event)
    {
        $formFields = $request->validated();
        $event->update($formFields);
        return response()->json([
            'parent' => $event,
            'message' => __('Event updated successfully')
        ]);
    }*/

    /**
     * Remove the specified resource from storage.
     */
    /*public function destroy(Event $event)
    {
        $event->delete();
        return new ChercheurResource($event);
    }*/
}
