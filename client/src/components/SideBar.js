import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/SideBar.css';

const Sidebar = () => {

  return (
    <div className="sidebar collapsed">
      <nav>
        <ul>
          <Link style={{ textDecoration: 'none' }} to="/home">
          <li>
            
              <i className="fas fa-home"></i>
            
          </li>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/profile">
          <li>
            
              <i className="fas fa-user"></i>
            
          </li>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/donations">
          <li>
            
              <i className="fas fa-list"></i>
            
          </li>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/create-cause">
          <li>
            
              <i className="fas fa-plus"></i>
            
          </li>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/search-cause">
          <li>
            
              <i className="fas fa-search"></i>
            
          </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
