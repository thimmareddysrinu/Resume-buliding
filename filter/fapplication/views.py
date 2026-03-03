from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from. Serializers import *
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import get_user_model,login,logout
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .LangchainUser.MainGraph.Workflow import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated



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
            login(request, user) 
            print("SESSION KEY:", request.session.session_key)  # ← add this
            print("SESSION DATA:", dict(request.session))  
            
            # Generate tokens (optional)
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'id': user.id,
                'phone_number': user.phone_number,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                "access":str(refresh.access_token),
                "refresh":str(refresh)

                
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




# views.py



app = create_workflow()
@api_view(["POST"])
def ai_agent(request):
    print("USER:", request.user)
    print("IS AUTH:", request.user.is_authenticated)

    input_type = request.data.get("type")
    prompt = request.data.get("prompt")
    conversation_id = request.data.get("conversation_id")
    audio = request.FILES.get("audio", None)
    files = request.FILES.get("file", None)

    if not input_type:
        return Response({"error": "type is required"}, status=400)
    if not prompt and not audio and not files:
        return Response({"error": "prompt or media is required"}, status=400)

    # Build history only for logged-in users
    conversation_history = []
    conversation = None

    if request.user.is_authenticated:  # ← KEY CHECK
        if conversation_id:
            conversation = Conversations.objects.filter(
                id=conversation_id, user=request.user
            ).first()

        if not conversation:
            conversation = Conversations.objects.filter(
                user=request.user
            ).order_by('-created_at').first()

        if conversation:
            past_messages = Message.objects.filter(
                conversation=conversation
            ).order_by('created_at')[:20]

            for msg in past_messages:
                if msg.input_text:
                    conversation_history.append({"role": "user", "content": msg.input_text})
                if msg.output_text:
                    conversation_history.append({"role": "assistant", "content": msg.output_text})

    # Run AI — works for everyone
    try:
        result = app.invoke({
            "input_type": input_type,
            "conversation_history": conversation_history,
            "input_prompt": prompt or "",
            "output_prompt": ""
        })
    except Exception as e:
        print("AI ERROR:", str(e))
        return Response({"error": f"AI failed: {str(e)}"}, status=500)

    output_text = result['output_prompt']

    # Save only for logged-in users
    if request.user.is_authenticated:  # ← KEY CHECK
        try:
            if not conversation:
                conversation = Conversations.objects.create(user=request.user)

            message = Message.objects.create(
                conversation=conversation,
                output_text=output_text,
                input_type=input_type,
                input_text=prompt or "",
                input_file=files,
                input_audio=audio
            )

            return Response({
                "result": output_text,
                "saved": True,
                "conversation_id": conversation.id,
                "message_id": message.id,
            }, status=200)

        except Exception as e:
            print("DB SAVE ERROR:", str(e))
            return Response({
                "result": output_text,
                "saved": False,
                "warning": str(e)
            }, status=200)

    # Not logged in — return result only, no save
    return Response({
        "result": output_text,
        "saved": False,
        "message": "Login to save your conversation history"
    }, status=200)

class ConversationView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, conversation_id):
        conversation = get_object_or_404(Conversations, id=conversation_id, user=request.user)
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_200_OK)
    