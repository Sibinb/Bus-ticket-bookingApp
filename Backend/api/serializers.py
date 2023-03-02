from rest_framework.serializers import ModelSerializer
from .models import CustomUser,Bus,Seats,Locations,Features,BusPics



class UserSerializer(ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['id','username','Role','email','Mobileno','is_access','verified']
    
class BusSerializer(ModelSerializer):
    class Meta:
        model=Bus
        fields=["id","Name","Rating"]

class LocationSerializer(ModelSerializer):
    class Meta:
        model=Locations
        fields=['id',"Role","location"]
        
class SeatSerializer(ModelSerializer):
    class Meta:
        model=Seats
        fields=['id',"status","seat_no"]
        
class FeatureSerializer(ModelSerializer):
    class Meta:
          model=Features
          fields=["feature","icon"]
          
class BusPictureSerializer(ModelSerializer):
    class Meta:
        model=BusPics
        fields=['img',"id"]