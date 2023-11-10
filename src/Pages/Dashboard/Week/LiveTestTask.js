import React, { useContext, useState } from "react";
import Instructions from "./SubFile/LiveTestTask/Instructions";
import StartTest from "./SubFile/LiveTestTask/StartTest";
import { AuthContext } from "../../../contexts/AuthProvider";

const LiveTestTask = () => {
  const [view, setView] = useState("Instructions");
  const { userInfo } = useContext(AuthContext);
  if(userInfo.role !== 'admin'){
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  };
  return (
    <div>
      <div className="px-4">
        <h1 className=" text-[30px] font-[500] mt-[40px] ">
          Live Test: <span className="text-[#3E4DAC]">Excel </span>
          <span className="text-[#FF557A]">[1:00 pm - 2:00 pm]</span>
        </h1>
      </div>
      <div className=" border-b-[1px] mt-[50px] ">
        <div className="px-4">
          <button
            onClick={() => setView("Instructions")}
            className={`${
              view === "Instructions" && "border-b-2 border-black"
            } text-[22px] font-[500] mr-[120px] pb-[10px]`}
          >
            Instructions
          </button>
          <button
            onClick={() => setView("Start Test")}
            className={`${
              view === "Start Test" && "border-b-2 border-black"
            } text-[22px] font-[500] mr-[120px] pb-[10px]`}
          >
            Start Test
          </button>
        </div>
      </div>
      <div>
        {view === "Instructions" && <Instructions />}
        {view === "Start Test" && <StartTest />}
      </div>
    </div>
  );
};

export default LiveTestTask;
