//AssignmentUpNev

import React, { useContext, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Polygon from '../../../assets/Assignments/Polygon.svg'
import prize1 from '../../../assets/Assignments/prize1.svg'
import Prize2 from '../../../assets/Assignments/Prize2.svg'
import prize3 from '../../../assets/Assignments/prize3.svg'




const AssignmentRightNev = () => {


    return (
        <div className="ms-5 me-10 w-[80%]">

            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </div>

            <div className="ms-8">
                <div className="flex justify-between items-center">
                    <p className="text-[15px] font-bold">Upcoming Events</p>
                    <p className="flex gap-2 items-center text-[#8A8A8A] text-sm font-bold">View all
                        <img src={Polygon} alt='' />
                    </p>

                </div>

                <div className="flex bg-[#F0F7FF] py-5 mt-5 rounded-[20px]">
                    <div className=" w-16"></div>
                    <div>
                        <p className="text-[15px] font-bold">Workshop on Google Excel</p>
                        <p className="text-[#B7B7B7] text-[10px] font-bold">20th August, 2023</p>
                    </div>
                </div>
                <div className="flex bg-[#F0F7FF] py-5 mt-5 rounded-[20px]">
                    <div className=" w-16"></div>
                    <div>
                        <p className="text-[15px] font-bold">Workshop on Google Excel</p>
                        <p className="text-[#B7B7B7] text-[10px] font-bold">20th August, 2023</p>
                    </div>
                </div>
            </div>

            <div className="ms-8 mt-5">
                <div className="flex justify-between items-center">
                    <p className="text-[15px] font-bold">Top Performing Student</p>
                    <p className="flex gap-2 items-center text-[#8A8A8A] text-sm font-bold">View all
                        <img src={Polygon} alt='' />
                    </p>

                </div>

                <div className="flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#081765]">
                    <div className="flex gap-3 ">
                        <div className=" w-[50px] bg-[#16D03B] rounded-full flex items-center justify-center ms-5">
                            <p className="text-[15px] font-bold">JA</p>
                        </div>
                        <div className="mt-1">
                            <p className="text-[15px] font-bold">Janki Akhandiya</p>
                            <p className="text-[10px] font-bold">9.6/10 points</p>
                        </div>
                    </div>

                    <div className="me-5">
                        <img src={prize1} alt='prize1' />
                    </div>
                </div>

                <div className="flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#2063DA]">
                    <div className="flex gap-3 ">
                        <div className=" w-[50px] bg-[#16D03B] rounded-full flex items-center justify-center ms-5">
                            <p className="text-[15px] font-bold">AA</p>
                        </div>
                        <div className="mt-1">
                            <p className="text-[15px] font-bold">Anushka Anyat</p>
                            <p className="text-[10px] font-bold">9/10 points</p>
                        </div>
                    </div>

                    <div className="me-5">
                        <img src={Prize2} alt='Prize2' />
                    </div>
                </div>

                <div className="flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#BEC9FF]">
                    <div className="flex gap-3 ">
                        <div className=" w-[50px] bg-[#FF1D86] rounded-full flex items-center justify-center ms-5">
                            <p className="text-[15px] font-bold">OT</p>
                        </div>
                        <div className="mt-1 text-[#000]">
                            <p className="text-[15px] font-bold">Omar Talha</p>
                            <p className="text-[10px] font-bold">8.5/10 points</p>
                        </div>
                    </div>

                    <div className="me-5">
                        <img src={prize3} alt='prize3' />
                    </div>
                </div>

                <div className="flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#F0F7FF]">
                    <div className="flex gap-3 ">
                        <div className=" w-[50px] bg-[#FF7E3E] rounded-full flex items-center justify-center ms-5">
                            <p className="text-[15px] font-bold">MA</p>
                        </div>
                        <div className="mt-1 text-[#000]">
                            <p className="text-[15px] font-bold">Mariyan Assain</p>
                            <p className="text-[10px] font-bold">7/10 points</p>
                        </div>
                    </div>

                    <div className="me-5">
                        <img src={prize3} alt='prize3' />
                    </div>
                </div>

            </div>

            <div className="ms-8 my-5 ">
                <div className="flex justify-between items-center">
                    <p className="text-[15px] font-bold">Assigned Evaluation</p>
                    <p className="flex gap-2 items-center text-[#8A8A8A] text-sm font-bold">View all
                        <img src={Polygon} alt='' />
                    </p>

                </div>

                <div className="flex bg-[#F0F7FF] py-5 mt-5 rounded-[20px]">
                    <div className=" w-16"></div>
                    <div>
                        <p className="text-[15px] font-bold">Product Lab</p>
                        <p className="text-[#F00] text-[10px] font-bold">Pending</p>
                    </div>
                </div>
                <div className="flex bg-[#F0F7FF] py-5 mt-5 rounded-[20px]">
                    <div className=" w-16"></div>
                    <div>
                        <p className="text-[15px] font-bold">Movie Lab</p>
                        <p className="text-[#F00] text-[10px] font-bold">Pending</p>
                    </div>
                </div>
                <div className="flex bg-[#F0F7FF] py-5 mt-5 rounded-[20px]">
                    <div className=" w-16"></div>
                    <div>
                        <p className="text-[15px] font-bold">Entrepreneurship Lab</p>
                        <p className="text-[#F00] text-[10px] font-bold">Pending</p>
                    </div>
                </div>
               
            </div>




        </div >

    );
};

export default AssignmentRightNev;

