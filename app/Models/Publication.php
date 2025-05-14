<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    //
    protected $fillable = [
        'titre',
        'contenu',
        'user_id',
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
}
