import blogModel from "../models/blogModel.js"
import userModel from "../models/userModel.js"
import mongoose from "mongoose"

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user")
        if (!blogs) {
            return res.status(404).send({
                message: "No blogs found",
                success: false,
            })
        }
        res.status(200).send({
            countBlogs: blogs.length,
            message: "Blogs retrieved successfully",
            success: true,
            blogs,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "ERROR IN GETTING ALL blogs",
            success: false,
        })
    }
}

export const createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                message: "All fields are required",
                success: false,
            })
        }
        const exisitingUser = await userModel.findById(user);
        //validaton
        if (!exisitingUser) {
            return res.status(404).send({
                success: false,
                message: "unable to find user",
            });
        }

        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        exisitingUser.blogs.push(newBlog);
        await exisitingUser.save({ session });
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "ERROR IN CREATING blog",
            success: false,
        })
    }
}

export const updateBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body
        const updateBlog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            message: "Blog updated successfully",
            success: true,
            updateBlog,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "ERROR IN UPDATING blog",
            success: false,
        })
    }
}

export const deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findByIdAndDelete(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        res.status(200).send({
            message: "Blog deleted successfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "ERROR IN DELETING blog",
            success: false,
        })
    }
}

export const singleBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const singleBlog = await blogModel.findById(id)
        if (!singleBlog) {
            return res.status(404).send({
                message: "Blog not found",
                success: false,
            })
        }
        res.status(200).send({
            message: "Blog retrieved successfully",
            success: true,
            singleBlog,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "ERROR IN GETTING SINGLE blog",
            success: false,
        })
    }
}

export const userBlogController = async (req, res) => {
    try {
        const userBlogs = await userModel.findById(req.params.id).populate("blogs")
        if (!userBlogs) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            })
        }
        res.status(200).send({
            message: "User's blogs retrieved successfully",
            success: true,
            userBlogs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "ERROR IN GETTING USER blog",
            success: false,
        })
    }
}