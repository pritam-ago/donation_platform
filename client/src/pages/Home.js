import React, { useEffect, useState } from 'react';
import api from '../services/api'; 
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';
import Leaderboard from '../components/Leaderboard';
import EmergingCauses from '../components/EmergingCauses';
import Header from '../components/Header';

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
    <div className="home-container">
      <Header/>
      <div className="main-content">
        <h1>Active Causes</h1>
        <div className="cause-list">
          {causes.map((cause) => (
            <div className="cause-card" key={cause._id}>
              <Link to={`/cause/${cause._id}`} style={{ textDecoration: 'none' }}>
                <h2>{cause.title}</h2>
                <h4>Target amount: {cause.targetAmount}</h4>
                <p>{cause.description}</p>
                <h6>Raised by: {cause.createdBy.name}</h6>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-right">
        <div className="emerging-causes">
          <EmergingCauses/>
          
        </div>
        <div className="leaderboard">
          <Leaderboard/>
        </div>
      </div>
    </div>
  );
};

export default Home;
