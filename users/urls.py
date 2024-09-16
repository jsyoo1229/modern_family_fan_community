# users/urls.py
from django.urls import path
from .views import UserCreateView, UserProfileView, UserScrapListView
from django.urls import include


urlpatterns = [
    path('signup/', UserCreateView.as_view(), name= 'signup'),
    path('profile/<int:pk>/', UserProfileView.as_view(), name= 'profile'),
    path('scraps/', UserScrapListView.as_view(), name='user-scraps'),

    # path("signup/", include("dj_rest_auth.registration.urls")),
    # path("", include("dj_rest_auth.urls")),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
