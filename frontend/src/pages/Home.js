import React from 'react';
import HeroSlider from '../components/HeroSlider';
import PostGrid from '../components/PostGrid';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <PostGrid />
    </div>
  );
};

export default Home;