from django.contrib import admin
from .models import Habit, HabitCompletion


@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'frequency', 'is_active', 'created_at']
    list_filter = ['frequency', 'is_active', 'created_at']
    search_fields = ['name', 'user__username', 'user__email']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'user', 'frequency', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(HabitCompletion)
class HabitCompletionAdmin(admin.ModelAdmin):
    list_display = ['habit', 'date', 'completed', 'created_at']
    list_filter = ['completed', 'date', 'created_at']
    search_fields = ['habit__name', 'habit__user__username']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'date'
    
    fieldsets = (
        (None, {
            'fields': ('habit', 'date', 'completed', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
