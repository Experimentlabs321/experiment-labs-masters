import React, { useState } from 'react';
import GoogleLogo from "../../../assets/icons/googleIcon.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../../firebase/firebase.config';
import toast from 'react-hot-toast';

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin, loginOpen, setLoginOpen, registerOpen, setRegisterOpen, handleGoogleSignIn,setForgotPassOpen }) => {

    const [showPassword, setShowPassword] = useState(false);
  

    const handleClickOpen = () => {
        setForgotPassOpen(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='space-y-6 ng-untouched ng-pristine ng-valid w-full py-4'>
            <form
                onSubmit={handleLogin}
                noValidate=""
                action=""
                className="space-y-6"
            >
                <div className="space-y-3 text-sm">
                    <label htmlFor="email" className="block">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                        required
                    />
                </div>
                <div className="space-y-3 text-sm">
                    <label htmlFor="password" className="block">
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-4 py-3"
                        >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </button>
                    </div>

                </div>
                <input
                    type="submit"
                    value="Login"
                    className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 cursor-pointer font-bold hover:transition-all hover:delay-200 hover:ease-out"
                />
            </form>
            <div>
                <div className="text-center mb-5">
                    <button onClick={() => {
                        setLoginOpen(false)
                        handleClickOpen();
                    }}

                        className="text-blue hover:border-b mb-[1px] border-blue">Forgot password?</button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-gray-600 text-sm">
                        <span className="px-2 bg-white">OR</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    aria-label="Login with Google"
                    type="button"
                    className="flex items-center justify-center w-full p-3 space-x-4 border rounded-xl hover:transition-all hover:delay-200 hover:ease-out hover:bg-slate-200 bg-[#9c9d9e4e] text-black mb-[25px]"
                >
                    <img
                        className="w-[20px] h-[20px]"
                        src={GoogleLogo}
                        alt=""
                    />
                    <p className="text-[20px]">Continue with Google</p>
                </button>

                <div className='flex justify-center'>
                    <p>Don't Have an Account ? <span onClick={() => {
                        setLoginOpen(false)
                        setRegisterOpen(true)
                    }} className='text-blue cursor-pointer'>Register</span></p>
                </div>

            </div>
        </div>

    );
};

export default LoginForm;