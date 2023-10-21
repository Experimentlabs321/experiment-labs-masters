//MyRecordings

import React, { useContext, useState } from "react";
import play from "../../../../assets/ExpertMentorDashboard/play.svg";
import img3 from "../../../../assets/ExpertMentorDashboard/img3.png";
import arrow3 from "../../../../assets/ExpertMentorDashboard/arrow3.svg";

const MyRecordings = ({ recordedClasses }) => {
  const [selectedTab1, setSelectedTab1] = useState("Product Lab");

  const handleTabClick1 = (tab) => {
    setSelectedTab1(tab);
  };

  return (
    <>
      <div className="mt-10 w-full">
        <div className="flex justify-between items-center ">
          <div className="px-10 flex gap-10 pb-3 text-lg  ">
            <button
              onClick={() => handleTabClick1("Product Lab")}
              style={{
                fontWeight: selectedTab1 === "Product Lab" ? "bold" : "normal",
                borderBottom:
                  selectedTab1 === "Product Lab" ? "2px solid black" : "none",
                color: selectedTab1 === "Product Lab" ? "#081765" : "#BEBEBE",
              }}
            >
              Product Lab
            </button>
            <button
              onClick={() => handleTabClick1("Business Lab")}
              style={{
                fontWeight: selectedTab1 === "Business Lab" ? "bold" : "normal",
                borderBottom:
                  selectedTab1 === "Business Lab" ? "2px solid black" : "none",
                color: selectedTab1 === "Business Lab" ? "#081765" : "#BEBEBE",
              }}
            >
              Business Lab
            </button>
            <button
              onClick={() => handleTabClick1("Creative Lab")}
              style={{
                fontWeight: selectedTab1 === "Creative Lab" ? "bold" : "normal",
                borderBottom:
                  selectedTab1 === "Creative Lab" ? "2px solid black" : "none",
                color: selectedTab1 === "Creative Lab" ? "#081765" : "#BEBEBE",
              }}
            >
              Creative Lab
            </button>
          </div>
        </div>
      </div>
      {selectedTab1 === "Product Lab" && (
        <div className="flex items-center justify-between gap-10 mt-10">
          <div
            className=" rounded-lg "
            style={{
              borderRadius: "20px",

              boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
            }}
          >
            <p className="">
              <img className="" src={img3} alt="img" />
            </p>

            <div
              className="text-[#676767] text-base font-semibold p-5"
              style={{
                borderRadius: "20px",
                background: "#FFF",
                boxShadow:
                  "3.7425336837768555px 11.227601051330566px 25px 0px rgba(93, 110, 255, 0.60)",
              }}
            >
              <p>Batch - 1</p>
              <p>Monday | 8:00 pm</p>
              <p className="text-[#000]">Product development</p>
            </div>
          </div>
          <div
            className=" rounded-lg "
            style={{
              borderRadius: "20px",

              boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
            }}
          >
            <p className="">
              <img className="" src={img3} alt="img" />
            </p>

            <div
              className="text-[#676767] text-base font-semibold p-5"
              style={{
                borderRadius: "20px",
                background: "#FFF",
                boxShadow:
                  "3.7425336837768555px 11.227601051330566px 25px 0px rgba(93, 110, 255, 0.60)",
              }}
            >
              <p>Batch - 1</p>
              <p>Monday | 8:00 pm</p>
              <p className="text-[#000]">Product development</p>
            </div>
          </div>
          <div
            className=" rounded-lg "
            style={{
              borderRadius: "20px",

              boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
            }}
          >
            <p className="">
              <img className="" src={img3} alt="img" />
            </p>

            <div
              className="text-[#676767] text-base font-semibold p-5"
              style={{
                borderRadius: "20px",
                background: "#FFF",
                boxShadow:
                  "3.7425336837768555px 11.227601051330566px 25px 0px rgba(93, 110, 255, 0.60)",
              }}
            >
              <p>Batch - 1</p>
              <p>Monday | 8:00 pm</p>
              <p className="text-[#000]">Product development</p>
            </div>
          </div>

          <div className=" flex flex-col items-center justify-center w-[20%] text-[#fff]">
            <p className="">
              <img src={arrow3} alt="icon" />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyRecordings;
