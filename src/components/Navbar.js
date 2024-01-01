import React, { useEffect, useState } from "react";

import { isAuthenticated } from "../helper/user";
import GoogleSignInButton from "./LoginButton";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showSignupOverlay, setShowSignupOverlay] = useState(false);

  const { user } = isAuthenticated();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLoginClick = () => {
    setShowLoginOverlay(true);
    setShowSignupOverlay(false);
  };

  const handleSignupClick = () => {
    setShowSignupOverlay(true);
    setShowLoginOverlay(false);
  };


  const handleCloseOverlay = () => {
    setShowLoginOverlay(false);
    setShowSignupOverlay(false);
  };

  const signout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      // navigate("/");
      window.location.reload();
    }
  };

  return (
    <nav className="navbar">
       <div className="title1">Task List 📝</div>
        <div className="user-login">{
          isAuthenticated()? <button className="login-button" style={{backgroundColor:"red"}} onClick={()=>(signout(() => {
            // console.log("signinout")
            window.location.href = "/";})
          )}>
          Signout
        </button>  :
          <div>
        
          {!showLoginOverlay && !showSignupOverlay && (
             !isAuthenticated() ? (
              <div>
                {" "}
                <GoogleSignInButton />
              </div>
            ) : (
              <button

              className="logoutbut"
                style={{
                  backgroundColor: "red",
                  borderRadius: "10px",
                  padding: "10px",
                  color: "white",
                  fontSize: "1.2rem",
                  height: "40px",
              
                }}
                onClick={signout}
              >
                Log out
              </button>
            )
          )}
          </div>
        }
         
        
      </div>
    </nav>
  );
};

export default Navbar;
