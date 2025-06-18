<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        //
        return EventResource::collection(Event::with('eventType')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $formFields = $request->validated();
        $event = Event::create($formFields);
        $response = new EventResource($event);
        return response()->json([
            'event' => $response,
            'message' => __('Event created successfully')
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
    public function update(UpdateEventRequest $request, Event $event)
    {
        $formFields = $request->validated();
        $event->update($formFields);
        return response()->json([
            'parent' => $event,
            'message' => __('Event updated successfully')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return new EventResource($event);
    }

    // ziada fo9 xba3A
    public function eventsByType()
    {
        $data = DB::table('events')
            ->join('event_types', 'events.event_type_id', '=', 'event_types.id')
            ->select('event_types.name as type', DB::raw('count(*) as total'))
            ->groupBy('event_types.name')
            ->get();

        return response()->json($data);
    }

    public function upcomingEvents()
    {
        $today = Carbon::now();

        $events = Event::with('eventType')
            ->where('date_debut', '>', $today)
            ->orderBy('date_debut', 'asc')
            ->get();

        return EventResource::collection($events);
    }

    public function eventsPerMonth()
    {
        // Obtenir la date du début du mois il y a 5 mois (excluant le mois courant)
        $fiveMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();

        // Requête brute pour regrouper les événements par mois
        $data = DB::table('events')
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->where('created_at', '>=', $fiveMonthsAgo)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Format pour React (remplir les mois manquants sauf le mois courant)
        $formattedData = [];
        for ($i = 5; $i >= 1; $i--) { // De 5 mois avant jusqu’à 1 mois avant (sans le mois courant)
            $month = Carbon::now()->subMonths($i)->format('Y-m');
            $formattedData[] = [
                'month' => $month,
                'count' => $data->firstWhere('month', $month)?->count ?? 0,
            ];
        }

        return response()->json($formattedData);
    }
}
