/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Get the actions that needs to be dispatched
import { getPostsBySearch } from "../../actions/posts";

// Dispatch actions to the app
import { useDispatch } from "react-redux";

// Search by Tags
import { MuiChipsInput } from "mui-chips-input";

const SearchForm = ({ tags, setTags }) => {
  const [search, setSearch] = useState("");
  // const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      searchPost();
    }
  };

  const addTag = (tag) => setTags([...tags, tag]);

  const removeTag = (tagtoDelete) =>
    setTags(tags.filter((tag) => tag !== tagtoDelete));

  return (
    <div className="paper searchapp">
      <div className="text">
        <input
          name="search"
          className="input"
          type="search"
          placeholder="Search FilmOpus"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          id="search"
          onKeyDown={handleKeyPress}
        />
        <label htmlFor="search">Search FilmOpus</label>
      </div>
      <MuiChipsInput
        style={{
          borderRadius: "10px",
        }}
        value={tags}
        onAddChip={(tag) => addTag(tag)}
        onDeleteChip={(tag) => removeTag(tag)}
        label="Search Tags (Press Enter to add)"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ebff33",
            },
            "&:hover fieldset": {
              borderColor: "#ebff33",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ebff33",
            },
          },
          "& label": {
            color: "#0f0f0f", // base label color
            backgroundColor: "transparent",
            padding: "0 4px",
          },
          "& label.Mui-focused": {
            backgroundColor: "#ebff33",
            color: "#0f0f0f",
          },
          "& label.MuiInputLabel-shrink": {
            backgroundColor: "#ebff33",
            color: "#0f0f0f",
          },
        }}
      />
      <button className="btn" onClick={searchPost}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
