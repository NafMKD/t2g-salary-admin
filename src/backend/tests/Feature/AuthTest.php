<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    
    /**
     * Admin can obtain a Sanctum token.
     *
     * @return void
     */
    public function test_admin_can_login_and_receive_token(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => Hash::make('StrongPassword123!'),
            'is_admin' => true,
        ]);

        $resp = $this->postJson('/api/login', [
            'email' => 'admin@example.com',
            'password' => 'StrongPassword123!',
        ]);

        $resp->assertOk()->assertJsonStructure(['token']);
    }

    /**
     * Invalid credentials are rejected.
     *
     * @return void
     */
    public function test_login_with_invalid_credentials_fails(): void
    {
        $this->postJson('/api/login', [
            'email' => 'nobody@example.com',
            'password' => 'wrong',
        ])->assertStatus(401);
    }
}
