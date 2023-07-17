import React, { useEffect, useState } from "react";
import Layout from "./Layout/Week";
import MenuIcon from "@mui/icons-material/Menu";

const WeekDetail = ({ toggleButton, setToggleButton }) => {
  return (
    <div>
      <div className="relative z-0 ">
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
              <button className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline ">
                Quest Levels
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
              <button className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline ">
                Week 1
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
              <button className="flex items-center text-[#3E4DAC] text-[18px] font-[700] mr-[80px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.5273 4.83431L7.69401 9.66764L12.5273 14.501"
                    stroke="#3E4DAC"
                    stroke-width="1.61111"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h1 className="ml-[12px]">Previous</h1>
              </button>
              <button className="flex items-center bg-[#3E4DAC] text-[18px] font-[700] text-white px-[24px] py-[12px] rounded-[8px] ">
                <h1 className="mr-[12px]">Next</h1>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.91797 14.5007L12.7513 9.66732L7.91797 4.83398"
                    stroke="white"
                    stroke-width="1.61111"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekDetail;
