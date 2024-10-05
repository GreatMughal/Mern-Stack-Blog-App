import mongoose from "mongoose";
import colors from "colors"

// Connect to MongoDB

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/blogapp`)
        console.log("MongoDB Connected...".bgMagenta.white);
    } catch (error) {
        console.log(`Error Occure In Connecting DB: ${error.message}`.bgRed.white);

    }
}

export default connectDB;