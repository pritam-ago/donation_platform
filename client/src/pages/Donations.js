import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api';

const Donations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await api.get('/api/user/donations', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setDonations(response.data.donations);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px', backgroundColor: '#F2B885' }}>
            <h1 style={{ color: '#8C331F' }}>My Donations</h1>
            {donations.length === 0 ? (
                <p style={{ color: '#687343' }}>No donations made yet.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {donations.map((donation) => (
                        <li
                            key={donation._id}
                            style={{
                                margin: '10px 0',
                                padding: '10px',
                                border: '1px solid #D95525',
                                borderRadius: '5px',
                                backgroundColor: '#F29544',
                            }}
                        >
                            <h3 style={{ margin: '0', color: '#8C331F' }}>
                                {donation.title || 'Untitled Cause'}
                            </h3>
                            <p>{donation.description || 'No description available.'}</p>
                            <p style={{ color: '#687343' }}>
                                Amount Donated: ${donation.amountDonated || 0}
                            </p>
                            <p style={{ color: '#8C331F' }}>
                                Date: {new Date(donation.date).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Donations;
