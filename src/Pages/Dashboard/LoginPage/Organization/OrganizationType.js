import icon from '../../../../assets/LoginPage/icon.png';
import React from "react";
import image7 from '../../../../assets/LoginPage/image7.png';
import student from '../../../../assets/LoginPage/student.svg';
import Organization from '../../../../assets/LoginPage/Organization.svg';
import coaching from '../../../../assets/LoginPage/coaching.png';
import company from '../../../../assets/LoginPage/company.png';
import onlineEducator from '../../../../assets/LoginPage/onlineEducator.jpg';
import IndependentEducationConsultant from '../../../../assets/LoginPage/IndependentEducationConsultant.webp';
import studyAbroad from '../../../../assets/LoginPage/studyAbroad.webp';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OrganizationType = () => {
    return (
        <div className="">
            <p className="flex items-center text-3xl font-semibold gap-2 pt-10 ms-10">
                <Link to='/loginPage'><ArrowBackIcon /></Link>
                <span><img src={icon} alt="icon" /></span>Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center ">
                    <p className='text-3xl font-extrabold mt-[20px] '>Select the Organization Type</p>
                    <div className='grid grid-cols-2 gap-[20px] mt-[30px]'>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-2 justify-center py-2 w-[330px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}>
                            <span><img src={student} alt="icon" /></span>
                            School
                        </Link>
                      
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-2 justify-center py-2 w-[330px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img src={Organization} alt="icon" /></span>
                            College & University
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-2 justify-center py-2 w-[330px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img className='w-[40px]' src={coaching} alt="icon" /></span>
                            Coaching & Institute
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-2 justify-center py-2 w-[330px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img className='w-[40px]' src={studyAbroad} alt="icon" /></span>
                            Study Abroad Organization
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-2 justify-center py-2 w-[330px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img className='w-[40px]' src={company} alt="icon" /></span>
                            Company
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-2 justify-center py-2 w-[330px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img className='w-[40px]' src={onlineEducator} alt="icon" /></span>
                            Online Educator
                        </Link>
                        <Link to='/organizationName' className="flex items-center text-xl font-medium gap-2 justify-center py-2 w-[330px] "
                            style={{
                                borderRadius: "10px",
                                border: "0.5px solid #8F8F8F"
                            }}
                        >
                            <span><img className='w-[40px]' src={IndependentEducationConsultant} alt="icon" /></span>
                            <span className='w-[80%]'>Independent Education Consultant</span>
                            
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 w-full'>
                <img className='w-full h-[200px]' src={image7} alt='bgImage' />
            </div>
        </div>
    );
};

export default OrganizationType;
