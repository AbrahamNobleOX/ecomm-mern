import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

// Create a new context object for authentication state
const AuthContext = createContext();

// Custom component that acts as a wrapper for components needing authentication state
const AuthProvider = ({ children }) => {
  // Declare a state variable 'auth' and a function 'setAuth' to update the state
  const [auth, setAuth] = useState({
    user: null, // Initialize 'user' property as null
    token: "", // Initialize 'token' property as an empty string
  });

  // axios config
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    // Retrieve the authentication data from local storage
    const data = localStorage.getItem("auth");

    // Check if there is data in the local storage
    if (data) {
      // Parse the retrieved data from string to object
      const parsed = JSON.parse(data);

      // Update the authentication state with the parsed data
      // Spread the existing auth object to preserve other properties
      // Modify the user and token properties with values from the parsed object
      setAuth({ ...auth, user: parsed.user, token: parsed.token });
    }
  }, []);

  // Render the AuthProvider component as a Provider for the AuthContext
  // Pass the authentication state 'auth' and the 'setAuth' function as the value
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children} {/* Render the child components */}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication state within child components
const useAuth = () => useContext(AuthContext);

// Export the useAuth hook and the AuthProvider component
export { useAuth, AuthProvider };
