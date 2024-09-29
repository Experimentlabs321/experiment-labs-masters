import React, { useContext, useState, useEffect } from "react";

//import DialogLayout from "../Shared/DialogLayout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import arrowright from "../../../assets/SkillsManagement/arrowright.svg";
import required from "../../../assets/ContentManagement/required.png";
import RightArrowWhite from "../../../assets/Dashboard/RightArrowWhite.png";
import arrowDown from "../../../assets/SkillsManagement/arrow.svg";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import Loading from "../../Shared/Loading/Loading";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import Swal from "sweetalert2";
import { gapi } from "gapi-script";
import moment from "moment";
const ExecutionMentorBookSchedule = ({
  selectedSchedule,
  selectedC,
  selectedBatch,
  selectedMax,
  selectedMin,
  selected,
  meetingmedium,
  offDays,
  dateRange,
  scheduleEvents,
  selectedAdmin,
  durationMeeting,
  adminName,
  idSchedule,
  calendarSubjectName,
  syncedMail,
  addBookOpen,
  setAddBookOpen,
  idWeek,
  fullEventData,
}) => {
  // console.log("full data ", fullEventData);
  // console.log("week ", idWeek);
  const { id } = useParams();

  const [isOpenGeneral, setIsOpenGeneral] = useState(true);
  const [isOpenClassTimings, setIsOpenClassTimings] = useState(false);
  const [isOpenEvaluationParameter, setsOpenEvaluationParameter] =
    useState(false);
  const [orgData, setOrgData] = useState({});
  const { user, userInfo } = useContext(AuthContext);
  const [matching, setMatching] = useState(false);
  const matchInputWithBusySlots = (inputDate, inputTime, busyTimeSlots) => {
    // console.log("Busy Time Slots:", busyTimeSlots);
    const inputDateTime = new Date(`${inputDate}T${inputTime}`);
    // console.log("Input DateTime:", inputDateTime);

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

    // console.log("Formatted Input DateTime:", inputDateTimeString);
    // console.log("Input Date:", inputDateString);
    // console.log("Input Time:", inputTimeString);

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
        inputDateTime < busyEndDateTime
      ) {
        // if (inputTimeString >= busyStartTime && inputTimeString >= busyEndTime)
        // console.log("busy start and end: ", busyStartTime, busyEndTime);
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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [busyTimeSlots, setBusyTimeSlots] = useState([]);
  const [chapter, setChapter] = useState({});
  const [date, setDate] = useState(""); // State for the date
  const [time, setTime] = useState("");
  const [checkTime, setCheckTime] = useState(false);
  const [timeRangeError, setTimeRangeError] = useState(false);
  const [minTime, setMinTime] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [selectedTimeDate, setselectedTimeDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [skillCategories, setSkillCategories] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const calendarID = process.env.REACT_APP_calendarID;
  const [course, setCourse] = useState({});
  const [selectedHoliday, setSelectedHoliday] = useState([]);
  const [batchesData, setBatchesData] = useState([]);
  const [reservedEvent, setReservedEvent] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [picked, setPicked] = useState(false);
  const [enableDrip, setEnableDrip] = useState();
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedWeek, setSelectedWeek] = useState({});
  const [selectedChapter, setSelectedChapter] = useState({});
  const [courses, setCourses] = useState([]);
  const [weeks, setWeeks] = useState();
  const [chapters, setChapters] = useState();
  const [adminCalendarInfo, setAdminCalendarInfo] = useState({});
  const [relevantevents, setRelevantEvents] = useState({});
  const [students, setStudents] = useState([]);
  const [maxDateString, setMaxDateString] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  // console.log(userInfo);
  const toggleDropdownGeneral = () => {
    setIsOpenGeneral(!isOpenGeneral);
  };
  const toggleDropdownClassTimings = () => {
    setIsOpenClassTimings(!isOpenClassTimings);
  };
  const toggleDropdownEvaluationParameter = () => {
    setsOpenEvaluationParameter(!isOpenEvaluationParameter);
  };
  // console.log(
  //   `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/email/${selectedAdmin}`
  // );
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/email/${userInfo?.email}`
      )
      .then((response) => {
        // console.log("here");
        // console.log(response);
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
  }, [selectedAdmin]);
  useEffect(() => {
    Loading();
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/students?executionMentors.mentorId=${userInfo?._id}&courses.courseId=${selected}`
      )
      .then((response) => {
        Loading().close();
        setStudents(response?.data?.data || []);
        // console.log(response?.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        Loading().close();
        console.error(error);
        // setIsLoading(false);
      });
  }, [userInfo, selected]);
  // console.log(students);

  /*   useEffect(() => {
    if (chapter?.courseId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${chapter?.courseId}`
        )
        .then((response) => {
          setBatchesData(response?.data);
          console.log(response?.data);
        })
        .catch((error) => console.error(error));
    }
  }, [chapter?.courseId]); */
  // console.log(selectedAdmin);

  const navigate = useNavigate();

  const currentDate = new Date(); // Current date
  const endDate = new Date();
  const relevantEvents = calendarEvents.filter((event) => {
    const eventStart = new Date(event?.start?.dateTime); // Parse event start date
    return eventStart >= currentDate && eventStart <= endDate;
  });

  function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(":");
    let hours12 = hours % 12 || 12;
    let period = hours < 12 || hours === 24 ? "AM" : "PM";
    return `${hours12}:${minutes} ${period}`;
  }
  // console.log(selectedStudent);
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;

    // Replace this with your date string
    const options = { weekday: "long", timeZone: "UTC" }; // Set the timeZone option

    const selectedDay = new Date(selectedDate).toLocaleDateString(
      "en-US",
      options
    );

    // Check if the selected day is an off-day
    if (offDays?.includes(selectedDay)) {
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
    const maxDateOffset = parseInt(dateRange, 10) || 0;
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
  const handleTimeChange = (event) => {
    const selectedTime12h = event.target.value;
    // console.log(`Setting time to ${selectedTime12h}`);

    const selectedTime24h = convert12HourTo24Hour(selectedTime12h);
    // console.log(`Converted time to 24-hour format: ${selectedTime24h}`);

    const minTime = selectedMin;
    const maxTime = selectedMax;
    setMaxTime(maxTime);
    setMinTime(minTime);

    // console.log("Selected Date:", selectedDate);

    handleTimeSelection(selectedTime24h, selectedDate, minTime, maxTime); // Pass selectedDate

    // Rest of your code...
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

  const handleTimeSelection = (
    selectedTime,
    selectedDate,
    minTime,
    maxTime
  ) => {
    // console.log(selectedTime, selectedDate, minTime, maxTime);
    const selectedT = new Date(`${selectedDate}T${selectedTime}`);
    setselectedTimeDate(selectedT);
    const minTimeDate = new Date(`${selectedDate}T${minTime}`);
    const maxTimeDate = new Date(`${selectedDate}T${maxTime}`);
    // console.log(selectedT);
    // console.log(minTimeDate, maxTimeDate);
    if (selectedT < minTimeDate || selectedT > maxTimeDate) {
      // console.log("entered");
      setCheckTime(true);
      setTimeRangeError(true);
      // Reset the time to the initial state or do nothing
      document.getElementById("time").value = minTime;
    } else {
      // console.log("adssssssentered");
      setTimeRangeError(false);
      setCheckTime(false);
      setTime(selectedTime);
      // console.log("handleTimeSelection", selectedTime);
      matchInputWithBusySlots(selectedDate, selectedTime, busyTimeSlots);
    }
  };
  useEffect(() => {
    // Extract all requester emails from scheduleEvents
    const requesterEmails = scheduleEvents
      .map((event) => event?.requester) // Extract requester email if it exists
      .filter((email) => email); // Filter out undefined or empty emails

    // Filter out the students whose email matches any of the requester emails
    const filtered = students.filter(
      (student) => !requesterEmails.includes(student.email)
    );

    setFilteredStudents(filtered);
  }, [students, scheduleEvents]);

  // console.log("Filtered Students: ", filteredStudents);
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
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
        // console.log(options);
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

    // console.log("Busy Time Slots:", busyTimeSlots);

    setBusyTimeSlots(busyTimeSlots);
  }, [selectedC, matching, adminCalendarInfo]);

  const generateTimeOptions = () => {
    const options = [];
    const minTime = selectedMin;
    const maxTime = selectedMax;

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
  const addEvent = async () => {
    if (checkTime) {
      Swal.fire({
        icon: "error",
        title: "Invalid time!",
        text: `Please choose a time between ${minTime} and ${maxTime}.`,
      });
    } else {
      // console.log("select date", date);
      // console.log("select time", time);
      if (date && time) {
        Loading();
        // console.log("iamin");
        const selectedTimeDatee = new Date(`${date}T${time}`); // Keep the Z for UTC
        // console.log("selected time date", selectedTimeDatee);
        const endDateTimeUTC = new Date(selectedTimeDatee);
        endDateTimeUTC.setUTCMinutes(
          endDateTimeUTC.getUTCMinutes() + Number(durationMeeting)
        );
        // console.log("end time", endDateTimeUTC);
        const currentDateTime = new Date();
        const timeDifferenceInMilliseconds =
          selectedTimeDatee.getTime() - currentDateTime.getTime();
        const eventStartTime = formatDateTimeWithTimeZones(selectedTimeDatee);
        const eventEndTime = formatDateTimeWithTimeZones(endDateTimeUTC);
        // console.log("event s ", eventStartTime);
        // console.log("event e ", eventEndTime);
        // console.log("difference ", timeDifferenceInMilliseconds);
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
        if (meetingmedium === "Meet") {
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
                summary: `${selectedStudent?.name} ${calendarSubjectName}`,
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
                  { email: selectedStudent.email },
                  { email: selectedAdmin },
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
              // if (isReschedule && eventId) {
              //   const updatedEvent = {
              //     start: {
              //       dateTime: selectedTimeDatee.toISOString(),
              //       timeZone: "UTC",
              //     },
              //     end: {
              //       dateTime: endDateTimeUTC.toISOString(),
              //       timeZone: "UTC",
              //     },
              //     // Add other event properties as needed
              //   };
              //   var rrescheduledEvent = {
              //     title: `${selectedStudent?.name ? selectedStudent?.name : userInfo?.name} ${calendarSubjectName} `,
              //     start: {
              //       dateTime: selectedTimeDatee,
              //       timeZone: "UTC",
              //     },
              //     end: {
              //       dateTime: endDateTimeUTC,
              //       timeZone: "UTC",
              //     },
              //     organization: {
              //       organizationId: userInfo?.organizationId,
              //       organizationName: userInfo?.organizationName,
              //     },
              //     attendees: [
              //       // { email: "naman.j@experimentlabs.in" },
              //       // { email: "gaurav@experimentlabs.in" },
              //       { email: requesterStd ? requesterStd : user?.email },
              //       // { email: "alrafi4@gmail.com" },
              //       {
              //         email: adminMail,
              //       },
              //     ],
              //     // Assuming "weekData" is something specific to your application and not part of the standard Calendar API response
              //     weekData: currentWeek,
              //     hangoutLink: data.hangoutLink, // Access directly from data
              //     requester: requesterStd ? requesterStd : user?.email,
              //     studentName: selectedStudent?.name ? selectedStudent?.name : userInfo?.name,
              //     eventId: eventId,
              //     taskId: taskId,
              //     courseName: course?.courseFullName,
              //     batchName: taskData?.batches[0]?.batchName,
              //     executionMentors: userInfo?.executionMentors ? userInfo?.executionMentors : executionMentors,
              //     // Access directly from data
              //   };
              //   rrescheduledEvent.start_time = rrescheduledEvent?.start?.dateTime?.toISOString();

              //   // Output the modified rrescheduledEvent object to verify the new field addition
              //   console.log(rrescheduledEvent);
              //   const InfoCalendar = { email: adminCalendarInfo?.email?.email, event: rrescheduledEvent };
              //   console.log({ calendarInfo: InfoCalendar });
              //   const newSchedule = await axios.put(
              //     `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
              //     { calendarInfo: InfoCalendar }
              //   );
              //   console.log(newSchedule);
              //   if (newSchedule?.data?.data?.success === false) {
              //     if (newSchedule?.data?.message === 'Requested slot has been booked!') {
              //       Loading().close();
              //       await Swal.fire({
              //         icon: "error",
              //         title: "Oops...",
              //         text: "Requested slot has been booked! Please try another slot.",
              //       });
              //     }
              //     else if (newSchedule?.data?.message === 'Calendar info not found!') {
              //       Loading().close();
              //       await Swal.fire({
              //         icon: "error",
              //         title: "Oops...",
              //         text: "Calendar info not found! Please try again.",
              //       });
              //     }
              //     else {
              //       Loading().close();
              //       await Swal.fire({
              //         icon: "error",
              //         title: "Oops...",
              //         text: "Something went wrong! Please try again.",
              //       });
              //     }
              //   }
              //   else {
              //     fetch(
              //       `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${eventId}?sendUpdates=none`,
              //       {
              //         method: "PATCH", // Method to update the event
              //         headers: {
              //           Authorization: `Bearer ${newAccessToken}`,
              //           "Content-Type": "application/json",
              //         },
              //         body: JSON.stringify(updatedEvent),
              //       }
              //     )
              //       .then((response) => response.json()) // Convert the response to JSON
              //       .then(async (data) => {
              //         console.log("Event updated:", data);
              //         var rescheduledEvent = {
              //           title: `${selectedStudent?.name ? selectedStudent?.name : userInfo?.name
              //             } ${calendarSubjectName} `,
              //           start: {
              //             dateTime: selectedTimeDatee,
              //             timeZone: "UTC",
              //           },
              //           end: {
              //             dateTime: endDateTimeUTC,
              //             timeZone: "UTC",
              //           },
              //           organization: {
              //             organizationId: userInfo?.organizationId,
              //             organizationName: userInfo?.organizationName,
              //           },
              //           attendees: [
              //             // { email: "naman.j@experimentlabs.in" },
              //             // { email: "gaurav@experimentlabs.in" },
              //             { email: requesterStd ? requesterStd : user?.email },
              //             // { email: "alrafi4@gmail.com" },
              //             {
              //               email: adminMail,
              //             },
              //           ],
              //           // Assuming "weekData" is something specific to your application and not part of the standard Calendar API response
              //           weekData: currentWeek,
              //           hangoutLink: data.hangoutLink, // Access directly from data
              //           requester: requesterStd ? requesterStd : user?.email,
              //           studentName: selectedStudent?.name ? selectedStudent?.name : userInfo?.name,
              //           eventId: eventId,
              //           taskId: taskId,
              //           courseName: course?.courseFullName,
              //           batchName: batchName,
              //           executionMentors: userInfo?.executionMentors ? userInfo?.executionMentors : executionMentors,
              //           // Access directly from data
              //         };

              //         console.log(eventDBid);
              //         const updateResponse = await axios.put(
              //           `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/${eventDBid}`,
              //           rescheduledEvent
              //         );
              //         // const updateResponse = await axios.put(
              //         //   `${process.env.REACT_APP_SERVER_API}/api/v1/events/${eventDBid}`,
              //         //   {
              //         //     "title": "Tanvir Sohan <> Experiment Labs <> Doubt clearing <> ",
              //         //     "start": {
              //         //       "dateTime": "2024-04-09T07:00:00.000Z",
              //         //       "timeZone": "UTC"
              //         //     },
              //         //     "end": {
              //         //       "dateTime": "2024-04-09T08:00:00.000Z",
              //         //       "timeZone": "UTC"
              //         //     },
              //         //     "organization": {
              //         //       "organizationId": "64cbbd756f0ef101bc957231",
              //         //       "organizationName": "Shihab International"
              //         //     },
              //         //     "attendees": [
              //         //       {
              //         //         "email": "so2han67@gmail.com"
              //         //       },
              //         //       {
              //         //         "email": "team32programming@gmail.com"
              //         //       }
              //         //     ],
              //         //     "weekData": null,
              //         //     "hangoutLink": "https://meet.google.com/rgf-dvvc-bxh",
              //         //     "requester": "so2han67@gmail.com",
              //         //     "eventId": "0kh2gidugamp50s33mpm0cto24"
              //         //   }
              //         // );

              //         console.log("res ", updateResponse?.data);
              //         if (updateResponse?.data?.acknowledged) {
              //           const sendMail = await axios.post(
              //             `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
              //             {
              //               //  from: `${userInfo?.email}`,
              //               //    to: `${user?.email},${adminMail}`,
              //               to: `${requesterStd ? requesterStd : user?.email}`,
              //               templateType: "emailAction",
              //               templateName: "resheduleTaskStudent",
              //               organizationId: userInfo?.organizationId,
              //               learner_name: userInfo?.name,
              //               schedule_name: taskData?.taskName,
              //               start_time: eventStartTime,
              //               end_time: eventEndTime,
              //               meeting_link: rescheduledEvent?.hangoutLink,
              //               admin_name: adminName,
              //               site_email: adminMail,
              //               meeting_date: date,
              //               /*  subject: `Event request`,
              //               message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
              //                 }`, */
              //             }
              //           );
              //           const sendMailAdmin = await axios.post(
              //             `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
              //             {
              //               //  from: `${userInfo?.email}`,
              //               //    to: `${user?.email},${adminMail}`,
              //               to: `${adminMail}`,
              //               templateType: "emailAction",
              //               templateName: "resheduleTask",
              //               organizationId: userInfo?.organizationId,
              //               start_time: eventStartTime,
              //               end_time: eventEndTime,
              //               meeting_link: rescheduledEvent?.hangoutLink,
              //               learner_name: selectedStudent?.name ? selectedStudent?.name : userInfo?.name,
              //               learner_email: requesterStd
              //                 ? requesterStd
              //                 : user?.email,
              //               meeting_date: date,
              //               /*  subject: `Event request`,
              //               message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
              //                 }`, */
              //             }
              //           );

              //           if (userInfo?.role === "admin") {
              //             const newNotification = await axios.post(
              //               `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
              //               {
              //                 message: `${userInfo?.name} rescheduled an event of schedule task "${taskData?.taskName}" in course ${course?.courseFullName}`,
              //                 dateTime: new Date(),
              //                 recipient: {
              //                   type: "Specific Student",
              //                   recipientEmail: requesterStd,
              //                   organizationId: userInfo?.organizationId,
              //                 },
              //                 type: "Event",
              //                 readBy: [],
              //                 triggeredBy: user?.email,
              //                 redirectLink: `/taskDetails/${taskData?._id}?taskType=Schedule`,
              //               }
              //             );
              //             console.log(newNotification);
              //           } else {
              //             const newNotification = await axios.post(
              //               `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
              //               {
              //                 message: `${userInfo?.name} of ${batch[0]?.batchName} batch ${course?.courseFullName} course rescheduled an event of schedule task ${taskData?.taskName}.`,
              //                 dateTime: new Date(),
              //                 recipient: {
              //                   type: "Admins",
              //                   organizationId: userInfo?.organizationId,
              //                 },
              //                 type: "Event",
              //                 readBy: [],
              //                 triggeredBy: user?.email,
              //                 redirectLink: `/taskDetails/${taskData?._id}?taskType=Schedule`,
              //               }
              //             );
              //             console.log(newNotification);
              //           }
              //           console.log("send ", sendMail);
              //           console.log("Admin Mail ", sendMailAdmin);
              //           if (
              //             sendMail?.data?.success &&
              //             sendMailAdmin?.data?.success
              //           ) {
              //             console.log({
              //               ...rescheduledEvent,
              //               eventDBid: eventDBid,
              //             });
              //             const newRescheduleEvent = await axios.put(
              //               `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/${taskData?._id}/updateEvent`,
              //               { ...rescheduledEvent, eventDBid: eventDBid }
              //             );
              //             console.log(newRescheduleEvent);

              //             const filteredEvent = relevantEvents?.filter(
              //               (item) => item?.eventId !== rescheduledEvent?.eventId
              //             );
              //             const calendarInfo = { ...adminCalendarInfo };
              //             calendarInfo.events = [
              //               ...filteredEvent,
              //               { ...rescheduledEvent, eventDBid: eventDBid },
              //             ];
              //             // rescheduledEvent.start_time = rescheduledEvent?.start?.dateTime?.toISOString();

              //             // // Output the modified rescheduledEvent object to verify the new field addition
              //             // console.log(rescheduledEvent);
              //             // delete calendarInfo._id;
              //             // console.log(calendarInfo);
              //             // const InfoCalendar = { email: calendarInfo?.email, event: rescheduledEvent };
              //             // console.log({ calendarInfo: InfoCalendar });
              //             // const newSchedule = await axios.put(
              //             //   `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
              //             //   { calendarInfo: InfoCalendar }
              //             // );
              //             // console.log(newSchedule);
              //             // console.log("new event created ", newEvent);
              //             Loading().close();
              //             await Swal.fire({
              //               icon: "success",
              //               title: "Event Rescheduled!",
              //               text: "The event has been successfully rescheduled.",
              //             });
              //             navigate("/courseAccess");
              //           }
              //         }

              //         // Other UI updates or state resets after successful rescheduling
              //       })
              //       .catch((error) => {
              //         console.error("Error updating event:", error);
              //         // Handle error
              //       });
              //   }
              // }
              function initiate() {
                const sendData = async (event) => {
                  event.start_time = event?.start?.dateTime?.toISOString();
                  const InfoCalendar = {
                    email: adminCalendarInfo?.email,
                    event: event,
                  };
                  // console.log({ calendarInfo: InfoCalendar });
                  const newSchedule = await axios.put(
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
                    { calendarInfo: InfoCalendar }
                  );
                  // console.log(newSchedule);
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
                          to: `${selectedStudent?.email}`,
                          templateType: "emailAction",
                          templateName: "sheduleTaskStudent",
                          organizationId: selectedStudent?.organizationId,
                          learner_name: selectedStudent?.name,
                          schedule_name: selectedSchedule,
                          start_time: eventStartTime,
                          end_time: eventEndTime,
                          meeting_link: event?.hangoutLink,
                          admin_name: adminName,
                          site_email: selectedAdmin,
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
                          to: `${selectedAdmin}`,
                          templateType: "emailAction",
                          templateName: "sheduleTask",
                          schedule_name: selectedSchedule,
                          organizationId: selectedStudent?.organizationId,
                          start_time: eventStartTime,
                          end_time: eventEndTime,
                          meeting_link: event?.hangoutLink,
                          learner_name: selectedStudent?.name,
                          learner_email: selectedStudent?.email,
                          meeting_date: date,
                          /*  subject: `Event request`,
                          message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                            }`, */
                        }
                      );

                      const newNotification = await axios.post(
                        `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
                        {
                          message: `${selectedStudent?.name} of ${selectedBatch} batch ${selectedC} course booked an event of schedule task ${idSchedule}.`,
                          dateTime: new Date(),
                          recipient: {
                            type: "Admins",
                            organizationId: selectedStudent?.organizationId,
                          },
                          type: "Event",
                          readBy: [],
                          triggeredBy: selectedStudent?.email,
                          redirectLink: `/taskDetails/${idSchedule}?taskType=Schedule`,
                        }
                      );
                      // console.log(newNotification);
                      // console.log("send ", sendMail);
                      if (
                        sendMail?.data?.success &&
                        sendMailAdmin?.data?.success
                      ) {
                        const newEvent = await axios.post(
                          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/${idSchedule}/addEvent`,
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

                        navigate(-1);
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
                      // console.log(response);
                      var event = {
                        title: `${selectedStudent?.name} ${calendarSubjectName}`,
                        start: {
                          dateTime: selectedTimeDatee,
                          timeZone: "UTC",
                        },
                        end: {
                          dateTime: endDateTimeUTC,
                          timeZone: "UTC",
                        },
                        organization: {
                          organizationId: selectedStudent?.organizationId,
                          organizationName: selectedStudent?.organizationName,
                        },
                        attendees: [
                          // { email: "naman.j@experimentlabs.in" },
                          // { email: "gaurav@experimentlabs.in" },
                          {
                            email: selectedStudent?.email,
                          },
                          // { email: "alrafi4@gmail.com" },
                          {
                            email: selectedAdmin,
                          },
                        ],
                        weekData: idWeek,
                        hangoutLink: response?.result?.hangoutLink,
                        requester: selectedStudent?.email,
                        studentName: selectedStudent?.name,
                        eventId: response?.result?.id,
                        taskId: idSchedule,
                        courseName: selectedC,
                        batchName: selectedBatch,
                        executionMentors: selectedStudent?.executionMentors,
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
        } else if (meetingmedium === "Zoom") {
          try {
            Loading();
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
            // console.log("Formatted for Zoom (local time):", formattedDateTime);
            const zoomSchedule = {
              start_time: formattedDateTime,
              duration: durationMeeting,
              studentName: selectedStudent?.name,
              courseName: selectedC,
            };
            let localDate = new Date(formattedDateTime);

            // Add 30 minutes to the localDate
            localDate.setMinutes(localDate.getMinutes() + 30);

            // Convert the updated local date to UTC string without milliseconds
            const formattedDateTimeUTC =
              localDate.toISOString().split(".")[0] + "Z";

            // console.log("Formatted for Zoom UTC:", formattedDateTimeUTC);
            const matchObject = {
              start_time: formattedDateTimeUTC,
              requester: selectedStudent?.email,
              scheduleId: idSchedule,
            };
            const emailobject = {
              email: adminCalendarInfo?.email,
              event: matchObject,
            };
            Loading();
            const checkScheduleCalendar = await axios.post(
              `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/matchEvents`,
              emailobject,
              { timeout: 10000 }
            );
            // console.log(checkScheduleCalendar?.data?.message);
            if (checkScheduleCalendar?.data?.message === "You can request") {
              Loading();
              const newZoomSchedule = await axios.post(
                `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/meeting/organizationId/${selectedStudent?.organizationId}`,
                zoomSchedule,
                { timeout: 10000 }
              );
              if (newZoomSchedule?.data?.uuid) {
                // console.log("zoom schedule ", newZoomSchedule?.data);
                const {
                  id,
                  topic,
                  start_time,
                  created_at,
                  join_url,
                  start_url,
                  timezone,
                  duration,
                } = newZoomSchedule?.data;

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
                // console.log("meeting start date: ", meetingStart);
                // console.log("meeting end date: ", meetingEnd);
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
                // console.log(formattedDate);
                // console.log(formattedEndTime);
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
                      timezone,
                      duration,
                      summary: `${selectedStudent?.name} ${calendarSubjectName}`,
                      requester: selectedStudent?.email,
                      studentName: selectedStudent?.name,
                      organization: {
                        organizationId: selectedStudent?.organizationId,
                        organizationName: selectedStudent?.organizationName,
                      },
                      meetingType: "Zoom",
                      scheduleId: idSchedule,
                      weekId: idWeek,
                      courseName: selectedC,
                      batchName: selectedBatch,
                      executionMentors: selectedStudent?.executionMentors,
                    };
                    const InfoCalendar = {
                      email: adminCalendarInfo?.email,
                      event: postingData,
                    };
                    // console.log({ calendarInfo: InfoCalendar });
                    const newSchedule = await axios.put(
                      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/calenderInfo/events`,
                      { calendarInfo: InfoCalendar },
                      { timeout: 10000 }
                    );
                    // console.log("info ", newSchedule);
                    // Step 1: Prepare Google Calendar event data
                    const event = {
                      summary: `${selectedStudent?.name} ${calendarSubjectName}`,
                      description: `Join Zoom Meeting: ${window.location.origin}/taskDetails/${idSchedule}?taskType=Schedule`,
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
                        { email: selectedStudent?.email },
                        { email: selectedAdmin },
                        { email: syncedMail },
                      ],
                      reminders: {
                        useDefault: true,
                      },
                    };

                    try {
                      if (newSchedule?.data?.success) {
                        const response = await gapi.client.request({
                          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?conferenceDataVersion=1&sendUpdates=none`,
                          method: "POST",
                          body: JSON.stringify(event),
                          headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${newAccessToken}`,
                          },
                        });
                        // console.log(
                        //   "Google Calendar event created successfully:",
                        //   response
                        // );
                        const calendarEventId = response.result.id;
                        if (calendarEventId) {
                          const newpostData = {
                            id: newZoomSchedule?.data?.id,
                            host_email: newZoomSchedule?.data?.host_email,
                            start_time: newZoomSchedule?.data?.start_time,
                            duration: newZoomSchedule?.data?.duration,
                            join_url: studentUrl,
                            topic: `Session with ${selectedStudent?.name} on ${selectedC}`,
                            summary: `${selectedStudent?.name} ${calendarSubjectName}`,
                            requester: selectedStudent?.email,
                            studentName: selectedStudent?.name,
                            organization: {
                              organizationId: selectedStudent?.organizationId,
                              organizationName:
                                selectedStudent?.organizationName,
                            },
                            weekId: idWeek,
                            googleCalendarId: calendarEventId,
                            meetingType: "Zoom",
                            scheduleId: idSchedule,
                            courseName: selectedC,
                            batchName: selectedBatch,
                            executionMentors: selectedStudent?.executionMentors,
                          };

                          const response = await axios.post(
                            // `${process.env.REACT_APP_BACKEND_API}/events`,
                            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events`,
                            newpostData,
                            { timeout: 10000 }
                          );
                          // console.log("event response ", response);

                          if (response?.data?.acknowledged) {
                            const postData = {
                              id, // Zoom meeting ID
                              topic, // Zoom meeting topic
                              start_time, // Zoom meeting start time
                              created_at, // When the Zoom meeting was created
                              join_url, // URL for participants to join
                              start_url, // URL for the host to start the meeting
                              timezone,
                              duration,
                              summary: `${selectedStudent?.name} ${calendarSubjectName}`,
                              requester: selectedStudent?.email,
                              studentName: selectedStudent?.name,
                              organization: {
                                organizationId: selectedStudent?.organizationId,
                                organizationName:
                                  selectedStudent?.organizationName,
                              },
                              meetingType: "Zoom",
                              scheduleId: idSchedule,
                              weekId: idWeek,
                              courseName: selectedC,
                              batchName: selectedBatch,
                              googleCalendarId: calendarEventId,
                              eventDBid: response?.data?.insertedId,
                              executionMentors:
                                selectedStudent?.executionMentors,
                            };
                            // Step 4: Update database with Google Calendar event details
                            const newEvent = await axios.post(
                              `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/${idSchedule}/addEvent`,
                              postData,
                              { timeout: 10000 }
                            );
                            // console.log("new event ", newEvent);
                            if (newEvent?.data?.acknowledged) {
                              const sendMail = await axios.post(
                                `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                                {
                                  //  from: `${userInfo?.email}`,
                                  //    to: `${user?.email},${adminMail}`,
                                  to: `${selectedStudent?.email}`,
                                  templateType: "emailAction",
                                  templateName: "sheduleTaskStudent",
                                  organizationId:
                                    selectedStudent?.organizationId,
                                  learner_name: selectedStudent?.name,
                                  schedule_name:
                                    fullEventData?.scheduleName ||
                                    fullEventData?.taskName,
                                  start_time: formattedStartTime,
                                  end_time: formattedEndTime,
                                  meeting_link: `${window.location.origin}/taskDetails/${idSchedule}?taskType=Schedule`,
                                  admin_name: adminName,
                                  site_email: syncedMail,
                                  meeting_date: formattedDate,
                                  /*  subject: `Event request`,
                                  message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                                    }`, */
                                }
                              );
                              // console.log("std mail ", sendMail);
                              const sendMailAdmin = await axios.post(
                                `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                                {
                                  //  from: `${userInfo?.email}`,
                                  //    to: `${user?.email},${adminMail}`,
                                  to: `${syncedMail}`,
                                  templateType: "emailAction",
                                  templateName: "sheduleTask",
                                  schedule_name: selectedSchedule,
                                  organizationId:
                                    selectedStudent?.organizationId,
                                  start_time: formattedStartTime,
                                  end_time: formattedEndTime,
                                  meeting_link: adminUrl,
                                  schedule_name:
                                    fullEventData?.scheduleName ||
                                    fullEventData?.taskName,
                                  learner_name: selectedStudent?.name,
                                  learner_email: selectedStudent?.email,
                                  meeting_date: formattedDate,
                                  /*  subject: `Event request`,
                                  message: `A event is going to held for doubt clearing starting at ${eventStartTime} and ends at ${eventEndTime}. Meeting link ${event?.hangoutLink
                                    }`, */
                                }
                              );
                              // console.log("admin mail ", sendMailAdmin);

                              const newNotification = await axios.post(
                                `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
                                {
                                  message: `${selectedStudent?.name} of ${selectedBatch} batch ${selectedC} course booked an event of schedule task ${selectedSchedule}.`,
                                  dateTime: new Date(),
                                  recipient: {
                                    type: "Admins",
                                    organizationId:
                                      selectedStudent?.organizationId,
                                  },
                                  type: "Event",
                                  readBy: [],
                                  triggeredBy: selectedStudent?.email,
                                  // redirectLink: `/taskDetails/${idSchedule}?taskType=Schedule`,
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
                                  text: "Meeting is confirmed. Please check your email to access the Zoom link",
                                });
                                navigate(-1);
                              }
                            }
                          }
                        }
                      }
                    } catch (error) {
                      console.error("An error occurred:", error);
                      // console.log(error?.response?.data?.message);
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

                  gapi.load("client", initiate);
                } catch (error) {
                  console.error("An error occurred:", error);
                  // console.log(error?.response?.data?.message);
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
            } else if (
              checkScheduleCalendar?.data?.message ===
              "Requested slot has been booked!"
            ) {
              Loading().close();
              await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Requested slot has been booked! Please try another slot.",
              });
            } else if (
              checkScheduleCalendar?.data?.message ===
              "Calendar info not found!"
            ) {
              Loading().close();
              await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Calendar info not found!",
              });
            }
            Loading().close();
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
    // console.log(meetingStart);
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
  // console.log("schedule ", scheduleEvents);
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
      const reservedStart = new Date(reservedEvent?.start);
      const reservedEnd = new Date(reservedEvent?.end);

      return (
        timeSlot.getTime() >= reservedStart?.getTime() &&
        timeSlot.getTime() < reservedEnd?.getTime()
      );
    }
    return false;
  };
  const handleDeleteSchedule = async (id) => {
    // console.log("clicked");
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/schedule/taskId/${id}`
    );
    // console.log(res);
    if (res.data.result.acknowledged) {
      Swal.fire({
        title: "Deleted successfully!",
        icon: "success",
      });
      navigate(-1);
    }
  };
  const handleDialogClose = () => {
    // Your logic here to handle state change when dialog is closed
    // console.log("Dialog closed");
    setPicked(false);
    // Add any state changes you want to handle here
  };
  return (
    <div>
      <DialogLayoutForFromControl
        open={addBookOpen}
        setOpen={setAddBookOpen}
        onClose={handleDialogClose}
        width={800}
        title={
          <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
            Book Schedule
          </p>
        }
      >
        <div className="mx-auto">
          <form className="  mt-12">
            {/* <div
                            className="select-option flex items-center gap-[40px]"
                            onClick={toggleDropdownGeneral}
                        >
                            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                                1
                            </h1>
                            <p className="text-[25px] font-bold">General </p>
                            {!isOpenGeneral && (
                                <img
                                    className="w-6"
                                    src={arrowright}
                                    alt="right arrow icon"
                                ></img>
                            )}

                            {isOpenGeneral && (
                                <img src={arrowDown} alt="down arrow icon"></img>
                            )}

                            <i
                                className={`dropdown-arrow ${isOpenGeneral ? "open" : ""}`}
                            ></i>
                        </div> */}
            {isOpenGeneral && (
              <div className="dropdown-menu mt-[71px] mb-[45px] border-b-2  ">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-20">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Schedule Name
                      </p>
                    </div>
                    <input
                      className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="selectedSchedule"
                      type="text"
                      placeholder="selectedSchedule"
                      value={selectedSchedule}
                      readOnly={true}
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Course Name</p>
                    </div>
                    <input
                      className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="selectedC"
                      type="text"
                      placeholder="course name"
                      value={selectedC}
                      readOnly={true}
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">BatchName</p>
                    </div>
                    <input
                      className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="selectedBatch"
                      type="text"
                      placeholder="selectedBatch"
                      value={selectedBatch}
                      readOnly={true}
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Select Student
                      </p>
                      <img src={required} alt="required" />
                    </div>
                    <select
                      className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      defaultValue=""
                      onChange={(e) => {
                        const student = filteredStudents.find(
                          (c) => c._id === e.target.value
                        );
                        setSelectedStudent(student);
                        setPicked(true);
                      }}
                    >
                      <option value="">Select</option>
                      {filteredStudents.map((std) => (
                        <option key={std._id} value={std._id}>
                          {std.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-start mt-[50px] mb-8 lg:gap-40 gap-10">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg">Minimum Time</p>
                    </div>

                    <input
                      className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="minimum"
                      type="text"
                      placeholder="minimum"
                      value={convertTo12Hour(selectedMin)}
                      readOnly
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        {" "}
                        Maximum Time
                      </p>
                    </div>

                    <input
                      value={convertTo12Hour(selectedMax)}
                      required
                      className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="maximum"
                      type="text"
                      placeholder="maximum"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {/*  {isOpenEvaluationParameter && (
            <div className="dropdown-menu mt-[71px] mb-[45px] ">
              {orgData?.showSkillsManagement && (
                <SkillBasedParameter
                  selectedData={skillParameterData}
                  setSelectedData={setSkillParameterData}
                  categories={skillCategories}
                />
              )}
              {orgData?.showPointsAndRedemptions && (
                <ItemEarningParameter
                  selectedData={earningParameterData}
                  setSelectedData={setEarningParameterData}  const handleDeleteOffer = async (id) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/offers/${id}`
    );
    if (res.data.success) {
      getAllOffers();
      Swal.fire({
        title: "New Offer Deleted successfully!",
        icon: "success",
      });
    }
  };
                  categories={earningCategories}
                />
              )}
            </div>
          )} */}

            <div className="flex items-center justify-center mt-20 mb-10">
              <input
                type="button"
                value="Delete"
                onClick={() => handleDeleteSchedule(idSchedule)}
                className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
              />
            </div>
          </form>
          {picked && (
            <div className="mt-10 flex justify-items-center justify-center">
              <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
                <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[25px]">
                  Request {meetingmedium} slot
                </h1>
                <div
                  style={{
                    filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                  }}
                  className="bg-[#0E2749]  w-full h-[400px] rounded-[14px] py-[15px] px-[15px] mb-10 lg:p-[30px] flex flex-col justify-center items-center gap-5"
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
                              Please choose a time between {minTime} and{" "}
                              {maxTime}.
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
            </div>
          )}
        </div>
      </DialogLayoutForFromControl>
    </div>
  );
};

export default ExecutionMentorBookSchedule;
