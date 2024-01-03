export const authenticate = (data, next) => {
    console.log(`authenticate ${data}`)
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(data));
      next();
    }
  };
  
  export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        const parsedJwt = JSON.parse(jwt);
        // Additional validation can be added here (e.g., checking token expiration)
        return parsedJwt; // or return true, if you just need a boolean
    } else {
        return false;
    }
};

  export const signout = (next) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      next();
      
    }
  };
  