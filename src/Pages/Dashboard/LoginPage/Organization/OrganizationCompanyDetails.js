//OrganizationCompanyDetails



import icon from '../../../../assets/LoginPage/icon.png';
import React, { useContext, useState } from "react";
import image8 from '../../../../assets/LoginPage/image8.png';
import account from '../../../../assets/LoginPage/account.svg';
import user from '../../../../assets/LoginPage/user.svg';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const OrganizationCompanyDetails = () => {




    return (
        <div className=""

        >
            <p className="flex items-center text-3xl font-semibold gap-2 ps-10 pt-10"><Link to='/organizationName' ><ArrowBackIcon /></Link> <span><img src={icon} alt="icon" /></span>Experiment Labs
            </p>
            <div className="flex">
                <div className="w-[100%] flex flex-col items-center ">

                    <p className=' text-4xl font-extrabold mt-10 '>Fill Your Company details </p>
                    <p className="flex items-center text-xl font-medium gap-5  py-2 w-[550px] mt-[40px] ps-3 "
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={user} alt="icon" /></span>
                        <select className="w-full focus:outline-0 text-[#8F8F8FCC]" name="Year" id="Year">
                            <option selected >Year of establishment</option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                        </select>

                    </p>
                    <p className="flex items-center text-xl font-medium gap-5  py-2 w-[550px] ps-3 mt-[30px]"
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={user} alt="icon" /></span>
                        <input className="w-full focus:outline-0" placeholder="Company Employee size" type="text" name="name" />
                    </p>

                    <p className="flex items-center text-xl font-medium gap-5  py-2 w-[550px] ps-3 mt-[30px] "
                        style={{
                            borderRadius: "10px",
                            border: "0.5px solid #8F8F8F"
                        }}
                    >
                        <span><img src={user} alt="icon" /></span>
                        <select className="w-full focus:outline-0 text-[#8F8F8FCC]" name="Year" id="Year">
                            <option selected >Role/Job Type </option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                        </select>
                       
                    </p>

                </div>

            </div>

             
        
            <div className='flex justify-end items-center absolute bottom-0 left-0 w-full '
                style={{
                    backgroundImage: `url(${image8})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "30vh"
                }}
            >
                
                <Link to='/aboutOrganization'
                    style={{
                        borderRadius: "10px",
                        border: "0.5px solid #8F8F8F"

                    }}
                    className="bg-[#065AD8] flex  text-xl font-bold text-[#fff]  justify-center py-2 w-[230px] me-20 mt-32 mb-10">Next</Link>
            </div>



        </div >




    );
};

export default OrganizationCompanyDetails;

