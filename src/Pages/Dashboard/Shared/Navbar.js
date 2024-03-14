import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/Logos/Group 2859890.png";
import PersonProfilePic from "../../../assets/Dashboard/PersonProfilePic.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";

const Navbar = () => {
  const { userInfo } = useContext(AuthContext);
  const [orgData, setOrgData] = useState({});
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
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  return (
    <nav className={`bg-[#151718] fixed z-30 w-full }`}>
      <div className="px-[10px] py-[18px] lg:px-10 lg:pl-3">
        <div className={`flex items-center justify-between `}>
          {/* <button
                  id="toggleSidebarMobile"
                  ariaExpanded="true"
                  ariaControls="sidebar"
                  className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                  onClick={handleClick}
                >
                  <svg
                    id="toggleSidebarMobileHamburger"
                    className={`w-6 h-6 ${toggleButton ? "" : "hidden"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button> */}
          <div>
            {/* <img className="h-6 lg:h-8  " src={logo} alt="icon" /> */}
            <img
              className="h-6 lg:h-8"
              // className="w-[100px]"
              src={orgData?.org_logo}
              alt="icon"
            />
          </div>
          <div className="flex items-center justify-center">
            {/*  <div className="flex flex-col items-center justify-center mr-[20px] lg:mr-[60px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="39"
                viewBox="0 0 40 39"
                fill="none"
              >
                <path
                  d="M28.2999 25.9923V26.5641L28.7042 26.9684L31.1793 29.4435H8.855L11.33 26.9684L11.7344 26.5641V25.9923V17.9396C11.7344 13.4606 14.0619 10.0183 17.9196 9.10425L18.9818 8.85258V7.76098V6.66581C18.9818 6.09147 19.4428 5.63046 20.0171 5.63046C20.5915 5.63046 21.0525 6.09147 21.0525 6.66581V7.76098V8.8517L22.1136 9.104C25.9571 10.0178 28.2999 13.4779 28.2999 17.9396V25.9923ZM21.2288 33.8149C20.904 34.1008 20.4792 34.2751 20.0171 34.2751C19.5489 34.2751 19.123 34.1011 18.799 33.8149H21.2288Z"
                  stroke="white"
                  stroke-width="2.76093"
                />
              </svg>
              <h1 className="text-white mt-[6px] text-[14px] font-[500] ">
                Notification
              </h1>
            </div> */}
                  {
                    userInfo?.profileImg ? <img
                    className="w-[59px] h-[59px] md:w-[64px] md:h-[64px]  lg:w-[80px] rounded-full lg:h-[82px]"
                    src={userInfo?.profileImg}
                    alt="user"
                  /> : <div className="w-[59px] h-[59px] md:w-[64px] md:h-[64px]  lg:w-[80px] rounded-full lg:h-[82px] object-contain object-center  overflow-hidden">
                      <div
                        className="w-full h-full flex items-center text-red-50 justify-center text-xl md:text-3xl font-bold"
                        style={{ backgroundColor }}
                      >
                        {getInitials()}
                      </div>
                    </div>
                  }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
