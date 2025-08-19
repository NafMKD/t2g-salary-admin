<?php

namespace App\Repositories;

use App\Models\Salary;
use App\Repositories\Contracts\SalaryRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SalaryRepository implements SalaryRepositoryInterface
{
    /**
     * Upsert a salary by email.
     *
     * @param array{name:string,email:string,salary_local:float|int|string,salary_euros?:float|int|string,commission?:float|int|string} $data
     * @return Salary
     */
    public function upsertByEmail(array $data): Salary
    {
        $query = Salary::withTrashed()->where('email', $data['email']);
        $existing = $query->first();

        if ($existing !== null && $existing->trashed()) {
            $existing->restore();
        }

        /** @var Salary $salary */
        $salary = Salary::updateOrCreate(
            ['email' => $data['email']],
            [
                'name' => $data['name'],
                'salary_local' => $data['salary_local'],
                // salary_euros and commission may be set by service rules
                'salary_euros' => $data['salary_euros'] ?? $existing?->salary_euros,
                'commission' => $data['commission'] ?? $existing?->commission ?? 500.00,
            ],
        );

        return $salary->refresh();
    }

    /**
     * Find all salaries (paginated).
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return Salary::query()->latest('id')->paginate($perPage);
    }

    /**
     * Find a salary by id.
     *
     * @param int $id
     * @return Salary|null
     */
    public function findById(int $id): ?Salary
    {
        return Salary::query()->find($id);
    }

    /**
     * Update a salary by id.
     *
     * @param int $id
     * @param array<string, mixed> $data
     * @return Salary
     */
    public function updateById(int $id, array $data): Salary
    {
        $salary = Salary::query()->findOrFail($id);
        $salary->fill($data)->save();

        return $salary->refresh();
    }

    /**
     * Delete a salary by id.
     *
     * @param int $id
     * @return bool
     */
    public function deleteById(int $id): bool
    {
        $salary = Salary::query()->findOrFail($id);
        return $salary->delete();
    }
}
