<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjetDeRecherche extends Model
{
    use SoftDeletes, HasFactory;


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



    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function equipe()
    {
        return $this->belongsTo(Equipe::class);
    }
}
