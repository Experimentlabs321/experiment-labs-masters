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
        <div className="px-4">
          <div className="relative inline-block mt-[130px] w-[400px] mb-[10px]">
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
                  <h1 className="text-[23px] font-[700] ml-[40px] ">Topic 1</h1>
                </div>
                <button className="bg-[#E1E6FF] w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] ">
                  In Progress
                </button>
              </div>
              <div className="flex items-center my-[60px] relative z-10 ">
                <div className="w-[85px] flex items-center justify-center ">
                  <img src={Completed} alt="Completed" />
                </div>
                <div className="flex items-center">
                  <img className="ml-[60px] mr-[30px] " src={Task} alt="Task" />
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
              <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[30px] left-[174px] " />
              <div className="flex items-center justify-between my-[60px] ">
                <div className="flex items-center">
                  <div className="w-[85px] flex items-center justify-center ">
                    <img src={InProgress} alt="InProgress" />
                  </div>
                  <div className="flex items-center">
                    <div className="relative ">
                      <img
                        className="ml-[60px] mr-[30px] relative z-10 "
                        src={Task}
                        alt="Task"
                      />
                      <div className="w-[80.16px] h-[79.10px] rounded-[14.77px] border-4 border-emerald-500 absolute top-1 right-[20.5px] z-0 " />
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
                <div>
                  <Link to="/week">
                    <button
                      className={`bg-[#3E4DAC] text-white w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
                    >
                      Resume
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            <div className="relative">
              <div className="flex items-center justify-between mt-[60px]">
                <div className="flex items-center ">
                  <div className="w-[85px] rounded-full flex items-center justify-center h-[85px] bg-[#E1E6FF] ">
                    <h1 className="text-[35px] font-[600] ">2</h1>
                  </div>
                  <h1 className="text-[23px] font-[700] ml-[40px] ">Topic 2</h1>
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
      </Layout>
    </div>
  );
};

export default CourseInformation;
