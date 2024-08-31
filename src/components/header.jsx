import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    return (
        <header className="header">
          <nav className="nav">
            <ul className="nav-list">
              <li><a href="/">HOME</a></li>
              <li><a href="/">VOLUNTEER</a></li>
              <li><a href="/">APPLY FOR SERVICES</a></li>
            </ul>
          </nav>
          <div className="logo">
            <img src="/public/Green Beginnings Logo.png" alt="Green Beginnings Logo" />
          </div>
          <div className="auth-buttons">
            <button className="sign-in">SIGN IN</button>
            <button className="apply-now">APPLY NOW</button>
          </div>
        </header>
      );
}

export default Header;
