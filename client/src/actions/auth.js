// Import everything from api folder as api. So to fetch x from api it has to be mentioned as api.x
import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

// action is asynchronous - redux thunk
export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData); // brings formdata from dispatch of SignIn.js
        dispatch({ type: AUTH, data });

        // After log in the user - push him to homepage
        navigate("/");
    } catch (error) {
        console.error(`Error: ${error}`);
        alert("Invalid Credentials!");
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData); // brings formdata from dispatch of SignIn.js

        dispatch({ type: AUTH, data });

        // After signing up the user - push him to sign in page
        navigate("/");
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};
