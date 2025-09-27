import { z } from 'zod';

/**
 * Validation utility functions
 */

export function validateEmail(email: string): boolean {
  const emailSchema = z.string().email();
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function isValidHexColor(color: string): boolean {
  const hexColorSchema = z.string().regex(/^#[0-9A-F]{6}$/i);
  try {
    hexColorSchema.parse(color);
    return true;
  } catch {
    return false;
  }
}

export function validateDateString(dateString: string): boolean {
  const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
  try {
    dateSchema.parse(dateString);
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}
