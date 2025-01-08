const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface RequestConfig<T = unknown> extends RequestInit {
  data?: T;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const apiClient = {
  request: async (
    endpoint: string,
    { data, ...customConfig }: RequestConfig = {},
  ) => {
    const config: RequestConfig = {
      ...customConfig,
      headers: {
        "Content-Type": "application/json",
        ...customConfig.headers,
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (response.ok) {
        return data;
      }

      throw new ApiError(
        response.status,
        data.message || "Something went wrong",
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Network error");
    }
  },

  // Convenience methods
  get: <T>(endpoint: string, config: RequestConfig = {}) => {
    return apiClient.request(endpoint, {
      ...config,
      method: "GET",
    }) as Promise<T>;
  },

  post: <TResponse, TRequest = object>(
    endpoint: string,
    data?: TRequest,
    config: RequestConfig = {}
  ) => {
    return apiClient.request(endpoint, {
      ...config,
      method: "POST",
      data,
    }) as Promise<TResponse>;
  },
};
