import React, { useContext, useEffect, useState } from "react";
import Instructions from "./SubFile/AssignmentTask/Instructions";
import Submission from "./SubFile/AssignmentTask/Submission";
import ReviewSubmission from "./SubFile/AssignmentTask/ReviewSubmission";
import MySubmission from "./SubFile/AssignmentTask/MySubmission";
import { AuthContext } from "../../../contexts/AuthProvider";


const AssignmentTask = ({ taskData }) => {
  const { userInfo } = useContext(AuthContext);
  const [view, setView] = useState("Instructions");
  if(userInfo.role !== 'admin'){
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  };
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="px-4">
        <h1 className=" text-[30px] font-[500] mt-[30px] ">
          Assignment Instructions:{" "}
          <span className="text-[#3E4DAC]">{taskData?.assignmentName}</span>
        </h1>
      </div>
      {taskData?.file && (
        <div  className="p-4 mt-[15px] ">
          <a
            className="p-4 bg-blue rounded-lg text-white font-bold"
            id="downloadButton"
            href={taskData?.file}
            download
          >
            Download Template File
          </a>
        </div>
      )}
      <div className=" border-b-[1px] mt-[40px] ">
        <div className={`flex px-4 ${isFixed && window.innerWidth <= 768 ? 'fixed top-[100px] bg-white' : ''}`} style={window.innerWidth <= 768 ? { overflowY: 'scroll', scrollbarWidth: 'thin', scrollbarColor: 'darkgray lightgray' } : {}}>
          <button
            onClick={() => setView("Instructions")}
            className={`${
              view === "Instructions" && "border-b-2 border-black"
            } text-[22px] font-[500] mr-[120px] pb-[10px]`}
          >
            Instructions
          </button>
          <button
            onClick={() => setView("Submission")}
            className={`${
              view === "Submission" && "border-b-2 border-black"
            } text-[22px] font-[500] mr-[120px] pb-[10px]`}
          >
            Submission
          </button>
          <button
            onClick={() => setView("Review Submission")}
            className={`${
              view === "Review Submission" && "border-b-2 border-black"
            } text-[22px] font-[500] mr-[120px] pb-[10px]`}
          >
            Review Submission
          </button>
          <button
            onClick={() => setView("My Submission")}
            className={`${
              view === "My Submission" && "border-b-2 border-black"
            } text-[22px] font-[500] pb-[10px]`}
          >
            {userInfo?.role === "admin"
              ? "Assignment Template"
              : "My Submission"}
          </button>
        </div>
      </div>
      <div>
        {view === "Instructions" && (
          <Instructions instructions={taskData?.instructions} />
        )}
        {view === "Submission" && <Submission taskData={taskData} />}
        {view === "Review Submission" && (
          <ReviewSubmission taskData={taskData} />
        )}
        {view === "My Submission" && <MySubmission taskData={taskData} />}
      </div>
    </div>
  );
};

export default AssignmentTask;
