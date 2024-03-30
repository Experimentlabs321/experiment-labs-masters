//AssignmentUpNev

import React, { useContext, useState,useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "../../../assets/ExecutionMentor/ChatIcon.svg";
import Rectangle5 from "../../../assets/ExecutionMentor/Rectangle5.svg";
import notification from "../../../assets/ExecutionMentor/notification.svg";
import { AuthContext } from "../../../contexts/AuthProvider";

const AssignmentUpNev = (props) => {
  //console.log(props.page)
  const page = props.page;

  const { userInfo, user } = useContext(AuthContext);
  const getInitials = () => {
    const firstNameInitial =
      userInfo?.name?.charAt(0)?.toUpperCase() || "";
    const lastNameInitial = userInfo?.lastName?.charAt(0)?.toUpperCase() || "";
    return `${firstNameInitial}${lastNameInitial}`;
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [backgroundColor, setBackgroundColor] = useState("");
  useEffect(() => {
    // Generate a random background color if it hasn't been generated yet
    if (!backgroundColor) {
      setBackgroundColor(getRandomColor());
    }
    // Your existing useEffect logic...
  }, [userInfo, backgroundColor]);
  //  console.log(user.photoURL)

  return (
    <div className="px-10  py-4 flex items-center  fixed w-[100%] justify-between bg-[#FFF] top-0 z-10  border-b ">
      <div className=" p-2">
        <p className="w-[10px]"></p>
        {/*  <SearchIcon />
        <input type="text rounded-lg p-2" placeholder="Search" /> */}
      </div>

      <div className="flex items-center gap-10 me-80 ">
        {page === "assignment" && (
          <>
            {/*   <div>
              <img className="w-[100%]" src={ChatIcon} alt="ChatIcon" />
            </div> */}

            {/*  <p className="bg-[#E6F2FE] rounded-3xl p-2 text-base text-[#0277FB] font-normal">
              <span>+</span> Add New Batch
            </p> */}
          </>
        )}
        {page === "liveClasses" && (
          <>
            <p className="bg-[#E6F2FE] rounded-3xl p-2 text-base text-[#0277FB] font-normal">
              <span className="me-2 ">+</span>Schedule a class
            </p>
          </>
        )}
        {page === "schedule" && (
          <>
            {/*  <p className="bg-[#E6F2FE] rounded-3xl p-2 text-base text-[#0277FB] font-normal">
              <span className="me-2 ">+</span>New Upload
            </p> */}
          </>
        )}
        <div>
          {
            userInfo?.profileImg ? <img
              className="w-[59px] h-[59px] md:w-[64px] md:h-[64px]  lg:w-[69px] rounded-full lg:h-[72px]"
              src={userInfo?.profileImg}
              alt="user"
            /> : <div className="w-[59px] h-[59px] md:w-[64px] md:h-[64px]  lg:w-[69px] rounded-full lg:h-[72px] object-contain object-center  overflow-hidden">
              <div
                className="w-full h-full flex items-center text-red-50 justify-center text-xl md:text-2xl font-bold"
                style={{ backgroundColor }}
              >
                {getInitials()}
              </div>
            </div>
          }
          <div>
            <p className="text-lg font-medium">{userInfo.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentUpNev;
