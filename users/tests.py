from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class UserTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='testpassword'
        )

    def test_user_signup(self):
        # 회원 가입 테스트
        data = {
            'email': 'newuser@example.com',
            'password1': 'newpassword123',
            'password2': 'newpassword123'
        }
        response = self.client.post('/users/signup/', data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_user_login(self):
        # 로그인 테스트
        data = {
            'email': 'testuser@example.com',
            'password': 'testpassword'
        }
        response = self.client.post('/login/', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_user_profile(self):
        # 프로필 조회 테스트
        token = RefreshToken.for_user(self.user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(f'/users/profile/{self.user.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], 'testuser@example.com')

    def test_user_profile_update(self):
        # 프로필 업데이트 테스트
        token = RefreshToken.for_user(self.user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        data = {
            'bio': 'Updated Bio'
        }
        response = self.client.put(f'/users/profile/{self.user.id}/', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['bio'], 'Updated Bio')

    def test_user_profile_delete(self):
        # 프로필 삭제 테스트
        token = RefreshToken.for_user(self.user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.delete(f'/users/profile/{self.user.id}/')
        self.assertEqual(response.status_code, 204)
