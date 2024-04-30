import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";

import meetIcon from "../../../assets/Dashboard/meetIcon.png";
import zoom from "../../../assets/icons/zoom-240.png";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../../../contexts/AuthProvider";
import { gapi } from "gapi-script";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker";
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

const ExecutionMentorSchedule = () => {
  const { agenda } = useParams();
  const { user, userInfo } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  const [timeZone, setTimeZone] = useState("UTC");

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
  const [meetingTypee, setMeetingTypee] = useState(
    adminCalendarInfo?.meetingType || ""
  );
  console.log(calendarEvents);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/getCalendarInfoByEmail/email/${user?.email}`
      )
      .then((response) => {
        setAdminCalendarInfo(response?.data);
        setSelectedHoliday(response?.data?.offDays);
      })

      .catch((error) => console.error(error));
  }, [user, userInfo]);
  // Save current location before redirecting to Google sign-in
  useEffect(() => {
    setPreviousLocation(window.location.pathname);
  }, []);

  useEffect(() => {
    if (calendarfetch === true) {
      googleSignIn();
    }
  }, [calendarfetch]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${
  //         process.env.REACT_APP_SERVER_API
  //       }/api/v1/batches/courseId/${localStorage.getItem("courseId")}`
  //     )
  //     .then((response) => {
  //       setBatchesData(response?.data);
  //     })
  //     .catch((error) => console.error(error));
  // }, [chapter?.courseId]);
  console.log(adminCalendarInfo, user?.email);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
  //     .then((response) => {
  //       setChapter(response?.data);
  //     })

  //     .catch((error) => console.error(error));
  // }, [userInfo, userInfo?.email]);
  // useEffect(() => {
  //   if (chapter?.courseId)
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_SERVER_API}/api/v1/courses/${chapter?.courseId}`
  //       )
  //       .then((response) => {
  //         setCourse(response?.data);
  //       });
  // }, [chapter]);
  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getItemDetailsByOrganizationAndName/schedule/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);
  //console.log(itemDetails)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/events`)
      .then((response) => {
        console.log(response?.data);
        let filteredEvent = [];
        response?.data?.forEach((element) => {
          if (
            element?.organization?.organizationId === userInfo?.organizationId
          ) {
            let event = {
              _id: element?._id,
              title: element?.title,
              start: new Date(element?.start),
              end: new Date(element?.end),
              organization: element?.organization,
              attendees: element?.attendees,
              weekData: element?.weekData,
            };
            filteredEvent = [...filteredEvent, event];
          }
        });
        setEvents(filteredEvent);
      });
  }, [userInfo]);
  // console.log(events);
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
    const currDate = new Date(); // Current date
    const endDate = new Date(); // Create a new Date object for the end date
    // endDate.setDate(currentDate.getDate() + adminCalendarInfo?.dateRange);
    endDate.setUTCDate(endDate.getUTCDate() + +adminCalendarInfo?.dateRange);
    const relevantEvents = calendarEvents.filter((event) => {
      const eventStart = new Date(event?.start?.dateTime); // Parse event start date
      return eventStart >= currDate && eventStart <= endDate;
    });
    console.log(relevantEvents);
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
      events: relevantEvents,
      adminMail: userInfo?.email,
      syncedMail: session?.user?.email,
    };
    setAssignmentData(manageSchedule);
    // console.log(manageSchedule);
    if (submitPermission) {
      const newSchedule = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/updateOrInsertCalendarInfo/email/${userInfo?.email}`,
        manageSchedule
      );
      console.log(newSchedule);
      if (newSchedule?.status === 200) {
        toast.success("Schedule added Successfully");
        event.target.reset();
      } else {
        toast.error("Something went wrong");
      }
      console.log(manageSchedule);
    }
  };
  // console.log("Start", start);
  // console.log("End", end);
  // console.log("Event", eventName);
  // console.log("Description", eventDescription);

  useEffect(() => {
    // Ensure session exists before attempting to fetch calendar data
    if (session?.provider_token) {
      fetchAndDisplayGoogleCalendarEvents();
      fetchPrimaryCalendarInfo();
    } else {
      // Attempt to sign in if no valid session exists
      googleSignIn();
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
        // console.log("Google Sign-In successful!");
        navigate(previousLocation);
        // console.log(calendarEvents); // Log calendarEvents here or perform any other actions
      }
    } catch (error) {
      console.error("Unexpected error during Google Sign-In:", error.message);
      alert("Unexpected error. Please try again.");
    }
  };
  if (googleSignIn) {
    // console.log("done signin");
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

  //for meet link
  function extractMeetLink(title) {
    const meetLinkRegex = /https:\/\/meet\.google\.com\/\S+/;
    const meetLinkArray = title?.match(meetLinkRegex);
    return meetLinkArray ? meetLinkArray[0] : null;
  }
  //for title
  function extractTitleWithoutMeetLink(title) {
    const meetLinkRegex = /https:\/\/meet\.google\.com\/\S+/;
    const titleWithoutLink = title?.replace(meetLinkRegex, "").trim();
    return titleWithoutLink || null;
  }

  // function renderEventContent(eventInfo) {
  //   console.log(events);
  //   // console.log(eventInfo?.event?.title);

  //   const formattedStartDate = eventInfo?.event?.start?.toUTCString();
  //   const formattedEndDate = eventInfo?.event?.end?.toUTCString();
  //   const meetlink = extractMeetLink(eventInfo?.event?.title);

  //   // console.log(formattedStartDate)
  //   // console.log(formattedEndDate)

  //   const startTimeStamp = new Date(formattedStartDate);
  //   const startTimeString = startTimeStamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'GMT' });
  //   const endTimeStamp = new Date(formattedEndDate);
  //   const endTimeString = endTimeStamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'GMT' });

  //   return (
  //     <div
  //       style={{
  //         width: '100%',
  //         backgroundColor: 'blue', // Set the background color of the event
  //         color: 'white', // Set the text color of the event
  //         borderRadius: '5px',
  //         paddingLeft: '5px',
  //       }}
  //     >
  //       <h1>{extractTitleWithoutMeetLink(eventInfo?.event?.title)}</h1>

  //       {
  //         meetlink
  //           ?
  //           <a target="_blank" href={meetlink} rel="noreferrer" className="flex items-center"><span><img src={meetIcon} className="w-[30px]" alt="icon" /></span>  Google Meet</a>
  //           :
  //           <p>No Meeting Link Available</p>
  //       }

  //     </div>
  //   );
  // }
  return (
    <div>
      <Layout>
        {/* <div className="">
          <AssignmentUpNev page={"schedule"} />
        </div> */}

        <div className="flex">
          <div className="w-full mx-10 mt-10">
            {/* <div className="mt-10">
              {
                agenda ?    <Calendar
              
                defaultView="agenda" // Set 'agenda' as the default view
                localizer={localizer}
                events={events}
                step={60}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 750, maxWidth: 900 }}
              />
              :
              <Calendar
              
            
              localizer={localizer}
              events={events}
              step={60}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 750, maxWidth: 900 }}
            />
              }
        
            </div> */}
            {/* <div className="mt-5">
              {
                agenda ? <FullCalendar

                  height="600px"
                  plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                  initialView="list"
                  selectMirror={true}
                  headerToolbar={{
                    start: 'title',
                    center: 'today',
                    end: 'dayGridMonth,dayGridWeek,dayGridDay,list'
                  }}
                  eventContent={renderEventContent}
                  events={events?.map((event) => ({
                    title: event?.title,
                    start: event?.start,
                    end: event?.end,
                    link: event?.meeting,
                    meeting: extractMeetLink(event?.title),
                  }))}
                  // dateClick={(info) => handleDateClick(info.date)}
                  eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short',
                    hour12: true,
                  }}
                  timeZone="UTC" // Set the appropriate time zone
                />
                  :
                  <FullCalendar

                    height="600px"
                    plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectMirror={true}
                    headerToolbar={{
                      start: 'title',
                      center: 'today',
                      end: 'dayGridMonth,dayGridWeek,dayGridDay,list'
                    }}
                    eventContent={renderEventContent}
                    events={events?.map((event) => ({
                      title: event?.title,
                      start: event?.start,
                      end: event?.end,
                      link: event?.meeting,
                      meeting: extractMeetLink(event?.title),
                    }))}
                    // dateClick={(info) => handleDateClick(info.date)}
                    eventTimeFormat={{
                      hour: 'numeric',
                      minute: '2-digit',
                      meridiem: 'short',
                      hour12: true,
                    }}
                    timeZone="UTC" // Set the appropriate time zone
                  />
              }


            </div> */}
            <div>
              {session && session.user ? (
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
                      // dayRender={handleDayRender}
                    />
                  </div>
                  <form onSubmit={handleSubmit} className="ms-[40px]  mt-12">
                    <div className="grid grid-cols-2 gap-10">
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
                          className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
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
                          className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
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
                          className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
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
                          className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
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
                          className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1]"
                          name="meetingType"
                          defaultValue={adminCalendarInfo?.meetingType}
                          onChange={(e) => setMeetingTypee(e.target.value)}
                        >
                          <option disabled selected value="">
                            Select a Meeting Type
                          </option>
                          <option value="Zoom">Zoom</option>
                          <option value="Meet">Google Meet</option>
                        </select>

                        {meetingTypee === "Zoom" && (
                          <div className="text-red-500 text-center mt-4">
                            <p>Zoom Recordings will expire in 30 days.</p>
                          </div>
                        )}
                      </div>
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

          {/* <div>
            <AssignmentRightNev />
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

export default ExecutionMentorSchedule;
