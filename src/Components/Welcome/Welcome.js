import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Welcome.module.css';
import Compose from '../Compose';
import Sidebar from '../Sidebar';
import EmailDetails from '../EmailDetails'; 
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'; 

const Welcome = () => {
  const [showCompose, setShowCompose] = useState(false);
  const [receivedEmails, setReceivedEmails] = useState([]);

  const handleComposeClick = () => {
    setShowCompose(!showCompose);
  };

  const fetchReceivedEmails = async () => {
    try {
  
      const response = await axios.get("YOUR_API_ENDPOINT_HERE"); 
      setReceivedEmails(response.data);
    } catch (error) {
      console.error("Error fetching received emails:", error);
    }
  };

  const updateReceivedEmails = async () => {
    try {
      await fetchReceivedEmails();
    } catch (error) {
      console.error("Error updating received emails:", error);
    }
  };

  return (
    <div className={classes.welcomeContainer}>
      <div className="mt-5">
        <h2>Welcome to Your mail box</h2>
        <hr />

        <button className={`btn btn-primary mt-3`} onClick={handleComposeClick}>
          Compose
        </button>
        {showCompose && <Compose onUpdateReceivedEmails={updateReceivedEmails} />}
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="email-details">
        <Routes>
          <Route path="/email/:mailid" element={<EmailDetails />} />
        </Routes>
        {receivedEmails.map((email) => (
          <div key={email.id} className="received-email">
            <p>{email.subject}</p>
            <p>{email.from}</p>
            <p>{email.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
