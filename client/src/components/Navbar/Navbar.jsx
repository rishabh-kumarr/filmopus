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

    const [color, setColor] = useState(false);

    // User - retrieve the user from localStorage
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );

    // Logout
    const logout = () => {
        // Dispatch an action
        dispatch({ type: LOGOUT });

        // Redirect to main route
        navigate("/");
        setUser(null);
        window.location.reload();
    };
    // To not refresh in order to get user details after log in - As soon as URL changes(location)
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
        window.addEventListener("scroll", changeColor);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    };

    return (
        <div className={color ? "header header-bg" : "header"}>
            <Link to="/">
                <h1 className="protitle">FilmOpus.</h1>
            </Link>

            <div className="header-right">
                {user?.result ? (
                    <>
                        <h3 className="mobilename">{user?.result.name}</h3>
                        <div className="profile">
                            <div className="dropdown-menu"></div>
                            <BiSolidUserCircle size={30} className="pic" />
                            <h3 className="name hide">{user?.result.name}</h3>
                            <button className="auth" onClick={logout}>
                                Log Out
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="nav">
                        <Link to="/signin">
                            <button className="btn" type="button">
                                Sign In
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
