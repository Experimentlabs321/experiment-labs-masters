import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <div className='flex lg:flex-row justify-between lg:items-center my-[20px] mx-[35px] flex-col gap-5 lg:gap-0'>

            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center font-bold text-xl text-[#000]'>
                   
                    <h1><span className='text-[#FFC062]'>Happy</span> charity</h1>
                </div>
                <div
                    style={{
                        borderRadius: "14px",
                        border: "1px solid #DDD"
                    }}
                    className=' lg:flex hidden  items-center px-2 text-[#929292] text-xl font-normal gap-[10px] w-[480px] h-[48px] '>
                    
                      <p><SearchIcon /></p>
                    <input className='w-full' placeholder='Search'></input>
                </div>
                <div>
                    <Link
                        style={{
                            borderRadius: "8px",


                            boxShadow: "0px 4px 10px 0px rgba(169, 169, 169, 0.25)"
                        }}
                        className='lg:hidden bg-[#4555BA] px-[25px] py-[10px] text-xl font-extrabold text-[#fff]'>Log in</Link>
                </div>

            </div>

            <div
                style={{
                    borderRadius: "14px",
                    border: "1px solid #DDD"
                }}
                className='me-2 flex lg:hidden  items-center px-2 text-[#929292] text-xl font-normal gap-[10px] w-[380px] h-[48px] '>
                {/* <p><SearchIcon /></p> */}
                <input className='w-full' placeholder='Search'></input>
            </div>

            <div className='lg:flex items-center gap-20'>
                <div className='flex gap-[45px] text-[#000] text-xl font-bold'>
                    <Link>Home</Link>
                    <Link>About us</Link>
                    <Link>Contact us</Link>
                </div>
                <div>
                    <Link
                        style={{
                            borderRadius: "8px",


                            boxShadow: "0px 4px 10px 0px rgba(169, 169, 169, 0.25)"
                        }}
                        className='bg-[#4555BA] lg:block hidden px-[25px] py-[10px] text-xl font-extrabold text-[#fff]'>Log in</Link>
                </div>

            </div>



        </div>
    );
};

export default Navbar;