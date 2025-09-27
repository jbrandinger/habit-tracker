import { ApiClient } from './client';
import { 
  AuthResponse, 
  LoginCredentials, 
  UserRegistration, 
  User,
  TokenRefreshResponse,
  LoginSchema,
  UserRegistrationSchema,
  UserSchema
} from '../types/user';

export class AuthApi {
  constructor(private client: ApiClient) {}

  async register(data: UserRegistration): Promise<AuthResponse> {
    // Validate input data
    const validatedData = UserRegistrationSchema.parse(data);
    
    const response = await this.client.post<AuthResponse>('/auth/register/', validatedData);
    
    // Validate response data
    const authData = {
      ...response.data,
      user: UserSchema.parse(response.data.user)
    };
    
    // Store tokens in the client
    this.client.setTokens(authData.access, authData.refresh);
    
    return authData;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Validate input data
    const validatedCredentials = LoginSchema.parse(credentials);
    
    const response = await this.client.post<AuthResponse>('/auth/login/', validatedCredentials);
    
    // Validate response data
    const authData = {
      ...response.data,
      user: UserSchema.parse(response.data.user)
    };
    
    // Store tokens in the client
    this.client.setTokens(authData.access, authData.refresh);
    
    return authData;
  }

  async logout(): Promise<void> {
    // Clear tokens from client
    this.client.clearTokens();
    
    // Could also call a logout endpoint if implemented on backend
    // await this.client.post('/auth/logout/');
  }

  async refreshToken(): Promise<TokenRefreshResponse | null> {
    const newToken = await this.client.refreshAccessToken();
    
    if (newToken) {
      return { access: newToken };
    }
    
    return null;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.client.get<User>('/auth/profile/');
    return UserSchema.parse(response.data);
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.client.patch<User>('/auth/profile/', data);
    return UserSchema.parse(response.data);
  }
}
