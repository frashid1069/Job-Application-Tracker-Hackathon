from django.urls import path
from . import views

urlpatterns = [
    path('', lambda request: None, name='placeholder'), # Temp
]

from .views import (
    JobApplicationListView, JobApplicationCreateView,
    JobApplicationUpdateView, JobApplicationDeleteView,
    JobListAPIView, JobApplicationListAPIView, ResumeListAPIView
)

urlpatterns = [
    path('', JobApplicationListView.as_view(), name='jobapplication-list'),
    path('add/', JobApplicationCreateView.as_view(), name='jobapplication-add'),
    path('<int:pk>/edit/', JobApplicationUpdateView.as_view(), name='jobapplication-edit'),
    path('<int:pk>/delete/', JobApplicationDeleteView.as_view(), name='jobapplication-delete'),
    path('api/jobs/', JobListAPIView.as_view(), name='job-list-api'),
    path('api/jobapplications/', JobApplicationListAPIView.as_view(), name='job-application-list-api'),
    path('api/resumes/', ResumeListAPIView.as_view(), name='resume-list-api'),
]
