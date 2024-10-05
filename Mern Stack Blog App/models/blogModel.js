import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "user id is required"]
    }
}, { timestamps: true })

export default mongoose.model('Blog', blogSchema);