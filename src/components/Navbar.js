import React, { useState } from "react";
import { isAuthenticated } from "../helper/user";
import GoogleSignInButton from "./LoginButton";
import "./navbar.css";
import { NavLink } from "react-router-dom";
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
      <NavLink to="/">
        <div className="title1">Task List 📝</div>
      </NavLink>
      <div className="user-login">
        {isAuthenticated() ? (
          <div className="user-info">
            <div className="dropdown">
              <div className="dropdown-header" onClick={toggleDropdown}>
                <span style={{ fontSize: "1.5rem" }}>🐼</span>
                <span style={{ margin: "0 10px" ,fontSize:"1rem" }}>{user.name}</span>
              </div>
              <div className={`dropdown-body ${dropdownOpen && "open"}`}>
                <div className="dropdown-item">
                  <span className={`dropdown-item-dot`}>• </span>

                  <NavLink style={{fontStyle:"none"}} to="/bills">Bills</NavLink>
                </div>
                <div className="dropdown-item">
                  <span className={`dropdown-item-dot`}>• </span>

                  <NavLink style={{fontStyle:"none"}} to="/usage">Usage</NavLink>
                </div>
                <div className="dropdown-item">
                  <span className={`dropdown-item-dot`}>• </span>

                  <button style={{backgroundColor:"red"}} onClick={signout}>Sign out</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <GoogleSignInButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
