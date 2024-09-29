import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "../../Shared/Navbar";
import Aside from "./Aside";
import ClassesTask from "../ClassesTask";
import AssignmentTask from "../AssignmentTask";
import ReadingTask from "../ReadingTask";
import QuizTask from "../QuizTask";
import LiveTestTask from "../LiveTestTask";
import VideoTask from "../VideoTask";
import AudioTask from "../AudioTask";
import FilesTask from "../FilesTask";
import ScheduleTask from "../ScheduleTask";
import { AuthContext } from "../../../../contexts/AuthProvider";

const TaskDetails = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState();
  const [chapter, setChapter] = useState({});
  const [courseData, setCourseData] = useState({});
  const [week, setWeek] = useState({});
  const [chapters, setChapters] = useState([]);
  const [openTask, setOpenTask] = useState({});
  const [openTopic, setOpenTopic] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [count, setCount] = useState(0);
  const { user, userInfo } = useContext(AuthContext);

  useEffect(() => {
    // Function to update toggleButton based on device size
    function updateToggleButton() {
      if (window.innerWidth <= 768) {
        // Set to false for small devices
        setToggleButton(false);
      } else {
        // Set to true for large devices
        setToggleButton(true);
      }
    }

    // Initial call to set toggleButton based on the device size
    updateToggleButton();

    // Event listener to update toggleButton when the window is resized
    window.addEventListener("resize", updateToggleButton);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updateToggleButton);
    };
  }, []);

  const queryParameters = new URLSearchParams(window.location.search);
  const queryTaskType = queryParameters.get("taskType");
  useEffect(() => {
    let taskTypeForAPI;
    // console.log(queryTaskType);
    switch (queryTaskType) {
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
      case "Schedule":
        taskTypeForAPI = "schedule";
        break;
      default:
        console.error({ error: "Invalid task type" });
    }

    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/${taskTypeForAPI}/taskId/${id}?email=${user?.email}`
      )
      .then((response) => {
        setTaskData(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [queryTaskType, id, user?.email]);

  useEffect(() => {
    if (taskData?.chapterId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/${taskData?.chapterId}/email/${user?.email}`
        )
        .then((res) => {
          setChapter(res?.data[0]);
          setOpenTopic(res?.data[0]?.chapterName);
          setOpenTask(
            res?.data[0]?.tasks?.find((item) => item?.taskId === taskData?._id)
          );
        })
        .catch((error) => console.error(error));
  }, [taskData]);

  useEffect(() => {
    if (chapter?.weekId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks/${chapter?.weekId}`
        )
        .then((res) => setWeek(res?.data))
        .catch((error) => console.error(error));
    if (chapter?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${chapter?.courseId}`
        )
        .then((res) => setCourseData(res?.data))
        .catch((error) => console.error(error));
  }, [chapter]);

  useEffect(() => {
    if (week?._id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/weekId/${week?._id}`
        )
        .then((response) => {
          setChapters(response?.data);
          if (userInfo?.role === "admin") setChapters(response?.data);
          else {
            let chapterWithFilteredTask = [];
            const batchId = userInfo?.courses?.find(
              (item) => item?.courseId === courseData?._id
            )?.batchId;
            // console.log(batchId);
            response?.data?.forEach((item) => {
              let singleChapter = { ...item };
              singleChapter.tasks = [];
              item?.tasks?.forEach((singleTask) => {
                if (
                  singleTask?.batches?.find(
                    (singleBatch) => singleBatch?.batchId === batchId
                  )
                ) {
                  singleChapter.tasks.push(singleTask);
                  // console.log(item);
                }
              });
              chapterWithFilteredTask.push(singleChapter);
            });
            setChapters(chapterWithFilteredTask);
            // console.log("tasks =======>", chapterWithFilteredTask[0]?.tasks);
          }
        })
        .catch((error) => console.error(error));
  }, [week, count]);
  // console.log(chapters);
  // console.log(chapters);
  return (
    <div key={taskData?._id}>
      <div>
        <div className=" font-sansita">
          <Navbar />
          <div className="lg:flex overflow-hidden">
            <Aside
              openTopic={openTopic}
              setOpenTopic={setOpenTopic}
              openTask={openTask}
              setOpenTask={setOpenTask}
              toggleButton={toggleButton}
              setToggleButton={setToggleButton}
              setChapters={setChapters}
              chapters={chapters}
              data={week?.lecture}
              courseData={courseData}
              count={count}
              setCount={setCount}
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
              <main key={taskData?._id} className="min-h-[100vh]">
                <div className="">
                  {/* <WeekDetail
                    chapters={chapters}
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
                    count={count}
                    setCount={setCount}
                  /> */}
                  <div>
                    {/* {isLoading && (
                      <div className=" flex align-items-center my-5 py-5">
                        <CircularProgress className="w-full mx-auto" />
                      </div>
                    )} */}
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
                              to={`/questLevels/${chapter?.courseId}`}
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
                            {/* <Link
                              to={`/questLevels/${chapter?.courseId}`}
                              className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                            >
                              {week?.weekName}
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
                            </svg> */}
                            <button className=" font-sans mr-[30px] text-[20px] font-[400] ">
                              {taskData?.taskName}
                            </button>
                          </div>
                        </div>
                      </div>
                      {openTask?.taskType === "Classes" && (
                        <ClassesTask taskData={taskData} />
                      )}
                      {openTask?.taskType === "Assignment" && (
                        <AssignmentTask
                          taskData={taskData}
                          chapters={chapters}
                          count={count}
                          setCount={setCount}
                        />
                      )}
                      {openTask?.taskType === "Reading" && (
                        <ReadingTask
                          taskData={taskData}
                          count={count}
                          setCount={setCount}
                        />
                      )}
                      {openTask?.taskType === "Quiz" && (
                        <QuizTask
                          chapter={chapter}
                          taskData={taskData}
                          count={count}
                          setCount={setCount}
                        />
                      )}
                      {openTask?.taskType === "LiveTests" && (
                        <LiveTestTask
                          taskData={taskData}
                          count={count}
                          setCount={setCount}
                        />
                      )}
                      {openTask?.taskType === "Video" && (
                        <VideoTask
                          count={count}
                          setCount={setCount}
                          taskData={taskData}
                        />
                      )}
                      {openTask?.taskType === "Audio" && (
                        <AudioTask
                          taskData={taskData}
                          count={count}
                          setCount={setCount}
                        />
                      )}
                      {openTask?.taskType === "Files" && (
                        <FilesTask
                          taskData={taskData}
                          count={count}
                          setCount={setCount}
                        />
                      )}
                      {openTask?.taskType === "Schedule" && (
                        <ScheduleTask
                          taskData={taskData}
                          week={week}
                          count={count}
                          setCount={setCount}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
