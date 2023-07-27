import React, { useState, useEffect } from 'react';
import { Button, Box, Container, Grid, Paper, Typography, CssBaseline } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import '../styling.css'; 
const LoginRegisterPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const handleChangeForm = () => {
    setIsLoginForm((prev) => !prev);
  };

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');

    if (email && role==='EMPLOYEE'){
      navigate('/employeehomepage');
    }else if(email && role==='MANAGER'){
      navigate('/managerhomepage');
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: isLoginForm
          ? 'linear-gradient(to right, #4A148C, #D1C4E9)' // Gradient when LoginForm is active
          : 'linear-gradient(to left, #4A148C, #D1C4E9)', // Gradient when RegisterForm is active
      }}
    >
      <CssBaseline />
      <Container maxWidth="md">
        <Paper
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '105%', 
          }}
        >
          <Typography variant="h5" gutterBottom>
            {isLoginForm ? 'Login' : 'Register'}
          </Typography>
          <Grid container spacing={4}>
            {isLoginForm ? (
              <>
                <Grid item xs={12} md={6}>
                  <LoginForm handleChangeForm={handleChangeForm} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="https://api.eremedia.com/wp-content/uploads/2016/09/happy-face-workers.jpg"
                    alt="Illustration"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={6}>
                  <img
                    src="https://static.thenounproject.com/png/882184-200.png"
                    alt="Illustration"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RegisterForm handleChangeForm={handleChangeForm} />
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginRegisterPage;