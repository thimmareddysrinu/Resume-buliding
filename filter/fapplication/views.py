from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from. Serializers import *
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404



User = get_user_model()

# Create your views here.
class RegisterUser(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user=serializer.save()
        otp=random.randint(100000,999999)
        otp_expiry=datetime.now() + timedelta(minutes=30)
        OneTimePassword.objects.create(
            user=user,
            otp=otp,
            otp_expiry=otp_expiry,
            otp_try_max=settings.MAX_OTP_TRY
        )
        print({"otp":otp})

        return Response(serializer.data)
   

    
class verifyOtp(APIView):
    def post(self,request):
        otp=request.data.get("otp")
        phone_number=request.data.get("phone_number")
        try:
            otp_obj=OneTimePassword.objects.get(otp=otp)
            phn_obj=CustomUser.objects.get(phone_number=phone_number)
            
            otp_obj.save()
            if not phn_obj.is_active:
                phn_obj.is_active=True
                phn_obj.save()

                return Response({"message":'otp verified successfully'},status=status.HTTP_201_CREATED)
            return Response({"message":'otp is already verified'},status=status.HTTP_204_NO_CONTENT)


        except CustomUser.DoesNotExist:
            return Response({"message":'passcode not provided '},status=status.HTTP_406_NOT_ACCEPTABLE)
                  
class LoginUser(APIView):
     def post(self, request):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Generate tokens (optional)
           
            
            return Response({
                'id': user.id,
                'phone_number': user.phone_number,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           
class ResendOtp(APIView):
    def post(self,request):
        phone_number=request.data.get('phone_number')
        purpose=request.data.get('purpose')
        try:
            user=CustomUser.objects.get(phone_number=phone_number)
           


        except CustomUser.DoesNotExist:

            return Response({""},status=status.HTTP_404_NOT_FOUND)
        
        otp=random.randint(100000,999999)
       
        user.otp=otp
        user.save()
        print("RESET OTP:", otp)   # replace with email sending

        return Response({
            "message": "Reset OTP sent"
        })



class ResetOtpVerify(APIView):
    def post(self,request):
        phone_number=request.data.get('phone_number')
        otp=request.data.get("otp")
        try:
            user=CustomUser.objects.get(phone_number=phone_number)
            otp_obj=OneTimePassword.objects.filter(
            user=user,
            otp=otp
           

        ).first()
            
            return Response({
                "message": "OTP verified successfully"
            }, status=status.HTTP_200_OK)

           


        except CustomUser.DoesNotExist:

            return Response({""},status=status.HTTP_404_NOT_FOUND)
        
        
       
class UserDetailsView(APIView):
    def get(self,request,user_id):
       user =get_object_or_404(CustomUser,id=user_id)
       serializer = UserDetailsSerializer(user)
       print("Fetch User Details:",serializer.data)
       return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request,user_id):
         user =get_object_or_404(CustomUser,id=user_id)
         serializer=UserDetailsSerializer(user,data=request.data)
         if serializer.is_valid():
             serializer.save()
             print("Updated User Details:",serializer.data)
             return Response(serializer.data,status=status.HTTP_200_OK)
         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

