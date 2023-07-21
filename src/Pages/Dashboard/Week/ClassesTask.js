import React, { useState } from "react";
import LiveClass from "../../../assets/Dashboard/LiveClass.png";

const ClassesTask = () => {
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
      <div
        className={`relative  w-[400px] mt-[40px] px-4 mb-[10px] flex items-center gap-[32px] `}
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
      <div className="h-full flex flex-col items-center justify-center ">
        <div
          className="  border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929] w-[865px] h-[500px] bg-[#434343] flex items-center justify-center flex-col "
          width="865px"
          height="500px"
        >
          <div className="w-[298.63px] h-[61.49px] px-[23.42px] py-[11.71px] bg-red-600 rounded-lg justify-start items-center gap-[8.71px] inline-flex mb-[50px]">
            <div className="w-[38.06px] h-[38.06px] relative">
              <div className="w-[33.47px] h-[33.47px] left-[2.60px] top-[0.87px] absolute bg-white rounded-full" />
              <img
                className="w-[38.06px] h-[38.06px] left-0 top-[-0px] absolute"
                src={LiveClass}
                alt="LiveClass"
              />
            </div>
            <div className="text-white text-xl font-semibold uppercase">
              Live class Started
            </div>
          </div>
          <div>
            <button
              className={`bg-[#3E4DAC] text-white w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
            >
              Join
            </button>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="242"
          height="41"
          viewBox="0 0 242 41"
          fill="none"
        >
          <path
            d="M0.644531 39.9622L26.4817 0.385742H65.0977L39.0903 39.9622H0.644531Z"
            fill="#292929"
          />
          <path
            d="M241.117 40.3391L216.036 0.385742H178.549L203.796 40.3391H241.117Z"
            fill="#292929"
          />
        </svg>
      </div>
    </div>
  );
};

export default ClassesTask;
