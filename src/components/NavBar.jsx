import { Link } from 'react-router';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" aria-label="Home">
            <img className="custom-icon" src="/img/home.svg" aria-hidden="true" alt="home-icon" />
          </Link>
        </li>

        <li>
          <Link to="/staff">Staff View</Link>
        </li>

        <li>
          <Link to="/menu">Create A Menu</Link>
        </li>

        <li>
          <Link to="/feedback">Feedback & Approval</Link>
        </li>

        <li className="auth-links">
        <Link to="/Signup" className="signup-link">Sign Up </Link>
      
       <Link to="/Login" className="login-link">Log In </Link>
        </li>
      </ul>
    </nav>
  );
}