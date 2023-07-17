import React, { useState } from "react";
import NotificationIcon from "../../../assets/Dashboard/NotificationIcon.svg";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import NotificationIconMobile from "../../../assets/Dashboard/NotificationIconMobile.svg";
import SearchIconMobile from "../../../assets/Dashboard/SearchIconMobile.svg";
import PointsEarn from "../../../assets/Dashboard/PointsEarn.png";
import PointsEarnMobile from "../../../assets/Dashboard/PointsEarnMobile.png";
import SetGoal from "../../../assets/Dashboard/SetGoal.png";
import SetGoalMobile from "../../../assets/Dashboard/SetGoalMobile.png";
import Netflix from "../../../assets/Dashboard/Netflix.png";
import BarChart from "../../../assets/Dashboard/BarChart.png";

const chartInfo = [
  { name: "Level 1", percentage: 30 },
  { name: "Level 2", percentage: 60 },
  { name: "Level 3", percentage: 40 },
  { name: "Level 4", percentage: 80 },
  { name: "Level 5", percentage: 50 },
  { name: "Level 6", percentage: 70 },
  { name: "Level 7", percentage: 95 },
  { name: "Level 8", percentage: 45 },
  { name: "Level 9", percentage: 30 },
  { name: "Level 10", percentage: 90 },
  { name: "Level 11", percentage: 60 },
  { name: "Level 12", percentage: 40 },
];

const PointsStatistics = ({ setState, state }) => {
  const [activeLevel, setActiveLevel] = useState("Level 6");
  const [max, setMax] = useState(0);
  console.log(max);
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
      <div>
        <div className="grid grid-cols-11 gap-4 2xl:gap-8 ">
          <div className="col-span-12 lg:col-span-6">
            <div>
              <div className="flex items-center mt-[25px] lg:mt-[50px] ">
                <img
                  className="hidden lg:block z-[1]"
                  src={SetGoal}
                  alt="SetGoal"
                />
                <img
                  className="block lg:hidden z-[1]"
                  src={SetGoalMobile}
                  alt="SetGoal"
                />
                <div className="flex items-center justify-between gap-2 w-full border border-[#EAEAEA] py-[10px] pl-[38px] lg:pl-[50px] pr-[7px] ml-[-38px] lg:ml-[-60px] z-0 rounded-[8px] ">
                  <p className="text-[10px] lg:text-[16px] font-[600]">
                    Set a goal for yourself to achieve your desired points
                  </p>
                  <div className="relative inline-flex">
                    <svg
                      className=" w-[8px] lg:w-[14px] h-[8px] absolute top-1 lg:top-2 right-0"
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
                      className=" text-[10px] lg:text-[16px] font-[600] w-full rounded-[14px] text-black focus:outline-none appearance-none bg-transparent pr-[12px] lg:pr-[20px]"
                      name="option"
                      id="option"
                    >
                      <option className="hidden" value="">
                        Points
                      </option>
                      <option className="text-center" value="500">
                        500
                      </option>
                      <option className="text-center" value="800">
                        800
                      </option>
                      <option className="text-center" value="1000">
                        1000
                      </option>
                      <option className="text-center" value="1200">
                        1200
                      </option>
                      <option className="text-center" value="1400">
                        1400
                      </option>
                      <option className="text-center" value="1600">
                        1600
                      </option>
                      <option className="text-center" value="1800">
                        1800
                      </option>
                      <option className="text-center" value="2000">
                        2000
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="lg:pl-[30px] mt-[30px] lg:my-[30px] pt-[10px] lg:pt-0 pb-[30px] lg:pb-0 px-[10px] lg:px-0 border lg:border-none rounded-[20px] lg:rounded-none ">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[12px] lg:text-[16px] font-[500] text-[#A3AED0] ">
                      Look at your progress
                    </p>
                    <h1 className=" text-[14px] lg:text-[34px] font-[700] text-[#1B2559] font-sans ">
                      30%
                    </h1>
                  </div>
                  <div>
                    <img
                      className="bg-[#F4F7FE] p-[5px_4px_4px_5px] rounded-[7px] "
                      src={BarChart}
                      alt="BarChart"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-2 lg:gap-1 max-lg:gap-2 2xl:gap-4 h-[130px] lg:h-[200px] mt-3 relative">
                  {chartInfo?.map((item) => (
                    <div className="w-full h-full">
                      {max < item?.percentage && setMax(item?.percentage)}
                      <div className=" w-full h-full">
                        <div className="h-full text-white hover:text-black bg-transparent lg:rounded-lg rounded-[4px] w-full flex flex-col justify-end">
                          {item?.percentage === max && (
                            <div
                              className={`text-black absolute w-full right-0 flex items-center`}
                              style={{ bottom: `${item?.percentage}%` }}
                            >
                              <hr className="w-full border-dashed border-t border-[#28157A]" />
                              <h1 className="text-[#28157A] text-[5px] lg:text-[12px] font-sans font-[500] min-w-fit ">
                                {item?.percentage} points
                              </h1>
                            </div>
                          )}
                          <h1 className="text-[8px] lg:text-[12px] font-[700] text-center mt-[-20px]">
                            {item?.percentage}%
                          </h1>
                          <div
                            className={`${
                              activeLevel === item?.name
                                ? "bg-[#28157A]"
                                : "bg-[#E9EDF7]"
                            }  w-full lg:rounded-lg rounded-[4px] self-end`}
                            // className="bg-cyan-600 h-2 rounded-sm"
                            // style={{ width: `${p}%` }}
                            style={{ height: `${item?.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <h1 className="text-[#A3AED0] text-[45%] lg:text-[60%] text-center font-sans w-full pb-[10px] pt-[5px] font-[700]">
                        {item?.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="w-full lg:border border-[#EAEAEA] lg:mt-[50px] lg:px-[18px] rounded-[12px] py-[20px] ">
              <div className="flex items-center justify-between text-[8px] lg:text-[12px] font-[700] pb-[7px] ">
                <p className="">
                  What can you redeem from the points you have earned?
                </p>
                <button className="text-[#848484] border-l-2 underline border-[#848484] pl-1">
                  View all
                </button>
              </div>
              <div className="flex gap-[24px] w-full mt-[15px] pb-[12px] border-b-[1px] border-[#EAEAEA] ">
                <div className="w-[44px] flex items-center justify-center">
                  <img src={Netflix} alt="Netflix" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h1 className="text-[10px] lg:text-[14px] font-[500] ">
                      Netflix
                    </h1>
                    <p className="text-[8px] lg:text-[12px] font-[400] text-[#848484] ">
                      120 points
                    </p>
                  </div>
                  <button className="text-[8px] lg:text-[14px] text-[#1622EA] font-[400] ">
                    Redeem now
                  </button>
                </div>
              </div>
              <div className="flex gap-[24px] w-full mt-[15px] pb-[12px] border-b-[1px] border-[#EAEAEA] ">
                <div className="w-[44px] flex items-center justify-center">
                  <img src={Netflix} alt="Netflix" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h1 className="text-[10px] lg:text-[14px] font-[500] ">
                      Netflix
                    </h1>
                    <p className="text-[8px] lg:text-[12px] font-[400] text-[#848484] ">
                      120 points
                    </p>
                  </div>
                  <button className="text-[8px] lg:text-[14px] text-[#1622EA] font-[400] ">
                    Redeem now
                  </button>
                </div>
              </div>
              <div className="flex gap-[24px] w-full mt-[15px] pb-[12px] border-b-[1px] border-[#EAEAEA] ">
                <div className="w-[44px] flex items-center justify-center">
                  <img src={Netflix} alt="Netflix" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h1 className="text-[10px] lg:text-[14px] font-[500] ">
                      Netflix
                    </h1>
                    <p className="text-[8px] lg:text-[12px] font-[400] text-[#848484] ">
                      120 points
                    </p>
                  </div>
                  <button className="text-[8px] lg:text-[14px] text-[#1622EA] font-[400] ">
                    Redeem now
                  </button>
                </div>
              </div>
              <div className="flex gap-[24px] w-full mt-[15px] pb-[12px] border-b-[1px] border-[#EAEAEA] ">
                <div className="w-[44px] flex items-center justify-center">
                  <img src={Netflix} alt="Netflix" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h1 className="text-[10px] lg:text-[14px] font-[500] ">
                      Netflix
                    </h1>
                    <p className="text-[8px] lg:text-[12px] font-[400] text-[#848484] ">
                      120 points
                    </p>
                  </div>
                  <button className="text-[8px] lg:text-[14px] text-[#1622EA] font-[400] ">
                    Redeem now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsStatistics;
