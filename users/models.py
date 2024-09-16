# users/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager  # CustomUserManager를 사용하기 위해 import

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()  # 여기서 CustomUserManager를 사용

    def __str__(self):
        return self.email
