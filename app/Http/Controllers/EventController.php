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

    public function eventsPerMonth()
    {
        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();

        $data = DB::table('events')
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->where('created_at', '>=', $sixMonthsAgo)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Formater pour React : remplir les mois manquants
        $formattedData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i)->format('Y-m');
            $formattedData[] = [
                'month' => $month,
                'count' => $data->firstWhere('month', $month)?->count ?? 0,
            ];
        }

        return response()->json($formattedData);
    }
}
