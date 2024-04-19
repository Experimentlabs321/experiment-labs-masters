import icon from '../../../../assets/LoginPage/icon.png';
import React from "react";
import image7 from '../../../../assets/LoginPage/image7.png';
import student from '../../../../assets/LoginPage/student.svg';
import Organization from '../../../../assets/LoginPage/Organization.svg';
import Program from '../../../../assets/LoginPage/Program.svg';
import Person from '../../../../assets/LoginPage/Person.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AffiliateType = () => {
    return (
        <div className="">
            <p className="flex items-center text-3xl font-semibold gap-2 pt-10 ms-10">
                <Link to='/loginPage'><ArrowBackIcon /></Link>
                <span><img src={icon} alt="icon" /></span>
                Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center ">
                    <p className='text-4xl font-extrabold mt-[80px]'>Select Affiliate Type</p>
                    <div className='grid grid-cols-2 gap-[44px] mt-[90px]'>
                        <p className="flex items-center justify-center text-xl font-medium gap-5 py-2 w-[300px]"
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}>
                            <span><img src={student} alt="icon" /></span>
                            Company
                        </p>
                        <p className="flex items-center justify-center text-xl font-medium gap-5 py-2 w-[300px]"
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}>
                            <span><img src={Organization} alt="icon" /></span>
                            Organization
                        </p>
                        <p className="flex items-center justify-center text-xl font-medium gap-5 py-2 w-[300px]"
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}>
                            <span><img src={Program} alt="icon" /></span>
                            Program
                        </p>
                        <p className="flex items-center justify-center text-xl font-medium gap-5 py-2 w-[300px]"
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}>
                            <span><img src={Person} alt="icon" /></span>
                            Person
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex justify-end items-center absolute bottom-0 left-0 w-full'
                style={{
                    backgroundImage: `url(${image7})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "48vh"
                }}>
                <Link to='/planning'
                    style={{
                        borderRadius: "10px",
                        border: "0.5px solid #8F8F8F"
                    }}
                    className="bg-[#065AD8] flex text-xl font-bold text-[#fff] justify-center py-2 w-[230px] me-20 mt-60 ">
                    Next
                </Link>
            </div>
        </div>
    );
};

export default AffiliateType;
