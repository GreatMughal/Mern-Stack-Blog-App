import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from "react-redux"
import { authActions } from "../store/store"
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
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
            const { data } = await axios.post("/api/v1/user/login", { email: inputs.email, password: inputs.password })
            if (data.success) {
                localStorage.setItem('userID', data?.user._id)
                dispatch(authActions.login())
                toast.success('Login successful')
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to Login')

        }

    }
    return (
        <div className="flex min-h-full flex-col text-gray-400 bg-gray-900 justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">Log in to your account</h2>
            </div>
            <div className="mt-9 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">Email address</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                value={inputs.email}
                                onChange={handleChange}
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm outline-none placeholder:text-gray-900 px-4 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-400">Password</label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                value={inputs.password}
                                onChange={handleChange}
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 px-4 py-1.5 outline-none text-gray-900 shadow-sm placeholder:text-gray-900 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't Have An Account
                    <NavLink to="/register" className={() => `font-semibold ml-2 leading-6 text-indigo-600 hover:text-indigo-500`}>Sign Up</NavLink>
                </p>
            </div>
        </div>
    )
}

export default Login
