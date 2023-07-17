//ManageClasses

import React, { useState } from 'react';
import Layout from '../Layout';
import arrowDown from '../../../assets/SkillsManagement/arrow.svg'
import arrowright from '../../../assets/SkillsManagement/arrowright.svg'

import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import Level from '../Dashboard/Level';



const ManageClasses = () => {
    const [isOpenGeneral, setisOpenGeneral] = useState(true);


    const toggleDropdownGeneral = () => {
        setisOpenGeneral(!isOpenGeneral);
    };

    return (
        <div>
            <Layout>

                <div className='text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]'>
                    <p>Manage Classes in Topic 1</p>

                </div>
                <form className='ms-[40px]  mt-12'>
                <div className="select-option flex items-center gap-[40px]" onClick={toggleDropdownGeneral} >
                        <h1 className=' h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]'>1</h1>
                        <p className='text-[25px] font-bold'>General </p>
                        {
                            !isOpenGeneral && <img className='w-6' src={arrowright}></img>
                        }

                        {
                            isOpenGeneral && <img src={arrowDown}></img>
                        }

                        <i className={`dropdown-arrow ${isOpenGeneral ? 'open' : ''}`}></i>
                    </div>
                    {isOpenGeneral && (
                        <div className="dropdown-menu mt-[71px] mb-[45px]  ">
                            <div className='flex'>
                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'> Class Name</p>
                                    </div>

                                    <input className='mt-6 ms-6 border rounded-md w-[440px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] '
                                     name='className' type="text" placeholder='Eg. Excel with Shekhar Gupta' />
                                </div>
                                
                                <div className='ms-[137px]'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Class Type</p>
                                    </div>

                                    <div className=" flex gap-2  mt-6 ms-6 border rounded-md w-[142px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                                    style={{boxShadow:" 0px 2px 4px 0px rgba(0, 0, 0, 0.15)"}}
                                    >

                                        <select
                                            required
                                            className='w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0'
                                            name="classType"                                       
                                        >
                                            <option className="" value="Online">Online</option>
                                            <option value="Offline"> Offline</option>
                                            
                                        </select>
                                      
                                    </div>
                                
                                </div>
                                <div className='ms-[210px]'>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Instance Type</p>
                                    </div>

                                    <div className=" flex gap-2  mt-6 ms-6 border rounded-md w-[246px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                                    style={{boxShadow:" 0px 2px 4px 0px rgba(0, 0, 0, 0.15)"}}
                                    >

                                        <select
                                            required
                                            className='w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0'
                                            name="instanceType"                                       
                                        >
                                            <option className="" value="Room with recordings">Room with recordings</option>
                                            <option value="Parent"> </option>
                                            
                                        </select>
                                      
                                    </div>
                                
                                </div>

                                <div>

                                </div>
                            
                            </div>


                            <div className='flex gap-[345px] mt-[116px]'>
                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Location (For offline & Hybrid)</p>
                                    </div>

                                    <input className='mt-6 ms-6 border rounded-md w-[415px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] '
                                     name='Location' type="text" placeholder='Eg. Excel with Shekhar Gupta' />
                            
                                </div>
                                <div className=''>
                                    <div className='flex items-center gap-4'>
                                        <p className='h-2 w-2 bg-black rounded-full'></p>
                                        <p className='font-bold text-lg me-[36px]'>Room Number</p>
                                    </div>

                                    <input className='mt-6 ms-6 border rounded-md w-[440px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] '
                                     name='className' type="text" placeholder='Eg. Excel with Shekhar Gupta' />
                                </div>

                             

    
                            </div>


                        </div>
                    )}
 


                    <div className='flex items-center justify-center mt-20 mb-10'>
                        <input type="submit" value='submit' className='px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg' />
                        <input type="submit" value='Save & Display' className='px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20' />
                    </div>



                </form>


            </Layout>
        </div >
    );
};

export default ManageClasses;