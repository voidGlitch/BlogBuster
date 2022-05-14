import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const postRoutes = express.Router();

postRoutes.get("/search", getPostsBySearch);
postRoutes.get("/", getPosts);
postRoutes.post("/", auth, createPost);
//Patch is for updating things exists in documents
postRoutes.patch("/:id", auth, updatePost);
postRoutes.delete("/:id", auth, deletePost);
postRoutes.patch("/:id/likePost", auth, likePost);

export default postRoutes;
