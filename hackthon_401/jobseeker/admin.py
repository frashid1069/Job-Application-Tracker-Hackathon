from django.contrib import admin
from .models import Job, JobApplication

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('user', 'job', 'status', 'resume', 'date_applied')
    list_filter = ('status',)
    actions = ['mark_as_interview', 'mark_as_offer', 'mark_as_rejected']

    def mark_as_interview(self, request, queryset):
        queryset.update(status='interview')

    def mark_as_offer(self, request, queryset):
        queryset.update(status='offer')

    def mark_as_rejected(self, request, queryset):
        queryset.update(status='rejected')

    # Custom method to get the position from the related job
    def job_position(self, obj):
        return obj.job.position  # Assuming 'position' is a field on the 'Job' model
    job_position.admin_order_field = 'job__position'  # Allow sorting by position in the admin
    job_position.short_description = 'Job Position'  # Column name in the admin

#admin.site.register(JobApplication, JobApplicationAdmin)
