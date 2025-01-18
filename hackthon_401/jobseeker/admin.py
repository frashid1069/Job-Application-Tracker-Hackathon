from django.contrib import admin
from .models import JobApplication, Resume

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'position', 'date_applied', 'status')
    list_filter = ('status', 'date_applied')
    search_fields = ('company_name', 'position')

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title',)
