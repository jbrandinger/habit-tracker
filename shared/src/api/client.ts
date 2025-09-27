import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
}

export class ApiClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;

  constructor(config: ApiClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          this.clearTokens();
        }
        return Promise.reject(error);
      }
    );
  }

  // Token management
  setTokens(accessToken: string, refreshToken?: string): void {
    this.accessToken = accessToken;
    if (refreshToken) {
      // Store refresh token (implementation depends on platform)
      this.storeRefreshToken(refreshToken);
    }
  }

  clearTokens(): void {
    this.accessToken = null;
    this.clearStoredTokens();
  }

  // Platform-specific token storage (to be overridden)
  protected storeRefreshToken(token: string): void {
    // Default implementation - override in platform-specific clients
    console.warn('storeRefreshToken not implemented');
  }

  protected clearStoredTokens(): void {
    // Default implementation - override in platform-specific clients
    console.warn('clearStoredTokens not implemented');
  }

  protected getStoredRefreshToken(): string | null {
    // Default implementation - override in platform-specific clients
    console.warn('getStoredRefreshToken not implemented');
    return null;
  }

  // HTTP methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get(url, config);
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put(url, data, config);
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete(url, config);
  }

  // Token refresh
  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getStoredRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await this.post('/auth/token/refresh/', {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      this.setTokens(newAccessToken);
      return newAccessToken;
    } catch (error) {
      this.clearTokens();
      return null;
    }
  }
}
