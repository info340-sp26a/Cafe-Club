import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" aria-label="Home">
            <span className="material-icons" aria-hidden="true">home</span>
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
      </ul>
    </nav>
  );
}