import {
    START_LOADING,
    END_LOADING,
    FETCH_BY_SEARCH,
    FETCH_BY_CREATOR,
    CREATE,
    DELETE,
    FETCH_ALL,
    FETCH_POST,
    LIKE,
    UPDATE,
} from "../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST:
            return { ...state, post: action.payload.post };
        case FETCH_BY_SEARCH:
        case FETCH_BY_CREATOR:
            return { ...state, posts: action.payload.data };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            // Mapping over posts array to change something and return the changed array
            // action.payload - updated post(data)
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        case DELETE:
            // What to do after deleting - action.payload is id(actions/posts)
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            };
        case LIKE:
            // What to do for liking - Find the particular post - then return post with updated data
            // action.payload represents the updated post
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        default:
            return state;
    }
};
