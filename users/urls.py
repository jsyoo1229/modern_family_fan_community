# users/urls.py
from django.urls import path
from .views import (
    user_create_view,
    user_profile_view,
)

urlpatterns = [
    path('signup/', user_create_view.as_view(), name= 'signup'),
    path('profile/<int:pk>', user_profile_view.as_view(), name= 'profile')
]
