from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

def home(request):
    return HttpResponse("Hello, Django!")

def index(request):
    return render(request, 'index.html')

def api_overview(request):
    return Response({"message": "Hello from Django!"})