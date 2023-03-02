from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from .models import CustomUser, Bus, Seats, Locations
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .utils import sendotp
from .serializers import UserSerializer, BusSerializer, SeatSerializer, LocationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken



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
def add_bus(request):
    if request.method == "POST":
        bus_name = request.POST.get('busname')
        seats = request.POST.get('seats')
        boardingpoint = request.POST.get('boardingpoint')
        destination = request.POST.get('destination')
        fare = request.POST.get('fare')
        departure_date = request.POST.get('departure_date')
        arrival_date = request.POST.get('arrival_date')
        Route = request.POST.get('Route')
        duration = request.POST.get("duration")
        arrival_time = request.POST.get('arrival_time')
        departure_time = request.POST.get('departure_time')
        pic = request.FILES['img']
        seats_data = seats.split(",")
        route_data = Route.split(">")
        bus = Bus.objects.create(Name=bus_name, fare=fare, pics=pic, departure_date=departure_date,
                                 arrival_time=arrival_time, departure_time=departure_time, arrival_date=arrival_date, duration=duration)

        for seat in seats_data:
            Seats.objects.create(seat_no=seat, status="Available", bus=bus)
        indx = 1
        Locations.objects.create(bus=bus, Role="start", location=boardingpoint)
        Locations.objects.create(bus=bus, Role="End", location=destination)
        for route in route_data:
            Locations.objects.create(bus=bus, Role=str(indx), location=route)
            indx += 1
        return Response({"message": "Bus Created!"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_busdata(request):
    data = [];
    buses = Bus.objects.all()
    for bus in buses:
        serializer = BusSerializer(bus, many=False)
        bus_item = Response(serializer.data).data
        seats = Seats.objects.filter(bus_id=bus.id)
        seatserializer = SeatSerializer(seats, many=True)
        seat_item = Response(seatserializer.data).data
        bus_item["Seats"] = seat_item
        locations = Locations.objects.filter(bus_id=bus.id)
        locationserializer = LocationSerializer(locations, many=True)
        location_item = Response(locationserializer.data).data
        bus_item["Route"] = location_item
        data.append(bus_item)
    return Response(data, status=status.HTTP_200_OK)
