
import React, { useContext, useState } from "react";
import image1 from '../../../assets/LoginPage/image1.png';
import icon from '../../../assets/LoginPage/icon.png';
import iconGoogle from '../../../assets/LoginPage/iconGoogle.png';
import emailIcon from '../../../assets/LoginPage/emailIcon.svg';
import password from '../../../assets/LoginPage/password.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Link } from "react-router-dom";




const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    return (
        <div className="flex">
            <div className="w-[100%] flex justify-center mt-24 bg-[#fff]">
                <div>
                    <p className="flex items-center text-xl font-semibold gap-2"><span><img src={icon} alt="icon" /></span>Experiment Labs</p>
                    <p className="mt-10 text-3xl font-extrabold">Login to your Account</p>
                    <p className="text-[#8F8F8F] text-xl font-semibold mt-1">Welcome back !</p>

                    <p className="flex items-center text-xl font-medium gap-5 justify-center py-1 w-[500px] mt-[39px]"
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={iconGoogle} alt="icon" /></span>
                        Log in with Google
                    </p>
                    <form>

                        <p className="flex items-center text-xl font-medium gap-5  py-2 w-[500px] mt-[54px] ps-3 "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={emailIcon} alt="icon" /></span>
                            <input className="w-full focus:outline-0" placeholder="Email" type="email" name="email" />
                        </p>

                        <p className="flex items-center text-xl font-medium gap-5 py-2 w-[500px] mt-[27px] ps-3"
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={password} alt="icon" /></span>
                            <input
                                className="w-full focus:outline-0"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                            />
                            {
                                !showPassword && (
                                    <span className="me-2" onClick={togglePasswordVisibility}><VisibilityOffOutlinedIcon /></span>
                                )
                            }
                            {
                                showPassword && (
                                    <span className="me-2" onClick={togglePasswordVisibility}><VisibilityOutlinedIcon /></span>
                                )
                            }

                        </p>

                        <div className="flex justify-between mt-[44px]">
                            <p className="text-[#8F8F8FCC] text-lg font-semibold flex items-center gap-2">
                                <input className="h-[20px] w-[20px]" type="checkbox" id="check" name="check" value="Remember me" />
                                <label for="check"> Remember me </label>
                            </p>

                            <p className="text-[#065AD8] text-lg font-semibold">Forgot Password?</p>

                        </div>

                        <button className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[500px] mt-[57px]"
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >

                            Log In
                        </button>
                    </form>

                    <p className="flex items-center text-lg font-semibold gap-5 justify-center py-1 w-[500px] mt-[51px]"

                    >
                        <span className="text-[#8F8F8FCC]">Don’t have an account ?</span>
                        <Link to='/selectProfile' className="text-[#065AD8]">Create an Account</Link>
                    </p>

                </div>

            </div>
            <div className="w-[100%] ">
                <img className="w-[100%] h-[923px]" src={image1} alt="img" />

            </div>





        </div >




    );
};

export default LoginPage;

