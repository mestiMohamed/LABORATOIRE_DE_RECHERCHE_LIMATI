<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjetDeRechercheResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'user_id' => $this->user_id,
            'equipe_id' => $this->equipe_id,
            'date_debut' => $this->date_debut,
            'date_fin' => $this->date_fin,
            'status' => $this->status,

            'user' => new ChercheurResource($this->whenLoaded('user')),
            'equipe' => new EquipeResource($this->whenLoaded('equipe')),
        ];
    }
}
