import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // 토큰 리프레시 함수 (리프레시 토큰을 사용해 액세스 토큰 갱신)
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        console.error('No refresh token found.');
        return null;
      }

      // 리프레시 토큰으로 액세스 토큰 갱신 요청
      const response = await axios.post('http://localhost:8000/users/token/refresh/', {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      localStorage.setItem('token', newAccessToken);  // 새 액세스 토큰 저장
      return newAccessToken;
      
    } catch (error) {
      // 토큰이 유효하지 않은 경우 처리
      if (error.response && error.response.data.code === 'token_not_valid') {
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
      console.error('Error refreshing token:', error.response ? error.response.data : error.message);
      return null;
    }
  };

  // 글 제출 함수 (글을 작성하고 서버로 전송)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    let token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      // 서버에 글 작성 요청 (POST 요청)
      const response = await axios.post('http://localhost:8000/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      // 요청 성공 시 홈으로 리다이렉트
      navigate('/');
    } catch (error) {
      // 토큰이 만료된 경우 처리
      if (error.response && error.response.data.code === 'token_not_valid') {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // 새로운 토큰으로 다시 요청
          const response = await axios.post('http://localhost:8000/posts/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${newAccessToken}`,
            },
          });
          navigate('/');
        } else {
          alert('로그인이 필요합니다.');
        }
      } else {
        console.error('Error creating post:', error.response ? error.response.data : error.message);
        alert('글 작성에 실패했습니다.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
