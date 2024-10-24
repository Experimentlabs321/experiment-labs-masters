import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";

import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { gapi } from "gapi-script";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import RightArrowWhite from "../../../assets/Dashboard/RightArrowWhite.png";
import googlemeet from "../../../assets/icons/googlemeet.png";
import zoom from "../../../assets/icons/zoom-240.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import { UAParser } from "ua-parser-js";

const ScheduleTask = ({ taskData, week }) => {
  console.log("weekId ", week)
  // let matching = false;
  const [matching, setMatching] = useState(false);
  const matchInputWithBusySlots = (inputDate, inputTime, busyTimeSlots) => {
    console.log("Busy Time Slots:", busyTimeSlots);
    const inputDateTime = new Date(`${inputDate}T${inputTime}`);
    console.log("Input DateTime:", inputDateTime);

    // Format input date and time to match the busyTimeSlots format
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const inputDateTimeString = inputDateTime.toLocaleString("en-US", options);

    // Extract date and time separately from formatted string
    const [inputDateString, inputTimeString] = inputDateTimeString.split(", ");

    console.log("Formatted Input DateTime:", inputDateTimeString);
    console.log("Input Date:", inputDateString);
    console.log("Input Time:", inputTimeString);

    const isMatch = busyTimeSlots?.some((busySlot) => {
      const busyStartDateTimeString = busySlot.start.dateTime;
      const busyEndDateTimeString = busySlot.end.dateTime;

      const [busyStartDate, busyStartTime] =
        busyStartDateTimeString.split(", ");
      const [_, busyEndTime] = busyEndDateTimeString.split(", ");

      const busyStartDateTime = new Date(busySlot.start.dateTime);
      const busyEndDateTime = new Date(busySlot.end.dateTime);

      console.log("Checking Busy Start:", busyStartDateTimeString);
      console.log("Checking Busy End:", busyEndDateTimeString);
      if (
        inputDateTime >= busyStartDateTime &&
        inputDateTime < busyEndDateTime
      ) {
        // if (inputTimeString >= busyStartTime && inputTimeString >= busyEndTime)
        console.log("busy start and end: ", busyStartTime, busyEndTime);
        return true;
      }
      // Check if the input date matches the busy date and if input time falls within the busy time range
      // if (
      //   inputDateString === busyStartDate &&
      //   inputTimeString >= busyStartTime &&
      //   inputTimeString <= busyEndTime
      // ) {
      //   return true; // Match found, input time is within a busy slot
      // }
      return false; // No match found
    });

    setMatching(isMatch);
    // matching = isMatch; // Update the global variable based on the match result
    //  console.log("Matching:", matching);
  };
  const calendarSubjectName = taskData?.calendarSubjectName;
  const taskId = taskData?._id;
  const weeksId = week?._id;

  const adminMail = taskData?.usersession?.user?.email;
  const adminName = taskData?.usersession?.user?.user_metadata?.name;
  const meetingLength = taskData?.meetingDuration;
  const courseName = taskData?.courseName;
  const batchName = taskData?.batches[0]?.batchName;
  const executionMentors = taskData?.executionMentors;
  console.log("Meeting duration : ", Number(meetingLength));
  // console.log(adminMail);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [maxDateString, setMaxDateString] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [busyTimeSlots, setBusyTimeSlots] = useState([]);
  const [userRequesterEvents, setUserRequesterEvents] = useState([]);
  const session = useSession();
  const [selectedDate, setSelectedDate] = useState("");
  const [isOpenStickyBar, setIsOpenStickyBar] = useState(true);
  const supabase = useSupabaseClient();
  // console.log("Task data ", taskData);
  const { user, userInfo } = useContext(AuthContext);
  const [ismeetingType, setIsMeetingType] = useState(true);
  const [meetingType, setMeetingType] = useState(null);
  const [zoomInfo, setZoomInfo] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [zoomeventId, setZoomEventId] = useState("");
  const [eventDBid, setEventDBid] = useState(null);
  const [zoomMeetingId, setZoomMeetingId] = useState(null);
  const [requesterStd, setRequesterStd] = useState(null);
  const [stdName, setStdName] = useState(null);
  const [clicked, setClicked] = useState(false);
  if (userInfo.role !== "admin") {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }
  const handleRescheduleMeet = (eventId, eventDBid, mid) => {
    setEventDBid(eventDBid);
    setEventId(eventId);

    setIsReschedule(true);
  };
  const handleRescheduleZoom = (eventId, eventDBid, mid) => {
    setEventDBid(eventDBid);
    setEventId(eventId);
    setZoomMeetingId(mid);
    console.log("zoom id", mid);
    setIsReschedule(true);
  };
  const handleRescheduleMeetAdmin = (eventId, eventDBid, requested, name) => {
    setEventDBid(eventDBid);
    setEventId(eventId);
    setRequesterStd(requested);
    setStdName(name);
    setIsReschedule(true);
  };
  const handleRescheduleZoomAdmin = (eventId, eventDBid, requested, name, mid) => {
    setEventDBid(eventDBid);
    setEventId(eventId);
    setRequesterStd(requested);
    setStdName(name);
    setZoomMeetingId(mid);
    setIsReschedule(true);
  };
  //console.log(userInfo);
  const navigate = useNavigate();
  const [date, setDate] = useState(""); // State for the date
  const [time, setTime] = useState(""); // State for the time
  const [checkTime, setCheckTime] = useState(false);
  const [timeRangeError, setTimeRangeError] = useState(false);
  const [minTime, setMinTime] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [selectedTimeDate, setselectedTimeDate] = useState("");
  const [reservedEvent, setReservedEvent] = useState(null);
  const [startTime, setStartTime] = useState();
  const [currentWeek, setCurrentWeek] = useState(null);
  const calendarID = process.env.REACT_APP_calendarID;
  const [userZoomInfo, setUserZoomInfo] = useState({});
  const [isReschedule, setIsReschedule] = useState(false);
  const [adminCalendarInfo, setAdminCalendarInfo] = useState({});
  const [relevantEvents, setRelevantEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [course, setCourse] = useState({});
  const [batch, setBatch] = useState({});

  useEffect(() => {
    // Assuming taskData.events is already populated
    setEvents(taskData?.events || []);
    setFilteredEvents(taskData?.events || []);
  }, [taskData?.events]);
  const filterEventsByDate = () => {
    if (!fromDate || !toDate) {
      // If no dates are set, show all events
      setFilteredEvents(events);
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const filtered = events.filter((event) => {
      // Check for both potential start and end time formats
      const startTime = event.start?.dateTime
        ? new Date(event.start.dateTime)
        : event.start_time
          ? new Date(event.start_time)
          : null;

      console.log("from :", from, "to :", to, "start :", startTime);
      // Ensure both startTime and endTime are valid Date objects before comparing
      return startTime && startTime >= from && startTime <= to;
    });

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    filterEventsByDate();
  }, [fromDate, toDate, events]);
  console.log("filtered events", filteredEvents);
  console.log(date);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/email/${taskData?.adminCalenderEmail || taskData?.adminCalendarEmail
        }`
      )
      .then((response) => {
        console.log(response);
        console.log("here");
        setAdminCalendarInfo(response?.data);

        const currentDate = new Date(); // Current date
        const endDate = new Date(); // Create a new Date object for the end date
        // endDate.setDate(currentDate.getDate() + adminCalendarInfo?.dateRange);
        endDate.setUTCDate(endDate.getUTCDate() + +response?.data?.dateRange);
        const relevantEvents = response?.data?.events.filter((event) => {
          const eventStart = new Date(event?.start?.dateTime); // Parse event start date
          return eventStart >= currentDate && eventStart <= endDate;
        });
        setRelevantEvents(relevantEvents);
      })

      .catch((error) => console.error(error));
  }, [taskData]);

  useEffect(() => {
    const findCourseAndBatch = userInfo?.courses?.find(
      (item) => item?.courseId === taskData?.courseId
    );
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${findCourseAndBatch?.courseId}`
      )
      .then((res) => setCourse(res?.data))
      .catch((error) => console.error(error));
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/batchId/${findCourseAndBatch?.batchId}`
      )
      .then((response) => {
        setBatch(response?.data);
      })
      .catch((error) => console.error(error));
  }, [taskData, userInfo]);

  //console.log(adminCalendarInfo, relevantEvents);

  useEffect(() => {
    // Assuming taskData is already available when the component mounts
    if (taskData) {
      setMeetingType(taskData?.meetingType);
      console.log(taskData?.meetingType);
      const currentDate = getCurrentDate();
      const maxDateOffset = parseInt(taskData?.dateRange, 10) || 0;
      const maxDateObject = new Date(currentDate);
      maxDateObject.setDate(maxDateObject.getDate() + maxDateOffset);
      const initialMaxDateString = maxDateObject.toISOString().split("T")[0];

      // Set initial maxDateString when the component mounts
      setMaxDateString(initialMaxDateString);

      // Set the min and max attributes for the date input after the DOM is loaded
      const dateInput = document.getElementById("date");
      if (dateInput) {
        dateInput.min = getCurrentDate();
        dateInput.max = initialMaxDateString;
      }
    }
  }, [taskData]);
  useEffect(() => {
    const fetchZoomInfos = async () => {
      if (adminCalendarInfo?.events?.length > 0) {
        try {
          // Initialize an array to hold the combined data for each event
          let combinedZoomInfos = [];

          // Loop through each event
          for (const event of taskData.events) {
            try {
              const response = await axios.post(
                `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/recording/organizationId/${event?.organization?.organizationId}`,
                {
                  meetingId: event?.id,
                }
              );

              // Combine the response data with the requester info
              const combinedData = {
                ...response.data,
                requester: event?.requester,
              };

              // Accumulate the combined data
              combinedZoomInfos.push(combinedData);
            } catch (error) {
              console.error(
                "Error fetching Zoom info for event ID:",
                event?.id,
                error
              );
            }
          }

          // Update the state with the accumulated data
          setZoomInfo(combinedZoomInfos);
          setIsLoading(false);
        } catch (error) {
          console.error("Error in fetching Zoom infos:", error);
          setIsLoading(false);
        }
      }
    };

    if (userInfo?.role === "admin") {
      fetchZoomInfos();
    }
  }, [taskData, userInfo?.role]);

  //console.log(zoomInfo);
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    // Replace this with your date string
    const options = { weekday: "long", timeZone: "UTC" }; // Set the timeZone option

    const selectedDay = new Date(selectedDate).toLocaleDateString(
      "en-US",
      options
    );

    // Check if the selected day is an off-day
    if (taskData?.offDays?.includes(selectedDay)) {
      alert(`You cannot select ${selectedDay} as it is an off-day.`);
      // Clear the selected date
      document.getElementById("date").value = "";
      setDate(null);
      setMaxDateString(""); // Reset maxDateString state
      setSelectedDate(""); // Add this line to set the selected date to an empty string
      return;
    }

    // Check if the selected date is within the valid date range
    const currentDate = getCurrentDate(); // Assuming you have the getCurrentDate function
    const maxDateOffset = parseInt(taskData?.dateRange, 10) || 0;
    const maxDateObject = new Date(currentDate); // Use currentDate as the starting point
    maxDateObject.setDate(maxDateObject.getDate() + maxDateOffset);

    if (new Date(selectedDate) > maxDateObject) {
      alert(`You cannot select a date beyond the allowed range.`);
      // Clear the selected date
      document.getElementById("date").value = "";
      setDate(null);
      setMaxDateString(""); // Reset maxDateString state
      setSelectedDate(""); // Add this line to set the selected date to an empty string
      return;
    }

    setDate(selectedDate);
    const maxDateString = maxDateObject.toISOString().split("T")[0];
    document.getElementById("date").min = getCurrentDate();
    document.getElementById("date").max = maxDateString;
    setMaxDateString(maxDateString);
    setSelectedDate(selectedDate); // Set the selected date
    matchInputWithBusySlots(selectedDate, time, busyTimeSlots);
  };
  const convert12HourTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
  };

  // Update the time state when the time input changes
  const handleTimeChange = (event) => {
    const selectedTime12h = event.target.value;
    console.log(`Setting time to ${selectedTime12h}`);

    const selectedTime24h = convert12HourTo24Hour(selectedTime12h);
    console.log(`Converted time to 24-hour format: ${selectedTime24h}`);

    const minTime = taskData?.minimumTime;
    const maxTime = taskData?.maximumTime;
    setMaxTime(maxTime);
    setMinTime(minTime);

    console.log("Selected Date:", selectedDate);

    handleTimeSelection(selectedTime24h, selectedDate, minTime, maxTime); // Pass selectedDate

    // Rest of your code...
  };

  const handleTimeSelection = (
    selectedTime,
    selectedDate,
    minTime,
    maxTime
  ) => {
    console.log(selectedTime, selectedDate, minTime, maxTime);
    const selectedT = new Date(`${selectedDate}T${selectedTime}`);
    setselectedTimeDate(selectedT);
    const minTimeDate = new Date(`${selectedDate}T${minTime}`);
    const maxTimeDate = new Date(`${selectedDate}T${maxTime}`);
    console.log(selectedT);
    console.log(minTimeDate, maxTimeDate);
    if (selectedT < minTimeDate || selectedT > maxTimeDate) {
      console.log("entered");
      setCheckTime(true);
      setTimeRangeError(true);
      // Reset the time to the initial state or do nothing
      document.getElementById("time").value = minTime;
    } else {
      console.log("adssssssentered");
      setTimeRangeError(false);
      setCheckTime(false);
      setTime(selectedTime);
      console.log("handleTimeSelection", selectedTime);
      matchInputWithBusySlots(selectedDate, selectedTime, busyTimeSlots);
    }
  };

  //console.log("input time ", time);
  // const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !/Edg/.test(navigator.userAgent) && !/OPR/.test(navigator.userAgent);
  // console.log(isChrome);
  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    const vendor = navigator.vendor;

    if (/OPR/.test(userAgent)) {
      return "Opera";
    }
    if (/Edg/.test(userAgent)) {
      return "Edge";
    }
    if (/Chrome/.test(userAgent) && /Google Inc/.test(vendor)) {
      return "Chrome";
    }
    if (/Safari/.test(userAgent) && /Apple Computer/.test(vendor)) {
      return "Safari";
    }
    if (/Firefox/.test(userAgent)) {
      return "Firefox";
    }
    if (/MSIE|Trident/.test(userAgent)) {
      return "Internet Explorer";
    }
    return "Other";
  };

  const browserName = getBrowserName();
  console.log(browserName);
  const isChrome = browserName === "Chrome";
  useEffect(() => {
    const busyTimeSlots = adminCalendarInfo?.events
      ?.map((event) => {
        // Check if start and end are directly available or nested under different properties
        const startDateTime = event?.start?.dateTime || event.start_time;
        const endDateTime =
          event.end?.dateTime ||
          event.end_time ||
          (() => {
            // If end time is not directly available, calculate it based on duration and start time
            const duration = event?.duration; // Duration in minutes
            if (startDateTime && duration) {
              const endDate = new Date(
                new Date(startDateTime).getTime() + duration * 60000
              );
              return endDate.toISOString();
            }
            return null;
          })();

        if (!startDateTime || !endDateTime) {
          return null; // Skip events without a valid start or end dateTime
        }
        // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // console.log(userTimeZone);
        // Convert the start and end times to the Asia/Kolkata time zone
        const options = {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
        console.log(options);
        const startTime = new Date(startDateTime).toLocaleString(
          "en-US",
          options
        );
        const endTime = new Date(endDateTime).toLocaleString("en-US", options);

        return {
          start: { dateTime: startTime },
          end: { dateTime: endTime },
        };
      })
      .filter(Boolean);

    console.log("Busy Time Slots:", busyTimeSlots);

    setBusyTimeSlots(busyTimeSlots);
  }, [taskData, matching, adminCalendarInfo?.events]);

  const googleSignIn = async () => {
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
      }
    } catch (error) {
      console.error("Unexpected error during Google Sign-In:", error.message);
      alert("Unexpected error. Please try again.");
    }
  };
  useEffect(() => {
    // Check if the user is the requester in any of the events
    const userRequesterEvents = taskData?.events?.filter(
      (event) => event.requester === user?.email
    );

    // Update the state variable with user requester events
    setUserRequesterEvents(userRequesterEvents);
    console.log("my events ", userRequesterEvents);
  }, [taskData, user, adminCalendarInfo]);
  //console.log("my events ", userRequesterEvents);

  useEffect(() => {
    if (userRequesterEvents?.length > 0)
      axios
        .post(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/recording/organizationId/${userInfo?.organizationId}`,
          {
            meetingId: userRequesterEvents[0]?.id,
          }
        )
        .then((response) => {
          setUserZoomInfo(response?.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [userRequesterEvents, userInfo?.organizationId]);
  // console.log(userZoomInfo?.recording_files);
  const generateAllTimeSlots = (start, end) => {
    const timeSlots = [];
    let currentTime = new Date(start);
    while (currentTime <= end) {
      timeSlots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + Number(meetingLength)); // Assuming 30-minute time slots
    }
    return timeSlots;
  };
  useEffect(() => { }, [userRequesterEvents]);
  // Function to filter out busy time slots
  const filterBusyTimeSlots = (allTimeSlots, busyTimeSlots, reservedEvent) => {
    return allTimeSlots.filter((timeSlot) => {
      // Check if the time slot is within any busy time slots
      for (const busySlot of busyTimeSlots) {
        if (timeSlot >= busySlot.start && timeSlot < busySlot.end) {
          return false; // Remove busy time slots
        }
      }

      // Check if the time slot matches the reserved event's time slot
      if (
        reservedEvent &&
        timeSlot >= reservedEvent.start &&
        timeSlot < reservedEvent.end
      ) {
        return false; // Remove reserved time slot
      }

      return true; // Keep available time slots
    });
  };

  const isTimeSlotBusy = (timeSlot) => {
    for (const busySlot of busyTimeSlots) {
      if (
        timeSlot.getTime() >= busySlot.start.getTime() &&
        timeSlot.getTime() < busySlot.end.getTime()
      ) {
        return true;
      }
    }
    return false;
  };

  const isTimeSlotReserved = (timeSlot) => {
    if (reservedEvent) {
      const reservedStart = new Date(reservedEvent.start);
      const reservedEnd = new Date(reservedEvent.end);

      return (
        timeSlot.getTime() >= reservedStart.getTime() &&
        timeSlot.getTime() < reservedEnd.getTime()
      );
    }
    return false;
  };
  function formatUtcDateTimeString(dateTimeString) {
    const utcDateTime = new Date(dateTimeString);

    if (isNaN(utcDateTime)) {
      console.error("Invalid dateTimeString:", dateTimeString);
      return "Invalid Date";
    }

    const formatInTimeZone = (dateTime, timeZone, label) =>
      `${dateTime.toLocaleString("en-US", {
        timeZone,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })} (${label})`;

    const formattedUTC = formatInTimeZone(utcDateTime, "UTC", "UTC");
    const formattedIndia = formatInTimeZone(utcDateTime, "Asia/Kolkata", "IST");
    const formattedKorea = formatInTimeZone(utcDateTime, "Asia/Seoul", "KST");
    const formattedBangladesh = formatInTimeZone(
      utcDateTime,
      "Asia/Dhaka",
      "BDT"
    );

    return `UTC: ${formattedUTC}, India: ${formattedIndia}, Korea: ${formattedKorea}, Bangladesh: ${formattedBangladesh}`;
  }
  function formatUtcDateTimeStringToListItems(dateTimeString) {
    const utcDateTime = new Date(dateTimeString);

    if (isNaN(utcDateTime.getTime())) {
      console.error("Invalid dateTimeString:", dateTimeString);
      return ["Invalid Date"];
    }

    const formatInTimeZone = (dateTime, timeZone, label) =>
      `${dateTime.toLocaleString("en-US", {
        timeZone,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })} (${label})`;

    return [
      // formatInTimeZone(utcDateTime, "UTC", "UTC"),
      formatInTimeZone(utcDateTime, "Asia/Kolkata", "India-time"),
      // formatInTimeZone(utcDateTime, "Asia/Seoul", "Korea-time"),
      // formatInTimeZone(utcDateTime, "Asia/Dhaka", "Bangladesh-time"),
    ];
  }
  const sendCalendarEvent = (res) => {
    console.log(res);
    setZoomEventId(res?.result?.id);
  };
  const formatDateTimeWithTimeZones = (dateTime) => {
    // Convert dateTime to UTC for universal understanding
    const utcTime = dateTime.toISOString();
    // Format the date and time in a user-friendly way, in UTC
    const formattedUtcTime =
      new Date(utcTime).toLocaleString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) + " (UTC)";

    // Add a few major time zones for reference if you wish
    const dhakaTime =
      new Date(utcTime).toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) + " (BDT)"; // Bangladesh Time

    const kolkataTime =
      new Date(utcTime).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) + " (IST)"; // Indian Standard Time

    const seoulTime =
      new Date(utcTime).toLocaleString("en-US", {
        timeZone: "Asia/Seoul",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) + " (KST)"; // Korea Standard Time
    return `India-time: ${kolkataTime}`;
  };
  //console.log(adminMail);
  const handleLinkClick = async (event, userInfo, task, meetingType, link) => {
    console.log(task);
    const participantData = {
      email: userInfo?.email,
      participantId: userInfo?._id,
      status: "Completed",
      completionDateTime: new Date(),
    };
    const sendData = {
      participantChapter: {
        email: userInfo?.email,
        participantId: userInfo?._id,
        status: "Completed",
        completionDateTime: new Date(),
      },
      participantTask: {
        participant: {
          email: userInfo?.email,
          participantId: userInfo?._id,
          status: "Completed",
          completionDateTime: new Date(),
        },
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/Schedule/taskId/${taskId}/chapterId/${task?.chapterId}`,
        sendData
      );
      const weekResponse = await axios.post(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks/${event.weekId}/participants`, { participant: participantData });
      console.log(response);
      console.log(weekResponse.data.message);

      if (response.status === 200 && weekResponse.status === 200) {
        // Navigate to the meeting link
        window.location.href = link;
      }
    } catch (error) {
      console.error("Error sending participant data:", error);
    }
  };

  const logToDatabase = async (message, data) => {
    try {
      // Parse the user agent to get device and browser details
      const parser = new UAParser();
      const device = parser.getDevice().type || "Desktop"; // Default to Desktop if no type
      const browser = parser.getBrowser().name || "Unknown";
      const os = parser.getOS().name || "Unknown";

      // Prepare log data
      const logData = {
        message: message,
        data: {
          ...data,
          device: device,
          browser: browser,
          os: os,
        },
        user: user?.email || "anonymous", // Optionally track the user or default to anonymous
      };

      // Send log data to the server
      await axios.post(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/logs`, logData);

      console.log("Log entry created:", message);
    } catch (error) {
      console.error("Failed to log to database:", error);
    }
  };
  const parser = new UAParser();
  const device = parser.getDevice().type || "Desktop"; // Default to Desktop if no type
  const browser = parser.getBrowser().name || "Unknown";
  const os = parser.getOS().name || "Unknown";
  console.log("Browser:", browser, "\n OS:", os, "\n Device:", device);
  const addEvent = async () => {
    if (checkTime) {
      Swal.fire({
        icon: "error",
        title: "Invalid time!",
        text: `Please choose a time between ${minTime} and ${maxTime}.`,
      });
    } else {
      console.log("select date", date);
      console.log("select time", time);
      if (date && time) {
        Loading();
        console.log("iamin");
        const selectedTimeDatee = new Date(`${date}T${time}`); // Keep the Z for UTC
        console.log("selected time date", selectedTimeDatee);
        const endDateTimeUTC = new Date(selectedTimeDatee);
        endDateTimeUTC.setUTCMinutes(
          endDateTimeUTC.getUTCMinutes() + Number(meetingLength)
        );
        console.log("end time", endDateTimeUTC);
        const currentDateTime = new Date();
        const timeDifferenceInMilliseconds =
          selectedTimeDatee.getTime() - currentDateTime.getTime();
        const eventStartTime = formatDateTimeWithTimeZones(selectedTimeDatee);
        const eventEndTime = formatDateTimeWithTimeZones(endDateTimeUTC);
        console.log("event s ", eventStartTime);
        console.log("event e ", eventEndTime);
        console.log("difference ", timeDifferenceInMilliseconds);
        // // Use these formatted strings in your communication
        // console.log(`Event Start: ${formattedStartTime}`); // For logging or display
        // console.log(`Event End: ${formattedEndTime}`);
        if (timeDifferenceInMilliseconds < 0) {
          Loading().close();
          Swal.fire({
            icon: "error",
            title: "Invalid Date and time!",
            text: "Please enter valid date & time for event!",
          });
          return;
        }
        const refreshToken = process.env.REACT_APP_refreshToken;
        if (meetingType === "Meet") {
          fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${process.env.REACT_APP_google_clientId}&client_secret=${process.env.REACT_APP_google_clientSecret}`,
          })
            .then((response) => response.json())
            .then(async (data) => {
              var event = {
                summary: `${stdName ? stdName : userInfo?.name
                  } ${calendarSubjectName}`,
                location: "",
                start: {
                  dateTime: selectedTimeDatee,
                  timeZone: "UTC",
                },
                end: {
                  dateTime: endDateTimeUTC,
                  timeZone: "UTC",
                },
                attendees: [
                  // { email: "naman.j@experimentlabs.in" },
                  { email: requesterStd ? requesterStd : user?.email },
                  { email: adminMail },
                ],
                reminders: {
                  useDefault: true,
                },
                conferenceDataVersion: 1,
                conferenceData: {
                  createRequest: {
                    conferenceSolutionKey: {
                      type: "hangoutsMeet",
                    },
                    requestId: `meeting-${Date.now()}`,
                  },
                },
              };
              // console.log(data);
              const newAccessToken = data.access_token;
              if (isReschedule && eventId) {
                const updatedEvent = {
                  start: {
                    dateTime: selectedTimeDatee.toISOString(),
                    timeZone: "UTC",
                  },
                  end: {
                    dateTime: endDateTimeUTC.toISOString(),
                    timeZone: "UTC",
                  },
                  // Add other event properties as needed
                };
                var rrescheduledEvent = {
                  title: `${stdName ? stdName : userInfo?.name
                    } ${calendarSubjectName} `,
                  start: {
                    dateTime: selectedTimeDatee,
                    timeZone: "UTC",
                  },
                  end: {
                    dateTime: endDateTimeUTC,
                    timeZone: "UTC",
                  },
                  organization: {
                    organizationId: userInfo?.organizationId,
                    organizationName: userInfo?.organizationName,
                  },
                  attendees: [
                    // { email: "naman.j@experimentlabs.in" },
                    // { email: "gaurav@experimentlabs.in" },
                    { email: requesterStd ? requesterStd : user?.email },
                    // { email: "alrafi4@gmail.com" },
                    {
                      email: adminMail,
                    },
                  ],
                  // Assuming "weekData" is something specific to your application and not part of the standard Calendar API response
                  weekData: currentWeek,
                  hangoutLink: data.hangoutLink, // Access directly from data
                  requester: requesterStd ? requesterStd : user?.email,
                  studentName: stdName ? stdName : userInfo?.name,
                  eventId: eventId,
                  scheduleId: taskId,
                  courseName: course?.courseFullName,
                  batchName: taskData?.batches[0]?.batchName,
                  executionMentors: userInfo?.executionMentors
                    ? userInfo?.executionMentors
                    : executionMentors,
                  // Access directly from data
                };
                rrescheduledEvent.start_time =
                  rrescheduledEvent?.start?.dateTime?.toISOString();

                // Output the modified rrescheduledEvent object to verify the new field addition
                console.log(rrescheduledEvent);
                const InfoCalendar = {
                  email: adminCalendarInfo?.email?.email,
                  event: rrescheduledEvent,
                };
                console.log({ calendarInfo: InfoCalendar });
                const newSchedule = await axios.put(
                  `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
                  { calendarInfo: InfoCalendar }
                );
                console.log(newSchedule);
                if (newSchedule?.data?.data?.success === false) {
                  if (
                    newSchedule?.data?.message ===
                    "Requested slot has been booked!"
                  ) {
                    Loading().close();
                    await Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Requested slot has been booked! Please try another slot.",
                    });
                  } else if (
                    newSchedule?.data?.message === "Calendar info not found!"
                  ) {
                    Loading().close();
                    await Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Calendar info not found! Please try again.",
                    });
                  } else {
                    Loading().close();
                    await Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong! Please try again.",
                    });
                  }
                } else {
                  fetch(
                    `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${eventId}?sendUpdates=none`,
                    {
                      method: "PATCH", // Method to update the event
                      headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(updatedEvent),
                    }
                  )
                    .then((response) => response.json()) // Convert the response to JSON
                    .then(async (data) => {
                      console.log("Event updated:", data);
                      var rescheduledEvent = {
                        title: `${stdName ? stdName : userInfo?.name
                          } ${calendarSubjectName} `,
                        start: {
                          dateTime: selectedTimeDatee,
                          timeZone: "UTC",
                        },
                        end: {
                          dateTime: endDateTimeUTC,
                          timeZone: "UTC",
                        },
                        organization: {
                          organizationId: userInfo?.organizationId,
                          organizationName: userInfo?.organizationName,
                        },
                        attendees: [
                          // { email: "naman.j@experimentlabs.in" },
                          // { email: "gaurav@experimentlabs.in" },
                          { email: requesterStd ? requesterStd : user?.email },
                          // { email: "alrafi4@gmail.com" },
                          {
                            email: adminMail,
                          },
                        ],
                        // Assuming "weekData" is something specific to your application and not part of the standard Calendar API response
                        weekData: currentWeek,
                        hangoutLink: data.hangoutLink, // Access directly from data
                        requester: requesterStd ? requesterStd : user?.email,
                        studentName: stdName ? stdName : userInfo?.name,
                        eventId: eventId,
                        scheduleId: taskId,
                        courseName: course?.courseFullName,
                        batchName: batchName,
                        executionMentors: userInfo?.executionMentors
                          ? userInfo?.executionMentors
                          : executionMentors,
                        // Access directly from data
                      };

                      console.log(eventDBid);
                      const updateResponse = await axios.put(
                        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/${eventDBid}`,
                        rescheduledEvent
                      );
                      // const updateResponse = await axios.put(
                      //   `${process.env.REACT_APP_SERVER_API}/api/v1/events/${eventDBid}`,
                      //   {
                      //     "title": "Tanvir Sohan <> Experiment Labs <> Doubt clearing <> ",
                      //     "start": {
                      //       "dateTime": "2024-04-09T07:00:00.000Z",
                      //       "timeZone": "UTC"
                      //     },
                      //     "end": {
                      //       "dateTime": "2024-04-09T08:00:00.000Z",
                      //       "timeZone": "UTC"
                      //     },
                      //     "organization": {
                      //       "organizationId": "64cbbd756f0ef101bc957231",
                      //       "organizationName": "Shihab International"
                      //     },
                      //     "attendees": [
                      //       {
                      //         "email": "so2han67@gmail.com"
                      //       },
                      //       {
                      //         "email": "team32programming@gmail.com"
                      //       }
                      //     ],
                      //     "weekData": null,
                      //     "hangoutLink": "https://meet.google.com/rgf-dvvc-bxh",
                      //     "requester": "so2han67@gmail.com",
                      //     "eventId": "0kh2gidugamp50s33mpm0cto24"
                      //   }
                      // );

                      console.log("res ", updateResponse?.data);
                      console.log("taskname ", taskData?.taskName);
                      if (updateResponse?.data?.acknowledged) {
                        const sendMail = await axios.post(
                          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                          {
                            //  from: `${userInfo?.email}`,
                            //    to: `${user?.email},${adminMail}`,
                            to: `${requesterStd ? requesterStd : user?.email}`,
                            templateType: "emailAction",
                            templateName: "resheduleTaskStudent",
                            organizationId: userInfo?.organizationId,
                            learner_name: userInfo?.name,
                            schedule_name: taskData?.taskName,
                            start_time: eventStartTime,
                            end_time: eventEndTime,
                            // meeting_link: rescheduledEvent?.hangoutLink,
                            meeting_link: `${window.location.origin}/taskDetails/${taskData?._id}?taskType=Schedule`,
                            admin_name: adminName,
                            site_email: adminMail,
                            meeting_date: date,
                            /*  subject: `Event request`,
                            message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                              }`, */
                          }
                        );
                        const sendMailAdmin = await axios.post(
                          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                          {
                            //  from: `${userInfo?.email}`,
                            //    to: `${user?.email},${adminMail}`,
                            to: `${adminMail}`,
                            templateType: "emailAction",
                            templateName: "resheduleTask",
                            organizationId: userInfo?.organizationId,
                            start_time: eventStartTime,
                            end_time: eventEndTime,
                            meeting_link: rescheduledEvent?.hangoutLink,
                            learner_name: stdName ? stdName : userInfo?.name,
                            learner_email: requesterStd
                              ? requesterStd
                              : user?.email,
                            meeting_date: date,
                            /*  subject: `Event request`,
                            message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                              }`, */
                          }
                        );

                        if (userInfo?.role === "admin") {
                          const newNotification = await axios.post(
                            `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
                            {
                              message: `${userInfo?.name} rescheduled an event of schedule task "${taskData?.taskName}" in course ${course?.courseFullName}`,
                              dateTime: new Date(),
                              recipient: {
                                type: "Specific Student",
                                recipientEmail: requesterStd,
                                organizationId: userInfo?.organizationId,
                              },
                              type: "Event",
                              readBy: [],
                              triggeredBy: user?.email,
                              redirectLink: `/taskDetails/${taskData?._id}?taskType=Schedule`,
                            }
                          );
                          console.log(newNotification);
                        } else {
                          const newNotification = await axios.post(
                            `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
                            {
                              message: `${userInfo?.name} of ${batch[0]?.batchName} batch ${course?.courseFullName} course rescheduled an event of schedule task ${taskData?.taskName}.`,
                              dateTime: new Date(),
                              recipient: {
                                type: "Admins",
                                organizationId: userInfo?.organizationId,
                              },
                              type: "Event",
                              readBy: [],
                              triggeredBy: user?.email,
                              redirectLink: `/taskDetails/${taskData?._id}?taskType=Schedule`,
                            }
                          );
                          console.log(newNotification);
                        }
                        console.log("send ", sendMail);
                        console.log("Admin Mail ", sendMailAdmin);
                        if (
                          sendMail?.data?.success &&
                          sendMailAdmin?.data?.success
                        ) {
                          console.log({
                            ...rescheduledEvent,
                            eventDBid: eventDBid,
                          });
                          const newRescheduleEvent = await axios.put(
                            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/${taskData?._id}/updateEvent`,
                            { ...rescheduledEvent, eventDBid: eventDBid }
                          );
                          console.log(newRescheduleEvent);

                          const filteredEvent = relevantEvents?.filter(
                            (item) =>
                              item?.eventId !== rescheduledEvent?.eventId
                          );
                          const calendarInfo = { ...adminCalendarInfo };
                          calendarInfo.events = [
                            ...filteredEvent,
                            { ...rescheduledEvent, eventDBid: eventDBid },
                          ];
                          // rescheduledEvent.start_time = rescheduledEvent?.start?.dateTime?.toISOString();

                          // // Output the modified rescheduledEvent object to verify the new field addition
                          // console.log(rescheduledEvent);
                          // delete calendarInfo._id;
                          // console.log(calendarInfo);
                          // const InfoCalendar = { email: calendarInfo?.email, event: rescheduledEvent };
                          // console.log({ calendarInfo: InfoCalendar });
                          // const newSchedule = await axios.put(
                          //   `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
                          //   { calendarInfo: InfoCalendar }
                          // );
                          // console.log(newSchedule);
                          // console.log("new event created ", newEvent);
                          Loading().close();
                          await Swal.fire({
                            icon: "success",
                            title: "Event Rescheduled!",
                            text: "The event has been successfully rescheduled.",
                          });
                          navigate("/courseAccess");
                        }
                      }

                      // Other UI updates or state resets after successful rescheduling
                    })
                    .catch((error) => {
                      console.error("Error updating event:", error);
                      // Handle error
                    });
                }
              } else {
                function initiate() {
                  const sendData = async (event) => {
                    event.start_time = event?.start?.dateTime?.toISOString();
                    const InfoCalendar = {
                      email: adminCalendarInfo?.email,
                      event: event,
                    };
                    console.log({ calendarInfo: InfoCalendar });
                    const newSchedule = await axios.put(
                      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
                      { calendarInfo: InfoCalendar }
                    );
                    console.log(newSchedule);
                    if (newSchedule?.data?.success === false) {
                      if (
                        newSchedule?.data?.message ===
                        "Requested slot has been booked!"
                      ) {
                        Loading().close();
                        await Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Requested slot has been booked! Please try another slot.",
                        });
                      } else if (
                        newSchedule?.data?.message ===
                        "Calendar info not found!"
                      ) {
                        Loading().close();
                        await Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Calendar info not found! Please try again.",
                        });
                      } else {
                        Loading().close();
                        await Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Something went wrong! Please try again.",
                        });
                      }
                    } else {
                      const response = await axios.post(
                        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events`,
                        event
                      );

                      if (response?.data?.acknowledged) {
                        const sendMail = await axios.post(
                          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                          {
                            //  from: `${userInfo?.email}`,
                            //    to: `${user?.email},${adminMail}`,
                            to: `${user?.email}`,
                            templateType: "emailAction",
                            templateName: "sheduleTaskStudent",
                            organizationId: userInfo?.organizationId,
                            learner_name: userInfo?.name,
                            schedule_name: taskData?.taskName,
                            start_time: eventStartTime,
                            end_time: eventEndTime,
                            // meeting_link: event?.hangoutLink,
                            meeting_link: `${window.location.origin}/taskDetails/${taskData?._id}?taskType=Schedule`,
                            admin_name: adminName,
                            site_email: adminMail,
                            meeting_date: date,
                            /*  subject: `Event request`,
                            message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                              }`, */
                          }
                        );
                        const sendMailAdmin = await axios.post(
                          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                          {
                            //  from: `${userInfo?.email}`,
                            //    to: `${user?.email},${adminMail}`,
                            to: `${adminMail}`,
                            templateType: "emailAction",
                            templateName: "sheduleTask",
                            organizationId: userInfo?.organizationId,
                            start_time: eventStartTime,
                            end_time: eventEndTime,
                            meeting_link: event?.hangoutLink,
                            learner_name: stdName ? stdName : userInfo?.name,
                            learner_email: requesterStd
                              ? requesterStd
                              : user?.email,
                            meeting_date: date,
                            /*  subject: `Event request`,
                            message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                              }`, */
                          }
                        );

                        const newNotification = await axios.post(
                          `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
                          {
                            message: `${userInfo?.name} of ${batch[0]?.batchName} batch ${course?.courseFullName} course booked an event of schedule task ${taskData?.taskName}.`,
                            dateTime: new Date(),
                            recipient: {
                              type: "Admins",
                              organizationId: userInfo?.organizationId,
                            },
                            type: "Event",
                            readBy: [],
                            triggeredBy: user?.email,
                            redirectLink: `/taskDetails/${taskData?._id}?taskType=Schedule`,
                          }
                        );
                        console.log(newNotification);
                        console.log("send ", sendMail);
                        console.log("Admin Mail ", adminMail);
                        if (
                          sendMail?.data?.success &&
                          sendMailAdmin?.data?.success
                        ) {
                          const newEvent = await axios.post(
                            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/${taskData?._id}/addEvent`,
                            { ...event, eventDBid: response?.data?.insertedId }
                          );
                          const calendarInfo = { ...adminCalendarInfo };
                          calendarInfo.events = [
                            ...relevantEvents,
                            { ...event, eventDBid: response?.data?.insertedId },
                          ];
                          Loading().close();
                          await Swal.fire({
                            icon: "success",
                            title: "Request Sent!",
                            text: "Your meeting is confirmed. Please go to the Dashboard to access the meeting link",
                          });

                          navigate("/courseAccess");
                        }
                      }
                    }
                  };
                  gapi.client
                    .request({
                      path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?conferenceDataVersion=1&sendUpdates=none`,
                      method: "POST",
                      body: event,
                      headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${newAccessToken}`,
                      },
                    })
                    .then(
                      (response) => {
                        console.log(response);
                        var event = {
                          title: `${stdName ? stdName : userInfo?.name
                            } ${calendarSubjectName}`,
                          start: {
                            dateTime: selectedTimeDatee,
                            timeZone: "UTC",
                          },
                          end: {
                            dateTime: endDateTimeUTC,
                            timeZone: "UTC",
                          },
                          organization: {
                            organizationId: userInfo?.organizationId,
                            organizationName: userInfo?.organizationName,
                          },
                          attendees: [
                            // { email: "naman.j@experimentlabs.in" },
                            // { email: "gaurav@experimentlabs.in" },
                            {
                              email: requesterStd ? requesterStd : user?.email,
                            },
                            // { email: "alrafi4@gmail.com" },
                            {
                              email: adminMail,
                            },
                          ],
                          weekData: currentWeek,
                          hangoutLink: response?.result?.hangoutLink,
                          requester: requesterStd ? requesterStd : user?.email,
                          studentName: stdName ? stdName : userInfo?.name,
                          eventId: response?.result?.id,
                          scheduleId: taskId,
                          courseName: course?.courseFullName,
                          batchName: batchName,
                          executionMentors: userInfo?.executionMentors
                            ? userInfo?.executionMentors
                            : executionMentors,
                        };
                        sendData(event);
                        return [true, response];
                      },
                      function (err) {
                        console.log(err);
                        return [false, err];
                      }
                    );
                }
                gapi.load("client", initiate);
              }
              // navigate(-1)
            })
            .catch((error) => {
              Loading().close();
              console.error("Token refresh error:", error);
            });
        } else if (meetingType === "Zoom") {
          try {
            const tokenResponse = await fetch(
              "https://oauth2.googleapis.com/token",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${process.env.REACT_APP_google_clientId}&client_secret=${process.env.REACT_APP_google_clientSecret}`,
              }
            );

            const tokenData = await tokenResponse.json();
            const newAccessToken = tokenData.access_token;
            if (isReschedule && eventDBid && zoomMeetingId) {
              try {
                console.log("My idddddddd", zoomMeetingId)
                // console.log(`http://localhost:5000/api/v1/events/deleteMeeting/organizationId/${userInfo?.organizationId}`);
                const ReinputDateTime = new Date(`${selectedDate}T${time}`);
                // Manual formatting to "yyyy-MM-ddTHH:mm:ss"
                const ReformattedDateTime =
                  [
                    ReinputDateTime.getFullYear(),
                    ("0" + (ReinputDateTime.getMonth() + 1)).slice(-2),
                    ("0" + ReinputDateTime.getDate()).slice(-2),
                  ].join("-") +
                  "T" +
                  [
                    ("0" + ReinputDateTime.getHours()).slice(-2),
                    ("0" + ReinputDateTime.getMinutes()).slice(-2),
                    ("0" + ReinputDateTime.getSeconds()).slice(-2),
                  ].join(":");
                console.log(
                  "Formatted for Zoom (local time):",
                  ReformattedDateTime
                );
                let localDate = new Date(ReformattedDateTime);

                // Add 30 minutes to the localDate
                localDate.setMinutes(localDate.getMinutes());

                // Convert the updated local date to UTC string without milliseconds
                const ReformattedDateTimeUTC = localDate.toISOString().split('.')[0] + 'Z';

                console.log("Formatted for Zoom UTC:", ReformattedDateTimeUTC);
                const matchObject = {
                  start_time: ReformattedDateTimeUTC,
                  requester: user?.email,
                  scheduleId: taskId,
                }
                const emailobject = {
                  email: adminCalendarInfo?.email,
                  event: matchObject,
                }
                logToDatabase("Initiating reschedule check", { emailobject });
                Loading();
                const checkScheduleCalendar = await axios.post(
                  `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/matchEvents`, emailobject, { timeout: 10000 }
                )
                logToDatabase("Received reschedule calendar response", checkScheduleCalendar.data);
                console.log(checkScheduleCalendar?.data?.message);
                if (checkScheduleCalendar?.data?.message === "You can request") {
                  logToDatabase("Proceeding with you can request in reschedule", { matchObject });
                  const deleteZoomMeetingResponse = await axios.delete(
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/deleteMeeting/organizationId/${userInfo?.organizationId}/meetingId/${zoomMeetingId}`,// Pass the meetingId in the data property
                  );
                  console.log("zoom delete meeting response: ", deleteZoomMeetingResponse);
                  if (deleteZoomMeetingResponse?.data?.success) {
                    const inputDateTime = new Date(`${selectedDate}T${time}`);
                    // Manual formatting to "yyyy-MM-ddTHH:mm:ss"
                    const formattedDateTime =
                      [
                        inputDateTime.getFullYear(),
                        ("0" + (inputDateTime.getMonth() + 1)).slice(-2),
                        ("0" + inputDateTime.getDate()).slice(-2),
                      ].join("-") +
                      "T" +
                      [
                        ("0" + inputDateTime.getHours()).slice(-2),
                        ("0" + inputDateTime.getMinutes()).slice(-2),
                        ("0" + inputDateTime.getSeconds()).slice(-2),
                      ].join(":");
                    console.log(
                      "Formatted for Zoom (local time):",
                      formattedDateTime
                    );
                    const zoomSchedule = {
                      start_time: formattedDateTime,
                      duration: meetingLength,
                      studentName: stdName ? stdName : userInfo?.name,
                      courseName: taskData?.courseName,
                    };
                    console.log(zoomSchedule);
                    logToDatabase("Proceeding with Zoom reschedule creation", { zoomSchedule });
                    const newZoomSchedule = await axios.post(
                      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/meeting/organizationId/${userInfo?.organizationId}`,
                      zoomSchedule, { timeout: 10000 }
                    );
                    const { settings, ...filteredZoomData } = newZoomSchedule.data;
                    logToDatabase("Zoom reschedule created successfully", filteredZoomData);
                    Loading();
                    if (newZoomSchedule?.data?.uuid || newZoomSchedule.data?.start_time) {
                      console.log("zoom schedule ", newZoomSchedule?.data);
                      const { id, topic, start_time, created_at, join_url, start_url } = newZoomSchedule?.data;
                      const utcTimeStr = newZoomSchedule?.data?.start_time;
                      const timezoneStr = newZoomSchedule?.data?.timezone;
                      const meetingLength = newZoomSchedule?.data?.duration; // Assuming this is in minutes
                      const adminUrl = newZoomSchedule?.data?.start_url;
                      const studentUrl = newZoomSchedule?.data?.join_url;
                      const startDate = new Date(utcTimeStr);

                      // Convert start date to local time in the specified timezone
                      const options = {
                        timeZone: timezoneStr,
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      };
                      const meetingStart = startDate.toLocaleString(
                        undefined,
                        options
                      );

                      // Calculate end date by adding the duration to the start date
                      const endDate = new Date(
                        startDate.getTime() + meetingLength * 60000
                      ); // 60000 ms in a minute

                      // Convert end date to local time in the specified timezone
                      const meetingEnd = endDate.toLocaleString(undefined, options);
                      console.log("meeting start date: ", meetingStart);
                      console.log("meeting end date: ", meetingEnd);
                      const format = "MM/DD/YYYY, hh:mm:ss A"; // This is the format based on your output
                      const meetingStartDate = moment(meetingStart, format).toDate(); // Use moment.js to parse the string
                      const meetingEndDate = moment(meetingEnd, format).toDate();
                      const formattedDate = moment(
                        meetingStart,
                        "MM/DD/YYYY, hh:mm:ss A"
                      ).format("DD-MM-YYYY");
                      const formattedStartTime = moment(
                        meetingStart,
                        "MM/DD/YYYY, hh:mm:ss A"
                      ).format("hh:mm:ss A");
                      const formattedEndTime = moment(
                        meetingEnd,
                        "MM/DD/YYYY, hh:mm:ss A"
                      ).format("hh:mm:ss A");
                      console.log("formatted datetime ", formattedDate);
                      console.log(formattedEndTime);
                      try {
                        const newpostData = {
                          id: newZoomSchedule?.data?.id,
                          host_email: newZoomSchedule?.data?.host_email,
                          start_time: newZoomSchedule?.data?.start_time,
                          duration: newZoomSchedule?.data?.duration,
                          join_url: studentUrl,
                          start_url: adminUrl,
                          topic: `Session with ${stdName ? stdName : userInfo?.name
                            } on ${course?.courseFullName}`,
                          summary: `${stdName ? stdName : userInfo?.name
                            } ${calendarSubjectName}`,
                          requester: requesterStd ? requesterStd : user?.email,
                          studentName: stdName ? stdName : userInfo?.name,
                          organization: {
                            organizationId: userInfo?.organizationId,
                            organizationName: userInfo?.organizationName,
                          },
                          weekId: weeksId,
                          googleCalendarId: eventId,
                          meetingType: "Zoom",
                          scheduleId: taskId,
                          courseName: course?.courseFullName,
                          batchName: batchName,
                        };
                        const postingData = {
                          id, // Zoom meeting ID
                          topic, // Zoom meeting topic
                          start_time, // Zoom meeting start time
                          created_at, // When the Zoom meeting was created
                          join_url, // URL for participants to join
                          start_url, // URL for the host to start the meeting
                          summary: `${stdName ? stdName : userInfo?.name} ${calendarSubjectName}`,
                          requester: requesterStd ? requesterStd : user?.email,
                          studentName: stdName ? stdName : userInfo?.name,
                          organization: {
                            organizationId: userInfo?.organizationId,
                            organizationName: userInfo?.organizationName,
                          },
                          meetingType: "Zoom",
                          scheduleId: taskId,
                          courseName: course?.courseFullName,
                          weekId: weeksId,
                          batchName: batchName,
                          googleCalendarId: eventId,
                          executionMentors: userInfo?.executionMentors
                            ? userInfo?.executionMentors
                            : executionMentors,
                        };
                        const InfoCalendar = {
                          email: adminCalendarInfo?.email,
                          event: postingData,
                        };
                        console.log({ calendarInfo: InfoCalendar });
                        const newSchedule = await axios.put(
                          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
                          { calendarInfo: InfoCalendar }, { timeout: 10000 }
                        );
                        console.log(newSchedule);
                        logToDatabase("Data in calendarInfo collection successfully in reschedule", { newSchedule});

                        if (newSchedule?.data?.success === true) {
                          const updateResponse = await axios.put(
                            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/${eventDBid}`,
                            newpostData, { timeout: 10000 }
                          );
                          logToDatabase("Reschedule data in event collection successfully", { updateResponse});
                          console.log("res ", updateResponse);
                          console.log("taskname ", taskData?.taskName);
                          if (updateResponse?.data?.acknowledged) {
                            const sendMail = await axios.post(
                              `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                              {
                                //  from: `${userInfo?.email}`,
                                //    to: `${user?.email},${adminMail}`,
                                to: `${requesterStd ? requesterStd : user?.email}`,
                                templateType: "emailAction",
                                templateName: "resheduleTaskStudent",
                                organizationId: userInfo?.organizationId,
                                schedule_name: taskData?.scheduleName || taskData?.taskName,
                                start_time: formattedStartTime,
                                end_time: formattedEndTime,
                                learner_name: userInfo?.name,
                                // meeting_link: studentUrl,
                                meeting_link: `${window.location.origin}/taskDetails/${taskData?._id}?taskType=Schedule`,
                                admin_name: adminName,
                                site_email: adminMail,
                                meeting_date: formattedDate,
                                /*  subject: `Event request`,
                                message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                                  }`, */
                              }
                            );
                            const sendMailAdmin = await axios.post(
                              `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                              {
                                //  from: `${userInfo?.email}`,
                                //    to: `${user?.email},${adminMail}`,
                                to: `${adminMail}`,
                                templateType: "emailAction",
                                templateName: "resheduleTask",
                                schedule_name: taskData?.scheduleName || taskData?.taskName,
                                organizationId: userInfo?.organizationId,
                                start_time: formattedStartTime,
                                end_time: formattedEndTime,
                                meeting_link: adminUrl,
                                learner_name: stdName ? stdName : userInfo?.name,
                                learner_email: requesterStd
                                  ? requesterStd
                                  : user?.email,
                                meeting_date: formattedDate,
                                /*  subject: `Event request`,
                                message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                                  }`, */
                              }
                            );

                            if (userInfo?.role === "admin") {
                              const newNotification = await axios.post(
                                `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
                                {
                                  message: `${userInfo?.name} rescheduled an event of schedule task "${taskData?.taskName}" in course ${course?.courseFullName}`,
                                  dateTime: new Date(),
                                  recipient: {
                                    type: "Specific Student",
                                    recipientEmail: requesterStd,
                                    organizationId: userInfo?.organizationId,
                                  },
                                  type: "Event",
                                  readBy: [],
                                  triggeredBy: user?.email,
                                  redirectLink: `/taskDetails/${taskData?._id}?taskType=Schedule`,
                                }
                              );
                              console.log(newNotification);
                            } else {
                              const newNotification = await axios.post(
                                `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
                                {
                                  message: `${userInfo?.name} of ${batch[0]?.batchName} batch ${course?.courseFullName} course rescheduled an event of schedule task ${taskData?.taskName}.`,
                                  dateTime: new Date(),
                                  recipient: {
                                    type: "Admins",
                                    organizationId: userInfo?.organizationId,
                                  },
                                  type: "Event",
                                  readBy: [],
                                  triggeredBy: user?.email,
                                  redirectLink: `/taskDetails/${taskData?._id}?taskType=Schedule`,
                                }
                              );
                              console.log(newNotification);
                            }
                            console.log("send ", sendMail);
                            console.log("Admin Mail ", adminMail);
                            if (
                              sendMail?.data?.success &&
                              sendMailAdmin?.data?.success
                            ) {
                              const updatedEvent = {
                                summary: `${stdName ? stdName : userInfo?.name
                                  } ${calendarSubjectName}`,
                                description: `Join Zoom Meeting: ${window.location.origin}/taskDetails/${taskData?._id}?taskType=Schedule`,
                                location: "", // Zoom meeting link as location
                                start: {
                                  dateTime: meetingStartDate.toISOString(), // Convert to ISO string for Google Calendar
                                  timeZone: "Asia/Kolkata", // Explicitly setting time zone
                                },
                                end: {
                                  dateTime: meetingEndDate.toISOString(), // Calculate end time based on duration
                                  timeZone: "Asia/Kolkata", // Explicitly setting time zone
                                },
                                attendees: [
                                  {
                                    email: requesterStd ? requesterStd : user?.email,
                                  }, // User's email
                                  { email: adminMail }, // Admin's email
                                ],
                                reminders: {
                                  useDefault: true,
                                },
                              };
                              fetch(
                                `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${eventId}?sendUpdates=none`,
                                {
                                  method: "PATCH", // Method to update the event
                                  headers: {
                                    Authorization: `Bearer ${newAccessToken}`,
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify(updatedEvent),
                                }
                              )
                                .then((response) => response.json()) // Convert the response to JSON
                                .then(async (data) => {
                                  console.log("Event updated:", data);

                                  // Other UI updates or state resets after successful rescheduling
                                })
                                .catch((error) => {
                                  console.error("Error updating event:", error);
                                  // Handle error
                                });
                              console.log({
                                ...postingData,
                                eventDBid: eventDBid,
                              });
                              const newRescheduleEvent = await axios.put(
                                `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/${taskId}/updateEvent`,
                                { ...postingData, eventDBid: eventDBid }, { timeout: 10000 }
                              );

                              console.log(newRescheduleEvent);
                              logToDatabase("Reschedule in schedule collection successfully", { newRescheduleEvent});
                              // const newSchedule = await axios.post(
                              //   `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/updateOrInsertCalendarInfo/email/${calendarInfo?.email}`,
                              //   calendarInfo
                              // );
                              // const InfoCalendar = { email: calendarInfo?.email, event: postData };
                              // console.log(InfoCalendar);
                              // const newSchedule = await axios.put(
                              //   `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
                              //   { calendarInfo: InfoCalendar }
                              // );
                              // console.log(newSchedule);
                              if (newRescheduleEvent?.status === 200) {
                                Loading().close();
                                // console.log("new event created ", newEvent);
                                await Swal.fire({
                                  icon: "success",
                                  title: "Request Sent!",
                                  text: "Your meeting is rescheduled. Please check your email to access the zoom link",
                                });

                                navigate("/courseAccess");
                              }
                              else {
                                logToDatabase("Error in putting data in schedule collection in reschedule", zoomSchedule);
                                Loading().close();
                              }
                              Loading().close();
                            }
                            else {
                              logToDatabase("Error in sending mail", zoomSchedule);
                              Loading().close();
                            }
                          } else {
                            logToDatabase("Error in putting data in event collection in reschedule ", matchObject);
                            Loading().close();
                          }
                        }
                        else {
                          logToDatabase("Error in putting data in calendarInfo collection in reschedule", matchObject);
                          Loading().close();
                        }
                      } catch (error) {
                        console.error("An error occurred:", error);
                        console.log(error?.response?.data?.message);
                        if (
                          error?.response?.data?.message ===
                          "Requested slot has been booked!"
                        ) {
                          Loading().close();
                          await Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Requested slot has been booked! Please try another slot.",
                          });
                        } else if (
                          error?.response?.data?.message ===
                          "Calendar info not found!"
                        ) {
                          Loading().close();
                          await Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Calendar info not found! Please try again.",
                          });
                        } else {
                          Loading().close();
                          await Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong! Please try again.",
                          });
                        }
                      }
                    }
                    // if(newZoomSchedule?.data?.acknowledged){
                    //   await Swal.fire({
                    //     icon: "success",
                    //     title: "Request Sent!",
                    //     html: "Your zoom request is sent.<br><br>Please wait for admin to approve it.",
                    //   });
                    //   navigate('/courseAccess');
                    // }
                    // console.log(newZoomSchedule);
                    Loading().close();
                  }
                  else {
                    logToDatabase("Failed to delete the existing Zoom meeting.", { matchObject });
                    Loading().close();
                    console.error("Failed to delete the existing Zoom meeting.");
                  }
                }
                else if (checkScheduleCalendar?.data?.message === "Requested slot has been booked!") {
                  logToDatabase("Schedule calendar check failed no slot in reschedule", checkScheduleCalendar.data);
                  Loading().close();
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Requested slot has been booked! Please try another slot.",
                  });
                }
                else if (checkScheduleCalendar?.data?.message === "Calendar info not found!") {
                  logToDatabase("Schedule calendar check failed no calendar info in reschedule", checkScheduleCalendar.data);
                  Loading().close();
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Calendar info not found!",
                  });
                }
              }
              catch (error) {
                Loading().close();
                console.error("Error deleting Zoom meeting:", error);
                console.log(error);
              }
            }
            else {
              try {
                const inputDateTime = new Date(`${selectedDate}T${time}`);
                // Manual formatting to "yyyy-MM-ddTHH:mm:ss"
                const formattedDateTime =
                  [
                    inputDateTime.getFullYear(),
                    ("0" + (inputDateTime.getMonth() + 1)).slice(-2),
                    ("0" + inputDateTime.getDate()).slice(-2),
                  ].join("-") +
                  "T" +
                  [
                    ("0" + inputDateTime.getHours()).slice(-2),
                    ("0" + inputDateTime.getMinutes()).slice(-2),
                    ("0" + inputDateTime.getSeconds()).slice(-2),
                  ].join(":");
                console.log(
                  "Formatted for Zoom (local time):",
                  formattedDateTime
                );
                const zoomSchedule = {
                  start_time: formattedDateTime,
                  duration: meetingLength,
                  studentName: stdName ? stdName : userInfo?.name,
                  courseName: taskData?.courseName,
                };
                let localDate = new Date(formattedDateTime);

                // Add 30 minutes to the localDate
                localDate.setMinutes(localDate.getMinutes());

                // Convert the updated local date to UTC string without milliseconds
                const formattedDateTimeUTC = localDate.toISOString().split('.')[0] + 'Z';
                const inputformattedDateTimeUTC = inputDateTime.toISOString();
                console.log("Formatted for Zoom UTC:", formattedDateTimeUTC);
                const matchObject = {
                  start_time: formattedDateTimeUTC,
                  requester: user?.email,
                  scheduleId: taskId,
                }
                const emailobject = {
                  email: adminCalendarInfo?.email,
                  event: matchObject,
                }
                logToDatabase("Initiating schedule check", { emailobject });
                Loading();
                const checkScheduleCalendar = await axios.post(
                  `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/matchEvents`, emailobject, { timeout: 10000 }
                )
                logToDatabase("Received schedule calendar response", checkScheduleCalendar.data);
                console.log(checkScheduleCalendar?.data?.message);
                if (checkScheduleCalendar?.data?.message === "You can request") {
                  Loading()
                  logToDatabase("Proceeding with Zoom schedule creation", { zoomSchedule });
                  const newZoomSchedule = await axios.post(
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/meeting/organizationId/${userInfo?.organizationId}`,
                    zoomSchedule, { timeout: 10000 }
                  );
                  const { settings, ...filteredZoomData } = newZoomSchedule.data;
                  logToDatabase("Zoom schedule created successfully", filteredZoomData);
                  if (newZoomSchedule?.data?.uuid || newZoomSchedule?.data?.start_time) {
                    console.log("zoom schedule ", newZoomSchedule?.data);
                    const { id, topic, start_time, created_at, join_url, start_url } = newZoomSchedule?.data;
                    const utcTimeStr = newZoomSchedule?.data?.start_time;
                    const timezoneStr = newZoomSchedule?.data?.timezone;
                    const meetingLength = newZoomSchedule?.data?.duration; // Assuming this is in minutes
                    const adminUrl = newZoomSchedule?.data?.start_url;
                    const studentUrl = newZoomSchedule?.data?.join_url;
                    const startDate = new Date(utcTimeStr);

                    // Convert start date to local time in the specified timezone
                    const options = {
                      timeZone: timezoneStr,
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    };
                    const meetingStart = startDate.toLocaleString(
                      undefined,
                      options
                    );

                    // Calculate end date by adding the duration to the start date
                    const endDate = new Date(
                      startDate.getTime() + meetingLength * 60000
                    ); // 60000 ms in a minute

                    // Convert end date to local time in the specified timezone
                    const meetingEnd = endDate.toLocaleString(undefined, options);
                    console.log("meeting start date: ", meetingStart);
                    console.log("meeting end date: ", meetingEnd);
                    const format = "MM/DD/YYYY, hh:mm:ss A"; // This is the format based on your output
                    const meetingStartDate = moment(
                      meetingStart,
                      format
                    ).toDate(); // Use moment.js to parse the string
                    const meetingEndDate = moment(meetingEnd, format).toDate();
                    const formattedDate = moment(
                      meetingStart,
                      "MM/DD/YYYY, hh:mm:ss A"
                    ).format("DD-MM-YYYY");
                    const formattedStartTime = moment(
                      meetingStart,
                      "MM/DD/YYYY, hh:mm:ss A"
                    ).format("hh:mm:ss A");
                    const formattedEndTime = moment(
                      meetingEnd,
                      "MM/DD/YYYY, hh:mm:ss A"
                    ).format("hh:mm:ss A");
                    console.log("formattedDate ", formattedDate);
                    console.log(formattedEndTime);
                    try {
                      async function initiate() {
                        Loading();
                        const postingData = {
                          id, // Zoom meeting ID
                          topic, // Zoom meeting topic
                          start_time, // Zoom meeting start time
                          created_at, // When the Zoom meeting was created
                          join_url, // URL for participants to join
                          start_url, // URL for the host to start the meeting
                          summary: `${userInfo?.name} ${calendarSubjectName}`,
                          requester: user?.email,
                          studentName: userInfo?.name,
                          organization: {
                            organizationId: userInfo?.organizationId,
                            organizationName: userInfo?.organizationName,
                          },
                          meetingType: "Zoom",
                          scheduleId: taskId,
                          courseName: course?.courseFullName,
                          weekId: weeksId,
                          batchName: batchName,
                          executionMentors: userInfo?.executionMentors
                            ? userInfo?.executionMentors
                            : executionMentors,
                        };
                        const InfoCalendar = {
                          email: adminCalendarInfo?.email,
                          event: postingData,
                        };
                        console.log({ calendarInfo: InfoCalendar });
                        const newSchedule = await axios.put(
                          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
                          { calendarInfo: InfoCalendar },
                          { timeout: 10000 }
                        );
                        console.log("info ", newSchedule);
                        logToDatabase("Data in calendarInfo collection successfully", { newSchedule});
                        // Step 1: Prepare Google Calendar event data
                        const event = {
                          summary: `${userInfo?.name} ${calendarSubjectName}`,
                          description: `Join Zoom Meeting: ${window.location.origin}/taskDetails/${taskData?._id}?taskType=Schedule`,
                          location: "",
                          start: {
                            dateTime: meetingStartDate.toISOString(),
                            timeZone: "Asia/Kolkata",
                          },
                          end: {
                            dateTime: meetingEndDate.toISOString(),
                            timeZone: "Asia/Kolkata",
                          },
                          attendees: [
                            { email: user?.email },
                            { email: adminMail },
                          ],
                          reminders: {
                            useDefault: true,
                          },
                        };

                        try {
                          // Step 2: Create Google Calendar event
                          if (newSchedule?.data?.success === true) {
                            logToDatabase("Successfully inside the google calendar creation ", { matchObject });
                            Loading();
                            const response = await gapi.client.request({
                              path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?conferenceDataVersion=1&sendUpdates=none`,
                              method: "POST",
                              body: JSON.stringify(event),
                              headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${newAccessToken}`,
                              },
                            });
                            console.log(
                              "Google Calendar event created successfully:",
                              response
                            );
                            const calendarEventId = response.result.id;
                            if (calendarEventId) {
                              logToDatabase("Added data in google calendar successfully", { matchObject });
                              const newpostData = {
                                id: newZoomSchedule?.data?.id,
                                host_email: newZoomSchedule?.data?.host_email,
                                start_time: newZoomSchedule?.data?.start_time,
                                duration: newZoomSchedule?.data?.duration,
                                join_url: studentUrl,
                                start_url: adminUrl,
                                topic: `Session with ${userInfo?.name} on ${course?.courseFullName}`,
                                summary: `${userInfo?.name} ${calendarSubjectName}`,
                                requester: user?.email,
                                studentName: userInfo?.name,
                                organization: {
                                  organizationId: userInfo?.organizationId,
                                  organizationName: userInfo?.organizationName,
                                },
                                weekId: weeksId,
                                googleCalendarId: calendarEventId,
                                meetingType: "Zoom",
                                scheduleId: taskId,
                                courseName: course?.courseFullName,
                                batchName: batchName,
                                executionMentors: userInfo?.executionMentors
                                  ? userInfo?.executionMentors
                                  : executionMentors,
                              };

                              const response = await axios.post(
                                // `${process.env.REACT_APP_BACKEND_API}/events`,
                                `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events`,
                                newpostData, { timeout: 10000 }
                              );
                              console.log("event response ", response);

                              // calendarInfo.events = [
                              //   ...relevantEvents,
                              //   {
                              //     ...postData,
                              //     eventDBid: response?.data?.insertedId,
                              //     eventId: responseData.result.id,
                              //   },
                              // ];
                              if (response?.data?.acknowledged) {
                                logToDatabase("Added data in event collection successfully", { matchObject });
                                const postData = {
                                  id, // Zoom meeting ID
                                  topic, // Zoom meeting topic
                                  start_time, // Zoom meeting start time
                                  created_at, // When the Zoom meeting was created
                                  join_url, // URL for participants to join
                                  start_url, // URL for the host to start the meeting
                                  summary: `${userInfo?.name} ${calendarSubjectName}`,
                                  requester: user?.email,
                                  studentName: userInfo?.name,
                                  organization: {
                                    organizationId: userInfo?.organizationId,
                                    organizationName:
                                      userInfo?.organizationName,
                                  },
                                  meetingType: "Zoom",
                                  scheduleId: taskId,
                                  courseName: course?.courseFullName,
                                  weekId: weeksId,
                                  batchName: batchName,
                                  googleCalendarId: calendarEventId,
                                  eventDBid: response?.data?.insertedId,
                                  executionMentors: userInfo?.executionMentors
                                    ? userInfo?.executionMentors
                                    : executionMentors,
                                };
                                // Step 4: Update database with Google Calendar event details
                                const newEvent = await axios.post(
                                  `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/${taskData?._id}/addEvent`,
                                  postData, { timeout: 10000 }
                                );
                                console.log("new event ", newEvent);
                                if (newEvent?.data?.acknowledged) {
                                  logToDatabase("Added data in schedule collection successfully", { matchObject });
                                  const sendMail = await axios.post(
                                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                                    {
                                      //  from: `${userInfo?.email}`,
                                      //    to: `${user?.email},${adminMail}`,
                                      to: `${user?.email}`,
                                      templateType: "emailAction",
                                      templateName: "sheduleTaskStudent",
                                      organizationId: userInfo?.organizationId,
                                      schedule_name: taskData?.scheduleName || taskData?.taskName,
                                      start_time: formattedStartTime,
                                      learner_name: userInfo?.name,
                                      end_time: formattedEndTime,
                                      // meeting_link: studentUrl,
                                      meeting_link: `${window.location.origin}/taskDetails/${taskData?._id}?taskType=Schedule`,
                                      admin_name: adminName,
                                      site_email: adminMail,
                                      meeting_date: formattedDate,
                                      /*  subject: `Event request`,
                                      message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                                        }`, */
                                    }
                                  );
                                  console.log(sendMail);
                                  const sendMailAdmin = await axios.post(
                                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                                    {
                                      //  from: `${userInfo?.email}`,
                                      //    to: `${user?.email},${adminMail}`,
                                      to: `${adminMail}`,
                                      templateType: "emailAction",
                                      templateName: "sheduleTask",
                                      schedule_name: taskData?.scheduleName || taskData?.taskName,
                                      organizationId: userInfo?.organizationId,
                                      start_time: formattedStartTime,
                                      end_time: formattedEndTime,
                                      meeting_link: adminUrl,
                                      learner_name: userInfo?.name,
                                      learner_email: user?.email,
                                      meeting_date: formattedDate,
                                      /*  subject: `Event request`,
                                      message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                                        }`, */
                                    }
                                  );
                                  console.log(sendMailAdmin);

                                  const newNotification = await axios.post(
                                    `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
                                    {
                                      message: `${userInfo?.name} of ${batch[0]?.batchName} batch ${course?.courseFullName} course booked an event of schedule task ${taskData?.taskName}.`,
                                      dateTime: new Date(),
                                      recipient: {
                                        type: "Admins",
                                        organizationId:
                                          userInfo?.organizationId,
                                      },
                                      type: "Event",
                                      readBy: [],
                                      triggeredBy: user?.email,
                                      redirectLink: `/taskDetails/${taskData?._id}?taskType=Schedule`,
                                    }
                                  );

                                  if (
                                    sendMail?.data?.success &&
                                    sendMailAdmin?.data?.success
                                  ) {
                                    Loading().close();
                                    await Swal.fire({
                                      icon: "success",
                                      title: "Request Sent!",
                                      text: "Your meeting is confirmed. Please check your email to access the Zoom link",
                                    });
                                    navigate("/courseAccess");
                                  }
                                  Loading().close();
                                  // Navigate or display confirmation as needed
                                }
                                else {
                                  logToDatabase("Error in putting data in schedule collection ", matchObject);
                                  Loading().close();
                                }
                                Loading().close();
                              }
                              else {
                                logToDatabase("Error in putting data in event collection ", matchObject);
                                Loading().close();
                              }
                            }
                            else {
                              logToDatabase("Error in google Calendar", matchObject);
                              Loading().close();
                            }
                          }
                          else {
                            logToDatabase("Error in putting data in calendarInfo collection", matchObject);
                            Loading().close();
                          }
                        } catch (error) {
                          logToDatabase("Error while processing calendarInfo update", { error: error.message, InfoCalendar });
                          console.error("An error occurred:", error);
                          console.log(error?.response?.data?.message);
                          if (
                            error?.response?.data?.message ===
                            "Requested slot has been booked!"
                          ) {
                            Loading().close();
                            await Swal.fire({
                              icon: "error",
                              title: "Oops...",
                              text: "Requested slot has been booked! Please try another slot.",
                            });
                          } else if (
                            error?.response?.data?.message ===
                            "Calendar info not found!"
                          ) {
                            Loading().close();
                            await Swal.fire({
                              icon: "error",
                              title: "Oops...",
                              text: "Calendar info not found! Please try again.",
                            });
                          } else {
                            Loading().close();
                            await Swal.fire({
                              icon: "error",
                              title: "Oops...",
                              text: "Something went wrong! Please try again.",
                            });
                          }
                        }
                      }
                      // Load the Google API and initiate the scheduling function
                      gapi.load("client", initiate);
                    } catch (error) {
                      console.error("An error occurred:", error);
                      console.log(error?.response?.data?.message);
                      if (
                        error?.response?.data?.message ===
                        "Requested slot has been booked!"
                      ) {
                        Loading().close();
                        await Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Requested slot has been booked! Please try another slot.",
                        });
                      } else if (
                        error?.response?.data?.message ===
                        "Calendar info not found!"
                      ) {
                        Loading().close();
                        await Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Calendar info not found! Please try again.",
                        });
                      } else {
                        Loading().close();
                        await Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Something went wrong! Please try again.",
                        });
                      }
                    }
                  }
                }
                else if (checkScheduleCalendar?.data?.message === "Requested slot has been booked!") {
                  logToDatabase("Schedule calendar check failed no slot", checkScheduleCalendar.data);
                  Loading().close();
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Requested slot has been booked! Please try another slot.",
                  });
                }
                else if (checkScheduleCalendar?.data?.message === "Calendar info not found!") {
                  logToDatabase("Schedule calendar check failed no calendar info", checkScheduleCalendar.data);
                  Loading().close();
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Calendar info not found!",
                  });
                }
                Loading().close();
              } catch (error) {
                console.error("An error occurred:", error);
                console.log(error?.response?.data?.message);
                if (
                  error?.response?.data?.message ===
                  "Requested slot has been booked!"
                ) {
                  Loading().close();
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Requested slot has been booked! Please try another slot.",
                  });
                } else if (
                  error?.response?.data?.message === "Calendar info not found!"
                ) {
                  Loading().close();
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Calendar info not found! Please try again.",
                  });
                } else {
                  Loading().close();
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Please try again.",
                  });
                }
              }
            }
          } catch (error) {
            Loading().close();
            console.error(
              "Error processing Zoom or Calendar integration: ",
              error
            );
            // Handle errors appropriately in your UI
          }
        }
      } else {
        Loading().close();
        Swal.fire({
          icon: "error",
          title: "Invalid Date and time!",
          text: "Please enter valid date & time for event!",
        });
      }
    }
  };
  const formatTimeForZoom = (event, type) => {
    const utcTimeStr = event?.start_time;
    const timezoneStr = event?.timezone;
    const meetingLength = event?.duration; // Assuming this is in minutes
    const startDate = new Date(utcTimeStr);
    const meetingStartTime = new Date(utcTimeStr);
    const currentDateTime = new Date();
    const meetingEndTime = new Date(
      meetingStartTime.getTime() + meetingLength * 60000
    );

    // Convert start date to local time in the specified timezone
    const options = {
      timeZone: timezoneStr,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const meetingStart = startDate.toLocaleString(undefined, options);
    console.log(meetingStart);
    // Calculate end date by adding the duration to the start date
    const endDate = new Date(startDate.getTime() + meetingLength * 60000); // 60000 ms in a minute

    // Convert end date to local time in the specified timezone
    const meetingEnd = endDate.toLocaleString(undefined, options);
    if (currentDateTime > meetingEndTime && type === "start") {
      return "The meeting has already happened.";
    } else if (currentDateTime < meetingEndTime && type === "start") {
      return meetingStart;
    } else if (currentDateTime > meetingEndTime && type === "end") {
      return "";
    } else if (currentDateTime < meetingEndTime && type === "end") {
      return meetingEnd;
    }
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // const reqmail = taskData?.events?.some(
  //   (event) => console.log(event)
  // );
  console.log(taskData);
  const isUserRequester = adminCalendarInfo?.events?.some(
    (event) => event.requester === user?.email
  );
  console.log("is there my event", isUserRequester);
  const formatTime = (dateTime) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Set to false if you want 24-hour format
    };

    return dateTime.toLocaleTimeString("en-US", options);
  };
  function isWithinSixtyMinutes(startTime) {
    const now = new Date();
    console.log("time now ", now);
    const start = new Date(startTime);
    console.log("start time ", start);
    const diffInMs = start - now;
    const diffInMinutes = diffInMs / (1000 * 60);
    return diffInMinutes <= 60;
  }
  const generateTimeOptions = () => {
    const options = [];
    const minTime = taskData?.minimumTime;
    const maxTime = taskData?.maximumTime;

    if (minTime && maxTime) {
      let currentTime = new Date(`2000-01-01T${minTime}`);
      const endTime = new Date(`2000-01-01T${maxTime}`);

      while (currentTime <= endTime) {
        const timeString = currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        options.push(
          <option key={timeString} value={timeString}>
            {timeString}
          </option>
        );
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
    }

    return options;
  };
  const formatExpirationDate = (startDate) => {
    return moment(startDate).add(30, "days").format("DD-MM-YYYY"); // Changed to 'DD-MM-YYYY' format
  };

  console.log(matching, timeRangeError);
  console.log(eventId, eventDBid, requesterStd, stdName);
  return (
    <div className="grid justify-center my-5">
      {userInfo?.role === "admin" && zoomInfo?.length > 0 ? (
        <>
          <div className="overflow-x-auto mt-10 relative">
            {isLoading && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <CircularProgress />
              </div>
            )}
            <table
              className={`min-w-full leading-normal ${isLoading ? "opacity-50" : ""
                }`}
            >
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Student Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Recording Link
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Recording Expiration Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {zoomInfo?.map((info, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {info?.requester}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <a
                        href={info.recording_files[0]?.play_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click to see
                      </a>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {formatExpirationDate(info?.start_time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <>
            {userInfo?.role === "admin" &&
              taskData?.events?.length > 0 &&
              isReschedule === false ? (
              <>
                <div className="flex gap-5 my-5">
                  <p>
                    <span>From Date :</span>
                    <input
                      className="p-2 border rounded ms-2"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </p>
                  <p>
                    <span>To Date :</span>
                    <input
                      className="p-2 border rounded ms-2"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-items-center gap-10 items-center">
                  {/* <p>You are the requester in the following events:</p> */}
                  {filteredEvents.length > 0 ? (
                    filteredEvents
                      .slice() // Create a shallow copy to avoid mutating the original array
                      .reverse() // Reverse the array to map in the opposite direction
                      .map((event, index) =>
                        event?.requester ? (
                          <div
                            key={index}
                            className=" shadow-lg outline-double outline-offset-2 outline-2 outline-emerald-500  w-[320px] rounded p-2 "
                          >
                            <p className="flex gap-1 items-center text-sm">
                              <FiberManualRecordIcon
                                sx={{ color: red[400] }}
                              ></FiberManualRecordIcon>
                              Meeting with {event?.requester}
                            </p>
                            {event?.meetingType === "Zoom" ? (
                              <div className="flex items-center gap-2">
                                <div className="mt-3 mb-1 ">
                                  <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                                    <div className="flex justify-between gap-2">
                                      <AccessAlarmOutlinedIcon fontSize="small" />
                                      <span className="font-semibold text-[12px]">
                                        Starts{" "}
                                      </span>
                                    </div>
                                    <ul className="text-sm">
                                      <li key={index}>
                                        {formatTimeForZoom(
                                          event,
                                          event?.start_time ? "start" : ""
                                        )}
                                      </li>
                                    </ul>
                                  </p>
                                  <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                                    <div className="flex justify-between  gap-2">
                                      <AccessAlarmOutlinedIcon fontSize="small" />
                                      <span className="font-semibold text-[12px]">
                                        Ends{" "}
                                      </span>
                                    </div>
                                    <ul className="text-sm">
                                      <li key={index}>
                                        {formatTimeForZoom(
                                          event,
                                          event?.end_time ? "" : "end"
                                        )}
                                      </li>
                                    </ul>
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="mt-3 mb-1 ">
                                  <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                                    <div className="flex justify-between gap-2">
                                      <AccessAlarmOutlinedIcon fontSize="small" />
                                      <span className="font-semibold text-[12px]">
                                        Starts{" "}
                                      </span>
                                    </div>
                                    <ul className="text-sm">
                                      {formatUtcDateTimeStringToListItems(
                                        event?.start?.dateTime
                                      )?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  </p>
                                  <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                                    <div className="flex justify-between  gap-2">
                                      <AccessAlarmOutlinedIcon fontSize="small" />
                                      <span className="font-semibold text-[12px]">
                                        Ends{" "}
                                      </span>
                                    </div>
                                    <ul className="text-sm">
                                      {formatUtcDateTimeStringToListItems(
                                        event?.end?.dateTime
                                      )?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="grid gap-2 align-middle items-center">
                              <div className="w-10/12 mx-auto mt-3 text-white bg-sky-500  rounded-md">
                                <Link
                                  to={
                                    event?.meetingType === "Zoom"
                                      ? userInfo?.role === "admin"
                                        ? event?.start_url
                                        : event?.join_url
                                      : event?.hangoutLink
                                  }
                                  className="flex gap-2 items-center justify-center py-[6px]"
                                >
                                  <img
                                    src={
                                      event?.meetingType === "Zoom"
                                        ? zoom
                                        : googlemeet
                                    }
                                    className="w-[21px] h-[21px]"
                                    alt="googlemeet or zoom"
                                  ></img>
                                  <p>
                                    Go to{" "}
                                    {event?.meetingType === "Zoom"
                                      ? "zoom"
                                      : "meet"}{" "}
                                    Link
                                  </p>
                                </Link>
                              </div>
                              {event?.meetingType !== "Zoom" ? (
                                <p className="mt-1 text-center">Or</p>
                              ) : (
                                <p className="mt-1 text-center">Or</p>
                              )}
                              {event?.meetingType !== "Zoom" ? (
                                <div className="w-10/12 mx-auto mt-1 text-center text-white bg-orange-400  rounded-md">
                                  <button
                                    onClick={() =>
                                      handleRescheduleMeetAdmin(
                                        event?.eventId || event?.googleCalendarId,
                                        event?.eventDBid || event?.eventDBId,
                                        event?.requester,
                                        event?.studentName
                                      )
                                    }
                                    className="w-10/12 rounded-md  text-center  py-[6px]"
                                  >
                                    Reschedule Meet
                                  </button>
                                </div>
                              ) : (
                                <div className="w-10/12 mx-auto mt-1 text-center text-white bg-orange-400  rounded-md">
                                  <button
                                    onClick={() =>
                                      handleRescheduleZoomAdmin(
                                        event?.eventId || event?.googleCalendarId,
                                        event?.eventDBid || event?.eventDBId,
                                        event?.requester,
                                        event?.studentName,
                                        event?.id
                                      )
                                    }
                                    className="w-10/12 rounded-md  text-center  py-[6px]"
                                  >
                                    Reschedule Zoom
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <></>
                        )
                      )
                  ) : (
                    <div className="col-span-full text-center">
                      <p className="font-medium">
                        No events found for the selected date range.
                      </p>
                    </div>
                  )}
                  {userZoomInfo?.uuid && userZoomInfo?.recording_files ? (
                    <div className="mt-16">
                      <div className="mx-auto flex justify-center ">
                        <a
                          className="bg-teal-500 text-white py-2 px-4 rounded-lg"
                          target="_blank"
                          rel="noreferrer"
                          href={userZoomInfo?.recording_files[0]?.play_url}
                        >
                          See Zoom Recording
                        </a>
                      </div>
                      <div className="text-red-500 text-center mt-5">
                        <p>Zoom Recordings will expire in 30 days.</p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* Add any additional content or components specific to user requester events */}
                </div>
              </>
            ) : userInfo?.role === "admin" ? (
              <>
                {isOpenStickyBar && (
                  <div className="w-full rounded-2xl -mt-5 mb-8 bg-amber-500  px-4 py-2 text-white font-semibold font-raleway flex items-center justify-evenly gap-2 md:gap-4 text-[13px] md:text-base">
                    <div className="">
                      <a
                        href="https://www.google.com/chrome/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                      >
                        Please use Google Chrome browser for better scheduling
                        experience
                      </a>
                    </div>
                    <button
                      onClick={() => setIsOpenStickyBar(false)}
                      className="px-3 py-1 border-2 font-sans rounded-full "
                    >
                      Ok
                    </button>
                  </div>
                )}
                <div className="grid justify-center justify-items-center items-center">
                  <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
                    <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[25px]">
                      Request {meetingType} slot
                    </h1>
                    <div
                      style={{
                        filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                      }}
                      className="bg-[#0E2749] w-full h-[400px] rounded-[14px] py-[15px] px-[15px] mb-10 lg:p-[30px] flex flex-col justify-between items-center gap-5"
                    >
                      <div className="w-full relative">
                        <p className="text-[#C0C0C0] text-[18px] font-[600] pb-[18px]">
                          Date
                        </p>
                        <div className="relative inline-flex w-full">
                          <input
                            required
                            onChange={handleDateChange}
                            className="text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                            name="date"
                            id="date"
                            type="date"
                            min={getCurrentDate()}
                            max={maxDateString}
                          />
                        </div>
                        <p className="text-[#C0C0C0] text-[18px] font-[600] py-[18px]">
                          Time
                        </p>
                        <div className="relative inline-flex w-full">
                          <select
                            required
                            onChange={handleTimeChange}
                            className="text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                            name="time"
                            id="time"
                          // defaultValue={taskData?.minimumTime}
                          >
                            <option className="hidden">Select Time</option>
                            {generateTimeOptions()}
                          </select>
                        </div>
                      </div>
                      {reservedEvent ? (
                        <a
                          href={reservedEvent?.hangoutLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{ boxShadow: "0px 6.32482px 0px #CA5F98" }}
                          className="bg-[#0F3934] w-full py-[15px] px-[23px] rounded-[13px] text-[12px] lg:text-[18px] font-[700] z-[1]"
                        >
                          <p className="flex items-center justify-center text-white">
                            Join Meeting{" "}
                            <img
                              className="pl-1 w-[21px] lg:w-[32px]"
                              src={RightArrowWhite}
                              alt="RightArrowBlack"
                            />
                          </p>
                        </a>
                      ) : (
                        <>
                          {matching ? (
                            <p className="text-white text-center">
                              Admin is Busy at that time slot.<br></br>Please
                              choose another slot.
                            </p>
                          ) : (
                            <DashboardPrimaryButton
                              bgColor="#3E4DAC"
                              shadow="0px 6.32482px 0px #CA5F98"
                              width="full"
                              onClick={addEvent}
                              disabled={
                                !selectedTimeSlot ||
                                isTimeSlotBusy(selectedTimeSlot) ||
                                isTimeSlotReserved(selectedTimeSlot)
                              }
                            >
                              <p className="flex items-center justify-center text-white">
                                Request Event{" "}
                                <img
                                  className="pl-1 w-[21px] lg:w-[32px]"
                                  src={RightArrowWhite}
                                  alt="RightArrowBlack"
                                />
                              </p>
                            </DashboardPrimaryButton>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
          <>
            {userRequesterEvents?.length > 0 && isReschedule === false ? (
              // Render content specific to events where the user is the requester
              <div className="grid grid-cols-1 my-5 justify-items-center gap-5 items-center">
                {/* <p>You are the requester in the following events:</p> */}
                {userRequesterEvents?.map((event, index) => (
                  <div
                    key={index}
                    className=" shadow-lg outline-double outline-offset-2 outline-2 outline-emerald-500  w-[350px] rounded p-2 "
                  >
                    <p className="flex gap-1 items-center text-sm">
                      <FiberManualRecordIcon
                        sx={{ color: red[400] }}
                      ></FiberManualRecordIcon>
                      Meeting with {event?.organization?.organizationName}
                    </p>
                    {event?.meetingType === "Zoom" ? (
                      <div className="flex items-center gap-2">
                        <div className="mt-3 mb-1 ">
                          <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                            <div className="flex justify-between gap-2">
                              <AccessAlarmOutlinedIcon fontSize="small" />
                              <span className="font-semibold text-[14px]">
                                Starts{" "}
                              </span>
                            </div>
                            <ul className="text-sm">
                              <li key={index}>
                                {formatTimeForZoom(
                                  event,
                                  event?.start_time ? "start" : ""
                                )}
                              </li>
                            </ul>
                          </p>
                          <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                            <div className="flex justify-between  gap-2">
                              <AccessAlarmOutlinedIcon fontSize="small" />
                              <span className="font-semibold text-[14px]">
                                Ends{" "}
                              </span>
                            </div>
                            <ul className="text-sm">
                              <li key={index}>
                                {formatTimeForZoom(
                                  event,
                                  event?.end_time ? "" : "end"
                                )}
                              </li>
                            </ul>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="mt-3 mb-1 ">
                          <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                            <div className="flex justify-between gap-2">
                              <AccessAlarmOutlinedIcon fontSize="small" />
                              <span className="font-semibold text-[14px]">
                                Starts{" "}
                              </span>
                            </div>
                            <ul className="text-sm">
                              {formatUtcDateTimeStringToListItems(
                                event?.start?.dateTime
                              )?.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </p>
                          <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                            <div className="flex justify-between  gap-2">
                              <AccessAlarmOutlinedIcon fontSize="small" />
                              <span className="font-semibold text-[14px]">
                                Ends{" "}
                              </span>
                            </div>
                            <ul className="text-sm">
                              {formatUtcDateTimeStringToListItems(
                                event?.end?.dateTime
                              )?.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="grid gap-2 align-middle items-center">
                      {isWithinSixtyMinutes(event?.start_time) ? (
                        <div className="w-10/12 mx-auto mt-3 text-white bg-sky-500 rounded-md">
                          <button
                            onClick={() =>
                              handleLinkClick(
                                event,
                                userInfo,
                                taskData,
                                event?.meetingType,
                                event?.meetingType === "Zoom"
                                  ? userInfo?.role === "admin"
                                    ? event?.start_url
                                    : event?.join_url
                                  : event?.hangoutLink
                              )
                            }
                            className="flex gap-2 items-center justify-center py-[6px] w-full"
                          >
                            <img
                              src={
                                event?.meetingType === "Zoom"
                                  ? zoom
                                  : googlemeet
                              }
                              className="w-[21px] h-[21px]"
                              alt="googlemeet or zoom"
                            />
                            <p>
                              Go to{" "}
                              {event?.meetingType === "Zoom" ? "zoom" : "meet"}{" "}
                              Link
                            </p>
                          </button>
                        </div>
                      ) : (
                        <p className="mt-3 text-center">
                          Link will be available 60 minutes before the start
                          time
                        </p>
                      )}
                      {event?.meetingType !== "Zoom" ? (
                        <p className="mt-1 text-center">Or</p>
                      ) : (
                        <p className="mt-1 text-center">Or</p>
                      )}
                      {event?.meetingType !== "Zoom" ? (
                        <div className="w-10/12 mx-auto mt-1 text-center text-white bg-orange-400  rounded-md">
                          <button
                            onClick={() =>
                              handleRescheduleMeet(
                                event?.eventId || event?.googleCalendarId,
                                event?.eventDBid || event?.eventDBId
                              )
                            }
                            className="w-10/12 rounded-md  text-center  py-[6px]"
                          >
                            Reschedule Meet
                          </button>
                        </div>
                      ) : (
                        <div className="w-10/12 mx-auto mt-1 text-center text-white bg-orange-400  rounded-md">
                          <button
                            onClick={() =>
                              handleRescheduleZoom(
                                event?.eventId || event?.googleCalendarId,
                                event?.eventDBid || event?.eventDBId,
                                event?.id
                              )
                            }
                            className="w-10/12 rounded-md  text-center  py-[6px]"
                          >
                            Reschedule Zoom
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {userZoomInfo?.uuid && userZoomInfo?.recording_files ? (
                  <div className="mt-16">
                    <div className="mx-auto flex justify-center ">
                      <a
                        className="bg-teal-500 text-white py-2 px-4 rounded-lg"
                        target="_blank"
                        rel="noreferrer"
                        href={userZoomInfo?.recording_files[0]?.play_url}
                      >
                        See Zoom Recording
                      </a>
                    </div>
                    <div className="text-red-500 text-center mt-5">
                      <p>Zoom Recordings will expire in 30 days.</p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {/* Add any additional content or components specific to user requester events */}
              </div>
            ) : userInfo?.role === "user" ? (
              <>
                {isOpenStickyBar && (
                  <div className="w-full rounded-2xl -mt-5 mb-8 bg-amber-500  px-4 py-2 text-white font-semibold font-raleway flex items-center justify-evenly gap-2 md:gap-4 text-[13px] md:text-base">
                    <div className="">
                      <a
                        href="https://www.google.com/chrome/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                      >
                        Please use Google Chrome browser for better scheduling
                        experience
                      </a>
                    </div>
                    <button
                      onClick={() => setIsOpenStickyBar(false)}
                      className="px-3 py-1 border-2 font-sans rounded-full "
                    >
                      Ok
                    </button>
                  </div>
                )}
                <div className="grid justify-center justify-items-center items-center">
                  <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
                    <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[25px]">
                      Request {meetingType} slot
                    </h1>
                    <div
                      style={{
                        filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                      }}
                      className="bg-[#0E2749] w-full h-[400px] rounded-[14px] py-[15px] px-[15px] mb-10 lg:p-[30px] flex flex-col justify-between items-center gap-5"
                    >
                      <div className="w-full relative">
                        <p className="text-[#C0C0C0] text-[18px] font-[600] pb-[18px]">
                          Date
                        </p>
                        <div className="relative inline-flex w-full">
                          <input
                            required
                            onChange={handleDateChange}
                            className="text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                            name="date"
                            id="date"
                            type="date"
                            min={getCurrentDate()}
                            max={maxDateString}
                          />
                        </div>
                        <p className="text-[#C0C0C0] text-[18px] font-[600] py-[18px]">
                          Time
                        </p>
                        <div className="relative inline-flex w-full">
                          <select
                            required
                            onChange={handleTimeChange}
                            className="text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                            name="time"
                            id="time"
                          >
                            <option className="hidden">Select Time</option>
                            {generateTimeOptions()}
                          </select>
                        </div>
                      </div>
                      {reservedEvent ? (
                        <a
                          href={reservedEvent?.hangoutLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{ boxShadow: "0px 6.32482px 0px #CA5F98" }}
                          className="bg-[#0F3934] w-full py-[15px] px-[23px] rounded-[13px] text-[12px] lg:text-[18px] font-[700] z-[1]"
                        >
                          <p className="flex items-center justify-center text-white">
                            Join Meeting{" "}
                            <img
                              className="pl-1 w-[21px] lg:w-[32px]"
                              src={RightArrowWhite}
                              alt="RightArrowBlack"
                            />
                          </p>
                        </a>
                      ) : (
                        <>
                          {matching ? (
                            <p className="text-white text-center">
                              Admin is Busy at that time slot.<br></br>Please
                              choose another slot.
                            </p>
                          ) : (
                            <DashboardPrimaryButton
                              bgColor="#3E4DAC"
                              shadow="0px 6.32482px 0px #CA5F98"
                              width="full"
                              onClick={addEvent}
                              disabled={
                                !selectedTimeSlot ||
                                isTimeSlotBusy(selectedTimeSlot) ||
                                isTimeSlotReserved(selectedTimeSlot)
                              }
                            >
                              <p className="flex items-center justify-center text-white">
                                Request Event{" "}
                                <img
                                  className="pl-1 w-[21px] lg:w-[32px]"
                                  src={RightArrowWhite}
                                  alt="RightArrowBlack"
                                />
                              </p>
                            </DashboardPrimaryButton>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default ScheduleTask;
