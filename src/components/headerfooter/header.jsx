import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    return (
        <header className="header">
          <nav className="nav">
            <ul className="nav-list">
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/volunteer">VOLUNTEER</Link></li>
            </ul>
          </nav>
          <div className="logo">
            <Link to="/">
              <img src="/GB Nav Logo.png" alt="Green Beginnings Logo" />
            </Link>
          </div>
          <div className="auth-buttons">
            <button className="sign-in"><Link to="/Auth" className="signin-no-visited">SIGN IN</Link></button>
            <button className="apply-now"><Link to="/application" className="applynow-no-visited">APPLY NOW</Link></button>
          </div>
        </header>
      );
}

export default Header;

