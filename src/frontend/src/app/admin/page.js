import LogoutButton from "@/components/logout-button";
import SalaryTable from "@/components/salary-table/salary-table";
import ProtectedRoute from "@/components/protected-route";

export default function Page() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <LogoutButton />
        </nav>

        <main className="p-6">
          <SalaryTable />
        </main>
      </div>
    </ProtectedRoute>
  );
}
