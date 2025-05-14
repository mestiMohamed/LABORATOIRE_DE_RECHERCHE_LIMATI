<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjetDeRecherche extends Model
{
    protected $fillable = [
        'name',
        'description',
        'user_id',
        'equipe_id',
        'date_debut',
        'date_fin',
        'status'
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
    ];
    

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function equipe()
    {
        return $this->belongsTo(Equipe::class);
    }
}
