<?php

namespace Tests\Unit;

use App\Models\Salary;
use App\Models\User;
use App\Policies\SalaryPolicy;
use PHPUnit\Framework\TestCase;

class SalaryPolicyTest extends TestCase
{
    /**
     * Admin can view and update; non-admin cannot.
     *
     * @return void
     */
    public function test_policy_admin_vs_non_admin(): void
    {
        $policy = new SalaryPolicy();

        $admin = new User(['is_admin' => true]);
        $user = new User(['is_admin' => false]);

        $this->assertTrue($policy->viewAny($admin));
        $this->assertTrue($policy->update($admin));

        $this->assertFalse($policy->viewAny($user));
        $this->assertFalse($policy->update($user));
    }
}
