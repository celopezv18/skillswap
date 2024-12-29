import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  
  const logOut = () => {
    localStorage.removeItem('authToken');
    const { logout } = useAuth();
    logout();
  }

  return (
    <>
    <br></br><br></br>
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <i className="bi bi-arrow-left-right me-2"></i>
          SkillSwap
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/matches">
                <i className="bi bi-people me-1"></i> Matches
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/chat">
                <i className="bi bi-chat-dots me-1"></i> Chat
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link text-danger" to="" onClick={logOut}>
                <i className="bi bi-box-arrow-right me-1"></i> Exit
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="navbar-spacer"></div>
  </>
);
}

export default Navbar;