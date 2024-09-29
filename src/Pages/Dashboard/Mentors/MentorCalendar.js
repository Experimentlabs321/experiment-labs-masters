import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";

import meetIcon from "../../../assets/Dashboard/meetIcon.png";
import zoom from "../../../assets/icons/zoom-240.png";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import toast from "react-hot-toast";

import required from "../../../assets/ContentManagement/required.png";
import "react-big-calendar/lib/css/react-big-calendar.css";

const MentorCalendar = () => {
  // Your code here
  const navigate = useNavigate();
  const { email } = useParams();
  const [storedEmail, setStoredEmail] = useState(""); // State to store the email

  // Use useEffect to update the state whenever the email parameter changes
  useEffect(() => {
    setStoredEmail(email);
  }, [email]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const { user, userInfo } = useContext(AuthContext);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState([]);
  const [assignmentData, setAssignmentData] = useState({});
  const [adminCalendarInfo, setAdminCalendarInfo] = useState({});
  const [start, setStart] = useState(new Date());
  const [timeZone, setTimeZone] = useState("UTC");
  const [end, setEnd] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [meetingTypee, setMeetingTypee] = useState(
    adminCalendarInfo?.meetingType || ""
  );
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/email/${storedEmail}`
      )
      .then((response) => {
        // console.log(response?.data)
        setAdminCalendarInfo(response?.data);
        setSelectedHoliday(response?.data?.offDays);
        setCalendarEvents(response?.data?.events || []);
      })

      .catch((error) => console.error(error));
  }, [storedEmail, userInfo]);
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
  // console.log(selectedHoliday);
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
  const handleSubmit = async (event) => {
    const currDate = new Date(); // Current date
    const endDate = new Date(); // Create a new Date object for the end date
    // endDate.setDate(currentDate.getDate() + adminCalendarInfo?.dateRange);
    endDate.setUTCDate(endDate.getUTCDate() + +adminCalendarInfo?.dateRange);
    const relevantEvents = calendarEvents.filter((event) => {
      const eventStart = new Date(event?.start?.dateTime); // Parse event start date
      return eventStart >= currDate && eventStart <= endDate;
    });
    // console.log(relevantEvents);
    event.preventDefault();
    const currentDate = getCurrentDate();
    const form = event.target;
    const scheduleName = form.scheduleName?.value;
    const dateRange = form.dateRange?.value;
    const minimumTime = form.minimumTime?.value;
    const maximumTime = form.maximumTime?.value;
    const meetingDuration = form.meetingDuration?.value;
    const meetingType = form.meetingType?.value;
    const manageSchedule = {
      offDays: selectedHoliday,
      dateRange: dateRange,
      maximumTime,
      minimumTime,
      meetingDuration: meetingDuration,
      meetingType: meetingType,
      events: relevantEvents || [],
      adminMail: storedEmail,
      syncedMail: adminCalendarInfo?.syncedMail,
      email: storedEmail,
    };
    setAssignmentData(manageSchedule);
    // console.log(manageSchedule);
    if (submitPermission) {
      const newSchedule = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo`,
        { calendarInfo: manageSchedule }
      );
      // console.log(newSchedule);
      if (newSchedule?.status === 200) {
        toast.success("Schedule added Successfully");
        event.target.reset();
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  //   async function fetchAndDisplayGoogleCalendarEvents() {
  //     if(currentPage === 'Schedule Settings'){
  //       try {
  //         const events = await fetchGoogleCalendarEvents();
  //         setCalendarError(false);
  //         setCalendarEvents(events.events || []); // Use events.events to ensure it's an array
  //       } catch (error) {
  //         console.error(error);
  //         setCalendarError(true);
  //         setCalendarEvents([]); // Set calendarEvents to an empty array on error
  //       }
  //     }

  //   }
  function renderEventContent(eventInfo) {
    // console.log("Rendering event:", eventInfo);

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
    let zoomMeetingUrl = "";

    if (description && description.includes("Start the Meeting:")) {
      const startMeetingText = "Start the Meeting:";
      const parts = description.split(startMeetingText);
      if (parts.length > 1) {
        zoomMeetingUrl = parts[1].trim();
      } else {
        // console.log("No URL found after 'Start the Meeting:'.");
      }
    } else {
      zoomMeetingUrl = description;
    }

    return (
      <div
        style={{
          width: "100%",
          backgroundColor: "blue",
          color: "white",
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
        <div className="flex">
          <div className="w-full lg:mx-10 lg:mt-10 mt-20">
            <div>
              <>
                <div className="my-6 px-5">
                  <h2>My Calendar Events</h2>
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
                    events={adminCalendarInfo?.events?.map((event, index) => {
                      // console.log(`Processing event ${index}:`, event);

                      const title =
                        event?.summary || event?.topic || "No Title";
                      const start =
                        event?.start?.dateTime ||
                        event?.start ||
                        event?.start_time;
                      const end =
                        event?.end?.dateTime ||
                        event?.end ||
                        event?.end_time ||
                        start;
                      const link = event?.hangoutLink;
                      const description =
                        event?.description || event?.start_url;

                      return {
                        title,
                        start,
                        end,
                        link,
                        description,
                      };
                    })}
                    dateClick={(info) => handleDateClick(info.date)}
                    eventTimeFormat={{
                      hour: "numeric",
                      minute: "2-digit",
                      meridiem: "short",
                    }}
                  />
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="lg:ms-[40px] mx-5  mt-12"
                >
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Date range
                        </p>
                        <img src={required} alt="required" />
                      </div>

                      <input
                        required
                        className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="dateRange"
                        type="number"
                        defaultValue={adminCalendarInfo?.dateRange}
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
                        className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="minimumTime"
                        type="time"
                        defaultValue={adminCalendarInfo?.minimumTime}
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
                        className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="maximumTime"
                        type="time"
                        defaultValue={adminCalendarInfo?.maximumTime}
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
                        className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                        name="meetingDuration"
                        type="number"
                        defaultValue={adminCalendarInfo?.meetingDuration}
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
                        {days?.map((day, index) => (
                          <li
                            key={index}
                            className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] "
                          >
                            <input
                              type="checkbox"
                              id={"student" + index} // Updated to avoid duplicate IDs
                              name={day?.day}
                              value={day?.day}
                              checked={selectedHoliday?.includes(day?.day)} // Simplified check
                              onChange={(e) => handleOptionChangeHoliday(day)}
                              className="mb-1"
                            />
                            <div className="flex mb-1 items-center">
                              <label
                                className="ms-4"
                                htmlFor={"student" + index}
                              >
                                {" "}
                                {/* Updated for */}
                                {day?.day}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Meeting Type
                        </p>
                        <img src={required} alt="required" />
                      </div>

                      <select
                        required
                        className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1]"
                        name="meetingType"
                        defaultValue={adminCalendarInfo?.meetingType}
                        onChange={(e) => setMeetingTypee(e.target.value)}
                      >
                        <option disabled selected value="">
                          Select a Meeting Type
                        </option>
                        <option value="Zoom">Zoom</option>
                        {/* <option value="Meet">Google Meet</option> */}
                      </select>

                      {meetingTypee === "Zoom" && (
                        <div className="text-red-500 text-center mt-4">
                          <p>Zoom Recordings will expire in 30 days.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-10 justify-center mt-20 mb-10">
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
            </div>
          </div>

          {/* <div>
            <AssignmentRightNev />
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

export default MentorCalendar;
