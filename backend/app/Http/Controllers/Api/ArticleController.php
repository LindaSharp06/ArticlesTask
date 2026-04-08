<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\CommentResource;
use App\Models\Article;

class ArticleController extends Controller
{
    // GET /api/articles
    public function index()
    {
        $articles = Article::latest('created_at')->get();

        return ArticleResource::collection($articles);
    }

    // GET /api/articles/{id}
    public function show(Article $article)
    {
        $article->load('comments');

        return new ArticleResource($article);
    }

    // POST /api/articles
    public function store(StoreArticleRequest $request)
    {
        $article = Article::create($request->validated());

        return (new ArticleResource($article))
            ->response()
            ->setStatusCode(201);
    }

    // POST /api/articles/{id}/comments
    public function storeComment(StoreCommentRequest $request, Article $article)
    {
        $comment = $article->comments()->create($request->validated());

        return (new CommentResource($comment))
            ->response()
            ->setStatusCode(201);
    }
}
