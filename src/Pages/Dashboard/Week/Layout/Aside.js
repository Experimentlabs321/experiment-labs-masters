import React, { useContext, useEffect, useRef, useState } from "react";
import Reading from "../../../../assets/Dashboard/TaskIcon.png";
import ReadingActive from "../../../../assets/Dashboard/TaskIconActive.png";
import Assignment from "../../../../assets/Dashboard/Assignment.png";
import AssignmentActive from "../../../../assets/Dashboard/AssignmentActive.png";
import Classes from "../../../../assets/Dashboard/Classes.png";
import ClassesActive from "../../../../assets/Dashboard/ClassesActive.png";
import Quiz from "../../../../assets/Dashboard/Quiz.png";
import QuizActive from "../../../../assets/Dashboard/QuizActive.png";
import LiveTest from "../../../../assets/Dashboard/LiveTest.png";
import LiveTestActive from "../../../../assets/Dashboard/LiveTestActive.png";
import Video from "../../../../assets/Dashboard/Video.png";
import VideoActive from "../../../../assets/Dashboard/VideoActive.png";
import Audio from "../../../../assets/Dashboard/Audio.png";
import AudioActive from "../../../../assets/Dashboard/AudioActive.png";
import Files from "../../../../assets/Dashboard/Files.png";
import FilesActive from "../../../../assets/Dashboard/FilesActive.png";
import calendar from "../../../../assets/Dashboard/calendar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import lock from "../../../../assets/Dashboard/lockWhiteIcon.jpg";
import { AuthContext } from "../../../../contexts/AuthProvider";
import toast from "react-hot-toast";
import Sortable from "sortablejs";
import axios from "axios";
import Loading from "../../../Shared/Loading/Loading";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Badge } from "@mui/material";
import { Box, LinearProgress } from "@mui/material";

const Aside = ({
  toggleButton,
  setToggleButton,
  data,
  openTask,
  setOpenTask,
  openTopic,
  setOpenTopic,
  chapters,
  setChapters,
  courseData,
  count,
  setCount,
  taskData,
  taskCompletionCount,
  setTaskCompletionCount,
}) => {
  // const [openTopic, setOpenTopic] = useState(data[0]?.name);
  // const [openTask, setOpenTask] = useState(data[0]?.tasks[0]);
  const Role = localStorage.getItem("role");
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Category");
  const [clickedChapter, setClickedChapter] = useState({});
  const options = ["Category name"];
  const [openTopics, setOpenTopics] = useState([]);
  const { userInfo, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loadingChapterId, setLoadingChapterId] = useState("");

  const asideRef = useRef(null); // Create a ref for the aside element

  const handleGetChapterDataWithTask = async (chapterId, index) => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/${chapterId}/${
          chapters[index - 1]?._id || "unavailable"
        }/email/${user?.email}`
      )
      .then((response) => {
        if (userInfo?.role === "admin") {
          setOpenTopics([
            ...openTopics?.filter((i) => i?._id !== chapterId),
            response?.data[0],
          ]);
          setLoadingChapterId("");
        } else {
          const batchId = userInfo?.courses?.find(
            (item) => item?.courseId === courseData?._id
          )?.batchId;
          let singleChapter = { ...response?.data[0] };
          singleChapter.tasks = [];
          response?.data[0]?.tasks?.forEach((singleTask) => {
            if (
              singleTask?.batches?.find(
                (singleBatch) => singleBatch?.batchId === batchId
              )
            ) {
              singleChapter.tasks.push(singleTask);
              // console.log(item);
            }
          });
          setOpenTopics([
            ...openTopics?.filter((i) => i?._id !== chapterId),
            singleChapter,
          ]);
          setLoadingChapterId("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.log(openTopics);

  // Effect for handling clicks outside of the aside
  useEffect(() => {
    function handleClickOutside(event) {
      if (asideRef.current && !asideRef.current.contains(event.target)) {
        if (window.innerWidth <= 768) {
          // If the click is outside the sidebar and we're on a mobile device, hide the sidebar
          setToggleButton(false); // Assuming setToggleButton(true) hides the sidebar
        }
      }
    }

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setToggleButton]);

  useEffect(() => {
    if (openTopics?.length === 0) {
      if (chapters && chapters[0]) {
        const indexOfTaskChapter = chapters.findIndex(
          (x) => x?._id === taskData?.chapterId
        );
        if (taskData?.chapterId) {
          setLoadingChapterId(taskData?.chapterId);
          handleGetChapterDataWithTask(taskData?.chapterId, indexOfTaskChapter);
        }
      }
    }
  }, [taskData, chapters]);

  const handleGetChapterDataWithTaskForTaskCompletion = async (
    chapterId,
    index
  ) => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/${chapterId}/${
          chapters[index - 1]?._id || "unavailable"
        }/email/${user?.email}`
      )
      .then((response) => {
        if (userInfo?.role === "admin") {
          setOpenTopics([response?.data[0]]);
          setLoadingChapterId("");
        } else {
          const batchId = userInfo?.courses?.find(
            (item) => item?.courseId === courseData?._id
          )?.batchId;
          let singleChapter = { ...response?.data[0] };
          singleChapter.tasks = [];
          response?.data[0]?.tasks?.forEach((singleTask) => {
            if (
              singleTask?.batches?.find(
                (singleBatch) => singleBatch?.batchId === batchId
              )
            ) {
              singleChapter.tasks.push(singleTask);
              // console.log(item);
            }
          });
          setOpenTopics([singleChapter]);
          setLoadingChapterId("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setOpenTopics([]);
    if (openTopics?.length > 0 && taskCompletionCount !== 0) {
      const indexOfTaskChapter = chapters.findIndex(
        (x) => x?._id === taskData?.chapterId
      );
      if (taskData?.chapterId) {
        setLoadingChapterId(taskData?.chapterId);
        handleGetChapterDataWithTaskForTaskCompletion(
          taskData?.chapterId,
          indexOfTaskChapter
        );
      }
    }
  }, [taskCompletionCount]);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleEditChapter = async (chapter) => {
    const updatedChapter = { ...chapter };
    delete updatedChapter._id;
    // console.log(chapter);
    if (chapter?._id) {
      try {
        const newChapter = await axios.put(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/chapters/${chapter?._id}`,
          updatedChapter
        );
        // setCount(count + 1);
        // console.log(newChapter);
        // console.log(chapter);
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const handleMoveChapter = async (oldIndex, newIndex) => {
    // console.log(oldIndex, newIndex);
    Loading();
    if (oldIndex >= 0 && newIndex >= 0 && newIndex < chapters?.length) {
      const newChapterId = chapters[oldIndex]._id;
      const oldChapterId = chapters[newIndex]._id;
      const newChapter = chapters[newIndex];
      const oldChapter = chapters[oldIndex];
      newChapter._id = newChapterId;
      oldChapter._id = oldChapterId;
      // console.log(newChapter, oldChapter);
      await handleEditChapter(newChapter);
      await handleEditChapter(oldChapter);
      setCount(count + 1);
    }
    Loading().close();
  };

  const containerRef = useRef(null);
  let sortable;

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    // Initialize the main Sortable
    sortable = new Sortable(containerElement, {
      animation: 150,
      group: "nested",
      // onEnd: (event) => {
      //   console.log(event);
      //   console.log(`Moved from index ${event.oldIndex} to ${event.newIndex}`);
      // },
      onEnd: (event) => {
        const { oldIndex, newIndex } = event;
        // console.log(chapters[event.oldIndex], chapters[event.newIndex]);
        // console.log(`Moved from index ${event.oldIndex} to ${event.newIndex}`);
        // Update the chapters state based on the rearrangement
        setChapters((prevChapters) => {
          // Clone the previous chapters array to avoid mutation
          const updatedChapters = [...prevChapters];
          // Rearrange the chapters
          const [movedChapter] = updatedChapters.splice(oldIndex, 1);
          updatedChapters.splice(newIndex, 0, movedChapter);
          // console.log(prevChapters, updatedChapters);
          prevChapters?.forEach(async (chapter, index) => {
            // console.log(chapter, updatedChapters[index]);
            const updatedChapter = { ...updatedChapters[index] };
            updatedChapter._id = chapter?._id;
            // console.log(updatedChapter);
            await handleEditChapter(updatedChapter);
          });
          return updatedChapters;
        });
        setCount(count + 1);
      },
    });

    chapters?.forEach((chapter, chapterIndex) => {
      const chapterContainer = containerElement.children[chapterIndex];
      const tasksContainer = chapterContainer.querySelector(".sub-items");

      // Assign a unique group name for each chapter's tasks
      const taskGroupName = `chapter-tasks-${chapterIndex}`;

      if (tasksContainer) {
        new Sortable(tasksContainer, {
          animation: 150,
          group: taskGroupName,
          onEnd: (event) => {
            // console.log(
            //   `Moved from index ${event.oldIndex} to ${event.newIndex}`,
            //   chapters
            // );
            const { oldIndex, newIndex } = event;
            // Update the tasks array of the corresponding chapter
            setChapters((prevChapters) => {
              const updatedChapters = [...prevChapters];
              const updatedTasks = [...updatedChapters[chapterIndex].tasks];
              // Rearrange the tasks
              const [movedTask] = updatedTasks.splice(oldIndex, 1);
              updatedTasks.splice(newIndex, 0, movedTask);
              // Update the tasks array of the specific chapter
              updatedChapters[chapterIndex] = {
                ...updatedChapters[chapterIndex],
                tasks: updatedTasks,
              };
              handleEditChapter(updatedChapters[chapterIndex]);
              // const updatedChapter = { ...updatedChapters[chapterIndex] };
              // delete updatedChapter._id;
              // const newChapter = axios.put(
              //   `${process.env.REACT_APP_SERVER_API}/api/v1/chapters/chapters/${updatedChapters[chapterIndex]?._id}`,
              //   updatedChapter
              // );
              // console.log(newChapter);
              return updatedChapters;
            });
            // setCount(count + 1);
          },
        });
      }
    });

    return () => {
      sortable.destroy();
      // Also, make sure to destroy all the task Sortables here if needed.
    };
  }, [chapters]);

  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if (!chapters[0]) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [chapters]);

  return (
    <aside
      // ref={asideRef}
      id="sidebar"
      className={`fixed ${
        toggleButton ? " lg:flex" : "hidden"
      } z-20 h-full top-0 bg-[#141414] shadow-lg left-0  flex-shrink-0 flex-col w-[324px] transition duration-500 ease-in-out delay-150`}
      aria-label="Sidebar"
    >
      <div className=" flex-1 flex flex-col min-h-0 pt-0">
        <div className="flex-1 flex flex-col pb-4 ">
          <div className="flex-1 space-y-1">
            <button
              onClick={() => setToggleButton(false)}
              className="text-white  pt-[125px] font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="17"
                viewBox="0 0 21 17"
                fill="none"
              >
                <path
                  d="M2.55758 6.94027C1.66762 6.94027 0.949219 7.65867 0.949219 8.54862C0.949219 9.43858 1.66762 10.157 2.55758 10.157C3.44753 10.157 4.16593 9.43858 4.16593 8.54862C4.16593 7.65867 3.44753 6.94027 2.55758 6.94027ZM2.55758 0.506836C1.66762 0.506836 0.949219 1.22524 0.949219 2.11519C0.949219 3.00515 1.66762 3.72355 2.55758 3.72355C3.44753 3.72355 4.16593 3.00515 4.16593 2.11519C4.16593 1.22524 3.44753 0.506836 2.55758 0.506836ZM2.55758 13.3737C1.66762 13.3737 0.949219 14.1028 0.949219 14.9821C0.949219 15.8613 1.67834 16.5904 2.55758 16.5904C3.43681 16.5904 4.16593 15.8613 4.16593 14.9821C4.16593 14.1028 3.44753 13.3737 2.55758 13.3737ZM5.77429 16.0543H20.7856V13.9098H5.77429V16.0543ZM5.77429 9.62086H20.7856V7.47639H5.77429V9.62086ZM5.77429 1.04296V3.18743H20.7856V1.04296H5.77429Z"
                  fill="white"
                />
              </svg>
              <h1 className="ml-3 text-[18px] font-[500]">Hide menu</h1>
            </button>
            <ul
              // ref={Role === "admin" ? containerRef : null}
              className="space-y-2 h-[80vh] overflow-y-auto labJourneyRemoveScroll pb-20 text-white"
            >
              {/* <li>
                <button
                  onClick={() => setToggleButton(false)}
                  className="text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                  >
                    <path
                      d="M2.55758 6.94027C1.66762 6.94027 0.949219 7.65867 0.949219 8.54862C0.949219 9.43858 1.66762 10.157 2.55758 10.157C3.44753 10.157 4.16593 9.43858 4.16593 8.54862C4.16593 7.65867 3.44753 6.94027 2.55758 6.94027ZM2.55758 0.506836C1.66762 0.506836 0.949219 1.22524 0.949219 2.11519C0.949219 3.00515 1.66762 3.72355 2.55758 3.72355C3.44753 3.72355 4.16593 3.00515 4.16593 2.11519C4.16593 1.22524 3.44753 0.506836 2.55758 0.506836ZM2.55758 13.3737C1.66762 13.3737 0.949219 14.1028 0.949219 14.9821C0.949219 15.8613 1.67834 16.5904 2.55758 16.5904C3.43681 16.5904 4.16593 15.8613 4.16593 14.9821C4.16593 14.1028 3.44753 13.3737 2.55758 13.3737ZM5.77429 16.0543H20.7856V13.9098H5.77429V16.0543ZM5.77429 9.62086H20.7856V7.47639H5.77429V9.62086ZM5.77429 1.04296V3.18743H20.7856V1.04296H5.77429Z"
                      fill="white"
                    />
                  </svg>
                  <h1 className="ml-3 text-[18px] font-[500]">Hide menu</h1>
                </button>
              </li> */}
              {!chapters[0] && (
                <div className=" flex justify-center  w-full  ">
                  <div className="flex flex-col items-center gap-3">
                    <p className="mt-20">Loading...</p>
                    <Box sx={{ width: "180px" }}>
                      <LinearProgress
                        sx={{ height: "20px", borderRadius: "10px" }}
                        variant="determinate"
                        value={progress}
                      />
                    </Box>
                  </div>

                  {/* <CircularProgress className="w-full mx-auto" /> */}
                </div>
              )}
              {chapters?.map((item, index) => {
                const chapterIndex = index;
                return (
                  <li key={item?._id} className="">
                    <div>
                      <div
                        // onClick={() => setOpenTopic(item?.chapterName)}

                        onClick={() => {
                          // const findChapter = openTopics?.find(
                          //   (c) => c === item?._id
                          // );
                          // if (findChapter) {
                          //   setOpenTopics(
                          //     openTopics?.filter((i) => i !== item?._id)
                          //   );
                          // } else {
                          //   setOpenTopics([...openTopics, item?._id]);
                          // }

                          const findChapter = openTopics?.find(
                            (i) => i?._id === item?._id
                          );
                          if (findChapter) {
                            setOpenTopics(
                              openTopics?.filter((i) => i?._id !== item?._id)
                            );
                          } else {
                            setLoadingChapterId(item?._id);
                            handleGetChapterDataWithTask(item?._id, index);
                            // setOpenTopics([...openTopics, chapter?._id]);
                          }
                        }}
                        className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px] cursor-pointer group`}
                      >
                        <div className="min-w-[42px] min-h-[42px] bg-[#D7DDFF] text-black flex items-center justify-center rounded-full ">
                          {index + 1}
                        </div>

                        <h1
                          className={`text-white ml-3 text-[18px] font-[500] flex items-center justify-center `}
                        >
                          <span className="mr-[10px]">{item?.chapterName}</span>
                          {/* {Role === "admin" && (
                            <button>
                              <svg
                                className="mr-[10px]"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                              >
                                <path
                                  d="M13.6558 0.724121L17.3789 4.64745L14.5407 7.63965L10.8176 3.71632L13.6558 0.724121ZM0.0195312 19.0173H3.74259L12.7859 9.48754L9.06284 5.5642L0.0195312 15.094V19.0173Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          )} */}
                          <div className="relative flex items-center">
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M6.17272 8.88379L11.8403 14.5513L17.5078 8.88379"
                                  stroke="white"
                                  stroke-width="1.88918"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                          {Role === "admin" && (
                            <div className="relative flex items-center">
                              <button
                                // onClick={() => {
                                //   if (clickedChapter === item)
                                //     setClickedChapter(null);
                                //   else setClickedChapter(item);
                                // }}
                                // onBlur={() => setClickedChapter(null)}
                                className=" "
                              >
                                <svg
                                  className=" float-right"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 25 25"
                                  fill="none"
                                >
                                  <path
                                    d="M12.4974 10.417C11.3516 10.417 10.4141 11.3545 10.4141 12.5003C10.4141 13.6462 11.3516 14.5837 12.4974 14.5837C13.6432 14.5837 14.5807 13.6462 14.5807 12.5003C14.5807 11.3545 13.6432 10.417 12.4974 10.417ZM12.4974 4.16699C11.3516 4.16699 10.4141 5.10449 10.4141 6.25033C10.4141 7.39616 11.3516 8.33366 12.4974 8.33366C13.6432 8.33366 14.5807 7.39616 14.5807 6.25033C14.5807 5.10449 13.6432 4.16699 12.4974 4.16699ZM12.4974 16.667C11.3516 16.667 10.4141 17.6045 10.4141 18.7503C10.4141 19.8962 11.3516 20.8337 12.4974 20.8337C13.6432 20.8337 14.5807 19.8962 14.5807 18.7503C14.5807 17.6045 13.6432 16.667 12.4974 16.667Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              {clickedChapter === item && (
                                <ul className="absolute right-0 top-[35px] w-max border  bg-white border-t-0 p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                                  <li
                                    onMouseDown={() => {
                                      handleMoveChapter(index, index - 1);
                                    }}
                                    className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-black text-[13px] font-[600] "
                                  >
                                    <ArrowUpwardIcon
                                      sx={{ fontSize: 18, marginRight: 1 }}
                                    />
                                    Move one step up
                                  </li>
                                  <li
                                    className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-black text-[13px] font-[600] "
                                    onMouseDown={() => {
                                      handleMoveChapter(index, index + 1);
                                    }}
                                  >
                                    <ArrowDownwardIcon
                                      sx={{ fontSize: 18, marginRight: 1 }}
                                    />
                                    Move one step down
                                  </li>
                                </ul>
                              )}
                            </div>
                          )}
                        </h1>
                      </div>
                      {loadingChapterId === item?._id && (
                        <div>
                          <div class="flex space-x-2 justify-center items-center h-20">
                            <span class="sr-only">Loading...</span>
                            <div class="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div class="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div class="h-4 w-4 bg-white rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      )}
                      <div
                        className={` ${
                          openTopics?.find((topic) => topic?._id === item?._id)
                            ? ""
                            : "hidden"
                        } sub-items`}
                      >
                        {Role === "admin" &&
                          openTopics
                            ?.find((i) => i?._id === item?._id)
                            ?.tasks?.map((task, index) => (
                              <div
                                key={task?.taskId}
                                onClick={() => {
                                  setOpenTask(task);
                                  localStorage.setItem(
                                    "task",
                                    JSON.stringify(task)
                                  );
                                  navigate(
                                    `/taskDetails/${task?.taskId}?taskType=${task?.taskType}`
                                  );
                                  if (window.innerWidth <= 768) {
                                    // If the click is outside the sidebar and we're on a mobile device, hide the sidebar
                                    setToggleButton(false); // Assuming setToggleButton(true) hides the sidebar
                                  }
                                }}
                                className={`${
                                  openTask?.taskId === task?.taskId
                                    ? "bg-[#FFFDCF] border-[#3E4DAC] border-l-[12px] pl-[8px]"
                                    : "pl-[20px]"
                                }  text-white font-normal flex items-center justify-between pr-[10px] py-[13px] group cursor-pointer`}
                              >
                                <div className="flex items-center">
                                  <div className="min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] text-black flex items-center justify-center rounded-full ">
                                    {task?.taskType === "Reading" && (
                                      <img
                                        className={`${
                                          openTask?.taskId === task?.taskId
                                            ? "border-black"
                                            : "border-white"
                                        }  border p-[5px] rounded-full `}
                                        src={
                                          openTask?.taskId === task?.taskId
                                            ? ReadingActive
                                            : Reading
                                        }
                                        alt="TaskIcon"
                                      />
                                    )}
                                    {task?.taskType === "Assignment" && (
                                      <img
                                        className={`${
                                          openTask?.taskId === task?.taskId
                                            ? "border-black"
                                            : "border-white"
                                        }  border p-[5px] rounded-full `}
                                        src={
                                          openTask?.taskId === task?.taskId
                                            ? AssignmentActive
                                            : Assignment
                                        }
                                        alt="TaskIcon"
                                      />
                                    )}
                                    {task?.taskType === "Classes" && (
                                      <img
                                        className={`${
                                          openTask?.taskId === task?.taskId
                                            ? "border-black"
                                            : "border-white"
                                        }  border p-[5px] rounded-full `}
                                        src={
                                          openTask?.taskId === task?.taskId
                                            ? ClassesActive
                                            : Classes
                                        }
                                        alt="TaskIcon"
                                      />
                                    )}
                                    {task?.taskType === "Quiz" && (
                                      <img
                                        className={`${
                                          openTask?.taskId === task?.taskId
                                            ? "border-black"
                                            : "border-white"
                                        }  border p-[5px] rounded-full `}
                                        src={
                                          openTask?.taskId === task?.taskId
                                            ? QuizActive
                                            : Quiz
                                        }
                                        alt="TaskIcon"
                                      />
                                    )}
                                    {task?.taskType === "Live Test" && (
                                      <img
                                        className={`${
                                          openTask?.taskId === task?.taskId
                                            ? "border-black"
                                            : "border-white"
                                        }  border p-[5px] rounded-full `}
                                        src={
                                          openTask?.taskId === task?.taskId
                                            ? LiveTestActive
                                            : LiveTest
                                        }
                                        alt="TaskIcon"
                                      />
                                    )}
                                    {task?.taskType === "Video" && (
                                      <img
                                        className={`${
                                          openTask?.taskId === task?.taskId
                                            ? "border-black"
                                            : "border-white"
                                        }  border p-[5px] rounded-full `}
                                        src={
                                          openTask?.taskId === task?.taskId
                                            ? VideoActive
                                            : Video
                                        }
                                        alt="TaskIcon"
                                      />
                                    )}
                                    {task?.taskType === "Audio" && (
                                      <img
                                        className={`${
                                          openTask?.taskId === task?.taskId
                                            ? "border-black"
                                            : "border-white"
                                        }  border p-[5px] rounded-full `}
                                        src={
                                          openTask?.taskId === task?.taskId
                                            ? AudioActive
                                            : Audio
                                        }
                                        alt="TaskIcon"
                                      />
                                    )}
                                    {task?.taskType === "Files" && (
                                      <img
                                        className={`${
                                          openTask?.taskId === task?.taskId
                                            ? "border-black"
                                            : "border-white"
                                        }  border p-[5px] rounded-full `}
                                        src={
                                          openTask?.taskId === task?.taskId
                                            ? FilesActive
                                            : Files
                                        }
                                        alt="TaskIcon"
                                      />
                                    )}
                                    {task?.taskType === "Schedule" && (
                                      <img
                                        className={`${
                                          openTask?.taskId === task?.taskId
                                            ? "border-black"
                                            : "border-white"
                                        }  border p-[5px] rounded-full `}
                                        src={
                                          openTask?.taskId === task?.taskId
                                            ? calendar
                                            : calendar
                                        }
                                        alt="TaskIcon"
                                      />
                                    )}
                                  </div>
                                  <h1
                                    className={`text-white ml-3 text-[18px] font-[500]  `}
                                  >
                                    <span
                                      className={`mr-[5px] ${
                                        openTask?.taskId === task?.taskId
                                          ? "text-black"
                                          : "text-white"
                                      } `}
                                    >
                                      {/* Task {index + 1}:  */}
                                      {task?.taskType}:
                                    </span>{" "}
                                    <span
                                      className={`mr-[22px] ${
                                        openTask?.taskId === task?.taskId
                                          ? "text-[#3E4DAC]"
                                          : "text-[#A4B0FF]"
                                      }  `}
                                    >
                                      {task?.taskName}
                                    </span>
                                  </h1>
                                </div>
                                {Role === "admin" && (
                                  <>
                                    {openTask?.taskId === task?.taskId ? (
                                      <button>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="25"
                                          height="25"
                                          viewBox="0 0 25 25"
                                          fill="none"
                                        >
                                          <path
                                            d="M12.4974 10.417C11.3516 10.417 10.4141 11.3545 10.4141 12.5003C10.4141 13.6462 11.3516 14.5837 12.4974 14.5837C13.6432 14.5837 14.5807 13.6462 14.5807 12.5003C14.5807 11.3545 13.6432 10.417 12.4974 10.417ZM12.4974 4.16699C11.3516 4.16699 10.4141 5.10449 10.4141 6.25033C10.4141 7.39616 11.3516 8.33366 12.4974 8.33366C13.6432 8.33366 14.5807 7.39616 14.5807 6.25033C14.5807 5.10449 13.6432 4.16699 12.4974 4.16699ZM12.4974 16.667C11.3516 16.667 10.4141 17.6045 10.4141 18.7503C10.4141 19.8962 11.3516 20.8337 12.4974 20.8337C13.6432 20.8337 14.5807 19.8962 14.5807 18.7503C14.5807 17.6045 13.6432 16.667 12.4974 16.667Z"
                                            fill="black"
                                          />
                                        </svg>
                                      </button>
                                    ) : (
                                      <button>
                                        <svg
                                          className=" float-right"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="25"
                                          height="25"
                                          viewBox="0 0 25 25"
                                          fill="none"
                                        >
                                          <path
                                            d="M12.4974 10.417C11.3516 10.417 10.4141 11.3545 10.4141 12.5003C10.4141 13.6462 11.3516 14.5837 12.4974 14.5837C13.6432 14.5837 14.5807 13.6462 14.5807 12.5003C14.5807 11.3545 13.6432 10.417 12.4974 10.417ZM12.4974 4.16699C11.3516 4.16699 10.4141 5.10449 10.4141 6.25033C10.4141 7.39616 11.3516 8.33366 12.4974 8.33366C13.6432 8.33366 14.5807 7.39616 14.5807 6.25033C14.5807 5.10449 13.6432 4.16699 12.4974 4.16699ZM12.4974 16.667C11.3516 16.667 10.4141 17.6045 10.4141 18.7503C10.4141 19.8962 11.3516 20.8337 12.4974 20.8337C13.6432 20.8337 14.5807 19.8962 14.5807 18.7503C14.5807 17.6045 13.6432 16.667 12.4974 16.667Z"
                                            fill="white"
                                          />
                                        </svg>
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            ))}

                        {Role !== "admin" &&
                          openTopics
                            ?.find((i) => i?._id === item?._id)
                            ?.tasks?.map((task, index) => {
                              const userIsParticipant =
                                task?.participants?.some(
                                  (item) =>
                                    item?.participantId === userInfo?._id
                                );

                              const chapterDataForChecking = openTopics?.find(
                                (i) => i?._id === item?._id
                              );

                              const isPreviousTaskCompleted =
                                index === 0 || // Always allow navigation for the first task
                                chapterDataForChecking.tasks?.[
                                  index - 1
                                ]?.participants?.some(
                                  (item) =>
                                    item?.participantId === userInfo?._id &&
                                    (item?.status === "Completed" ||
                                      item?.status === "In Progress")
                                );

                              let isPrevChapterCompleted =
                                chapterDataForChecking?.previousChapterCompletionStatus;

                              if (index !== 0) isPrevChapterCompleted = true;
                              // const userIsParticipant =
                              //   task?.participants?.some(
                              //     (item) =>
                              //       item?.participantId === userInfo?._id
                              //   );

                              // const isPreviousTaskCompleted =
                              //   index === 0 || // Always allow navigation for the first task
                              //   item?.tasks?.[index - 1]?.participants?.some(
                              //     (item) =>
                              //       item?.participantId === userInfo?._id &&
                              //       (item?.status === "Completed" ||
                              //         item?.status === "In Progress")
                              //   );

                              // let isPrevChapterCompleted =
                              //   chapterIndex === 0 ||
                              //   chapters?.[chapterIndex - 1]?.tasks?.[
                              //     chapters?.[chapterIndex - 1]?.tasks?.length -
                              //       1
                              //   ]?.participants?.some(
                              //     (item) =>
                              //       item?.participantId === userInfo?._id &&
                              //       (item?.status === "Completed" ||
                              //         item?.status === "In Progress")
                              //   );

                              // if (index !== 0) isPrevChapterCompleted = true;

                              return (
                                <div
                                  key={task?.taskId}
                                  onClick={() => {
                                    if (
                                      (isPreviousTaskCompleted &&
                                        isPrevChapterCompleted) ||
                                      !(
                                        courseData?.enableDrip || task?.taskDrip
                                      )
                                    ) {
                                      setOpenTask(task);
                                      localStorage.setItem(
                                        "task",
                                        JSON.stringify(task)
                                      );
                                      navigate(
                                        `/taskDetails/${task?.taskId}?taskType=${task?.taskType}`
                                      );
                                    } else
                                      toast.error("Complete the Previous Task");

                                    if (window.innerWidth <= 768) {
                                      // If the click is outside the sidebar and we're on a mobile device, hide the sidebar
                                      setToggleButton(false); // Assuming setToggleButton(true) hides the sidebar
                                    }
                                  }}
                                  className={`${
                                    openTask?.taskId === task?.taskId
                                      ? "bg-[#FFFDCF] border-[#3E4DAC] border-l-[12px] pl-[8px]"
                                      : "pl-[20px]"
                                  }  text-white font-normal flex items-center justify-between pr-[10px] py-[13px] group cursor-pointer`}
                                >
                                  <div className="flex items-center">
                                    <div className="min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px] text-black flex items-center justify-center rounded-full ">
                                      {task?.taskType === "Reading" && (
                                        <img
                                          className={`${
                                            openTask?.taskId === task?.taskId
                                              ? "border-black"
                                              : "border-white"
                                          }  border p-[5px] rounded-full `}
                                          src={
                                            openTask?.taskId === task?.taskId
                                              ? (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                                ? ReadingActive
                                                : lock
                                              : (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                              ? Reading
                                              : lock
                                          }
                                          alt="TaskIcon"
                                        />
                                      )}
                                      {task?.taskType === "Assignment" && (
                                        <img
                                          className={`${
                                            openTask?.taskId === task?.taskId
                                              ? "border-black"
                                              : "border-white"
                                          }  border p-[5px] rounded-full `}
                                          src={
                                            openTask?.taskId === task?.taskId
                                              ? (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                                ? AssignmentActive
                                                : lock
                                              : (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                              ? Assignment
                                              : lock
                                          }
                                          alt="TaskIcon"
                                        />
                                      )}
                                      {task?.taskType === "Classes" && (
                                        <img
                                          className={`${
                                            openTask?.taskId === task?.taskId
                                              ? "border-black"
                                              : "border-white"
                                          }  border p-[5px] rounded-full `}
                                          src={
                                            openTask?.taskId === task?.taskId
                                              ? (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                                ? ClassesActive
                                                : lock
                                              : (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                              ? Classes
                                              : lock
                                          }
                                          alt="TaskIcon"
                                        />
                                      )}
                                      {task?.taskType === "Quiz" && (
                                        <img
                                          className={`${
                                            openTask?.taskId === task?.taskId
                                              ? "border-black"
                                              : "border-white"
                                          }  border p-[5px] rounded-full `}
                                          src={
                                            openTask?.taskId === task?.taskId
                                              ? (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                                ? QuizActive
                                                : lock
                                              : (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                              ? Quiz
                                              : lock
                                          }
                                          alt="TaskIcon"
                                        />
                                      )}
                                      {task?.taskType === "Live Test" && (
                                        <img
                                          className={`${
                                            openTask?.taskId === task?.taskId
                                              ? "border-black"
                                              : "border-white"
                                          }  border p-[5px] rounded-full `}
                                          src={
                                            openTask?.taskId === task?.taskId
                                              ? (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                                ? LiveTestActive
                                                : lock
                                              : (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                              ? LiveTest
                                              : lock
                                          }
                                          alt="TaskIcon"
                                        />
                                      )}
                                      {task?.taskType === "Video" && (
                                        <img
                                          className={`${
                                            openTask?.taskId === task?.taskId
                                              ? "border-black"
                                              : "border-white"
                                          }  border p-[5px] rounded-full `}
                                          src={
                                            openTask?.taskId === task?.taskId
                                              ? (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                                ? VideoActive
                                                : lock
                                              : (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                              ? Video
                                              : lock
                                          }
                                          alt="TaskIcon"
                                        />
                                      )}
                                      {task?.taskType === "Audio" && (
                                        <img
                                          className={`${
                                            openTask?.taskId === task?.taskId
                                              ? "border-black"
                                              : "border-white"
                                          }  border p-[5px] rounded-full `}
                                          src={
                                            openTask?.taskId === task?.taskId
                                              ? (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                                ? AudioActive
                                                : lock
                                              : (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                              ? Audio
                                              : lock
                                          }
                                          alt="TaskIcon"
                                        />
                                      )}
                                      {task?.taskType === "Files" && (
                                        <img
                                          className={`${
                                            openTask?.taskId === task?.taskId
                                              ? "border-black"
                                              : "border-white"
                                          }  border p-[5px] rounded-full `}
                                          src={
                                            openTask?.taskId === task?.taskId
                                              ? (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                                ? FilesActive
                                                : lock
                                              : (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                              ? Files
                                              : lock
                                          }
                                          alt="TaskIcon"
                                        />
                                      )}
                                      {task?.taskType === "Schedule" && (
                                        <img
                                          className={`${
                                            openTask?.taskId === task?.taskId
                                              ? "border-black"
                                              : "border-white"
                                          }  border p-[5px] rounded-full `}
                                          src={
                                            openTask?.taskId === task?.taskId
                                              ? (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                                ? calendar
                                                : lock
                                              : (isPreviousTaskCompleted &&
                                                  isPrevChapterCompleted) ||
                                                !(
                                                  courseData?.enableDrip ||
                                                  task?.taskDrip
                                                )
                                              ? calendar
                                              : lock
                                          }
                                          alt="TaskIcon"
                                        />
                                      )}
                                    </div>
                                    <h1
                                      className={`text-white ml-3 text-[18px] font-[500]  `}
                                    >
                                      <span
                                        className={`mr-[5px] ${
                                          openTask?.taskId === task?.taskId
                                            ? "text-black"
                                            : "text-white"
                                        } `}
                                      >
                                        {/* Task {index + 1}:  */}
                                        {task?.taskType}:
                                      </span>{" "}
                                      <span
                                        className={`mr-[22px] ${
                                          openTask?.taskId === task?.taskId
                                            ? "text-[#3E4DAC]"
                                            : "text-[#A4B0FF]"
                                        }  `}
                                      >
                                        {task?.taskName}
                                      </span>
                                    </h1>
                                  </div>
                                  {Role === "admin" && (
                                    <>
                                      {openTask?.taskId === task?.taskId ? (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="25"
                                          height="25"
                                          viewBox="0 0 25 25"
                                          fill="none"
                                        >
                                          <path
                                            d="M12.4974 10.417C11.3516 10.417 10.4141 11.3545 10.4141 12.5003C10.4141 13.6462 11.3516 14.5837 12.4974 14.5837C13.6432 14.5837 14.5807 13.6462 14.5807 12.5003C14.5807 11.3545 13.6432 10.417 12.4974 10.417ZM12.4974 4.16699C11.3516 4.16699 10.4141 5.10449 10.4141 6.25033C10.4141 7.39616 11.3516 8.33366 12.4974 8.33366C13.6432 8.33366 14.5807 7.39616 14.5807 6.25033C14.5807 5.10449 13.6432 4.16699 12.4974 4.16699ZM12.4974 16.667C11.3516 16.667 10.4141 17.6045 10.4141 18.7503C10.4141 19.8962 11.3516 20.8337 12.4974 20.8337C13.6432 20.8337 14.5807 19.8962 14.5807 18.7503C14.5807 17.6045 13.6432 16.667 12.4974 16.667Z"
                                            fill="black"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          className=" float-right"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="25"
                                          height="25"
                                          viewBox="0 0 25 25"
                                          fill="none"
                                        >
                                          <path
                                            d="M12.4974 10.417C11.3516 10.417 10.4141 11.3545 10.4141 12.5003C10.4141 13.6462 11.3516 14.5837 12.4974 14.5837C13.6432 14.5837 14.5807 13.6462 14.5807 12.5003C14.5807 11.3545 13.6432 10.417 12.4974 10.417ZM12.4974 4.16699C11.3516 4.16699 10.4141 5.10449 10.4141 6.25033C10.4141 7.39616 11.3516 8.33366 12.4974 8.33366C13.6432 8.33366 14.5807 7.39616 14.5807 6.25033C14.5807 5.10449 13.6432 4.16699 12.4974 4.16699ZM12.4974 16.667C11.3516 16.667 10.4141 17.6045 10.4141 18.7503C10.4141 19.8962 11.3516 20.8337 12.4974 20.8337C13.6432 20.8337 14.5807 19.8962 14.5807 18.7503C14.5807 17.6045 13.6432 16.667 12.4974 16.667Z"
                                            fill="white"
                                          />
                                        </svg>
                                      )}
                                    </>
                                  )}
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
