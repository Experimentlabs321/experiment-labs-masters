import icon from '../../../assets/LoginPage/icon.png';
import React from "react";
import image2 from '../../../assets/LoginPage/image2.png';
import student from '../../../assets/LoginPage/student.svg';
import Organization from '../../../assets/LoginPage/Organization.svg';
import Mentor from '../../../assets/LoginPage/Mentor.svg';
import Affiliate from '../../../assets/LoginPage/Affiliate.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SelectProfile = () => {
    return (
        <div className='w-full h-screen bg-cover bg-center flex justify-center items-center'>
            <div className="w-full bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${image2})` }}>
                <p className="flex items-center text-3xl font-semibold gap-2 pt-10 pl-10">
                    <Link to='/loginPage'><ArrowBackIcon /></Link>
                    <span><img src={icon} alt="icon" /></span>
                    Experiment Labs
                </p>
                <div className="flex flex-col items-center mt-16">
                    <p className='text-[#8F8F8F] text-3xl font-semibold'>Welcome!</p>
                    <p className='text-4xl font-extrabold mt-10'>Select your Profile(s)</p>
                    <div className='grid grid-cols-2 gap-5 mt-10'>
                        <Link to='/studentSignup' className="profile-link w-[150px] flex gap-2 items-center border rounded-lg p-2">
                            <span><img src={student} alt="icon" /></span>
                            Student
                        </Link>
                        <Link to='/organizationType' className="profile-link w-[150px] flex gap-2 items-center border rounded-lg p-2">
                            <span><img src={Organization} alt="icon" /></span>
                            Organization
                        </Link>
                        <Link to='/mentorType' className="profile-link w-[150px] flex gap-2 items-center border rounded-lg p-2">
                            <span><img src={Mentor} alt="icon" /></span>
                            Mentor
                        </Link>
                        <Link to='/affiliateType' className="profile-link w-[150px] flex gap-2 items-center border rounded-lg p-2">
                            <span><img src={Affiliate} alt="icon" /></span>
                            Affiliate
                        </Link>
                    </div>
                </div>
                <div className='absolute bottom-0 left-0 w-full'>
                    <div className='flex justify-between items-center mt-14 mx-10 mb-10 '>
                        <p className='text-blue-500 text-lg font-bold'><Link to='/login'>Log in to your existing Account ➡️</Link></p>
                        <p className='text-3xl font-bold'>Help?</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SelectProfile;
