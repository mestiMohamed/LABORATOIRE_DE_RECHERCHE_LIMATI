<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'users' => $this->users->map(function ($user) {
                return [
                    'name' => $user->name,
                    // ajoute d'autres champs si nécessaire
                ];
            }),
        ];
    }
}
