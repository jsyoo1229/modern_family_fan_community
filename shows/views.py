# shows/views.py

from rest_framework import viewsets
from .models import Episode, Character
from .serializers import EpisodeSerializer, CharacterSerializer

class Episode_View(viewsets.ModelViewSet):
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer

class Character_View(viewsets.ModelViewSet):
    queryset = Character.objects.all()     
    serializer_class = CharacterSerializer

    

