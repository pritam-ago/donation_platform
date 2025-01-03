import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5555/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.log("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <div className="profile-item">
          <strong>Name:</strong> {userData.name}
        </div>
        <div className="profile-item">
          <strong>Username:</strong> {userData.username}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {userData.email}
        </div>
        <div className="profile-item">
          <strong>Total Donated Amount:</strong> ${userData.totalDonatedAmount}
        </div>
        <div className="profile-item">
          <strong>Donated Causes:</strong>
          <ul>
            {userData.donatedTo.map((cause, index) => (
              <li key={index}>{cause.title}</li>
            ))}
          </ul>
        </div>
        <div className="profile-item">
          <strong>Raised Causes:</strong>
          <ul>
            {userData.raisedCauses.map((cause, index) => (
              <li key={index}>{cause.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Profile;
