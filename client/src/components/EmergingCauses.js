import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/EmergingCauses.css';

const EmergingCauses = () => {
  const [emergingCauses, setEmergingCauses] = useState([]);

  useEffect(() => {
    const fetchEmergingCauses = async () => {
      try {
        const response = await api.get('/api/emerging-causes');
        setEmergingCauses(response.data);
      } catch (error) {
        console.error('Error fetching emerging causes:', error);
      }
    };

    fetchEmergingCauses();
  }, []);

  return (
    <div className="emerging-causes-container">
      <h3>Emerging Causes</h3>
      <table className="emerging-causes-table">
        <thead>
          <tr>
            <th>Cause Title</th>
            <th>Raised</th>
            <th>Target</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {emergingCauses.map((cause) => (
            <tr key={cause._id}>
              <td>{cause.title}</td>
              <td>${cause.amountRaised}</td>
              <td>${cause.targetAmount}</td>
              <td>{((cause.amountRaised / cause.targetAmount) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmergingCauses;
