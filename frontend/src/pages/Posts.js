// Posts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts/');
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main id="main">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-9" data-aos="fade-up">
              <h3 className="category-title">게시글 목록</h3>

              {posts.map((post) => (
                <div key={post.id} className="d-md-flex post-entry-2 half">
                  <Link to={`/posts/${post.id}`} className="me-4 thumbnail">
                  {post.image ? (
                      <img src={post.image} alt={post.title} className="img-fluid" style={{width: '200px', height: '200px', objectFit: 'cover'}} onError={(e) => { // 6번: 오류 처리 개선
                        e.target.onerror = null; 
                        e.target.src = '/path/to/default/image.jpg'; // 기본 이미지 경로로 변경하세요
                      }}/>
                    ) : (
                      <div style={{width: '200px', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        No Image
                      </div>
                    )}                    
                  </Link>
                  <div>
                    <div className="post-meta">
                      <span className="date">{post.category}</span> 
                      <span className="mx-1">&bullet;</span> 
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
                    <p>{post.content.substring(0, 200)}...</p>
                    <div className="d-flex align-items-center author">
                      <div className="photo">
                        <img src={post.author_image || 'default-author-image-url'} alt="" className="img-fluid" />
                      </div>
                      <div className="name">
                        <h3 className="m-0 p-0">{post.author_username}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination component can be added here */}
            </div>

            {/* Sidebar component can be added here */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Posts;