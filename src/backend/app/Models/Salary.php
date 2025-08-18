<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Salary extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Fillable attributes for mass assignment.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'email',
        'salary_local',
        'salary_euros',
        'commission',
    ];

    /**
     * Cast attributes.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'salary_local' => 'decimal:2',
        'salary_euros' => 'decimal:2',
        'commission' => 'decimal:2',
    ];
}
