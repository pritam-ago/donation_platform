import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const CauseDetails = () => {
  const { id } = useParams();
  const [cause, setCause] = useState(null);

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

  return (
    <div>
      {cause ? (
        <>
          <h1>{cause.title}</h1>
          <p>{cause.description}</p>
          <p>Amount Raised: ${cause.amountRaised}</p>
          <p>Target Amount: ${cause.targetAmount}</p>
          <button>Donate</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CauseDetails;
