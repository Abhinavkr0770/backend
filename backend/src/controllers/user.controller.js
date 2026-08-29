import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [
                { username: username.toLowerCase() },
                { email: email.toLowerCase() }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username or email already exists"
            });
        }

        // Create new user
        // Password will automatically be hashed in user.model.js
        const user = await User.create({
            username,
            email,
            password,
            loggedIn: false
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find the user using email
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        // Update login status
        user.loggedIn = true;
        await user.save();

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        // Find the user using email
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        // Update login status
        user.loggedIn = false;
        await user.save();

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


export { registerUser, loginUser, logoutUser };