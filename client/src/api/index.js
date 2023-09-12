// Make api calls

import axios from "axios";

// URL that points to our backend route

const API = axios.create({
    baseURL: "https://filmopus-api.vercel.app/",
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }

    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);

// Get the posts from backend to the frontend - Display them
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsByCreator = (name) =>
    API.get(`/posts/creator?name=${name}`);

export const fetchPostsBySearch = (searchQuery) =>
    API.get(
        `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
            searchQuery.tags
        }`
    );
// Handle the POST request of creating a post - where to create and what to create
export const createPost = (newPost) => API.post("/posts", newPost);

// Handle the PATCH request for Update/Edit - Which post and the updated data
export const updatePost = (id, updatedPost) =>
    API.patch(`/posts/${id}`, updatedPost);

// Get the DELETE logic from backend
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Get the LIKE logic from backend
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// routes for signin
export const signIn = (formData) => API.post("/user/signin", formData);

// routes for signup
export const signUp = (formData) => API.post("/user/signup", formData);
