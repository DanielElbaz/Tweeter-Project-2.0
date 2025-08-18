import { NavLink } from "react-router-dom";
import { useUser } from "../lib/user.jsx";

export default function Navbar() {
  const { userName } = useUser();

  return (
    <nav className="navbar">
      <div className="nav-inner container">
        <div className="brand">🦅 Tweeter 2.0 🇮🇱 </div>
        <div className="links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </div>
        <div className="nav-user">@{userName}</div>
      </div>
    </nav>
  );
}
