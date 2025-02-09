from rest_framework.generics import GenericAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.renderers import JSONRenderer
from rest_framework import routers, serializers, viewsets, permissions
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from api.serializers import RecordSerializer, RecordDateSerializer
from datetime import datetime
from api.models import Record
# class RecordView(ListAPIView):
#     permission_classes = [permissions.AllowAny ]
#     serializer_class = RecordSerializer
#     queryset = Record.objects.all()


class RecordView(GenericAPIView):
    permission_classes = [permissions.AllowAny ]
    serializer_class = RecordSerializer

    @swagger_auto_schema(query_serializer=RecordDateSerializer())
    def get(self, request):
        start_date = request.GET.get("start_date")
        end_date = request.GET.get("end_date")
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
        except Exception:
            start_date=None
        try:
            end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
        except Exception:
            end_date=None
        queryset = Record.objects.all()
        if start_date:
            queryset = queryset.filter(remark_datetime__gte=start_date)
        if end_date:
            queryset = queryset.filter(remark_datetime__lte=end_date)

        serializer = self.get_serializer(instance=queryset, many=True)
        return Response(serializer.data)



