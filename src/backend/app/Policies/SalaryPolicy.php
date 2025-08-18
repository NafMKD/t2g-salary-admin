<?php

namespace App\Policies;

use App\Models\User;

class SalaryPolicy
{
    /**
     * Determine if user can view any salaries.
     *
     * @param User $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return $user->is_admin === true;
    }

    /**
     * Determine if user can update a salary.
     *
     * @param User $user
     * @return bool
     */
    public function update(User $user): bool
    {
        return $user->is_admin === true;
    }
}
