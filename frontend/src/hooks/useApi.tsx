import { useState, useCallback, useEffect } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type UseApiOptions = Omit<RequestInit, "method" | "body"> & {
  method?: HttpMethod;
  body?: Record<string, any>;
  skipFetch?: boolean;
};

type ApiError = {
  status: number;
  message: string;
};

export default function useApi<T>(
  url: string,
  options?: UseApiOptions,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(
    async (overrideOptions?: UseApiOptions) => {
      setIsLoading(true);
      setError(null);

      const finalOptions: RequestInit = {
        ...options,
        ...overrideOptions,
        method: overrideOptions?.method || options?.method || "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          ...options?.headers,
          ...overrideOptions?.headers,
        },
        body: overrideOptions?.body
          ? JSON.stringify(overrideOptions.body)
          : options?.body
            ? JSON.stringify(options.body)
            : undefined,
      };

      const controller = new AbortController();
      finalOptions.signal = controller.signal;

      try {
        const response = await fetch(url, finalOptions);

        if (!response.ok) {
          const errorResponse = await response.json();
          const errorData: ApiError = {
            status: response.status,
            message: errorResponse.error || "Something went wrong",
          };
          setError(errorData);
          throw errorData;
        }

        const result = await response.json();
        setData(result);
        return result;
      } catch (err: any) {
        if (err.name !== "AbortError") {
          const fallbackError: ApiError = {
            status: 0,
            message: err.message || "Something went wrong",
          };
          setError(fallbackError);
          throw fallbackError;
        }
      } finally {
        setIsLoading(false);
      }

      return () => {
        controller.abort();
      };
    },
    [url, options],
  );

  useEffect(() => {
    if (!options?.skipFetch) {
      fetchData().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, isLoading, error, fetchData };
}
