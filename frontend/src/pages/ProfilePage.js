// ProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [scrappedPosts, setScrappedPosts] = useState([]);

  useEffect(() => {
    const fetchScrappedPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/users/scraps/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setScrappedPosts(response.data);
      } catch (error) {
        console.error('Error fetching scrapped posts:', error.response ? error.response.data : error.message);
        alert('Failed to fetch scrapped posts.');
      }
    };

    fetchScrappedPosts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Scrapped Posts</h2>
      <hr></hr>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {scrappedPosts.length === 0 ? (
          <p>No scrapped posts yet.</p>
        ) : (
          scrappedPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
              <img src={post.image} alt={post.title} className="img-fluid mb-4" style={{width: '200px', height: '200px', objectFit: 'cover'}}/><br></br>
              {post.title}
              <hr></hr>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProfilePage;
