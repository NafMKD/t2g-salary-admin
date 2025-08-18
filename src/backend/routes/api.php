<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SalaryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/salaries', [SalaryController::class, 'store']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('/salaries', [SalaryController::class, 'index']);
    Route::put('/salaries/{id}', [SalaryController::class, 'update']);
});