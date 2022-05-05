import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

//Fuction happen on each one of our request
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  //So that we can make all the request below
  return req;
});

//Simply return all the posts in the database
export const fetchPosts = () => API.get("/posts");

export const createPosts = (NewData) => API.post("/posts", NewData);

//As we are recieving id and the updated post data and updates are required by api
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
