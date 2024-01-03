import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import axios from 'axios';
import { authenticate } from '../helper/user';
require('dotenv').config();

function decodeJwtResponse(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
        return "%" + (
            "00" + c.charCodeAt(0).toString(16)
        ).slice(-2);
    }).join(""));

    return JSON.parse(jsonPayload);
}



const GoogleSignInButton = () => {
  

  return (
    <GoogleOAuthProvider  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <GoogleLogin
        buttonText=""
        onSuccess={ async credentialResponse => {
                    //  console.log(credentialResponse);
                    // var {user,token}=isAuthenticated();
                    const responsePayload = decodeJwtResponse(credentialResponse.credential);
                    const email = responsePayload.email;
                    //console.log(email);
                    
                        try {
                          const response = await axios.post('https://todo-backend-nkpr.onrender.com/auth/google', { token: credentialResponse.credential });
                          authenticate(response.data, () => {
                            console.log("yes i have set the key value pair");
                            window.location.reload();
                          });
                          alert('Login successful');
                        } catch (error) {
                          console.log(error);
                        }
                   
                   
                  }
                }
                onError={
                  () => {
                    console.log('Login Failed');
                  }}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Sign in with Google"
              style={{ width: '32px', height: '32px' }}
            />
          </button>
        )}
      />
        </GoogleOAuthProvider>

    
  );
};

export default GoogleSignInButton;
