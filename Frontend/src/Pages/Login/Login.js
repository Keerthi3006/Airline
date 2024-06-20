import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('https://airline-management-kd9w.onrender.com/api/user/login', {
        email,
        password,
      });

      setLoading(false);

      if (response.status === 200) {
        navigate('/user/userbooking');
        // Set the authorization token and user ID in the context or redux store
      }
    } catch (error) {
      // Display an error message to the user
      console.error('Login error:', error.response.data);
    }
  };

  const handleSignUp = () => {
    console.log('Navigate to Sign Up page');
    navigate("/user/signup");
  };

  return (
    <div className="login-container">
      {loading && <Loading />}

      <h2 className="login-title">Login to Flight Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Loading..' : 'Login'}
        </button>
      </form>
      <p className="signup-link">
        Don't have an account?{' '}
        <button className="signup-button" onClick={handleSignUp}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
