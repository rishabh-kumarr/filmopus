import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getPostsByCreator, getPostsBySearch } from "../../actions/posts";

import { CircularProgress, Grid, Typography, Divider } from "@mui/material";

import NoPosts from "../Posts/Post/NoPosts";
import Post from "../Posts/Post/Post";

const SearchResult = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const { posts, isLoading } = useSelector((state) => state.posts);

    useEffect(() => {
        if (location.pathname.startsWith("/tags")) {
            dispatch(getPostsBySearch({ tags: name }));
        } else {
            dispatch(getPostsByCreator(name));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!posts.length && !isLoading) return <NoPosts />;

    return (
        <div className="paper search-result-container">
            <Typography variant="h5" component="h2" gutterBottom>
                Showing results for: <strong>{name}</strong>
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />
        
            {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                    <CircularProgress />
                </div>
            ) : (
                <Grid container spacing={3}>
                    {posts.map((post) => (
                        // <div key={post._id}>
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default SearchResult;
