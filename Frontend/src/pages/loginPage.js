import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../styling.css';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    var use = sessionStorage.getItem("username");
    if (use != null){
      navigate('/employeehomepage');
    }
  },[navigate]);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsSubmitDisabled(e.target.value === '' || password.length < 6);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsSubmitDisabled(username === '' || e.target.value.length < 6);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem("username", username);
    navigate('/employeehomepage');
    // Reset the form fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-page login-background-container">
      
      <div className="login-header">
          <h1>Schedule Application</h1>
      </div>

      <div className="login-box">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label htmlFor="username">Username</label>
          
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />

          </div>

          <div className="form-group">

            <label htmlFor="password">Password</label>

            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="toggle-password-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button type="submit"  disabled={isSubmitDisabled} className={isSubmitDisabled ? 'disabled' : 'enabled'}>Login</button>

        </form>

        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>

      </div>
    </div>
  );
};
  
  export default Login;