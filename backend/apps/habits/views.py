from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Count, Q
from datetime import date

from .models import Habit, HabitCompletion
from .serializers import (
    HabitSerializer, HabitCreateSerializer, HabitUpdateSerializer,
    HabitCompletionSerializer, HabitCompletionToggleSerializer,
    HabitStatsSerializer
)


class HabitListCreateView(generics.ListCreateAPIView):
    """
    List all habits for the authenticated user or create a new habit
    """
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return HabitCreateSerializer
        return HabitSerializer
    
    def create(self, request, *args, **kwargs):
        # Use HabitCreateSerializer for validation and creation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        habit = serializer.save()
        
        # Return the full habit data using HabitSerializer
        response_serializer = HabitSerializer(habit, context={'request': request})
        headers = self.get_success_headers(response_serializer.data)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class HabitDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a specific habit
    """
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return HabitUpdateSerializer
        return HabitSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_habit_completion(request, habit_id):
    """
    Toggle habit completion status for a specific date
    """
    habit = get_object_or_404(Habit, id=habit_id, user=request.user)
    
    serializer = HabitCompletionToggleSerializer(
        data=request.data,
        context={'habit': habit}
    )
    
    if serializer.is_valid():
        completion = serializer.save()
        return Response(
            HabitCompletionSerializer(completion).data,
            status=status.HTTP_200_OK
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def habit_completions(request, habit_id):
    """
    Get completion history for a specific habit
    """
    habit = get_object_or_404(Habit, id=habit_id, user=request.user)
    
    # Optional date range filtering
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')
    
    completions = habit.completions.all()
    
    if start_date:
        completions = completions.filter(date__gte=start_date)
    if end_date:
        completions = completions.filter(date__lte=end_date)
    
    serializer = HabitCompletionSerializer(completions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def habit_stats(request):
    """
    Get overall habit statistics for the authenticated user
    """
    user = request.user
    today = date.today()
    
    # Get all active habits for the user
    active_habits = Habit.objects.filter(user=user, is_active=True)
    total_habits = Habit.objects.filter(user=user).count()
    
    # Count today's completions
    today_completions = HabitCompletion.objects.filter(
        habit__user=user,
        habit__is_active=True,
        date=today,
        completed=True
    ).count()
    
    total_today = active_habits.count()
    
    # Calculate completion percentage
    completion_percentage = (
        (today_completions / total_today * 100) if total_today > 0 else 0
    )
    
    # Find longest current streak across all habits
    longest_streak = 0
    for habit in active_habits:
        current_streak = habit.get_current_streak()
        longest_streak = max(longest_streak, current_streak)
    
    stats_data = {
        'total_habits': total_habits,
        'active_habits': active_habits.count(),
        'completed_today': today_completions,
        'total_today': total_today,
        'completion_percentage': round(completion_percentage, 1),
        'longest_streak': longest_streak
    }
    
    serializer = HabitStatsSerializer(stats_data)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def today_habits(request):
    """
    Get all active habits with today's completion status
    """
    user = request.user
    habits = Habit.objects.filter(user=user, is_active=True)
    
    # Annotate with today's completion status
    serializer = HabitSerializer(habits, many=True)
    return Response(serializer.data)
