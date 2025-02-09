from django.contrib import admin
from django.urls import path, include
from api.views import RecordView


urlpatterns = [
	path('records/', RecordView.as_view(), name='records'),
]