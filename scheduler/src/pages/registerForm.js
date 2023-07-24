import React, { useState } from 'react';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField,Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = ({ handleChangeForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organizationNumber, setOrganizationNumber] = useState('');
  const [role, setRole] = useState('Employee');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizationNumber: '',
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      organizationNumber: '',
    };

    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!organizationNumber) {
        newErrors.organizationNumber = 'Organization number is required';
        valid = false;
    } else if (organizationNumber && !/^\d+$/.test(organizationNumber)) {
      newErrors.organizationNumber = 'Organization number must contain only numeric characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("name:" + name);
    console.log("email_id:" + email);
    console.log("password:" + password);
    console.log("company code:" + organizationNumber);
    console.log("role:" + role);
    
    if (validateForm()) {
        
          if (role !== undefined) {
            const response = await axios.post('http://localhost:3030/api/employees/registration', {
                "name": name,
                "email_id": email,
                "password": password,
                "company_code":organizationNumber,
                "role":role
            },{headers
              :{
                "Access-Control-Allow-Origin":"*"
              }});
    
            const { Response, role } = response.data;
    
            if (Response === 'Registration successful') {
                sessionStorage.setItem("email", email);
                console.log('Login form submitted');
                if (role === 'Employee') {
                    navigate('/employeehomepage');
              } else if (role === 'Manager'){
                navigate('/managerhomepage');
              }
            } else {
              // Handle login failed
              alert('Registration failed.');
            }
            console.log('Registration form submitted');
          } 
           else { 
              // Handle API error or network issues
              console.error('Error occurred while calling the API:');
              alert('An error occurred. Please try again later.');
          }
            // Send a POST request to the API endpoint
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                ),
                }}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Organization Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={organizationNumber}
            onChange={(e) => setOrganizationNumber(e.target.value)}
            error={!!errors.organizationNumber}
            helperText={errors.organizationNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
      <p>
        Already have an account?{' '}
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleChangeForm}>
          Login
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;