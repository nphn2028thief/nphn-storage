export const fetchUtility = async <T>(
  endpoint: string | URL | globalThis.Request,
  options?: RequestInit
): Promise<T | null> => {
  let fetchInstance: typeof fetch = fetch;

  // For SSR
  if (typeof window === "undefined") {
    const { default: nodeFetch } = await import("node-fetch");
    fetchInstance = nodeFetch as unknown as typeof fetch;
  }

  const res = await fetchInstance(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return (await res.json()) as T;
  }

  return null;
};
