import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import axios from "axios"

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blogs")
      if (data?.success) {
        setBlogs(data?.blogs)
      }
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getAllBlogs()
  }, [])
  return (
    <div className='text-gray-400 w-full min-h-screen bg-gray-900 body-font p-5 flex flex-wrap justify-center'>
      {blogs && blogs.map((blog) => {
        return (
          <Card
            key={blog?._id}
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
          />
        )
      })}
    </div>
  )
}

export default Blogs