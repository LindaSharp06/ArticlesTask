<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['title', 'content'];

    protected $dates = ['created_at'];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
