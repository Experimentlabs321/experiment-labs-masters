import React, { useContext, useEffect, useRef, useState } from "react";
import Completed from "../../../assets/Dashboard/Completed.png";
import InProgress from "../../../assets/Dashboard/InProgress.png";
import Task from "../../../assets/Dashboard/Task.png";
import ReadingTask from "../../../assets/Dashboard/ReadingTask.png";
import ClassesTask from "../../../assets/Dashboard/ClassesTask.png";
import AssignmentTask from "../../../assets/Dashboard/AssignmentTask.png";
import QuizTask from "../../../assets/Dashboard/QuizTask.png";
import LiveTestTask from "../../../assets/Dashboard/LiveTestTask.png";
import VideoTask from "../../../assets/Dashboard/VideoTask.png";
import AudioTask from "../../../assets/Dashboard/AudioTask.png";
import FilesTask from "../../../assets/Dashboard/FilesTask.png";
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
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ReactSortable } from "react-sortablejs";
import Sortable from "sortablejs";
import WeekDetails from "./WeekDetails";

const CourseInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [addChapterOpen, setAddChapterOpen] = useState(false);
  const [editChapterOpen, setEditChapterOpen] = useState(false);
  const [addWeekOpen, setAddWeekOpen] = useState(false);
  const [editWeekOpen, setEditWeekOpen] = useState(false);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [chapterData, setChapterData] = useState({});
  const [chapters, setChapters] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [courseData, setCourseData] = useState();
  const [currentWeek, setCurrentWeek] = useState(weeks[0]);
  const [clickedTask, setClickedTask] = useState({});
  const Role = localStorage.getItem("role");
  const [selectedOption, setSelectedOption] = useState("Category");
  const options = ["Category name"];
  const { user, userInfo } = useContext(AuthContext);

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
      route: `/quizGeneralInfo/${chapterData?._id}`,
    },
    {
      name: "Live Test",
      icon: LiveTestTaskIcon,
      theme: "#1AC62B",
      route: "/assignment",
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
  ];

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

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
      `${process.env.REACT_APP_BACKEND_API}/chapters`,
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
      `${process.env.REACT_APP_BACKEND_API}/chapters/${chapterData?._id}`,
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

  const handleAddWeek = async (event) => {
    event.preventDefault();
    const week = {
      courseId: id,
      weekName: event?.target?.weekName?.value,
      weekStartDate: event?.target?.weekStartDate?.value,
      weekEndDate: event?.target?.weekEndDate?.value,
      creator: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
      organization: {
        organizationId: userInfo?.organizationId,
        organizationName: userInfo?.organizationName,
      },
    };

    const newWeek = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/weeks`,
      week
    );

    if (newWeek?.data?.week?.acknowledged) {
      toast.success("Week added Successfully");
      setWeeks([...weeks, { ...week, _id: newWeek?.data?.week?.insertedId }]);
      setCurrentWeek({ ...week, _id: newWeek?.data?.week?.insertedId });
      setAddWeekOpen(false);
      event.target.reset();
    }

    console.log("Add chapter----->", week);
  };

  const handleEditWeekName = async (event) => {
    event.preventDefault();
    const week = {
      weekName: event?.target?.weekName?.value,
      weekStartDate: event?.target?.weekStartDate?.value,
      weekEndDate: event?.target?.weekEndDate?.value,
    };
    const newWeek = await axios.put(
      `${process.env.REACT_APP_BACKEND_API}/weeks/${currentWeek?._id}`,
      week
    );

    if (newWeek?.data?.acknowledged) {
      toast.success("Week Updated Successfully");
      // Create a copy of the chapters array to avoid mutation
      const updatedWeeksArray = [...weeks];
      // Update the chapterName of the specific chapter in the copied array
      updatedWeeksArray[chapterData?.index].weekName = week.weekName;
      // Update the chapters state with the updated array
      setWeeks(updatedWeeksArray);
      setEditWeekOpen(false);
      event.target.reset();
    }
  };

  const handleWeekDelete = async (id) => {
    if (weeks?.length === 1) {
      setOpenConfirmationDialog(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There only one week. Delete is not possible!",
      });
      return;
    }

    await axios
      .delete(`${process.env.REACT_APP_BACKEND_API}/weeks/${id}`)
      .then((result) => {
        if (result?.data?.deletedCount > 0) {
          toast.success("Week Deleted Successfully!");
          const remainingWeeks = weeks.filter((week) => week._id !== id);
          setWeeks(remainingWeeks);
          setCurrentWeek(remainingWeeks[0]);
          setOpenConfirmationDialog(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleTaskDelete = async (task, chapter) => {
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
          default:
            console.error({ error: "Invalid task type" });
        }
        fetch(
          `${process.env.REACT_APP_BACKEND_API}/tasks/${taskTypeForAPI}/${task?.taskId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((result) => {
            console.log(result);
            if (result?.ok) {
              toast.success("Item Deleted Successfully!");
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
      }
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/courses/${id}`)
      .then((response) => {
        setCourseData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [id]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/weeks/${id}`)
      .then((response) => {
        setWeeks(response?.data);
        const currentDateTime = new Date();
        const queryParameters = new URLSearchParams(window.location.search);
        const queryWeek = queryParameters.get("week");
        if (queryWeek) {
          setCurrentWeek(
            response?.data?.find((item) => item?._id === queryWeek)
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
              return;
            }
            if (!currentWeek) {
              setCurrentWeek(response?.data[0]);
            }
          });
        }
      })
      .catch((error) => console.error(error));
  }, [id]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/chapters/${currentWeek?._id}`)
      .then((response) => {
        setChapters(response?.data);
      })
      .catch((error) => console.error(error));
  }, [currentWeek]);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Item 1",
      subItems: [
        { subItemId: 1, subItemName: "Subitem 1" },
        { subItemId: 2, subItemName: "Subitem 2" },
      ],
    },
    {
      id: 2,
      name: "Item 2",
      subItems: [
        { subItemId: 1, subItemName: "Subitem 1" },
        { subItemId: 2, subItemName: "Subitem 2" },
      ],
    },
    {
      id: 3,
      name: "Item 3",
      subItems: [
        { subItemId: 1, subItemName: "Subitem 1" },
        { subItemId: 2, subItemName: "Subitem 2" },
      ],
    },
  ]);
  // const containerRef = useRef(null);
  // let sortable;

  // useEffect(() => {
  //   const containerElement = containerRef.current;

  //   if (!containerElement) {
  //     return;
  //   }

  //   // Initialize the main Sortable
  //   sortable = new Sortable(containerElement, {
  //     animation: 150,
  //     group: "nested",
  //     onEnd: (event) => {
  //       console.log(event);
  //       console.log(`Moved from index ${event.oldIndex} to ${event.newIndex}`);
  //     },
  //   });

  //   // Initialize Sortable for all tasks
  //   const allTasksContainers = document.querySelectorAll(".sub-items");
  //   allTasksContainers.forEach((tasksContainer) => {
  //     if (tasksContainer) {
  //       new Sortable(tasksContainer, {
  //         animation: 150,
  //         group: "nested",
  //         onEnd: (event) => {
  //           console.log(event);
  //           console.log(
  //             `Moved from index ${event.oldIndex} to ${event.newIndex}`
  //           );
  //         },
  //       });
  //     }
  //   });

  //   return () => {
  //     sortable.destroy();
  //     // Also, make sure to destroy all the task Sortables here if needed.
  //   };
  // }, [chapters]);
  return (
    <div>
      <Layout>
        <div>
          {Role === "admin" && (
            <div>
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
                    <button className=" font-sans mr-[30px] text-[20px] font-[400] ">
                      {courseData?.courseFullName}
                    </button>
                  </div>
                  <div className="flex items-center mt-[-10px] ">
                    <div className="flex items-center text-black text-[16px] font-[600] mr-[32px] ">
                      <h1 className="mr-[16px]">Preview Mode</h1>
                      {preview ? (
                        <svg
                          className="cursor-pointer"
                          onClick={() => setPreview(!preview)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="58"
                          height="27"
                          viewBox="0 0 58 27"
                          fill="none"
                        >
                          <rect
                            width="57.8422"
                            height="26.7841"
                            rx="13.392"
                            fill="#9747FF"
                          />
                          <circle
                            cx="44.4512"
                            cy="13.3916"
                            r="10.1153"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="cursor-pointer"
                          onClick={() => setPreview(!preview)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="58"
                          height="28"
                          viewBox="0 0 58 28"
                          fill="none"
                        >
                          <rect
                            y="0.608398"
                            width="57.8422"
                            height="26.7841"
                            rx="13.392"
                            fill="#A3A3A3"
                          />
                          <circle
                            cx="13.3926"
                            cy="14"
                            r="10.1153"
                            fill="white"
                          />
                        </svg>
                      )}
                    </div>
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
                            className="w-full bg-[#F6F7FF] rounded-[14px] p-[24px]"
                          >
                            <div
                              style={{ background: taskType?.theme }}
                              className={` flex items-center rounded-[12px] justify-center p-[18px]`}
                            >
                              <img src={taskType?.icon} alt="icon" />
                            </div>
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
                        className="flex items-center bg-[#FF557A] text-[16px] font-[700] text-white p-[16px] rounded-[20px] mr-[32px] "
                      >
                        <svg
                          className="mr-[16px]"
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
                        <h1 className="mr-[12px]">Add Chapter</h1>
                      </button>
                      <Link
                        to="/createCourse"
                        className="flex items-center bg-[#3E4DAC] text-[16px] font-[700] text-white p-[16px] rounded-[20px] "
                      >
                        <svg
                          className="mr-[16px]"
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
                        <h1 className="mr-[12px]">Edit Course</h1>
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
          <div className="px-4">
            <div
              className={`relative inline-block ${
                Role === "admin" ? "mt-[40px]" : "mt-[140px]"
              }  w-[400px] mb-[10px] flex items-center gap-[32px] `}
            >
              <div className="">
                <button
                  onClick={toggleOptions}
                  className="cursor-pointer bg-[#FFDB70] text-[15px] font-[600] py-[20px] px-[25px] rounded-[15px] flex items-center justify-center shadow-[0px_2px_4px_0px_#00000026]"
                >
                  {currentWeek?.weekName}
                  <svg
                    className="ml-[20px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_3016_13126)">
                      <path
                        d="M1.52352 5.08398L5.82231 9.38277L10.1211 5.08398"
                        stroke="#282828"
                        stroke-width="1.43293"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3016_13126">
                        <rect
                          width="12.5818"
                          height="12.5818"
                          fill="white"
                          transform="matrix(0 1 -1 0 12.6328 0.890625)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                {isOpen && weeks?.length > 1 && (
                  <ul className="absolute top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100 z-30 ">
                    {weeks?.map((option, index) => {
                      if (option?._id !== currentWeek?._id)
                        return (
                          <li
                            key={index}
                            className="cursor-pointer py-2 text-[#6A6A6A] text-[14px] font-[400] "
                            onClick={() => setCurrentWeek(option)}
                          >
                            {option?.weekName}
                          </li>
                        );
                    })}
                  </ul>
                )}
              </div>
              {Role === "admin" && (
                <>
                  {/* Add Week start */}
                  <DialogLayout
                    open={addWeekOpen}
                    setOpen={setAddWeekOpen}
                    width={440}
                    borderRadius="15px"
                    title={
                      <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                        Add Week Name
                      </p>
                    }
                  >
                    <form
                      onSubmit={handleAddWeek}
                      className="px-[32px] py-[24px] "
                    >
                      <h1 className=" text-[18px] font-[700] mb-[24px] ">
                        Week Name
                      </h1>
                      <input
                        type="text"
                        name="weekName"
                        placeholder="Eg. Onboarding"
                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                      />
                      <h1 className=" text-[18px] font-[700] my-[24px] ">
                        Week Starting Date
                      </h1>
                      <input
                        required
                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                        name="weekStartDate"
                        type="date"
                        placeholder="Eg. Entrepreneurship Lab"
                      />
                      <h1 className=" text-[18px] font-[700] my-[24px] ">
                        Week Ending Date
                      </h1>
                      <input
                        required
                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                        name="weekEndDate"
                        type="date"
                        placeholder="Eg. Entrepreneurship Lab"
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
                  {/* Add Week end */}
                  <button
                    onClick={() => setAddWeekOpen(true)}
                    className="bg-black rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M19.6641 11.2275H13.6641V5.22754H11.6641V11.2275H5.66406V13.2275H11.6641V19.2275H13.6641V13.2275H19.6641V11.2275Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  {/* Edit week name start */}
                  <DialogLayout
                    open={editWeekOpen}
                    setOpen={setEditWeekOpen}
                    width={440}
                    borderRadius="15px"
                    title={
                      <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                        Edit Week Name
                      </p>
                    }
                  >
                    <form
                      onSubmit={handleEditWeekName}
                      className="px-[32px] py-[24px] "
                    >
                      <h1 className=" text-[18px] font-[700] mb-[20px] ">
                        Week Name
                      </h1>
                      <input
                        type="text"
                        name="weekName"
                        defaultValue={currentWeek?.weekName}
                        placeholder="Eg. Onboarding"
                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                      />
                      <h1 className=" text-[18px] font-[700] my-[24px] ">
                        Week Starting Date
                      </h1>
                      <input
                        required
                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                        defaultValue={currentWeek?.weekStartDate}
                        name="weekStartDate"
                        type="date"
                        placeholder="Eg. Entrepreneurship Lab"
                      />
                      <h1 className=" text-[18px] font-[700] my-[24px] ">
                        Week Ending Date
                      </h1>
                      <input
                        required
                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                        defaultValue={currentWeek?.weekEndDate}
                        name="weekEndDate"
                        type="date"
                        placeholder="Eg. Entrepreneurship Lab"
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
                  {/* Edit week name end */}
                  <button onClick={() => setEditWeekOpen(true)} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                    >
                      <circle cx="14.6641" cy="14.2275" r="14" fill="#172D6E" />
                      <path
                        d="M18.8571 6.82129L21.6209 9.58506L19.514 11.6929L16.7502 8.92912L18.8571 6.82129ZM8.73438 19.7078H11.4981L18.2113 12.9946L15.4476 10.2309L8.73438 16.9441V19.7078Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  {/* Dialog for confirmation start */}
                  <DialogLayout
                    open={openConfirmationDialog}
                    width={500}
                    bgColor="#3E4DAC"
                    borderRadius={10}
                    close={true}
                  >
                    <div className=" py-[56px] px-[40px] ">
                      <h1 className=" text-[#F0E823] text-[28px] font-[700] w-[332px] mx-auto text-center ">
                        Are you sure you want to delete the week?
                      </h1>
                      <div className="mt-[64px] flex items-center justify-between ">
                        <button
                          onClick={() => handleWeekDelete(currentWeek?._id)}
                          className=" py-[16px] px-[64px] rounded-[20px] border-[3px] text-[21px] font-[600] border-[#FFF] text-white  "
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => {
                            setOpenConfirmationDialog(false);
                          }}
                          className=" py-[16px] px-[64px] rounded-[20px] border-[3px] text-[21px] font-[600] border-[#FF557A] bg-[#FF557A]  "
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </DialogLayout>
                  {/* Dialog for confirmation end */}
                  <button
                    onClick={() => setOpenConfirmationDialog(true)}
                    className=" bg-sky-950 p-[6px] rounded-full"
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
              {/* If you want to allow tasks to be moved from one chapter to another, but you still want to ensure that each task remains under at least one chapter, */}
              {/* <WeekDetails
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
              /> */}
              <div>
                {chapters?.map((chapter, index) => (
                  <div className=" sortable-chapter">
                    <div key={chapter?._id} className="relative">
                      <div className="flex items-center justify-between mt-[60px]">
                        <div className="flex items-center ">
                          <div className="w-[85px] rounded-full flex items-center justify-center h-[85px] bg-[#E1E6FF] ">
                            <h1 className="text-[35px] font-[600] ">
                              {index + 1}
                            </h1>
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
                                  {task?.taskType === "Reading" && (
                                    <img
                                      className="ml-[60px] mr-[30px] "
                                      src={ReadingTask}
                                      alt="Task"
                                    />
                                  )}
                                  {task?.taskType === "Classes" && (
                                    <img
                                      className="ml-[60px] mr-[30px] "
                                      src={ClassesTask}
                                      alt="Task"
                                    />
                                  )}
                                  {task?.taskType === "Assignment" && (
                                    <img
                                      className="ml-[60px] mr-[30px] "
                                      src={AssignmentTask}
                                      alt="Task"
                                    />
                                  )}
                                  {task?.taskType === "Quiz" && (
                                    <img
                                      className="ml-[60px] mr-[30px] "
                                      src={QuizTask}
                                      alt="Task"
                                    />
                                  )}
                                  {task?.taskType === "Live Test" && (
                                    <img
                                      className="ml-[60px] mr-[30px] "
                                      src={LiveTestTask}
                                      alt="Task"
                                    />
                                  )}
                                  {task?.taskType === "Video" && (
                                    <img
                                      className="ml-[60px] mr-[30px] "
                                      src={VideoTask}
                                      alt="Task"
                                    />
                                  )}
                                  {task?.taskType === "Audio" && (
                                    <img
                                      className="ml-[60px] mr-[30px] "
                                      src={AudioTask}
                                      alt="Task"
                                    />
                                  )}
                                  {task?.taskType === "Files" && (
                                    <img
                                      className="ml-[60px] mr-[30px] "
                                      src={FilesTask}
                                      alt="Task"
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
                                      if (clickedTask === task)
                                        setClickedTask(null);
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
                                            `/editTask/${currentWeek?._id}`
                                          );
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
                      {/* <div className="relative">
                        <div className="flex items-center justify-between my-[60px] ">
                          <div className="flex items-center">
                            <div className="w-[85px] flex items-center justify-center ">
                              {Role === "user" && (
                                <img src={InProgress} alt="InProgress" />
                              )}
                            </div>
                            <div className="flex items-center">
                              <div className="relative ">
                                <img
                                  className="ml-[60px] mr-[30px] relative z-10 "
                                  src={Task}
                                  alt="Task"
                                />
                                {Role === "user" && (
                                  <div className="w-[80.16px] h-[79.10px] rounded-[14.77px] border-4 border-emerald-500 absolute top-1 right-[20.5px] z-0 " />
                                )}
                              </div>
                              <div className="">
                                <h1 className="text-[#3E4DAC] text-[22px] font-[700] ">
                                  Task 2
                                </h1>
                                <p className="text-[#626262] text-[18px] font-[500] ">
                                  Reading
                                </p>
                              </div>
                            </div>
                          </div>
                          {Role === "admin" && (
                            <button className=" mr-[25px] ">
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
                          )}
                          {Role === "user" && (
                            <div>
                              <Link to="/week">
                                <button
                                  className={`bg-[#3E4DAC] text-white w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
                                >
                                  Resume
                                </button>
                              </Link>
                            </div>
                          )}
                        </div>
                        <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[-100px] left-[174px] " />
                      </div> */}
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
              </div>
              {/* <div className="relative">
                <div className="flex items-center justify-between mt-[60px]">
                  <div className="flex items-center ">
                    <div className="w-[85px] rounded-full flex items-center justify-center h-[85px] bg-[#E1E6FF] ">
                      <h1 className="text-[35px] font-[600] ">2</h1>
                    </div>
                    <h1 className="text-[23px] font-[700] ml-[40px] ">
                      Topic 2{" "}
                      {Role === "admin" && (
                        <button className="ml-[24px]">
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
                      )}
                    </h1>
                  </div>
                  <button className="bg-[#E1E6FF] w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px]  ">
                    Pending
                  </button>
                </div>
                <div className="flex items-center relative z-10 my-[60px] ">
                  <div className="w-[85px] flex items-center justify-center ">
                    <img src={Pending} alt="Pending" />
                  </div>
                  <div className="flex items-center">
                    <img
                      className="ml-[60px] mr-[30px] "
                      src={TaskVideo}
                      alt="TaskVideo"
                    />
                    <div className="">
                      <h1 className="text-[#3E4DAC] text-[22px] font-[700] ">
                        Task 1
                      </h1>
                      <p className="text-[#626262] text-[18px] font-[500] ">
                        Class:{" "}
                        <span className=" text-red-400 ">Date-Day-Time</span>
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="w-[2px] pt-[150px] bg-[#C7C7C7] absolute bottom-[30px] left-[174px] " />
                <div className="flex items-center relative z-10 my-[60px] ">
                  <div className="w-[85px] flex items-center justify-center ">
                    <img src={Pending} alt="Pending" />
                  </div>
                  <div className="flex items-center">
                    <img
                      className="ml-[60px] mr-[30px] "
                      src={TaskVideo}
                      alt="TaskVideo"
                    />
                    <div className="">
                      <h1 className="text-[#3E4DAC] text-[22px] font-[700] ">
                        Task 2
                      </h1>
                      <p className="text-[#626262] text-[18px] font-[500] ">
                        Class:{" "}
                        <span className=" text-red-400 ">Date-Day-Time</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CourseInformation;
