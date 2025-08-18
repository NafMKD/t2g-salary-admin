<?php

namespace Tests\Feature;

use App\Models\Salary;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SalaryUpsertTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Creates a new salary when email does not exist.
     *
     * @return void
     */
    public function test_public_upsert_creates_new_salary(): void
    {
        $payload = [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'salary_local' => 150000,
        ];

        $resp = $this->postJson('/api/salaries', $payload);

        $resp->assertCreated()
            ->assertJsonPath('email', 'jane@example.com')
            ->assertJsonPath('name', 'Jane Doe');

        $this->assertDatabaseHas('salaries', [
            'email' => 'jane@example.com',
            'deleted_at' => null,
        ]);
    }

    /**
     * Updates existing salary when email exists.
     *
     * @return void
     */
    public function test_public_upsert_updates_existing_salary(): void
    {
        Salary::factory()->create([
            'name' => 'Jane',
            'email' => 'jane@example.com',
            'salary_local' => 100000,
        ]);

        $payload = [
            'name' => 'Jane Updated',
            'email' => 'jane@example.com',
            'salary_local' => 175000,
        ];

        $resp = $this->postJson('/api/salaries', $payload);

        $resp->assertCreated()
            ->assertJsonPath('name', 'Jane Updated')
            ->assertJsonPath('salary_local', '175000.00');

        $this->assertDatabaseHas('salaries', [
            'email' => 'jane@example.com',
            'name' => 'Jane Updated',
            'salary_local' => 175000.00,
        ]);
    }

    /**
     * Restores soft-deleted salary and updates it on upsert.
     *
     * @return void
     */
    public function test_public_upsert_restores_soft_deleted_salary(): void
    {
        $salary = Salary::factory()->create([
            'name' => 'Soft Deleted',
            'email' => 'restoreme@example.com',
            'salary_local' => 90000,
        ]);

        $salary->delete();

        $payload = [
            'name' => 'Restored Name',
            'email' => 'restoreme@example.com',
            'salary_local' => 123456,
        ];

        $resp = $this->postJson('/api/salaries', $payload);
        $resp->assertCreated()
            ->assertJsonPath('email', 'restoreme@example.com')
            ->assertJsonPath('name', 'Restored Name')
            ->assertJsonPath('salary_local', '123456.00');

        // Ensures the same email now exists and is not soft-deleted
        $this->assertDatabaseHas('salaries', [
            'email' => 'restoreme@example.com',
            'deleted_at' => null,
            'salary_local' => 123456.00,
        ]);

        // There must be only one record with that email
        $this->assertSame(1, Salary::withTrashed()->where('email', 'restoreme@example.com')->count());
    }
}
