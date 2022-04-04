import axios from "axios";

const url = "https://localhost:5000/posts";

//Simply return all the posts in the database
export const fetchPosts = () => axios.get();
