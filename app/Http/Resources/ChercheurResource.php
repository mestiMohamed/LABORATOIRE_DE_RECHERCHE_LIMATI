<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChercheurResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
            'address' => $this->address,
            'blood_type' => $this->blood_type,
            'phone' => $this->phone,
            // Ajoute ceci pour inclure le nom du type
            'event_type_name' => $this->eventType?->name,
        ];
    }
}
