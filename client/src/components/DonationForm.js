import React, { useState } from 'react';
import axios from 'axios';
import api from '../services/api';

const DonationForm = ({ causeId, userId }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/donate', { userId, causeId, amount });
      alert('Donation successful!');
    } catch (error) {
      alert('Error making donation: ' + error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <button type="submit">Donate</button>
    </form>
  );
};

export default DonationForm;
