import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from 'react-hot-toast'

const Createblog = () => {
    const id = localStorage.getItem("userID")
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    })

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/v1/blog/create-blog", { title: inputs.title, description: inputs.description, image: inputs.image, user: id })
            if (data?.success) {
                toast.success("Blog Created Successfully")
                navigate("/userblogs")
            }
        } catch (error) {
            console.log(error);

        }
    }
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
                    <button type="submit" className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Blog</button>
                </div>
            </form>
        </div>
    )
}

export default Createblog