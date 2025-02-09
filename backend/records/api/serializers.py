from rest_framework import serializers


from api.models import Record

class RecordDateSerializer(serializers.Serializer):
    start_date = serializers.DateField(required=False, help_text="Начальная дата в формате YYYY-MM-DD")
    end_date = serializers.DateField(required=False, help_text="Конечная дата в формате YYYY-MM-DD")

class RecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Record
        fields = "__all__"

