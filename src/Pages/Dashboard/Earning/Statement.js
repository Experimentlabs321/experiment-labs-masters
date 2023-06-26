import React from "react";
import StatementBg from "../../../assets/Dashboard/PointsStatementBg.png";

const Statement = () => {
  return (
    <div>
      <div className="flex justify-between mt-[40px]">
        <p className="text-[16px] lg:text-[29px] font-[700]">
          Lab Points Statement
        </p>
        <div className="hidden lg:flex flex-row gap-3">
          <button className="px-8 py-4 rounded-[57px] bg-[#FF557A] border-[#FF557A] border-[2px] text-white text-[16px] font-semibold">
            Last 7 days
          </button>
          <button className="px-8 py-4 rounded-[57px] border-black border-[2px] text-black text-[16px] font-semibold">
            Last 30 days
          </button>
          <button className="px-8 py-4 rounded-[57px] border-black border-[2px] text-black text-[16px] font-semibold">
            Last 90 days
          </button>
        </div>
        <div className="relative block lg:hidden">
          <svg
            className="w-[12px] h-[12px] absolute top-0 right-0 m-4"
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.30406 0.892914L5.16539 4.74584L9.02673 0.892914L10.2129 2.07908L5.16539 7.12657L0.117895 2.07908L1.30406 0.892914Z"
              fill="#fff"
            />
          </svg>
          <select
            required
            className="px-[16px] py-[12px] rounded-[57px] bg-[#FF557A] border-[#FF557A] border-[2px] text-white text-[11px] font-[600] w-full focus:outline-none appearance-none mr-5"
            name="option"
            id="option"
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
          </select>
        </div>
      </div>
      <div className="bg-[#B01E38] py-[57px] px-[42px]">
        <div className="grid grid-cols-2 gap-5 justify-between">
          <div className="overflow-hidden relative">
            <img className=" w-fit" src={StatementBg} alt="StatementBg" />
            <div className="w-[100px] h-full flex justify-center items-center text-center text-black text-[14px] font-semibold absolute top-0 left-[12px]">
              02 July 2023
            </div>
            <div className="w-[100px] h-full flex justify-center items-center text-center text-[#00863C] bg-[#C1EDD5] text-[28px] font-semibold absolute top-0 right-0">
              25
            </div>
            <div className="w-[146px] h-full flex-col justify-start items-start gap-3 inline-flex absolute top-0 left-[35%]">
              <div className="text-right text-indigo-800 text-[22px] font-bold">
                Points Earned
              </div>
              <div>
                <span className="text-zinc-600 text-[15px] font-medium">
                  Attendance:
                </span>
                <span className="text-black text-[15px] font-medium"> </span>
                <span className="text-black text-[15px] font-semibold">25</span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <img className=" w-fit" src={StatementBg} alt="StatementBg" />
          </div>
          {/* <div className=" h-[100px]">
            <div
              style={{
                minHeight: "150px",
                background: `url(${StatementBg})`,
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1>working on it</h1>
            </div>
          </div>
          <div className=" h-[100px]">
            <div
              style={{
                minHeight: "150px",
                background: `url(${StatementBg})`,
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1>working on it</h1>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Statement;
