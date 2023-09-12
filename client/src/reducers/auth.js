import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            //    What happens when the action type is AUTH - Save it in localStorage
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action?.data })
            );
            return {
                ...state,
                authData: action.data,
                loading: false,
                errors: null,
            };
        case LOGOUT:
            // Clear the user from localStorage
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};

export default authReducer;
