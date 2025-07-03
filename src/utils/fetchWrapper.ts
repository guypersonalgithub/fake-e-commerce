import { getToken } from "@/stores/storeUtils";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export async function fetchWrapper<T, B extends Record<string, unknown> = Record<string, unknown>>(
  path: string,
  options: {
    method: Method;
    body?: B; // This is just a naive approach for the sake of this fake e-commerece. Ideally, overload functions can be used, where a body is optional in non-GET methods, while on GET, it doesn't exist.
    headers?: Record<string, string>;
    errorMessage: string;
  },
) {
  const { method, body, headers = {}, errorMessage } = options;
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`https://fakestoreapi.com/${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
}

