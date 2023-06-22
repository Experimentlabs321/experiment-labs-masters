import React from "react";
import Challenges from "../../../assets/Dashboard/Challenges.png";
import RightArrowBlack from "../../../assets/Dashboard/RightArrowBlack.png";
import RightArrowWhite from "../../../assets/Dashboard/RightArrowWhite.png";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";

const TechnicalUpdate = () => {
  return (
    <div className="flex flex-row md:justify-around md:flex-row-reverse gap-4 overflow-x-scroll lg:overflow-x-visible h-[450px] lg:h-[630px]">
      <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
        <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[32px]">
          Request slots
        </h1>
        <div
          style={{
            filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
          }}
          className="bg-[#0E2749] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5"
        >
          <div>
            <h1 className="text-white text-[18px] font-[700]">
              <span className="pr-6">{"<"}</span> Week 4{" "}
              <span className=" pl-6">{">"}</span>
            </h1>
          </div>
          <div className="w-full relative">
            <p className="text-[#C0C0C0] text-[18px] font-[600] pb-[18px]">
              Date
            </p>
            <div className="relative inline-flex w-full">
              <svg
                className="w-[18px] h-[12px] absolute top-2 right-1 m-4"
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.30406 0.892914L5.16539 4.74584L9.02673 0.892914L10.2129 2.07908L5.16539 7.12657L0.117895 2.07908L1.30406 0.892914Z"
                  fill="#222222"
                />
              </svg>
              <select
                required
                className=" text-[18px] font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                name="option"
                id="option"
              >
                <option value="14th June 2023">14th June 2023</option>
                <option value="15th June 2023">15th June 2023</option>
                <option value="16th June 2023">16th June 2023</option>
                <option value="17th June 2023">17th June 2023</option>
              </select>
            </div>
            <p className="text-[#C0C0C0] text-[18px] font-[600] py-[18px]">
              Time
            </p>
            <div className="relative inline-flex w-full">
              <svg
                className="w-[18px] h-[12px] absolute top-2 right-1 m-4"
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.30406 0.892914L5.16539 4.74584L9.02673 0.892914L10.2129 2.07908L5.16539 7.12657L0.117895 2.07908L1.30406 0.892914Z"
                  fill="#222222"
                />
              </svg>
              <select
                required
                className=" text-[18px] font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                name="option"
                id="option"
              >
                <option value="9.00 - 11.00">9.00 - 11.00</option>
                <option value="11.00 - 12.00">11.00 - 12.00</option>
                <option value="12.00 - 1.00">12.00 - 1.00</option>
                <option value="1.00 - 2.00">1.00 - 2.00</option>
              </select>
            </div>
          </div>
          <DashboardPrimaryButton
            bgColor="#3E4DAC"
            shadow="0px 6.32482px 0px #CA5F98"
            width="full"
          >
            <p className="flex items-center justify-center text-white">
              Set availability{" "}
              <img
                className="pl-1 w-[21px] lg:w-[32px]"
                src={RightArrowWhite}
                alt="RightArrowBlack"
              />
            </p>
          </DashboardPrimaryButton>
        </div>
      </div>
      <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
        <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[32px]">
          Challenges
        </h1>
        <div
          style={{
            filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
          }}
          className="bg-[#2B0825] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5"
        >
          <div className="bg-[#FF881B] rounded-md">
            <img src={Challenges} alt="Challenges" />
          </div>
          <h1 className="text-[14px] lg:text-[18px] text-white font-[700]">
            Week 4: Build a platform
          </h1>
          <div className="w-full">
            <small className="text-white pb-[10px] font-[700]">
              20% Completed
            </small>
            <div className="relative w-full">
              <div className="w-full bg-gray-200 rounded-lg h-2">
                <div
                  className="bg-[#3E4DAC] h-2 rounded-lg"
                  // className="bg-cyan-600 h-2 rounded-sm"
                  // style={{ width: `${p}%` }}
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>
          </div>
          <DashboardPrimaryButton
            bgColor="#FFDB70"
            shadow="0px 7.50435px 0px #F08323"
            width="full"
          >
            <p className="flex items-center justify-center">
              Complete Challenge{" "}
              <img
                className="pl-1 w-[21px] lg:w-[32px]"
                src={RightArrowBlack}
                alt="RightArrowBlack"
              />
            </p>
          </DashboardPrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default TechnicalUpdate;
