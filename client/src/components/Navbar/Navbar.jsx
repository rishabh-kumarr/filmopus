/* eslint-disable no-undef */
import { useState, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Get the actionType LOGOUT
import { LOGOUT } from "../../constants/actionTypes";

import { BiSolidUserCircle } from "react-icons/bi";

import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // User - retrieve the user from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className={scrolled ? "header header-bg" : "header"}>
      <Link to="/">
        <h1>FilmOpus.</h1>
      </Link>

      <div className="header-right">
        {username ? (
          <>
            <h3 className="mobilename">{username}</h3>
            <div className="profile">
              <div className="dropdown-menu"></div>
              <BiSolidUserCircle size={30} className="pic" />
              <h3 className="name hide">{username}</h3>
              <button className="auth" onClick={logout}>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className="nav">
            {/* <Link to="/signin"> */}
              <button
                className="btn"
                type="button"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            {/* </Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
