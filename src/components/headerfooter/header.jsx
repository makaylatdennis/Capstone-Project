import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./header.css";
import { useCookies } from "react-cookie";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const [cookies, setCookie] = useCookies(["token"], {});

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const login = () => {
    if (cookies.token) {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch("/api/logout", option)
        .then((res) => res.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={`nav-list ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/volunteer">VOLUNTEER</Link>
          </li>
        </ul>
      </nav>
      <div className="logo">
        <Link to="/">
          <img src="/GB Nav Logo.png" alt="Green Beginnings Logo" />
        </Link>
      </div>
      <div className="auth-buttons">
        <button className="sign-in" onClick={login}>
          {cookies.token ? "SIGN OUT" : "SIGN IN"}
        </button>
        <button className="apply-now">
          <Link to="/application" className="applynow-no-visited">
            APPLY NOW
          </Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
