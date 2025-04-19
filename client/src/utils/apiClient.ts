const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiClient = {
  get: async <TResponse>(endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<TResponse>;
  },

  post: async <TResponse, TRequest = unknown>(
    endpoint: string,
    data?: TRequest
  ) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<TResponse>;
  },
};
