import React from "react";
import StatementBg from "../../../assets/Dashboard/PointsStatementBg.png";

const Statement = () => {
  const data = [
    {
      day: "02",
      month: "July",
      year: "2023",
      monthShort: "Jul",
      status: "Points Earned",
      state: "Attendance",
      statePoint: "25",
    },
    {
      day: "25",
      month: "June",
      year: "2023",
      monthShort: "Jun",
      status: "Points Redeemed",
      state: "Notion",
      statePoint: "100",
    },
    {
      day: "25",
      month: "June",
      year: "2023",
      monthShort: "Jun",
      status: "Points Redeemed",
      state: "Attendance",
      statePoint: "60",
    },
    {
      day: "09",
      month: "June",
      year: "2023",
      monthShort: "Jun",
      status: "Points Earned",
      state: "Delight",
      statePoint: "10",
    },
    {
      day: "09",
      month: "June",
      year: "2023",
      monthShort: "Jun",
      status: "Points Earned",
      state: "Creativity",
      statePoint: "30",
    },
    {
      day: "09",
      month: "June",
      year: "2023",
      monthShort: "Jun",
      status: "Points Earned",
      state: "Challenge Submission",
      statePoint: "30",
    },
    {
      day: "04",
      month: "June",
      year: "2023",
      monthShort: "Jun",
      status: "Points Redeemed",
      state: "Canva",
      statePoint: "120",
    },
    {
      day: "02",
      month: "June",
      year: "2023",
      monthShort: "Jun",
      status: "Points Earned",
      state: "Attendance",
      statePoint: "25",
    },
  ];
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
      <div className="bg-[#B01E38] py-[24px] lg:py-[57px] px-[10px] lg:px-[42px] rounded-[12px] mt-[32px] lg:mt-[40px] mb-[40px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-between">
          {data.map((singleData) => (
            <div className="overflow-hidden relative w-fit justify-self-center">
              <img className=" w-fit" src={StatementBg} alt="StatementBg" />
              <div className="grid grid-cols-12 absolute top-0 min-w-min h-full w-full">
                <div className="w-full h-full flex justify-center items-center text-center text-black text-[11px] lg:text-[16px] font-semibold col-span-3 px-[15px]">
                  <h1 className="hidden lg:block">
                    {singleData?.day} {singleData?.month}
                    <br />
                    {singleData?.year}
                  </h1>
                  <h1 className="block text-[#404040] lg:hidden">
                    {singleData?.month}
                    <br />
                    <span className="text-[16px] font-bold text-black">
                      {singleData?.day}
                    </span>
                    <br />
                    {singleData?.year}
                  </h1>
                </div>
                <div className="w-full h-full flex-col justify-center items-center gap-3 inline-flex col-span-6">
                  <div>
                    <h1 className=" text-indigo-800 text-[13px] lg:text-[22px] font-bold">
                      {singleData?.status}
                    </h1>
                    <h1>
                      <span className="text-zinc-600 text-[11px] lg:text-[15px] font-medium">
                        {singleData?.state}:
                      </span>{" "}
                      <span className="text-black text-[11px] lg:text-[15px] font-semibold">
                        {singleData?.statePoint}
                      </span>
                    </h1>
                  </div>
                </div>
                <div
                  className={`w-full h-full flex justify-center items-center text-center ${
                    singleData?.status === "Points Earned"
                      ? "text-[#00863C] bg-[#C1EDD5]"
                      : "text-[#E53333] bg-[#FFBEBE]"
                  }  text-[18px] lg:text-[30px] font-semibold col-span-3`}
                >
                  {singleData?.statePoint}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statement;
