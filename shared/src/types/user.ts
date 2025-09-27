import { z } from 'zod';

// Zod schemas for runtime validation
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  timezone: z.string().default('UTC'),
  created_at: z.string().datetime(),
});

export const UserRegistrationSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
  password_confirm: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
}).refine((data) => data.password === data.password_confirm, {
  message: "Passwords don't match",
  path: ["password_confirm"],
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// TypeScript types derived from schemas
export type User = z.infer<typeof UserSchema>;
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type LoginCredentials = z.infer<typeof LoginSchema>;

// Authentication response types
export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
}
