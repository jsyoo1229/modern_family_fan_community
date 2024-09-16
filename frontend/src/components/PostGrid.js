import React, { useEffect, useState } from 'react';
import axios from 'axios';
import defaultImage from '../assets/img/default-image.jpg'; // 기본 이미지 경로
import defaultAuthorImage from '../assets/img/default-author.jpg'; // 기본 프로필 이미지 경로

const PostGrid = () => {
  const [topLikedPosts, setTopLikedPosts] = useState([]);

  useEffect(() => {
    const fetchTopLikedPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts/top_liked/');
        setTopLikedPosts(response.data);
      } catch (error) {
        console.error('Error fetching top liked posts:', error);
      }
    };

    fetchTopLikedPosts();
  }, []);

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          {topLikedPosts.map((post) => (
            <div key={post.id} className="col-lg-4">
              <div className="post-entry-1 lg">
                <a href={`/posts/${post.id}`}>
                  <img src={post.image || defaultImage} alt={post.title} className="img-fluid" />
                </a>
                <div className="post-meta">
                  <span className="date">팬 게시판</span>
                  <span className="mx-1">&bullet;</span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <h2>
                  <a href={`/posts/${post.id}`}>{post.title}</a>
                </h2>
                <p>{post.content.substring(0, 100)}...</p>
                <div className="d-flex align-items-center author">
                  <div className="photo">
                    <img src={post.author_image || defaultAuthorImage} alt="" className="img-fluid" />
                  </div>
                  <div className="name">
                    <h3 className="m-0 p-0">{post.author_username}</h3>
                  </div>
                </div>
                {/* 좋아요 수 표시 */}
                <div className="like-count">
                  <span>{post.like_count || 0} 좋아요</span> {/* 좋아요 수가 없으면 0으로 표시 */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostGrid;
