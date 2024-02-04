import React from 'react';
import toast from "react-hot-toast";
import GoogleLogo from "../../../assets/icons/googleIcon.png";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const RegisterForm = ({ email, setEmail, password, setPassword, name, setName, phone, setPhone, loginOpen, setLoginOpen, registerOpen, setRegisterOpen, handleRegister, handleGoogleSignIn, error, handleGoogleRegister }) => {
    return (

        <form
            onSubmit={handleRegister}
            noValidate=""
            action=""
            className="relative space-y-6 ng-untouched ng-pristine ng-valid w-full py-4 z-50"
        >
            <div className="space-y-3 text-sm">
                <label htmlFor="username" className="block">
                    Name
                </label>
                <input
                    type="name"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter Name"
                    className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                    required
                />
            </div>
            <div className="space-y-3 text-sm">
                <label htmlFor="username" className="block">
                    Phone Number
                </label>
                <PhoneInput
                    international="true"
                    className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                    defaultCountry="IN"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                />
                {error && <p className="text-red-600">Need Phone Number to Register</p>}
            </div>
            <div className="space-y-3 text-sm">
                <label htmlFor="username" className="block">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                    required
                />
            </div>
            <div className="space-y-3 text-sm">
                <label htmlFor="password" className="block">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                    required
                />
            </div>
            <input
                type="submit"
                value="Register"
                className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 font-bold hover:transition-all hover:delay-200 hover:ease-out"
            />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-gray-600 text-sm">
                    <span className="px-2 bg-white">OR</span>
                </div>
            </div>

            <button
                onClick={handleGoogleRegister}
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full p-3 space-x-4 border rounded-xl hover:transition-all hover:delay-200 hover:ease-out hover:bg-slate-200 bg-[#9c9d9e4e] text-black mb-[25px]"
            >
                <img className="w-[20px] h-[20px]" src={GoogleLogo} alt="" />
                <p className="text-[20px]">Register with Google</p>
            </button>

            <div className='flex justify-center'>
                <p>Already Have an Account ? <span onClick={() => {
                    setRegisterOpen(false)
                    setLoginOpen(true)
                }} className='text-blue cursor-pointer'>Login</span>
                </p>
            </div>

        </form>
    );
};

export default RegisterForm;