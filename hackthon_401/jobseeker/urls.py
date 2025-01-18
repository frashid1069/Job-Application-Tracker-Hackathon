from django.urls import path

urlpatterns = [
    path('', lambda request: None, name='placeholder'), # Temp
]

from .views import (
    JobApplicationListView, JobApplicationCreateView,
    JobApplicationUpdateView, JobApplicationDeleteView
)

urlpatterns = [
    path('', JobApplicationListView.as_view(), name='jobapplication-list'),
    path('add/', JobApplicationCreateView.as_view(), name='jobapplication-add'),
    path('<int:pk>/edit/', JobApplicationUpdateView.as_view(), name='jobapplication-edit'),
    path('<int:pk>/delete/', JobApplicationDeleteView.as_view(), name='jobapplication-delete'),
]
