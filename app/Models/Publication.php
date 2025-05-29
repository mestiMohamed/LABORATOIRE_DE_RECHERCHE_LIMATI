<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Publication extends Model
{
    use SoftDeletes;
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
