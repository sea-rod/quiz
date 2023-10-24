from django.contrib import admin
from .models import Result, ResultDetails


admin.site.register(ResultDetails)
admin.site.register(Result)
