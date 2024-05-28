//DoubtClearingClasses

import React, { useContext, useEffect, useState } from "react";

import active from "../../../assets/ExecutionMentor/active.svg";
import clock from "../../../assets/ExecutionMentor/clock.svg";
import list from "../../../assets/ExecutionMentor/list.svg";

const DoubtClearingClasses = () => {
  return (
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
            <p className="text-xl font-medium">Introduction to marketing</p>
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
              background: "linear-gradient(180deg, #2063DA 0%, #081765 100%)",
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
            <p className="text-xl font-medium">Introduction to marketing</p>
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
              background: "linear-gradient(180deg, #2063DA 0%, #081765 100%)",
            }}
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoubtClearingClasses;
