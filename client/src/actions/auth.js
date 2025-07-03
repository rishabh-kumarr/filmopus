// Import everything from api folder as api. So to fetch x from api it has to be mentioned as api.x
import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

// action is asynchronous - redux thunk
export const signin = (formData) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData); // brings formdata from dispatch of SignIn.js
        await dispatch({ type: AUTH, data });

        // After log in the user - push him to homepage
        // setTimeout(() => navigate("/"), 300);
        return Promise.resolve();
    } catch (error) {
        // console.error(`Error: ${error}`);
        return Promise.reject(error);
        // throw new Error("Invalid Credentials!");
    }
};

export const signup = (formData) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData); // brings formdata from dispatch of SignIn.js

        await dispatch({ type: AUTH, data });

        // After signing up the user - push him to sign in page
        // setTimeout(() => navigate("/"), 300);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};
