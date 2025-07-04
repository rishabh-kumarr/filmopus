/* eslint-disable no-undef */
import { useState, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Get the actionType LOGOUT
import { LOGOUT } from "../../constants/actionTypes";

import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // User - retrieve the user from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [scrolled, setScrolled] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  // Logout
  const logout = () => {
    // Dispatch an action
    dispatch({ type: LOGOUT });

    // Redirect to main route
    navigate("/");
    setUser(null);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY >= 100);
  };

  // To not refresh in order to get user details after log in - As soon as URL changes(location)
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const username = user?.result?.name;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={scrolled ? "header header-bg" : "header"}>
      <Link to="/">
        <h1>FilmOpus.</h1>
      </Link>

      <div className="header-right">
        {username ? (
          <>
            <div
              className="profile"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {username && (
                <div className="initials-circle">
                  {username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}

              {/* Dropdown */}
              {showDropdown && (
                <div className="dropdown">
                  <p className="dropdown-username">{username}</p>
                  <button className="dropdown-logout" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="nav">
            <button
              className="auth"
              type="button"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
