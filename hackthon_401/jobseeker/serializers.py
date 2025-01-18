# jobseeker/serializers.py
from rest_framework import serializers
from .models import Job, JobApplication

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'position', 'description', 'created_at']

class JobApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer()  # Nested serializer to include job data
    class Meta:
        model = JobApplication
        fields = ['id', 'company_name', 'user', 'job', 'resume', 'date_applied', 'status', 'notes']
