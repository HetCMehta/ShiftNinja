import React, { useEffect, useState } from "react";
import { Link,useNavigate } from 'react-router-dom'; 
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../styling.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [organizationNumber, setOrganizationNumber] = useState('');
  const [role, setRole] = useState('employee');
  const [errors, setErrors] = useState({});
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
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleKeyPress = (event) => {
    // Prevent non-numeric characters and spinner actions
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode !== 8 && charCode !== 0 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!organizationNumber) {
      errors.organizationNumber = 'Organization number is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {

      sessionStorage.setItem("username", email);
      navigate('/employeehomepage');

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setOrganizationNumber('');
    }
    
  };

  return (
    <div className="register-page">

      <div className="register-header">
        <h1>Create an Account</h1>
      </div>
      
      <div className="register-content">
      
        <div className="register-box">

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
        
              <label htmlFor="email">Email</label>
            
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
            
              <label htmlFor="password">Password</label>
            
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {!errors.password && <span className="message">Password should be minimum 6 characters long</span>}
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Your Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password-button"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
            
            <div className="form-group">
            
              <label htmlFor="organizationNumber">Organization Number</label>
            
              <input
                type="text"
                id="organizationNumber"
                name="organizationNumber"
                inputMode="numeric"
                pattern="[0-9]*"
                value={organizationNumber}
                placeholder="Enter Your Organisation number"
                onKeyDown={handleKeyPress}
                onChange={(e) => setOrganizationNumber(e.target.value)}
              />
              {errors.organizationNumber && (
                <span className="error-message">{errors.organizationNumber}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <button type="submit" className='enabled'>Register</button>
          
          </form>
          
          <div className="login-link">
            Already have an account? <Link to="/">Login</Link>
          </div>
        
        </div>
      
      </div>
      
      </div>
  );
};
  
export default Register;