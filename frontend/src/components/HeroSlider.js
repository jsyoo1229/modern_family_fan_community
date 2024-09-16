import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts/top_viewed/');
        setTopPosts(response.data);
      } catch (error) {
        console.error('Error fetching top posts:', error);
      }
    };

    fetchTopPosts();
  }, []);

  return (
    <section id="hero-slider" className="hero-slider">
      <div className="container-md" data-aos="fade-in">
        <div className="row">
          <div className="col-12">
            {topPosts.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={topPosts.length > 1}
                className="sliderFeaturedPosts"
              >
                {topPosts.map((post) => (
                  <SwiperSlide key={post.id}>
                    <Link to={`/posts/${post.id}`} className="img-bg d-flex align-items-end" style={{ backgroundImage: `url(${post.image})` }}>
                      <div className="img-bg-inner">
                        <h2>{post.title}</h2>
                        <p>{post.content.substring(0, 100)}...</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;