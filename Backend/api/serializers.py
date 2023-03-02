from rest_framework.serializers import ModelSerializer
from .models import CustomUser,Bus,Seats,Locations



class UserSerializer(ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['id','username','Role','email','Mobileno','is_access','verified']
    
class BusSerializer(ModelSerializer):
    class Meta:
        model=Bus
        fields=["id","Name","fare","pics","arrival_date","arrival_time","Rating",
                "departure_time","departure_date","duration"]

class LocationSerializer(ModelSerializer):
    class Meta:
        model=Locations
        fields=['id',"Role","location"]
        
class SeatSerializer(ModelSerializer):
    class Meta:
        model=Seats
        fields=['id',"status","seat_no"]