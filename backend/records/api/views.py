from rest_framework.generics import GenericAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework import routers, serializers, viewsets, permissions
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes

from api.serializers import RecordSerializer, RecordDateSerializer
from datetime import datetime
from api.models import Record
# class RecordView(ListAPIView):
#     permission_classes = [permissions.AllowAny ]
#     serializer_class = RecordSerializer
#     queryset = Record.objects.all()
from rest_framework_simplejwt.authentication import JWTAuthentication





class RecordView(GenericAPIView):
    authentication_classes = [JWTAuthentication]  # можно не указывать, если определены глобальные настройки в settings.py
    permission_classes = [IsAuthenticated]  # Требует аутентификации
    # permission_classes = [permissions.AllowAny ]
    serializer_class = RecordSerializer
    queryset = Record.objects.all()

    @extend_schema(parameters=[
        OpenApiParameter(name='start_date', description='Начальная дата', required=False, type=OpenApiTypes.DATE, default="2025-01-01"),
        OpenApiParameter(name='end_date', description='Конечная дата', required=False, type=OpenApiTypes.DATE, default="2025-02-08")
    ],
                   description='Отправляет список заданий за определенный период времени.',
                   examples=[
                       OpenApiExample(
                           'Example 1',
                           description='longer description',
                           value=1488
                       ),
                       OpenApiExample(
                           'Example 2',
                           description='shorter description',
                           value=282
                       ),

                   ],

                   )
    def get(self, request):
        print("request.user:", request.user)  # Должен быть не `AnonymousUser`
        print("request.auth:", request.auth)  # Должен быть `JWT`
        start_date = request.GET.get("start_date")
        end_date = request.GET.get("end_date")
        print(start_date, type(start_date))
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        except Exception:
            start_date=None
        try:
            end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
        except Exception:
            end_date=None

        if start_date:
            self.queryset = self.queryset.filter(remark_datetime__gte=start_date)
        if end_date:
            self.queryset = self.queryset.filter(remark_datetime__lte=end_date)

        serializer = self.get_serializer(instance=self.queryset, many=True)
        return Response(serializer.data)



