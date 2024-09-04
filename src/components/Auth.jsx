import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Auth.css'; 

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Used only in signup
  const [submitted, setSubmitted] = useState(null); // To track submission status
  const navigate = useNavigate(); // To navigate after successful login

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    setSubmitted(null); // Reset submission status when switching forms
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isLogin ? "/api/login" : "/api/signup"; // Determine API endpoint
    const payload = isLogin
      ? { email, password } // Login payload
      : { name, email, password }; // Signup payload

    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    fetch(url, option)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw err;
          });
        }
        return res.json();
      })
      .then((data) => {
        if (isLogin) {
          setSubmitted("Logged In");
          navigate(data.redirect); // Redirect on successful login
        } else {
          setSubmitted("Signed Up Successfully!");
          // Reset form fields after successful signup
          setName('');
          setEmail('');
          setPassword('');
        }
      })
      .catch((err) => {
        alert(err.message);
        console.error(err.message);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {submitted && !isLogin && (
          <p className="success-message">{submitted}</p> // Show success message for signup
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button type="button" onClick={toggleForm} className="toggle-button">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
