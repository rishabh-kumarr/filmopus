import { CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Post from "./Post/Post";
import NoPosts from "./Post/NoPosts";
import { getPosts } from "../../actions/posts";

import "./Posts.css";

// eslint-disable-next-line react/prop-types
const Posts = ({ setCurrentId }) => {
    // useSelector has a callback function with access to global store(state) as parameter that can return state.posts (reducers/index.js)
    const { posts, isLoading } = useSelector((state) => state.posts);
    const [localPage, setLocalPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts(localPage));
    }, [dispatch, localPage]);

    if (!posts.length && !isLoading) return <NoPosts />;

    return isLoading ? (
        <CircularProgress />
    ) : (
        // <div className="posts">
        <Grid container alignItems="stretch" spacing={3}>
            {/* Looping over all the posts */}
            {posts.map((post) => (
                <Grid item key={post._id} xs={12} sm={6}>
                    <Post
                        post={post}
                        setCurrentId={setCurrentId}
                        currentPage={localPage}
                        setCurrentPage={setLocalPage}
                        totalPosts={posts.length}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
