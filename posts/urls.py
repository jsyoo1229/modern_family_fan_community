# posts/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentCreateView, LikeCreateView, CategoryView

router = DefaultRouter()
router.register('posts', PostViewSet)
router.register("posts/(?P<post_pk>[^/.]+)/comments", CommentCreateView)

urlpatterns = [
    path('lists/', CategoryView.as_view(), name='category'),
    path('', include(router.urls)),
    path("posts/<int:post_id>/like/", LikeCreateView.as_view(), name="post-like"),    
]