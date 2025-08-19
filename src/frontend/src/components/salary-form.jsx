"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import Link from "next/link";

export default function SalaryForm() {
  const [form, setForm] = useState({ name: "", email: "", salaryLocal: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (key) => (e) => {
    setForm((s) => ({ ...s, [key]: e.target.value }));
    setFieldErrors((s) => ({ ...s, [key]: "" }));
  };

  function validateForm() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Enter a valid email";
    }
    if (!form.salaryLocal) {
      errs.salaryLocal = "Salary is required";
    } else if (Number(form.salaryLocal) <= 0) {
      errs.salaryLocal = "Enter a positive number";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        salary_local: Number(form.salaryLocal),
      };
      const res = await apiPost("/api/salaries", payload);
      setResult(res);
      setForm({ name: "", email: "", salaryLocal: "" });
    } catch (err) {
      let msg = "Something went wrong, please try agin.";
      if (err.message?.includes("401")) {
        msg = "Unauthenticated. Please log in to continue.";
      } else if (err.message?.includes("403")) {
        msg = "Access denied. You do not have the required permissions.";
      } else if (err.message?.includes("404")) {
        msg = "The requested resource could not be found.";
      } else if (err.message?.includes("422")) {
        msg = "Validation failed. Please check your inputs and try again.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Submit or Update Your Salary
      </h1>

      {error && (
        <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="rounded-xl border border-green-300 bg-green-50 p-4 text-sm text-green-700 mb-6 ">
          <p className="font-medium">Saved Successfully!</p>
          <div className="mt-2">
            <div>Email: {result.email}</div>
            <div>Local Salary: {result.salary_local}</div>
            <div>Displayed Salary: {result.displayed_salary}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange("name")}
            className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
              fieldErrors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-black"
            }`}
          />
          {fieldErrors.name && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange("email")}
            className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
              fieldErrors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-black"
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Salary in Local Currency"
            value={form.salaryLocal}
            onChange={handleChange("salaryLocal")}
            className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
              fieldErrors.salaryLocal
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-black"
            }`}
          />
          {fieldErrors.salaryLocal && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.salaryLocal}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          )}
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          If you are an admin, please{" "}
          <Link
            href="/admin/login"
            className="text-blue-600 hover:underline"
          >
            log in here
          </Link>{" "}
          to manage salaries.
        </p>
        </div>
    </div>
  );
}
