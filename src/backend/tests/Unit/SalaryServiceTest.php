<?php

namespace Tests\Unit;

use App\Models\Salary;
use App\Repositories\Contracts\SalaryRepositoryInterface;
use App\Services\SalaryService;
use Mockery;
use PHPUnit\Framework\TestCase;

class SalaryServiceTest extends TestCase
{
    /**
     * Sets default commission to 500.00 when missing.
     *
     * @return void
     */
    public function test_upsert_sets_default_commission(): void
    {
        $payload = [
            'name' => 'Jane',
            'email' => 'jane@example.com',
            'salary_local' => 150000,
        ];

        $expected = new Salary();
        $expected->name = 'Jane';
        $expected->email = 'jane@example.com';
        $expected->salary_local = 150000;
        $expected->commission = 500.00;

        $repo = Mockery::mock(SalaryRepositoryInterface::class);
        $repo->shouldReceive('upsertByEmail')
            ->once()
            ->with(Mockery::on(function (array $arg): bool {
                return ($arg['commission'] ?? null) === 500.00;
            }))
            ->andReturn($expected);

        $service = new SalaryService($repo);
        $result = $service->upsertByEmail($payload);

        $this->assertSame(500.00, (float) $result->commission);
    }

    /**
     * Passes through update to repository.
     *
     * @return void
     */
    public function test_update_by_id_delegates_to_repository(): void
    {
        $repo = Mockery::mock(SalaryRepositoryInterface::class);
        $service = new SalaryService($repo);

        $updated = new Salary();
        $updated->id = 1;
        $updated->commission = 600.00;

        $repo->shouldReceive('updateById')
            ->once()
            ->with(1, ['commission' => 600.00])
            ->andReturn($updated);

        $res = $service->updateById(1, ['commission' => 600.00]);

        $this->assertEquals(600.00, (float) $res->commission);
    }

    /**
     * Cleanup Mockery container.
     *
     * @return void
     */
    protected function tearDown(): void
    {
        Mockery::close();

        parent::tearDown();
    }
}
