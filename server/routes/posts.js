import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
//Patch is for updating things exists in documents
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
