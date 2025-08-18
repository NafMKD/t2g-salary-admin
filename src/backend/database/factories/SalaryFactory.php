<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Salary;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Salary>
 */
class SalaryFactory extends Factory
{
    /** @var class-string<\App\Models\Salary> */
    protected $model = Salary::class;


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'salary_local' => $this->faker->numberBetween(10_000, 200_000),
            'salary_euros' => null,
            'commission' => 500.00,
        ];
    }
}
