
# Register your models here.
from django.contrib import admin
from .models import *
# Register your models here.




# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, OneTimePassword, Conversations, Message

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    
    list_display = ['phone_number', 'email', 'first_name', 'is_staff', 'is_active']
    
    fieldsets = (
        (None, {'fields': ('phone_number', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    
    search_fields = ['phone_number', 'email']
    ordering = ['phone_number']






class ConversationAdmin(admin.ModelAdmin):
    list_display=(
        "id",
        'user',
        'created_at',
        'updated_at',
       
    )
admin.site.register(Conversations,ConversationAdmin)

admin.site.register(OneTimePassword)


class MessageAdmin(admin.ModelAdmin):
    list_display=(
        "id",
        'input_type',
        'conversation',
        'created_at',
       
    )
admin.site.register(Message,MessageAdmin)