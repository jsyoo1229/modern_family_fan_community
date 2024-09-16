// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn, userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const userId = localStorage.getItem('userId');

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <h1>Modern Famliy Fan Community</h1>
        </Link>
        <nav id="navbar" className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/single-post">Single Post</Link></li> */}
            <li className="dropdown">
              <a href="#"><span>Modern Family</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>
              <ul>
                <li><Link to="/modern-family">Show Info</Link></li>
                <li><Link to="/modern-family/characters">Characters</Link></li>
                <li><Link to="/modern-family/episodes">Episodes</Link></li>
              </ul>
            </li>
            <li><Link to="/posts">Posts</Link></li>
            {isLoggedIn && (
              <>
                <li><Link to="/create-post">Write a Post</Link></li> 
                <li><Link to="/profile">Scrapped Posts</Link></li>
              </>
            )}
          </ul>
        </nav>
        <div className="position-relative">
          {isLoggedIn ? (
            <>
              <span className="me-2 text-light">{userEmail}</span>
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="mx-2 btn btn-outline-light btn-sm">SignUp</Link>
              <Link to="/login" className="mx-2 btn btn-light btn-sm">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;