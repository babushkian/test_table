from django.urls import path
from worklist.views import index

app_name = "worklist"
urlpatterns = [
    path("", index, name="index"),
]