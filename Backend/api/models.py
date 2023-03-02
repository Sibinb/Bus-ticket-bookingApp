from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date


class CustomUser(AbstractUser):
    username=models.CharField(max_length=150,unique=True)
    email=models.EmailField(blank=True)
    Role=models.CharField(max_length=50)
    Mobileno=models.BigIntegerField(default=1)
    is_access = models.BooleanField(default=True)
    verified=models.BooleanField(default=True)
 

class Bus(models.Model):
    Name=models.CharField(max_length=200)
    fare=models.BigIntegerField()
    pics=models.ImageField(upload_to='pics/')
    arrival_date=models.CharField(max_length=100,default="0")
    arrival_time=models.CharField(max_length=100,default="0")
    departure_date=models.CharField(max_length=100,default="0")
    departure_time=models.CharField(max_length=100,default="0")
    Rating=models.IntegerField(default=1)
    duration=models.CharField(max_length=100,default="0")

class Seats(models.Model):
    bus=models.ForeignKey(Bus,on_delete=models.CASCADE,default=1)
    status=models.CharField(max_length=100)
    seat_no=models.CharField(max_length=50)

class Locations(models.Model):
   bus=models.ForeignKey(Bus,on_delete=models.CASCADE)
   Role=models.CharField(max_length=100)
   location=models.CharField(max_length=100)
   price=models.BigIntegerField(default=0)