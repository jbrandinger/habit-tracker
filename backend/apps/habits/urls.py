from django.urls import path
from . import views

app_name = 'habits'

urlpatterns = [
    # Habit CRUD endpoints
    path('', views.HabitListCreateView.as_view(), name='habit-list-create'),
    path('<int:pk>/', views.HabitDetailView.as_view(), name='habit-detail'),
    
    # Habit completion endpoints
    path('<int:habit_id>/toggle/', views.toggle_habit_completion, name='habit-toggle'),
    path('<int:habit_id>/completions/', views.habit_completions, name='habit-completions'),
    
    # Statistics and overview endpoints
    path('stats/', views.habit_stats, name='habit-stats'),
    path('today/', views.today_habits, name='today-habits'),
]