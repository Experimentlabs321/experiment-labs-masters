import { AuthContext } from "../../../contexts/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import axios from "axios";
import Modal from "react-modal";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import Loading from "../../Shared/Loading/Loading";
import DateTimePicker from "react-datetime-picker";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { red } from "@mui/material/colors";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import RightArrowWhite from "../../../assets/Dashboard/RightArrowWhite.png";
import Swal from "sweetalert2";
import { gapi } from "gapi-script";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import googlemeet from "../../../assets/icons/googlemeet.png";
let matching = false;
const matchInputWithBusySlots = (inputDate, inputTime, busyTimeSlots) => {
  let flag = 0;
  console.log("input", inputDate, inputTime);
  const inputDateTime = new Date(`${inputDate}T${inputTime}`);
  console.log("Input DateTime:", inputDateTime);

  // Extract date and time separately
  const inputDateString = inputDateTime.toDateString();
  const inputTimeString = inputDateTime.toTimeString();

  const isMatch = busyTimeSlots?.some((busySlot) => {
    const busyStartDateTimeString = busySlot.start.dateTime;
    const busyEndDateTimeString = busySlot.end.dateTime;
    // console.log("busystart",busyStartDateTimeString);
    const busyStartDateString = busyStartDateTimeString
      .substring(0, 16)
      .replace(",", "");
    const dateParts = busyStartDateString.split(" ");
    const busyStartDateStringFormatted = `${dateParts[0]} ${
      dateParts[2][0].toUpperCase() + dateParts[2].substring(1)
    } ${dateParts[1]} ${dateParts[3]}`;
    console.log("Input Date:", inputDateString);
    //  console.log('Busy Date:', busyStartDateStringFormatted);
    if (inputDateString === busyStartDateStringFormatted) {
      flag = 1;
    }
    const busyStartTime = busyStartDateTimeString.split(" ")[4];
    // console.log('busy start: ', busyStartTime);
    const busyEndTime = busyEndDateTimeString.split(" ")[4];

    //console.log(flag);
    return (
      flag === 1 &&
      inputTimeString >= busyStartTime &&
      inputTimeString <= busyEndTime
    );
  });

  if (isMatch) {
    matching = true;
  } else {
    matching = false;
  }
};

const ScheduleTask = ({ taskData, week }) => {
  const adminMail = taskData?.usersession?.user?.email;
  const adminName = taskData?.usersession?.user?.user_metadata?.name;
  const meetingLength = taskData?.meetingDuration;
  console.log("Meeting duration : ", Number(meetingLength));
  // console.log(adminMail);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [maxDateString, setMaxDateString] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [busyTimeSlots, setBusyTimeSlots] = useState([]);
  const [userRequesterEvents, setUserRequesterEvents] = useState([]);
  const session = useSession();
  const [selectedDate, setSelectedDate] = useState("");
  const supabase = useSupabaseClient();
  console.log("Task data ", taskData);
  const { user, userInfo } = useContext(AuthContext);
  if (userInfo.role !== "admin") {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  console.log(userInfo);
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

  useEffect(() => {
    // Assuming taskData is already available when the component mounts
    if (taskData) {
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

  //  const handleBTimeChange = (event) => {

  //     const selectedTime = event.target.value;

  //     console.log(selectedTime)
  //     const minTime = taskData?.minimumTime;
  //     const maxTime = taskData?.maximumTime;
  //     setMaxTime(maxTime)
  //     setMinTime(minTime)
  //     const selectedTimeDate = new Date(`2000-01-01T${selectedTime}`);
  //     const minTimeDate = new Date(`2000-01-01T${minTime}`);
  //     const maxTimeDate = new Date(`2000-01-01T${maxTime}`);

  //     if (selectedTimeDate < minTimeDate || selectedTimeDate > maxTimeDate) {
  //       setCheckTime(true)
  //       setTimeRangeError(true)
  //       //alert(`Please choose a time between ${minTime} and ${maxTime}.`);
  //       // Reset the time to the initial state or do nothing
  //       document.getElementById('time').value = minTime;
  //       //  setTime(null);
  //     } else {
  //       setTimeRangeError(false)
  //       setCheckTime(false)
  //       setTime(selectedTime);
  //       console.log("handletimechange", selectedTime);
  //       matchInputWithBusySlots(date, selectedTime, busyTimeSlots);
  //     }
  //   };

  console.log("input time ", time);

  useEffect(() => {
    // if (localStorage.getItem("role") === "admin") {
    //   if (!session?.provider_token) {
    //     // If there's no session, sign in again
    //     googleSignIn();
    //   }
    // }
    const busyTimeSlots = taskData?.events
      ?.map((event) => {
        // Use the correct property for date and time based on the event structure
        const startDateTime = event.start?.dateTime || event.start;

        // Ensure that startDateTime is defined before proceeding
        if (!startDateTime) {
          return null; // Skip events without a valid startDateTime
        }

        const endDateTime = event.end?.dateTime || event.end;

        const startDate = new Date(startDateTime);
        const startTime = startDate.toUTCString();

        const endDate = new Date(endDateTime);
        const endTime = endDate.toUTCString();

        return {
          start: {
            dateTime: startTime,
            // time: startTimeString,
          },
          end: {
            dateTime: endTime,
            // time: endTimeString,
          },
        };
      })
      .filter(Boolean);

    // console.log("Busy Time Slots:", busyTimeSlots); // Log the busy time slots

    // Assuming week.start and week.end are available as Date objects
    const allTimeSlots = generateAllTimeSlots(week.start, week.end);

    //console.log("All Time Slots:", allTimeSlots); // Log all time slots

    const filteredTimeSlots = filterBusyTimeSlots(
      allTimeSlots,
      busyTimeSlots,
      reservedEvent
    );

    //  console.log("Filtered Time Slots:", filteredTimeSlots); // Log the filtered time slots

    setBusyTimeSlots(busyTimeSlots);
  }, [taskData, matching]);
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
  }, [taskData, user]);
  const generateAllTimeSlots = (start, end) => {
    const timeSlots = [];
    let currentTime = new Date(start);
    while (currentTime <= end) {
      timeSlots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + Number(meetingLength)); // Assuming 30-minute time slots
    }
    return timeSlots;
  };
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
  console.log(adminMail);
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
        console.log(timeDifferenceInMilliseconds);
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
        fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${process.env.REACT_APP_google_clientId}&client_secret=${process.env.REACT_APP_google_clientSecret}`,
        })
          .then((response) => response.json())
          .then((data) => {
            var event = {
              summary: `${userInfo?.name} Doubt Clearing Session`,
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
                { email: "naman.j@experimentlabs.in" },
                { email: user?.email },
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
            console.log(data);
            const newAccessToken = data.access_token;
            function initiate() {
              const sendData = async (event) => {
                const response = await axios.post(
                  `${process.env.REACT_APP_BACKEND_API}/events`,
                  event
                );
                const sendMail = await axios.post(
                  `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
                  {
                    //  from: `${userInfo?.email}`,
                    //    to: `${user?.email},${adminMail}`,
                    to: `${user?.email}`,
                    templateType: "emailAction",
                    templateName: "sheduleTask",
                    organizationId: userInfo?.organizationId,
                    start_time: eventStartTime,
                    end_time: eventEndTime,
                    meeting_link: event?.hangoutLink,
                    learner_name: adminName,
                    learner_email: adminMail,
                    meeting_date: date,
                    /*  subject: `Event request`,
                    message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                      }`, */
                  }
                );
                const sendMailAdmin = await axios.post(
                  `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
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
                    learner_name: userInfo?.name,
                    learner_email: userInfo?.email,
                    meeting_date: date,
                    /*  subject: `Event request`,
                    message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                      }`, */
                  }
                );
                console.log("send ", sendMail);
                console.log("Admin Mail ", adminMail);

                console.log("res ", response);
                if (sendMail?.data?.success && response?.data?.acknowledged) {
                  Loading().close();
                  const newEvent = await axios.post(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/${taskData?._id}/addEvent`,
                    event
                  );
                  // console.log("new event created ", newEvent);
                  await Swal.fire({
                    icon: "success",
                    title: "Request Sent!",
                    text: "Your meeting is confirmed. Please go to the Dashboard to access the meeting link",
                  });

                  navigate("/courseAccess");
                }
              };
              gapi.client
                .request({
                  path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?conferenceDataVersion=1`,
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
                      title: `${userInfo?.name} <> Experiment Labs <> Doubt clearing <> ${response?.result?.hangoutLink}`,
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
                        { email: "naman.j@experimentlabs.in" },
                        // { email: "gaurav@experimentlabs.in" },
                        { email: user?.email },
                        // { email: "alrafi4@gmail.com" },
                        {
                          email: adminMail,
                        },
                      ],
                      weekData: currentWeek,
                      hangoutLink: response?.result?.hangoutLink,
                      requester: user?.email,
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
            // navigate(-1)
          })
          .catch((error) => {
            Loading().close();
            console.error("Token refresh error:", error);
          });
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
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isUserRequester = taskData?.events?.some(
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

  return (
    <div className="flex justify-center my-5">
      {userRequesterEvents?.length > 0 ? (
        // Render content specific to events where the user is the requester
        <div className="grid grid-cols-1 my-5 justify-items-center gap-5 items-center">
          {/* <p>You are the requester in the following events:</p> */}
          {userRequesterEvents?.map((event, index) => (
            <div
              key={index}
              className=" shadow-lg outline-double outline-offset-2 outline-2 outline-emerald-500  w-[380px] rounded p-2 "
            >
              <p className="flex gap-1 items-center text-sm">
                <FiberManualRecordIcon
                  sx={{ color: red[400] }}
                ></FiberManualRecordIcon>
                Meeting with {event?.organization?.organizationName}
              </p>
              <div className="flex items-center gap-2">
                <div className="mt-3 mb-1 ">
                  <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                    <div className="flex justify-between gap-2">
                      <AccessAlarmOutlinedIcon fontSize="small" />
                      <span className="font-semibold text-[14px]">Starts </span>
                    </div>
                    <ul className="text-sm">
                      {formatUtcDateTimeStringToListItems(
                        event.start.dateTime
                      ).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </p>
                  <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                    <div className="flex justify-between  gap-2">
                      <AccessAlarmOutlinedIcon fontSize="small" />
                      <span className="font-semibold text-[14px]">Ends </span>
                    </div>
                    <ul className="text-sm">
                      {formatUtcDateTimeStringToListItems(
                        event.end.dateTime
                      ).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              </div>
              <div className="w-11/12 mx-auto mt-3 text-white bg-sky-600  rounded-md">
                <Link
                  to={event?.hangoutLink}
                  className="flex gap-2 items-center justify-center py-[6px]"
                >
                  <img
                    src={googlemeet}
                    className="w-[21px] h-[21px]"
                    alt="googlemeet"
                  ></img>
                  <p>Go to Meet Link</p>
                </Link>
              </div>
            </div>
          ))}

          {/* Add any additional content or components specific to user requester events */}
        </div>
      ) : (
        <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
          <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[25px]">
            Request slots
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
              {/* <div className="relative inline-flex w-full">
                <input
                  required
                  onChange={handleBTimeChange}
                  className="text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                  name="time"
                  min={taskData?.minimumTime}
                  max={taskData?.maximumTime}
                  id="time"
                  type="time"
                  defaultValue={taskData?.minimumTime} // Set the default value to 9:00 AM
                />
              </div> */}
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
                {matching || timeRangeError ? (
                  <>
                    {timeRangeError ? (
                      <p className="text-white">
                        Please choose a time between {minTime} and {maxTime}.
                      </p>
                    ) : (
                      <p className="text-white">Admin is Busy at that time</p>
                    )}
                  </>
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
      )}
    </div>
  );
};

export default ScheduleTask;
