import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

// Dispatching a action
import { useDispatch } from "react-redux";

// Navigation
import { useNavigate } from "react-router-dom";

import { signup, signin } from "../../actions/auth";

import { AiFillLock } from "react-icons/ai";
import { Grid } from "@mui/material";

import Icon from "./Icon";
import loginScreen from "../../assets/loginScreen.png";

import "./User.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const errinp = {
  password: "",
  confirmPassword: "",
};

const err = {
  password: "",
  confirmPassword: "",
};

const User = () => {
  // To switch the form to Sign In or Sign up
  const [isSignUp, setIsSignUp] = useState(false);
  // In case user wants to see his password
  const [showPassword, setShowPassword] = useState(false);
  // provides access to all fields
  const [formData, setFormData] = useState(initialState);

  // passwords don't match
  const [inp, setInp] = useState(errinp);
  const [errorpass, setErrorPass] = useState(err);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle the state of visibility type of password - text/password
  // Get previous state
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchForm = () => {
    setFormData(initialState);
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  // How to populate all the fields of the form
  const handleChange = (event) => {
    // get the form data and populate the form data by name tag from each field - name tag should match with initialState
    setFormData({ ...formData, [event.target.name]: event.target.value });

    // error
    const { name, value } = event.target;
    setInp((prev) => ({
      ...prev,
      [name]: value,
    }));

    matchPassword(event);
  };

  // match passwords
  const matchPassword = (event) => {
    let { name, value } = event.target;
    setErrorPass((prev) => {
      const errmsg = { ...prev, [name]: "" };
      switch (name) {
        case "password":
          if (!value) {
            errmsg[name] = "Please enter password!";
          } else if (inp.confirmPassword && value !== inp.confirmPassword) {
            errmsg["confirmPassword"] = "Passwords don't match!";
          } else {
            errmsg["confirmPassword"] = inp.confirmPassword
              ? ""
              : errorpass.confirmPassword;
          }
          break;
        case "confirmPassword":
          if (!value) {
            errmsg[name] = "Please confirm your Password!";
          } else if (inp.password && value !== inp.password) {
            errmsg[name] = "Passwords don't match!";
          }
          break;
        default:
          break;
      }
      return errmsg;
    });
  };

  // What to do after user logs in - Check if we have access to all fields - formData
  const handleSubmit = (event) => {
    // Prevent the browser from automatically refreshing after submitting a form
    event.preventDefault();

    // What to do on handleSubmit - Either Sign In or Sign Up
    if (isSignUp) {
      // Sign Up the user - Dispatch an action - signup action
      // formData for database, navigate to navigate after
      dispatch(signup(formData))
        .then(() => {
          toast.success("Account created!");
          navigate("/"); // Navigate only after success
        })
        .catch(() => toast.error("Signup failed! Try again."));
    } else {
      dispatch(signin(formData))
        .then(() => {
          toast.success("Welcome back!");
          navigate("/"); // Navigate only after success
        })
        .catch(() => toast.error("Invalid email or password"));
    }
  };

  return (
    <div className="loginpage">
      <div className="bg">
        <img src={loginScreen} alt="Please Log In" className="bgimg" />
      </div>
      <div className={`login content ${!isSignUp ? "isSignIn" : ""}`}>
        <div className="lock">
          <AiFillLock size={20} />
        </div>

        <h1 className="protitle">
          {/* Sign In or Sign Up according to requirement */}
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>

        <div className="demo">
          <h4>
            <strong>Demo Account</strong>
          </h4>
          <h6>Email: fincher@gmail.com</h6>
          <h6>Password: se7en</h6>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
          <Grid className="container">
            {/* All Inputs - New Component */}
            {isSignUp && (
              <div className="name-row">
                <div className="input">
                  <div className="text">
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      autoFocus
                      className="input-group"
                      id="firstName"
                      required
                    />
                    <label htmlFor="firstName">First Name</label>
                  </div>
                </div>

                <div className="input">
                  <div className="text">
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      className="input-group"
                      id="lastName"
                      required
                    />
                    <label htmlFor="lastName">Last Name</label>
                  </div>
                </div>
              </div>
            )}
            <div className="input my-3">
              <div className="text">
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  autoFocus
                  onChange={handleChange}
                  className="input-group"
                  id="email"
                  required
                />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
            {/* What if user wants to see his password - Change type accordingly */}

            <div className="input my-3">
              <div className="text">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  className="input-group"
                  id="password"
                  value={inp.password}
                  required
                  onBlur={matchPassword}
                />
                <label htmlFor="password">Password</label>
                <div className="icon">
                  <Icon
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                  />
                </div>
              </div>
            </div>
            {isSignUp && (
              <>
                <div className="input my-3">
                  <div className="text">
                    <input
                      name="confirmPassword"
                      value={inp.confirmPassword}
                      type={showPassword ? "text" : "password"}
                      placeholder=" Confirm Password"
                      onChange={handleChange}
                      className="input-group"
                      id="confirmPassword"
                      required
                      onBlur={matchPassword}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="icon">
                      <Icon
                        type={showPassword ? "text" : "password"}
                        handleShowPassword={handleShowPassword}
                      />
                    </div>
                  </div>
                </div>
                {errorpass.confirmPassword && (
                  <p className="error">{errorpass.confirmPassword}</p>
                )}
              </>
            )}
          </Grid>

          <button
            type="submit"
            className="btn submit"
            disabled={errorpass.confirmPassword}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          {/* A Button to switch from Sign In to Sign Up */}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <button onClick={switchForm} className="switch new" type="button">
                {isSignUp
                  ? "Already a user ? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default User;
