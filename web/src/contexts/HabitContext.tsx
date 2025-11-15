import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Habit, HabitCreate, HabitStats, Api } from '@habit-tracker/shared';
import { useApi } from './ApiContext';

interface HabitContextType {
  // Habits data
  habits: Habit[] | undefined;
  isLoadingHabits: boolean;
  habitsError: Error | null;
  
  // Habit stats
  stats: HabitStats | undefined;
  isLoadingStats: boolean;
  statsError: Error | null;
  
  // Mutations
  createHabit: (data: HabitCreate) => Promise<Habit>;
  updateHabit: (id: number, data: Partial<Habit>) => Promise<Habit>;
  deleteHabit: (id: number) => Promise<void>;
  toggleHabitCompletion: (habitId: number, completed: boolean, notes?: string) => Promise<void>;
  
  // Loading states
  isCreatingHabit: boolean;
  isUpdatingHabit: boolean;
  isDeletingHabit: boolean;
  isTogglingCompletion: boolean;
  
  // Refetch functions
  refetchHabits: () => void;
  refetchStats: () => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

interface HabitProviderProps {
  children: ReactNode;
}

export function HabitProvider({ children }: HabitProviderProps) {
  const api = useApi();
  const queryClient = useQueryClient();

  // Query for habits list
  const {
    data: habits,
    isLoading: isLoadingHabits,
    error: habitsError,
    refetch: refetchHabits,
  } = useQuery({
    queryKey: ['habits'],
    queryFn: () => api.habits.getHabits(),
    enabled: !!api,
  });

  // Query for habit stats
  const {
    data: stats,
    isLoading: isLoadingStats,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['habit-stats'],
    queryFn: () => api.habits.getHabitStats(),
    enabled: !!api,
  });

  // Create habit mutation
  const createHabitMutation = useMutation({
    mutationFn: (data: HabitCreate) => {
      console.log('HabitContext: Creating habit via API', data);
      return api.habits.createHabit(data);
    },
    onSuccess: (result) => {
      console.log('HabitContext: Habit created successfully', result);
      console.log('HabitContext: Invalidating queries');
      // Invalidate and refetch habits and stats
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit-stats'] });
    },
    onError: (error) => {
      console.error('HabitContext: Error creating habit', error);
    },
  });

  // Update habit mutation
  const updateHabitMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Habit> }) =>
      api.habits.updateHabit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit-stats'] });
    },
  });

  // Delete habit mutation
  const deleteHabitMutation = useMutation({
    mutationFn: (id: number) => api.habits.deleteHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit-stats'] });
    },
  });

  // Toggle completion mutation
  const toggleCompletionMutation = useMutation({
    mutationFn: ({ habitId, completed, notes }: { habitId: number; completed: boolean; notes?: string }) =>
      completed 
        ? api.habits.markHabitComplete(habitId, notes)
        : api.habits.markHabitIncomplete(habitId),
    onSuccess: () => {
      // Invalidate habits to refresh completion status and streaks
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['habit-stats'] });
    },
  });

  const contextValue: HabitContextType = {
    // Data
    habits,
    isLoadingHabits,
    habitsError: habitsError as Error | null,
    stats,
    isLoadingStats,
    statsError: statsError as Error | null,
    
    // Mutations
    createHabit: createHabitMutation.mutateAsync,
    updateHabit: (id: number, data: Partial<Habit>) => 
      updateHabitMutation.mutateAsync({ id, data }),
    deleteHabit: deleteHabitMutation.mutateAsync,
    toggleHabitCompletion: (habitId: number, completed: boolean, notes?: string) =>
      toggleCompletionMutation.mutateAsync({ habitId, completed, notes }),
    
    // Loading states
    isCreatingHabit: createHabitMutation.isPending,
    isUpdatingHabit: updateHabitMutation.isPending,
    isDeletingHabit: deleteHabitMutation.isPending,
    isTogglingCompletion: toggleCompletionMutation.isPending,
    
    // Refetch functions
    refetchHabits,
    refetchStats,
  };

  return (
    <HabitContext.Provider value={contextValue}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}
