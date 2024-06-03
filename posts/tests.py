from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from .models import Post

User = get_user_model

class PostTest(TestCase):
    def setUp(self):
        self.client = APIClient()   
        self.user = User.objects.create_user(
            username = 'testuser'
            email = 'testuser@example.com'
            password = 'testpassword'
        )
        self.post = Post.objects.create(
            title = 'TestPost',
            content = 'TestContent',
            author = self.user
        )

    def test_post_create(self):

        print("-------post 작성 테스트-------")
        print("-------비회원 작성 테스트-------")
        data = {
            'title': 'testpost',
            'content': 'testcontent',
        }

        response = self.client.post('/posts/', data, format='json')
        self.assertEqual(response.status_code, 403)

        print("-------회원 작성 테스트-------")
        self.client.login(username='testuser', password = 'testpassword')
        data = {
            'title': 'testpost',
            'content': 'testcontent',
        }

        response = self.client.post('/posts/', data, format='json')
        self.assertEqual(response.status_code, 201)