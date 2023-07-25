import React, { useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ handleChangeForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email is not valid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send a POST request to the API endpoint
        const response = await axios.post('http://localhost:3030/api/employees/login', {
          "email_id": email,
          "password": password,
        },{headers
        :{
          "Access-Control-Allow-Origin":"*"
        }});

        const { Response, role } = response.data;

        if (Response === 'Login successful') {
          if (role === 'Employee') {
            sessionStorage.setItem("email", email);
            navigate('/employeehomepage');
            console.log('Login form submitted');
          } else if (role === 'Manager'){
            sessionStorage.setItem("email", email);
            navigate('/employeehomepage');
            console.log('Login form submitted');
          }
        } else {
          // Handle login failed
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        // Handle API error or network issues
        console.error('Error occurred while calling the API:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <p>
        Don't have an account?{' '}
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleChangeForm}>
          Register
        </span>
      </p>
    </form>
  );
};

export default LoginForm;