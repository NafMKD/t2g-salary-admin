<?php

namespace Tests\Feature;

use App\Models\Salary;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteSalaryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Admin can delete a salary.
     * 
     * @return void
     */
    public function test_admin_can_delete_salary(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $salary = Salary::factory()->create();

        $response = $this
            ->actingAs($admin)
            ->deleteJson("/api/salaries/{$salary->id}");

        $response->assertNoContent(); // 204
        $this->assertSoftDeleted('salaries', ['id' => $salary->id]);

        // Ensure it no longer appears in index
        $index = $this
            ->actingAs($admin)
            ->getJson('/api/salaries');

        $index->assertOk();
        $this->assertFalse(
            collect($index->json('data'))->contains(fn ($row) => $row['id'] === $salary->id),
            'Deleted salary should not appear in index results.'
        );
    }

    /**
     * Non-admin cannot delete salary.
     * 
     * @return void
     */
    public function test_non_admin_cannot_delete_salary(): void
    {
        $user = User::factory()->create(['is_admin' => false]);
        $salary = Salary::factory()->create();

        $response = $this
            ->actingAs($user)
            ->deleteJson("/api/salaries/{$salary->id}");

        $response->assertForbidden(); // 403
        $this->assertDatabaseHas('salaries', ['id' => $salary->id]);
    }

    /**
     * Guest (unauthenticated) cannot delete salary.
     * 
     * @return void
     */
    public function test_guest_cannot_delete_salary(): void
    {
        $salary = Salary::factory()->create();

        $response = $this->deleteJson("/api/salaries/{$salary->id}");

        $response->assertUnauthorized(); // 401
        $this->assertDatabaseHas('salaries', ['id' => $salary->id]);
    }
}
