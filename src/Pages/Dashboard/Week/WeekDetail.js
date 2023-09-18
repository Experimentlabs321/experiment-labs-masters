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
import { Link } from "react-router-dom";
import axios from "axios";

const skillsCategories = [
  {
    objectId: 1,
    categories: [
      {
        categoryName: "category 1",
        skills: [
          {
            skillName: "skill 1",
            parameters: ["Parameter 1", "Parameter 2"],
            courses: ["courseId-1", "courseId-2"],
          },
          {
            skillName: "skill 2",
            parameters: ["Parameter 1", "Parameter 2"],
            courses: ["courseId-1", "courseId-2"],
          },
        ],
      },
      {
        categoryName: "category 2",
        skills: [
          {
            skillName: "skill 1",
            parameters: ["Parameter 1", "Parameter 2"],
            courses: ["courseId-1", "courseId-2"],
          },
          {
            skillName: "skill 2",
            parameters: ["Parameter 1", "Parameter 2"],
            courses: ["courseId-1", "courseId-2"],
          },
        ],
      },
    ],
  },
  {
    objectId: 1,
    categories: [
      {
        categoryName: "category 1",
        skills: [
          {
            skillName: "skill 1",
            parameters: ["Parameter 1", "Parameter 2"],
            courses: ["courseId-1", "courseId-2"],
          },
          {
            skillName: "skill 2",
            parameters: ["Parameter 1", "Parameter 2"],
            courses: ["courseId-1", "courseId-2"],
          },
        ],
      },
      {
        categoryName: "category 2",
        skills: [
          {
            skillName: "skill 1",
            parameters: ["Parameter 1", "Parameter 2"],
            courses: ["courseId-1", "courseId-2"],
          },
          {
            skillName: "skill 2",
            parameters: ["Parameter 1", "Parameter 2"],
            courses: ["courseId-1", "courseId-2"],
          },
        ],
      },
    ],
  },
];

const item = {
  organizationId: 1,
  categoryName: "category 1",
  skill: {
    skillName: "skill 1",
    parameters: ["Parameter 1", "Parameter 2"],
    courses: ["courseId-1", "courseId-2"],
  },
};

const WeekDetail = ({
  toggleButton,
  setToggleButton,
  openTask,
  data,
  week,
  setWeek,
  lectureNo,
  setLectureNo,
  tasksNo,
  setTasksNo,
  setOpenTask,
  setOpenTopic,
  chapters,
}) => {
  const [currentWeek, setCurrentWeek] = useState(
    JSON.parse(localStorage.getItem("currentWeek"))
  );
  const [taskData, setTaskData] = useState({});
  const handleNext = () => {
    if (week?.lecture[lectureNo]?.tasks?.length === tasksNo + 1) {
      if (week?.lecture?.length === lectureNo + 1) {
      } else {
        setOpenTask(week?.lecture[lectureNo + 1]?.tasks[0]);
        setOpenTopic(week?.lecture[lectureNo + 1]?.name);
        setLectureNo(lectureNo + 1);
        setTasksNo(0);
      }
    } else {
      setOpenTask(week?.lecture[lectureNo]?.tasks[tasksNo + 1]);
      setTasksNo(tasksNo + 1);
      console.log(tasksNo);
    }
    console.log(openTask);
  };
  const handlePrevious = () => {
    if (tasksNo - 1 < 0) {
      if (lectureNo - 1 < 0) {
      } else {
        setOpenTask(
          week?.lecture[lectureNo - 1]?.tasks[
            week?.lecture[lectureNo - 1]?.tasks?.length - 1
          ]
        );
        setOpenTopic(week?.lecture[lectureNo - 1]?.name);
        setLectureNo(lectureNo - 1);
        setTasksNo(week?.lecture[lectureNo - 1]?.tasks?.length - 1);
      }
    } else {
      setOpenTask(week?.lecture[lectureNo]?.tasks[tasksNo - 1]);
      setTasksNo(tasksNo - 1);
      console.log(tasksNo);
    }
    // setOpenTask(week?.lecture[lectureNo]?.tasks[tasksNo]);
  };

  useEffect(() => {
    let taskTypeForAPI;
    console.log(openTask?.taskType);
    switch (openTask?.taskType) {
      case "Assignment":
        taskTypeForAPI = "assignments";
        break;
      case "Classes":
        taskTypeForAPI = "classes";
        break;
      case "Reading":
        taskTypeForAPI = "readings";
        break;
      case "Quiz":
        taskTypeForAPI = "quizes";
        break;
      case "Live Test":
        taskTypeForAPI = "liveTests";
        break;
      case "Video":
        taskTypeForAPI = "videos";
        break;
      case "Audio":
        taskTypeForAPI = "audios";
        break;
      case "Files":
        taskTypeForAPI = "files";
        break;
      default:
        console.error({ error: "Invalid task type" });
    }

    
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/tasks/${taskTypeForAPI}?id=${openTask?.taskId}`
      )
      .then((response) => {
        setTaskData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [openTask, openTask?.taskType]);

  return (
    <div>
      <div className="relative z-0 ">
        <div className="pt-[110px] border-b-2 ">
          <div className="container mx-auto px-4 flex items-center justify-between ">
            <div className="flex items-center pt-[30px] pb-[40px] ">
              <Link
                to="/courseAccess"
                className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
              >
                My Courses
              </Link>
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
              <Link
                to={`/questLevels/${currentWeek?.courseId}`}
                className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
              >
                Quest Levels
              </Link>
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
              <Link
                to={`/questLevels/${currentWeek?.courseId}`}
                className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
              >
                {currentWeek?.weekName}
              </Link>
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
              <button
                onClick={handlePrevious}
                className="flex items-center text-[#3E4DAC] text-[18px] font-[700] mr-[80px] "
              >
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
              <button
                onClick={handleNext}
                className="flex items-center bg-[#3E4DAC] text-[18px] font-[700] text-white px-[24px] py-[12px] rounded-[8px] "
              >
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
        {openTask?.taskType === "Classes" && (
          <ClassesTask taskData={taskData} />
        )}
        {openTask?.taskType === "Assignment" && (
          <AssignmentTask taskData={taskData} />
        )}
        {openTask?.taskType === "Reading" && (
          <ReadingTask taskData={taskData} />
        )}
        {openTask?.taskType === "Quiz" && <QuizTask taskData={taskData} />}
        {openTask?.taskType === "LiveTests" && (
          <LiveTestTask taskData={taskData} />
        )}
        {openTask?.taskType === "Video" && <VideoTask taskData={taskData} />}
        {openTask?.taskType === "Audio" && <AudioTask taskData={taskData} />}
        {openTask?.taskType === "Files" && <FilesTask taskData={taskData} />}
      </div>
    </div>
  );
};

export default WeekDetail;
