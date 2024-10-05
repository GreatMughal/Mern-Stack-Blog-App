import { useState, useEffect } from 'react'
import axiox from "axios"
import Card from "../components/Card"

const Userblogs = () => {
    const [blogs, setBlogs] = useState([])

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem("userID")
            const { data } = await axiox.get(`/api/v1/blog/user-blog/${id}`)
            if (data?.success) {
                setBlogs(data?.userBlogs.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserBlogs()
    }, [])



    return (
        <>
            <div className='text-gray-400 w-full min-h-screen bg-gray-900 body-font p-5 flex flex-wrap justify-center'>
                {blogs && blogs.length > 0 ? blogs.map((blog) => (
                    <Card
                        key={blog._id}
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        username={blog.user.username}
                    />
                )) : <h1>You Havent Created a blog</h1>}
            </div>
        </>
    )
}

export default Userblogs