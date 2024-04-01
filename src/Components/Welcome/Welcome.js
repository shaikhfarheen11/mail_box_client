import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './Welcome.module.css';
import Compose from '../Compose/Compose';

const Welcome = () => {
  const [showCompose, setShowCompose] = useState(false);

  const handleComposeClick = () => {
    setShowCompose(!showCompose);
  };

  return (
    <div className={classes.welcomeContainer}>
      <div className="mt-5">
        <h2>Welcome to Your mail box</h2>
        <hr />

        <button className={`btn btn-primary mt-3`} onClick={handleComposeClick}>
          Compose
        </button>
        {showCompose && <Compose />}
      </div>
    </div>
  );
};

export default Welcome;
