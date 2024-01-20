import { AuthContext } from "../../../contexts/AuthProvider";
import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import DateTimePicker from "react-datetime-picker";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import RightArrowWhite from "../../../assets/Dashboard/RightArrowWhite.png";
import Swal from "sweetalert2";
import { gapi } from "gapi-script";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set the background color and opacity of the overlay
    zIndex: 1000, // Set a higher z-index value
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white', // Set the background color of the modal content
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    zIndex: 1001, // Set a higher z-index value
  },
};
const ScheduleTask = ({ taskData, week }) => {
  console.log("Task data ", taskData)
  const { user, userInfo } = useContext(AuthContext);
  if (userInfo.role !== 'admin') {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  };
 
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [date, setDate] = useState(""); // State for the date
  const [time, setTime] = useState(""); // State for the time
  const [reservedEvent, setReservedEvent] = useState(null);
  const [startTime, setStartTime] = useState();
  const [currentWeek, setCurrentWeek] = useState(null);
  const calendarID = process.env.REACT_APP_calendarID;

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Update the time state when the time input changes
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/events`)
      .then((response) => {
        console.log("API Response:", response.data); // Log the response data
        const busyTimeSlots = response?.data?.map((event) => {
          // Use the correct property for date and time based on the event structure
          const startDateTime = event.start.dateTime || event.start; 
          const endDateTime = event.end.dateTime || event.end;
        
          return {
            start: new Date(startDateTime),
            end: new Date(endDateTime),
          };
        });
  
        console.log("Busy Time Slots:", busyTimeSlots); // Log the busy time slots
  
        // Assuming week.start and week.end are available as Date objects
        const allTimeSlots = generateAllTimeSlots(week.start, week.end);
  
        console.log("All Time Slots:", allTimeSlots); // Log all time slots
  
        const filteredTimeSlots = filterBusyTimeSlots(allTimeSlots, busyTimeSlots);
  
        console.log("Filtered Time Slots:", filteredTimeSlots); // Log the filtered time slots
  
        setAvailableTimeSlots(filteredTimeSlots);
      })
      .catch((error) => console.error(error));
  }, [week]);
  const generateAllTimeSlots = (start, end) => {
    const timeSlots = [];
    let currentTime = new Date(start);

    while (currentTime <= end) {
      timeSlots.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 30); // Assuming 30-minute time slots
    }

    return timeSlots;
  };

  // Function to filter out busy time slots
  const filterBusyTimeSlots = (allTimeSlots, busyTimeSlots) => {
    return allTimeSlots.filter((timeSlot) => {
      for (const busySlot of busyTimeSlots) {
        if (timeSlot >= busySlot.start && timeSlot < busySlot.end) {
          return false; // Remove busy time slots
        }
      }
      return true; // Keep available time slots
    });
  };
  
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_API}/events`)
  //     .then((response) => {
  //       const findEvent = response?.data?.find(
  //         (item) =>
  //           item?.requester === user?.email &&
  //           item?.organization?.organizationId === userInfo?.organizationId &&
  //           item?.weekData?._id === week?._id
  //       );
  //       setReservedEvent(findEvent);
  //       setStartTime(new Date(findEvent?.start));
  //     })
  //     .catch((error) => console.error(error));
  // }, []);
console.log("Available ",availableTimeSlots);

  const addEvent = async () => {
    if (date && time) {
      const combinedDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(
        new Date(`${date}T${time}`).setMinutes(
          new Date(`${date}T${time}`).getMinutes() + 30
        )
      );
      const currentDateTime = new Date();
      const timeDifferenceInMilliseconds = combinedDateTime - currentDateTime;
      if (timeDifferenceInMilliseconds < 0) {
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
            summary: `${userInfo?.name} <> Experiment Labs`,
            location: "",
            start: {
              dateTime: combinedDateTime.toISOString(),
              timeZone: "UTC",
            },
            end: {
              dateTime: endDateTime.toISOString(),
              timeZone: "UTC",
            },
            // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              { email: "naman.j@experimentlabs.in" },
              { email: "gaurav@experimentlabs.in" },
              { email: user?.email },
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

          console.log(event)

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
                  from: `${user?.email}`,
                  to: `naman.j@experimentlabs.in,gaurav@experimentlabs.in,${user?.email},shihab77023@gmail.com`,
                  subject: `Event request`,
                  message: `A event is going to held for doubt clearing at ${event?.start.toLocaleString()} to ${event?.end.toLocaleTimeString()}. Meeting link ${event?.hangoutLink
                    }`,
                }
              );
              if (sendMail?.data?.Success && response?.data?.acknowledged) {
                Swal.fire({
                  icon: "success",
                  title: "Request Sent!",
                  text: "Your slot request has been sent!",
                });
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
                  var event = {
                    title: `${userInfo?.name} <> Experiment Labs <> Doubt clearing <> ${response?.result?.hangoutLink}`,
                    start: new Date(combinedDateTime),
                    end: new Date(endDateTime),
                    organization: {
                      organizationId: userInfo?.organizationId,
                      organizationName: userInfo?.organizationName,
                    },
                    attendees: [
                      { email: "naman.j@experimentlabs.in" },
                      { email: "gaurav@experimentlabs.in" },
                      { email: user?.email },
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
        })
        .catch((error) => {

          console.error("Token refresh error:", error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Date and time!",
        text: "Please enter valid date & time for event!",
      });
    }
  };
  ////////-----------------/////////////

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState({});
  const [eventDescription, setEventDescription] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  console.log(eventName);

  function renderEventContent(eventInfo) {
    // console.log(eventInfo);

    const formattedStartDate = eventInfo?.event?.start?.toLocaleTimeString();
    const formattedEndDate = eventInfo?.event?.end?.toLocaleTimeString();
    const meetlink = eventInfo?.event?.extendedProps?.link;
    return (
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'blue', // Set the background color of the event
          color: 'white', // Set the text color of the event
          borderRadius: '3px',
          paddingLeft: '2px',
          paddingRight: '2px',
        }}
      >
        <p className="w-2 bg-blue"></p>
        {/* <p>End time : {formattedEndDate}</p> */}
        {/* <h1>{eventInfo?.event?.status}</h1> */}
        {/* <p>Start time : {formattedStartDate}</p>
        <p>End time : {formattedEndDate}</p>
        <a target="_blank" href={meetlink} rel="noreferrer">Google Meet</a> */}
      </div>
    );
  }


  const handleDateClick = (date) => {
    setSelectedDate(date);
    setStart(date);
    setEnd(date);
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center">
      <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
        <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[32px]">
          Request slots
        </h1>
        <div
          style={{
            filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
          }}
          className="bg-[#0E2749] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5"
        >

          <div className="w-full relative">
            <p className="text-[#C0C0C0] text-[18px] font-[600] pb-[18px]">
              Date
            </p>
            <div className="relative inline-flex w-full">
              <input
                required
                defaultValue={reservedEvent?.start?.slice(0, 10)}
                onChange={handleDateChange}
                className=" text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                name="date"
                id="date"
                type="date"
              />
            </div>
            <p className="text-[#C0C0C0] text-[18px] font-[600] py-[18px]">
              Time
            </p>
            <div className="relative inline-flex w-full">
              <input
                required
                onChange={handleTimeChange}
                className=" text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                name="time"
                // defaultValue={() => {const startEvent = new Date(reservedEvent?.start)?toTimeString().slice(0, 8)}}
                defaultValue={startTime?.toTimeString().slice(0, 8)}
                id="time"
                type="time"
              />
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
            <DashboardPrimaryButton
              bgColor="#3E4DAC"
              shadow="0px 6.32482px 0px #CA5F98"
              width="full"
              onClick={addEvent}
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

        </div>
      </div>

    </div>
  );
};

export default ScheduleTask;
