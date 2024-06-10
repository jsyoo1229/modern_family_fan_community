# shows/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Character_View, Episode_View

router = DefaultRouter()
router.register('episodes', Episode_View)
router.register('characters', Character_View)

urlpatterns = [
    path('', include(router.urls))
]
