import { Pagination, PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { getPosts } from "../actions/posts";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [dispatch, page]);

    return (
        <Pagination
            className="ul paper paginatearea"
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        />
    );
};

export default Paginate;
