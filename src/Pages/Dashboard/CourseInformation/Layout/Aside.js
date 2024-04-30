import React, { useRef, useState } from "react";
import StarLight from "../../../../assets/Dashboard/StarLight.png";
import StarDark from "../../../../assets/Dashboard/StarDark.png";
import WebinarsLight from "../../../../assets/Dashboard/WebinarsLight.png";
import WebinarsDark from "../../../../assets/Dashboard/WebinarsDark.png";
import BookmarksLight from "../../../../assets/Dashboard/BookmarksLight.png";
import BookmarksDark from "../../../../assets/Dashboard/BookmarksDark.png";
import DiscussionsLight from "../../../../assets/Dashboard/DiscussionsLight.png";
import DiscussionsDark from "../../../../assets/Dashboard/DiscussionsDark.png";
import CourseAccessIconLight from "../../../../assets/Dashboard/CourseAccessIconLight.svg";
import CourseAccessIconDark from "../../../../assets/Dashboard/CourseAccessIconDark.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from "react";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";

const Aside = () => {
  const [isCourseFullName, setCourseFullName] = useState("");
  const [isCourseDescription, setCourseDescription] = useState("");
  const [isCourseThumbnail, setCourseThumbnail] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const asideRef = useRef(null); // Create a ref for the aside element

  // Effect for handling clicks outside of the aside
  useEffect(() => {
    function handleClickOutside(event) {
      if (asideRef.current && !asideRef.current.contains(event.target)) {
        if (window.innerWidth <= 768) {
          // If the click is outside the sidebar and we're on a mobile device, hide the sidebar
          setToggleButton(false); // Assuming setToggleButton(true) hides the sidebar
        }
      }
    }

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setToggleButton]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${id}`)
      .then((response) => {
        // setCourseData(response?.data);

        console.log(response?.data);
        setCourseFullName(response?.data.courseFullName);
        setCourseDescription(response?.data.courseDescription);
        setCourseThumbnail(response?.data.courseThumbnail);
      })
      .catch((error) => console.error(error));
  }, [id]);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Category");
  const options = ["Category name"];

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setToggleButton(true)}
        className="text-black bg-blue font-normal rounded-r-[15px] ml-[-10px] flex items-center px-[20px] pt-[10px] pb-[5px] absolute top-[95px] z-10  group"
      >
        <MenuIcon /> <h1 className="ml-3 text-[12px] font-[500]">Open menu</h1>
      </button>
      <aside
      ref={asideRef}
        id="sidebar"
        className={` fixed ${
          toggleButton ? " lg:flex" : "hidden"
        } z-20 h-full top-0 bg-[#141414] shadow-lg left-0  lg:flex flex-shrink-0 flex-col w-[324px] transition duration-500 ease-in-out delay-150`}
        aria-label="Sidebar"
      >
        <div className=" flex-1 flex flex-col min-h-0 pt-0">
          <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
            <div className="flex-1 space-y-1">
              <ul className="space-y-2 px-[22px] pt-[110px] pb-2 text-white">
                <li className="lg:hidden block">
                  <button
                    onClick={() => setToggleButton(false)}
                    className="text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="17"
                      viewBox="0 0 21 17"
                      fill="none"
                    >
                      <path
                        d="M2.55758 6.94027C1.66762 6.94027 0.949219 7.65867 0.949219 8.54862C0.949219 9.43858 1.66762 10.157 2.55758 10.157C3.44753 10.157 4.16593 9.43858 4.16593 8.54862C4.16593 7.65867 3.44753 6.94027 2.55758 6.94027ZM2.55758 0.506836C1.66762 0.506836 0.949219 1.22524 0.949219 2.11519C0.949219 3.00515 1.66762 3.72355 2.55758 3.72355C3.44753 3.72355 4.16593 3.00515 4.16593 2.11519C4.16593 1.22524 3.44753 0.506836 2.55758 0.506836ZM2.55758 13.3737C1.66762 13.3737 0.949219 14.1028 0.949219 14.9821C0.949219 15.8613 1.67834 16.5904 2.55758 16.5904C3.43681 16.5904 4.16593 15.8613 4.16593 14.9821C4.16593 14.1028 3.44753 13.3737 2.55758 13.3737ZM5.77429 16.0543H20.7856V13.9098H5.77429V16.0543ZM5.77429 9.62086H20.7856V7.47639H5.77429V9.62086ZM5.77429 1.04296V3.18743H20.7856V1.04296H5.77429Z"
                        fill="white"
                      />
                    </svg>
                    <h1 className="ml-3 text-[18px] font-[500]">Hide menu</h1>
                  </button>
                </li>
                <li>
                  <div className="relative inline-block w-full mb-[10px]">
                    <div
                      className="flex items-center justify-center w-full "
                      onClick={toggleOptions}
                    >
                      <button className="cursor-pointer bg-[#FF557A] text-[15px] font-[700] py-3 px-4 rounded-full flex items-center justify-center shadow-[0px_2px_4px_0px_#00000026]">
                        {isCourseFullName}{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M8.71484 17.9847L14.5187 12.1808L8.71484 6.37695"
                            stroke="white"
                            stroke-width="1.93462"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                      {/* <span className="text-[#3E4DAC] ">{selectedOption}</span> */}
                    </div>
                    {isOpen && (
                      <ul className="absolute top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100">
                        {options?.map((option, index) => (
                          <li
                            key={index}
                            className="cursor-pointer py-2 text-[#6A6A6A] text-[14px] font-[400] "
                            onClick={() => selectOption(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
                <li>
                  <div className="bg-[#09463F] py-[15px] px-[20px] rounded-[15px] mb-[15px] ">
                    <img src={isCourseThumbnail} alt="CourseThem" />
                    <div className=" py-[15px] ">
                      <h1 className="text-[#FFDB70] text-[15px] font-[700] ">
                        {isCourseFullName}
                      </h1>
                      <p className="text-[#DFDFDF] text-[10px] font-[500] ">
                        {isCourseDescription}
                      </p>
                    </div>

                    {/*   <div>
                    <div className="w-full">
                      <small className="text-[#AEB9FF] pb-[10px] font-[600]">
                        20% Completed
                      </small>
                      <div className="relative w-full">
                        <div className="w-full bg-[#D9D9D9] rounded-lg h-[10px]">
                          <div
                            className="bg-[#3E4DAC] h-[10px] rounded-lg"
                            // className="bg-cyan-600 h-2 rounded-sm"
                            // style={{ width: `${p}%` }}
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center font-sans mt-[15px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_2797_8659)">
                          <path
                            d="M13.869 8.35536V5.64689C13.869 5.22128 13.5208 4.87305 13.0952 4.87305H3.809C3.38339 4.87305 3.03516 5.22128 3.03516 5.64689V13.3854C3.03516 13.811 3.38339 14.1592 3.809 14.1592H13.0952C13.5208 14.1592 13.869 13.811 13.869 13.3854V10.6769L16.9644 13.7723V5.25997L13.869 8.35536Z"
                            fill="#FF557A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2797_8659">
                            <rect
                              width="18.5723"
                              height="18.5723"
                              fill="white"
                              transform="translate(0.714844 0.229492)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <h1 className="ml-1 text-[12px] font-[500] ">
                        19 Classes left
                      </h1>
                    </div>
                    <div className="flex items-center font-sans mt-[15px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M5.44171 5.32393V9.1463H4.75069V5.32393H5.44171Z"
                          stroke="#FF557A"
                          stroke-width="5.57169"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.7073 9.1463H11.0163V5.32393H11.7073V9.1463Z"
                          stroke="#FF557A"
                          stroke-width="5.57169"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <h1 className="ml-1 text-[12px] font-[500] ">
                        4 readings left
                      </h1>
                    </div>
                    <div className="flex items-center font-sans mt-[15px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M4.46693 1.7998C4.13485 1.7998 3.81638 1.93172 3.58157 2.16653C3.34676 2.40134 3.21484 2.71982 3.21484 3.05189V13.0686C3.21484 13.4006 3.34676 13.7191 3.58157 13.9539C3.81638 14.1887 4.13485 14.3206 4.46693 14.3206H11.9794C12.3115 14.3206 12.63 14.1887 12.8648 13.9539C13.0996 13.7191 13.2315 13.4006 13.2315 13.0686V5.55606L9.47526 1.7998H4.46693ZM9.47526 6.1821H8.84922V3.05189L11.9794 6.1821H9.47526Z"
                          fill="#FF557A"
                        />
                      </svg>
                      <h1 className="ml-1 text-[12px] font-[500] ">
                        15 Assignments left
                      </h1>
                    </div>
                    <div className="flex items-center font-sans mt-[15px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M11.1581 12.9668H6.97938C6.84084 12.9668 6.70798 13.0218 6.61002 13.1198C6.51206 13.2177 6.45703 13.3506 6.45703 13.4891V15.0562C6.45732 15.1526 6.48432 15.2471 6.53503 15.3292C6.58574 15.4113 6.65818 15.4777 6.74432 15.5211L7.78901 16.0434C7.86179 16.0807 7.9423 16.1004 8.02407 16.1009H10.1135C10.1935 16.0996 10.2721 16.0799 10.3433 16.0434L11.388 15.5211C11.4751 15.4784 11.5486 15.4123 11.6003 15.3302C11.6519 15.2481 11.6797 15.1532 11.6805 15.0562V13.4891C11.6805 13.3506 11.6255 13.2177 11.5275 13.1198C11.4295 13.0218 11.2967 12.9668 11.1581 12.9668Z"
                          fill="#FF557A"
                        />
                        <path
                          d="M12.5158 2.94338C12.0691 2.47984 11.5336 2.11099 10.9413 1.85881C10.3491 1.60664 9.71205 1.47631 9.06831 1.47559C7.82149 1.47559 6.62574 1.97088 5.74411 2.85251C4.86248 3.73414 4.36719 4.92989 4.36719 6.1767C4.40946 7.05146 4.65444 7.90443 5.0828 8.6683C5.21861 8.95559 5.3492 9.22721 5.44844 9.50405L6.49314 12.1158C6.53184 12.213 6.59884 12.2963 6.68546 12.355C6.77207 12.4136 6.8743 12.445 6.97892 12.4449H11.1577C11.2623 12.445 11.3645 12.4136 11.4512 12.355C11.5378 12.2963 11.6048 12.213 11.6435 12.1158L12.6882 9.50405C12.8031 9.20631 12.9337 8.92947 13.0538 8.65785C13.4597 7.88853 13.7033 7.04403 13.7694 6.1767C13.7893 5.58108 13.6885 4.98759 13.473 4.43193C13.2576 3.87628 12.932 3.36994 12.5158 2.94338ZM11.1577 7.74374H9.59065V9.31078C9.59065 9.44932 9.53562 9.58218 9.43766 9.68014C9.3397 9.7781 9.20684 9.83313 9.06831 9.83313C8.92977 9.83313 8.79691 9.7781 8.69895 9.68014C8.60099 9.58218 8.54596 9.44932 8.54596 9.31078V7.74374H6.97892C6.88944 7.74437 6.80129 7.72199 6.72294 7.67877C6.64459 7.63554 6.57866 7.57291 6.53147 7.49688C6.48427 7.42084 6.45741 7.33396 6.45344 7.24457C6.44947 7.15517 6.46854 7.06625 6.50881 6.98634L7.5535 4.89695C7.59731 4.81002 7.66453 4.73705 7.7476 4.68629C7.83067 4.63553 7.92627 4.60899 8.02361 4.60966H10.113C10.2515 4.60966 10.3844 4.6647 10.4824 4.76266C10.5803 4.86062 10.6353 4.99348 10.6353 5.13201C10.6353 5.27055 10.5803 5.40341 10.4824 5.50137C10.3844 5.59932 10.2515 5.65436 10.113 5.65436H8.34747L7.82512 6.69905H11.1577C11.2962 6.69905 11.4291 6.75408 11.527 6.85204C11.625 6.95 11.68 7.08286 11.68 7.2214C11.68 7.35993 11.625 7.49279 11.527 7.59075C11.4291 7.68871 11.2962 7.74374 11.1577 7.74374Z"
                          fill="#FF557A"
                        />
                      </svg>
                      <h1 className="ml-1 text-[12px] font-[500] ">
                        4 Quiz left
                      </h1>
                    </div>
                    <div className="flex items-center font-sans mt-[15px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_2797_8679)">
                          <path
                            d="M13.2522 7.43293C13.2522 7.30979 13.3011 7.19169 13.3882 7.10461C13.4753 7.01754 13.5934 6.96862 13.7165 6.96862H14.5987C14.4917 5.41089 13.8276 3.94372 12.7278 2.83538C11.628 1.72705 10.166 1.05163 8.60915 0.932617V1.86123C8.60915 1.98438 8.56023 2.10247 8.47316 2.18955C8.38608 2.27662 8.26798 2.32554 8.14484 2.32554C8.0217 2.32554 7.9036 2.27662 7.81653 2.18955C7.72945 2.10247 7.68053 1.98438 7.68053 1.86123V0.932617C6.11541 1.04094 4.64227 1.71165 3.53292 2.821C2.42356 3.93036 1.75285 5.4035 1.64453 6.96862H2.57315C2.69629 6.96862 2.81439 7.01754 2.90146 7.10461C2.98854 7.19169 3.03745 7.30979 3.03745 7.43293C3.03745 7.55607 2.98854 7.67417 2.90146 7.76124C2.81439 7.84832 2.69629 7.89724 2.57315 7.89724H1.64453C1.75285 9.46236 2.42356 10.9355 3.53292 12.0449C4.64227 13.1542 6.11541 13.8249 7.68053 13.9332V13.0046C7.68053 12.8815 7.72945 12.7634 7.81653 12.6763C7.9036 12.5892 8.0217 12.5403 8.14484 12.5403C8.26798 12.5403 8.38608 12.5892 8.47316 12.6763C8.56023 12.7634 8.60915 12.8815 8.60915 13.0046V13.8868C10.1586 13.7692 11.6147 13.1004 12.7135 12.0016C13.8123 10.9028 14.4811 9.4467 14.5987 7.89724H13.7165C13.5934 7.89724 13.4753 7.84832 13.3882 7.76124C13.3011 7.67417 13.2522 7.55607 13.2522 7.43293ZM11.2603 4.46136L8.4745 7.71151C8.4404 7.74852 8.39939 7.77849 8.35378 7.79973C8.34498 7.80998 8.33383 7.81795 8.32128 7.82295C8.26901 7.86103 8.20861 7.88646 8.14484 7.89724H5.8233C5.70016 7.89724 5.58206 7.84832 5.49499 7.76124C5.40791 7.67417 5.35899 7.55607 5.35899 7.43293C5.35899 7.30979 5.40791 7.19169 5.49499 7.10461C5.58206 7.01754 5.70016 6.96862 5.8233 6.96862H7.93126L10.5778 3.88097C10.6579 3.78738 10.7718 3.72943 10.8946 3.71985C11.0173 3.71027 11.1389 3.74986 11.2325 3.8299C11.3261 3.90994 11.384 4.02388 11.3936 4.14666C11.4032 4.26943 11.3636 4.39098 11.2836 4.48457L11.2603 4.46136Z"
                            fill="#FF557A"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2797_8679">
                            <rect
                              width="14.8579"
                              height="14.8579"
                              fill="white"
                              transform="translate(0.714844 0.00390625)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <h1 className="ml-1 text-[12px] font-[500] ">
                        6 Live Test left
                      </h1>
                    </div>
                  </div> */}
                  </div>
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
                      <img className="" src={CourseAccessIconDark} alt="icon" />
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
                <li>
                  <button className="flex gap-2 justify-items-center items-center ml-3 text-[18px] font-[500] mt-5" onClick={()=>navigate(-1)}>
                    <ArrowBackIcon/>
                  Go Back
                  </button>
                  
                </li>
                {/* <li>
                  <Link
                    style={
                      location.pathname === "/questLevels"
                        ? {
                            background:
                              "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                          }
                        : {}
                    }
                    to="/questLevels"
                    className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                  >
                    {location.pathname === "/questLevels" ? (
                      <img className="" src={StarLight} alt="icon" />
                    ) : (
                      <img className="" src={StarDark} alt="icon" />
                    )}

                    <span
                      className={`${
                        location.pathname === "/questLevels"
                          ? "text-white"
                          : "text-[#8F8F8F]"
                      } ml-3 text-[18px] font-[500]`}
                    >
                      Quest Levels
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    style={
                      location.pathname === "/webinars"
                        ? {
                            background:
                              "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                          }
                        : {}
                    }
                    to="/webinars"
                    className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                  >
                    {location.pathname === "/webinars" ? (
                      <img className="" src={WebinarsLight} alt="icon" />
                    ) : (
                      <img className="" src={WebinarsDark} alt="icon" />
                    )}

                    <span
                      className={`${
                        location.pathname === "/webinars"
                          ? "text-white"
                          : "text-[#8F8F8F]"
                      } ml-3 text-[18px] font-[500]`}
                    >
                      Webinars
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    style={
                      location.pathname === "/bookmarks"
                        ? {
                            background:
                              "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                          }
                        : {}
                    }
                    to="/bookmarks"
                    className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                  >
                    {location.pathname === "/bookmarks" ? (
                      <img className="" src={BookmarksLight} alt="icon" />
                    ) : (
                      <img className="" src={BookmarksDark} alt="icon" />
                    )}

                    <span
                      className={`${
                        location.pathname === "/bookmarks"
                          ? "text-white"
                          : "text-[#8F8F8F]"
                      } ml-3 text-[18px] font-[500]`}
                    >
                      Bookmarks
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    style={
                      location.pathname === "/discussions"
                        ? {
                            background:
                              "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
                          }
                        : {}
                    }
                    to="/discussions"
                    className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group`}
                  >
                    {location.pathname === "/discussions" ? (
                      <img className="" src={DiscussionsLight} alt="icon" />
                    ) : (
                      <img className="" src={DiscussionsDark} alt="icon" />
                    )}

                    <span
                      className={`${
                        location.pathname === "/discussions"
                          ? "text-white"
                          : "text-[#8F8F8F]"
                      } ml-3 text-[18px] font-[500]`}
                    >
                      Discussions
                    </span>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
