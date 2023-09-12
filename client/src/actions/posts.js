// Import everything from api folder as api. So to fetch x from api it has to be mentioned as api.x
import * as api from "../api";
import {
    START_LOADING,
    END_LOADING,
    FETCH_BY_SEARCH,
    FETCH_BY_CREATOR,
    FETCH_ALL,
    FETCH_POST,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
} from "../constants/actionTypes";

// Create Actions - Action creators (Functions that return actions) - action must have type and payload (data regarding all posts - asynchronous data)
// Need to use redux thunk(allows us extra arrow function and action needs to be dispatched now)
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // Fetch all the data from the api (destructured response(data) - [all the posts] from api)
        const {
            data: { data, currentPage, numberOfPages },
        } = await api.fetchPosts(page);
        dispatch({
            type: FETCH_ALL,
            payload: { data, currentPage, numberOfPages },
        });
        dispatch({ type: END_LOADING });
        // Next step - Fetch posts from global state - Go to Posts/Posts.js
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

// Redux thunk is used here(Action creator)
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: { post: data } });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

export const getPostsByCreator = (name) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {
            data: { data },
        } = await api.fetchPostsByCreator(name);

        dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

// CREATE action for creating post
export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // Fetch the data
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
        // Next step - Dispatch action(useDispatch) - Go to Form/Form.js
        // navigate(`/posts/${data._id}`);
        navigate(`/posts`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

// UPDATE action for editing post
export const updatePost = (id, post) => async (dispatch) => {
    try {
        // API request for updating the post - returns updated post - Get the data of updated post
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

// DELETE action
export const deletePost = (id) => async (dispatch) => {
    try {
        // API request for deleting post - [response or (data)] is not reuired
        await await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

// LIKE action
export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("profile"));

    try {
        // API request for the particular post that needs updation in likes - Get data of updated post
        const { data } = await api.likePost(id, user?.token);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};
