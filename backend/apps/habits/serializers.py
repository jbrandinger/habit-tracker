from rest_framework import serializers
from .models import Habit, HabitCompletion
from datetime import date


class HabitCompletionSerializer(serializers.ModelSerializer):
    """
    Serializer for habit completion records
    """
    class Meta:
        model = HabitCompletion
        fields = ['id', 'date', 'completed', 'notes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class HabitSerializer(serializers.ModelSerializer):
    """
    Serializer for habit model with computed fields
    """
    current_streak = serializers.SerializerMethodField()
    best_streak = serializers.SerializerMethodField()
    is_completed_today = serializers.SerializerMethodField()
    completion_rate = serializers.SerializerMethodField()
    
    class Meta:
        model = Habit
        fields = [
            'id', 'name', 'description', 'frequency', 'is_active',
            'created_at', 'updated_at', 'current_streak', 'best_streak',
            'is_completed_today', 'completion_rate'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_current_streak(self, obj):
        return obj.get_current_streak()
    
    def get_best_streak(self, obj):
        return obj.get_best_streak()
    
    def get_is_completed_today(self, obj):
        return obj.is_completed_today()
    
    def get_completion_rate(self, obj):
        return round(obj.get_completion_rate(), 1)


class HabitCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new habits
    """
    class Meta:
        model = Habit
        fields = ['name', 'description', 'frequency']
    
    def validate_name(self, value):
        """
        Validate that habit name is unique for this user
        """
        user = self.context['request'].user
        if Habit.objects.filter(user=user, name=value).exists():
            raise serializers.ValidationError("You already have a habit with this name.")
        return value
    
    def create(self, validated_data):
        """
        Create habit and associate with current user
        """
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class HabitUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating existing habits
    """
    class Meta:
        model = Habit
        fields = ['name', 'description', 'frequency', 'is_active']
    
    def validate_name(self, value):
        """
        Validate that habit name is unique for this user (excluding current habit)
        """
        user = self.context['request'].user
        habit_id = self.instance.id if self.instance else None
        
        existing_habit = Habit.objects.filter(user=user, name=value).exclude(id=habit_id)
        if existing_habit.exists():
            raise serializers.ValidationError("You already have a habit with this name.")
        return value


class HabitCompletionToggleSerializer(serializers.Serializer):
    """
    Serializer for toggling habit completion status
    """
    date = serializers.DateField(default=date.today)
    completed = serializers.BooleanField()
    notes = serializers.CharField(required=False, allow_blank=True)
    
    def create(self, validated_data):
        """
        Create or update habit completion for the given date
        """
        habit = self.context['habit']
        completion, created = HabitCompletion.objects.update_or_create(
            habit=habit,
            date=validated_data['date'],
            defaults={
                'completed': validated_data['completed'],
                'notes': validated_data.get('notes', '')
            }
        )
        return completion


class HabitStatsSerializer(serializers.Serializer):
    """
    Serializer for habit statistics
    """
    total_habits = serializers.IntegerField()
    active_habits = serializers.IntegerField()
    completed_today = serializers.IntegerField()
    total_today = serializers.IntegerField()
    completion_percentage = serializers.FloatField()
    longest_streak = serializers.IntegerField()
