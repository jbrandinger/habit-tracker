import { z } from 'zod';

// Habit frequency enum
export const HabitFrequency = {
  DAILY: 'daily',
  WEEKLY: 'weekly', 
  CUSTOM: 'custom',
} as const;

export type HabitFrequencyType = typeof HabitFrequency[keyof typeof HabitFrequency];

// Base habit schema
export const HabitSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Habit name is required').max(200, 'Habit name too long'),
  description: z.string().optional(),
  frequency: z.enum(['daily', 'weekly', 'custom']),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  current_streak: z.number().min(0),
  best_streak: z.number().min(0),
  is_completed_today: z.boolean(),
  completion_rate: z.number().min(0).max(100),
});

// Habit creation schema (for POST requests)
export const HabitCreateSchema = z.object({
  name: z.string().min(1, 'Habit name is required').max(200, 'Habit name too long'),
  description: z.string().optional(),
  frequency: z.enum(['daily', 'weekly', 'custom']).default('daily'),
});

// Habit update schema (for PUT/PATCH requests)
export const HabitUpdateSchema = z.object({
  name: z.string().min(1, 'Habit name is required').max(200, 'Habit name too long').optional(),
  description: z.string().optional(),
  frequency: z.enum(['daily', 'weekly', 'custom']).optional(),
  is_active: z.boolean().optional(),
});

// Habit completion schema
export const HabitCompletionSchema = z.object({
  id: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  completed: z.boolean(),
  notes: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Habit completion toggle schema (for toggling completion status)
export const HabitCompletionToggleSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
  completed: z.boolean(),
  notes: z.string().optional(),
});

// Habit statistics schema
export const HabitStatsSchema = z.object({
  total_habits: z.number().min(0),
  active_habits: z.number().min(0),
  completed_today: z.number().min(0),
  total_today: z.number().min(0),
  completion_percentage: z.number().min(0).max(100),
  longest_streak: z.number().min(0),
});

// TypeScript types derived from schemas
export type Habit = z.infer<typeof HabitSchema>;
export type HabitCreate = z.infer<typeof HabitCreateSchema>;
export type HabitUpdate = z.infer<typeof HabitUpdateSchema>;
export type HabitCompletion = z.infer<typeof HabitCompletionSchema>;
export type HabitCompletionToggle = z.infer<typeof HabitCompletionToggleSchema>;
export type HabitStats = z.infer<typeof HabitStatsSchema>;

// API response types
export interface HabitListResponse {
  results: Habit[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface HabitCompletionListResponse {
  results: HabitCompletion[];
  count: number;
  next: string | null;
  previous: string | null;
}

// Utility types for frontend components
export interface HabitWithProgress extends Habit {
  progressPercentage: number;
  streakStatus: 'none' | 'building' | 'at-risk' | 'lost';
}

// Form validation helpers
export const validateHabitName = (name: string): string | null => {
  const result = z.string().min(1, 'Habit name is required').max(200, 'Habit name too long').safeParse(name);
  return result.success ? null : result.error.errors[0]?.message || 'Invalid name';
};

export const validateHabitFrequency = (frequency: string): boolean => {
  return Object.values(HabitFrequency).includes(frequency as HabitFrequencyType);
};