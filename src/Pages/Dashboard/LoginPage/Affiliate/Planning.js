import icon from '../../../../assets/LoginPage/icon.png';
import React, { useState } from "react";
import image7 from '../../../../assets/LoginPage/image7.png';
import team from '../../../../assets/LoginPage/team.svg';
import Myself from '../../../../assets/LoginPage/Myself.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Planning = () => {
    const [selected1, setSelected1] = useState(true);
    const [selected2, setSelected2] = useState(false);

    const toggleSelection1 = () => {
        setSelected1(true);
        setSelected2(false);
    };

    const toggleSelection2 = () => {
        setSelected1(false);
        setSelected2(true);
    };

    return (
        <div className="">
            <p className="flex items-center text-3xl font-semibold gap-2 pt-10 ms-10">
                <Link to='/affiliateType'><ArrowBackIcon /></Link>
                <span><img src={icon} alt="icon" /></span>
                Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center ">
                    <p className='text-4xl font-extrabold mt-[80px]'>How are you Planning to use Experiment Labs?</p>
                    <p className='text-[#8F8F8FCC] text-xl font-semibold mt-[30px]'>
                        We’ll fit the experience to your needs. Don’t worry, you can change it later.
                    </p>
                    <div className='grid grid-cols-2 gap-[44px] mt-[90px]'>
                        <div className={`flex flex-col justify-center items-center text-xl font-bold gap-5 py-8 w-[300px] ${selected1 ? 'bg-[#F5F8FE] border-2 border-[#065AD8]' : 'border border-[#8F8F8F]'} cursor-pointer`}
                            onClick={toggleSelection1}
                            style={{
                                borderRadius: "10px"
                            }}>
                            <span><img src={team} alt="icon" /></span>
                            With my Team
                            <span className='text-[#8F8F8F] text-xl font-medium'>Companies and Groups</span>
                        </div>
                        <div className={`flex flex-col justify-center items-center text-xl font-bold gap-5 py-8 w-[300px] ${selected2 ? 'bg-[#F5F8FE] border-2 border-[#065AD8]' : 'border border-[#8F8F8F]'} cursor-pointer`}
                            onClick={toggleSelection2}
                            style={{
                                borderRadius: "10px"
                            }}>
                            <span><img src={Myself} alt="icon" /></span>
                            By Myself
                            <span className='text-[#8F8F8F] text-xl font-medium'>Companies and Groups</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end items-center absolute bottom-0 left-0 w-full'
                style={{
                    backgroundImage: `url(${image7})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "36vh"
                }}>
                <Link to='/affiliateName'
                    style={{
                        borderRadius: "10px",
                        border: "0.5px solid #8F8F8F"
                    }}
                    className="bg-[#065AD8] flex text-xl font-bold text-[#fff] justify-center py-2 w-[230px] me-20 mt-48 mb-10">
                    Next
                </Link>
            </div>
        </div>
    );
};

export default Planning;
