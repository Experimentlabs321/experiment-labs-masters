import React, { useEffect, useState } from "react";
import MyHelmet from "../../Components/MyHelmet/MyHelpmet";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logos/Group 2859890.png";
import DashboardIconLight from "../../assets/Dashboard/DashboardIconLight.svg";
import DashboardIconDark from "../../assets/Dashboard/DashboardIconDark.svg";
import LeaderBoardIconLight from "../../assets/Dashboard/LeaderBoardIconLight.svg";
import LeaderBoardIconDark from "../../assets/Dashboard/LeaderBoardIconDark.svg";
import EarningIconLight from "../../assets/Dashboard/EarningIconLight.svg";
import EarningIconDark from "../../assets/Dashboard/EarningIconDark.svg";
import RedemptionIconLight from "../../assets/Dashboard/RedemptionIconLight.svg";
import RedemptionIconDark from "../../assets/Dashboard/RedemptionIconDark.svg";
import SkillAnalysisIconLight from "../../assets/Dashboard/SkillAnalysisIconLight.svg";
import SkillAnalysisIconDark from "../../assets/Dashboard/SkillAnalysisIconDark.svg";
import CareerAnalysisIconLight from "../../assets/Dashboard/CareerAnalysisIconLight.svg";
import CareerAnalysisIconDark from "../../assets/Dashboard/CareerAnalysisIconDark.svg";
import CourseAccessIconLight from "../../assets/Dashboard/CourseAccessIconLight.svg";
import CourseAccessIconDark from "../../assets/Dashboard/CourseAccessIconDark.svg";
import userPhoto from "../../assets/Dashboard/UserImage.png";
import ArrowLeftIcon from "../../assets/Dashboard/dashboard_arrow-left.png";

const Layout = ({ children }) => {
  const [toggleButton, setToggleButton] = useState(true);
  const [screenSmall, setScreenSmall] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const Role = localStorage.getItem("role");
  console.log(Role);
  const location = useLocation();
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

  const handleClick = () => {
    setToggleButton(!toggleButton);
  };
  return (
    <>
      <MyHelmet>Dashboard</MyHelmet>
      <div>
        <div className=" font-sansita">
          <nav
            className={`bg-[#25282c] border-b border-gray-200 fixed z-30 w-full lg:hidden ${
              toggleButton ? "" : "hidden"
            }`}
          >
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div
                className={`flex items-center justify-between ${
                  toggleButton ? "" : "hidden"
                }`}
              >
                <button
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
                </button>
                <div>
                  <img className="h-6 lg:h-8" src={logo} alt="icon" />
                </div>
              </div>
            </div>
          </nav>
          <div className="flex overflow-hidden">
            <aside
              id="sidebar"
              className={`fixed ${
                toggleButton ? "hidden" : ""
              } z-20 h-full top-0 bg-[#141414] shadow-lg left-0 flex lg:flex flex-shrink-0 flex-col w-[324px] transition duration-500 ease-in-out delay-150`}
              aria-label="Sidebar"
            >
              <div className=" flex-1 flex flex-col min-h-0 pt-0">
                <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
                  <div className="flex-1 space-y-1">
                    <div className="py-8 border-b border-[#303031] flex items-center justify-between lg:justify-center">
                      <Link className="hidden lg:block" to={"/"}>
                        <img className="h-6 lg:h-8" src={logo} alt="icon" />
                      </Link>
                      <p className="text-[#676767] ml-[27px] lg:hidden">Menu</p>
                      <button
                        id="toggleSidebarMobile"
                        ariaExpanded="true"
                        ariaControls="sidebar"
                        className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                        onClick={handleClick}
                      >
                        <img src={ArrowLeftIcon} alt="icon" />
                      </button>
                    </div>
                    {Role === "user" && (
                      <ul className="space-y-2 px-[22px] py-2 text-white">
                        <li>
                          <Link
                            style={
                              location.pathname === "/dashboard"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/dashboard"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/dashboard" ? (
                              <img
                                className=""
                                src={DashboardIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={DashboardIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/dashboard"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Dashboard
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/leaderBoard"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/leaderBoard"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/leaderBoard" ? (
                              <img
                                className=""
                                src={LeaderBoardIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={LeaderBoardIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/leaderBoard"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Leader Board
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/earning"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/earning"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/earning" ? (
                              <img
                                className=""
                                src={EarningIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={EarningIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/earning"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Earning
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/redemption"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/redemption"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/redemption" ? (
                              <img
                                className=""
                                src={RedemptionIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={RedemptionIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/redemption"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Redemption
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/skillAnalysis"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/skillAnalysis"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/skillAnalysis" ? (
                              <img
                                className=""
                                src={SkillAnalysisIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={SkillAnalysisIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/skillAnalysis"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Skill Analysis
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/careerAnalysis"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/careerAnalysis"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/careerAnalysis" ? (
                              <img
                                className=""
                                src={CareerAnalysisIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={CareerAnalysisIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/careerAnalysis"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Career Analysis
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/courseAccess"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/courseAccess"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/courseAccess" ? (
                              <img
                                className=""
                                src={CourseAccessIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={CourseAccessIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/courseAccess"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Course Access
                            </span>
                          </Link>
                        </li>
                      </ul>
                    )}
                    {Role === "admin" && (
                      <ul className="space-y-2 px-[22px] py-2 text-white">
                        <li>
                          <Link
                            style={
                              location.pathname === "/dashboard"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/dashboard"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/dashboard" ? (
                              <img
                                className=""
                                src={DashboardIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={DashboardIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/dashboard"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              User Management
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/leaderBoard"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/leaderBoard"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/leaderBoard" ? (
                              <img
                                className=""
                                src={LeaderBoardIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={LeaderBoardIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/leaderBoard"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Leader Board
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/earning"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/earning"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/earning" ? (
                              <img
                                className=""
                                src={EarningIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={EarningIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/earning"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Earning
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/redemption"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/redemption"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/redemption" ? (
                              <img
                                className=""
                                src={RedemptionIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={RedemptionIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/redemption"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Redemption
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/skillAnalysis"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/skillAnalysis"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/skillAnalysis" ? (
                              <img
                                className=""
                                src={SkillAnalysisIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={SkillAnalysisIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/skillAnalysis"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Skill Analysis
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/careerAnalysis"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/careerAnalysis"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/careerAnalysis" ? (
                              <img
                                className=""
                                src={CareerAnalysisIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={CareerAnalysisIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/careerAnalysis"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Career Analysis
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/courseAccess"
                                ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                : {}
                            }
                            to="/courseAccess"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/courseAccess" ? (
                              <img
                                className=""
                                src={CourseAccessIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={CourseAccessIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${
                                location.pathname === "/courseAccess"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                              } ml-3 text-[18px] font-[500]`}
                            >
                              Course Access
                            </span>
                          </Link>
                        </li>
                      </ul>
                    )}
                    <div className="pt-[90px] flex items-center px-[42px]">
                      <img
                        className="w-[37px] h-[56px] mr-[10px]"
                        src={userPhoto}
                        alt="user"
                      />
                      <div>
                        <h2 className="text-white text-[16px]">Akash Tiwari</h2>
                        <p className="text-[#747475] text-[14px]">
                          atiwari@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
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
