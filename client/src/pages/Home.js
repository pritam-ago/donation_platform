import React, { useEffect, useState } from 'react';
import api from '../services/api'; 
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const [causes, setCauses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/'); 
    }

    const fetchCauses = async () => {
      try {
        const response = await api.get('/api/causes');
        setCauses(response.data);
      } catch (error) {
        console.error('Error fetching causes:', error);
      }
    };

    fetchCauses();
  }, [navigate]);

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div>
      <h1>Active Causes</h1>
      <div>
        {causes.map((cause) => (
          <div key={cause._id}>
            <h2>{cause.title}</h2>
            <h4>Target amount: {cause.targetAmount}</h4>
            <p>{cause.description}</p>
            <h6>Raised by: {cause.createdBy.name}</h6>
            <Link to={`/cause/${cause._id}`}>
                <button>View details</button>
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
