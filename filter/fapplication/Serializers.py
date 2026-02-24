from datetime import timedelta,timezone,datetime
from rest_framework import serializers
from rest_framework.response import Response
from .models import CustomUser,OneTimePassword
import random
from django.conf import settings
from django.contrib.auth import authenticate,get_user_model


User=get_user_model()
class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(min_length=8,write_only=True,error_messages={"min_length":f'password l must be 8 characters'})
    confirum_password=serializers.CharField(min_length=8,write_only=True,error_messages={"min_length":f'password l must be 8 characters'})
    
    
    
    
    class Meta:
        model=CustomUser
        fields=['phone_number','email','password','confirum_password','first_name','last_name']
    def validate(self, attrs):
        password=attrs['password']
        confirum_password=attrs['confirum_password']

        if password != confirum_password:
            return serializers.ValidationError(" passwords not matching")
        



        return attrs
    def create(self,validated_data,**kwargs):
        otp=random.randint(100000,999999)
        otp_expiry=datetime.now() + timedelta(minutes=30)
        phone_number=validated_data['phone_number']
        

        user=CustomUser.objects.create(
            phone_number=phone_number,
           
            

        )
        
        user.set_password(validated_data['password'])
        user.save()
       



        return user
    
class LoginSerializer(serializers.Serializer):

    phone_number=serializers.CharField()
    password=serializers.CharField(write_only=True)


    def validate(self,attrs):
        phone_number=attrs.get('phone_number')
        password=attrs.get('password')
        

        user=authenticate(phone_number=phone_number,password=password)
        if not user:
            raise serializers.ValidationError("phone number and password not exist")
        if not user.is_active:
            raise serializers.ValidationError("Account not verified. Please verify OTP.")
             
        attrs['user']=user
        return attrs
    


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser   
        fields=['id','phone_number','first_name','last_name','email'] 
      
        read_only_fields = ['id']