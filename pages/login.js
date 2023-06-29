require('dotenv').config();

import Link from 'next/link'
import Router, { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { FaLaptopCode } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    // Chekcing if user is alreaady logged in
    useEffect(()=>{
        if (localStorage.getItem('token')){
            router.push('/');
        }
      },[])

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const router = useRouter();

    //Update value in real time
    const handleChange = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value)
        }
        else if (e.target.name == "password") {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password };

        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json();
        
        setEmail('')
        setPassword('')

        // Set status on basis of the api response
        if (response.success) {
            localStorage.setItem('token', response.token);
            toast.success('You are successfully logged in!', {
                position: "top-left",
                autoClose: 1300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(()=>{
                router.push('/');
            },1500)
        }
        else {
            toast.error('Invalid Credentials!', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={1300}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 mt-10">
                <a href="#" className="flex items-center text-2xl font-semibold dark:text-white">
                    <FaLaptopCode className='text-5xl text-[#BD0000] cursor-pointer'></FaLaptopCode> - WATCH
                </a>
                <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                        Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="POST" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium dark:text-white">Your email</label>
                                <input value={email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-white sm:text-sm rounded-lg  block w-full p-2.5 bg-opacity-0 dark:placeholder-white dark:text-white " placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-white">Password</label>
                                <input value={password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-white sm:text-sm rounded-lg  block w-full p-2.5 bg-opacity-0 dark:placeholder-white dark:text-white " required />
                            </div>
                            <button type="submit" className="w-full text-[#BD0000] bg-primary-600 bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link href={'/signup'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login