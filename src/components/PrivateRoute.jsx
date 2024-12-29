import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && !localStorage.getItem('authToken')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;