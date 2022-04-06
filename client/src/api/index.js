import axios from "axios";

const url = "http://localhost:5000/posts";

//Simply return all the posts in the database
export const fetchPosts = () => axios.get(url);

export const createPosts = (NewData) => axios.post(url, NewData);
