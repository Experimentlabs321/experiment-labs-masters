import icon from '../../../../assets/LoginPage/icon.png';
import React from "react";
import image3 from '../../../../assets/LoginPage/image3.png';
import user from '../../../../assets/LoginPage/user.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StudentSignUp = () => {
    return (
        <div className="w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image3})` }}>
            <p className="flex items-center text-3xl font-semibold gap-2 pt-10 pl-10">
                <Link to='/selectProfile'><ArrowBackIcon /></Link>
                <span><img src={icon} alt="icon" /></span>
                Experiment Labs
            </p>
            <div className="flex justify-center items-center mt-24">
                <div className="flex flex-col items-center">
                    <p className='text-4xl font-extrabold mt-14'>What is your Name?</p>
                    <div className="flex items-center gap-5 py-2 px-3 mt-12 rounded border border-gray-300" style={{ maxWidth: "550px" }}>
                        <span><img src={user} alt="icon" /></span>
                        <input className="w-full focus:outline-none" placeholder="Type your name here" type="text" name="name" />
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 w-full'>
            <div className='flex justify-between items-center mt-20 mx-10 mb-10'>
                <p className='text-blue-500 text-2xl font-bold'>Buy Course ➡️</p>
                <Link to='/studentSignUpAcademicDetails'
                    style={{
                        borderRadius: "10px",
                        border: "0.5px solid #8F8F8F"

                    }}
                    className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[230px]">Next</Link>
            </div>
            </div>
            
        </div>
    );
};

export default StudentSignUp;
