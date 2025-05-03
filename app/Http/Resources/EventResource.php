<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'date_debut' => $this->date_debut,
            'date_fin' => $this->date_fin,
            'event_type_id' => $this->event_type_id,

            // Ajoute ceci pour inclure le nom du type
            'event_type_name' => $this->eventType?->name,
        ];
    }
}
