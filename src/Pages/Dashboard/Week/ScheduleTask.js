import { AuthContext } from "../../../contexts/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import axios from "axios";

import moment from "moment";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import Loading from "../../Shared/Loading/Loading";
import { CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import RightArrowWhite from "../../../assets/Dashboard/RightArrowWhite.png";
import Swal from "sweetalert2";
import { gapi } from "gapi-script";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import googlemeet from "../../../assets/icons/googlemeet.png";
import zoom from "../../../assets/icons/zoom-240.png";

const ScheduleTask = ({ taskData, week }) => {
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

      // console.log("Checking Busy Start:", busyStartDateTimeString);
      // console.log("Checking Busy End:", busyEndDateTimeString);
      if (
        inputDateTime >= busyStartDateTime &&
        inputDateTime <= busyEndDateTime
      ) {
        // if (inputTimeString >= busyStartTime && inputTimeString >= busyEndTime)
        console.log("busy start and end: ", typeof busyStartTime, busyEndTime);
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
    console.log("Matching:", matching);
  };
  const calendarSubjectName = taskData?.calendarSubjectName;
  const taskId = taskData?._id;
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
  const [ismeetingType, setIsMeetingType] = useState(true);
  const [meetingType, setMeetingType] = useState(null);
  const [zoomInfo, setZoomInfo] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [zoomeventId, setZoomEventId] = useState("");
  const [eventDBid, setEventDBid] = useState(null);
  if (userInfo.role !== "admin") {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }
  const handleRescheduleMeet = (eventId, eventDBid) => {
    setEventDBid(eventDBid);
    setEventId(eventId);
    setIsReschedule(true);
  };
  const handleRescheduleZoom = (eventId, eventDBid) => {
    setEventDBid(eventDBid);
    setEventId(eventId);
    setIsReschedule(true);
  };
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
  const [userZoomInfo, setUserZoomInfo] = useState({});
  const [isReschedule, setIsReschedule] = useState(false);
  const [adminCalendarInfo, setAdminCalendarInfo] = useState({});
  const [relevantEvents, setRelevantEvents] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/calenderInfo/getCalendarInfoByEmail/email/${taskData?.adminCalenderEmail}`
      )
      .then((response) => {
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

  console.log(adminCalendarInfo, relevantEvents);

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
                `${process.env.REACT_APP_SERVER_API}/api/v1/events/recording/organizationId/${event?.organization?.organizationId}`,
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

  console.log(zoomInfo);
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

  console.log("input time ", time);

  useEffect(() => {
    const busyTimeSlots = adminCalendarInfo?.events
      ?.map((event) => {
        // Check if start and end are directly available or nested under different properties
        const startDateTime = event.start?.dateTime || event.start_time;
        const endDateTime =
          event.end?.dateTime ||
          event.end_time ||
          (() => {
            // If end time is not directly available, calculate it based on duration and start time
            const duration = event.duration; // Duration in minutes
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
  }, [taskData, user, adminCalendarInfo]);
  console.log("my events ", userRequesterEvents);

  useEffect(() => {
    if (userRequesterEvents?.length > 0)
      axios
        .post(
          `${process.env.REACT_APP_SERVER_API}/api/v1/events/recording/organizationId/${userInfo?.organizationId}`,
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
  console.log(userZoomInfo?.recording_files);
  const generateAllTimeSlots = (start, end) => {
    const timeSlots = [];
    let currentTime = new Date(start);
    while (currentTime <= end) {
      timeSlots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + Number(meetingLength)); // Assuming 30-minute time slots
    }
    return timeSlots;
  };
  useEffect(() => {}, [userRequesterEvents]);
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
            .then((data) => {
              var event = {
                summary: `${userInfo?.name} ${calendarSubjectName}`,
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
                      title: `${userInfo?.name} ${calendarSubjectName} `,
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
                        { email: user?.email },
                        // { email: "alrafi4@gmail.com" },
                        {
                          email: adminMail,
                        },
                      ],
                      // Assuming "weekData" is something specific to your application and not part of the standard Calendar API response
                      weekData: currentWeek,
                      hangoutLink: data.hangoutLink, // Access directly from data
                      requester: user?.email,
                      eventId: eventId, // Access directly from data
                    };
                    console.log(rescheduledEvent);
                    console.log(eventDBid);
                    const updateResponse = await axios.put(
                      `${process.env.REACT_APP_SERVER_API}/api/v1/events/${eventDBid}`,
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
                    if (updateResponse?.data?.acknowledged) {
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
                          meeting_link: rescheduledEvent?.hangoutLink,
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
                          meeting_link: rescheduledEvent?.hangoutLink,
                          learner_name: userInfo?.name,
                          learner_email: userInfo?.email,
                          meeting_date: date,
                          /*  subject: `Event request`,
                          message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                            }`, */
                        }
                      );
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
                          `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/${taskData?._id}/updateEvent`,
                          { ...rescheduledEvent, eventDBid: eventDBid }
                        );
                        console.log(newRescheduleEvent);

                        const filteredEvent = relevantEvents?.filter(
                          (item) => item?.eventId !== rescheduledEvent?.eventId
                        );
                        const calendarInfo = { ...adminCalendarInfo };
                        calendarInfo.events = [
                          ...filteredEvent,
                          { ...rescheduledEvent, eventDBid: eventDBid },
                        ];
                        delete calendarInfo._id;
                        console.log(calendarInfo);
                        const newSchedule = await axios.post(
                          `${process.env.REACT_APP_SERVER_API}/api/v1/calenderInfo/updateOrInsertCalendarInfo/email/${calendarInfo?.email}`,
                          calendarInfo
                        );

                        // console.log("new event created ", newEvent);
                        await Swal.fire({
                          icon: "success",
                          title: "Event Rescheduled!",
                          text: "The event has been successfully rescheduled.",
                        });
                        Loading().close();
                        navigate("/courseAccess");
                      }
                    }

                    // Other UI updates or state resets after successful rescheduling
                  })
                  .catch((error) => {
                    console.error("Error updating event:", error);
                    // Handle error
                  });
              } else {
                function initiate() {
                  const sendData = async (event) => {
                    const response = await axios.post(
                      `${process.env.REACT_APP_SERVER_API}/api/v1/events`,
                      event
                    );

                    if (response?.data?.acknowledged) {
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
                      if (
                        sendMail?.data?.success &&
                        sendMailAdmin?.data?.success
                      ) {
                        const newEvent = await axios.post(
                          `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/${taskData?._id}/addEvent`,
                          { ...event, eventDBid: response?.data?.insertedId }
                        );
                        const calendarInfo = { ...adminCalendarInfo };
                        calendarInfo.events = [
                          ...relevantEvents,
                          { ...event, eventDBid: response?.data?.insertedId },
                        ];
                        delete calendarInfo._id;
                        console.log(calendarInfo);
                        const newSchedule = await axios.post(
                          `${process.env.REACT_APP_SERVER_API}/api/v1/calenderInfo/updateOrInsertCalendarInfo/email/${calendarInfo?.email}`,
                          calendarInfo
                        );
                        // console.log("new event created ", newEvent);
                        Loading().close();
                        await Swal.fire({
                          icon: "success",
                          title: "Request Sent!",
                          text: "Your meeting is confirmed. Please go to the Dashboard to access the meeting link",
                        });

                        navigate("/courseAccess");
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
                          title: `${userInfo?.name} ${calendarSubjectName}`,
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
                            { email: user?.email },
                            // { email: "alrafi4@gmail.com" },
                            {
                              email: adminMail,
                            },
                          ],
                          weekData: currentWeek,
                          hangoutLink: response?.result?.hangoutLink,
                          requester: user?.email,
                          eventId: response?.result?.id,
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
            if (isReschedule && eventDBid) {
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
              };
              const newZoomSchedule = await axios.post(
                `${process.env.REACT_APP_SERVER_API}/api/v1/events/meeting/organizationId/${userInfo?.organizationId}`,
                zoomSchedule
              );
              if (newZoomSchedule?.data?.uuid) {
                console.log("zoom schedule ", newZoomSchedule?.data);
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
                try {
                  const postData = {
                    ...newZoomSchedule?.data,
                    requester: user?.email,
                    organization: {
                      organizationId: userInfo?.organizationId,
                      organizationName: userInfo?.organizationName,
                    },
                    meetingType: "Zoom",
                    taskId: taskId,
                  };
                  const updateResponse = await axios.put(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/events/${eventDBid}`,
                    postData
                  );

                  console.log("res ", updateResponse);
                  if (updateResponse?.data?.acknowledged) {
                    const sendMail = await axios.post(
                      `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
                      {
                        //  from: `${userInfo?.email}`,
                        //    to: `${user?.email},${adminMail}`,
                        to: `${user?.email}`,
                        templateType: "emailAction",
                        templateName: "sheduleTask",
                        organizationId: userInfo?.organizationId,
                        start_time: meetingStart,
                        end_time: meetingEnd,
                        meeting_link: studentUrl,
                        learner_name: adminName,
                        learner_email: adminMail,
                        meeting_date: "",
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
                        start_time: meetingStart,
                        end_time: meetingEnd,
                        meeting_link: adminUrl,
                        learner_name: adminName,
                        learner_email: adminMail,
                        meeting_date: "",
                        /*  subject: `Event request`,
                        message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                          }`, */
                      }
                    );
                    console.log("send ", sendMail);
                    console.log("Admin Mail ", adminMail);
                    if (
                      sendMail?.data?.success &&
                      sendMailAdmin?.data?.success
                    ) {
                      const updatedEvent = {
                        summary: `${userInfo?.name} ${calendarSubjectName}`,
                        description: `Join Zoom Meeting: ${adminUrl}\nStart the Meeting: ${studentUrl}`,
                        location: newZoomSchedule.join_url, // Zoom meeting link as location
                        start: {
                          dateTime: meetingStartDate.toISOString(), // Convert to ISO string for Google Calendar
                          timeZone: "Asia/Kolkata", // Explicitly setting time zone
                        },
                        end: {
                          dateTime: meetingEndDate.toISOString(), // Calculate end time based on duration
                          timeZone: "Asia/Kolkata", // Explicitly setting time zone
                        },
                        attendees: [
                          { email: user.email }, // User's email
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
                        ...postData,
                        eventDBid: eventDBid,
                        eventId: eventId,
                      });
                      const newRescheduleEvent = await axios.put(
                        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/${taskData?._id}/updateEvent`,
                        { ...postData, eventDBid: eventDBid, eventId: eventId }
                      );

                      const filteredEvent = relevantEvents?.filter(
                        (item) => item?.eventId !== eventId
                      );
                      const calendarInfo = { ...adminCalendarInfo };
                      calendarInfo.events = [
                        ...filteredEvent,
                        { ...postData, eventDBid: eventDBid, eventId: eventId },
                      ];
                      delete calendarInfo._id;
                      console.log(calendarInfo);
                      const newSchedule = await axios.post(
                        `${process.env.REACT_APP_SERVER_API}/api/v1/calenderInfo/updateOrInsertCalendarInfo/email/${calendarInfo?.email}`,
                        calendarInfo
                      );
                      Loading().close();
                      // console.log("new event created ", newEvent);
                      await Swal.fire({
                        icon: "success",
                        title: "Request Sent!",
                        text: "Your meeting is rescheduled. Please check your email to access the zoom link",
                      });

                      navigate("/courseAccess");
                    }
                  }
                } catch (error) {
                  console.error("An error occurred:", error);
                  // Handle the error appropriately, perhaps show an error message to the user
                  Loading().close();
                  // Optional: Error alert
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Please try again.",
                  });
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
            } else {
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
              };
              const newZoomSchedule = await axios.post(
                `${process.env.REACT_APP_SERVER_API}/api/v1/events/meeting/organizationId/${userInfo?.organizationId}`,
                zoomSchedule
              );
              if (newZoomSchedule?.data?.uuid) {
                console.log("zoom schedule ", newZoomSchedule?.data);
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

                try {
                  const postData = {
                    ...newZoomSchedule?.data,
                    requester: user?.email,
                    organization: {
                      organizationId: userInfo?.organizationId,
                      organizationName: userInfo?.organizationName,
                    },
                    meetingType: "Zoom",
                    taskId: taskId,
                  };
                  const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_API}/events`,
                    postData
                  );

                  // console.log("send ", sendMail);
                  // console.log("Admin Mail ", adminMail);

                  console.log("res ", response);
                  if (response?.data?.acknowledged) {
                    const sendMail = await axios.post(
                      `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
                      {
                        //  from: `${userInfo?.email}`,
                        //    to: `${user?.email},${adminMail}`,
                        to: `${user?.email}`,
                        templateType: "emailAction",
                        templateName: "sheduleTask",
                        organizationId: userInfo?.organizationId,
                        start_time: meetingStart,
                        end_time: meetingEnd,
                        meeting_link: studentUrl,
                        learner_name: adminName,
                        learner_email: adminMail,
                        meeting_date: "",
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
                        start_time: meetingStart,
                        end_time: meetingEnd,
                        meeting_link: adminUrl,
                        learner_name: adminName,
                        learner_email: adminMail,
                        meeting_date: "",
                        /*  subject: `Event request`,
                        message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                          }`, */
                      }
                    );
                    if (
                      sendMail?.data?.success &&
                      sendMailAdmin?.data?.success
                    ) {
                      async function initiate() {
                        var event = {
                          summary: `${userInfo?.name} ${calendarSubjectName}`,
                          description: `Join Zoom Meeting: ${adminUrl}\nStart the Meeting: ${studentUrl}`,
                          location: newZoomSchedule.join_url,
                          start: {
                            dateTime: meetingStartDate.toISOString(),
                            timeZone: "Asia/Kolkata",
                          },
                          end: {
                            dateTime: meetingEndDate.toISOString(),
                            timeZone: "Asia/Kolkata",
                          },
                          attendees: [
                            { email: user.email },
                            { email: adminMail },
                          ],
                          reminders: {
                            useDefault: true,
                          },
                        };

                        try {
                          const responseData = await gapi.client.request({
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
                          // var event = {
                          //   ...response
                          // } // Get the event ID from the response
                          // sendCalendarEvent(event);

                          const newEvent = await axios.post(
                            `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/${taskData?._id}/addEvent`,
                            {
                              ...postData,
                              eventDBid: response?.data?.insertedId,
                              eventId: responseData.result.id,
                            }
                          );
                          const calendarInfo = { ...adminCalendarInfo };
                          calendarInfo.events = [
                            ...relevantEvents,
                            {
                              ...postData,
                              eventDBid: response?.data?.insertedId,
                              eventId: responseData.result.id,
                            },
                          ];
                          delete calendarInfo._id;
                          console.log(calendarInfo);
                          const newSchedule = await axios.post(
                            `${process.env.REACT_APP_SERVER_API}/api/v1/calenderInfo/updateOrInsertCalendarInfo/email/${calendarInfo?.email}`,
                            calendarInfo
                          );
                        } catch (error) {
                          console.error(
                            "Failed to create Google Calendar event:",
                            error
                          );
                        }
                      }

                      // Prepare the Google Calendar event data

                      gapi.load("client", initiate);

                      Loading().close();
                      // console.log("new event created ", newEvent);
                      await Swal.fire({
                        icon: "success",
                        title: "Request Sent!",
                        text: "Your meeting is confirmed. Please check your email to access the zoom link",
                      });

                      navigate("/courseAccess");
                    }
                  }
                } catch (error) {
                  console.error("An error occurred:", error);
                  // Handle the error appropriately, perhaps show an error message to the user
                  Loading().close();
                  // Optional: Error alert
                  await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong! Please try again.",
                  });
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
          } catch (error) {
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
  return (
    <div className="flex justify-center my-5">
      {userInfo?.role === "admin" && zoomInfo?.length > 0 ? (
        <>
          <div className="overflow-x-auto mt-10 relative">
            {isLoading && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <CircularProgress />
              </div>
            )}
            <table
              className={`min-w-full leading-normal ${
                isLoading ? "opacity-50" : ""
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
          {userRequesterEvents?.length > 0 && isReschedule === false ? (
            // Render content specific to events where the user is the requester
            <div className="grid grid-cols-1 my-5 justify-items-center gap-5 items-center">
              {/* <p>You are the requester in the following events:</p> */}
              {userRequesterEvents?.map((event, index) => (
                <div
                  key={index}
                  className=" shadow-lg outline-double outline-offset-2 outline-2 outline-emerald-500  w-[320px] rounded p-2 "
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
                            event?.meetingType === "Zoom" ? zoom : googlemeet
                          }
                          className="w-[21px] h-[21px]"
                          alt="googlemeet or zoom"
                        ></img>
                        <p>
                          Go to{" "}
                          {event?.meetingType === "Zoom" ? "zoom" : "meet"} Link
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
                            handleRescheduleMeet(
                              event?.eventId,
                              event?.eventDBid
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
                              event?.eventId,
                              event?.eventDBid
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
          ) : (
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
                            Please choose a time between {minTime} and {maxTime}
                            .
                          </p>
                        ) : (
                          <p className="text-white">
                            Admin is Busy at that time
                          </p>
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
        </>
      )}
    </div>
  );
};

export default ScheduleTask;
