import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Header from "../components/Header";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isDonatedOpen, setIsDonatedOpen] = useState(false);
  const [isRaisedOpen, setIsRaisedOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://donation-platform-api.vercel.app/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const toggleDonatedList = () => {
    setIsDonatedOpen((prev) => !prev);
  };

  const toggleRaisedList = () => {
    setIsRaisedOpen((prev) => !prev);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Header/>
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-details">
        <div className="profile-item">
           {userData.name}
        </div>
        <div className="profile-item">
          {userData.username}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {userData.email}
        </div>
        <div className="profile-item">
          <strong>Total Donated Amount:</strong> ${userData.totalDonatedAmount}
        </div>

        <div className={`profile-item cause-list ${isDonatedOpen ? "open" : ""}`}>
          <strong onClick={toggleDonatedList}>Donated Causes</strong>
          {isDonatedOpen && (
            <ul>
              {userData.donatedTo.map((cause, index) => (
                <li key={index}>{cause.title}</li>
              ))}
            </ul>
          )}
        </div>

        <div className={`profile-item cause-list ${isRaisedOpen ? "open" : ""}`}>
          <strong onClick={toggleRaisedList}>Raised Causes</strong>
          {isRaisedOpen && (
            <ul>
              {userData.raisedCauses.map((cause, index) => (
                <li key={index}>{cause.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Profile;
