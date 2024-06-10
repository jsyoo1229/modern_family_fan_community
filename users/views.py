from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

user = get_user_model()

class user_create_view(generics.CreateAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer

class user_profile_view(generics.RetrieveDestroyAPIView):
    queryset = user.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]    