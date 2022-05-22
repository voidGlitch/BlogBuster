import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const postRoutes = express.Router();

postRoutes.get("/search", getPostsBySearch);
postRoutes.get("/", getPosts);
postRoutes.get("/:id", getPost);
postRoutes.post("/", auth, createPost);
//Patch is for updating things exists in documents
postRoutes.patch("/:id", auth, updatePost);
postRoutes.delete("/:id", auth, deletePost);
postRoutes.patch("/:id/likePost", auth, likePost);

export default postRoutes;
