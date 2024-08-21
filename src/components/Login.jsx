import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice';
import authService from '../appwrite/auth';
import { Button, Input, Logo } from './index';
import { logo } from '../assets';

function Login() {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const login = async (data) => {
        setError('');
        try {
            const { session, token } = await authService.login(data);
            if (session) {
                localStorage.setItem('token', token);
                dispatch(authLogin(session)); // Update the state first

                // Redirect to home page after 5 seconds
                setTimeout(() => {
                    history.push('/'); // Redirect to the home page

                    // Reload the homepage after redirecting
                    setTimeout(() => {
                        window.location.reload(); // Reload the page
                    }, 0); // Immediate reload after redirect
                }, 5000); // 5 seconds delay before redirecting
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const onSubmit = (data) => {
        login(data);
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <img src={logo} width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
