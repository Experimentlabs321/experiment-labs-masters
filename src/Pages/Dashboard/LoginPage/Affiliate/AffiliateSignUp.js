//AffiliateSignUp



import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image4 from '../../../../assets/LoginPage/image4.png';
import image5 from '../../../../assets/LoginPage/image5.png';
import gmail from '../../../../assets/LoginPage/gmail.png';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import iconGoogle from '../../../../assets/LoginPage/iconGoogle.png';
import emailIcon from '../../../../assets/LoginPage/emailIcon.svg';
import password from '../../../../assets/LoginPage/password.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'




const AffiliateSignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [value, setValue] = useState()


    return (
        <div className="">
            <p className="flex items-center text-3xl font-semibold gap-2 pt-20 ms-10"><Link to='/affiliateName' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
            </p>
            <div className="flex">
                <div className='mt-10'>
                    <img className='h-[630px]' src={image4} alt='img' />
                </div>

                <div className="w-[100%] flex justify-center bg-[#fff] mt-7">
                    <div>
                        <p className='text-[#8F8F8F] text-xl font-semibold text-center'>Welcome to Experiment Labs !</p>
                        <p className="mt-[34px] text-3xl font-extrabold text-center">Enter your Details</p>
                        <div className='w-[500px] mt-[55px] flex gap-5'>
                            <p className="flex items-center text-xl font-medium gap-5 justify-center py-1 w-[100%] "
                                style={{
                                    borderRadius: "10px",
                                    border: "0.5px solid #8F8F8F"
                                }}
                            >
                                <span><img src={iconGoogle} alt="icon" /></span>
                                 Google
                            </p>
                            <p className="flex items-center text-xl font-medium gap-5 justify-center py-1 w-[100%] "
                                style={{
                                    borderRadius: "10px",
                                    border: "0.5px solid #8F8F8F"
                                }}
                            >
                                <span><img src={gmail} alt="icon" /></span>
                                Gmail
                            </p>

                        </div>


                        <form>
                            <p className="flex items-center text-xl font-medium gap-5  py-2 w-[500px] mt-[54px] ps-3 "
                                style={{
                                    borderRadius: "10px",
                                    border: "0.5px solid #8F8F8F"
                                }}
                            >
                                <PhoneInput
                                    className='w-full focus:outline-0'
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={setValue} />
                                {/*  <span><img src={emailIcon} alt="icon" /></span>
                            <input className="w-full focus:outline-0" placeholder="Email" type="email" name="email" /> */}
                            </p>

                            <p className="flex items-center text-xl font-medium gap-5  py-2 w-[500px] mt-[27px] ps-3 "
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


                            <button className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[500px] mt-[57px]"
                                style={{
                                    borderRadius: "10px",
                                    border: "0.5px solid #8F8F8F"
                                }}
                            >

                                Sign Up
                            </button>
                        </form>

                        <p className="flex items-center text-lg font-semibold gap-5 justify-center py-1 w-[500px] mt-[53px] mb-10"

                        >
                            <span className="text-[#8F8F8FCC]">Already have an account ?</span>
                            <Link to='/loginPage' className="text-[#065AD8]">Log in</Link>
                        </p>

                    </div>

                </div>

                <div>
                    <img className='h-[630px]' src={image5} alt='img' />
                </div>

            </div>





        </div >




    );
};

export default AffiliateSignUp;



