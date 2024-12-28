"use server";

export const fetchUtility = async <T>(
  endpoint: string | URL | globalThis.Request,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });
  return (await res.json()) as T;
};
