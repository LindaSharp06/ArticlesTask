<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['article_id', 'author_name', 'content'];

    protected $dates = ['created_at'];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
