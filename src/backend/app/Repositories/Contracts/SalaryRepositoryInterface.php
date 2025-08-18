<?php

namespace App\Repositories\Contracts;

use App\Models\Salary;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface SalaryRepositoryInterface
{
    /**
     * Upsert a salary by email.
     *
     * @param array{name:string,email:string,salary_local:float|int|string,salary_euros?:float|int|string,commission?:float|int|string} $data
     * @return Salary
     */
    public function upsertByEmail(array $data): Salary;

    /**
     * Find all salaries (paginated).
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator;

    /**
     * Find a salary by id.
     *
     * @param int $id
     * @return Salary|null
     */
    public function findById(int $id): ?Salary;

    /**
     * Update a salary by id.
     *
     * @param int $id
     * @param array<string, mixed> $data
     * @return Salary
     */
    public function updateById(int $id, array $data): Salary;
}
