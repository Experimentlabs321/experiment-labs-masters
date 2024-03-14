import React, { useContext, useEffect, useRef, useState } from "react";
import MyHelmet from "../../Components/MyHelmet/MyHelpmet";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/Logos/Group 2859890.png";
import users from "../../assets/PointsRedemptions/users.svg";
import usersDark from "../../assets/Dashboard/usersDark.png";
import enroll from "../../assets/PointsRedemptions/enroll.svg";
import book from "../../assets/PointsRedemptions/book.svg";
import dollar from "../../assets/PointsRedemptions/dollar.svg";
import message from "../../assets/PointsRedemptions/message.svg";
import shield from "../../assets/PointsRedemptions/shield.svg";
import sliders from "../../assets/PointsRedemptions/sliders.svg";
import award from "../../assets/PointsRedemptions/award.svg";
import pentool from "../../assets/PointsRedemptions/pen-tool.svg";
import gift from "../../assets/PointsRedemptions/gift.svg";
import feather from "../../assets/PointsRedemptions/feather.svg";
import DashboardIconLight from "../../assets/Dashboard/DashboardIconLight.svg";
import DashboardIconDark from "../../assets/Dashboard/DashboardIconDark.svg";
import SalesLight from "../../assets/Dashboard/SalesIconLight.png";
import SalesDark from "../../assets/Dashboard/SalesIconDark.png";
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
import AnnouncementsIconLight from "../../assets/Dashboard/AnnouncementsLight.png";
import AnnouncementsIconDark from "../../assets/Dashboard/AnnouncementsDark.png";
import CourseAccessIconLight from "../../assets/Dashboard/CourseAccessIconLight.svg";
import CourseAccessIconDark from "../../assets/Dashboard/CourseAccessIconDark.svg";
import bookLight from "../../assets/Dashboard/BookmarksLight.png";
import bookDark from "../../assets/Dashboard/bookDark.png";
import giftDark from "../../assets/Dashboard/giftDark.png";
import featherDark from "../../assets/Dashboard/featherDark.png";
import feedbackDark from "../../assets/Dashboard/feedbackDark.png";
import feedbackLight from "../../assets/Dashboard/feedbackLight.png";
import userPhoto from "../../assets/Dashboard/UserImage.png";
import liveClass from "../../assets/ExecutionMentor/liveClass.svg";
import liveClass1 from "../../assets/ExecutionMentor/liveClass1.svg";
import Schedule from "../../assets/ExecutionMentor/Schedule.svg";
import Schedule1 from "../../assets/ExecutionMentor/Schedule1.svg";
import dashboard from "../../assets/ExecutionMentor/dashboard.svg";
import Quizzes from "../../assets/ExecutionMentor/Quizzes.svg";
import Exams from "../../assets/ExecutionMentor/Exams.svg";
import Assignments from "../../assets/ExecutionMentor/Assignments.svg";
import Assignments1 from "../../assets/ExecutionMentor/Assignments1.svg";
import Batches from "../../assets/ExecutionMentor/Batches.svg";
import Doubts from "../../assets/ExecutionMentor/Doubts.svg";
import Doubts1 from "../../assets/ExecutionMentor/Doubts1.svg";
import redemption from "../../assets/UnpaidStudentDashboard/redemption.svg";
import redemption1 from "../../assets/UnpaidStudentDashboard/redemption1.svg";
import courseAccess from "../../assets/UnpaidStudentDashboard/courseAccess.svg";
import courseAccess1 from "../../assets/UnpaidStudentDashboard/courseAccess1.svg";
import resourceCenter from "../../assets/ExpertMentorDashboard/resourceCenter.svg";
import resourceCenter1 from "../../assets/ExpertMentorDashboard/resourceCenter1.svg";
import ShowcasePage from "../../assets/ExpertMentorDashboard/ShowcasePage.svg";
import ShowcasePage1 from "../../assets/ExpertMentorDashboard/ShowcasePage1.svg";
import Feedback from "../../assets/ExpertMentorDashboard/Feedback.svg";
import Feedback1 from "../../assets/ExpertMentorDashboard/Feedback1.svg";
import MentorClub from "../../assets/ExpertMentorDashboard/MentorClub.svg";
import incomeGateway from "../../assets/ExpertMentorDashboard/IncomeGateway.svg";
import StudentProgress from "../../assets/ExpertMentorDashboard/StudentProgress.svg";
import StudentProgress1 from "../../assets/ExpertMentorDashboard/StudentProgress1.svg";
import back from "../../assets/ContentManagement/back.svg";
import ArrowLeftIcon from "../../assets/Dashboard/dashboard_arrow-left.png";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import { useNotification } from "../../contexts/NotificationContext";
import Loading from "../Shared/Loading/Loading";

const Layout = ({ children }) => {
  const [toggleButton, setToggleButton] = useState(true);
  const [screenSmall, setScreenSmall] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [orgData, setOrgData] = useState({});
  const Role = localStorage.getItem("role");
  const createCoursePage = localStorage.getItem("createCoursePage");
  const { user, userInfo, logOut } = useContext(AuthContext);
  const [profImg, setprofImg] = useState(null);
  const [profName, setprofName] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [organizationNavDetails, setOrganizationNavDetails] = useState();
  const navigate = useNavigate();
  const sidebarRef = useRef();
  const {
    notifications,
    numberOfUnreadNotification,
    unreadNotifications,
    announcements,
    unreadAnnouncements,
    fetchNotifications,
  } = useNotification();
  //console.log(Role);
  const location = useLocation();
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (window.innerWidth <= 768) {
          // If the click is outside the sidebar and we're on a mobile device, hide the sidebar
          setToggleButton(true); // Assuming setToggleButton(true) hides the sidebar
        }
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);
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
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
        localStorage.setItem("organizationLogo", response?.data?.org_logo);
        localStorage.setItem("organizationFavicon", response?.data?.favicon);
        localStorage.setItem(
          "pWASplashscreenLogo",
          response?.data?.pWASplashscreenLogo
        );
        localStorage.setItem("pWALogo", response?.data?.pWALogo);
        localStorage.setItem("loginSubTitle", response?.data?.loginSubTitle);
        localStorage.setItem("loginTitle", response?.data?.loginTitle);
        localStorage.setItem(
          "loginPageOrgLogo",
          response?.data?.loginPageOrgLogo
        );
        localStorage.setItem(
          "loginSidebarImage",
          response?.data?.loginSidebarImage
        );
        localStorage.setItem("orgRootUrl", response?.data?.orgRootUrl);
        localStorage.setItem(
          "organizationName",
          response?.data?.organizationName
        );
        localStorage.setItem(
          "paymentNavbarLogo",
          response?.data?.paymentNavbarLogo
        );
      })
      .catch((error) => console.error(error));
    // axios
    //   .get(`${process.env.REACT_APP_SERVER_API}/api/v1/notifications`)
    //   .then((response) => {
    //     setNotifications(response?.data);
    //   })
    //   .catch((error) => console.error(error));
  }, [userInfo]);
  useEffect(() => {
    setprofImg(userInfo?.profileImg);
    setprofName(userInfo?.name);
  }, [userInfo?.name, userInfo?.profileImg]);
  const handleClick = () => {
    setToggleButton(!toggleButton);
  };
  useEffect(() => {
    if (userInfo) {
      //setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getNavItemsByOrganization/organizationId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setOrganizationNavDetails(response?.data);
        })
        .finally(() => {
          //  setAdminLoading(false);
        });
    }
    // setAdminLoading(false);
  }, [userInfo]);
  //console.log(organizationNavDetails)

  const { id } = useParams();
  const orgLogo = localStorage.getItem("organizationLogo");

  const formatNotificationCreationDate = (date) => {
    const currentDate = new Date();
    const givenDate = new Date(date);

    const diffInMilliseconds = currentDate - givenDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInMonths === 1) {
      return "1 month ago";
    } else if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    } else if (diffInYears === 1) {
      return "1 year ago";
    } else {
      return `${diffInYears} years ago`;
    }
  };

  const handleMarkAsRead = async (notification) => {
    Loading();
    const markAsRead = await axios.put(
      `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/makeAsRead/notificationId/${notification?._id}`,
      {
        userEmail: user?.email,
      }
    );

    if (markAsRead) {
      await fetchNotifications();
    }
    Loading().close();
  };

  return (
    <>
      <MyHelmet>Dashboard</MyHelmet>
      <div>
        <div className=" font-sansita">
          <nav
            className={`bg-[#01090d] border-b border-gray-200 fixed z-30 w-full lg:hidden ${toggleButton ? "" : "hidden"
              }`}
          >
            <div className=" relative px-3 py-3 lg:px-5 lg:pl-3">
              <div
                className={`flex items-center justify-between ${toggleButton ? "" : "hidden"
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
                {/*   <Badge badgeContent={4} color="primary">
                  <NotificationsIcon sx={{ color: "white" }} />
                </Badge> */}
                {/* <div className="absolute top-0 w-56 h-56 bg-white">
                  something
                </div> */}
                <div>
                  <img
                    // className="h-6 lg:h-8"
                    className="w-[100px]"
                    src={orgLogo}
                    alt="icon"
                  />
                  {/* <img className="h-6 lg:h-8" src={logo} alt="icon" /> */}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex overflow-hidden">
            <aside

              ref={sidebarRef}
              id="sidebar"
              className={`fixed ${toggleButton ? "hidden" : ""
                } z-20 h-full top-0 bg-[#141414] shadow-lg left-0 flex lg:flex flex-shrink-0 flex-col w-[324px] transition duration-500 ease-in-out delay-150`}
              aria-label="Sidebar"
            >
              <div className=" flex-1 flex flex-col min-h-0 pt-0">
                <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
                  <div className="flex-1 space-y-1">
                    <div className="py-2 relative w-full border-b border-[#303031] flex items-center justify-around">
                      <Link
                        className="hidden lg:block"
                        to={`${orgData?.orgRootUrl}`}
                      >
                        <img
                          // className="h-6 lg:h-8"
                          className="w-[100px]"
                          src={orgLogo}
                          alt="icon"
                        />
                      </Link>
                      <button
                        onClick={() => setShowNotification(!showNotification)}
                        // onBlur={() => setShowNotification(false)}
                        className="my-[20px]"
                      >
                        <Badge
                          badgeContent={unreadNotifications?.length}
                          color="primary"
                        >
                          <NotificationsIcon sx={{ color: "white" }} />
                        </Badge>
                      </button>
                      {showNotification && (
                        <div className="absolute z-10 top-[70px] w-[95%] h-80 rounded-md p-1 m-1 overflow-y-auto bg-white">
                          <h1 className="text-xl font-bold p-1">
                            Notifications
                          </h1>
                          {notifications?.map((notification, index) => (
                            <div
                              onClick={async () => {
                                await handleMarkAsRead(notification);
                                navigate(notification?.redirectLink);
                              }}
                              // to={notification?.redirectLink}
                              key={index}
                              className={` ${!notification?.readBy?.find(
                                (item) => item === user?.email
                              ) && "bg-sky-50"
                                } cursor-pointer p-1 my-2 border border-gray-500 shadow rounded flex `}
                            >
                              <p className="flex items-center gap-1 font-sans">
                                <span className="border rounded-full border-black">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="icon icon-tabler icon-tabler-bell-filled"
                                    width="44"
                                    height="44"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="#ffffff"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path
                                      d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z"
                                      stroke-width="0"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z"
                                      stroke-width="0"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                                <span>
                                  <span className=" text-base">
                                    {notification?.message}
                                  </span>
                                  <br />
                                  <span className=" text-xs font-semibold text-sky-500">
                                    {formatNotificationCreationDate(
                                      notification?.dateTime
                                    )}
                                  </span>
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
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
                              className={`${location.pathname === "/dashboard"
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
                              location.pathname === "/announcements"
                                ? {
                                  background:
                                    "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                }
                                : {}
                            }
                            to="/announcements"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/announcements" ? (
                              <img
                                className=""
                                src={AnnouncementsIconLight}
                                alt="icon"
                              />
                            ) : (
                              <img
                                className=""
                                src={AnnouncementsIconDark}
                                alt="icon"
                              />
                            )}

                            <span
                              className={`${location.pathname === "/announcements"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                            >
                              Announcements
                              <span className=" ml-5 ">
                                <Badge
                                  badgeContent={unreadAnnouncements?.length}
                                  color="error"
                                >
                                  <span className=" ml-5 "></span>
                                </Badge>
                              </span>
                            </span>
                          </Link>
                        </li>
                        {/*  <li>
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
                        </li> */}
                        {orgData?.showPointsAndRedemptions && (
                          <>
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
                                  className={`${location.pathname === "/earning"
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
                                  className={`${location.pathname === "/redemption"
                                      ? "text-white"
                                      : "text-[#8F8F8F]"
                                    } ml-3 text-[18px] font-[500]`}
                                >
                                  Redemption
                                </span>
                              </Link>
                            </li>
                          </>
                        )}
                        {orgData?.showSkillsManagement && (
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
                                className={`${location.pathname === "/skillAnalysis"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Skill Analysis
                              </span>
                            </Link>
                          </li>
                        )}
                        {/*  <li>
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
                        </li> */}
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
                              className={`${location.pathname === "/courseAccess"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                            >
                              Course Access
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            style={
                              location.pathname === "/applyCertificate"
                                ? {
                                  background:
                                    "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                }
                                : {}
                            }
                            to="/applyCertificate"
                            className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                          >
                            {location.pathname === "/applyCertificate" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-certificate"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#ffffff"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
                                <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
                                <path d="M6 9l12 0" />
                                <path d="M6 12l3 0" />
                                <path d="M6 15l2 0" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-certificate"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#9e9e9e"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
                                <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
                                <path d="M6 9l12 0" />
                                <path d="M6 12l3 0" />
                                <path d="M6 15l2 0" />
                              </svg>
                            )}

                            <span
                              className={`${location.pathname === "/applyCertificate"
                                  ? "text-white"
                                  : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                            >
                              Apply Certificate
                            </span>
                          </Link>
                        </li>
                      </ul>
                    )}

                    {Role === "admin" && (
                      <>
                        <ul className="space-y-2 px-[22px] py-2 text-white">
                          <li>
                            <Link
                              style={
                                location.pathname === "/adminDashboardHome"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/adminDashboardHome"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/adminDashboardHome" ? (
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
                                className={`${location.pathname === "/adminDashboardHome"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.dashboard?.newName
                                  ? organizationNavDetails?.dashboard?.newName
                                  : "Dashboard"}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/salesAndRevenue"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/salesAndRevenue"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/salesAndRevenue" ? (
                                <img className="" src={SalesLight} alt="icon" />
                              ) : (
                                <img className="" src={SalesDark} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname === "/salesAndRevenue"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Sales & Revenue
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/announcements"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/announcements"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/announcements" ? (
                                <img
                                  className=""
                                  src={AnnouncementsIconLight}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={AnnouncementsIconDark}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname === "/announcements"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.announcements?.newName
                                  ? organizationNavDetails?.announcements
                                    ?.newName
                                  : "Announcements"}

                                <span className=" ml-5 ">
                                  <Badge
                                    badgeContent={unreadAnnouncements?.length}
                                    color="error"
                                  >
                                    <span className=" ml-5 "></span>
                                  </Badge>
                                </span>
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
                                <img className="" src={book} alt="icon" />
                              ) : (
                                <img className="" src={bookDark} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname === "/courseAccess"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.contentManagement
                                  ?.newName
                                  ? organizationNavDetails?.contentManagement
                                    ?.newName
                                  : "Content Management"}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/pointsAndRedemptions" ||
                                  location.pathname === "/gamifiedSettings" ||
                                  location.pathname === "/earningLogics" ||
                                  location.pathname === "/redemptionLogics"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/pointsAndRedemptions "
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/pointsAndRedemptions" ? (
                                <img className="" src={gift} alt="icon" />
                              ) : (
                                <img className="" src={giftDark} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname ===
                                    "/pointsAndRedemptions" ||
                                    location.pathname === "/gamifiedSettings" ||
                                    location.pathname === "/earningLogics" ||
                                    location.pathname === "/redemptionLogics"
                                    ? "text-[#fff]"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.pointsAndRedemptions
                                  ?.newName
                                  ? organizationNavDetails?.pointsAndRedemptions
                                    ?.newName
                                  : "Points & Redemptions"}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/skillsManagement" ||
                                  location.pathname === "/skillsCreations" ||
                                  location.pathname === "/skillsImprovementEngine"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/skillsManagement "
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/skillsManagement" ? (
                                <img className="" src={users} alt="icon" />
                              ) : (
                                <img className="" src={usersDark} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname === "/skillsManagement" ||
                                    location.pathname === "/skillsCreations" ||
                                    location.pathname ===
                                    "/skillsImprovementEngine"
                                    ? "text-[#fff]"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.skillsManagement
                                  ?.newName
                                  ? organizationNavDetails?.skillsManagement
                                    ?.newName
                                  : "Skills Management"}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/feedback"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/feedback"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/feedback" ? (
                                <img
                                  className=""
                                  src={feedbackLight}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={feedbackDark}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname === "/feedback"
                                    ? "text-[#fff]"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.feedback?.newName
                                  ? organizationNavDetails?.feedback?.newName
                                  : "Feedback"}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/updateOrganization"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/updateOrganization"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/updateOrganization" ? (
                                <img className="" src={feather} alt="icon" />
                              ) : (
                                <img
                                  className=""
                                  src={featherDark}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname === "/updateOrganization"
                                    ? "text-[#fff]"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.updateOrganization
                                  ?.newName
                                  ? organizationNavDetails?.updateOrganization
                                    ?.newName
                                  : "Update Organization"}
                              </span>
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              style={
                                location.pathname === "/liveClasses" ||
                                location.pathname === "/upcomingClasses"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/liveClasses"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/liveClasses" ||
                              location.pathname === "/upcomingClasses" ? (
                                <img className="" src={liveClass} alt="icon" />
                              ) : (
                                <img className="" src={liveClass1} alt="icon" />
                              )}

                              <span
                                className={`${
                                  location.pathname === "/liveClasses" ||
                                  location.pathname === "/upcomingClasses"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Live Classes
                              </span>
                            </Link>
                          </li> */}
                          <li>
                            <Link
                              style={
                                location.pathname === "/schedule"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/schedule"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/schedule" ? (
                                <img className="" src={Schedule} alt="icon" />
                              ) : (
                                <img className="" src={Schedule1} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname === "/schedule"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.schedule?.newName
                                  ? organizationNavDetails?.schedule?.newName
                                  : "Schedule"}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/mentorAssignments" ||
                                  location.pathname ===
                                  `/assignmentEvaluation1/${id}` ||
                                  location.pathname ===
                                  `/assignmentEvaluation2/${id}`
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/mentorAssignments"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/mentorAssignments" ||
                                location.pathname ===
                                `/assignmentEvaluation1/${id}` ||
                                location.pathname ===
                                `/assignmentEvaluation2/${id}` ? (
                                <img
                                  className=""
                                  src={Assignments}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={Assignments1}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname === "/mentorAssignments" ||
                                    location.pathname ===
                                    `/assignmentEvaluation1/${id}` ||
                                    location.pathname ===
                                    `/assignmentEvaluation2/${id}`
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.assignments?.newName
                                  ? organizationNavDetails?.assignments?.newName
                                  : "Assignments"}
                              </span>
                            </Link>
                          </li>
                          {/*   <li>
                            <Link
                              style={
                                location.pathname ===
                                "/expertMentorResourceCentre"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/expertMentorResourceCentre"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname ===
                              "/expertMentorResourceCentre" ? (
                                <img
                                  className=""
                                  src={resourceCenter1}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={resourceCenter}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${
                                  location.pathname ===
                                  "/expertMentorResourceCentre"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Resource Centre
                              </span>
                            </Link>
                          </li> */}
                          {/*  <li>
                            <Link
                              style={
                                location.pathname ===
                                "/expertMentorStudentProgress"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/expertMentorStudentProgress"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname ===
                              "/expertMentorStudentProgress" ? (
                                <img
                                  className=""
                                  src={StudentProgress1}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={StudentProgress}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${
                                  location.pathname ===
                                  "/expertMentorStudentProgress"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Student Progress
                              </span>
                            </Link>
                          </li> */}
                          {/*  <li>
                            <Link
                              style={
                                location.pathname === "/addStudent"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/addStudent"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/addStudent" ? (
                                <img className="" src={users} alt="icon" />
                              ) : (
                                <img className="" src={usersDark} alt="icon" />
                              )}

                              <span
                                className={`${
                                  location.pathname === "/addStudent"
                                    ? "text-[#fff]"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Add Student
                              </span>
                            </Link>
                          </li> */}
                          {/*  <li>
                            <Link
                              style={
                                location.pathname === "/showcasePage"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/showcasePage"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/showcasePage" ? (
                                <img
                                  className=""
                                  src={ShowcasePage1}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={ShowcasePage}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${
                                  location.pathname === "/showcasePage"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Showcase Page
                              </span>
                            </Link>
                          </li> */}
                          <li>
                            <Link
                              style={
                                location.pathname === "/createCertificate"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/createCertificate"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/createCertificate" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="icon icon-tabler icon-tabler-certificate"
                                  width="44"
                                  height="44"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="#ffffff"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                  <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
                                  <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
                                  <path d="M6 9l12 0" />
                                  <path d="M6 12l3 0" />
                                  <path d="M6 15l2 0" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="icon icon-tabler icon-tabler-certificate"
                                  width="44"
                                  height="44"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="#9e9e9e"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                  <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" />
                                  <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" />
                                  <path d="M6 9l12 0" />
                                  <path d="M6 12l3 0" />
                                  <path d="M6 15l2 0" />
                                </svg>
                              )}

                              <span
                                className={`${location.pathname === "/createCertificate"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.createCertificate
                                  ?.newName
                                  ? organizationNavDetails?.createCertificate
                                    ?.newName
                                  : "Create Certificate"}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/myStudents"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/myStudents"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/myStudents" ? (
                                <img className="" src={users} alt="icon" />
                              ) : (
                                <img className="" src={usersDark} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname === "/myStudents"
                                    ? "text-[#fff]"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.myLearners?.newName
                                  ? organizationNavDetails?.myLearners?.newName
                                  : "My Learners"}
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/offers"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/offers"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/offers" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="icon icon-tabler icon-tabler-discount-2"
                                  width="44"
                                  height="44"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="#ffffff"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M9 15l6 -6" />
                                  <circle
                                    cx="9.5"
                                    cy="9.5"
                                    r=".5"
                                    fill="currentColor"
                                  />
                                  <circle
                                    cx="14.5"
                                    cy="14.5"
                                    r=".5"
                                    fill="currentColor"
                                  />
                                  <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="icon icon-tabler icon-tabler-discount-2"
                                  width="44"
                                  height="44"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="#9e9e9e"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M9 15l6 -6" />
                                  <circle
                                    cx="9.5"
                                    cy="9.5"
                                    r=".5"
                                    fill="currentColor"
                                  />
                                  <circle
                                    cx="14.5"
                                    cy="14.5"
                                    r=".5"
                                    fill="currentColor"
                                  />
                                  <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />
                                </svg>
                              )}

                              <span
                                className={`${location.pathname === "/offers"
                                    ? "text-[#fff]"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                {organizationNavDetails?.offers?.newName
                                  ? organizationNavDetails?.offers?.newName
                                  : "Offers"}
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </>
                    )}

                    {Role === "execution mentor" && (
                      <>
                        <ul className="space-y-2 px-[22px] py-2 text-white">
                          <li>
                            <Link
                              style={
                                location.pathname ===
                                  "/executionMentorDashboard" ||
                                  location.pathname === "/performanceFeedback" ||
                                  location.pathname === "/students" ||
                                  location.pathname ===
                                  "/studentsWhoNeedMoreGuidance" ||
                                  location.pathname === "/studentFeedback" ||
                                  location.pathname === "/departmentEvaluation"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/executionMentorDashboard"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname ===
                                "/executionMentorDashboard" ||
                                location.pathname === "/performanceFeedback" ||
                                location.pathname === "/students" ||
                                location.pathname ===
                                "/studentsWhoNeedMoreGuidance" ||
                                location.pathname === "/studentFeedback" ||
                                location.pathname === "/departmentEvaluation" ? (
                                <img className="" src={dashboard} alt="icon" />
                              ) : (
                                <img
                                  className=""
                                  src={DashboardIconDark}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname ===
                                    "/executionMentorDashboard" ||
                                    location.pathname ===
                                    "/performanceFeedback" ||
                                    location.pathname === "/students" ||
                                    location.pathname ===
                                    "/studentsWhoNeedMoreGuidance" ||
                                    location.pathname === "/studentFeedback" ||
                                    location.pathname === "/departmentEvaluation"
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
                                location.pathname === "/liveClasses" ||
                                  location.pathname === "/upcomingClasses"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/liveClasses"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/liveClasses" ||
                                location.pathname === "/upcomingClasses" ? (
                                <img className="" src={liveClass} alt="icon" />
                              ) : (
                                <img className="" src={liveClass1} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname === "/liveClasses" ||
                                    location.pathname === "/upcomingClasses"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Live Classes
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/schedule"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/schedule"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/schedule" ? (
                                <img className="" src={Schedule} alt="icon" />
                              ) : (
                                <img className="" src={Schedule1} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname === "/schedule"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Schedule
                              </span>
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              style={
                                location.pathname === "/quizzes"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/quizzes "
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/quizzes" ? (
                                <img className="" src={Quizzes} alt="icon" />
                              ) : (
                                <img className="" src={Quizzes} alt="icon" />
                              )}

                              <span
                                className={`${
                                  location.pathname === "/quizzes "
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Quizzes
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/exams"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/exams"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/exams" ? (
                                <img className="" src={Exams} alt="icon" />
                              ) : (
                                <img className="" src={Exams} alt="icon" />
                              )}

                              <span
                                className={`${
                                  location.pathname === "/exams"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Exams
                              </span>
                            </Link>
                          </li> */}
                          <li>
                            <Link
                              style={
                                location.pathname === "/mentorAssignments" ||
                                  location.pathname ===
                                  `/assignmentEvaluation1/${id}` ||
                                  location.pathname ===
                                  `/assignmentEvaluation2/${id}`
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/mentorAssignments"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/mentorAssignments" ||
                                location.pathname ===
                                `/assignmentEvaluation1/${id}` ||
                                location.pathname ===
                                `/assignmentEvaluation2/${id}` ? (
                                <img
                                  className=""
                                  src={Assignments}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={Assignments1}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname === "/mentorAssignments" ||
                                    location.pathname ===
                                    `/assignmentEvaluation1/${id}` ||
                                    location.pathname ===
                                    `/assignmentEvaluation2/${id}`
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Assignments
                              </span>
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              style={
                                location.pathname === "/batches"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/batches"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/batches" ? (
                                <img className="" src={Batches} alt="icon" />
                              ) : (
                                <img className="" src={Batches} alt="icon" />
                              )}

                              <span
                                className={`${
                                  location.pathname === "/batches"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Batches
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/doubts"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/doubts"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/doubts" ? (
                                <img className="" src={Doubts} alt="icon" />
                              ) : (
                                <img className="" src={Doubts1} alt="icon" />
                              )}

                              <span
                                className={`${
                                  location.pathname === "/doubts"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Doubts
                              </span>
                            </Link>
                          </li> */}
                        </ul>
                      </>
                    )}

                    {Role === "unpaid student" && (
                      <>
                        <ul className="space-y-2 px-[22px] py-2 text-white">
                          <li>
                            <Link
                              style={
                                location.pathname === "/unpaidStudentDashboard"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/unpaidStudentDashboard"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname ===
                                "/unpaidStudentDashboard" ? (
                                <img className="" src={dashboard} alt="icon" />
                              ) : (
                                <img
                                  className=""
                                  src={DashboardIconDark}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname ===
                                    "/unpaidStudentDashboard"
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
                                location.pathname === "/redemption"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/unpaidStudentRedemption"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/redemption" ? (
                                <img
                                  className=""
                                  src={redemption1}
                                  alt="icon"
                                />
                              ) : (
                                <img className="" src={redemption} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname === "/redemption"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                redemption
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/coursesAccess"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/coursesAccess"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/coursesAccess" ? (
                                <img
                                  className=""
                                  src={courseAccess1}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={courseAccess}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname === "/coursesAccess"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Courses Access
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </>
                    )}

                    {Role === "expert mentor" && (
                      <>
                        <ul className="space-y-2 px-[22px] py-2 text-white">
                          <li>
                            <Link
                              style={
                                location.pathname === "/expertMentorDashboard"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/expertMentorDashboard"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname ===
                                "/expertMentorDashboard" ? (
                                <img className="" src={dashboard} alt="icon" />
                              ) : (
                                <img
                                  className=""
                                  src={DashboardIconDark}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname === "/expertMentorDashboard"
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
                                location.pathname ===
                                  "/expertMentorResourceCentre"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/expertMentorResourceCentre"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname ===
                                "/expertMentorResourceCentre" ? (
                                <img
                                  className=""
                                  src={resourceCenter1}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={resourceCenter}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname ===
                                    "/expertMentorResourceCentre"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Resource Centre
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname ===
                                  "/expertMentorStudentProgress"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/expertMentorStudentProgress"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname ===
                                "/expertMentorStudentProgress" ? (
                                <img
                                  className=""
                                  src={StudentProgress1}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={StudentProgress}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname ===
                                    "/expertMentorStudentProgress"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Student Progress
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/showcasePage"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/showcasePage"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/showcasePage" ? (
                                <img
                                  className=""
                                  src={ShowcasePage1}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={ShowcasePage}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${location.pathname === "/showcasePage"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Showcase Page
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname ===
                                  "/expertMentorStudentFeedback"
                                  ? {
                                    background:
                                      "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                  }
                                  : {}
                              }
                              to="/expertMentorStudentFeedback"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname ===
                                "/expertMentorStudentFeedback" ? (
                                <img className="" src={Feedback1} alt="icon" />
                              ) : (
                                <img className="" src={Feedback} alt="icon" />
                              )}

                              <span
                                className={`${location.pathname ===
                                    "/expertMentorStudentFeedback"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                  } ml-3 text-[18px] font-[500]`}
                              >
                                Feedback
                              </span>
                            </Link>
                          </li>
                          {/* <li>
                            <Link
                              style={
                                location.pathname === "/mentorClub"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/mentorClub"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/mentorClub" ? (
                                <img
                                  className=""
                                  src={courseAccess1}
                                  alt="icon"
                                />
                              ) : (
                                <img className="" src={MentorClub} alt="icon" />
                              )}

                              <span
                                className={`${
                                  location.pathname === "/mentorClub"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Mentor Club
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              style={
                                location.pathname === "/incomeGateway"
                                  ? {
                                      background:
                                        "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                                    }
                                  : {}
                              }
                              to="/incomeGateway"
                              className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                            >
                              {location.pathname === "/incomeGateway" ? (
                                <img
                                  className=""
                                  src={courseAccess1}
                                  alt="icon"
                                />
                              ) : (
                                <img
                                  className=""
                                  src={incomeGateway}
                                  alt="icon"
                                />
                              )}

                              <span
                                className={`${
                                  location.pathname === "/incomeGateway"
                                    ? "text-white"
                                    : "text-[#8F8F8F]"
                                } ml-3 text-[18px] font-[500]`}
                              >
                                Income Gateway
                              </span>
                            </Link>
                          </li> */}
                        </ul>
                      </>
                    )}
                    <Link to={`/userprofile/${userInfo?.email}`}>
                      <div className="pt-[90px] flex items-center px-[42px]">
                        <img
                          className="w-[38px] rounded-full h-[42px] mr-[10px]"
                          src={profImg ? profImg : userPhoto}
                          alt="user"
                        />
                        <div>
                          <h2 className="text-white font-bold text-[16px]">
                            {profName ? profName : userInfo?.name}
                          </h2>
                          <p className="text-[#747475] text-[14px]">
                            {userInfo?.email}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={() => {
                        logOut()
                          .then((res) => {
                            console.log(res);
                            navigate(`/login/${userInfo?.organizationId}`);
                          })
                          .catch((error) => console.error(error));
                      }}
                      className="p-2 text-center w-full text-white rounded-lg text-[18px]  "
                    >
                      Logout
                    </button>
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
