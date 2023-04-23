import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    // Perform any necessary cleanup on logout
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <ul className="left-section">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <ul className="right-section">
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li>
            <Link to="#" onClick={handleLogout}>
              <a className="nav-link" href="/">Logout</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

