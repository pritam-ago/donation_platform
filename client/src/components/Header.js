import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import SearchBar from './SearchBar';

const Header = () => {
  const location = useLocation();  // Get the current page's location
  
  // Get the name of the current page from the path
  const currentPage = location.pathname.split('/').pop() || 'Home';

  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="header-title">
          DONATIONS PLATFORM
        </h1>
        <nav className="header-nav">
          <ul className="nav-links">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-cause">Create Cause</Link></li>
            <li><Link to="/donations">Donations</Link></li>
          </ul>
        </nav>
        <SearchBar/>
      </div>
    </header>
  );
};

export default Header;
