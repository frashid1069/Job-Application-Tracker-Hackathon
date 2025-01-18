from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    company_name = models.CharField(max_length=255, default = None)
    title = models.CharField(max_length=200)
    position = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

class Resume(models.Model):
    title = models.CharField(max_length=255) #e.g, "Master Resume"
    content = models.TextField() #Store resume content as raw text or HTML
    file = models.FileField(upload_to='resumes/', default="default_resume.pdf")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interview', 'Interview'),
        ('offer', 'Offer'),
        ('rejected', 'Rejected'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, default=None)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, blank=True, null=True)
    date_applied = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Application for {self.job.title} at {self.job.company_name}"

    

