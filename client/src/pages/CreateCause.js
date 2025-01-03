import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateCause.css';

const CreateCause = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5555/api/causes', 
        {
          title,
          description,
          targetAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log('Cause created successfully:', response.data);
      navigate('/home')
    } catch (err) {
      setError('Error creating cause');
      console.error(err);
    }
  };

  return (
    <div className="create-cause-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Cause</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="targetAmount">Target Amount</label>
          <input
            type="number"
            id="targetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Create Cause</button>
      </form>
    </div>
  );
};

export default CreateCause;
