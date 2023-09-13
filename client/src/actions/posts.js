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
        await dispatch({ type: START_LOADING });
        // Fetch all the data from the api (destructured response(data) - [all the posts] from api)
        const {
            data: { data, currentPage, numberOfPages },
        } = await api.fetchPosts(page);
        await dispatch({
            type: FETCH_ALL,
            payload: { data, currentPage, numberOfPages },
        });
        await dispatch({ type: END_LOADING });
        // Next step - Fetch posts from global state - Go to Posts/Posts.js
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

// Redux thunk is used here(Action creator)
export const getPost = (id) => async (dispatch) => {
    try {
        await dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id);

        await dispatch({ type: FETCH_POST, payload: { post: data } });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

export const getPostsByCreator = (name) => async (dispatch) => {
    try {
        await dispatch({ type: START_LOADING });
        const {
            data: { data },
        } = await api.fetchPostsByCreator(name);

        await dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
        await dispatch({ type: END_LOADING });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        await dispatch({ type: START_LOADING });
        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery);

        await dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        await dispatch({ type: END_LOADING });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

// CREATE action for creating post
export const createPost = (post, navigate) => async (dispatch) => {
    try {
        await dispatch({ type: START_LOADING });
        // Fetch the data
        const { data } = await api.createPost(post);
        await dispatch({ type: CREATE, payload: data });
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
        await dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

// DELETE action
export const deletePost = (id) => async (dispatch) => {
    try {
        // API request for deleting post - [response or (data)] is not reuired
        await await api.deletePost(id);
        await dispatch({ type: DELETE, payload: id });
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
        await dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};
