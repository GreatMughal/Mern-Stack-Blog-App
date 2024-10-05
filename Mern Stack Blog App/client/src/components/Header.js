import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../store/store'
import toast from 'react-hot-toast'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let isLogin = useSelector(state => state.isLogin)
  isLogin = isLogin || localStorage.getItem("userID")
  const handleLogOut = () => {
    try {
      dispatch(authActions.logout())
      toast.success("Logout Successful")
      localStorage.clear();
      navigate("/login")
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NavLink to='/' className={() => `flex title-font ml-3 text-xl font-medium items-center text-white mb-4 md:mb-0`}>
          LOGO
        </NavLink>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <NavLink to="/" className={({ isActive }) => `mr-5 ${isActive ? "text-green-500" : "text-gray-300"} hover:text-white`}>All Blogs</NavLink>
          {isLogin && <NavLink to="/userblogs" className={({ isActive }) => `mr-5 ${isActive ? "text-green-500" : "text-gray-300"} hover:text-white`}>My Blogs</NavLink>}
          {isLogin && <NavLink to="/create-blog" className={({ isActive }) => `mr-5 ${isActive ? "text-green-500" : "text-gray-300"} hover:text-white`}>Create Blog</NavLink>}
          {/*<a className="mr-5 hover:text-white">Fourth Link</a>*/}
        </nav>
        {!isLogin && <>
          <NavLink
            to="/register"
            className={() => `inline-flex items-center mr-4 bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0`}
          >Sign Up</NavLink>

          <NavLink
            to="/login"
            className={() => `inline-flex items-center mr-4 bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0`}
          >Login</NavLink>
        </>}

        {isLogin && <NavLink
          onClick={handleLogOut}
          className={() => `inline-flex items-center mr-4 bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0`}
        >Logout</NavLink>}

      </div>
    </header>
  )
}

export default Header