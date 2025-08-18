<?php

namespace App\Services;

use App\Models\Salary;
use App\Repositories\Contracts\SalaryRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SalaryService
{
    public function __construct(
        private readonly SalaryRepositoryInterface $salaries
    ) {
    }

    /**
     * Upsert salary by email with defaults and restore-on-upsert.
     *
     * @param array{name:string,email:string,salary_local:float|int|string,salary_euros?:float|int|string,commission?:float|int|string} $payload
     * @return Salary
     */
    public function upsertByEmail(array $payload): Salary
    {
        $payload['commission'] ??= 500.00;

        return $this->salaries->upsertByEmail($payload);
    }

    /**
     * Paginate salaries.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->salaries->paginate($perPage);
    }

    /**
     * Update salary by id (admin).
     *
     * @param int $id
     * @param array<string, mixed> $data
     * @return Salary
     */
    public function updateById(int $id, array $data): Salary
    {
        return $this->salaries->updateById($id, $data);
    }
}
