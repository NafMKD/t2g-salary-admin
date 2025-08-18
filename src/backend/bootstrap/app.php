<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Always return JSON for API routes or JSON requests
        $exceptions->shouldRenderJsonWhen(
            fn ($request, Throwable $e) => $request->is('api/*') || $request->expectsJson()
        );

        // 401: unauthenticated
        $exceptions->render(function (AuthenticationException $e, $request) {
            return response()->json(['error' => ['message' => 'Unauthenticated']], 401);
        });

        // 403: policy/authorization denial
        $exceptions->render(function (AuthorizationException $e, $request) {
            return response()->json(['error' => ['message' => 'Forbidden']], 403);
        });

        // 404: model not found
        $exceptions->render(function (ModelNotFoundException $e, $request) {
            return response()->json(['error' => ['message' => 'Not Found']], 404);
        });

        // 422: validation errors
        $exceptions->render(function (ValidationException $e, $request) {
            return response()->json([
                'error' => [
                    'message' => 'Validation Failed',
                    'details' => $e->errors(),
                ],
            ], 422);
        });

        // Any HttpException preserves its status code
        $exceptions->render(function (HttpExceptionInterface $e, $request) {
            return response()->json(
                ['error' => ['message' => $e->getMessage() ?: 'Http Error']],
                $e->getStatusCode()
            );
        });
    })->create();
