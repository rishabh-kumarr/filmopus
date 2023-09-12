import { useState } from "react";

// which page we are at
import { useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

import Background from "../../assets/filmopus.png";

import "./Home.css";
import { Container, Grid, Grow } from "@mui/material";
import SearchForm from "../Form/SearchForm";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// eslint-disable-next-line react/prop-types
const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const [tags, setTags] = useState([]);

    const query = useQuery(); //pageinfo

    const page = query.get("page") || 1;
    const searchQuery = query.get("searchQuery");

    return (
        <div className="app">
            <div className="bg">
                <img
                    src={Background}
                    alt="Welcome to Filmopus."
                    className="bgimg"
                />
            </div>
            <div className="content">
                <Grow in>
                    <Container maxWidth="xxl">
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="stretch"
                            spacing={3}
                            className="mobile"
                        >
                            <Grid item xs={12} sm={12} md={8}>
                                <Posts setCurrentId={setCurrentId} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <SearchForm tags={tags} setTags={setTags} />
                                <Form
                                    currentId={currentId}
                                    setCurrentId={setCurrentId}
                                />
                                <div className="paginate">
                                    {!searchQuery && !tags.length && (
                                        <Pagination page={page} />
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </div>
        </div>
    );
};

export default Home;
