from django.db import models
from django.conf import settings
from django.contrib.auth.models import BaseUserManager,AbstractUser,AbstractBaseUser,PermissionsMixin
from django.core.validators import RegexValidator,validate_email
# Create your models here.

phone_regex=RegexValidator(
    regex='^\d{10}' ,message="phone number must be 10 numbers"
)
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone


class BaseManger(BaseUserManager):

    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError("Phone number is required")

        user = self.model(
            phone_number=phone_number,
            **extra_fields
        )

        if password:
            user.set_password(password)
        else:
            user.set_password(None)

        # Don't assign wrong values to datetime fields
        user.save(using=self._db)
        return user


    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self.create_user(phone_number, password, **extra_fields)

class CustomUser(AbstractBaseUser,PermissionsMixin):
    

    phone_number=models.CharField(max_length=10,unique=True,blank=False,null=False,validators=[phone_regex])
    email=models.CharField(max_length=60,blank=True,null=True,validators=[validate_email])
    first_name=models.CharField(max_length=200,blank=True,null=True)
    last_name=models.CharField(max_length=200,blank=True,null=True)

    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=False)
    
    created_at=models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD='phone_number'

    objects=BaseManger()



class OneTimePassword(models.Model):
    PURPOSE_CHOICES = (
        ("verify", "Verify Email"),
        ("reset", "Reset Password"),
    )
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    otp=models.CharField(max_length=6)
    purpose=models.CharField(choices=PURPOSE_CHOICES,max_length=60)
    otp_expiry=models.DateTimeField(blank=True,null=True)
    otp_try_max=models.CharField(max_length=2,default=settings.MAX_OTP_TRY)
    max_try_out=models.DateTimeField(blank=True,null=True)


    def __str__(self):
        return f"{self.user}  and {self.purpose}"


class Conversations(models.Model):
  
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name='conversations')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)   

    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Conversation({self.user.phone_number}) - {self.created_at}" 


class Message(models.Model):
    PURPOSE_CHOICES = (
        ("baseUser", "baseUser"),
        ("imagegenerate", "imagegenerate"),
         ("voicetotext", " voicetotext"),
        ("translator", " translator"),
         ("resume_builder", " resume_builder"),
         
        
    )
    conversation=models.ForeignKey(Conversations,on_delete=models.CASCADE,related_name='conversations')
    input_type=models.CharField(max_length=60,choices=PURPOSE_CHOICES,blank=False)
    input_text=models.TextField(max_length=600,blank=False)
    input_audio = models.FileField(upload_to='uploads/audio/', null=True, blank=True)
    input_file  = models.FileField(upload_to='uploads/files/', null=True, blank=True)
    output_text = models.TextField(null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)  

    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message({self.input_type}) in {self.conversation}"