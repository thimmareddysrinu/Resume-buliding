

from django.contrib import admin
from django.urls import path,include
from .views import RegisterUser,verifyOtp,LoginUser,ResendOtp,ResetOtpVerify,UserDetailsView,ai_agent,ConversationView
from rest_framework_simplejwt.views import TokenRefreshView 


from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({'csrftoken': 'set'})


urlpatterns = [
    path('Register-User/', RegisterUser.as_view(),name='Register-User'),
    path('otp-verify/', verifyOtp.as_view(),name='Otp-Verify'),
    path('login-user/', LoginUser.as_view(),name='Login-User'),
     path('resetotp/', ResendOtp.as_view(),name='Resend-Otp'),
      path('resetotpverify/', ResetOtpVerify.as_view(),name='Reset-Otp-Verify'),
       path('userdetails/<int:user_id>/', UserDetailsView.as_view(),name='User-Details'),
       path('searching/',ai_agent ,name='User-Details'),
         path('token/refresh/',TokenRefreshView.as_view()), 
        path('conversations/<int:conversation_id>/', ConversationView.as_view()),
       path('csrf/', get_csrf)
]