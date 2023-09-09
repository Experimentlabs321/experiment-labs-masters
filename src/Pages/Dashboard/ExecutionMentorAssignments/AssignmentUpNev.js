//AssignmentUpNev

import React, { useContext, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '../../../assets/ExecutionMentor/ChatIcon.svg'
import Rectangle5 from '../../../assets/ExecutionMentor/Rectangle5.svg'
import notification from '../../../assets/ExecutionMentor/notification.svg'
import { AuthContext } from "../../../contexts/AuthProvider";




const AssignmentUpNev = (props) => {
    console.log(props.page)
    const page = props.page;

    const {userInfo,user} = useContext(AuthContext);

    console.log(user.photoURL)
   

    return (
        <div className="px-10  py-4 flex items-center  fixed w-[100%] justify-between bg-[#FFF] top-0  border-b ">
        

           <div className="border rounded-lg p-2">
             <SearchIcon/>
            <input type="text rounded-lg p-2" placeholder="Search"/>
           </div>


           <div className="flex items-center gap-10 me-80 ">
                {
                 page === 'assignment' &&(
                       <>
                        <div>
                        <img className="w-[100%]" src={ChatIcon} alt="ChatIcon"/> 
                        </div>
                      
                      <p className="bg-[#E6F2FE] rounded-3xl p-2 text-base text-[#0277FB] font-normal"><span>+</span> Add New Batch</p>
                       </>
                    )
                }
                {
                 page === 'liveClasses' &&(
                       <>
                     
                      
                      <p className="bg-[#E6F2FE] rounded-3xl p-2 text-base text-[#0277FB] font-normal"><span className="me-2 ">+</span>Schedule a class</p>
                       </>
                    )
                }
                {
                 page === 'schedule' &&(
                       <>
                     
                      
                      <p className="bg-[#E6F2FE] rounded-3xl p-2 text-base text-[#0277FB] font-normal"><span className="me-2 ">+</span>New Upload</p>
                       </>
                    )
                }
                 <div className="flex items-center gap-4">
                    <div>
                        <img className="w-[62px] h-[46px]" src={user.photoURL} alt="Profile"/>
                    </div>
                    <div>
                        <p className="text-lg font-medium">{userInfo.name}</p>
                        <p className="text-[#9D9D9D] text-base font-medium">{userInfo.role}</p>
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

