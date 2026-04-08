<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Getting Started with Laravel',
                'content' => 'Laravel is a web application framework with expressive, elegant syntax. It provides structure and a starting point for building your application, allowing you to focus on creating something amazing while the framework handles the details.',
            ],
            [
                'title' => 'Understanding RESTful APIs',
                'content' => 'A RESTful API is an architectural style for an application programming interface that uses HTTP requests to access and manipulate data. REST stands for Representational State Transfer and defines a set of constraints for creating web services.',
            ],
            [
                'title' => 'Docker for PHP Developers',
                'content' => 'Docker allows you to package your application and its dependencies into a container. This ensures your app runs the same way in every environment, from development to production, eliminating the classic "it works on my machine" problem.',
            ],
            [
                'title' => 'React and the Modern Frontend',
                'content' => 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components. React manages the rendering efficiently using a virtual DOM.',
            ],
            [
                'title' => 'MySQL Best Practices',
                'content' => 'MySQL is one of the most popular relational database management systems. Following best practices like proper indexing, using transactions, and normalizing your schema can significantly improve performance and data integrity.',
            ],
        ];

        foreach ($articles as $data) {
            $article = Article::create($data);

            Comment::create([
                'article_id'  => $article->id,
                'author_name' => 'Alice',
                'content'     => 'Great article, very informative!',
            ]);

            Comment::create([
                'article_id'  => $article->id,
                'author_name' => 'Bob',
                'content'     => 'Thanks for sharing this. Really helpful.',
            ]);
        }
    }
}
