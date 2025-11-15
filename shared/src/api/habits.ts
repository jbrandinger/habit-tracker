import { ApiClient } from './client';
import {
  Habit,
  HabitCreate,
  HabitUpdate,
  HabitCompletion,
  HabitCompletionToggle,
  HabitStats,
  HabitListResponse,
  HabitCompletionListResponse,
  HabitSchema,
  HabitCreateSchema,
  HabitUpdateSchema,
  HabitCompletionSchema,
  HabitCompletionToggleSchema,
  HabitStatsSchema,
} from '../types/habit';

export class HabitApi {
  constructor(private client: ApiClient) {}

  /**
   * Get all habits for the authenticated user
   */
  async getHabits(): Promise<Habit[]> {
    const response = await this.client.get<HabitListResponse>('/habits/');
    
    // Validate each habit in the response
    const validatedHabits = response.results.map(habit => 
      HabitSchema.parse(habit)
    );
    
    return validatedHabits;
  }

  /**
   * Get a specific habit by ID
   */
  async getHabit(id: number): Promise<Habit> {
    const response = await this.client.get<Habit>(`/habits/${id}/`);
    return HabitSchema.parse(response);
  }

  /**
   * Create a new habit
   */
  async createHabit(habitData: HabitCreate): Promise<Habit> {
    // Validate input data
    const validatedData = HabitCreateSchema.parse(habitData);
    
    const response = await this.client.post<Habit>('/habits/', validatedData);
    return HabitSchema.parse(response);
  }

  /**
   * Update an existing habit
   */
  async updateHabit(id: number, habitData: HabitUpdate): Promise<Habit> {
    // Validate input data
    const validatedData = HabitUpdateSchema.parse(habitData);
    
    const response = await this.client.patch<Habit>(`/habits/${id}/`, validatedData);
    return HabitSchema.parse(response);
  }

  /**
   * Delete a habit
   */
  async deleteHabit(id: number): Promise<void> {
    await this.client.delete(`/habits/${id}/`);
  }

  /**
   * Toggle habit completion for a specific date (defaults to today)
   */
  async toggleHabitCompletion(
    habitId: number, 
    toggleData: HabitCompletionToggle
  ): Promise<HabitCompletion> {
    // Validate input data
    const validatedData = HabitCompletionToggleSchema.parse(toggleData);
    
    const response = await this.client.post<HabitCompletion>(
      `/habits/${habitId}/toggle/`, 
      validatedData
    );
    return HabitCompletionSchema.parse(response);
  }

  /**
   * Mark habit as completed for today
   */
  async markHabitComplete(habitId: number, notes?: string): Promise<HabitCompletion> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    return this.toggleHabitCompletion(habitId, {
      date: today,
      completed: true,
      notes,
    });
  }

  /**
   * Mark habit as incomplete for today
   */
  async markHabitIncomplete(habitId: number): Promise<HabitCompletion> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    return this.toggleHabitCompletion(habitId, {
      date: today,
      completed: false,
    });
  }

  /**
   * Get completion history for a specific habit
   */
  async getHabitCompletions(
    habitId: number,
    startDate?: string,
    endDate?: string
  ): Promise<HabitCompletion[]> {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    const url = `/habits/${habitId}/completions/${params.toString() ? '?' + params.toString() : ''}`;
    const response = await this.client.get<HabitCompletionListResponse>(url);
    
    // Validate each completion in the response
    const validatedCompletions = response.results.map(completion => 
      HabitCompletionSchema.parse(completion)
    );
    
    return validatedCompletions;
  }

  /**
   * Get habit statistics for the authenticated user
   */
  async getHabitStats(): Promise<HabitStats> {
    const response = await this.client.get<HabitStats>('/habits/stats/');
    return HabitStatsSchema.parse(response);
  }

  /**
   * Get today's habits with completion status
   */
  async getTodayHabits(): Promise<Habit[]> {
    const response = await this.client.get<Habit[]>('/habits/today/');
    
    // Validate each habit in the response
    const validatedHabits = response.map(habit => 
      HabitSchema.parse(habit)
    );
    
    return validatedHabits;
  }

  /**
   * Get habits with completion data for a date range (useful for calendar views)
   */
  async getHabitsWithCompletions(
    startDate: string,
    endDate: string
  ): Promise<{ habit: Habit; completions: HabitCompletion[] }[]> {
    const habits = await this.getHabits();
    
    const habitsWithCompletions = await Promise.all(
      habits.map(async (habit) => {
        const completions = await this.getHabitCompletions(habit.id, startDate, endDate);
        return { habit, completions };
      })
    );
    
    return habitsWithCompletions;
  }

  /**
   * Bulk toggle multiple habits for today
   */
  async bulkToggleToday(
    toggles: { habitId: number; completed: boolean; notes?: string }[]
  ): Promise<HabitCompletion[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const completions = await Promise.all(
      toggles.map(({ habitId, completed, notes }) =>
        this.toggleHabitCompletion(habitId, {
          date: today,
          completed,
          notes,
        })
      )
    );
    
    return completions;
  }
}
