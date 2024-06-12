import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Matches</Link>
        </li>
        <li className="nav-item">
          <Link to="/news" className="nav-link">News</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;