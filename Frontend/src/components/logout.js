import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('role');
        navigate('/');
    };

    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default Logout;