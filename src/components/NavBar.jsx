import { Link } from "react-router";
import { getAuth, signOut } from "firebase/auth";

export default function Navbar({ currentUser }) {
  function handleLogOut(){
    const auth = getAuth();

    signOut(auth).catch((err) => {
    });
  }
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" aria-label="Home">
            <img
              className="custom-icon"
              src="/img/home.svg"
              alt="home-icon"
            />
          </Link>
        </li>

        <li>
          <Link to="/menu">Create A Menu</Link>
        </li>

        <li>
          <Link to="/feedback">Feedback & Approval</Link>
        </li>

        <li className="auth-links">
          {!currentUser ? (
            <>

              <Link to="/login" className="login-link">
                Login
              </Link>
            </>
          ) : (
            <button
              className="logout-btn"
              onClick={handleLogOut}
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}