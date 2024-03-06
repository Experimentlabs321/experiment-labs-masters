import React, { useEffect, useRef, useState } from "react";
import Completed from "../../../assets/Dashboard/Completed.png";
import Task from "../../../assets/Dashboard/Task.png";
import { Link } from "react-router-dom";
import Sortable from "sortablejs";
import DialogLayout from "../Shared/DialogLayout";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";

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
}) => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [count, setCount] = useState(0);

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
        console.log(`Moved from index ${event.oldIndex} to ${event.newIndex}`);
        // Update the chapters state based on the rearrangement
        setChapters((prevChapters) => {
          // Clone the previous chapters array to avoid mutation
          const updatedChapters = [...prevChapters];
          // Rearrange the chapters
          const [movedChapter] = updatedChapters.splice(oldIndex, 1);
          updatedChapters.splice(newIndex, 0, movedChapter);
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
              console.log(updatedChapters[chapterIndex]);
              return updatedChapters;
            });
            setCount(count + 1);
          },
        });
      }
    });

    return () => {
      sortable.destroy();
      // Also, make sure to destroy all the task Sortables here if needed.
    };
  }, [chapters]);

  // const containerRef = useRef(null);
  // let sortable;
  // const [taskChapters, setTaskChapters] = useState([]);

  // useEffect(() => {
  //   // Initialize Sortable for chapters
  //   const containerElement = containerRef.current;

  //   if (!containerElement) {
  //     return;
  //   }

  //   new Sortable(containerElement, {
  //     animation: 150,
  //     group: "chapter",
  //     onEnd: (event) => {
  //       console.log(chapters);
  //       // Handle reordering chapters
  //       console.log(
  //         `Moved chapter from index ${event.oldIndex} to ${event.newIndex}`
  //       );
  //     },
  //   });

  //   // Initialize Sortable for each chapter's tasks
  //   chapters.forEach((chapter, chapterIndex) => {
  //     const tasksContainer =
  //       containerElement.querySelectorAll(".sub-items")[chapterIndex];
  //     if (tasksContainer) {
  //       new Sortable(tasksContainer, {
  //         animation: 150,
  //         group: "task",
  //         onEnd: (event) => {
  //           // Handle reordering tasks within the chapter
  //           console.log(
  //             `Moved task from index ${event.oldIndex} to ${event.newIndex}`
  //           );
  //         },
  //       });
  //     }
  //   });

  //   return () => {
  //     // Destroy Sortable instances if needed
  //   };
  // }, [chapters]);

  // const containerRef = useRef(null);
  // let chapterSortable;
  // let taskSortables = [];

  // const [localChapters, setLocalChapters] = useState(chapters);

  // useEffect(() => {
  //   const containerElement = containerRef.current;

  //   if (!containerElement) {
  //     return;
  //   }

  //   chapterSortable = new Sortable(containerElement, {
  //     animation: 150,
  //     group: "chapter",
  //     onEnd: (event) => {
  //       const newChaptersOrder = [...localChapters];
  //       const [movedChapter] = newChaptersOrder.splice(event.oldIndex, 1);
  //       newChaptersOrder.splice(event.newIndex, 0, movedChapter);

  //       setLocalChapters(newChaptersOrder);
  //       setChapters(newChaptersOrder);
  //     },
  //   });

  //   localChapters.forEach((chapter, chapterIndex) => {
  //     const tasksContainer = containerElement.querySelectorAll(
  //       `.sub-items[data-chapter-index="${chapterIndex}"]`
  //     );
  //     if (tasksContainer.length > 0) {
  //       const taskSortable = new Sortable(tasksContainer[0], {
  //         animation: 150,
  //         group: "task",
  //         onEnd: (event) => {
  //           const newChaptersOrder = [...localChapters];
  //           const movedTask = newChaptersOrder[chapterIndex].tasks.splice(
  //             event.oldIndex,
  //             1
  //           )[0];
  //           newChaptersOrder[chapterIndex].tasks.splice(
  //             event.newIndex,
  //             0,
  //             movedTask
  //           );

  //           setLocalChapters(newChaptersOrder);
  //           setChapters(newChaptersOrder);
  //         },
  //       });
  //       taskSortables.push(taskSortable);
  //     }
  //   });

  //   return () => {
  //     chapterSortable.destroy();
  //     taskSortables.forEach((sortable) => sortable.destroy());
  //   };
  // }, [setChapters, localChapters]);

  // useEffect(() => {
  //   setLocalChapters(chapters);
  // }, [chapters]);
  // console.log(chapters, localChapters);

  const handleChapterDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Loading();
        if (chapters?.length === 1) {
          setOpenConfirmationDialog(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There only one chapter. Delete is not possible!",
          });
          return;
        }

        console.log(id);

        await axios
          .delete(`http://localhost:5000/api/v1/chapters/chapterId/${id}`)
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
              setOpenConfirmationDialog(false);
            } else {
              toast.error("Oops...! Something went wrong.");
              setOpenConfirmationDialog(false);
            }
          })
          .catch((error) => {
            toast.error("Oops...! Something went wrong.");
            console.error(error);
            Loading().close();
          });
      }
    });
  };

  console.log(chapters);

  return (
    <div ref={containerRef}>
      {chapters?.map((chapter, index) => (
        <div
          key={chapter?._id}
          className=" sortable-chapter"
          data-chapter-index={index}
        >
          <div className="relative">
            <div className="flex items-center justify-between mt-[60px]">
              <div className="flex items-center ">
                <div className="w-[85px] rounded-full flex items-center justify-center h-[85px] bg-[#E1E6FF] ">
                  <h1 className="text-[35px] font-[600] ">{index + 1}</h1>
                </div>
                <h1 className="text-[23px] font-[700] ml-[40px] ">
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
              {Role === "user" && (
                <button className="bg-[#E1E6FF] w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] ">
                  In Progress
                </button>
              )}
            </div>
            <div className="sub-items">
              {chapter?.tasks?.map((task, taskIndex) => (
                <div key={task?.taskId} className="relative">
                  <div className="flex items-center justify-between my-[60px] relative z-10 ">
                    <div className="flex items-center">
                      <div className="w-[85px] flex items-center justify-center ">
                        {/* {Role === "user" && (
                          <img src={Completed} alt="Completed" />
                        )} */}
                      </div>
                      <div className="flex items-center">
                        <img
                          className="ml-[60px] mr-[30px] "
                          src={Task}
                          alt="Task"
                        />
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
                            }}
                            to={`/week/${currentWeek?._id}`}
                            className="text-[#3E4DAC] text-[22px] font-[700] "
                          >
                            {task?.taskName}
                          </Link>
                          <p className="text-[#626262] text-[18px] font-[500] ">
                            {task?.taskType}
                          </p>
                        </div>
                      </div>
                    </div>
                    {Role === "admin" && (
                      <div className="relative">
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
                                navigate(`/editTask/${currentWeek?._id}`);
                              }}
                              className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
                            >
                              Edit Task
                            </li>
                            <li
                              className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
                              onMouseDown={() =>
                                handleTaskDelete(task, chapter)
                              }
                            >
                              Delete Task
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                  {chapter?.tasks?.length - 1 !== taskIndex && (
                    <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[-100px] left-[174px] " />
                  )}
                </div>
              ))}
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
      ))}
      {/* {localChapters?.map((chapter, index) => (
        <div
          key={chapter?._id}
          className=" sortable-chapter"
          data-chapter-index={index}
        >
          <div className="relative">
            <div className="flex items-center justify-between mt-[60px]">
              <div className="flex items-center ">
                <div className="w-[85px] rounded-full flex items-center justify-center h-[85px] bg-[#E1E6FF] ">
                  <h1 className="text-[35px] font-[600] ">{index + 1}</h1>
                </div>
                <h1 className="text-[23px] font-[700] ml-[40px] ">
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
                    </>
                  )}
                </h1>
              </div>
              {Role === "user" && (
                <button className="bg-[#E1E6FF] w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] ">
                  In Progress
                </button>
              )}
            </div>
            <div className="sub-items" data-chapter-index={index}>
              {chapter?.tasks?.map((task, taskIndex) => (
                <div key={task?.taskId} className="relative">
                  <div className="flex items-center justify-between my-[60px] relative z-10 ">
                    <div className="flex items-center">
                      <div className="w-[85px] flex items-center justify-center ">
                        {Role === "user" && (
                          <img src={Completed} alt="Completed" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <img
                          className="ml-[60px] mr-[30px] "
                          src={Task}
                          alt="Task"
                        />
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
                            }}
                            to={`/week/${currentWeek?._id}`}
                            className="text-[#3E4DAC] text-[22px] font-[700] "
                          >
                            {task?.taskName}
                          </Link>
                          <p className="text-[#626262] text-[18px] font-[500] ">
                            {task?.taskType}
                          </p>
                        </div>
                      </div>
                    </div>
                    {Role === "admin" && (
                      <div className="relative">
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
                                navigate(`/editTask/${currentWeek?._id}`);
                              }}
                              className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
                            >
                              Edit Task
                            </li>
                            <li
                              className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600] "
                              onMouseDown={() =>
                                handleTaskDelete(task, chapter)
                              }
                            >
                              Delete Task
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                  {chapter?.tasks?.length - 1 !== taskIndex && (
                    <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[-100px] left-[174px] " />
                  )}
                </div>
              ))}
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
      ))} */}
    </div>
  );
};

export default WeekDetails;
