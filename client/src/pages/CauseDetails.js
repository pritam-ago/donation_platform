import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';  // Make sure api.js is correctly set up

const CauseDetails = () => {
  const { id } = useParams();
  const [cause, setCause] = useState(null);
  const [donationAmount, setDonationAmount] = useState(0);

  // Function to get the JWT token from localStorage (or wherever it's stored)
  const getUserToken = () => {
    return localStorage.getItem('token'); // Adjust this based on where you're storing the token
  };

  useEffect(() => {
    const fetchCause = async () => {
      try {
        const response = await api.get(`/api/causes/${id}`);
        setCause(response.data);
      } catch (error) {
        console.error('Error fetching cause:', error);
      }
    };

    fetchCause();
  }, [id]);

  const handleDonate = async () => {
    const token = getUserToken();
    if (!token) {
      alert('Please log in to donate');
      return;
    }

    try {
      const response = await api.post(
        '/api/donate',
        { causeId: id, amount: donationAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );
      alert('Donation successful');
      setDonationAmount(0); // Reset donation amount after donation
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('Donation failed. Please try again.');
    }
  };

  return (
    <div>
      {cause ? (
        <>
          <h1>{cause.title}</h1>
          <p>{cause.description}</p>
          <p>Amount Raised: ${cause.amountRaised}</p>
          <p>Target Amount: ${cause.targetAmount}</p>
          
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Enter donation amount"
          />
          <button onClick={handleDonate}>Donate</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CauseDetails;
