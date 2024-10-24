import React, { useContext, useEffect, useState } from "react";
import logo from "../../../../assets/Logos/Group 2859890.png";
import PersonProfilePic from "../../../../assets/Dashboard/PersonProfilePic.png";
import MyHelmet from "../../../../Components/MyHelmet/MyHelpmet";
import Aside from "./Aside";
import MenuIcon from "@mui/icons-material/Menu";
import WeekDetail from "../WeekDetail";
import Navbar from "../../Shared/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthProvider";

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
            type: "Assignment",
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
  const { id } = useParams();
  const [toggleButton, setToggleButton] = useState(false);
  const [week, setWeek] = useState(data[0]);
  const [lectureNo, setLectureNo] = useState(0);
  const [tasksNo, setTasksNo] = useState(0);
  const [openTask, setOpenTask] = useState(
    JSON.parse(localStorage.getItem("task"))
  );
  const [chapters, setChapters] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [openTopic, setOpenTopic] = useState(localStorage.getItem("chapter"));
  const Role = localStorage.getItem("role");
  const { user, userInfo } = useContext(AuthContext);
  const [count, setCount] = useState(0);

  console.log(week);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/weekId/${id}`
      )
      .then((response) => {
        // setChapters(response?.data);
        if (Role === "admin") setChapters(response?.data);
        else {
          let chapterWithFilteredTask = [];
          const batchId = userInfo?.courses?.find(
            (item) => item?.courseId === courseData?._id
          )?.batchId;
          console.log(batchId);
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
                console.log(item);
              }
            });
            chapterWithFilteredTask.push(singleChapter);
          });
          setChapters(chapterWithFilteredTask);
          console.log("tasks =======>", chapterWithFilteredTask[0]?.tasks);
        }

        //console.log(response?.data);
        // setOpenTopic(response?.data[0]?.chapterName);
      })
      .catch((error) => console.error(error));
  }, [id, count, Role, userInfo]);
  console.log("Chapters ==============>", chapters);
  //const [toggleButton, setToggleButton] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${chapters[0]?.courseId}`
      )
      .then((response) => {
        setCourseData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [chapters]);

  console.log("CourseData ============>", courseData);

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
  return (
    <>
      <MyHelmet>Dashboard</MyHelmet>
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
              <main className="min-h-[100vh]">
                <div className="">
                  <WeekDetail
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
