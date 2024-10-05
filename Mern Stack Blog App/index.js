import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import colors from "colors"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
dotenv.config()
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/blog", blogRoutes)


connectDB().then(() => {
    console.log(`Connected to MongoDB`.blue.bold)
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT}`.bgYellow.bgBlack)
    })
}).catch((error) => {
    console.log(`Error occure in listnoing server: ${error}`.red.bold);

})