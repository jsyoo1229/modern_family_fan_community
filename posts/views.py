# posts/views.py
from rest_framework import viewsets, generics,  response, status, views, permissions
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Post, Comment, Like, Scrap
from .serializers import PostSerializer, CommentSerializer, ScrapSerializer
from django.shortcuts import get_object_or_404
from django.db.models import F, Count
from rest_framework.decorators import action
from rest_framework.response import Response

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()        
        author_id = self.request.query_params.get('author')
        if author_id is not None:
            queryset = queryset.filter(author__id=author_id)
        return queryset 
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views = F('views') + 1
        instance.save()
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def top_viewed(self, request):
        top_posts = self.get_queryset().order_by('-views')[:5]  # 상위 5개 게시물
        serializer = self.get_serializer(top_posts, many=True)
        return Response(serializer.data) 

    @action(detail=False, methods=['get'])
    def top_liked(self, request):
        top_posts = Post.objects.annotate(like_count=Count('likes')).order_by('-like_count')[:7]
        serializer = self.get_serializer(top_posts, many=True)
        return Response(serializer.data)                    

class CommentCreateView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post = generics.get_object_or_404(Post, pk=self.kwargs['post_pk'])
        serializer.save(author=self.request.user, post=post)

class LikeCreateView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    # 좋아요를 확인하는 GET 요청 추가
    def get(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        is_liked = Like.objects.filter(post=post, user=request.user).exists()  # 사용자가 좋아요를 눌렀는지 여부 확인
        return Response({'is_liked': is_liked})

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        like, created = Like.objects.get_or_create(post=post, user=request.user)

        if not created:
            return response.Response(status=status.HTTP_409_CONFLICT)

        return response.Response(status=status.HTTP_201_CREATED)

    def delete(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        like = get_object_or_404(Like, post=post, user=request.user)
        like.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    

class ScrapView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        scrap, created = Scrap.objects.get_or_create(post=post, user=request.user)

        if not created:
            return response.Response(status=status.HTTP_409_CONFLICT)

        # 시리얼라이저를 통해 데이터를 반환
        serializer = ScrapSerializer(scrap)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, post_id):
        post = get_object_or_404(Post, id=post_id)
        is_scrapped = Scrap.objects.filter(post=post, user=request.user).exists()
        return response.Response({'is_scrapped': is_scrapped})

    

