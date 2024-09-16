import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false); 
  const [editedContent, setEditedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isScrapped, setIsScrapped] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 추가
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수 추가

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}/`);
        setPost(response.data);
        setEditedContent(response.data.content);
        setComments(response.data.comments); // 댓글 목록 설정
        setLikeCount(response.data.like_count); // 좋아요 개수 설정

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && response.data.author === parseInt(userId)) {
          setIsAuthor(true); // 작성자가 맞으면 true로 설정
        }

        if (token) {
          const scrapResponse = await axios.get(`http://localhost:8000/posts/${id}/scrap/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsScrapped(scrapResponse.data.is_scrapped);

          // 좋아요 여부 확인
          const likeResponse = await axios.get(`http://localhost:8000/posts/${id}/like/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsLiked(likeResponse.data.is_liked);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  // 토큰 갱신 함수
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: refreshToken,
      });

      localStorage.setItem('token', response.data.access);
      return response.data.access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      alert('로그인이 필요합니다.');
      navigate('/login'); // 만료된 토큰이면 로그인 페이지로 리디렉션
    }
  };

  const handleEditToggle = () => {    
    setOriginalContent(editedContent);
    setIsEditing(!isEditing); // 편집 모드 토글
  };

  const handleEditCancel = () => {
    setEditedContent(originalContent);  // 원래 내용으로 되돌림
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const requestData = { 
        content: editedContent
      };
      console.log('Request data:', requestData);
  
      const response = await axios.patch(
        `http://localhost:8000/posts/${id}/`, 
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      
      alert('게시물이 수정되었습니다.');
      setIsEditing(false);
      setPost({...post, content: editedContent});
    } catch (error) {
      console.error('게시물 수정 중 오류 발생:', error.response?.data || error.message);
      alert('게시물 수정에 실패했습니다. 상세 오류: ' + JSON.stringify(error.response?.data || error.message));
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/posts/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('게시물이 삭제되었습니다.');
      navigate('/posts'); // 삭제 후 게시물 목록으로 이동
    } catch (error) {
      if (error.response?.status === 401 && error.response?.data?.code === 'token_not_valid') {
        // 토큰이 만료된 경우 토큰 갱신 시도
        token = await refreshToken();
        await axios.delete(`http://localhost:8000/posts/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('게시물이 삭제되었습니다.');
        navigate('/posts');
      } else {
        console.error('게시물 삭제 중 오류 발생:', error);
        alert('게시물 삭제에 실패했습니다.');
      }
    }
  };

  // 좋아요 처리 함수
  const handleLike = async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      try {
        await axios.post(`http://localhost:8000/posts/${id}/like/`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLiked(true);
        setLikeCount(likeCount + 1); // 좋아요 개수 증가
      } catch (error) {
        if (error.response?.data?.code === 'token_not_valid') {
          // 토큰이 유효하지 않은 경우 토큰 갱신 시도
          token = await refreshToken();
          await axios.post(`http://localhost:8000/posts/${id}/like/`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsLiked(true);
          setLikeCount(likeCount + 1);
        } else {
          console.error('Error liking post:', error);
          alert('좋아요 처리에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // 스크랩 처리 함수
  const handleScrap = async () => {
    try {
      let token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      try {
        const response = await axios.post(`http://localhost:8000/posts/${id}/scrap/`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsScrapped(true);
      } catch (error) {
        if (error.response?.data?.code === 'token_not_valid') {
          token = await refreshToken();
          await axios.post(`http://localhost:8000/posts/${id}/scrap/`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsScrapped(true);
        } else {
          console.error('Error scrapping post:', error.response ? error.response.data : error.message);
          alert('스크랩 처리에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error scrapping post:', error.response ? error.response.data : error.message);
      alert('Failed to scrap post.');
    }
  };

  // 댓글 작성 함수
  // 댓글 작성 함수
const handleCommentSubmit = async () => {
  try {
    let token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // 사용자 ID 가져오기
    if (!token || !userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/posts/${id}/comments/`,
        { 
          content: newComment,
          post: parseInt(id), // 게시물 ID
          author: parseInt(userId) // 사용자 ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      if (error.response?.data?.code === 'token_not_valid') {
        token = await refreshToken();
        const response = await axios.post(
          `http://localhost:8000/posts/${id}/comments/`,
          { 
            content: newComment,
            post: parseInt(id),
            author: parseInt(userId)
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setComments([...comments, response.data]);
        setNewComment('');
      } else {
        console.error('Error submitting comment:', error);
        alert('댓글 작성에 실패했습니다.');
      }
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
    alert('댓글 작성에 실패했습니다.');
  }
};

  if (!post) return <div>Loading...</div>;

  return (
    <main id="main">
      <section className="single-post-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 post-content" data-aos="fade-up">
              <div className="single-post">
                <h1>{post.title}</h1>
                {post.image && (
                  <img src={post.image} alt={post.title} className="img-fluid mb-4" />
                )}
                {/* <p>{post.content}</p> */}

                {isEditing ? (
                  <textarea 
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)} 
                    rows="5" 
                    className="form-control"
                  />
                ) : (
                  <p>{post.content}</p>
                )}

                {isAuthor && (
                  <div className="mt-3">
                    {isEditing ? (
                      <>
                      <button onClick={handleEditSave} className="btn btn-success me-2">
                      Save
                      </button>
                      <button onClick={handleEditCancel} className="btn btn-secondary me-2">
                      Cancle
                      </button>
                    </>
                    ) : (
                      <button onClick={handleEditToggle} className="btn btn-primary me-2">
                        Edit
                      </button>
                    )}
                    <button onClick={handleDelete} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                )}
                
                {/* {isAuthor && (
                  <div className="mt-3">
                    <button onClick={handleDelete} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                )} */}

                <div className="mt-3">
                  <button onClick={handleLike} className="btn btn-primary me-2" disabled={isLiked}>
                    {isLiked ? 'Liked' : 'Like'} ({likeCount})
                  </button>
                  <button onClick={handleScrap} className="btn btn-secondary ms-2" disabled={isScrapped}>
                    {isScrapped ? 'Scrapped' : 'Scrap'}
                  </button>
                </div>
              </div>

              {/* 댓글 목록 */}
              <div className="comments-section mt-5">
                <h3>Comments</h3>
                {comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>
                      <strong>{comment.author_username}</strong>: {comment.content}
                    </p>
                    <small>{new Date(comment.created_at).toLocaleString()}</small>
                  </div>
                ))}

                {/* 댓글 작성 폼 */}
                <div className="comment-form mt-4">
                  <h4>Leave a Comment</h4>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="form-control"
                    rows="3"
                    placeholder="Write your comment here..."
                  />
                  <button onClick={handleCommentSubmit} className="btn btn-primary mt-3">
                    Submit Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SinglePost;
