<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSalaryRequest;
use App\Http\Requests\UpdateSalaryRequest;
use App\Http\Resources\SalaryResource;
use App\Models\Salary;
use App\Services\SalaryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    public function __construct(
        private readonly SalaryService $service
    ) {
    }

    /**
     * Public upsert by email.
     *
     * @param StoreSalaryRequest $request
     * @return JsonResponse
     */
    public function store(StoreSalaryRequest $request): JsonResponse
    {
        $salary = $this->service->upsertByEmail($request->validated());

        return response()->json(new SalaryResource($salary), 201);
    }

    /**
     * Admin: list salaries (paginated).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $this->authorize('viewAny', Salary::class);

        $perPage = (int) ($request->integer('per_page') ?: 15);
        $paginator = $this->service->paginate($perPage);

        return response()->json([
            'data' => SalaryResource::collection($paginator->items()),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
            ],
        ]);
    }

    /**
     * Admin: update salary by id.
     *
     * @param int $id
     * @param UpdateSalaryRequest $request
     * @return JsonResponse
     */
    public function update(int $id, UpdateSalaryRequest $request): JsonResponse
    {
        $salary = Salary::query()->findOrFail($id);
        $this->authorize('update', $salary);

        $updated = $this->service->updateById($id, $request->validated());

        return response()->json(new SalaryResource($updated));
    }
}
