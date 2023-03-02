from django.urls import path
from . import views
urlpatterns = [
    path('login/',views.login,name='login'),
    path('register/',views.register,name='register'),
    path('get_users/',views.get_users,name='users_fetch'),
    path('get_owners/',views.get_owners,name='oweners_fetch'),
    path('block_user!<int:id>/',views.block_user,name='block_user'),
    path('approve!<int:id>/',views.approve,name='approve'),
    path('add_bus/',views.add_bus,name='register_bus'),
    path('get_busdata/',views.get_busdata,name="get_busdata")
]
