import { Pagination, PaginationItem, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { getPosts } from "../actions/posts";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  return (
    <div className="paginationWrapper">
      <Pagination
        className="customPagination"
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        siblingCount={isSmallScreen ? 0 : 1}
        boundaryCount={1}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
            className="custom-pagination-item"
          />
        )}
      />
    </div>
  );
};

export default Paginate;
