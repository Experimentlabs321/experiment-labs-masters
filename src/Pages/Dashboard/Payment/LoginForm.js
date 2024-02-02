import React from 'react';
import GoogleLogo from "../../../assets/icons/googleIcon.png";

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin }) => {
    return (
        <form
            onSubmit={handleLogin}
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid w-full py-4"
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
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                    required
                />
            </div>
            <input
                type="submit"
                value="Login"
                className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 cursor-pointer font-bold hover:transition-all hover:delay-200 hover:ease-out"
            />

            <button
                // onClick={handleGoogleSignIn}
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

            <p className="text-center text-error">
                {/* <small>error</small> */}
            </p>
        </form>
    );
};

export default LoginForm;