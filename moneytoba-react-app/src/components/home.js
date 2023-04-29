import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './home.css';
import Explore from './explore';

function Home() {
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const [data] = useState('Hello World!');

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Moneytoba!</h1>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <Explore />
    </div>
  );
}

export default Home;
