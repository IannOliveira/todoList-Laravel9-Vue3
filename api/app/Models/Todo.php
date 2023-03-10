<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Todo extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'label',
    ];

    public function tasks(): HasMany{
        return $this->hasMany(TodoTask::class);
    }
}
