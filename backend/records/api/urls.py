from django.contrib import admin
from django.urls import path, include
from api.views import RecordView, ShowUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .token_authentication import CookieTokenObtainPairView, CookieTokenRefreshView, LogoutView

urlpatterns = [
	path('records/', RecordView.as_view(), name='records'),
	path('show/', ShowUserView.as_view(), name='show'),


	# path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
	# path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),



	# кастомные представления для работы с JWT через HTTPOnly COOKIE
    # path("api/token/", CookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("api/token/refresh/", CookieTokenRefreshView.as_view(), name="token_refresh"),
    # path("api/logout/", LogoutView.as_view(), name="logout"),

]