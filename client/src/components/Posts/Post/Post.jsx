/* eslint-disable react/prop-types */
import { useState } from "react";
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

import { deletePost, likePost } from "../../../actions/posts";

import "../Posts.css";
// import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [likes, setLikes] = useState(post?.likes);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const userId = user?.result?._id;
    const hasLiked = post?.likes?.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLiked) {
            setLikes(post?.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
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

    return (
        <div className="cardpost">
            <img
                src={post.selectedFile}
                alt={post.title}
                title={post.title}
                style={{ backgroundImage: `url(${post.selectedFile})` }}
                className="selectedFile"
            />
            <div className="infocard">
                <h2 className="cardOwner">{post.name}</h2>
                <p className="timeago">{moment(post.createdAt).fromNow()}</p>
            </div>
            {/* Used for Updating post */}
            {user?.result?._id === post?.creator && (
                <div className="edit">
                    <button
                        className="editbtn"
                        onClick={(event) => {
                            event.stopPropagation();
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
                {post.description.split(" ").splice(0, 90).join(" ")}...
            </p>
            <div className="cardActions">
                <button
                    className="smallbtn"
                    onClick={handleLike}
                    disabled={!user?.result}
                >
                    <Likes />
                </button>
                {user?.result?._id === post?.creator && (
                    <button
                        className="actionbtn"
                        onClick={() => dispatch(deletePost(post._id))}
                    >
                        <AiOutlineDelete size={25} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Post;
