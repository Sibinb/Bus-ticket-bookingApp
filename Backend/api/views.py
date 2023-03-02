from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from .models import CustomUser, Bus, Seats, Locations,Features,BusPics
from rest_framework.permissions import IsAuthenticated,IsOwner
from django.contrib.auth import authenticate
from .utils import sendotp
from .serializers import UserSerializer, BusSerializer, SeatSerializer,BusPictureSerializer,FeatureSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import json
from django.core.files.images import ImageFile



def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # token = super().get_token(user)
        token=get_tokens_for_user(user)

        token["name"] = user.username
        token["Role"] = user.Role
        obj={
            "refresh":f"{token['refresh']}",
            "access" :f"{token['access']}",
            "Role" :f"{token['Role']}",
            "name":f"{token['name']}"
        }
        print(obj)
        return token


@api_view(["POST"])
def login(request):

    if request.method == "POST":
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            user_data = CustomUser.objects.get(username=username)
            if user_data.is_access and user_data.verified:
                tokens = MyTokenObtainPairSerializer.get_token(user)
                return Response({"status": "Success", "tokens": tokens})
            else:
                return Response({"status": "Failed", "message": "Your account is not accesible right now."})
        else:
            return Response({"status": "Failed", "message": "Invalid creidentials"})


@api_view(["POST"])
def register(request):
    if request.method == "POST":
        Otp = request.data.get('OTP')
        Mobileno = request.data.get('mobileno')
        if Otp == "":
            result_otp = sendotp(Mobileno)
            return Response({"message": "OTP", "OTP": result_otp})
        else:
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')
            Role = request.data.get('Role')
            user = CustomUser.objects.create(
                username=username, email=email, Role=Role, Mobileno=Mobileno)
            user.set_password(password)
            if Role == "owner":
                user.verified = False
                user.save()
            else:
                user.save()

            return Response({"message": "Success"})


@api_view(['GET'])
def get_users(request):
    users = CustomUser.objects.filter(Role="user").all()
    serialiazer = UserSerializer(users, many=True)
    return Response(serialiazer.data)


@api_view(['GET'])
def get_owners(request):
    print('req.user', request.user)
    users = CustomUser.objects.filter(Role="owner").all()
    serialiazer = UserSerializer(users, many=True)
    return Response(serialiazer.data)


@api_view(['GET'])
def block_user(request, id):
    user = CustomUser.objects.get(id=id)
    user.is_access = not user.is_access
    user.save()
    return Response({"message": "Completed Successfully"})


@api_view(['GET'])
def approve(request, id):
    action = request.GET.get('action')
    user = CustomUser.objects.get(id=id)
    if action == "Reject":
        user.delete()
        return Response({"message": "Action Completed!"})
    else:
        user.verified = True
        user.save()
        return Response({"message": "Action Completed!"})


@api_view(["POST"])
@permission_classes([IsOwner])
def add_bus(request):
    if request.method == "POST":
        datas=request.POST['datas']
        new_data=json.loads(datas)
        bus_name = new_data['busName']
        seats=new_data['seatInfos']
        features=new_data["amenites"]
        pics=request.FILES
        bus=Bus(Name=bus_name,owner=request.user)
        bus.save()
        for key,value in  seats.items():
            obj=Seats(bus=bus,seat_no=value,status='Available')
            obj.save()
        for item in features:
            feature_obj=Features(bus=bus,feature=item['featureName'],icon=item['seaclectedIcon'])
            feature_obj.save()
        for key,value in pics.items():
            picture_obj=BusPics(bus=bus,img=value)
            picture_obj.save()
        return Response({1:1})


@api_view(['GET'])
@permission_classes([IsOwner])
def get_busdata(request):
    data = [];
    buses = Bus.objects.filter(owner=request.user).all()
    for bus in buses:
        serializer = BusSerializer(bus, many=False)
        bus_item = Response(serializer.data).data
        
        seats = Seats.objects.filter(bus_id=bus.id)
        seatserializer = SeatSerializer(seats, many=True)
        seat_item = Response(seatserializer.data).data
        bus_item["Seats"] = seat_item
        
        pics=BusPics.objects.filter(bus=bus)
        pictureserializer=BusPictureSerializer(pics,many=True)
        picture_set=Response(pictureserializer.data).data
        bus_item["Pics"]=picture_set
        
        features=Features.objects.filter(bus=bus)
        featureserializer=FeatureSerializer(features,many=True)
        feature_set=Response(featureserializer.data).data
        bus_item["Features"]=feature_set
        
        data.append(bus_item)
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsOwner])
def add_trip(request):
    print(request.data)
    return Response({1:1},status=status.HTTP_200_OK)
