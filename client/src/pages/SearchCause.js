import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { useNavigate, Link } from 'react-router-dom';

const SearchCause = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = useCallback(debounce(async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5555/api/causes/search', {
        params: { query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response.data);
    } catch (err) {
      setError('Error fetching search results');
      console.error(err);
    }
  }, 10), []);  

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value); 
  };

  return (
    <div>
      <h2>Search Causes</h2>
      <form>
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={handleChange}
          required
        />
      </form>

      {error && <p>{error}</p>}

      {results.length > 0 ? (
        <ul>
          {results.map((cause) => (
            <li key={cause._id}>
              <Link style={{ textDecoration: 'none' }} to={`/cause/${cause._id}`}>
              <h3>{cause.title}</h3>
              <p>{cause.description}</p>
              
                
            </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No causes found</p>
      )}
    </div>
  );
};

export default SearchCause;
