import { z } from 'zod';

// Habit frequency types
export const HabitFrequencySchema = z.enum(['daily', 'weekly', 'custom']);
export type HabitFrequency = z.infer<typeof HabitFrequencySchema>;

// Habit category schema
export const HabitCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i), // Hex color
  icon: z.string().optional(),
});

// Main habit schema
export const HabitSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  category: HabitCategorySchema.optional(),
  frequency: HabitFrequencySchema,
  target_count: z.number().min(1).default(1),
  is_active: z.boolean().default(true),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Habit creation/update schemas
export const CreateHabitSchema = HabitSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
  updated_at: true,
});

export const UpdateHabitSchema = CreateHabitSchema.partial();

// TypeScript types
export type HabitCategory = z.infer<typeof HabitCategorySchema>;
export type Habit = z.infer<typeof HabitSchema>;
export type CreateHabit = z.infer<typeof CreateHabitSchema>;
export type UpdateHabit = z.infer<typeof UpdateHabitSchema>;

// Default categories
export const DEFAULT_CATEGORIES: Omit<HabitCategory, 'id'>[] = [
  { name: 'Health', color: '#10B981', icon: '🏃' },
  { name: 'Learning', color: '#3B82F6', icon: '📚' },
  { name: 'Productivity', color: '#8B5CF6', icon: '⚡' },
  { name: 'Mindfulness', color: '#06B6D4', icon: '🧘' },
  { name: 'Social', color: '#F59E0B', icon: '👥' },
  { name: 'Creative', color: '#EF4444', icon: '🎨' },
];
