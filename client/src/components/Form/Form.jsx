import { useState, useEffect } from "react";

import FileBase64 from "react-file-base64";

// Dispatch action - creating Post
// Fetch posts from global redux store using selector
import { useSelector, useDispatch } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";

import "./Form.css";
import { MuiChipsInput } from "mui-chips-input";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Form = ({ currentId, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        title: "",
        description: "",
        tags: [],
        selectedFile: "",
    });

    // Fetch the 1 updated post
    const post = useSelector((state) =>
        currentId
            ? state.posts.posts.find((postt) => postt._id === currentId)
            : null
    );

    // Run this whenever post value changes
    useEffect(() => {
        if (!post?.title) clear();
        // If post exists
        if (post) setPostData(post);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // To not get refresh event in browser

        if (currentId == 0) {
            // We need to dispatch creation action
            dispatch(
                createPost(
                    {
                        ...postData,
                        name: user?.result?.name,
                    },
                    navigate
                )
            );
            // To clear the form after submit is clicked
            clear();
        } else {
            // What to do if the currentId is not null - dispatch updatePost
            dispatch(
                updatePost(currentId, {
                    ...postData,
                    name: user?.result?.name,
                })
            );
            // To clear the form after submit is clicked
            clear();
        }
    };

    const clear = () => {
        setCurrentId(0);
        setPostData({
            title: "",
            description: "",
            tags: [],
            selectedFile: "",
        });
    };

    const addTags = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
    };

    const removeTags = (tagToDelete) => {
        setPostData({
            ...postData,
            tags: postData.tags.filter((tag) => tag !== tagToDelete),
        });
    };

    if (!user?.result?.name) {
        return (
            <div className="paper inf">
                <h4>Please Sign In to create your favorite cinema memories.</h4>
            </div>
        );
    }

    return (
        <div className="paper">
            <form
                autoComplete="off"
                noValidate
                id="formContent"
                onSubmit={handleSubmit}
            >
                <h3>
                    {currentId
                        ? `Editing ${post?.title}`
                        : "Add a favorite movie!"}
                </h3>
                <div className="input my-3">
                    <div className="text">
                        <input
                            name="title"
                            placeholder="Title"
                            value={postData.title}
                            autoFocus
                            onChange={(event) =>
                                setPostData({
                                    ...postData,
                                    title: event.target.value,
                                })
                            }
                            className="input my-3-group"
                            id="title"
                            required
                        />
                        <label htmlFor="title">Title</label>
                    </div>
                </div>
                <div className="input my-3">
                    <div className="text">
                        <input
                            name="description"
                            placeholder="Description"
                            value={postData.description}
                            onChange={(event) =>
                                setPostData({
                                    ...postData,
                                    description: event.target.value,
                                })
                            }
                            className="input my-3-group"
                            id="description"
                            required
                        />
                        <label htmlFor="description">Description</label>
                    </div>
                </div>
                <div className="input my-3">
                    <MuiChipsInput
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        required
                        value={postData.tags}
                        onAddChip={(tag) => addTags(tag)}
                        onDeleteChip={(tag) => removeTags(tag)}
                    />
                </div>
                <div>
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setPostData({
                                ...postData,
                                selectedFile: base64,
                            })
                        }
                    />
                </div>
                <button className="btn buttonSubmit" type="submit">
                    Submit
                </button>
                <button
                    className="btn-light clear"
                    onClick={clear}
                    type="button"
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export default Form;
