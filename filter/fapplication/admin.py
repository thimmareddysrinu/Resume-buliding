
# Register your models here.
from django.contrib import admin
from .models import *
# Register your models here.





class CustomuserAdmin(admin.ModelAdmin):
    list_display=(
        "id",
        'first_name',
        'phone_number',
        'is_active',
        'is_superuser',
        'email'
    )
admin.site.register(CustomUser,CustomuserAdmin)