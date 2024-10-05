import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "username is required"]
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
}, { timestamps: true })

export default mongoose.model('User', userSchema);