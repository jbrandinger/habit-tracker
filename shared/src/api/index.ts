import { ApiClient, ApiClientConfig } from './client';
import { AuthApi } from './auth';
import { HabitApi } from './habits';

/**
 * Main API class that provides access to all API endpoints
 */
export class Api {
  public client: ApiClient;
  public auth: AuthApi;
  public habits: HabitApi;

  constructor(config: ApiClientConfig) {
    this.client = new ApiClient(config);
    this.auth = new AuthApi(this.client);
    this.habits = new HabitApi(this.client);
  }

  /**
   * Set authentication tokens for all API calls
   */
  setTokens(accessToken: string, refreshToken?: string): void {
    this.client.setTokens(accessToken, refreshToken);
  }

  /**
   * Clear authentication tokens
   */
  clearTokens(): void {
    this.client.clearTokens();
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(): Promise<string | null> {
    return this.client.refreshAccessToken();
  }
}

// Export everything for convenience
export * from './client';
export * from './auth';
export * from './habits';
