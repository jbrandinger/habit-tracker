import React, { createContext, useContext, useMemo } from 'react';
import { Api } from '@habit-tracker/shared';

interface ApiContextType extends Api {}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Web-specific Api that handles token storage in localStorage
class WebApi extends Api {
  constructor(config: any) {
    super(config);
    
    // Override the client methods for web-specific token storage
    const originalStoreRefreshToken = this.client.storeRefreshToken?.bind(this.client);
    const originalClearStoredTokens = this.client.clearStoredTokens?.bind(this.client);
    const originalGetStoredRefreshToken = this.client.getStoredRefreshToken?.bind(this.client);
    
    // Web-specific token storage
    (this.client as any).storeRefreshToken = (token: string) => {
      localStorage.setItem('refreshToken', token);
    };
    
    (this.client as any).clearStoredTokens = () => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    };
    
    (this.client as any).getStoredRefreshToken = () => {
      return localStorage.getItem('refreshToken');
    };
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
  const api = useMemo(() => {
    const apiInstance = new WebApi({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    });
    
    // Restore tokens on initialization
    apiInstance.restoreTokensFromStorage();
    
    return apiInstance;
  }, []);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}
