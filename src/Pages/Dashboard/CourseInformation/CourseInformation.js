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

const CourseInformation = () => {
  const [addChapterOpen, setAddChapterOpen] = useState(false);
  const [editChapterOpen, setEditChapterOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  const [chapterData, setChapterData] = useState({});
  const [chapters, setChapters] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [courseData, setCourseData] = useState();
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

  const { id } = useParams();
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
        })
        .catch((error) => console.error(error));
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

  console.log(chapters);

  return (
    <div>
      <Layout>
        <div>
          {isLoading && (
            <div className=" flex align-items-center my-5 py-5">
              <CircularProgress className="w-full mx-auto" />
            </div>
          )}
          {Role === "admin" && (
            <div>
              <div className=" pt-[90px] md:pt-[110px] pb-[10px] border-b-2 ">
                <div className="container mx-auto px-2 md:px-4 flex items-center justify-between flex-wrap ">
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
                  <div className="flex items-center">
                    {/* Add task dialog start */}
                    <DialogLayout
                      open={addTaskOpen}
                      setOpen={setAddTaskOpen}
                      width={600}
                      title={
                        <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                          Add Task
                        </p>
                      }
                    >
                      <div className="px-[32px] py-[24px] grid grid-cols-3 gap-[70px]">
                        {TaskTypeInfo?.map((taskType) => (
                          <Link
                            to={taskType?.route}
                            onMouseDown={() => {
                              localStorage.setItem("courseId", courseData?._id);
                              localStorage.setItem(
                                "currentWeek",
                                JSON.stringify(currentWeek)
                              );
                            }}
                            className="w-full relative bg-[#F6F7FF] rounded-[14px] p-[24px]"
                          >
                            <div
                              style={{ background: taskType?.theme }}
                              className={`  ${
                                taskType?.name === "Live Test" && "opacity-40"
                              } flex items-center rounded-[12px] justify-center p-[18px]`}
                            >
                              <img src={taskType?.icon} alt="icon" />
                            </div>
                            {taskType?.name === "Live Test" && (
                              <img
                                className="absolute w-7 top-[45%] left-[37%]"
                                src={lock}
                                alt="lock"
                              />
                            )}
                            <h1 className="text-[13px] font-[700] mt-[20px] text-center">
                              {taskType?.name}
                            </h1>
                          </Link>
                        ))}
                      </div>
                    </DialogLayout>
                    {/* Add task dialog end */}
                    {/* Add chapter dialog start */}
                    <DialogLayout
                      open={addChapterOpen}
                      setOpen={setAddChapterOpen}
                      width={440}
                      title={
                        <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                          Add Chapter
                        </p>
                      }
                    >
                      <form
                        onSubmit={handleAddChapter}
                        className="px-[32px] py-[24px] "
                      >
                        <h1 className=" text-[18px] font-[700] mb-[24px] ">
                          Chapter Name
                        </h1>
                        <input
                          type="text"
                          name="chapterName"
                          placeholder="Eg. Onboarding"
                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                        />
                        <div className="w-full flex items-center justify-center mt-[40px]">
                          <input
                            type="submit"
                            value="Add"
                            className="py-[15px] cursor-pointer px-[48px] text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                          />
                        </div>
                      </form>
                    </DialogLayout>
                    {/* Add chapter dialog end */}
                    <>
                      <button
                        onClick={() => setAddChapterOpen(true)}
                        className="flex items-center bg-[#FF557A] text-[10px] md:text-[16px] font-[700] text-white p-[10px] md:p-[16px] rounded-[20px] mr-[32px] "
                      >
                        <svg
                          className="mr-[16px] hidden md:block"
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M19.8438 11H13.8438V5H11.8438V11H5.84375V13H11.8438V19H13.8438V13H19.8438V11Z"
                            fill="white"
                          />
                        </svg>
                        <h1 className="md:mr-[12px]">Add Chapter</h1>
                      </button>
                      <Link
                        to={`/editCourse/${id}`}
                        className="flex items-center bg-[#3E4DAC] text-[10px] md:text-[16px] font-[700] text-white p-[10px] md:p-[16px] rounded-[20px] "
                      >
                        <svg
                          className="mr-[16px] hidden md:block"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M12.6267 0.665039L15.8438 3.81149L13.3913 6.21118L10.1742 3.06473L12.6267 0.665039ZM0.84375 15.3359H4.06079L11.875 7.69316L8.65795 4.54671L0.84375 12.1894V15.3359Z"
                            fill="white"
                          />
                        </svg>
                        <h1 className="md:mr-[12px]">Edit Course</h1>
                      </Link>
                    </>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div ref={containerRef}>
            {items.map((item, index) => (
              <div key={item.id}>
                <div className="item">{item.name}</div>
                <div className="sub-items">
                  {item.subItems.map((subItem) => (
                    <div key={subItem.subItemId} className="sub-item">
                      {subItem.subItemName}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div> */}
          <div className="px-2 md:px-4">
            <div className="flex items-center flex-wrap ">
              <WeekConfiguration
                weeks={weeks}
                setWeeks={setWeeks}
                currentWeek={currentWeek}
                setCurrentWeek={setCurrentWeek}
                batchesData={batchesData}
                courseId={id}
                chapters={chapters}
              />
              {Role === "admin" && (
                <BatchConfiguration
                  selectedBatches={selectedBatches}
                  setSelectedBatches={setSelectedBatches}
                  batchesData={batchesData}
                  setBatchesData={setBatchesData}
                  count={count}
                  setCount={setCount}
                />
              )}
            </div>
            <div>
              {/* Edit chapter name start */}
              <DialogLayout
                open={editChapterOpen}
                setOpen={setEditChapterOpen}
                width={440}
                borderRadius="15px"
                title={
                  <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                    Edit Chapter Name
                  </p>
                }
              >
                <form
                  onSubmit={handleEditChapterName}
                  className="px-[32px] py-[24px] "
                >
                  <h1 className=" text-[18px] font-[700] mb-[20px] ">
                    Chapter Name
                  </h1>
                  <input
                    type="text"
                    name="chapterName"
                    defaultValue={chapterData?.chapterName}
                    placeholder="Eg. Onboarding"
                    className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                  />
                  <div className="w-full flex items-center justify-center mt-[40px]">
                    <input
                      type="submit"
                      value="Update"
                      className="py-[15px] px-[48px] cursor-pointer text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                    />
                  </div>
                </form>
              </DialogLayout>
              {/* Edit chapter name end */}
              {/* Delete task start */}
              <DialogLayoutForFromControl
                title={
                  <p className=" h-[80px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                    Delete Task
                  </p>
                }
                width={500}
                setOpen={setDeleteTaskPopup}
                open={deleteTaskPopup}
              >
                <div className="w-full">
                  <p className="text-[20px] font-[700] mb-3">
                    Task:{" "}
                    <span className="font-[500]">
                      {selectedChapterAndTaskToDeleteTask &&
                        selectedChapterAndTaskToDeleteTask?.task?.taskName}
                    </span>
                  </p>
                  <p className=" mb-2 flex justify-between items-center">
                    <span className="text-[20px] font-[700]">
                      Select Batches:
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        checked={
                          selectedBatchesToDeleteTask?.length ===
                          selectedChapterAndTaskToDeleteTask?.task?.batches
                            ?.length
                        }
                        onChange={(event) => {
                          const isChecked = event.target.checked;
                          if (isChecked) {
                            setSelectedBatchesToDeleteTask(
                              selectedChapterAndTaskToDeleteTask?.task.batches
                            );
                          } else {
                            setSelectedBatchesToDeleteTask([]);
                          }
                        }}
                        className="mr-2"
                      />
                      <label>Select all</label>
                    </span>
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    {selectedChapterAndTaskToDeleteTask?.task &&
                      selectedChapterAndTaskToDeleteTask?.task?.batches?.map(
                        (batch) => (
                          <div
                            key={batch.batchId}
                            className="flex items-center mb-2"
                          >
                            <input
                              type="checkbox"
                              checked={selectedBatchesToDeleteTask.includes(
                                batch
                              )}
                              onChange={(event) => {
                                const isChecked = event.target.checked;
                                if (isChecked) {
                                  setSelectedBatchesToDeleteTask([
                                    ...selectedBatchesToDeleteTask,
                                    batch,
                                  ]);
                                } else {
                                  setSelectedBatchesToDeleteTask(
                                    selectedBatchesToDeleteTask.filter(
                                      (singleBatch) =>
                                        singleBatch?.batchId !== batch?.batchId
                                    )
                                  );
                                }
                              }}
                              className="mr-2"
                            />
                            <label>{batch.batchName}</label>
                          </div>
                        )
                      )}
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => {
                        handleTaskDelete(
                          selectedChapterAndTaskToDeleteTask?.task,
                          selectedChapterAndTaskToDeleteTask?.chapter
                        );
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTaskPopup(false);
                        setSelectedBatchesToDeleteTask([]);
                        setSelectedChapterAndTaskToDeleteTask({});
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </DialogLayoutForFromControl>
              {/* Delete task end */}
              {/* If you want to allow tasks to be moved from one chapter to another, but you still want to ensure that each task remains under at least one chapter, */}
              <WeekDetails
                chapters={chapters}
                setChapters={setChapters}
                Role={Role}
                currentWeek={currentWeek}
                setAddTaskOpen={setAddTaskOpen}
                setChapterData={setChapterData}
                setEditChapterOpen={setEditChapterOpen}
                clickedTask={clickedTask}
                setClickedTask={setClickedTask}
                courseData={courseData}
                navigate={navigate}
                handleTaskDelete={handleTaskDelete}
                count={count}
                setCount={setCount}
                setDeleteTaskPopup={setDeleteTaskPopup}
                setSelectedChapterAndTaskToDeleteTask={
                  setSelectedChapterAndTaskToDeleteTask
                }
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CourseInformation;
