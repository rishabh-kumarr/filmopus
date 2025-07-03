import { useEffect, useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { getPosts } from "../actions/posts";

// eslint-disable-next-line react/prop-types
const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [dispatch, page]);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamically determine sibling count
  let siblingCount = 2;
  if (windowWidth < 500) siblingCount = 0;
  else if (windowWidth < 768) siblingCount = 1;

  return (
    <div className="paginationWrapper">
      <Pagination
        className="customPagination"
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        siblingCount={siblingCount}
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
