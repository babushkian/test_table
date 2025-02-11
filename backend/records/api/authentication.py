from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get("access_token")
        print("проверка пароля")
        print("токен:", access_token)
        if not access_token:
            return None  # Если токена нет, аутентификация не выполняется

        try:
            token = AccessToken(access_token)  # Проверяем токен
            user = token.get_user()
            print("------------------------------:")
            print("пользователь:", user)
            print("токен:", token)
            return (user, token)
        except Exception:
            raise AuthenticationFailed("Invalid or expired token")