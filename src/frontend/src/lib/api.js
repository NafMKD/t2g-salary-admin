const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function buildHeaders(token) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function apiGet(path, token) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: buildHeaders(token),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function apiPost(path, body, token) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function apiPut(path, body, token) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "PUT",
    headers: buildHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}
