import React, { useState } from 'react';
import { isAuthenticated } from '../helper/user';
import GoogleSignInButton from './LoginButton';
import './navbar.css'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = isAuthenticated();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const signout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      window.location.reload();
    }
  };

  return (
    <nav className="navbar">
      <NavLink to="/"><div className="title1">Task List 📝</div></NavLink>
      <div className="user-login">
        {isAuthenticated() ? (
          <div className="user-info">
            <div onClick={toggleDropdown} className="user-icon">
             
              <span style={{fontSize:"1.5rem"}}>🐼</span> 
              <span style={ {margin:"0 10px"}}>{user.name}</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                 <NavLink to="/bills">Bills</NavLink>
                 <NavLink to="/usage">Usage</NavLink>
              
                <button onClick={signout}>Sign out</button>
              </div>
            )}
          </div>
        ) : (
          <GoogleSignInButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
