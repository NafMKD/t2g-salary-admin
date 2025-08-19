import LogoutButton from "@/components/logout-button";
import SalaryTable from "@/components/salary-table";

export default function Page() {
  return (
    <section className="space-y-6">
      <LogoutButton />
      <SalaryTable />
    </section>
  );
}
