import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getPostsByCreator, getPostsBySearch } from "../../actions/posts";
import NoPosts from "../Posts/Post/NoPosts";
import { CircularProgress, Grid } from "@mui/material";
import Post from "../Posts/Post/Post";

const SearchResult = () => {
    const { name } = useParams();
    const dispatch = useDispatch();

    const { posts, isLoading } = useSelector((state) => state.posts);
    const location = useLocation();

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
        <div>
            <h2>{name}</h2>
            <hr />
            {isLoading ? (
                <CircularProgress />
            ) : (
                // <div className="paper">
                <Grid
                    className="paper"
                    container
                    alignItems="stretch"
                    spacing={3}
                >
                    {posts?.map((post) => (
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
