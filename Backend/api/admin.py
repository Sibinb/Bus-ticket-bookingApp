from django.contrib import admin
from .models import CustomUser,Bus,Seats,Locations

admin.site.register(CustomUser)
admin.site.register(Bus)
admin.site.register(Seats)
admin.site.register(Locations)
# Register your models here.
