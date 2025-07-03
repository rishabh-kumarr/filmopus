/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  AiOutlineEdit,
  AiOutlineLike,
  AiFillLike,
  AiOutlineDelete,
} from "react-icons/ai";

// To display card info - How long before was the post created
import moment from "moment";

// Dispatch actionn - delete
import { useDispatch } from "react-redux";

import { getPosts, deletePost, likePost } from "../../../actions/posts";

import "../Posts.css";
// import { useNavigate } from "react-router-dom";

const Post = ({
  post,
  setCurrentId,
  currentPage,
  setCurrentPage,
  totalPosts,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?._id;

  const [likes, setLikes] = useState(post.likes);
  //   const hasLiked = post?.likes?.find((like) => like === userId);
  const hasLiked = likes.includes(userId);

  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likePost(post._id)); // still make the backend call

    if (hasLiked) {
      setLikes((prevLikes) => prevLikes.filter((id) => id !== userId));
    } else {
      setLikes((prevLikes) => [...prevLikes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <AiFillLike size={20} /> &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} Like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <AiOutlineLike size={25} /> &nbsp;
          {likes.length}&nbsp;
          {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <AiOutlineLike size={25} />
        &nbsp;Like
      </>
    );
  };

  const handleDelete = async () => {
    await dispatch(deletePost(post._id));

    const isLastItemOnPage = totalPosts === 1;

    if (isLastItemOnPage && currentPage > 1) {
      setCurrentPage(currentPage - 1); // Move to previous page
    } else {
      dispatch(getPosts(currentPage)); // Refresh current page
    }
  };

  useEffect(() => {
    setLikes(post.likes);
  }, [post.likes]);

  return (
    <div className="cardpost">
      <img
        src={post.selectedFile}
        alt={post.title}
        title={post.title}
        className="selectedFile"
        style={{ backgroundImage: `url(${post.selectedFile})` }}
      />
      <div className="infocard">
        <h4 className="cardOwner">{post.name}</h4>
        <p className="timeago">{moment(post.createdAt).fromNow()}</p>
      </div>
      {/* Used for Updating post */}
      {userId === post.creator && (
        <div className="edit">
          <button
            className="editbtn"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
          >
            <AiOutlineEdit size={25} />
          </button>
        </div>
      )}

      <div className="details">
        <p>{post.tags.map((tag) => `#${tag} `)}</p>
      </div>

      <h3 className="cardtitle">{post.title}</h3>

      <p className="cardContent">
        {post.description.split(" ").slice(0, 90).join(" ")}...
      </p>

      <div className="cardActions">
        <button
          className="smallbtn"
          onClick={handleLike}
          disabled={!user?.result}
        >
          <Likes />
        </button>
        {userId === post?.creator && (
          <button className="actionbtn" onClick={handleDelete}>
            <AiOutlineDelete size={25} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
