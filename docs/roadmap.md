## Scope and goals

* REST API for salary upsert and admin management.
* Unique email enforced, upsert on conflict.
* Admin edits `salary_euros` and `commission`.
* `displayed_salary = salary_euros + commission` on read.
* Use **Sanctum** for auth. 

## Architecture

* Laravel 12 API-only.
* Layers:
  * **Controllers**: HTTP.
  * **Requests**: Validation and Sanitation.
  * **Services**: Business rules and orchestration.
  * **Repositories**: DB persistence via Eloquent.
  * **Policies**: Authorization.
* Auth: **Laravel Sanctum** personal access tokens.
* Models: `User`, `Salary` (both with SoftDeletes).
* DB: MySQL.

## Auth model (Sanctum)

* Use default `users` table with an `is_admin` boolean.
* Endpoints:
  * `POST /api/login` → returns Sanctum token.
  * `POST /api/logout` → revokes current token.
* Protect admin routes with `auth:sanctum`.
* Policies check `user.is_admin === true`.

## Policies

* `SalaryPolicy`:
  * `viewAny(User $user)`: allow if `is_admin`.
  * `update(User $user, Salary $salary)`: allow if `is_admin`.
* Public upsert does not require auth.

## API surface

* **Auth**
  * `POST /api/login` → `{ email, password }` → `{ token }`
  * `POST /api/logout` → revoke current token
* **Salary**
  * `POST /api/salaries` (public)
    Upsert by `email`. Validates `name`, `email`, `salary_local`.
  * `GET /api/salaries` (admin, `auth:sanctum`)
    List with `displayed_salary`.
  * `PUT /api/salaries/{id}` (admin, `auth:sanctum`)
    Update `salary_local`, `salary_euros`, `commission`.

### Response example

```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@mail.com",
  "salary_local": "150000.00",
  "salary_euros": "2500.00",
  "commission": "500.00",
  "displayed_salary": "3000.00",
  "created_at": "...",
  "updated_at": "..."
}
```

## Validation

**Store**
* `name`: required|string|max:100
* `email`: required|email|max:100
* `salary_local`: required|numeric|min:0

**Update (admin)**
* `salary_local`: sometimes|numeric|min:0
* `salary_euros`: sometimes|numeric|min:0
* `commission`: sometimes|numeric|min:0

## Repository pattern

**Contracts**
* `SalaryRepositoryInterface`
  * `upsertByEmail(array $data): Salary`
  * `findAll(): Collection`
  * `findById(int $id): ?Salary`
  * `updateById(int $id, array $data): Salary`

**Implementation**
* `SalaryRepository` using Eloquent, excludes trashed by default.

## Services
* `SalaryService`
  * Defaults on create: `commission = 500` if not provided.
  * Upsert-by-email orchestration.

## Controllers (sketch)

* `AuthController@login/logout`
* `SalaryController@store/index/update`
  * `index` and `update` call `$this->authorize(...)`.

## Resources
* `SalaryResource` adds `displayed_salary = (salary_euros ?? 0) + commission`.

## Soft deletes
* `User` and `Salary` use `SoftDeletes`.
* Migrations add `deleted_at`.
* Repository excludes trashed by default.

**Special case: restore on upsert**
* If a `Salary` record with the same email exists but is soft-deleted, the repository should restore (`restore()`) that record instead of creating a new one.
* After restoring, update it with the new salary data.

## Error handling

* 401: unauthenticated.
* 403: not admin (policy denies).
* 404: missing resource.
* 422: validation errors.

## Testing plan

Feature tests:
* Upsert creates, then updates on same email.
* Default commission = 500 on create.
* `GET /api/salaries` and `PUT /api/salaries/{id}` require `auth:sanctum`.
* Admin-only policy enforced.
* `displayed_salary` correct.

Unit tests:
* `SalaryService` default logic.
* `SalaryPolicy` allows only admins.


