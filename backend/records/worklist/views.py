from django.shortcuts import render
from django.http import HttpRequest, HttpResponse




def index(request):
	context = {"content": "Здравствуйте!"}
	return render(request, "worklist/index.html", context=context)