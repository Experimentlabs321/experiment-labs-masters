import React, { useEffect, useState } from "react";
import Layout from "./Layout/Week";
import MenuIcon from "@mui/icons-material/Menu";
import ClassesTask from "./ClassesTask";
import AssignmentTask from "./AssignmentTask";
import ReadingTask from "./ReadingTask";
import QuizTask from "./QuizTask";
import LiveTestTask from "./LiveTestTask";
import VideoTask from "./VideoTask";
import AudioTask from "./AudioTask";
import FilesTask from "./FilesTask";

const WeekDetail = ({
  toggleButton,
  setToggleButton,
  openTask,
  data,
  week,
  setWeek,
}) => {
  console.log(openTask);
  return (
    <div>
      <div className="relative z-0 ">
        <div className="pt-[110px] border-b-2 ">
          <div className="container mx-auto px-4 flex items-center justify-between ">
            <div className="flex items-center pt-[30px] pb-[40px] ">
              <button className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline ">
                My Courses
              </button>
              <svg
                className="mr-[30px]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M9 18.667L15 12.667L9 6.66699"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <button className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline ">
                Quest Levels
              </button>
              <svg
                className="mr-[30px]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M9 18.667L15 12.667L9 6.66699"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <button className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline ">
                {week?.weekName}
              </button>
              <svg
                className="mr-[30px]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M9 18.667L15 12.667L9 6.66699"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <button className=" font-sans mr-[30px] text-[20px] font-[400] ">
                {openTask?.taskName}
              </button>
            </div>
            <div className="flex items-center mt-[-10px] ">
              <button className="flex items-center text-[#3E4DAC] text-[18px] font-[700] mr-[80px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.5273 4.83431L7.69401 9.66764L12.5273 14.501"
                    stroke="#3E4DAC"
                    stroke-width="1.61111"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h1 className="ml-[12px]">Previous</h1>
              </button>
              <button className="flex items-center bg-[#3E4DAC] text-[18px] font-[700] text-white px-[24px] py-[12px] rounded-[8px] ">
                <h1 className="mr-[12px]">Next</h1>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.91797 14.5007L12.7513 9.66732L7.91797 4.83398"
                    stroke="white"
                    stroke-width="1.61111"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {openTask?.type === "Classes" && <ClassesTask />}
        {openTask?.type === "Assignment" && <AssignmentTask />}
        {openTask?.type === "Reading" && <ReadingTask />}
        {openTask?.type === "Quiz" && <QuizTask />}
        {openTask?.type === "LiveTest" && <LiveTestTask />}
        {openTask?.type === "Video" && <VideoTask />}
        {openTask?.type === "Audio" && <AudioTask />}
        {openTask?.type === "Files" && <FilesTask />}
      </div>
    </div>
  );
};

export default WeekDetail;
