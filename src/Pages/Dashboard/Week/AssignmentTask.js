import React, { useState } from "react";
import Instructions from "./SubFile/AssignmentTask/Instructions";
import Submission from "./SubFile/AssignmentTask/Submission";
import ReviewSubmission from "./SubFile/AssignmentTask/ReviewSubmission";

const AssignmentTask = ({ assignmentData }) => {
  const [view, setView] = useState("Instructions");
  return (
    <div>
      <div className="px-4">
        <h1 className=" text-[30px] font-[500] mt-[40px] ">
          Assignment Instructions:{" "}
          <span className="text-[#3E4DAC]">
            {assignmentData?.assignmentName}
          </span>
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
        </div>
      </div>
      <div>
        {view === "Instructions" && (
          <Instructions instructions={assignmentData?.instructions} />
        )}
        {view === "Submission" && (
          <Submission assignmentData={assignmentData} />
        )}
        {view === "Review Submission" && (
          <ReviewSubmission assignmentData={assignmentData} />
        )}
      </div>
    </div>
  );
};

export default AssignmentTask;
