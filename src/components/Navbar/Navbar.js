import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import LogoutContext from "../../contexts/LogoutContext";
import "./Navbar.css";

const Navbar = () => {
  const user = useContext(UserContext);
  const handleLogout = useContext(LogoutContext);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="user-info">
        <h3>
          Welcome,
          <br /> {user.first_name}
        </h3>
        <NavLink exact to="/profile" className="nav-link">
          Profile
        </NavLink>
      </div>
      <div className="nav-links">
        <NavLink exact to="/" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink exact to="/my-projects" className="nav-link">
          My Projects
        </NavLink>
        <NavLink exact to="/my-tickets" className="nav-link">
          My Tickets
        </NavLink>
        {user.is_superuser ? (
          <NavLink exact to="/users" className="nav-link">
            Manage Users
          </NavLink>
        ) : null}
      </div>
      <div className="nav-links">
        <Link to="/login" className="nav-link" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
