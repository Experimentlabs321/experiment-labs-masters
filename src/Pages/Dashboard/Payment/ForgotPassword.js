//ForgotPassword
import React, { useState } from 'react';
import GoogleLogo from "../../../assets/icons/googleIcon.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import app from '../../../firebase/firebase.config';
import toast from 'react-hot-toast';

const ForgotPassword = ({setForgotPassOpen,forgotPassOpen}) => {

 
  
    const auth = getAuth(app);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));



    const handleClose = () => {
        setForgotPassOpen(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('A Password Reset Link has been sent to your email.')
                e.target.reset();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

 

    return (
       
         
            <Dialog
                fullScreen={fullScreen}
                open={forgotPassOpen}
                // onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{ width: "100%", borderRadius: "22px" }}
            >
                <div className="w-[400px] h-full text-white flex items-center  ">
                    <div className="w-full">
                        <span
                            onClick={handleClose}
                            className=" cursor-pointer absolute top-3 right-5 text-[30px] text-[#000]"
                        >
                            x
                        </span>
                        <h1 className="text-blue text-[27px] font-semibold p-8 "

                        >Forgot Password?</h1>
                        <p className="border-b"></p>
                        {/* <p className="text-blue text-[16px] mb-[45px] border-b">

                    Please enter your email address.
                  </p> */}
                        <form onSubmit={(e) => handleResetPassword(e)} className="flex flex-col gap-2 w-full p-8 ">

                            <label className="text-[18px] mb-[9px] text-[#000]" htmlFor="email">
                                Enter Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                //   onChange={handleOnChange}
                                className=" w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                placeholder="Enter your email"
                            />

                            <button
                                onClick={() => {
                                    //  handleClose();
                                    //    handleClickOpen1();
                                }}
                                className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 cursor-pointer font-bold hover:transition-all hover:delay-200 hover:ease-out mt-5"
                            >
                                Reset
                            </button>
                        </form>

                    </div>
                </div>


            </Dialog>

    

    );
};

export default ForgotPassword;