import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';


const Card = ({
  image = "",
  username,
  title = "john doe",
  description = "Swag shoindxigoitch literally meditation subway tile tumblr cold-pressed. Gastropub street art beard dreamcatcher neutra, ethical XOXO lumbersexual.",
  id,
  isUser
}) => {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/edit-blog/${id}`)
  }

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
      if (data?.success) {
        toast.success('Blog deleted successfully!')
        window.location.reload();
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <>
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-64 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src={image ? image : " https://dummyimage.com/1204x504"} />
        </div>
        <h6 className="text-sm  text-gray-400 mt-2">{username}</h6>
        <h2 className="text-xl font-medium title-font text-white mt-5">{title}</h2>
        <p className="text-base leading-relaxed mt-2">{description}</p>
        <div className='flex items-center justify-between flex-wrap mt-3'>
          <NavLink to="/blogview" className={() => `text-purple-400 flex items-center`}>View Details
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </NavLink>
          {isUser && <div className='flex items-center gap-2'>
            <MdEditSquare onClick={handleEdit} className='text-green-600 font-black text-2xl' />
            <MdDeleteForever onClick={handleDelete} className='text-red-600 font-black text-2xl' />
          </div>}
        </div>
      </div>
    </>
  )
}

export default Card