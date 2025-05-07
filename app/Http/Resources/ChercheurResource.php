<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChercheurResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'             => $this->id,
            'name'           => $this->name,
            'email'          => $this->email,
            'date_of_birth'  => $this->date_of_birth,
            'gender'         => $this->gender,
            'address'        => $this->address,
            'blood_type'     => $this->blood_type,
            'phone'          => $this->phone,
            'image'          => $this->image, // ✅ ajoute le champ image
            'is_active'      => $this->is_active,
            'is_chef_equipe' => $this->is_chef_equipe, // facultatif mais utile
            'updated_at'     => $this->updated_at, // pour vérifier que la mise à jour s'est faite
        ];
    }
}
