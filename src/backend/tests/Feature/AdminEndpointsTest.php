<?php

namespace Tests\Feature;

use App\Models\Salary;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminEndpointsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Non-authenticated request to admin list is rejected.
     *
     * @return void
     */
    public function test_admin_list_requires_authentication(): void
    {
        $this->getJson('/api/salaries')->assertStatus(401);
    }

    /**
     * Authenticated non-admin is forbidden by policy.
     *
     * @return void
     */
    public function test_non_admin_cannot_access_admin_list(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        Sanctum::actingAs($user);

        $this->getJson('/api/salaries')->assertStatus(403);
    }

    /**
     * Admin can list salaries and see displayed_salary.
     *
      * @return void
     */
    public function test_admin_can_list_salaries_with_displayed_salary(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => Hash::make('StrongPassword123!'),
            'is_admin' => true,
        ]);

        Salary::factory()->create([
            'name' => 'Alice',
            'email' => 'alice@example.com',
            'salary_local' => 100000,
            'salary_euros' => 2000,
            'commission' => 500,
        ]);

        Sanctum::actingAs($admin);

        $resp = $this->getJson('/api/salaries');

        $resp->assertOk()
            ->assertJsonStructure(['data', 'meta'])
            ->assertJsonPath('data.0.email', 'alice@example.com')
            ->assertJsonPath('data.0.displayed_salary', '2500.00');
    }

    /**
     * Admin can update salary fields.
     *
     * @return void
     */
    public function test_admin_can_update_salary(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $salary = Salary::factory()->create([
            'salary_local' => 80000,
            'salary_euros' => 1000,
            'commission' => 500,
        ]);

        Sanctum::actingAs($admin);

        $resp = $this->putJson("/api/salaries/{$salary->id}", [
            'salary_local' => 90000,
            'salary_euros' => 1100,
            'commission' => 650,
        ]);

        $resp->assertOk()
            ->assertJsonPath('salary_local', '90000.00')
            ->assertJsonPath('salary_euros', '1100.00')
            ->assertJsonPath('commission', '650.00')
            ->assertJsonPath('displayed_salary', '1750.00');

        $this->assertDatabaseHas('salaries', [
            'id' => $salary->id,
            'salary_local' => 90000.00,
            'salary_euros' => 1100.00,
            'commission' => 650.00,
        ]);
    }
}
