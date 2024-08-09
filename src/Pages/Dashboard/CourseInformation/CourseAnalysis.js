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
                .get(`http://localhost:5000/api/v1/courses/details/${id}`)
                .then((response) => {
                    const courseData = response?.data;
                    setCourseDetails(courseData);
    
                    // Extract dates directly from response data
                    const date1 = new Date(courseData?.courseStartingDate);
                    const date2 = new Date(courseData?.courseEndingDate);
    
                    // Options for formatting date and time
                    const options = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
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
                            <div className=" pt-[90px] md:pt-[110px] pb-[10px]">
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
                    <div
                        style={{
                            maxWidth: `${window.innerWidth - (window.innerWidth > 1024 ? 370 : 40)
                                }px`,
                        }}
                        className={`h-[70vh] w-fit overflow-y-auto mt-5 border`}
                    >
                        <table className={` font-sans bg-white border border-gray-300`}>
                            <thead className="bg-gray-800 text-white sticky top-0 text-[13px] font-medium">
                                <tr>

                                    <th className="py-3 px-6 border-b text-left">Course Starting Date</th>
                                    <th className="py-3 px-6 border-b text-left">Course Ending Date</th>
                                    <th className="py-3 px-6 border-b text-left">
                                        Total Chapters
                                    </th>
                                    {/* <th className="py-3 px-6 border-b text-left">Assignment start date</th> */}
                                    <th className="py-3 px-6 border-b text-left">Total Weeks</th>
                                    <th className="py-3 px-6 border-b text-left">Total Tasks</th>
                                    <th className="py-3 px-6 border-b text-left">
                                        Total Assignment Tasks
                                    </th>
                                    <th className="py-3 px-6 border-b text-left">
                                        Total Schedule Tasks
                                    </th>
                                    <th className="py-3 px-6 border-b text-left">
                                        Total Classes Tasks
                                    </th>
                                    <th className="py-3 px-6 border-b text-left">
                                        Total Reading Tasks
                                    </th>
                                    <th className="py-3 px-6 border-b text-left">
                                        Total Video Tasks
                                    </th>
                                    <th className="py-3 px-6 border-b text-left">
                                        Total Quiz Tasks
                                    </th>
                                    <th className="py-3 px-6 border-b text-left">
                                        Total Files Tasks
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                    <td className="py-4 px-6 border-b text-left">
                                        {userTime1 !== "Invalid Date" ? userTime1 : "Not Available"}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {userTime2 !== "Invalid Date" ? userTime2 : "Not Available"}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.numberOfChapters}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.numberOfWeeks}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.totalTask}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.taskTypeCount?.Assignment}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.taskTypeCount?.Schedule}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.taskTypeCount?.Classes}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.taskTypeCount?.Reading}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.taskTypeCount?.Video}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.taskTypeCount?.Quiz}
                                    </td>
                                    <td className="py-4 px-6 border-b text-left">
                                        {courseDetails?.taskTypeCount?.Files}
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default CourseAnalysis;
