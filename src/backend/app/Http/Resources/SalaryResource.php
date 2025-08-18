<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $displayed = (float) ($this->salary_euros ?? 0) + (float) $this->commission;
        
        return [
            'id' => $this->id,
            'name' => (string) $this->name,
            'email' => (string) $this->email,
            'salary_local' => (string) $this->salary_local,
            'salary_euros' => $this->salary_euros !== null ? (string) $this->salary_euros : null,
            'commission' => (string) $this->commission,
            'displayed_salary' => number_format($displayed, 2, '.', ''),
            'created_at' => optional($this->created_at)?->toISOString(),
            'updated_at' => optional($this->updated_at)?->toISOString(),
        ];
    }
}
