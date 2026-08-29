 import { Post } from "../models/post.model.js";


// =========================
// CREATE POST
// =========================
const createPost = async (req, res) => {

    try {

        // Get data sent by the user in req.body
        const {
            name,
            description,
            age,
            skills,
            educationQualification
        } = req.body;


        // Check if all required fields are provided
        if (
            !name ||
            !description ||
            !age ||
            !skills ||
            !educationQualification
        ) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }


        // Create a new post using the data received
        const post = new Post({
            name,
            description,
            age,
            skills,
            educationQualification
        });


        // Save the post in MongoDB
        await post.save();


        // Send successful response
        return res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {

        // Show error in terminal
        console.error("Error creating post:", error);


        // Send error response to user
        return res.status(500).json({
            message: "Internal server error"
        });

    }

};


// =========================
// GET ALL POSTS
// =========================
const getPosts = async (req, res) => {

    try {

        // Find all posts from MongoDB
        const posts = await Post.find();


        // Send all posts as response
        return res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });

    } catch (error) {

        // Show error in terminal
        console.error("Error fetching posts:", error);


        // Send error response
        return res.status(500).json({
            message: "Internal server error"
        });

    }

};


// =========================
// GET SINGLE POST BY ID
// =========================
const getPostById = async (req, res) => {

    try {

        // Get the post ID from the URL
        // Example: /api/posts/123
        const { id } = req.params;


        // Find the post using its ID
        const post = await Post.findById(id);


        // Check if the post exists
        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }


        // Send the post as response
        return res.status(200).json({
            message: "Post fetched successfully",
            post
        });

    } catch (error) {

        // Show error in terminal
        console.error("Error fetching post:", error);


        // Send error response
        return res.status(500).json({
            message: "Internal server error"
        });

    }

};

// =========================
// UPDATE POST
// =========================
const updatePost = async (req, res) => {

    try {

        // Check if user sent any data for updating
        if (Object.keys(req.body).length === 0) {

            return res.status(400).json({
                message: "No data provided for update"
            });

        }


        // Find the post using the ID from the URL
        // Update it using the data received in req.body
        const post = await Post.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                // Return the updated post instead of the old post
                new: true,

                // Check validation rules from the Post schema
                runValidators: true
            }

        );


        // Check if the post exists
        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }


        // Send successful response
        return res.status(200).json({
            message: "Post updated successfully",
            post
        });


    } catch (error) {

        // Show error in terminal
        console.error("Error updating post:", error);


        // Send error response
        return res.status(500).json({
            message: "Internal server error"
        });

    }

};


// =========================
// DELETE POST
// =========================
const deletePost = async (req, res) => {

    try {

        // Get post ID from the URL
        const { id } = req.params;


        // Find the post first to check whether it exists
        const post = await Post.findById(id);


        // If post doesn't exist, send error
        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }


        // Delete the post using its ID
        await Post.findByIdAndDelete(id);


        // Send successful response
        return res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {

        // Show error in terminal
        console.error("Error deleting post:", error);


        // Send error response
        return res.status(500).json({
            message: "Internal server error"
        });

    }

};


// Export all controller functions
export {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
};