//AssignmentUpNev

import React, { useContext, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '../../../assets/Assignments/ChatIcon.svg'
import Rectangle5 from '../../../assets/Assignments/Rectangle5.svg'
import notification from '../../../assets/Assignments/notification.svg'




const AssignmentUpNev = () => {
   

    return (
        <div className="px-10  py-4 flex items-center  fixed w-[100%] justify-between bg-[#FFF] top-0  border-b ">
        

           <div className="border rounded-lg p-2">
             <SearchIcon/>
            <input type="text rounded-lg p-2" placeholder="Search"/>
           </div>


           <div className="flex items-center gap-10 me-80 ">
                   <div>
                   <img className="w-[100%]" src={ChatIcon} alt="ChatIcon"/> 
                   </div>
                 
                 <p className="bg-[#E6F2FE] rounded-3xl p-2 text-base text-[#0277FB] font-normal"><span>+</span> Add New Batch</p>
                 <div className="flex items-center gap-4">
                    <div>
                        <img src={Rectangle5} alt="Rectangle5"/>
                    </div>
                    <div>
                        <p className="text-lg font-medium">Shekhar Yadav</p>
                        <p className="text-[#9D9D9D] text-base font-medium">Mentor</p>
                    </div>
                 </div>
                 <div>
                     <img src={notification} alt="notification"/>
                 </div>
           </div>


        </div >

    );
};

export default AssignmentUpNev;

