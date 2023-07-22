import React, { useEffect, useState } from "react";
import logo from "../../../../assets/Logos/Group 2859890.png";
import PersonProfilePic from "../../../../assets/Dashboard/PersonProfilePic.png";
import MyHelmet from "../../../../Components/MyHelmet/MyHelpmet";
import Aside from "./Aside";
import MenuIcon from "@mui/icons-material/Menu";
import WeekDetail from "../WeekDetail";
import Navbar from "../../Shared/Navbar";

const data = [
  {
    weekName: "Week 1",
    lecture: [
      {
        name: "Topic 1",
        tasks: [
          {
            taskName: "Task of topic 1",
            type: "Reading",
          },
          {
            taskName: "Task of topics 1",
            type: "Reading",
          },
        ],
      },
      {
        name: "Topic 2",
        tasks: [
          {
            taskName: "Task of topic 2",
            type: "Classes",
          },
          {
            taskName: "Task of topic 2",
            type: "Quiz",
          },
          {
            taskName: "Task of topic 2",
            type: "Files",
          },
          {
            taskName: "Task of topic 2",
            type: "LiveTest",
          },
        ],
      },
    ],
  },
];

const Week = () => {
  const [toggleButton, setToggleButton] = useState(true);
  const [week, setWeek] = useState(data[0]);
  const [lectureNo, setLectureNo] = useState(0);
  const [tasksNo, setTasksNo] = useState(0);
  const [openTopic, setOpenTopic] = useState(data[0]?.lecture[0]?.name);
  const [openTask, setOpenTask] = useState(
    data[0]?.lecture[lectureNo].tasks[tasksNo]
  );
  const Role = localStorage.getItem("role");
  return (
    <>
      <MyHelmet>Dashboard</MyHelmet>
      <div>
        <div className=" font-sansita">
          <Navbar />
          <div className="flex overflow-hidden">
            <Aside
              openTopic={openTopic}
              setOpenTopic={setOpenTopic}
              openTask={openTask}
              setOpenTask={setOpenTask}
              toggleButton={toggleButton}
              setToggleButton={setToggleButton}
              data={week?.lecture}
            />
            <button
              onClick={() => setToggleButton(true)}
              className="text-black bg-blue font-normal rounded-r-[15px] ml-[-10px] flex items-center px-[20px] pt-[10px] pb-[5px] absolute top-[95px] z-10  group"
            >
              <MenuIcon />{" "}
              <h1 className="ml-3 text-[12px] font-[500]">Open menu</h1>
            </button>
            <div
              id="main-content"
              className={`h-full w-full relative ${
                toggleButton ? "ml-[324px]" : ""
              }`}
            >
              <main className="min-h-[100vh]">
                <div className="">
                  <WeekDetail
                    lectureNo={lectureNo}
                    setLectureNo={setLectureNo}
                    tasksNo={tasksNo}
                    setTasksNo={setTasksNo}
                    week={week}
                    setWeek={setWeek}
                    data={data}
                    openTask={openTask}
                    toggleButton={toggleButton}
                    setToggleButton={setToggleButton}
                    setOpenTask={setOpenTask}
                    setOpenTopic={setOpenTopic}
                  />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Week;
