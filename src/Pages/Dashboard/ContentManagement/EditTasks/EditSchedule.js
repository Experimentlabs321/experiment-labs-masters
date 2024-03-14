import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";



import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import toast from "react-hot-toast";

import required from "../../../../assets/ContentManagement/required.png";



import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../../../../contexts/AuthProvider";
import Layout from "../../Layout";
let global;
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Set the background color and opacity of the overlay
    zIndex: 1000, // Set a higher z-index value
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white", // Set the background color of the modal content
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    zIndex: 1001, // Set a higher z-index value
  },
};



const EditSchedule = ({taskData}) => {
  const { id } = useParams();

  const { user, userInfo } = useContext(AuthContext);

  const [chapter, setChapter] = useState({});
  const [course, setCourse] = useState({});
 
  const [submitPermission, setSubmitPermission] = useState(false);

  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();
 
  const [taskDrip, setTaskDrip] = useState(false);

  const [calendarEvents, setCalendarEvents] = useState([]);
  const [scheduleData, setScheduleData] = useState({});
  
 


  // Save current location before redirecting to Google sign-in
 


  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API
        }/api/v1/batches/courseId/${localStorage.getItem("courseId")}`
      )
      .then((response) => {
        setBatchesData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [chapter?.courseId]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
      .then((response) => {
        setChapter(response?.data);
      })

      .catch((error) => console.error(error));
  }, [id, userInfo, userInfo?.email]);
  useEffect(() => {
    if (chapter?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/courses/${chapter?.courseId}`
        )
        .then((response) => {
          setCourse(response?.data);
        });
  }, [chapter]);
  const handleOptionChangeBatch = (event, optionValue) => {
    // const optionValue = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      if (selectedBatches) {
        setSelectedBatches([
          ...selectedBatches,
          { batchName: optionValue?.batchName, batchId: optionValue?._id },
        ]);
        setSchedule([
          ...schedule,
          {
            batchName: optionValue?.batchName,
            batchId: optionValue?._id,
          },
        ]);
      } else {
        setSelectedBatches([
          { batchName: optionValue?.batchName, batchId: optionValue?._id },
        ]);
        setSchedule([
          {
            batchName: optionValue?.batchName,
            batchId: optionValue?._id,
          },
        ]);
      }
    } else {
      setSelectedBatches(
        selectedBatches.filter((option) => option?.batchId !== optionValue?._id)
      );
      setSchedule(
        schedule.filter((option) => option?.batchId !== optionValue?._id)
      );
    }
  };
  const handleOptionChangeHoliday = (day) => {
    const isSelected = selectedHoliday.includes(day.day);

    if (isSelected) {
      // If the day is already selected, remove it from the array
      const updatedSelection = selectedHoliday.filter(
        (selectedDay) => selectedDay !== day.day
      );
      setSelectedHoliday(updatedSelection);
    } else {
      // If the day is not selected, add it to the array
      setSelectedHoliday((prevSelection) => [...prevSelection, day.day]);
    }
  };
  console.log(selectedHoliday);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  // Function to check if a given date is in the past
  // Function to check if a given date is in the past
  const isPastDay = (date) => {
    const currentDate = new Date();
    const comparisonDate = new Date(date);
    return comparisonDate < currentDate;
  };

  // Function to handle the day rendering
  const handleDayRender = (info) => {
    const date = info.date.toISOString().split('T')[0];
    const isPastDayValue = isPastDay(date);

    if (isPastDayValue) {
      info.el.style.backgroundColor = 'lightgray'; // Apply your desired color for past days
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = getCurrentDate();
    const form = event.target;
    const scheduleName = form.scheduleName?.value;
    const dateRange = form.dateRange?.value;
    const minimumTime = form.minimumTime?.value;
    const maximumTime = form.maximumTime?.value;
    const meetingDuration = form.meetingDuration?.value;
    const manageSchedule = {
      scheduleName,
      taskName: scheduleName,
      chapterId: chapter?._id,
      courseId: chapter?.courseId,
      batches: selectedBatches,
      offDays: selectedHoliday,
      dateRange: dateRange,
      maximumTime,
      minimumTime,
      meetingDuration: meetingDuration,
      usersession: global,
      events: calendarEvents,
      taskDrip,
    };
   
    console.log(manageSchedule);
    if (submitPermission) {
      const newSchedule = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/schedule`,
        manageSchedule
      );
      console.log(newSchedule);
      if (newSchedule?.data?.result?.acknowledged) {
        toast.success("Schedule added Successfully");
        event.target.reset();
        navigate(`/questLevels/${chapter?.courseId}`);
      }
      else {
        toast.error("Something went wrong");
      }
      console.log(manageSchedule);
    }
  };


  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/schedule/taskId/${id}`
      )
      .then((response) => {
        setScheduleData(response?.data);
        setSelectedBatches(response?.data?.batches);
   
        setTaskDrip(response?.data?.taskDrip);
       
      });
  }, [id]);

 console.log(scheduleData?.scheduleName)

  const days = [
    {
      day: "Saturday",
    },
    {
      day: "Sunday",
    },
    {
      day: "Monday",
    },
    {
      day: "Tuesday",
    },
    {
      day: "Wednesday",
    },

    {
      day: "Thursday",
    },
    {
      day: "Friday",
    },
  ];
  return (
    <div>
      <Layout>
      <form onSubmit={handleSubmit} className="ms-[40px]  mt-12">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Schedule Name
                        </p>
                        <img src={required} alt="required" />
                      </div>

                      <input
                        required
                           defaultValue={
                            scheduleData?.scheduleName 
                          } 
                        className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="scheduleName"
                        type="text"
                        placeholder="schedule Name"
                      />
                    </div>


                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Select holidays
                        </p>
                        <img src={required} alt="icon" />
                      </div>
                      <ul className="flex gap-4 flex-wrap ">
                        {days?.map((day) => (
                          <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                            <input
                              type="checkbox"
                              id="student"
                              name={day?.day}
                              value={day?.day}
                              checked={selectedHoliday?.find(
                                (item) => item?.day === day?.day
                              )}
                              onChange={(e) => handleOptionChangeHoliday(day)}
                              className=" mb-1"
                            />
                            <div className="flex mb-1 items-center">
                              <label className="ms-4" htmlFor={day?.day}>
                                {day?.day}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="my-5">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Select Batch
                      </p>
                      <img src={required} alt="icon" />
                    </div>
                    <ul className="flex gap-4 flex-wrap ">
                      {batchesData?.map((option, index) => {
                        return (
                          <>
                            <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                              <input
                                type="checkbox"
                                id="student"
                                name={option?.batchName}
                                value={option?.batchName}
                                checked={selectedBatches?.find(
                                  (item) =>
                                    item?.batchName === option?.batchName
                                )}
                                onChange={(e) =>
                                  handleOptionChangeBatch(e, option)
                                }
                                className=" mb-1"
                              />
                              <div className="flex mb-1 items-center">
                                <label
                                  className="ms-4"
                                  htmlFor={option?.batchName}
                                >
                                  {option?.batchName}
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                  <div className=" space-y-4 mb-8">
                    <fieldset>
                      <div className="flex items-center gap-4 mb-5">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">Enable Drip</p>
                        <img src={required} alt="" />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="radioYes"
                            name="radioOption"
                            checked={taskDrip === true}
                            onChange={() => setTaskDrip(true)}
                            disabled={course?.enableDrip}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                          />
                          <label
                            htmlFor="radioYes"
                            className={`ml-2 text-sm font-medium ${course?.enableDrip ? "text-gray-400" : "text-gray-900"
                              }`}
                          >
                            Yes
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="radioNo"
                            name="radioOption"
                            checked={taskDrip === false}
                            onChange={() => setTaskDrip(false)}
                            disabled={course?.enableDrip}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                          />
                          <label
                            htmlFor="radioNo"
                            className={`ml-2 text-sm font-medium ${course?.enableDrip ? "text-gray-400" : "text-gray-900"
                              }`}
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>

                    {course?.enableDrip && (
                      <p className="text-sm text-red-500">
                        Course Drip Must Be Turned Off to add Task Drip.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-10 justify-center mt-20 mb-10">
                    {/* <button className="bg-sky-600 px-4 py-3 text-white text-lg rounded-lg" onClick={() => signOut()}>Sign out </button> */}
                    <button
                      className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20 "
                      type="submit"
                      onClick={() => setSubmitPermission(true)}
                    >
                      Save
                    </button>
                  </div>
                </form>
      </Layout>
    </div>
  );
};

export default EditSchedule;
