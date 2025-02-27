import { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
//Creates the context
const AuthContext = createContext();

function AuthWrapper(props) {

 const [loading, setLoading] = useState(true);
 const [loggedIn, setLoggedIn] = useState(false);
 const [user, setUser] = useState(null);

 const navigate = useNavigate();


  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = () => {

    const storedToken =  localStorage.getItem('authToken')

    if(storeToken) {
     axios.get(`${process.env.REACT_APP_API_URL}/api/auth/verify`, {
        headers: {
            Authorization: `Bearer ${storedToken}`
        }
     })
     .then((response) => {
        setLoading(false);
        setLoggedIn (true);
        setUser(response.data);
     })
     .catch ((err) => {
        setLoading(false);
        setLoggedIn(false);
        setUser(null);
     })
    } else {
        setLoading(false);
        setLoggedIn(false);
        setUser(null);
    }
  };

  const logout = () => {
   localStorage.removeItem('authToken');
   authenticateUser();
   navigate("/");
  }


  useEffect(() => {
    authenticateUser();
  }, [])

return (

    <AuthContext.Provider value={{loading, loggedIn, user, storeToken, authenticateUser, logout}}>
      {props.children}
    </AuthContext.Provider>
 )
}

export {AuthContext, AuthWrapper};