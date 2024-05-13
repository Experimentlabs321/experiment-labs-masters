import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import required from '../../../../assets/ContentManagement/required.png';
import { AuthContext } from '../../../../contexts/AuthProvider';
import Loading from '../../../Shared/Loading/Loading';
import Layout from '../../Layout';

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

const EditSchedule = ({ taskData }) => {
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
    //  .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${scheduleData?.chapterId}`)
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/${scheduleData?.chapterId}`)
      .then((response) => {
        setChapter(response?.data);
      })

      .catch((error) => console.error(error));
  }, [scheduleData]);
  useEffect(() => {
    if (scheduleData?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${scheduleData?.courseId}`
        )
        .then((response) => {
          setCourse(response?.data);
        });
  }, [scheduleData]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${chapter?.courseId}`
      )
      .then((response) => {
        setBatchesData(response?.data);
      })
      .catch((error) => console.error(error));
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
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
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
    const date = info.date.toISOString().split("T")[0];
    const isPastDayValue = isPastDay(date);

    if (isPastDayValue) {
      info.el.style.backgroundColor = "lightgray"; // Apply your desired color for past days
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    Loading();
    const currentDate = getCurrentDate();
    const form = event.target;
    const scheduleName = form.scheduleName?.value;
    const calendarSubjectName = form.calendarSubjectName?.value;
    const dateRange = form.dateRange?.value;
    const minimumTime = form.minimumTime?.value;
    const maximumTime = form.maximumTime?.value;
    const meetingDuration = form.meetingDuration?.value;
    const manageSchedule = {
      scheduleName,
      taskName: scheduleName,
      chapterId: scheduleData?.chapterId,
      courseId: scheduleData?.courseId,
      batches: selectedBatches,
      offDays: selectedHoliday,
      dateRange: dateRange,
      maximumTime,
      minimumTime,
      meetingDuration: meetingDuration,
      usersession: scheduleData?.usersession,
      events: scheduleData?.events,
      taskDrip,
      calendarSubjectName
    };

    console.log(manageSchedule);
    if (submitPermission) {
      const newTask = await axios.put(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/schedule/taskId/${scheduleData?._id}`,
        manageSchedule
      );
      console.log(newTask);

      if (newTask?.data?.result?.acknowledged) {
        toast.success("Schedule updated Successfully");
      }
      Loading().close();
      navigate(-1);
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/schedule/taskId/${id}`
      )
      .then((response) => {
        setScheduleData(response?.data);
        setSelectedBatches(response?.data?.batches);
        setSelectedHoliday(response?.data?.offDays);
        setTaskDrip(response?.data?.taskDrip);

        setTaskDrip(response?.data?.taskDrip);
      });
  }, [id]);

  console.log(scheduleData?.scheduleName);

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
  console.log(scheduleData);
  return (
    <div>
      <Layout>
        <div>
          <div className=" border-b-2 ">
            <div className="container mx-auto px-4 flex items-center justify-between ">
              <div className="flex items-center pt-[30px] pb-[30px] ">
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
                  to={`/questLevels/${course?._id}`}
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  {course?.courseFullName}
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
                  {chapter?.chapterName}
                </button>
              </div>
              {/* <div className="flex items-center mt-[-10px] ">
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
                      <circle cx="13.3926" cy="14" r="10.1153" fill="white" />
                    </svg>
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="ms-[40px]  mt-12">
          <div className="grid grid-cols-2 gap-10">
            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">Schedule Name</p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                /*   defaultValue={
                            assignmentData ? assignmentData?.scheduleName : ""
                          } */
                defaultValue={scheduleData?.scheduleName}
                className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                name="scheduleName"
                type="text"
                placeholder="schedule Name"
              />
            </div>
            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">Calendar Subject Name</p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                /*   defaultValue={
                            assignmentData ? assignmentData?.scheduleName : ""
                          } */
                defaultValue={scheduleData?.calendarSubjectName}
                className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                name="calendarSubjectName"
                type="text"
                placeholder="Calendar Subject Name"
              />
            </div>

            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">Date range</p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                defaultValue={scheduleData?.dateRange}
                className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                name="dateRange"
                type="number"
              />
            </div>

            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">Minimum Time</p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                name="minimumTime"
                type="time"
                defaultValue={scheduleData?.minimumTime}
              />
            </div>
            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">Maximum Time</p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                name="maximumTime"
                type="time"
                defaultValue={scheduleData?.maximumTime}
              />
            </div>

            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">
                  Meeting Duration Length
                </p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                name="meetingDuration"
                type="number"
                defaultValue={scheduleData?.meetingDuration}
              />
            </div>
            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">Select holidays</p>
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
                        (item) => item === day?.day
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
              <p className="font-bold text-lg me-[36px]">Select Batch</p>
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
                          (item) => item?.batchName === option?.batchName
                        )}
                        onChange={(e) => handleOptionChangeBatch(e, option)}
                        className=" mb-1"
                      />
                      <div className="flex mb-1 items-center">
                        <label className="ms-4" htmlFor={option?.batchName}>
                          {option?.batchName}
                        </label>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          {/* <div className="me-20 py-[35px] ps-[40px]">
            <div>
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">Select Batch</p>
                <img src={required} alt="required" />
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
                          checked={selectedBatches.find(
                            (item) => item?.batchName === option?.batchName
                          )}
                          onChange={(e) => handleOptionChangeBatch(e, option)}
                          className=" mb-1"
                        />
                        <div className="flex mb-1 items-center">
                          <label className="ms-4" htmlFor={option?.batchName}>
                            {option?.batchName}
                          </label>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div> */}
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
                    className={`ml-2 text-sm font-medium ${
                      course?.enableDrip ? "text-gray-400" : "text-gray-900"
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
                    className={`ml-2 text-sm font-medium ${
                      course?.enableDrip ? "text-gray-400" : "text-gray-900"
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
