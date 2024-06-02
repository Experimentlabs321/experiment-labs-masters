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
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import toast from 'react-hot-toast';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';

import required from '../../../assets/ContentManagement/required.png';
import meetIcon from '../../../assets/Dashboard/meetIcon.png';
import zoom from '../../../assets/icons/zoom-240.png';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import Layout from '../Layout';

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

const localizer = momentLocalizer(moment);
const AdminCalendarSchedule = () => {
  const { id } = useParams();
  const [timeZone, setTimeZone] = useState("UTC");
  const { user, userInfo } = useContext(AuthContext);

  const [chapter, setChapter] = useState({});
  const [course, setCourse] = useState({});
  const [preview, setPreview] = useState(false);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [assignmentData, setAssignmentData] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();
  const [calendarfetch, setCalendarFetch] = useState(false);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [taskDrip, setTaskDrip] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarId, setCalendarId] = useState("");
  const session = useSession();
  const [rafi, setRafi] = useState(null);
  const [calendarError, setCalendarError] = useState(false);
  global = session;
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();
  const [previousLocation, setPreviousLocation] = useState(null);
  const [adminCalendarInfo, setAdminCalendarInfo] = useState({});
  // Save current location before redirecting to Google sign-in
  useEffect(() => {
    setPreviousLocation(window.location.pathname);
  }, []);

  // useEffect(() => {
  //   if (calendarfetch === true) {
  //     googleSignIn();
  //   }
  // }, [calendarfetch]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${localStorage.getItem("courseId")}`
      )
      .then((response) => {
        setBatchesData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [chapter?.courseId]);
  useEffect(() => {
    axios
     // .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/${id}`)
      .then((response) => {
        setChapter(response?.data);
      })

      .catch((error) => console.error(error));
  }, [id, userInfo, userInfo?.email]);
  console.log(userInfo?.email);
  useEffect(() => {
    if (chapter?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${chapter?.courseId}`
        )
        .then((response) => {
          setCourse(response?.data);
        });
  }, [chapter]);
  console.log(course);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/email/${userInfo?.email}`
      )
      .then((response) => {
        console.log(response);
        setAdminCalendarInfo(response?.data);
      })

      .catch((error) => console.error(error));
  }, [id, userInfo, userInfo?.email]);
  console.log(adminCalendarInfo);
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
  const currentDate = new Date(); // Current date
  const endDate = new Date(); // Create a new Date object for the end date
  // endDate.setDate(currentDate.getDate() + adminCalendarInfo?.dateRange);
  endDate.setUTCDate(endDate.getUTCDate() + +adminCalendarInfo?.dateRange);
  const relevantEvents = calendarEvents.filter((event) => {
    const eventStart = new Date(event?.start?.dateTime); // Parse event start date
    return eventStart >= currentDate && eventStart <= endDate;
  });
  console.log(endDate);
  console.log(calendarEvents);
  console.log(relevantEvents);
  const handleSubmit = async (event) => {
    Loading();
    event.preventDefault();
    const currentDate = getCurrentDate();
    const form = event.target;
    const scheduleName = form.scheduleName?.value;
    const calendarSubjectName = form.calendarSubjectName?.value;
    const dateRange = adminCalendarInfo?.dateRange;
    const minimumTime = adminCalendarInfo?.minimumTime;
    const maximumTime = adminCalendarInfo?.maximumTime;
    const meetingDuration = adminCalendarInfo?.meetingDuration;
    const offDays = adminCalendarInfo?.offDays;
    const meetingType = adminCalendarInfo?.meetingType;
    const calendarInfo = { ...adminCalendarInfo,email : userInfo?.email };
    console.log(adminCalendarInfo);
    calendarInfo.syncedMail =  session?.user?.email;
    calendarInfo.events = relevantEvents;
    delete calendarInfo._id;
    console.log(calendarInfo);
    const newSchedule = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo`,
      {calendarInfo : calendarInfo}
    );
    console.log(newSchedule);
    const manageSchedule = {
      scheduleName,
      taskName: scheduleName,
      chapterId: chapter?._id,
      courseName : course?.courseFullName,
      courseId: chapter?.courseId,
      batches: selectedBatches,
      offDays: offDays,
      dateRange: dateRange,
      maximumTime,
      minimumTime,
      meetingDuration: meetingDuration,
      meetingType: meetingType,
      usersession: global,
      events: relevantEvents,
      taskDrip,
      calendarSubjectName,
      adminCalenderEmail: calendarInfo?.email,
    };
    setAssignmentData(manageSchedule);
    console.log(manageSchedule);
    if (submitPermission) {
      const newSchedule = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/schedule`,
        manageSchedule
      );
      console.log(newSchedule);
      if (newSchedule?.data?.result?.acknowledged) {
        Loading().close();
        toast.success("Schedule added Successfully");
        event.target.reset();
        navigate(`/questLevels/${chapter?.courseId}`);
      } else {
        Loading().close();
        toast.error("Something went wrong");
      }
      console.log(manageSchedule);
    }
    Loading().close();
  };
  console.log("Start", start);
  console.log("End", end);
  console.log("Event", eventName);
  console.log("Description", eventDescription);
  // useEffect(() => {

  //   if (!session?.provider_token) {
  //     googleSignIn();
  //   } else {
  //     // If there's a session, fetch and display events
  //     fetchAndDisplayGoogleCalendarEvents();
  //     fetchPrimaryCalendarInfo();
  //     if (calendarError) {
  //       googleSignIn();
  //     }
  //   }
  // }, [session, calendarError, calendarfetch]);
  useEffect(() => {
    // Ensure session exists before attempting to fetch calendar data
    if (session?.provider_token) {
      fetchAndDisplayGoogleCalendarEvents();
      fetchPrimaryCalendarInfo();
    } else {
      // Attempt to sign in if no valid session exists
      // googleSignIn();
    }
  }, []);
  if (isLoading) {
    return <></>;
  }
  const googleSignIn = async () => {
    const preAuthUrl = window.location.pathname; // You might want to store the full location object or pathname
    localStorage.setItem("preAuthUrl", preAuthUrl);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar",
          persistSession: true,
        },
      });

      if (error) {
        console.error("Error during Google Sign-In:", error.message);
        alert("Error logging in to Google provider with Supabase");
      } else {
        // If there is no error, the sign-in is successful
        console.log("Google Sign-In successful!");
        navigate(previousLocation);
        // console.log(calendarEvents); // Log calendarEvents here or perform any other actions
      }
    } catch (error) {
      console.error("Unexpected error during Google Sign-In:", error.message);
      alert("Unexpected error. Please try again.");
    }
  };
  if (googleSignIn) {
    console.log("done signin");
  }
  async function signOut() {
    await supabase.auth.signOut();
  }
  async function fetchPrimaryCalendarInfo() {
    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/users/me/calendarList/primary",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + session.provider_token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch primary calendar information");
      }
      const calendarInfo = await response.json();
      const primaryCalendarTimeZone = calendarInfo.timeZone;

      // Now that we have the calendar's timezone, set it for FullCalendar
      setTimeZone(primaryCalendarTimeZone);
    } catch (error) {
      console.error(error.message);
      // Optionally, handle errors such as setting a default timezone or user notification
      setCalendarFetch(true); // Consider a more descriptive state variable name or error handling strategy
    }
  }
  async function fetchGoogleCalendarEvents() {
    const currentDate = new Date().toISOString();
    const url = new URL(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events"
    );

    url.searchParams.append("timeMin", currentDate);
    url.searchParams.append("singleEvents", true);
    url.searchParams.append("orderBy", "startTime");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.provider_token,
      },
    });

    console.log(session);

    if (!response.ok) {
      throw new Error("Failed to fetch Google Calendar events");
    }

    const data = await response.json();

    // Extract time zone from the first event (assuming all events have the same time zone)
    const timeZone =
      data.items.length > 0 ? data.items[0].start.timeZone : "UTC";

    console.log(data);

    return { events: data.items || [], timeZone };
  }
  async function fetchAndDisplayGoogleCalendarEvents() {
    try {
      const events = await fetchGoogleCalendarEvents();
      setCalendarError(false);
      setCalendarEvents(events.events || []); // Use events.events to ensure it's an array
    } catch (error) {
      console.error(error);
      setCalendarError(true);
      setCalendarEvents([]); // Set calendarEvents to an empty array on error
    }
  }
  function renderEventContent(eventInfo) {
    // console.log(eventInfo);

    const options = {
      timeZone: eventInfo?.event?.start?.timeZone,
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    };

    const formattedStartDate = new Intl.DateTimeFormat("en-US", options).format(
      new Date(eventInfo?.event?.start)
    );
    const formattedEndDate = new Intl.DateTimeFormat("en-US", options).format(
      new Date(eventInfo?.event?.end)
    );
    const meetlink = eventInfo?.event?.extendedProps?.link;
    const description = eventInfo?.event?.extendedProps?.description;
    let zoomMeetingUrl = ""; // Initialize zoomMeetingUrl variable to store the URL

    if (description && description.includes("Start the Meeting:")) {
      const startMeetingText = "Start the Meeting:";
      const parts = description.split(startMeetingText);
      if (parts.length > 1) {
        zoomMeetingUrl = parts[1].trim(); // Store the URL from the description
        // console.log("URL for 'Start the Meeting':", zoomMeetingUrl);
      } else {
        console.log("No URL found after 'Start the Meeting:'.");
      }
    } else {
      console.log(
        "Description is not available or does not contain 'Start the Meeting:'."
      );
    }
    // console.log(formattedStartDate);
    // console.log(formattedEndDate);

    return (
      <div
        style={{
          width: "100%",
          backgroundColor: "blue", // Set the background color of the event
          color: "white", // Set the text color of the event
          borderRadius: "5px",
          paddingLeft: "5px",
        }}
      >
        <h1>{eventInfo?.event?.title}</h1>

        {meetlink ? (
          <a
            target="_blank"
            href={meetlink}
            rel="noreferrer"
            className="flex items-center"
          >
            <span>
              <img src={meetIcon} className="w-[30px]" alt="icon" />
            </span>{" "}
            Google Meet
          </a>
        ) : zoomMeetingUrl ? (
          <a
            target="_blank"
            href={zoomMeetingUrl}
            rel="noreferrer"
            className="flex items-center"
          >
            <span>
              <img src={zoom} className="w-[26px] mr-1" alt="icon" />
            </span>{" "}
            Zoom
          </a>
        ) : (
          <p>No Meeting Link Available</p>
        )}
      </div>
    );
  }

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setStart(date);
    setEnd(date);
    setIsModalOpen(true);
  };
  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.provider_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      console.log("Response status:", response.status);

      // Store the response text in a variable
      const responseBody = await response.text();
      console.log("Response body:", responseBody);

      if (!response.ok) {
        throw new Error(
          `Failed to create Google Calendar event: ${response.statusText}`
        );
      }

      // Parse the response text as JSON
      const data = JSON.parse(responseBody);
      console.log("API response:", data);
      alert("Event created, check your Google Calendar!");
    } catch (error) {
      console.error("Error creating event:", error.message);
      alert("Error creating event. Please try again.");
    }
  }

  return (
    <div>
      <Layout>
        <div>
          <div className=" border-b-2 ">
            <div className="container flex-col lg:flex-row gap-3 lg:gap-0 mt-20 lg:mt-0 ml-4 lg:mx-auto px-4 flex items-center justify-between ">
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
              <div className="flex items-center mt-[-10px] lg:mb-0 mb-3 ">
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
              </div>
            </div>
          </div>
        </div>
        <div className={`${preview ? "block" : "hidden"}`}>
          {/* <AssignmentTask taskData={assignmentData} /> */}
        </div>
        <div className={`${preview ? "hidden" : "block"}`}>
          <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
            <p>Manage Schedule in {chapter?.chapterName}</p>
          </div>
          <div>
            {session && calendarEvents?.length > 0  ?  (
              <>
                <div className="my-6 px-5">
                  <h2>Your Calendar Events</h2>
                  <FullCalendar
                    height="600px"
                    plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectMirror={true}
                    headerToolbar={{
                      start: "title",
                      center: "today",
                      end: "dayGridMonth,dayGridWeek,dayGridDay,list",
                    }}
                    eventContent={renderEventContent}
                    events={calendarEvents?.map((event) => ({
                      title: event?.summary,
                      start: event?.start.dateTime,
                      end: event?.end.dateTime,
                      link: event?.hangoutLink,
                      description: event?.description,
                    }))}
                    dateClick={(info) => handleDateClick(info.date)}
                    eventTimeFormat={{
                      hour: "numeric",
                      minute: "2-digit",
                      meridiem: "short",
                    }}
                    timeZone={timeZone} // Use timeZone state
                    dayRender={handleDayRender}
                  />
                </div>
                <form onSubmit={handleSubmit} className="ms-[40px]  mt-12">
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
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
                        /*   defaultValue={
                            assignmentData ? assignmentData?.scheduleName : ""
                          } */
                        className="mt-6 ms-6 border rounded-md lg:w-[430px] w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="scheduleName"
                        type="text"
                        placeholder="schedule Name"
                      />
                    </div>
                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Calendar Subject Name
                        </p>
                        <img src={required} alt="required" />
                      </div>

                      <input
                        required
                        /*   defaultValue={
                            assignmentData ? assignmentData?.scheduleName : ""
                          } */
                        className="mt-6 ms-6 border rounded-md lg:w-[430px] w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="calendarSubjectName"
                        type="text"
                        placeholder="Calendar Subject Name"
                      />
                    </div>

                    {/* <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Date range
                        </p>
                        <img src={required} alt="required" />
                      </div>

                      <input
                        required
                        className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="dateRange"
                        type="number"
                        defaultValue={7}
                      />
                    </div>

                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Minimum Time
                        </p>
                        <img src={required} alt="required" />
                      </div>

                      <input
                        required
                        className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="minimumTime"
                        type="time"
                      />
                    </div>
                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Maximum Time
                        </p>
                        <img src={required} alt="required" />
                      </div>

                      <input
                        required
                        className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="maximumTime"
                        type="time"
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
                        defaultValue={30}
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
                    </div> */}
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
                        <p className="font-bold text-lg me-[36px]">
                          Enable Drip
                        </p>
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
                              course?.enableDrip
                                ? "text-gray-400"
                                : "text-gray-900"
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
                              course?.enableDrip
                                ? "text-gray-400"
                                : "text-gray-900"
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
                   <button className="bg-sky-600 px-4 py-3 text-white text-lg rounded-lg" onClick={() => signOut()}>Sign out </button> 
                    <button
                      className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20 "
                      type="submit"
                      onClick={() => setSubmitPermission(true)}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="grid justify-center items-center">
                <button
                  className="bg-sky-600 px-5 py-3 text-white text-lg rounded-lg"
                  onClick={() => googleSignIn()}
                >
                  Sync with google{" "}
                </button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminCalendarSchedule;
