from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import JobApplication, Job, Resume
from .forms import JobApplicationForm
from django.contrib.auth.decorators import login_required
from django import forms
from .serializers import JobApplicationSerializer, JobSerializer, ResumeSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Custom form to dynamically set 'position' based on the selected 'job'
class JobApplicationFormWithPosition(JobApplicationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.job:
            self.fields['position'].initial = self.instance.job.position

    def clean(self):
        cleaned_data = super().clean()
        job = cleaned_data.get('job')
        if job:
            cleaned_data['position'] = job.position
        return cleaned_data


@login_required
def job_list(request):
    jobs = Job.objects.all()
    return render(request, 'job_last.html', {'jobs': jobs})

@login_required
def apply_for_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)

    if request.method == 'POST':
        form = JobApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            application = form.save(commit=False)
            application.user = request.user
            application.job = job
            application.save()
            return redirect('job_list')
    else:
        form = JobApplicationForm()

    return render(request, 'apply_for_job.html', {'form': form, 'job': job})

def resume_list(request):
    resumes = Resume.objects.all()
    return render(request, 'resume_list.html', {'resumes': resumes})

class JobApplicationListView(ListView):
    model = JobApplication
    template_name = 'job_tracker/jobapplication_list.html'
    context_object_name = 'applications'

class JobApplicationCreateView(CreateView):
    model = JobApplication
    form_class = JobApplicationFormWithPosition  # Use custom form with dynamic position handling
    template_name = 'job_tracker/jobapplication_form.html'
    success_url = reverse_lazy('jobapplication-list')

    def form_valid(self, form):
        # Optionally, you can manually set 'job' and 'position' if needed
        form.instance.user = self.request.user
        return super().form_valid(form)

class JobApplicationUpdateView(UpdateView):
    model = JobApplication
    form_class = JobApplicationFormWithPosition  # Use custom form with dynamic position handling
    template_name = 'jobseeker/jobapplication_form.html'
    success_url = reverse_lazy('jobapplication-list')

    def form_valid(self, form):
        # Optionally, you can manually set 'job' and 'position' if needed
        return super().form_valid(form)

class JobApplicationDeleteView(DeleteView):
    model = JobApplication
    template_name = 'jobseeker/jobapplication_confirm_delete.html'
    success_url = reverse_lazy('jobapplication-list')


class JobListAPIView(APIView):
    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class JobApplicationListAPIView(APIView):
    def get(self, request):
        job_applications = JobApplication.objects.all()
        serializer = JobApplicationSerializer(job_applications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ResumeListAPIView(APIView):
    def get(self, request):
        resumes = Resume.objects.all()
        serializer = ResumeSerializer(resumes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)