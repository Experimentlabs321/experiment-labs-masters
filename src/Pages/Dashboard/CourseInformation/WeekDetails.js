import React, { useContext, useEffect, useRef, useState } from "react";
import Completed from "../../../assets/Dashboard/Completed.png";
import InProgress from "../../../assets/Dashboard/InProgress.png";
import Pending from "../../../assets/Dashboard/Pending.png";
import ReadingTask from "../../../assets/Dashboard/ReadingTask.png";
import ClassesTask from "../../../assets/Dashboard/ClassesTask.png";
import AssignmentTask from "../../../assets/Dashboard/AssignmentTask.png";
import QuizTask from "../../../assets/Dashboard/QuizTask.png";
import LiveTestTask from "../../../assets/Dashboard/LiveTestTask.png";
import VideoTask from "../../../assets/Dashboard/VideoTask.png";
import AudioTask from "../../../assets/Dashboard/AudioTask.png";
import FilesTask from "../../../assets/Dashboard/FilesTask.png";
import ScheduleTask from "../../../assets/Dashboard/ScheduleTask.png";
import lock from "../../../assets/Dashboard/lockIcon.png";
import Task from "../../../assets/Dashboard/Task.png";
import { Link } from "react-router-dom";
import Sortable from "sortablejs";
import DialogLayout from "../Shared/DialogLayout";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../../contexts/AuthProvider";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const WeekDetails = ({
  chapters,
  setChapters,
  Role,
  currentWeek,
  setAddTaskOpen,
  setChapterData,
  setEditChapterOpen,
  clickedTask,
  setClickedTask,
  courseData,
  navigate,
  handleTaskDelete,
  count,
  setCount,
  setDeleteTaskPopup,
  setSelectedChapterAndTaskToDeleteTask,
}) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  const { user, userInfo } = useContext(AuthContext);
  const [clickedChapter, setClickedChapter] = useState({});
  const [openTopics, setOpenTopics] = useState([chapters[0]?._id]);

  const containerRef = useRef(null);
  let sortable;

  const handleEditChapter = async (chapter) => {
    const updatedChapter = { ...chapter };
    delete updatedChapter._id;
    console.log(chapter);
    if (chapter?._id) {
      try {
        const newChapter = await axios.put(
          `${process.env.REACT_APP_SERVER_API}/api/v1/chapters/chapters/${chapter?._id}`,
          updatedChapter
        );
        // setCount(count + 1);
        console.log(newChapter);
        console.log(chapter);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setOpenTopics([chapters[0]?._id]);
  }, [chapters]);

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
        console.log(chapters[event.oldIndex], chapters[event.newIndex]);
        console.log(`Moved from index ${event.oldIndex} to ${event.newIndex}`);
        // Update the chapters state based on the rearrangement
        setChapters((prevChapters) => {
          // Clone the previous chapters array to avoid mutation
          const updatedChapters = [...prevChapters];
          // Rearrange the chapters
          const [movedChapter] = updatedChapters.splice(oldIndex, 1);
          updatedChapters.splice(newIndex, 0, movedChapter);
          console.log(prevChapters, updatedChapters);
          prevChapters.forEach(async (chapter, index) => {
            console.log(chapter, updatedChapters[index]);
            const updatedChapter = { ...updatedChapters[index] };
            updatedChapter._id = chapter?._id;
            console.log(updatedChapter);
            await handleEditChapter(updatedChapter);
          });
          return updatedChapters;
        });
        setCount(count + 1);
      },
    });

    chapters.forEach((chapter, chapterIndex) => {
      const chapterContainer = containerElement.children[chapterIndex];
      const tasksContainer = chapterContainer.querySelector(".sub-items");

      // Assign a unique group name for each chapter's tasks
      const taskGroupName = `chapter-tasks-${chapterIndex}`;

      if (tasksContainer) {
        new Sortable(tasksContainer, {
          animation: 150,
          group: taskGroupName,
          onEnd: (event) => {
            console.log(
              `Moved from index ${event.oldIndex} to ${event.newIndex}`,
              chapters
            );
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

  const handleChapterDelete = async (id) => {
    const { value: accept } = await Swal.fire({
      title: "Delete Chapter",
      html: `
        <div style="text-align: center;">
          <i class="fas fa-exclamation-triangle fa-3x" style="color: red;"></i>
        </div>
        <br>
       
        <div>
          <p>You won't be able to revert this!</p>
        </div>
        <br>
        <div>
          <input type="checkbox" id="terms" name="terms" value="accepted">
          <label for="terms" style="color: red;">Please be cautious, all the tasks under this chapter will be deleted</label>
        </div>
      
      `,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      icon: "warning", // Add warning icon
      preConfirm: () => {
        if (!document.getElementById("terms").checked) {
          Swal.showValidationMessage(
            "You need to agree with the terms and conditions"
          );
        }
      },
    });

    if (accept) {
      // Proceed with deletion
      Loading();
      if (chapters?.length === 1) {
        await axios
          .put(
            `${process.env.REACT_APP_SERVER_API}/api/v1/chapters/deleteTasksInChapter/chapterId/${id}`
          )
          .then((result) => {
            console.log(result);
            if (result?.status === 200) {
              Swal.fire({
                icon: "warning",
                title: "Tasks in chapter deleted!",
                text: "There is only one chapter. Delete chapter is not possible!",
              });
              setCount(count + 1);
            } else {
              toast.error("Oops...! Something went wrong.");
            }
          })
          .catch((error) => {
            toast.error("Oops...! Something went wrong.");
            console.error(error);
            Loading().close();
          });
        return;
      }

      console.log(id);

      await axios
        .delete(
          `${process.env.REACT_APP_SERVER_API}/api/v1/chapters/chapterId/${id}`
        )
        .then((result) => {
          console.log(result);
          if (result?.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            const remainingWeeks = chapters.filter(
              (chapter) => chapter._id !== id
            );
            setChapters(remainingWeeks);
          } else {
            toast.error("Oops...! Something went wrong.");
          }
        })
        .catch((error) => {
          toast.error("Oops...! Something went wrong.");
          console.error(error);
          Loading().close();
        });
    }
  };

  const handleMoveChapter = async (oldIndex, newIndex) => {
    console.log(oldIndex, newIndex);
    Loading();
    if (oldIndex >= 0 && newIndex >= 0 && newIndex < chapters?.length) {
      const newChapterId = chapters[oldIndex]._id;
      const oldChapterId = chapters[newIndex]._id;
      const newChapter = chapters[newIndex];
      const oldChapter = chapters[oldIndex];
      newChapter._id = newChapterId;
      oldChapter._id = oldChapterId;
      console.log(newChapter, oldChapter);
      await handleEditChapter(newChapter);
      await handleEditChapter(oldChapter);
      setCount(count + 1);
    }
    Loading().close();
  };

  return (
    <div ref={Role === "admin" ? containerRef : null}>
      {chapters?.map((chapter, index) => {
        const chapterIndex = index;
        return (
          <div key={chapter?._id} className="sortable-chapter">
            <div className="relative">
              <div
                onClick={() => {
                  const findChapter = openTopics?.find(
                    (item) => item === chapter?._id
                  );
                  if (findChapter) {
                    setOpenTopics(
                      openTopics?.filter((item) => item !== chapter?._id)
                    );
                  } else {
                    setOpenTopics([...openTopics, chapter?._id]);
                  }
                }}
                className="flex items-center justify-between mt-[60px]"
              >
                <div className="flex items-center ">
                  <div className="w-[85px] rounded-full flex items-center justify-center h-[85px] bg-[#E1E6FF] ">
                    <h1 className="text-[35px] font-[600] ">{index + 1}</h1>
                  </div>
                  <h1 className="text-[23px] font-[700] lg:ml-[40px] mx-5 cursor-pointer">
                    {chapter?.chapterName}{" "}
                    {Role === "admin" && (
                      <>
                        <button
                          onClick={() => {
                            setEditChapterOpen(true);
                            setChapterData({
                              ...chapter,
                              index: index,
                            });
                          }}
                          className="ml-[24px]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                          >
                            <path
                              d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                              fill="#282828"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleChapterDelete(chapter?._id)}
                          className=" bg-sky-950 p-[6px] rounded-full ml-[24px]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="19"
                            viewBox="0 0 24 25"
                            fill="none"
                          >
                            <path
                              d="M6 7.83105H5V20.8311C5 21.3615 5.21071 21.8702 5.58579 22.2453C5.96086 22.6203 6.46957 22.8311 7 22.8311H17C17.5304 22.8311 18.0391 22.6203 18.4142 22.2453C18.7893 21.8702 19 21.3615 19 20.8311V7.83105H6ZM16.618 4.83105L15 2.83105H9L7.382 4.83105H3V6.83105H21V4.83105H16.618Z"
                              fill="#ED1010"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </h1>
                </div>
                {Role === "admin" ? (
                  <div className="relative flex items-center">
                    <button
                      // onClick={() => {
                      //   if (clickedChapter === chapter) setClickedChapter(null);
                      //   else setClickedChapter(chapter);
                      // }}
                      // onBlur={() => setClickedChapter(null)}
                      className=" mr-[25px] "
                    >
                      <KeyboardArrowDownIcon />
                    </button>
                    {clickedChapter === chapter && (
                      <ul className="absolute right-5 top-[35px] w-max border  bg-[#141414] border-t-0 p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                        <li
                          onMouseDown={() => {
                            handleMoveChapter(index, index - 1);
                          }}
                          className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
                        >
                          <ArrowUpwardIcon
                            sx={{ fontSize: 18, marginRight: 1 }}
                          />
                          Move one step up
                        </li>
                        <li
                          className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
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
                    <button
                      onClick={() => {
                        if (clickedChapter === chapter) setClickedChapter(null);
                        else setClickedChapter(chapter);
                      }}
                      onBlur={() => setClickedChapter(null)}
                      className="  "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="31"
                        viewBox="0 0 30 31"
                        fill="none"
                      >
                        <path
                          d="M15.0166 12.6104C13.6432 12.6104 12.5195 13.734 12.5195 15.1074C12.5195 16.4808 13.6432 17.6045 15.0166 17.6045C16.39 17.6045 17.5137 16.4808 17.5137 15.1074C17.5137 13.734 16.39 12.6104 15.0166 12.6104ZM15.0166 5.11914C13.6432 5.11914 12.5195 6.24282 12.5195 7.61621C12.5195 8.9896 13.6432 10.1133 15.0166 10.1133C16.39 10.1133 17.5137 8.9896 17.5137 7.61621C17.5137 6.24282 16.39 5.11914 15.0166 5.11914ZM15.0166 20.1016C13.6432 20.1016 12.5195 21.2252 12.5195 22.5986C12.5195 23.972 13.6432 25.0957 15.0166 25.0957C16.39 25.0957 17.5137 23.972 17.5137 22.5986C17.5137 21.2252 16.39 20.1016 15.0166 20.1016Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="relative flex items-center">
                    <button className=" mr-[25px] ">
                      <KeyboardArrowDownIcon />
                    </button>
                  </div>
                )}
                {/* {Role === "user" && (
                            <button className="bg-[#E1E6FF] w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] ">
                              In Progress
                            </button>
                          )} */}
              </div>
              <div
                className={`${
                  openTopics?.find((item) => item === chapter?._id)
                    ? ""
                    : "hidden"
                } sub-items`}
              >
                {Role === "admin" &&
                  chapter?.tasks?.map((task, taskIndex) => (
                    <div key={task?.taskId} className="relative ">
                      <div className="flex items-center justify-between my-[60px] relative z-10 ">
                        <div className="flex gap-5 lg:gap-0 items-center w-full">
                          {toggleButton && (
                            <div className="w-[85px] flex items-center justify-center ">
                              {Role !== "admin" && (
                                <>
                                  {task?.participants?.find(
                                    (item) =>
                                      item?.participantId === userInfo?._id
                                  ) ? (
                                    <>
                                      {task?.participants?.find(
                                        (item) =>
                                          item?.participantId === userInfo?._id
                                      )?.status === "Completed" ? (
                                        <img src={Completed} alt="Completed" />
                                      ) : (
                                        <img
                                          src={InProgress}
                                          alt="InProgress"
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <img src={Pending} alt="Pending" />
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                          <div className="flex w-full items-center">
                            {task?.taskType === "Reading" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={ReadingTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Classes" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={ClassesTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Assignment" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={AssignmentTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Quiz" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={QuizTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Live Test" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={LiveTestTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Video" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={VideoTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Audio" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={AudioTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Files" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={FilesTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Schedule" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={ScheduleTask}
                                alt="Schedule"
                              />
                            )}
                            <div className="">
                              <Link
                                onClick={() => {
                                  localStorage.setItem(
                                    "chapter",
                                    chapter?.chapterName
                                  );
                                  localStorage.setItem(
                                    "task",
                                    JSON.stringify(task)
                                  );
                                  localStorage.setItem(
                                    "currentWeek",
                                    JSON.stringify(currentWeek)
                                  );
                                  localStorage.setItem(
                                    "courseId",
                                    JSON.stringify(courseData?._id)
                                  );
                                }}
                                to={`/taskDetails/${task?.taskId}?taskType=${task?.taskType}`}
                                className="text-[#3E4DAC] text-[22px] font-[700] "
                              >
                                {task?.taskName}
                              </Link>
                              <p className="text-[#626262] text-[18px] font-[500] ">
                                {task?.taskType}
                              </p>
                            </div>
                          </div>
                          {!toggleButton && (
                            <div className="mx-2 flex items-center justify-center ">
                              {Role !== "admin" && (
                                <>
                                  {task?.participants?.find(
                                    (item) =>
                                      item?.participantId === userInfo?._id
                                  ) ? (
                                    <>
                                      {task?.participants?.find(
                                        (item) =>
                                          item?.participantId === userInfo?._id
                                      )?.status === "Completed" ? (
                                        <img src={Completed} alt="Completed" />
                                      ) : (
                                        <img
                                          src={InProgress}
                                          alt="InProgress"
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <img src={Pending} alt="Pending" />
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        {Role === "admin" && (
                          <div className="max-w-[200px] flex gap-2 flex-wrap ">
                            {task?.batches?.map((batch) => (
                              <h1 className="p-1 bg-slate-200 font-sans rounded-md">
                                {batch?.batchName}
                              </h1>
                            ))}
                          </div>
                        )}
                        {Role === "admin" && (
                          <div className="relative flex items-center">
                            <button
                              onClick={() => {
                                if (clickedTask === task) setClickedTask(null);
                                else setClickedTask(task);
                              }}
                              onBlur={() => setClickedTask(null)}
                              className=" mr-[25px] "
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="31"
                                viewBox="0 0 30 31"
                                fill="none"
                              >
                                <path
                                  d="M15.0166 12.6104C13.6432 12.6104 12.5195 13.734 12.5195 15.1074C12.5195 16.4808 13.6432 17.6045 15.0166 17.6045C16.39 17.6045 17.5137 16.4808 17.5137 15.1074C17.5137 13.734 16.39 12.6104 15.0166 12.6104ZM15.0166 5.11914C13.6432 5.11914 12.5195 6.24282 12.5195 7.61621C12.5195 8.9896 13.6432 10.1133 15.0166 10.1133C16.39 10.1133 17.5137 8.9896 17.5137 7.61621C17.5137 6.24282 16.39 5.11914 15.0166 5.11914ZM15.0166 20.1016C13.6432 20.1016 12.5195 21.2252 12.5195 22.5986C12.5195 23.972 13.6432 25.0957 15.0166 25.0957C16.39 25.0957 17.5137 23.972 17.5137 22.5986C17.5137 21.2252 16.39 20.1016 15.0166 20.1016Z"
                                  fill="black"
                                />
                              </svg>
                            </button>
                            {clickedTask === task && (
                              <ul className="absolute right-5 top-[35px] w-max border  bg-[#141414] border-t-0 p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                                <li
                                  onMouseDown={() => {
                                    localStorage.setItem(
                                      "chapter",
                                      chapter?.chapterName
                                    );
                                    localStorage.setItem(
                                      "task",
                                      JSON.stringify(task)
                                    );
                                    localStorage.setItem(
                                      "course",
                                      courseData?.courseFullName
                                    );
                                    localStorage.setItem(
                                      "currentWeek",
                                      JSON.stringify(currentWeek)
                                    );
                                    navigate(
                                      `/editTask/${task?.taskId}?taskType=${task?.taskType}`
                                    );
                                  }}
                                  className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
                                >
                                  Edit Task
                                </li>
                                <li
                                  className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
                                  onMouseDown={() => {
                                    // handleTaskDelete(task, chapter);
                                    setDeleteTaskPopup(true);
                                    setSelectedChapterAndTaskToDeleteTask({
                                      task,
                                      chapter,
                                    });
                                  }}
                                >
                                  Delete Task
                                </li>
                              </ul>
                            )}
                            <MenuIcon className=" cursor-move" />
                          </div>
                        )}
                      </div>
                      {chapter?.tasks?.length - 1 !== taskIndex && (
                        <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[-100px] lg:left-[175px] left-[20px]" />
                      )}
                    </div>
                  ))}
                {Role !== "admin" &&
                  chapter?.tasks?.map((task, taskIndex) => {
                    const userIsParticipant = task?.participants?.some(
                      (item) => item?.participantId === userInfo?._id
                    );

                    const isPreviousTaskCompleted =
                      taskIndex === 0 || // Always allow navigation for the first task
                      chapter?.tasks?.[taskIndex - 1]?.participants?.some(
                        (item) =>
                          item?.participantId === userInfo?._id &&
                          (item?.status === "Completed" ||
                            item?.status === "In Progress")
                      );

                    let isPrevChapterCompleted =
                      chapterIndex === 0 ||
                      chapters?.[chapterIndex - 1]?.tasks?.[
                        chapters?.[chapterIndex - 1]?.tasks?.length - 1
                      ]?.participants?.some(
                        (item) =>
                          item?.participantId === userInfo?._id &&
                          (item?.status === "Completed" ||
                            item?.status === "In Progress")
                      );

                    if (taskIndex !== 0) isPrevChapterCompleted = true;

                    return (
                      <div key={task?.taskId} className="relative">
                        <div className="flex items-center justify-between my-[60px] relative z-10">
                          {toggleButton && (
                            <div className="w-[85px] flex items-center justify-center ">
                              {Role !== "admin" && (
                                <>
                                  {userIsParticipant ? (
                                    <>
                                      {task?.participants?.find(
                                        (item) =>
                                          item?.participantId === userInfo?._id
                                      )?.status === "Completed" ? (
                                        <div className="w-full flex items-center justify-start gap-6">
                                          {" "}
                                          <img
                                            src={Completed}
                                            alt="Completed"
                                          />
                                        </div>
                                      ) : (
                                        <div className="w-full flex items-center justify-start gap-6">
                                          <img
                                            src={InProgress}
                                            alt="InProgress"
                                          />
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <div className="w-full flex items-center justify-start gap-6">
                                      <img src={Pending} alt="Pending" />
                                      {!(
                                        isPreviousTaskCompleted &&
                                        isPrevChapterCompleted
                                      ) &&
                                        (courseData?.enableDrip ||
                                          task?.taskDrip) && (
                                          <img
                                            className="w-[35px]"
                                            src={lock}
                                            alt="Lock"
                                          />
                                        )}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                          <div className="flex w-full items-center">
                            {task?.taskType === "Reading" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={ReadingTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Classes" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={ClassesTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Assignment" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={AssignmentTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Quiz" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={QuizTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Live Test" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={LiveTestTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Video" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={VideoTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Audio" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={AudioTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Files" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={FilesTask}
                                alt="Task"
                              />
                            )}
                            {task?.taskType === "Schedule" && (
                              <img
                                className="lg:ml-[60px] w-[40px] lg:w-[65px] mr-[30px] "
                                src={ScheduleTask}
                                alt="Task"
                              />
                            )}
                            {courseData?.enableDrip && (
                              <div className="">
                                {isPreviousTaskCompleted &&
                                isPrevChapterCompleted ? (
                                  <Link
                                    onClick={() => {
                                      localStorage.setItem(
                                        "chapter",
                                        chapter?.chapterName
                                      );
                                      localStorage.setItem(
                                        "task",
                                        JSON.stringify(task)
                                      );
                                      localStorage.setItem(
                                        "currentWeek",
                                        JSON.stringify(currentWeek)
                                      );
                                      localStorage.setItem(
                                        "courseId",
                                        JSON.stringify(courseData?._id)
                                      );
                                    }}
                                    to={`/taskDetails/${task?.taskId}?taskType=${task?.taskType}`}
                                    className="text-[#3E4DAC] text-[22px] font-[700]"
                                  >
                                    {task?.taskName}
                                  </Link>
                                ) : (
                                  <span
                                    onClick={() =>
                                      toast.error("Complete The Previous Task")
                                    }
                                    className="text-[#3E4DAC] text-[22px] font-[700]"
                                  >
                                    {task?.taskName}
                                  </span>
                                )}
                                <p className="text-[#626262] text-[18px] font-[500]">
                                  {task?.taskType}
                                </p>
                              </div>
                            )}

                            {!courseData?.enableDrip && (
                              <div className="">
                                {(isPreviousTaskCompleted &&
                                  isPrevChapterCompleted) ||
                                !task?.taskDrip ? (
                                  <Link
                                    onClick={() => {
                                      localStorage.setItem(
                                        "chapter",
                                        chapter?.chapterName
                                      );
                                      localStorage.setItem(
                                        "task",
                                        JSON.stringify(task)
                                      );
                                      localStorage.setItem(
                                        "currentWeek",
                                        JSON.stringify(currentWeek)
                                      );
                                      localStorage.setItem(
                                        "courseId",
                                        JSON.stringify(courseData?._id)
                                      );
                                    }}
                                    to={`/taskDetails/${task?.taskId}?taskType=${task?.taskType}`}
                                    className="text-[#3E4DAC] text-[22px] font-[700]"
                                  >
                                    {task?.taskName}
                                  </Link>
                                ) : (
                                  <span
                                    onClick={() =>
                                      toast.error("Complete The Previous Task")
                                    }
                                    className="text-[#3E4DAC] text-[22px] font-[700]"
                                  >
                                    {task?.taskName}
                                  </span>
                                )}
                                <p className="text-[#626262] text-[18px] font-[500]">
                                  {task?.taskType}
                                </p>
                              </div>
                            )}
                          </div>
                          {!toggleButton && (
                            <div className="mx-2 flex items-center justify-center ">
                              {Role !== "admin" && (
                                <>
                                  {userIsParticipant ? (
                                    <>
                                      {task?.participants?.find(
                                        (item) =>
                                          item?.participantId === userInfo?._id
                                      )?.status === "Completed" ? (
                                        <img src={Completed} alt="Completed" />
                                      ) : (
                                        <img
                                          src={InProgress}
                                          alt="InProgress"
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <img src={Pending} alt="Pending" />
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        {chapter?.tasks?.length - 1 !== taskIndex && (
                          <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[-100px] lg:left-[175px] left-[20px]" />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
            {Role === "admin" && (
              <div
                onClick={() => {
                  setAddTaskOpen(true);
                  setChapterData(chapter);
                }}
                className="py-[32px] cursor-pointer px-[40px] bg-[#FFFEE8] my-[45px] rounded-[15px] "
              >
                <div className="flex items-center">
                  <svg
                    className=" bg-[#FF557A] rounded-full w-[38px] h-[38px] mr-[24px] "
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M19 11.5H13V5.5H11V11.5H5V13.5H11V19.5H13V13.5H19V11.5Z"
                      fill="white"
                    />
                  </svg>
                  <h1 className="text-[20px] font-[600]"> Add Task</h1>
                </div>
              </div>
            )}
            {index !== chapters?.length - 1 && <hr />}
          </div>
        );
      })}
    </div>
  );
};

export default WeekDetails;
