"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";

export default function SalaryForm() {
  const [form, setForm] = useState({ name: "", email: "", salaryLocal: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (key) => (e) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        salary_local: Number(form.salaryLocal),
      };
      const res = await apiPost("/api/salaries", payload);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-4 text-xl font-semibold">Submit or Update Your Salary</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange("name")}
          className="w-full rounded-lg border px-3 py-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange("email")}
          className="w-full rounded-lg border px-3 py-2"
          required
        />
        <input
          type="number"
          placeholder="Salary in Local Currency"
          value={form.salaryLocal}
          onChange={handleChange("salaryLocal")}
          className="w-full rounded-lg border px-3 py-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black px-4 py-2 text-white"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {result && (
        <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm">
          <div className="font-medium">Saved</div>
          <div>Email: {result.email}</div>
          <div>Local Salary: {result.salary_local}</div>
          <div>Displayed Salary: {result.displayed_salary}</div>
        </div>
      )}
    </div>
  );
}
