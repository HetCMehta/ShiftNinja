import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const EmployeeHomePage = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(sessionStorage.getItem("email"));
  },[]);
  return (
    <div>
      <h1>Employee Home Page</h1>
      <h2>Email: {email}</h2>
    </div>
  );
};
  
export default EmployeeHomePage;