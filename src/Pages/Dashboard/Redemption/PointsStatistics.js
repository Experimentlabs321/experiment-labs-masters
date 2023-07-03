import React from "react";
import NotificationIcon from "../../../assets/Dashboard/NotificationIcon.svg";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import NotificationIconMobile from "../../../assets/Dashboard/NotificationIconMobile.svg";
import SearchIconMobile from "../../../assets/Dashboard/SearchIconMobile.svg";
import PointsEarn from "../../../assets/Dashboard/PointsEarn.png";
import PointsEarnMobile from "../../../assets/Dashboard/PointsEarnMobile.png";

const PointsStatistics = ({ setState, state }) => {
  return (
    <div className="py-[65px] px-4">
      <div className="hidden lg:flex flex-row justify-between items-center">
        <div>
          <h1 className="text-[30px] font-[700]">
            Let's see how far you have come
          </h1>
          <h1 className="text-[#AAA] text-[15px]">
            Use the points you have earned to redeem what you want
          </h1>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <img
              className="absolute top-[12px] left-[10px]"
              src={SearchIcon}
              alt="SearchIcon"
            />
            <input
              style={{
                boxShadow: "0px 15px 23px 0px rgba(149, 156, 225, 0.36)",
              }}
              className="rounded-[8px] bg-[#F8F9FE] py-[10px] pl-[35px] pr-[10px]"
              placeholder="Search"
              type="text"
            />
          </div>
          <img
            className="mb-[-20px]"
            src={NotificationIcon}
            alt="NotificationIcon"
          />
        </div>
      </div>
      <div className="mt-[20px] lg:mt-[50px] flex justify-between items-center">
        <div>
          {state === "Points statistics" ? (
            <button
              // style={{ boxShadow: "0px 8px 0px 0px #CA5F98" }}
              className={`bg-[#3E4DAC] py-[8px] lg:py-[15px] px-[15px] lg:px-[30px] rounded-[32px] text-white text-[8px] lg:text-[15px] font-[700] z-[1] mr-[16px] lg:mr-[32px] shadow-[0px_3px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
            >
              Points statistics
            </button>
          ) : (
            <button
              onClick={() => setState("Points statistics")}
              className={`bg-[#F8F9FE] py-[8px] lg:py-[15px] px-[15px] lg:px-[30px] rounded-[32px] text-[8px] lg:text-[15px] font-[700] z-[1] border mr-[16px] lg:mr-[32px]`}
            >
              Points statistics
            </button>
          )}
          {state === "Redeem gifts" ? (
            <button
              // style={{ boxShadow: "0px 8px 0px 0px #CA5F98" }}
              className={`bg-[#3E4DAC] py-[8px] lg:py-[15px] px-[15px] lg:px-[30px] rounded-[32px] text-white text-[8px] lg:text-[15px] font-[700] z-[1] mr-[16px] lg:mr-[32px] shadow-[0px_3px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
            >
              Redeem gifts
            </button>
          ) : (
            <button
              onClick={() => setState("Redeem gifts")}
              className={`bg-[#F8F9FE] py-[8px] lg:py-[15px] px-[15px] lg:px-[30px] rounded-[32px] text-[8px] lg:text-[15px] font-[700] z-[1] border mr-[16px] lg:mr-[32px]`}
            >
              Redeem gifts
            </button>
          )}
        </div>
        <div className="flex lg:hidden items-center">
          <img
            className="mb-[-20px]"
            src={SearchIconMobile}
            alt="NotificationIcon"
          />
          <img
            className="mb-[-20px]"
            src={NotificationIconMobile}
            alt="NotificationIcon"
          />
        </div>
      </div>
      <div className="block lg:hidden my-[20px]">
        <div>
          <h1 className=" text-[14px] lg:text-[30px] font-[700]">
            Let's see how far you have come
          </h1>
          <h1 className="text-[#AAA] text-[8px] lg:text-[15px]">
            Use the points you have earned to redeem what you want
          </h1>
        </div>
      </div>
      <div>
        <div className=" h-[126px] lg:h-[250px] bg-[#3E4DAC] flex items-center justify-between rounded-[23px] lg:rounded-[62px] mt-[21px] lg:mt-[52px] relative ">
          <div className=" pl-[11px] lg:pl-[55px]">
            <h1 className="text-[12px] lg:text-[24px] font-[500] text-white ">
              Points you have earned till now -
            </h1>
            <h1 className=" text-[16px] lg:text-[32px] font-[700] text-white mt-[4px] lg:mt-[8px] ">
              250 points
            </h1>
            <button className="bg-[#FF557A] rounded-[70px] py-1 lg:py-2 px-5 lg:px-10 text-[10px] lg:text-[15px] font-[700] mt-[8px] lg:mt-[15px]">
              Redeem gifts now
            </button>
          </div>
          <div className="mr-[-20px] lg:mr-[-80px] mt-[10px] lg:mt-[-74px] ">
            <img
              className="hidden lg:block"
              src={PointsEarn}
              alt="PointsEarn"
            />
            <img
              className="lg:hidden block"
              src={PointsEarnMobile}
              alt="PointsEarn"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsStatistics;
