import express from "express";
import { createPostByUser, getPostByUser, getPostsByUser, updatePostByUser, deletePostByUser } from "../controllers/postController"

const router = express.Router();


// CRUD för en resurs posts
router.post("/", createPostByUser);
router.get("/", getPostsByUser);
router.get("/:postId", getPostByUser);
router.put("/:postId", updatePostByUser);
router.delete("/:postId", deletePostByUser);

export default router;


