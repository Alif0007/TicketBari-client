import React, { use, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../authProvider/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

import { Navigate } from 'react-router';



const Login = () => {

    const { signInUser, googleSignIn, setUser } = use(AuthContext)
    const [showPass, setShowPass] = useState(false)


    const location = useLocation()
    const navigate = useNavigate()

    const emailRef = useRef(null)


    const handleToggle = (e) => {
        e.preventDefault()
        setShowPass(!showPass)

    }

    const handleLogin = (e) => {
        e.preventDefault()

        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)

        signInUser(email, password)
            .then((userCredential) => {
                // Signed in 
                toast.success('Logged in Successfully')
                const user = userCredential.user;
                setUser(user)

                navigate(location.state || '/')

                // ...
            })
            .catch((error) => {
                console.log(error.message)
                toast.error('Incorrect Email/Password')
            });
    }

    const signInGoogle = (e) => {
        e.preventDefault()
        googleSignIn()
            .then((result) => {
                console.log(result.user)
                setUser(result.user)
                toast.success('Logged in Successfully')
                navigate(location.state || '/')
            }).catch((error) => {
                console.log(error)
            });
    }




    return (
        <div>

            <div className="hero bg-base-200 min-h-screen">


                <div className="hero-content flex-col lg:flex-row-reverse w-full">

                    <form onSubmit={handleLogin} className="card bg-base-100  w-full max-w-md shadow-2xl">
                        <h1 className='text-3xl text-center py-4'> Login</h1>
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="label ">Email</label>
                                <input required name="email" type="email" className="input w-full" ref={emailRef} placeholder="Email" />
                                <label className="label">Password</label>
                                <div className='relative'>
                                    <input required name="password"
                                        type={showPass ? "text" : "password"}
                                        className="input w-full"
                                        placeholder="Password" />
                                    <button onClick={handleToggle} className='absolute right-5 top-3.5 cursor-pointer'>
                                        {showPass ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button type='submit' className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                            <p className='font-bold text-center p-2'>OR</p>
                            <button onClick={signInGoogle} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </div>

                        <p className='text-center pb-5'>Don't have an account,
                            <NavLink to="/register"><span className='font-bold text-blue-700'> Register </span> </NavLink>

                            Here</p>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;