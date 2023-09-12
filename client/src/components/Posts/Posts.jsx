import Post from "./Post/Post";
import NoPosts from "./Post/NoPosts";

// Fetch posts from global redux store using selector
import { useSelector } from "react-redux";

import "./Posts.css";
import { CircularProgress, Grid } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Posts = ({ setCurrentId }) => {
    // useSelector has a callback function with access to global store(state) as parameter that can return state.posts (reducers/index.js)
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading) return <NoPosts />;

    return isLoading ? (
        <CircularProgress />
    ) : (
        // <div className="posts">
        <Grid container alignItems="stretch" spacing={3}>
            {/* Looping over all the posts */}
            {posts.map((post) => (
                // <div key={post._id} className="post">
                <Grid item key={post._id} xs={12} sm={6}>
                    {/* Send post one by one */}
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
