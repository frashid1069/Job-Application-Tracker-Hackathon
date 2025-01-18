from django.shortcuts import render
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import JobApplication
# Create your views here.

class JobApplicationListView(ListView):
    model = JobApplication
    template_name = 'job_tracker/jobapplication_list.html'
    context_object_name = 'applications'

class JobApplicationCreateView(CreateView):
    model = JobApplication
    fields = ['company_name', 'position', 'date_applied', 'status', 'notes']
    template_name = 'job_tracker/jobapplication_form.html'
    success_url = reverse_lazy('jobapplication-list')

class JobApplicationUpdateView(UpdateView):
    model = JobApplication
    fields = ['company_name', 'position', 'date_applied', 'status', 'notes']
    template_name = 'job_tracker/jobapplication_form.html'
    success_url = reverse_lazy('jobapplication-list')

class JobApplicationDeleteView(DeleteView):
    model = JobApplication
    template_name = 'job_tracker/jobapplication_confirm_delete.html'
    success_url = reverse_lazy('jobapplication-list')