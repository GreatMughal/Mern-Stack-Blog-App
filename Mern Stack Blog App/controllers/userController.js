import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"

// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            length: users.length,
            message: "GET ALL USERS SUCCESSFULLY",
            success: true,
            users,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "ERROR IN GETTING ALL USERS",
            success: false,
        })
    }
}
// register user
export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({
                message: "All fields are required",
                success: false,
            })
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                message: "Email already exists",
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save();
        return res.status(201).send({
            message: "User registered successfully",
            success: true,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "ERROR IN REGISTER",
            success: false,
        })

    }
}
// login user
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: "All fields are required",
                success: false,
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                message: "Invalid credentials",
                success: false,
            })
        }
        return res.status(200).send({
            message: "User logged in successfully",
            success: true,
            user,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "ERROR IN LOGIN",
            success: false,
        })
    }
}