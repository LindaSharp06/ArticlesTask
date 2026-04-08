# Simple Blog

A simple blog with articles and comments. Built with Laravel (REST API) + React (frontend) + MySQL + Docker.

## Stack

- Backend: Laravel 11 (PHP 8.2, PHP-FPM)
- Frontend: React 18 + Vite
- Database: MySQL 8
- Web server: Nginx

## Project Structure

```
.
├── blog-backend/    # Laravel API
├── blog-frontend/   # React app
├── docker-compose.yml
└── README.md
```

## Getting Started

### 1. Clone and configure environment

```bash
cp blog-backend/.env.example blog-backend/.env
```

### 2. Start all containers

```bash
docker-compose up -d --build
```

### 3. Generate app key

```bash
docker exec blog_app php artisan key:generate
```

### 4. Run migrations

```bash
docker exec blog_app php artisan migrate
```

### 5. Seed test data (3-5 articles with comments)

```bash
docker exec blog_app php artisan db:seed
```

## Access

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:3000       |
| API      | http://localhost:8000/api   |

## API Endpoints

| Method | Endpoint                          | Description            |
|--------|-----------------------------------|------------------------|
| GET    | /api/articles                     | List all articles      |
| GET    | /api/articles/{id}                | Get article + comments |
| POST   | /api/articles                     | Create article         |
| POST   | /api/articles/{id}/comments       | Add comment            |

### POST /api/articles body
```json
{ "title": "string", "content": "string" }
```

### POST /api/articles/{id}/comments body
```json
{ "author_name": "string", "content": "string" }
```

## Reset database

```bash
docker exec blog_app php artisan migrate:fresh --seed
```
