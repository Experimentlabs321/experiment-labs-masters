import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import koreaOrg from '../../../../assets/OnePager/Navbar/Picture1.png'
const KoreaNav = () => {
    return (
        <div className='flex bg-[#fff] lg:flex-row justify-between lg:items-center m-[20px] flex-col gap-5 lg:gap-0'>

            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center font-normal text-xl text-[#000]'>
                    <img alt='korea' src={koreaOrg} />
                    <h1>GK Institute</h1>
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
                <p><SearchIcon /></p>
                <input className='w-full' placeholder='Search'></input>
            </div>

            <div className='lg:flex items-center gap-20'>
                <div className='flex gap-[45px] text-[#000] text-xl font-bold'>
                    <Link>소개</Link>
                    <Link>수강신청</Link>
                    <Link>온라인샵</Link>
                </div>
                <div>
                    <Link
                        style={{
                            borderRadius: "8px",


                            boxShadow: "0px 4px 10px 0px rgba(169, 169, 169, 0.25)"
                        }}
                        className='bg-[#4555BA] lg:block hidden px-[25px] py-[10px] text-xl font-extrabold text-[#fff]'>나의강의실</Link>
                </div>

            </div>



        </div>
    );
};

export default KoreaNav;