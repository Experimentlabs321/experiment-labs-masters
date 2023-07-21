import React, { useState } from "react";
import Completed from "../../../assets/Dashboard/Completed.png";
import Pending from "../../../assets/Dashboard/Pending.png";
import InProgress from "../../../assets/Dashboard/InProgress.png";
import TaskVideo from "../../../assets/Dashboard/TaskVideo.png";
import Task from "../../../assets/Dashboard/Task.png";
import Layout from "./Layout/Layout";
import { Link } from "react-router-dom";

const CourseInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const Role = localStorage.getItem("role");
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
    <div>
      <Layout>
        <div>
          {Role === "admin" && (
            <div>
              <div className="pt-[110px] border-b-2 ">
                <div className="container mx-auto px-4 flex items-center justify-between ">
                  <div className="flex items-center pt-[30px] pb-[40px] ">
                    <button className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline ">
                      My Courses
                    </button>
                    <svg
                      className="mr-[30px]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M9 18.667L15 12.667L9 6.66699"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <button className=" font-sans mr-[30px] text-[20px] font-[400] ">
                      Task Name
                    </button>
                  </div>
                  <div className="flex items-center mt-[-10px] ">
                    <div className="flex items-center text-black text-[16px] font-[600] mr-[32px] ">
                      <h1 className="mr-[16px]">Preview Mode</h1>
                      {preview ? (
                        <svg
                          className="cursor-pointer"
                          onClick={() => setPreview(!preview)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="58"
                          height="27"
                          viewBox="0 0 58 27"
                          fill="none"
                        >
                          <rect
                            width="57.8422"
                            height="26.7841"
                            rx="13.392"
                            fill="#9747FF"
                          />
                          <circle
                            cx="44.4512"
                            cy="13.3916"
                            r="10.1153"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="cursor-pointer"
                          onClick={() => setPreview(!preview)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="58"
                          height="28"
                          viewBox="0 0 58 28"
                          fill="none"
                        >
                          <rect
                            y="0.608398"
                            width="57.8422"
                            height="26.7841"
                            rx="13.392"
                            fill="#A3A3A3"
                          />
                          <circle
                            cx="13.3926"
                            cy="14"
                            r="10.1153"
                            fill="white"
                          />
                        </svg>
                      )}
                    </div>
                    {!preview && (
                      <>
                        <button className="flex items-center bg-[#FF557A] text-[16px] font-[700] text-white p-[16px] rounded-[20px] mr-[32px] ">
                          <svg
                            className="mr-[16px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                          >
                            <path
                              d="M19.8438 11H13.8438V5H11.8438V11H5.84375V13H11.8438V19H13.8438V13H19.8438V11Z"
                              fill="white"
                            />
                          </svg>
                          <h1 className="mr-[12px]">Add Chapter</h1>
                        </button>
                        <button className="flex items-center bg-[#3E4DAC] text-[16px] font-[700] text-white p-[16px] rounded-[20px] ">
                          <svg
                            className="mr-[16px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M12.6267 0.665039L15.8438 3.81149L13.3913 6.21118L10.1742 3.06473L12.6267 0.665039ZM0.84375 15.3359H4.06079L11.875 7.69316L8.65795 4.54671L0.84375 12.1894V15.3359Z"
                              fill="white"
                            />
                          </svg>
                          <h1 className="mr-[12px]">Edit Course</h1>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="px-4">
            <div
              className={`relative inline-block ${
                Role === "user" ? "mt-[130px]" : "mt-[40px]"
              }  w-[400px] mb-[10px] flex items-center gap-[32px] `}
            >
              <div className=" " onClick={toggleOptions}>
                <button className="cursor-pointer bg-[#FFDB70] text-[15px] font-[600] py-[20px] px-[25px] rounded-[15px] flex items-center justify-center shadow-[0px_2px_4px_0px_#00000026]">
                  Week 1: Week Name{" "}
                  <svg
                    className="ml-[20px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_3016_13126)">
                      <path
                        d="M1.52352 5.08398L5.82231 9.38277L10.1211 5.08398"
                        stroke="#282828"
                        stroke-width="1.43293"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3016_13126">
                        <rect
                          width="12.5818"
                          height="12.5818"
                          fill="white"
                          transform="matrix(0 1 -1 0 12.6328 0.890625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
              {Role === "admin" && !preview && (
                <>
                  <button className="bg-black rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M19.6641 11.2275H13.6641V5.22754H11.6641V11.2275H5.66406V13.2275H11.6641V19.2275H13.6641V13.2275H19.6641V11.2275Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <circle cx="14.6641" cy="14.2275" r="14" fill="#172D6E" />
                    <path
                      d="M18.8571 6.82129L21.6209 9.58506L19.514 11.6929L16.7502 8.92912L18.8571 6.82129ZM8.73438 19.7078H11.4981L18.2113 12.9946L15.4476 10.2309L8.73438 16.9441V19.7078Z"
                      fill="white"
                    />
                  </svg>
                </>
              )}
              {isOpen && (
                <ul className="absolute top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100">
                  {options.map((option, index) => (
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
            <div>
              <div className="relative">
                <div className="flex items-center justify-between mt-[60px]">
                  <div className="flex items-center ">
                    <div className="w-[85px] rounded-full flex items-center justify-center h-[85px] bg-[#E1E6FF] ">
                      <h1 className="text-[35px] font-[600] ">1</h1>
                    </div>
                    <h1 className="text-[23px] font-[700] ml-[40px] ">
                      Topic 1{" "}
                      {Role === "admin" && !preview && (
                        <button className="ml-[24px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                          >
                            <path
                              d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                              fill="#282828"
                            />
                          </svg>
                        </button>
                      )}
                    </h1>
                  </div>
                  {Role === "user" && (
                    <button className="bg-[#E1E6FF] w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] ">
                      In Progress
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between my-[60px] relative z-10 ">
                  <div className="flex items-center">
                    <div className="w-[85px] flex items-center justify-center ">
                      {Role === "user" && (
                        <img src={Completed} alt="Completed" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <img
                        className="ml-[60px] mr-[30px] "
                        src={Task}
                        alt="Task"
                      />
                      <div className="">
                        <h1 className="text-[#3E4DAC] text-[22px] font-[700] ">
                          Task 1
                        </h1>
                        <p className="text-[#626262] text-[18px] font-[500] ">
                          Reading
                        </p>
                      </div>
                    </div>
                  </div>
                  {Role === "admin" && !preview && (
                    <button className=" mr-[25px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="31"
                        viewBox="0 0 30 31"
                        fill="none"
                      >
                        <path
                          d="M15.0166 12.6104C13.6432 12.6104 12.5195 13.734 12.5195 15.1074C12.5195 16.4808 13.6432 17.6045 15.0166 17.6045C16.39 17.6045 17.5137 16.4808 17.5137 15.1074C17.5137 13.734 16.39 12.6104 15.0166 12.6104ZM15.0166 5.11914C13.6432 5.11914 12.5195 6.24282 12.5195 7.61621C12.5195 8.9896 13.6432 10.1133 15.0166 10.1133C16.39 10.1133 17.5137 8.9896 17.5137 7.61621C17.5137 6.24282 16.39 5.11914 15.0166 5.11914ZM15.0166 20.1016C13.6432 20.1016 12.5195 21.2252 12.5195 22.5986C12.5195 23.972 13.6432 25.0957 15.0166 25.0957C16.39 25.0957 17.5137 23.972 17.5137 22.5986C17.5137 21.2252 16.39 20.1016 15.0166 20.1016Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[30px] left-[174px] " />
                <div className="flex items-center justify-between my-[60px] ">
                  <div className="flex items-center">
                    <div className="w-[85px] flex items-center justify-center ">
                      {Role === "user" && (
                        <img src={InProgress} alt="InProgress" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="relative ">
                        <img
                          className="ml-[60px] mr-[30px] relative z-10 "
                          src={Task}
                          alt="Task"
                        />
                        {Role === "user" && (
                          <div className="w-[80.16px] h-[79.10px] rounded-[14.77px] border-4 border-emerald-500 absolute top-1 right-[20.5px] z-0 " />
                        )}
                      </div>
                      <div className="">
                        <h1 className="text-[#3E4DAC] text-[22px] font-[700] ">
                          Task 2
                        </h1>
                        <p className="text-[#626262] text-[18px] font-[500] ">
                          Reading
                        </p>
                      </div>
                    </div>
                  </div>
                  {Role === "admin" && !preview && (
                    <button className=" mr-[25px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="31"
                        viewBox="0 0 30 31"
                        fill="none"
                      >
                        <path
                          d="M15.0166 12.6104C13.6432 12.6104 12.5195 13.734 12.5195 15.1074C12.5195 16.4808 13.6432 17.6045 15.0166 17.6045C16.39 17.6045 17.5137 16.4808 17.5137 15.1074C17.5137 13.734 16.39 12.6104 15.0166 12.6104ZM15.0166 5.11914C13.6432 5.11914 12.5195 6.24282 12.5195 7.61621C12.5195 8.9896 13.6432 10.1133 15.0166 10.1133C16.39 10.1133 17.5137 8.9896 17.5137 7.61621C17.5137 6.24282 16.39 5.11914 15.0166 5.11914ZM15.0166 20.1016C13.6432 20.1016 12.5195 21.2252 12.5195 22.5986C12.5195 23.972 13.6432 25.0957 15.0166 25.0957C16.39 25.0957 17.5137 23.972 17.5137 22.5986C17.5137 21.2252 16.39 20.1016 15.0166 20.1016Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  )}
                  {Role === "user" && (
                    <div>
                      <Link to="/week">
                        <button
                          className={`bg-[#3E4DAC] text-white w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
                        >
                          Resume
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <div className="relative">
                <div className="flex items-center justify-between mt-[60px]">
                  <div className="flex items-center ">
                    <div className="w-[85px] rounded-full flex items-center justify-center h-[85px] bg-[#E1E6FF] ">
                      <h1 className="text-[35px] font-[600] ">2</h1>
                    </div>
                    <h1 className="text-[23px] font-[700] ml-[40px] ">
                      Topic 2{" "}
                      {Role === "admin" && !preview && (
                        <button className="ml-[24px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                          >
                            <path
                              d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                              fill="#282828"
                            />
                          </svg>
                        </button>
                      )}
                    </h1>
                  </div>
                  <button className="bg-[#E1E6FF] w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px]  ">
                    Pending
                  </button>
                </div>
                <div className="flex items-center relative z-10 my-[60px] ">
                  <div className="w-[85px] flex items-center justify-center ">
                    <img src={Pending} alt="Pending" />
                  </div>
                  <div className="flex items-center">
                    <img
                      className="ml-[60px] mr-[30px] "
                      src={TaskVideo}
                      alt="TaskVideo"
                    />
                    <div className="">
                      <h1 className="text-[#3E4DAC] text-[22px] font-[700] ">
                        Task 1
                      </h1>
                      <p className="text-[#626262] text-[18px] font-[500] ">
                        Class:{" "}
                        <span className=" text-red-400 ">Date-Day-Time</span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[30px] left-[174px] " />
                <div className="flex items-center relative z-10 my-[60px] ">
                  <div className="w-[85px] flex items-center justify-center ">
                    <img src={Pending} alt="Pending" />
                  </div>
                  <div className="flex items-center">
                    <img
                      className="ml-[60px] mr-[30px] "
                      src={TaskVideo}
                      alt="TaskVideo"
                    />
                    <div className="">
                      <h1 className="text-[#3E4DAC] text-[22px] font-[700] ">
                        Task 2
                      </h1>
                      <p className="text-[#626262] text-[18px] font-[500] ">
                        Class:{" "}
                        <span className=" text-red-400 ">Date-Day-Time</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CourseInformation;
