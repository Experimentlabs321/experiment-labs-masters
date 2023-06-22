import React from "react";
import Lock from "../../../assets/Dashboard/lock.png";
import DownArrow from "../../../assets/Dashboard/dashboard_arrow-down.png";
import UpArrow from "../../../assets/Dashboard/dashboard_arrow-up.png";
import "./style.css";

const Level = ({ singleData, i, length, onClick, viewAllLevel }) => {
  return (
    <div
      className={`${
        i % 2 === 0
          ? "border-l-white border-l-0 rounded-r-full w-10/12 float-right"
          : "border-r-white border-r-0 rounded-l-full w-10/12 float-left"
      } border-[10px] p-[17px] mt-[-10.2px] border-[#0F3934] overflow-visible`}
    >
      <div
        className={`flex items-center ${
          i % 2 === 0 ? " justify-end" : "flex-row-reverse justify-end"
        }`}
      >
        <h1
          className={`underline underline-offset-2 rounded-[9px] z-0 text-[15px] font-[500] hidden lg:block ${
            singleData?.status === "Completed" && "bg-[#9CAAFF]"
          } ${singleData?.status === "Ongoing" && "bg-[#FFC13D]"} ${
            singleData?.status === "Locked" && "bg-[#D9D9D9]"
          } ${i % 2 === 0 ? "levelLeft" : "levelRight"}`}
        >
          Level - {i + 1}
        </h1>
        <div
          // style={[{ boxShadow: "1.70448px 1.70448px 0px #000000" }]}
          className={`rounded-[50%] w-[71px] h-[69px] flex flex-col items-center justify-center text-[17px] font-[700] underline underline-offset-4 z-[1] ${
            singleData?.status === "Completed" &&
            " decoration-white text-white bg-[#3E4DAC]"
          } ${singleData?.status === "Ongoing" && "  bg-[#FFDB70]"} ${
            singleData?.status === "Locked"
              ? "lockShadow border-x-4 border-y-4 bg-[#D9D9D9] text-[#706F6F]"
              : "normalShadow"
          }`}
        >
          {singleData?.status === "Ongoing" && (
            <h1 className="text-[13px]">Ongoing</h1>
          )}
          {singleData?.status === "Locked" && <img src={Lock} alt="lock" />}
          <h1
            className={`${singleData?.status !== "Completed" && "text-[13px]"}`}
          >
            {singleData?.score}
          </h1>
          {singleData?.status === "Completed" && (
            <h1>{singleData?.expression}</h1>
          )}
        </div>
        <div
          onClick={onClick}
          className={`bg-[#FFDB70] w-fit p-[17px] rounded-[50%] overflow-visible absolute z-[1] bottom-[-15px] ${
            i % 2 === 0 ? "right-[75%]" : "left-[75%]"
          } ${length === i + 1 ? "block" : "hidden"} `}
        >
          {viewAllLevel ? (
            <img src={UpArrow} alt="UpArrow" />
          ) : (
            <img src={DownArrow} alt="downArrow" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Level;
