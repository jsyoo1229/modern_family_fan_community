from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from .models import Post, Comment

User = get_user_model()

class PostTest(TestCase):
    def setUp(self):
        self.client = APIClient()   
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpassword'
        )
        self.post = Post.objects.create(
            title='TestPost',
            content='TestContent',
            author=self.user
        )

    def test_post_create(self):
        # 비회원 작성 테스트
        data = {
            'title': 'testpost',
            'content': 'testcontent',
        }
        response = self.client.post('/posts/', data, format='json')
        self.assertEqual(response.status_code, 403)

        # 회원 작성 테스트
        self.client.login(username='testuser', password='testpassword')
        response = self.client.post('/posts/', data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_post_update(self):
        # 게시물 수정 테스트
        self.client.login(username='testuser', password='testpassword')
        data = {
            'title': 'UpdatedPost',
            'content': 'UpdatedContent',
        }
        response = self.client.put(f'/posts/{self.post.id}/', data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_post_delete(self):
        # 게시물 삭제 테스트
        self.client.login(username='testuser', password='testpassword')
        response = self.client.delete(f'/posts/{self.post.id}/')
        self.assertEqual(response.status_code, 204)

    def test_comment_create(self):
        # 댓글 작성 테스트
        self.client.login(username='testuser', password='testpassword')
        data = {
            'content': 'TestComment',
        }
        response = self.client.post(f'/posts/{self.post.id}/comments/', data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_comment_delete(self):
        # 댓글 삭제 테스트
        comment = Comment.objects.create(
            post=self.post,
            author=self.user,
            content='TestComment'
        )
        self.client.login(username='testuser', password='testpassword')
        response = self.client.delete(f'/posts/{self.post.id}/comments/{comment.id}/')
        self.assertEqual(response.status_code, 204)
