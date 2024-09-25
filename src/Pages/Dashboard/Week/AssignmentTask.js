import React, { useContext, useEffect, useState } from "react";
import Instructions from "./SubFile/AssignmentTask/Instructions";
import Submission from "./SubFile/AssignmentTask/Submission";
import ReviewSubmission from "./SubFile/AssignmentTask/ReviewSubmission";
import MySubmission from "./SubFile/AssignmentTask/MySubmission";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const AssignmentTask = ({ taskData, count, setCount }) => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [view, setView] = useState("Instructions");
  if (userInfo.role !== "admin") {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }
  const [isFixed, setIsFixed] = useState(false);
  // console.log(taskData);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleRemoveTemplate = async (taskId) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/assignments/taskId/${taskId}`
      );
      // console.log(res);
      if (res.data.success) {
        navigate(-1);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div>
      <div className="px-4">
        <h1 className=" text-[30px] font-[500] mt-[30px] ">
          Assignment Instructions:{" "}
          <span className="text-[#3E4DAC]">{taskData?.assignmentName}</span>
        </h1>
      </div>
      {taskData?.file && (
        <div className="flex px-2 justify-between mt-[15px] ">
          <a
            className="p-4 bg-blue rounded-lg text-white font-bold"
            id="downloadButton"
            href={taskData?.file}
            download
          >
            Download Template File
          </a>
          {userInfo?.role === "admin" && (
            <button
              onClick={() => handleRemoveTemplate(taskData?._id)}
              type="button"
              className="p-4 bg-orange-500 rounded-lg text-white font-bold"
            >
              Remove Template File
            </button>
          )}
        </div>
      )}
      <div className=" border-b-[1px] mt-[40px] ">
        <div
          className={`flex px-4 ${
            isFixed && window.innerWidth <= 768
              ? "fixed top-[100px] bg-white"
              : ""
          }`}
          style={
            window.innerWidth <= 768
              ? {
                  overflowY: "scroll",
                  scrollbarWidth: "thin",
                  scrollbarColor: "darkgray lightgray",
                }
              : {}
          }
        >
          <button
            onClick={() => setView("Instructions")}
            className={`${
              view === "Instructions" && "border-b-2 border-black"
            } text-[22px] font-[500] mr-[120px] pb-[10px]`}
          >
            Instructions
          </button>
          {userInfo.role !== "admin" && (
            <>
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
            </>
          )}

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
        {view === "Submission" && (
          <Submission taskData={taskData} count={count} setCount={setCount} />
        )}
        {view === "Review Submission" && (
          <ReviewSubmission taskData={taskData} />
        )}
        {view === "My Submission" && <MySubmission taskData={taskData} />}
      </div>
    </div>
  );
};

export default AssignmentTask;
