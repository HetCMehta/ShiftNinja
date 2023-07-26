import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Logout from "../components/logout";

const ManagerHomePage = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    setEmail(sessionStorage.getItem("email"));
    setRole(sessionStorage.getItem("role"));
  },[]);

    return(
      <div>
      <h1>Manager Home Page</h1>
      <h2>Email: {email}</h2>
      <h2>Role: {role}</h2>
      <Logout />
    </div>
    );
  };
  
  export default ManagerHomePage;