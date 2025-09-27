import { z } from 'zod';

// Habit completion entry schema
export const HabitEntrySchema = z.object({
  id: z.number(),
  habit_id: z.number(),
  user_id: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  completed_count: z.number().min(0),
  notes: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Schema for creating/updating entries
export const CreateHabitEntrySchema = HabitEntrySchema.omit({
  id: true,
  user_id: true,
  created_at: true,
  updated_at: true,
});

export const UpdateHabitEntrySchema = CreateHabitEntrySchema.partial();

// Habit statistics schema
export const HabitStatsSchema = z.object({
  habit_id: z.number(),
  total_completions: z.number(),
  current_streak: z.number(),
  longest_streak: z.number(),
  completion_rate: z.number().min(0).max(1), // 0-1 (percentage as decimal)
  last_completed: z.string().datetime().optional(),
  weekly_completions: z.array(z.number()), // Last 7 days
  monthly_completions: z.array(z.number()), // Last 30 days
});

// Dashboard summary schema
export const DashboardStatsSchema = z.object({
  total_habits: z.number(),
  active_habits: z.number(),
  completed_today: z.number(),
  current_streaks: z.number(),
  overall_completion_rate: z.number().min(0).max(1),
});

// TypeScript types
export type HabitEntry = z.infer<typeof HabitEntrySchema>;
export type CreateHabitEntry = z.infer<typeof CreateHabitEntrySchema>;
export type UpdateHabitEntry = z.infer<typeof UpdateHabitEntrySchema>;
export type HabitStats = z.infer<typeof HabitStatsSchema>;
export type DashboardStats = z.infer<typeof DashboardStatsSchema>;

// Utility types for date ranges
export type DateRange = {
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
};

export type TimeFilter = 'week' | 'month' | 'year' | 'custom';
