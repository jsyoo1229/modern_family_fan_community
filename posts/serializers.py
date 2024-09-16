# posts/serializers.py
from rest_framework import serializers
from .models import Post, Comment, Like, Scrap

class ScrapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scrap
        fields = ('post', 'user', 'created_at')  # 'created_at' 필드 포함
        read_only_fields = ('created_at',)


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'author_username', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

# posts/serializers.py
class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    author_username = serializers.ReadOnlyField(source='author.username')
    comments = CommentSerializer(many=True, read_only=True)
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'author', 'author_username', 'title', 'content', 'image', 'created_at', 'updated_at', 'comments', 'like_count', 'views')
        read_only_fields = ('id', 'author', 'created_at', 'updated_at', 'views')

    def get_like_count(self, obj):
        return obj.likes.count()

    def create(self, validated_data):
        author = self.context['request'].user
        post = Post.objects.create(author=author, **validated_data)
        return post

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'post', 'user', 'created_at')
        read_only_fields = ('id', 'created_at')