# Backend - T2G Salary Admin

Laravel 12 API providing salary upsert and admin-only management.

## Features

- Sanctum authentication
- Users table with `is_admin` flag
- Salary management with soft deletes
- Repository and Service layers
- Policies for access control
- Centralized error handling
- REST API returning JSON
- PHPUnit feature and unit tests

## Requirements

- PHP 8.2+
- Composer
- MySQL 8
- Laravel 12

## Setup

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
```

This seeds one admin user:

* Email: `admin@gmail.com`
* Password: `12345678`

## Running

```bash
php artisan serve
```

API will be available at `http://localhost:8000`.

## API Endpoints

* `POST /api/login` → authenticate admin
* `POST /api/logout` → revoke token
* `POST /api/salaries` → public upsert
* `GET /api/salaries` → admin list (paginated)
* `PUT /api/salaries/{id}` → admin update
* `DELETE /api/salaries/{id}` → admin delete

## Testing

```bash
php artisan test
```

Includes feature tests (auth, salaries, delete) and unit tests (service, policies).