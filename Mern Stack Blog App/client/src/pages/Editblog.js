import axios from 'axios'
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Createblog = () => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    // get blog details
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/single-blog/${id}`);
            if (data?.success) {
                setBlog(data?.singleBlog);
                setInputs({
                    title: data?.singleBlog.title,
                    description: data?.singleBlog.description,
                    image: data?.singleBlog.image,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBlogDetail();
    }, [id]);

    // input change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            });
            if (data?.success) {
                toast.success("Blog updated successfully!");
                navigate("/userblogs");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-full px-7 min-h-screen bg-gray-900 text-gray-400'>
            <h1 className='text-white font-black text-3xl bg-gray-900 pt-8'>Create Your Own Blog</h1>
            <form className='space-y-6 mt-8' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-400">Enter Your Title</label>
                    <div className="mt-2">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={inputs.title}
                            onChange={handleChange}
                            autoComplete="title"
                            required
                            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-400 shadow-sm outline-none placeholder:text-gray-900 px-4 sm:text-sm sm:leading-6 bg-gray-800" />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-400">Enter Your Description</label>
                    <div className="mt-2">
                        <input
                            id="description"
                            name="description"
                            type="text"
                            value={inputs.description}
                            onChange={handleChange}
                            autoComplete="description"
                            required
                            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-400 shadow-sm outline-none placeholder:text-gray-900 px-4 sm:text-sm sm:leading-6 bg-gray-800" />
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-400">Enter Image Address</label>
                    <div className="mt-2">
                        <input
                            id="image"
                            name="image"
                            type="text"
                            value={inputs.image}
                            onChange={handleChange}
                            autoComplete="image"
                            required
                            className="block w-1/2 rounded-md border-0 py-1.5 text-gray-400 shadow-sm outline-none placeholder:text-gray-900 px-4 sm:text-sm sm:leading-6 bg-gray-800" />
                    </div>
                </div>
                <div>
                    <button type="submit" className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Blog</button>
                </div>
            </form>
        </div>
    )
}

export default Createblog
