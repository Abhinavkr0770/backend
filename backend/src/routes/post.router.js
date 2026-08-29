import { Router } from "express";

import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from "../controllers/post.controller.js";

const router = Router();


// Create a new post
router.route("/create").post(createPost);


// Get all posts
router.route("/getPosts").get(getPosts);


// Get a single post using its ID
router.route("/getPostById/:id").get(getPostById);


// Update a post using its ID
router.route("/updatePost/:id").patch(updatePost);


// Delete a post using its ID
router.route("/deletePost/:id").delete(deletePost);


export default router;