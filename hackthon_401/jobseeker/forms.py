from django import forms
from .models import JobApplication, Resume

class JobApplicationForm(forms.ModelForm):
    class Meta:
        model = JobApplication
        fields = ['job', 'resume', 'date_applied', 'status', 'notes']

    resume = forms.ModelChoiceField(queryset=Resume.objects.all(), required=True)

class ResumeForm(forms.ModelForm):
    class Meta:
        model = Resume
        fields = ['title', 'content']