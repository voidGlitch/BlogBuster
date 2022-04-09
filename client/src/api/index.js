import axios from "axios";

const url = "http://localhost:5000/posts";

//Simply return all the posts in the database
export const fetchPosts = () => axios.get(url);

export const createPosts = (NewData) => axios.post(url, NewData);

//As we are recieving id and the updated post data and updates are required by api
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
