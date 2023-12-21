import React, { useState } from "react";
import axios from "axios";
import Signup from "./Signup"; // Import the Signup component
import { authenticate ,isAuthenticated} from "../helper/user";

// import { authenticate } from "../helper/user";


function Login({onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false); // State to control the Signup overlay

  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const { user } = isAuthenticated();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const userData = await response.json();
  
        // Assuming 'authenticate' handles storing user data or tokens in local storage
        authenticate(userData, () => {
          setEmail('');
          setPassword('');
        });
        window.location.href = "/";
  
        onClose(); // Close the overlay after successful login
        
        console.log(userData);
      } else {
        // Handle error if the API request fails
        console.error('Login failed:', response.statusText);
        setErrorMessage(
          'An error occurred during the login process. Please try again later.'
        );
  
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(
        'An error occurred during the login process. Please try again later.'
      );
  
      setEmail('');
      setPassword('');
    }
  };
  

  const handleSignupClick = () => {
    // Show the Signup overlay when the "Sign Up" link is clicked
    // onClose()
    setShowSignup(true);
    
  };

  const handleCloseSignup = () => {
    // Close the Signup overlay when called
    setShowSignup(false);
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-header">Login  <button
                  type="button"
                  className="close"
                  onClick={onClose}
                >
                  <span aria-hidden="true">&times;</span></button></div>
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        <form onSubmit={handleLogin} className="login-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <p>
          Don't have an account?{" "}
          <span className="signup-link" onClick={handleSignupClick}>
            <span style={{color:"blue"}}>Sign Up</span>
          </span>
        </p>
        </form>

      </div>
      {showSignup && (
        <Signup
          onSignupSuccess={() => setShowSignup(false)}
          onClose={handleCloseSignup}
        />
      )}{" "}
      {/* Render the Signup overlay when showSignup is true */}
    </div>
  );
}

export default Login;
