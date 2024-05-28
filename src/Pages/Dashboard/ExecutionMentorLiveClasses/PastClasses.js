import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";
import filter from "../../../assets/ExecutionMentor/filter.svg";
import active from "../../../assets/ExecutionMentor/active.svg";
import clock from "../../../assets/ExecutionMentor/clock.svg";
import list from "../../../assets/ExecutionMentor/list.svg";
import UpComingClasses from "./UpComingClasses";
import DoubtClearingClasses from "./DoubtClearingClasses";

const PastClasses = () => {
  const [selectedTab, setSelectedTab] = useState("pastClasses");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  ///

  return (
    <div>
      <Layout>
        <div className=" lg:block hidden">
          <AssignmentUpNev page={"liveClasses"} />
        </div>

        <div className="flex mt-24 lg:mx-10">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="px-10 flex gap-10 pb-3 text-lg mt-10  ">
                <Link
                  onClick={() => handleTabClick("pastClasses")}
                  style={{
                    fontWeight:
                      selectedTab === "pastClasses" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "pastClasses"
                        ? "2px solid black"
                        : "none",
                    color: selectedTab === "pastClasses" ? "black" : "#BEBEBE",
                  }}
                >
                  Past Classes
                </Link>

                <Link
                 
                  onClick={() => handleTabClick("upcomingClasses")}
                  style={{
                    fontWeight:
                      selectedTab === "upcomingClasses" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "upcomingClasses"
                        ? "2px solid black"
                        : "none",
                    color:
                      selectedTab === "upcomingClasses" ? "black" : "#BEBEBE",
                  }}
                >
                  Upcoming classes
                </Link>

                <Link
                 
                  onClick={() => handleTabClick("doubtClearingClasses")}
                  style={{
                    fontWeight:
                      selectedTab === "doubtClearingClasses" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "doubtClearingClasses"
                        ? "2px solid black"
                        : "none",
                    color: selectedTab === "doubtClearingClasses" ? "black" : "#BEBEBE",
                  }}
                >
                  Doubt Clearing Classes
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-2 text-lg font-medium bg-[#EFEFEF] rounded-lg px-4 py-2 ">
                <img src={filter} alt="filter" />
                <p>filter</p>
              </div>
            </div>

            {selectedTab === "pastClasses" && (
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mx-5 my-10">
                <div
                  className="p-5"
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #EFEFEF",
                    background: "#FFF",
                    boxShadow: "0px 4px 4px 0px rgba(57, 80, 126, 0.14)",
                  }}
                >
                  <div className="flex gap-2 border-b pb-2">
                    <div className="">
                      <img src="" alt="imag" />
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <p className="text-xl font-medium">
                        Introduction to marketing
                      </p>
                      <p className="flex justify-between text-sm font-normal text-[#8A8A8A]">
                        Naman Jain{" "}
                        <span className="flex gap-2 text-[#2E8760] bg-[#E3FFF3] rounded-md px-2">
                          <img src={active} alt="" />
                          <span>online</span>
                        </span>
                      </p>
                      <p className="text-[#2E8760] text-sm font-normal">
                        10:30 - 11:45 | 31st August, 2023
                      </p>
                    </div>
                  </div>
                  <div className="text-[#8A8A8A] text-base font-normal my-5">
                    <p className=" flex gap-5 ">
                      <img src={clock} alt="clock" /> 30 minutes left
                    </p>
                    <p className=" mt-3 flex gap-5 ">
                      <img src={list} alt="list" /> Students - 22/35
                    </p>
                  </div>
                  <div className=" flex justify-center">
                    <button
                      className="px-6 py-1 text-[#fff] text-base font-medium"
                      style={{
                        borderRadius: "7px",
                        background:
                          "linear-gradient(180deg, #2063DA 0%, #081765 100%)",
                      }}
                    >
                      Join Now
                    </button>
                  </div>
                </div>
                <div
                  className="p-5"
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #EFEFEF",
                    background: "#FFF",
                    boxShadow: "0px 4px 4px 0px rgba(57, 80, 126, 0.14)",
                  }}
                >
                  <div className="flex gap-2 border-b pb-2">
                    <div className="">
                      <img src="" alt="imag" />
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <p className="text-xl font-medium">
                        Introduction to marketing
                      </p>
                      <p className="flex justify-between text-sm font-normal text-[#8A8A8A]">
                        Naman Jain{" "}
                        <span className="flex gap-2 text-[#2E8760] bg-[#E3FFF3] rounded-md px-2">
                          <img src={active} />
                          <span>online</span>
                        </span>
                      </p>
                      <p className="text-[#2E8760] text-sm font-normal">
                        10:30 - 11:45 | 31st August, 2023
                      </p>
                    </div>
                  </div>
                  <div className="text-[#8A8A8A] text-base font-normal my-5">
                    <p className=" flex gap-5 ">
                      <img src={clock} alt="clock" /> 30 minutes left
                    </p>
                    <p className=" mt-3 flex gap-5 ">
                      <img src={list} alt="list" /> Students - 22/35
                    </p>
                  </div>
                  <div className=" flex justify-center">
                    <button
                      className="px-6 py-1 text-[#fff] text-base font-medium"
                      style={{
                        borderRadius: "7px",
                        background:
                          "linear-gradient(180deg, #2063DA 0%, #081765 100%)",
                      }}
                    >
                      Join Now
                    </button>
                  </div>
                </div>
                <div
                  className="p-5"
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #EFEFEF",
                    background: "#FFF",
                    boxShadow: "0px 4px 4px 0px rgba(57, 80, 126, 0.14)",
                  }}
                >
                  <div className="flex gap-2 border-b pb-2">
                    <div className="">
                      <img src="" alt="imag" />
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <p className="text-xl font-medium">
                        Introduction to marketing
                      </p>
                      <p className="flex justify-between text-sm font-normal text-[#8A8A8A]">
                        Naman Jain{" "}
                        <span className="flex gap-2 text-[#2E8760] bg-[#E3FFF3] rounded-md px-2">
                          <img src={active} />
                          <span>online</span>
                        </span>
                      </p>
                      <p className="text-[#2E8760] text-sm font-normal">
                        10:30 - 11:45 | 31st August, 2023
                      </p>
                    </div>
                  </div>
                  <div className="text-[#8A8A8A] text-base font-normal my-5">
                    <p className=" flex gap-5 ">
                      <img src={clock} alt="clock" /> 30 minutes left
                    </p>
                    <p className=" mt-3 flex gap-5 ">
                      <img src={list} alt="list" /> Students - 22/35
                    </p>
                  </div>
                  <div className=" flex justify-center">
                    <button
                      className="px-6 py-1 text-[#fff] text-base font-medium"
                      style={{
                        borderRadius: "7px",
                        background:
                          "linear-gradient(180deg, #2063DA 0%, #081765 100%)",
                      }}
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            )}
            {selectedTab === "upcomingClasses" && (
              <UpComingClasses/> 
            )}
            {selectedTab === "doubtClearingClasses" && (
              <DoubtClearingClasses/> 
            )}
          </div>

          {/*  <div>
            <AssignmentRightNev />
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

export default PastClasses;
