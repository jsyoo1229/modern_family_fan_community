from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentCreateView, LikeCreateView, ScrapView

app_name = 'post'

router = DefaultRouter()
router.register('', PostViewSet)
router.register("(?P<post_pk>[^/.]+)/comments", CommentCreateView)

urlpatterns = [
    path('', include(router.urls)),
    path("<int:post_id>/like/", LikeCreateView.as_view(), name="post-like"),    
    path('<int:post_id>/scrap/', ScrapView.as_view(), name='post-scrap'),
    path('top_liked/', PostViewSet.as_view({'get': 'top_liked'}), name='top-liked-posts'), 
]
