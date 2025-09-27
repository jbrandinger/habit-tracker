import React, { createContext, useContext, useMemo } from 'react';
import { ApiClient, AuthApi } from '@habit-tracker/shared';

interface ApiContextType {
  apiClient: ApiClient;
  authApi: AuthApi;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Web-specific ApiClient that handles token storage in localStorage
class WebApiClient extends ApiClient {
  protected storeRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  protected clearStoredTokens(): void {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  }

  protected getStoredRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // Override setTokens to also store access token
  setTokens(accessToken: string, refreshToken?: string): void {
    super.setTokens(accessToken, refreshToken);
    localStorage.setItem('accessToken', accessToken);
  }

  // Method to restore tokens on app startup
  restoreTokensFromStorage(): void {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (accessToken) {
      this.setTokens(accessToken, refreshToken || undefined);
    }
  }
}

interface ApiProviderProps {
  children: React.ReactNode;
}

export function ApiProvider({ children }: ApiProviderProps) {
  const apiClient = useMemo(() => {
    const client = new WebApiClient({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    } as any);
    
    // Restore tokens on initialization
    client.restoreTokensFromStorage();
    
    return client;
  }, []);

  const authApi = useMemo(() => new AuthApi(apiClient), [apiClient]);

  const value = useMemo(
    () => ({
      apiClient,
      authApi,
    }),
    [apiClient, authApi]
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}
