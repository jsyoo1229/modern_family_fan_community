# config/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, 
    TokenRefreshView
    )
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView
)
from django.conf import settings
from django.conf.urls.static import static
from users.views import CustomTokenObtainPairView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('users/', include('users.urls')),
    path('posts/', include('posts.urls')),
    path('admin/', admin.site.urls),
    #swagger
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(), name= 'Swagger-UI'),
    path('api/shema/redoc/', SpectacularRedocView.as_view(), name= 'redoc'),
   
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
