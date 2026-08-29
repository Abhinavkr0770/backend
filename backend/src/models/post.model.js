import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
            minlength: 40
        },

        age: {
            type: Number,
            required: true,
            min: 1
        },

        skills: {
            type: [String],
            required: true
            
        },

        educationQualification: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Post = mongoose.model("Post", postSchema);