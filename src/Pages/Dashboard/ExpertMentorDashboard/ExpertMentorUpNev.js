//ExpertMentorUpNev

import React, { useContext, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '../../../assets/ExecutionMentor/ChatIcon.svg'

import notification from '../../../assets/ExecutionMentor/notification.svg'
import chat from '../../../assets/ExpertMentorDashboard/chat.svg'




const ExpertMentorUpNev = (props) => {
    console.log(props.page)
    const page = props.page;


    return (
        <div className="px-10  py-4 flex items-center  fixed w-[100%] justify-between bg-[#FFF] top-0  border-b ">
            <div>
                <p className="flex items-center gap-2 text-lg font-semibold"><span><img src={chat} alt="icon" /></span> New Message from Shalini Gupta</p>
            </div>




            <div className="flex items-center gap-5 me-80 ">
                <div className="border rounded-lg p-2">
                    <SearchIcon />
                    <input type="text rounded-lg p-2" placeholder="Search" />
                </div>
                <div className=" w-[80px]">
                    <p className="text-[#676767] text-sm font-semibold w-[50%]">Content
                        Changed</p>
                </div>

                
                <div>
                    <img src={notification} alt="notification" />
                </div>
            </div>


        </div >

    );
};

export default ExpertMentorUpNev;

