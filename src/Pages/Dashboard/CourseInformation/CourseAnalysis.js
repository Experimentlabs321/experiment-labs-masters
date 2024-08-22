import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import DialogLayout from "../Shared/DialogLayout";
import ClassesTaskIcon from "../../../assets/Dashboard/Classes.png";
import AssignmentTaskIcon from "../../../assets/Dashboard/Assignment.png";
import ReadingTaskIcon from "../../../assets/Dashboard/TaskIcon.png";
import QuizTaskIcon from "../../../assets/Dashboard/Quiz.png";
import LiveTestTaskIcon from "../../../assets/Dashboard/LiveTest.png";
import VideoTaskIcon from "../../../assets/Dashboard/Video.png";
import AudioTaskIcon from "../../../assets/Dashboard/Audio.png";
import FilesTaskIcon from "../../../assets/Dashboard/Files.png";
import calendar from "../../../assets/Dashboard/calendar.png";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import WeekDetails from "./WeekDetails";
import BatchConfiguration from "./BatchConfiguration";
import WeekConfiguration from "./WeekConfiguration";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import Loading from "../../Shared/Loading/Loading";
import lock from "../../../assets/Dashboard/lockIcon.png";
import { CircularProgress } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FileDownload from "../AdminAsset/FileDownload";

const CourseAnalysis = () => {
  const [addChapterOpen, setAddChapterOpen] = useState(false);
  const [editChapterOpen, setEditChapterOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  const [chapterData, setChapterData] = useState({});
  const [chapters, setChapters] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [courseData, setCourseData] = useState();
  const [courseDetails, setCourseDetails] = useState();
  const [userTime1, setuserTime1] = useState(null);
  const [userTime2, setuserTime2] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(weeks[0]);
  localStorage.setItem("currentWeek", JSON.stringify(weeks[0]));
  const [clickedTask, setClickedTask] = useState({});
  const Role = localStorage.getItem("role");
  const { user, userInfo } = useContext(AuthContext);
  const [batchesData, setBatchesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [deleteTaskPopup, setDeleteTaskPopup] = useState(false);
  const [
    selectedChapterAndTaskToDeleteTask,
    setSelectedChapterAndTaskToDeleteTask,
  ] = useState({});
  const [selectedBatchesToDeleteTask, setSelectedBatchesToDeleteTask] =
    useState([]);
  const [count, setCount] = useState(0);
  const [isOpenTaskType, setIsOpenTaskType] = useState("");
  const [fileOpen, setFileOpen] = useState(false);
  const [file, setFile] = useState(); 
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const TaskTypeInfo = [
    {
      name: "Classes",
      icon: ClassesTaskIcon,
      theme: "#ED690A",
      route: `/manageLiveClasses/${chapterData?._id}`,
    },
    {
      name: "Assignment",
      icon: AssignmentTaskIcon,
      theme: "#EF1164",
      route: `/assignment/${chapterData?._id}`,
    },
    {
      name: "Reading",
      icon: ReadingTaskIcon,
      theme: "#8C0CF0",
      route: `/manageReading/${chapterData?._id}`,
    },
    {
      name: "Quiz",
      icon: QuizTaskIcon,
      theme: "#E010BF",
      route: `/manageQuiz/${chapterData?._id}`,
    },
    {
      name: "Live Test",
      icon: LiveTestTaskIcon,
      theme: "#1AC62B",
      // route: "/assignment",
    },
    {
      name: "Video",
      icon: VideoTaskIcon,
      theme: "#0079FF",
      route: `/manageVideo/${chapterData?._id}`,
    },
    {
      name: "Audio",
      icon: AudioTaskIcon,
      theme: "#4539CB",
      route: `/manageAudio/${chapterData?._id}`,
    },
    {
      name: "Files",
      icon: FilesTaskIcon,
      theme: "#001246",
      route: `/manageFile/${chapterData?._id}`,
    },
    {
      name: "Schedule",
      icon: calendar,
      theme: "black",
      route: `/adminCalendarSchedule/${chapterData?._id}`,
    },
  ];

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

  const handleAddChapter = async (event) => {
    event.preventDefault();
    const chapter = {
      courseId: id,
      weekId: "" + currentWeek?._id,
      chapterName: event?.target?.chapterName?.value,
      creator: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
      organization: {
        organizationId: userInfo?.organizationId,
        organizationName: userInfo?.organizationName,
      },
      date: new Date(),
    };

    const newChapter = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters`,
      chapter
    );

    if (newChapter?.data?.acknowledged) {
      toast.success("Chapter added Successfully");
      console.log(newChapter?.data);
      setChapters([
        ...chapters,
        { ...chapter, _id: newChapter?.data?.insertedId },
      ]);
      setAddChapterOpen(false);
      event.target.reset();
    }

    console.log("Add chapter----->", chapter);
  };

  const handleEditChapterName = async (event) => {
    event.preventDefault();
    const chapter = {
      chapterName: event?.target?.chapterName?.value,
    };

    const newChapter = await axios.put(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/${chapterData?._id}`,
      chapter
    );

    if (newChapter?.data?.acknowledged) {
      toast.success("Chapter Updated Successfully");
      // Create a copy of the chapters array to avoid mutation
      const updatedChaptersArray = [...chapters];
      // Update the chapterName of the specific chapter in the copied array
      updatedChaptersArray[chapterData?.index].chapterName =
        chapter.chapterName;
      // Update the chapters state with the updated array
      setChapters(updatedChaptersArray);
      setEditChapterOpen(false);
      event.target.reset();
    }
  };

  const handleTaskDelete = async (task, chapter) => {
    setDeleteTaskPopup(false);
    await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, the task will not recover!",
      icon: "warning",
      buttons: true,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Delete functionality...", task);
        let taskTypeForAPI;
        switch (task?.taskType) {
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
        if (
          selectedBatchesToDeleteTask?.length ===
          selectedChapterAndTaskToDeleteTask?.task?.batches?.length
        ) {
          fetch(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/${taskTypeForAPI}/taskId/${task?.taskId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify([]),
            }
          )
            .then((result) => {
              if (result?.ok) {
                toast.success("Task Deleted Successfully!");
                let filterChapter = [];
                chapters?.forEach((item) => {
                  if (item?._id === chapter?._id) {
                    const filteredTask = [];
                    item?.tasks?.forEach((i) => {
                      if (i?.taskId !== task?.taskId) {
                        filteredTask.push(i);
                      }
                    });
                    item["tasks"] = filteredTask;
                    filterChapter?.push(item);
                  } else {
                    filterChapter?.push(item);
                  }
                });
                setChapters(filterChapter);
              }
            })
            .catch((error) => {
              console.error("Fetch error:", error);
              // Handle error, display a message to the user, etc.
            });
        } else {
          const remainingBatches =
            selectedChapterAndTaskToDeleteTask?.task?.batches?.filter(
              (batch) => {
                if (!selectedBatchesToDeleteTask.includes(batch)) {
                  return batch;
                }
              }
            );
          selectedChapterAndTaskToDeleteTask.task.batches = remainingBatches;
          setSelectedBatchesToDeleteTask([]);
          console.log(selectedChapterAndTaskToDeleteTask.task);
          fetch(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/${taskTypeForAPI}/taskId/${task?.taskId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(remainingBatches),
            }
          )
            .then((result) => {
              if (result?.ok) {
                toast.success("Task removed Successfully!");
              }
            })
            .catch((error) => {
              console.error("Fetch error:", error);
              // Handle error, display a message to the user, etc.
            });
        }
      }
    });
  };

  useEffect(() => {
    if (id)
      axios
        .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${id}`)
        .then((response) => {
          setCourseData(response?.data);
          console.log(response?.data);
        })
        .catch((error) => console.error(error));
  }, [id]);
  useEffect(() => {
    Loading();
    if (id) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/details/${id}`
        )
        .then((response) => {
          const courseData = response?.data;
          setCourseDetails(courseData);

          // Extract dates directly from response data
          const date1 = new Date(courseData?.courseStartingDate);
          const date2 = new Date(courseData?.courseEndingDate);

          // Options for formatting date and time
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          };

          // Convert to user's local date and time in 12-hour format
          const Time1 = date1.toLocaleString(undefined, options);
          const Time2 = date2.toLocaleString(undefined, options);

          setuserTime1(Time1);
          setuserTime2(Time2);

          console.log(Time1);
          console.log(Time2);
          console.log("details ", courseData);
          Loading().close();
        })
        .catch((error) => {
          console.error(error);
          Loading().close();
        });
    }
  }, [id]);

  useEffect(() => {
    if (id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks/courseId/${id}`
        )
        .then((response) => {
          setWeeks(response?.data);
          const currentDateTime = new Date();
          const queryParameters = new URLSearchParams(window.location.search);
          const queryWeek = queryParameters.get("week");
          if (queryWeek) {
            setCurrentWeek(
              response?.data?.find((item) => item?._id === queryWeek)
            );
            localStorage.setItem(
              "currentWeek",
              JSON.stringify(
                response?.data?.find((item) => item?._id === queryWeek)
              )
            );
          } else {
            response?.data?.forEach((element) => {
              const weekStartDate = new Date(element?.weekStartDate);
              const weekEndDate = new Date(element?.weekEndDate);
              if (
                weekStartDate <= currentDateTime &&
                weekEndDate >= currentDateTime
              ) {
                setCurrentWeek(element);
                localStorage.setItem("currentWeek", JSON.stringify(element));
                return;
              }
              if (!currentWeek) {
                setCurrentWeek(response?.data[0]);
                localStorage.setItem(
                  "currentWeek",
                  JSON.stringify(response?.data[0])
                );
              }
            });
          }
        })
        .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    if (currentWeek?._id) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/weekId/${currentWeek?._id}`
        )
        .then((response) => {
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
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
      setIsLoading(false);
    }
  }, [currentWeek, userInfo, Role, courseData, count]);

  useEffect(() => {
    if (id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${id}`
        )
        .then((response) => {
          setBatchesData(response?.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
  }, [id]);

  const [completionPercentage, setCompletionPercentage] = useState(0);
  useEffect(() => {
    let totalPercentage = 0;
    if (courseDetails?.taskTypeDetails) {
      Object.entries(courseDetails?.taskTypeDetails).forEach(([key, value]) => {
        totalPercentage =
          totalPercentage +
          Number(
            value?.overallCompletionPercentage
              ? value?.overallCompletionPercentage
              : "0"
          ) *
            value?.taskCount;
      });
      setCompletionPercentage(
        (totalPercentage / courseDetails?.totalTaskCount).toFixed(2)
      );
    }
  }, [courseDetails]);

  const percentageColor = (value) => {
    // Calculate the percentage
    const percentage = Number(value);

    // Determine the background color based on the percentage
    let textColorClass = "text-[green]"; // Default to green for 60% and above

    if (percentage < 40) {
      textColorClass = "text-[red]"; // Red for below 40%
    } else if (percentage >= 40 && percentage < 60) {
      textColorClass = "text-[orange]"; // Orange for 40-59.99%
    }

    return textColorClass;
  };

  const fileView = (file) => {
    setFileOpen(true);
    setFile(file);
  };

  console.log(courseDetails);

  return (
    <div>
      <Layout>
      <FileDownload
            fileOpen={fileOpen}
            setFileOpen={setFileOpen}
            file={file}
         
          />
        <div className="pb-10">
          {isLoading && (
            <div className=" flex align-items-center my-5 py-5">
              <CircularProgress className="w-full mx-auto" />
            </div>
          )}
          {Role === "admin" && (
            <div>
              <div className="pt-[110px] border-b-2 ">
                <div className="container mx-auto px-4 flex items-center justify-between ">
                  <div className="flex items-center pt-[30px] pb-[20px] md:pb-[40px] ">
                    <Link
                      to="/courseAccess"
                      className="text-[#168DE3] font-sans mr-[30px] text-[12px] md:text-[20px] font-[400] underline"
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
                    <button className=" font-sans mr-[30px] text-[12px] md:text-[20px] font-[400] ">
                      {courseData?.courseFullName}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="lg:flex grid grid-cols-2 gap-5 p-5">
            <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#6278FF] flex flex-col px-2 rounded-md py-4 font-sans">
              <div className="justify-between items-stretch flex gap-5">
                <div className="text-white text-sm font-medium tracking-widest">
                  Course Completion Percentage(%)
                </div>
                <img
                  alt="icon"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                  className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
              <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                {completionPercentage ? completionPercentage : "0"}
              </div>
            </div>
            <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#E8B912] flex flex-col px-2 rounded-md py-4 font-sans">
              <div className="justify-between items-stretch flex gap-5">
                <div className="text-white text-sm font-medium tracking-widest">
                  Total Enrolled Students
                </div>
                <img
                  alt="icon"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                  className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
              <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                {courseDetails?.studentCount
                  ? courseDetails?.studentCount
                  : "0"}
              </div>
            </div>
            <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#8064F0] flex flex-col px-2 rounded-md py-4 font-sans">
              <div className="justify-between items-stretch flex gap-5">
                <div className="text-white text-sm font-medium tracking-widest">
                  Total Weeks
                </div>
                <img
                  alt="icon"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                  className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
              <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                {courseDetails?.numberOfWeeks
                  ? courseDetails?.numberOfWeeks
                  : "0"}
              </div>
            </div>
            <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#0A98EA] flex flex-col px-2 rounded-md py-4 font-sans">
              <div className="justify-between items-stretch flex gap-5">
                <div className="text-white text-sm font-medium tracking-widest">
                  Total Chapters
                </div>
                <img
                  alt="icon"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                  className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
              <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                {courseDetails?.numberOfChapters
                  ? courseDetails?.numberOfChapters
                  : "0"}
              </div>
            </div>
            <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#5c0aea] flex flex-col px-2 rounded-md py-4 font-sans">
              <div className="justify-between items-stretch flex gap-5">
                <div className="text-white text-sm font-medium tracking-widest">
                  Total Tasks
                </div>
                <img
                  alt="icon"
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                  className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                />
              </div>
              <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                {courseDetails?.totalTaskCount
                  ? courseDetails?.totalTaskCount
                  : "0"}
              </div>
            </div>
          </div>
          <div
            style={{ height: "70vh" }}
            className="overflow-x-auto lg:mx-24 mx-5"
          >
            <table className="min-w-full font-sans bg-white border border-gray-300 table-fixed">
              <thead className="bg-gray-800 text-white sticky top-0">
                <tr className="w-full">
                  <th className="w-1/5 py-3 px-6 border-b text-left">
                    Task Type
                  </th>
                  <th className="w-1/5 py-3 px-6 border-b text-left">
                    Total Count
                  </th>
                  <th className="w-1/5 py-3 px-6 border-b text-left">
                    Completion Percentage(%)
                  </th>
                </tr>
              </thead>
              <tbody>
                <>
                  <tr className={"bg-gray-200 w-full border-gray-300 border-b"}>
                    <td
                      onClick={() => {
                        if (isOpenTaskType === "Assignment") {
                          setIsOpenTaskType("");
                        } else {
                          setIsOpenTaskType("Assignment");
                        }
                      }}
                      className="py-4 px-6  text-left cursor-pointer"
                    >
                      Assignments
                      {isOpenTaskType === "Assignment" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </td>
                    <td className="py-4 px-6 text-left">
                      {courseDetails?.taskTypeDetails?.Assignment?.taskCount}
                    </td>
                    <td
                      className={`py-4 px-6 text-left ${percentageColor(
                        courseDetails?.taskTypeDetails?.Assignment
                          ?.overallCompletionPercentage
                      )}`}
                    >
                      {
                        courseDetails?.taskTypeDetails?.Assignment
                          ?.overallCompletionPercentage
                      }
                    </td>
                  </tr>
                  {isOpenTaskType === "Assignment" && (
                    <>
                      {courseDetails?.taskTypeDetails?.Assignment?.tasks?.map(
                        (task, index) => (
                          <tr key={index} className={"bg-gray-100 "}>
                            <th
                              onClick={() =>
                                fileView(task?.file)
                              }
                            className="py-2 px-5 border-b text-left cursor-pointer">
                              {task?.taskName}
                            </th>
                            <th className="py-2 px-5 border-b text-left">1</th>
                            <th
                              className={`py-2 px-5 border-b text-left ${percentageColor(
                                task?.completionPercentage
                              )}`}
                            >
                              {Number(task?.completionPercentage).toFixed(2)}
                            </th>
                          </tr>
                        )
                      )}
                    </>
                  )}
                </>
                <>
                  <tr className={"bg-gray-200 w-full border-gray-300 border-b"}>
                    <td
                      onClick={() => {
                        if (isOpenTaskType === "Video") {
                          setIsOpenTaskType("");
                        } else {
                          setIsOpenTaskType("Video");
                        }
                      }}
                      className="py-4 px-6 text-left cursor-pointer"
                    >
                      Videos
                      {isOpenTaskType === "Video" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </td>
                    <td className="py-4 px-6 text-left">
                      {courseDetails?.taskTypeDetails?.Video?.taskCount}
                    </td>
                    <td
                      className={`py-4 px-6 text-left ${percentageColor(
                        courseDetails?.taskTypeDetails?.Video
                          ?.overallCompletionPercentage
                      )}`}
                    >
                      {
                        courseDetails?.taskTypeDetails?.Video
                          ?.overallCompletionPercentage
                      }
                    </td>
                  </tr>
                  {isOpenTaskType === "Video" && (
                    <>
                      {courseDetails?.taskTypeDetails?.Video?.tasks?.map(
                        (task, index) => (
                          <tr key={index} className={"bg-gray-100 "}>
                            <th
                            
                            onClick={() => fileView(task?.additionalFiles)}
                            className="py-2 px-5 border-b text-left">
                              {task?.taskName}
                            </th>
                            <th className="py-2 px-5 border-b text-left">1</th>
                            <th
                              className={`py-2 px-5 border-b text-left ${percentageColor(
                                task?.completionPercentage
                              )}`}
                            >
                              {Number(task?.completionPercentage).toFixed(2)}
                            </th>
                          </tr>
                        )
                      )}
                    </>
                  )}
                </>
                <>
                  <tr className={"bg-gray-200 w-full border-gray-300 border-b"}>
                    <td
                      onClick={() => {
                        if (isOpenTaskType === "Reading") {
                          setIsOpenTaskType("");
                        } else {
                          setIsOpenTaskType("Reading");
                        }
                      }}
                      className="py-4 px-6 text-left cursor-pointer"
                    >
                      Readings
                      {isOpenTaskType === "Reading" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </td>
                    <td className="py-4 px-6 text-left">
                      {courseDetails?.taskTypeDetails?.Reading?.taskCount}
                    </td>
                    <td
                      className={`py-4 px-6 text-left ${percentageColor(
                        courseDetails?.taskTypeDetails?.Reading
                          ?.overallCompletionPercentage
                      )}`}
                    >
                      {
                        courseDetails?.taskTypeDetails?.Reading
                          ?.overallCompletionPercentage
                      }
                    </td>
                  </tr>
                  {isOpenTaskType === "Reading" && (
                    <>
                      {courseDetails?.taskTypeDetails?.Reading?.tasks?.map(
                        (task, index) => (
                          <tr className={"bg-gray-100"}>
                            <th className="py-2 px-5 border-b text-left">
                              {task?.taskName}
                            </th>
                            <th className="py-2 px-5 border-b text-left">1</th>
                            <th
                              className={`py-2 px-5 border-b text-left ${percentageColor(
                                task?.completionPercentage
                              )}`}
                            >
                              {Number(task?.completionPercentage).toFixed(2)}
                            </th>
                          </tr>
                        )
                      )}
                    </>
                  )}
                </>
                <>
                  <tr className={"bg-gray-200 w-full border-gray-300 border-b"}>
                    <td
                      onClick={() => {
                        if (isOpenTaskType === "Classes") {
                          setIsOpenTaskType("");
                        } else {
                          setIsOpenTaskType("Classes");
                        }
                      }}
                      className="py-4 px-6 text-left cursor-pointer"
                    >
                      Classes
                      {isOpenTaskType === "Classes" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </td>
                    <td className="py-4 px-6 text-left">
                      {courseDetails?.taskTypeDetails?.Classes?.taskCount}
                    </td>
                    <td
                      className={`py-4 px-6 text-left ${percentageColor(
                        courseDetails?.taskTypeDetails?.Classes
                          ?.overallCompletionPercentage
                      )}`}
                    >
                      {
                        courseDetails?.taskTypeDetails?.Classes
                          ?.overallCompletionPercentage
                      }
                    </td>
                  </tr>
                  {isOpenTaskType === "Classes" && (
                    <>
                      {courseDetails?.taskTypeDetails?.Classes?.tasks?.map(
                        (task, index) => (
                          <tr className={"bg-gray-100 "}>
                            <th className="py-2 px-5 border-b text-left">
                              {task?.taskName}
                            </th>
                            <th className="py-2 px-5 border-b text-left">1</th>
                            <th
                              className={`py-2 px-5 border-b text-left ${percentageColor(
                                task?.completionPercentage
                              )}`}
                            >
                              {Number(task?.completionPercentage).toFixed(2)}
                            </th>
                          </tr>
                        )
                      )}
                    </>
                  )}
                </>
                <>
                  <tr className={"bg-gray-200 w-full border-gray-300 border-b"}>
                    <td
                      onClick={() => {
                        if (isOpenTaskType === "Files") {
                          setIsOpenTaskType("");
                        } else {
                          setIsOpenTaskType("Files");
                        }
                      }}
                      className="py-4 px-6 text-left cursor-pointer"
                    >
                      Files
                      {isOpenTaskType === "Files" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </td>
                    <td className="py-4 px-6 text-left">
                      {courseDetails?.taskTypeDetails?.Files?.taskCount}
                    </td>
                    <td
                      className={`py-4 px-6 text-left ${percentageColor(
                        courseDetails?.taskTypeDetails?.Files
                          ?.overallCompletionPercentage
                      )}`}
                    >
                      {
                        courseDetails?.taskTypeDetails?.Files
                          ?.overallCompletionPercentage
                      }
                    </td>
                  </tr>
                  {isOpenTaskType === "Files" && (
                    <>
                      {courseDetails?.taskTypeDetails?.Files?.tasks?.map(
                        (task, index) => (
                          <tr className={"bg-gray-100"}>
                            <th className="py-2 px-5 border-b text-left">
                              {task?.taskName}
                            </th>
                            <th className="py-2 px-5 border-b text-left">1</th>
                            <th
                              className={`py-2 px-5 border-b text-left ${percentageColor(
                                task?.completionPercentage
                              )}`}
                            >
                              {Number(task?.completionPercentage).toFixed(2)}
                            </th>
                          </tr>
                        )
                      )}
                    </>
                  )}
                </>
                <>
                  <tr className={"bg-gray-200 w-full border-gray-300 border-b"}>
                    <td
                      onClick={() => {
                        if (isOpenTaskType === "Quiz") {
                          setIsOpenTaskType("");
                        } else {
                          setIsOpenTaskType("Quiz");
                        }
                      }}
                      className="py-4 px-6 text-left cursor-pointer"
                    >
                      Quiz
                      {isOpenTaskType === "Quiz" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </td>
                    <td className="py-4 px-6 text-left">
                      {courseDetails?.taskTypeDetails?.Quiz?.taskCount}
                    </td>
                    <td
                      className={`py-4 px-6 text-left ${percentageColor(
                        courseDetails?.taskTypeDetails?.Quiz
                          ?.overallCompletionPercentage
                      )}`}
                    >
                      {
                        courseDetails?.taskTypeDetails?.Quiz
                          ?.overallCompletionPercentage
                      }
                    </td>
                  </tr>
                  {isOpenTaskType === "Quiz" && (
                    <>
                      {courseDetails?.taskTypeDetails?.Quiz?.tasks?.map(
                        (task, index) => (
                          <tr className={"bg-gray-100"}>
                            <th className="py-2 px-5 border-b text-left">
                              {task?.taskName}
                            </th>
                            <th className="py-2 px-5 border-b text-left">1</th>
                            <th
                              className={`py-2 px-5 border-b text-left ${percentageColor(
                                task?.completionPercentage
                              )}`}
                            >
                              {Number(task?.completionPercentage).toFixed(2)}
                            </th>
                          </tr>
                        )
                      )}
                    </>
                  )}
                </>
                <>
                  <tr className={"bg-gray-200 w-full border-gray-300 border-b"}>
                    <td
                      onClick={() => {
                        if (isOpenTaskType === "Schedule") {
                          setIsOpenTaskType("");
                        } else {
                          setIsOpenTaskType("Schedule");
                        }
                      }}
                      className="py-4 px-6 text-left cursor-pointer"
                    >
                      Schedule
                      {isOpenTaskType === "Schedule" ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </td>
                    <td className="py-4 px-6 text-left">
                      {courseDetails?.taskTypeDetails?.Schedule?.taskCount}
                    </td>
                    <td
                      className={`py-4 px-6 text-left ${percentageColor(
                        courseDetails?.taskTypeDetails?.Schedule
                          ?.overallCompletionPercentage
                      )}`}
                    >
                      {
                        courseDetails?.taskTypeDetails?.Schedule
                          ?.overallCompletionPercentage
                      }
                    </td>
                  </tr>
                  {isOpenTaskType === "Schedule" && (
                    <>
                      {courseDetails?.taskTypeDetails?.Schedule?.tasks?.map(
                        (task, index) => (
                          <tr className={"bg-gray-100"}>
                            <th className="py-2 px-5 border-b text-left">
                              {task?.taskName}
                            </th>
                            <th className="py-2 px-5 border-b text-left">1</th>
                            <th
                              className={`py-2 px-5 border-b text-left ${percentageColor(
                                task?.completionPercentage
                              )}`}
                            >
                              {Number(task?.completionPercentage).toFixed(2)}
                            </th>
                          </tr>
                        )
                      )}
                    </>
                  )}
                </>
                {/* {courseData.map((data, index) => {
                  // const endDate = new Date(data?.courseEndingDate);
                  const isExpanded = !!expandedRows[data._id];
                  const courseWeekData = weekData.find(
                    (weekArray) => weekArray[0]?.courseId === data._id
                  );
                  const { course, batch } = data;
                  const startDate = new Date(course?.enrollDate);

                  const currentDate = new Date();

                  // Calculate the difference in milliseconds
                  const timeDifference = currentDate - startDate;

                  // Convert milliseconds to days
                  const daysDifference = Math.floor(
                    timeDifference / (1000 * 60 * 60 * 24)
                  );
                  const courseDuration = +(data?.expirationDay || "0");
                  const expired = daysDifference > courseDuration;

                  let displayExpiration = "";
                  if (courseDuration !== 0) {
                    const expirationDate = new Date(
                      startDate.getTime() + courseDuration * 24 * 60 * 60 * 1000
                    );

                    // Format the expiration date back to a string if necessary
                    // This example returns the date as YYYY-MM-DD
                    displayExpiration = expirationDate
                      .toISOString()
                      .split("T")[0];
                  }

                  console.log("My Console ==============>", data, expired);
                  return (
                    <React.Fragment key={index}>
                      {" "}
                      <tr key={index} className={"bg-gray-200 w-full"}>
                        <td className="py-4 px-6 border-b text-left">
                          {data?.courseFullName || "Not Available"}
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          {data?.courseCategory || "Not Available"}
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          {data?.organization?.organizationName ||
                            "Not Available"}
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          {course?.enrollDate?.slice(0, 10) || "Not Available"}
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          {displayExpiration || "No Expiration"}
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          {batch.batchName || "Not Available"}
                        </td>
                        <td className="py-4 px-6 border-b text-left flex flex-col gap-2">
                          <button
                            onClick={() => handleRefund(course)}
                            disabled={expired}
                            className="bg-blue text-white font-bold px-2 py-1 rounded-full hover:bg-opacity-60 disabled:bg-red-400"
                          >
                            {expired ? "Expired" : "Refund"}
                          </button>
                        </td>
                      </tr>
                      <tr
                        className="bg-sky-600 text-white cursor-pointer"
                        onClick={() => toggleCourseDetails(data._id)}
                      >
                        <td
                          colSpan="7"
                          className="py-2 px-6 border-b text-center"
                        >
                          <div className="flex justify-center items-center gap-2 w-full">
                            <span>
                              Progress Details:{" "}
                              {data?.courseFullName || "Not Available"}
                            </span>
                            {isExpanded ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <>
                          <tr className={"bg-gray-100  sticky top-0"}>
                            <th className="py-2 px-5 border-b text-left">
                              Week
                            </th>
                            <th className="py-2 px-5 border-b text-left">
                              Chapter
                            </th>
                            <th className="py-2 px-5 border-b text-left">
                              Task
                            </th>
                            <th className="py-2 px-5 border-b text-left">
                              Completion Status
                            </th>
                            <th className="py-2 px-5 border-b text-left">
                              Deadline for completion
                            </th>
                            <th
                              className="py-2 px-5 border-b text-left"
                              colSpan={2}
                            >
                              WA/Email Nudge
                            </th>
                          </tr>
                          {courseWeekData?.map((weekDetail, index) => (
                            <WeekChapData
                              userId={profileInfo?._id}
                              weekData={weekDetail}
                              serial={index}
                              key={index}
                            />
                          ))}
                        </>
                      )}
                    </React.Fragment>
                  );
                })} */}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CourseAnalysis;
