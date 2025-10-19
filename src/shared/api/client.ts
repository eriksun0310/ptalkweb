// API Client - Fetch wrapper with error handling

// 使用 Next.js API Route 作為代理，解決 CORS 問題
// 開發環境使用本地代理，生產環境可以設定環境變數
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export class APIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = 'APIError';
  }
}

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

/**
 * Fetch API wrapper with error handling
 * @param endpoint - API endpoint (e.g., '/comments/123')
 * @param options - Fetch options with optional query params
 * @returns Parsed JSON response
 */
export async function fetchAPI<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T> {
  const { params, ...fetchOptions } = options || {};

  // Build URL with query params
  let url = `${API_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions?.headers,
      },
    });

    if (!res.ok) {
      throw new APIError(res.status, res.statusText);
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * GET request helper
 */
export async function get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
  return fetchAPI<T>(endpoint, { method: 'GET', params });
}

/**
 * POST request helper
 */
export async function post<T>(endpoint: string, body?: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
