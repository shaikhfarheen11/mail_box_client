import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import classes from './Welcome.module.css';

const Welcome = () => {
  return (
    <div className={classes.welcomeContainer}>

      <div className="mt-5">
        <h2>Welcome to Your mail box</h2>
        
        <hr />
      </div>
    </div>
  );
};

export default Welcome;
