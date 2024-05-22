import React, { useContext, useEffect, useState } from "react";
import MyHelmet from "../../../../Components/MyHelmet/MyHelpmet";
import Aside from "./Aside";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthProvider";

const Layout = ({ children }) => {
  const [screenSmall, setScreenSmall] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const { userInfo } = useContext(AuthContext);
  const [orgData, setOrgData] = useState({});
  const getInitials = () => {
    const firstNameInitial = userInfo?.name?.charAt(0)?.toUpperCase() || "";
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
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    if (windowWidth >= 1024) {
      setScreenSmall(false);
    } else {
      setScreenSmall(true);
    }
  }, [windowWidth]);
  // console.log(notifications);
  return (
    <>
      <MyHelmet>Dashboard</MyHelmet>
      <div>
        <div className=" font-sansita">
          <nav className={`bg-[#151718] fixed z-30 w-full }`}>
            <div className="px-[10px] py-[10px] md:py-[18px] lg:px-10 lg:pl-3">
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
                  <img
                    className=" h-12 lg:h-16  "
                    src={orgData?.org_logo}
                    alt="icon"
                  />
                  {/* <img
                    className="h-6 lg:h-8"
                    // className="w-[100px]"
                    src={orgData?.org_logo}
                    alt="icon"
                  /> */}
                </div>
                <div className="flex items-center justify-center">
                  {userInfo?.profileImg ? (
                    <img
                      className="w-[48px] h-[48px] md:w-[64px] md:h-[64px]  rounded-full"
                      src={userInfo?.profileImg}
                      alt="user"
                    />
                  ) : (
                    <div className="w-[48px] h-[48px] md:w-[64px] md:h-[64px]  rounded-full object-contain object-center  overflow-hidden">
                      <div
                        className="w-full h-full flex items-center text-red-50 justify-center text-xl md:text-3xl font-bold"
                        style={{ backgroundColor }}
                      >
                        {getInitials()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
          <div className="flex overflow-hidden">
            <Aside />
            <div
              className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
              id="sidebarBackdrop"
            ></div>
            <div
              id="main-content"
              className="h-full w-full relative lg:ml-[324px]"
            >
              <main className="min-h-[100vh]">
                <div className="">{children}</div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
