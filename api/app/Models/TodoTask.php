<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class TodoTask extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'label', 'is_complete',
    ];

    public function todo(): BelongsTo{
        return $this->belongsTo(Todo::class);
    }
}
