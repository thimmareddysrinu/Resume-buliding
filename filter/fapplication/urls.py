

from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('Register-User/', RegisterUser.as_view(),name='Register-User'),
    path('otp-verify/', verifyOtp.as_view(),name='Otp-Verify'),
    path('login-user/', LoginUser.as_view(),name='Login-User'),
     path('resetotp/', ResendOtp.as_view(),name='Resend-Otp'),
      path('resetotpverify/', ResetOtpVerify.as_view(),name='Reset-Otp-Verify'),
       path('userdetails/<int:user_id>/', UserDetailsView.as_view(),name='User-Details')
]