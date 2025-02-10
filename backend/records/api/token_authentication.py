from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken


class CookieTokenObtainPairView(TokenObtainPairView):
	def post(self, request, *args, **kwargs):
		response = super().post(request, *args, **kwargs)
		tokens = response.data
		response.set_cookie(
			key="access_token",
			value=tokens["access"],
			httponly=True,
			secure=False,  # True в продакшене
			samesite="Lax",
		)
		response.set_cookie(
			key="refresh_token",
			value=tokens["refresh"],
			httponly=True,
			secure=False,
			samesite="Lax",
		)
		return response


class CookieTokenRefreshView(TokenRefreshView):
	def post(self, request, *args, **kwargs):
		refresh_token = request.COOKIES.get("refresh_token")
		if not refresh_token:
			return Response({"error": "No refresh token"}, status=400)

		token = RefreshToken(refresh_token)
		access_token = str(token.access_token)

		response = Response({"access": access_token})
		response.set_cookie(
			key="access_token",
			value=access_token,
			httponly=True,
			secure=True,
			samesite="Lax",
		)
		return response



class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logged out"})
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response