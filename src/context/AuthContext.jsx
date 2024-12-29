import { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token when the app loads
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if(token) {
      const { exp } = jwtDecode(token);
      if(Date.now() >= exp * 1000) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('idu');
        setIsAuthenticated(false);
        console.log('expira')
      } else {
        setIsAuthenticated(true);
        console.log('no expira')

        // Set a timeout to automatically redirect when the token expires
        const currentTime = Date.now() / 1000;
        const timeout = (exp - currentTime) * 1000;
        const timer = setTimeout(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('idu');
          setIsAuthenticated(false);
        }, timeout);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
      }
    } else {
      setIsAuthenticated(false);
      console.log('expira token')
    }
    //setIsAuthenticated(!!token);
  }, []);

  const login = (token, idu) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('idu', idu);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);