from django.contrib import admin
from .models import CustomUser,Bus,Seats,Locations,BusPics,Features

admin.site.register(CustomUser)
admin.site.register(Bus)
admin.site.register(Seats)
admin.site.register(Locations)
admin.site.register(BusPics)
admin.site.register(Features)
# Register your models here.
