from django.db import models

class PriorityChoices(models.IntegerChoices):
    PR_1 = 1, "срочно"
    PR_2 = 2, "средней срочности"
    PR_3 = 3, "не срочно"
    PR_4 = 4, "отложено"



class StatusChoices(models.TextChoices):
    ST_1 = "DON", "сделано"
    ST_2 = "WRK", "в работе"
    ST_3 = "CNS", "отменено"
    ST_4 = "WAT", "ожидает"


class Record(models.Model):
    controller = models.CharField(max_length=255,  verbose_name="Контроллер")
    status = models.CharField(choices=StatusChoices.choices ,max_length=3,  verbose_name="Статус")
    priority = models.IntegerField(choices=PriorityChoices.choices, default=PriorityChoices.PR_3, verbose_name="Приоритет")
    remark_datetime = models.DateField(verbose_name="Дата замечания")
    remark = models.CharField(max_length=255,  verbose_name="Замечание")
    shift_task =  models.IntegerField( verbose_name="Номер задания")
