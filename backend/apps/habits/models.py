from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import date, timedelta


class Habit(models.Model):
    """
    Model representing a user's habit to track
    """
    FREQUENCY_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('custom', 'Custom'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='habits')
    frequency = models.CharField(max_length=10, choices=FREQUENCY_CHOICES, default='daily')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'name']  # Prevent duplicate habit names per user
    
    def __str__(self):
        return f"{self.user.username} - {self.name}"
    
    def get_current_streak(self):
        """
        Calculate the current streak of consecutive completions
        """
        if not self.is_active:
            return 0
            
        today = date.today()
        streak = 0
        current_date = today
        
        # Look backwards from today to find consecutive completions
        while True:
            completion = self.completions.filter(date=current_date).first()
            if completion and completion.completed:
                streak += 1
                current_date -= timedelta(days=1)
            else:
                break
                
        return streak
    
    def get_best_streak(self):
        """
        Calculate the best (longest) streak ever achieved
        """
        completions = self.completions.filter(completed=True).order_by('date')
        if not completions.exists():
            return 0
            
        best_streak = 0
        current_streak = 0
        previous_date = None
        
        for completion in completions:
            if previous_date is None or completion.date == previous_date + timedelta(days=1):
                current_streak += 1
                best_streak = max(best_streak, current_streak)
            else:
                current_streak = 1
            previous_date = completion.date
            
        return best_streak
    
    def is_completed_today(self):
        """
        Check if habit is completed for today
        """
        today = date.today()
        completion = self.completions.filter(date=today).first()
        return completion.completed if completion else False
    
    def get_completion_rate(self, days=30):
        """
        Get completion rate over the last N days
        """
        end_date = date.today()
        start_date = end_date - timedelta(days=days-1)
        
        total_days = days
        completed_days = self.completions.filter(
            date__range=[start_date, end_date],
            completed=True
        ).count()
        
        return (completed_days / total_days) * 100 if total_days > 0 else 0


class HabitCompletion(models.Model):
    """
    Model representing a habit completion for a specific date
    """
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='completions')
    date = models.DateField()
    completed = models.BooleanField(default=False)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['habit', 'date']  # One completion record per habit per day
        ordering = ['-date']
    
    def __str__(self):
        status = "✓" if self.completed else "✗"
        return f"{self.habit.name} - {self.date} {status}"