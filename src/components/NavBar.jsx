export default function Navbar() {
  return (
    <nav>
        <ul>     
            <li>
                <a href="index.html" aria-label="Home">
                    <span className="material-icons" aria-hidden="true">home</span>
                </a>
            </li>
            <li>
                <a href="staff.html">Staff View</a>
            </li>
            <li>
                <a href="menu.html">Create A Menu</a>
            </li>
            <li> <a href="staffview.html">Feedback & Approval </a>
            </li>
        </ul>         
    </nav>
  );
}