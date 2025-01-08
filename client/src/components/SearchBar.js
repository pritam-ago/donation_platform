// src/components/SearchBar.js
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = useCallback(debounce(async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('https://donation-platform-api.vercel.app/api/causes/search', {
        params: { query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  }, 300), []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div style={searchContainerStyles}>
      <input
        type="text"
        placeholder="Search causes"
        value={searchTerm}
        onChange={handleChange}
        style={searchInputStyles}
      />
      
      {/* Dropdown of Search Results */}
      {results.length > 0 && (
        <ul style={dropdownStyles}>
          {results.map((cause) => (
            <li key={cause._id} style={dropdownItemStyles}>
              <Link to={`/cause/${cause._id}`} style={dropdownLinkStyles}>
                <h3>{cause.title}</h3>  
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Styles
const searchContainerStyles = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const searchInputStyles = {
  padding: '8px 12px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '200px',
};

const dropdownStyles = {
  position: 'absolute',
  top: '100%',
  left: '0',
  width: '100%',
  backgroundColor: '#fff',
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
  maxHeight: '300px',
  overflowY: 'auto',
  marginTop: '1px',
  zIndex: '10',
};

const dropdownItemStyles = {
  borderBottom: '1px solid #eee',
  cursor: 'pointer',
};

const dropdownLinkStyles = {
  textDecoration: 'none',
  color: '#333',
};

export default SearchBar;
