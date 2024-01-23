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


let matching = false;
const matchInputWithBusySlots = (inputDate, inputTime, busyTimeSlots) => {
  let flag = 0;
  const inputDateTime = new Date(`${inputDate}T${inputTime}`);
  console.log('Input DateTime:', inputDateTime);

  // Extract date and time separately
  const inputDateString = inputDateTime.toDateString();
  const inputTimeString = inputDateTime.toTimeString();



  const isMatch = busyTimeSlots.some((busySlot) => {
    const busyStartDateTimeString = busySlot.start.dateTime;
    const busyEndDateTimeString = busySlot.end.dateTime;
    // console.log("busystart",busyStartDateTimeString);
    const busyStartDateString = busyStartDateTimeString.substring(0, 16).replace(',', '');
    const dateParts = busyStartDateString.split(' ');
    const busyStartDateStringFormatted = `${dateParts[0]} ${dateParts[2][0].toUpperCase() + dateParts[2].substring(1)} ${dateParts[1]} ${dateParts[3]}`;
    console.log('Input Date:', inputDateString);
    console.log('Busy Date:', busyStartDateStringFormatted);
    if (inputDateString === busyStartDateStringFormatted) {
      flag = 1;
    }
    const busyStartTime = busyStartDateTimeString.split(' ')[4];
    console.log('busy start: ', busyStartTime);
    const busyEndTime = busyEndDateTimeString.split(' ')[4];
 
    console.log(flag);
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
  console.log(adminMail);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [busyTimeSlots, setBusyTimeSlots] = useState([]);
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
    matchInputWithBusySlots(event.target.value, time, busyTimeSlots);
  };

  // Update the time state when the time input changes
  const handleTimeChange = (event) => {
    setTime(event.target.value);
    console.log("handletimechange", event.target.value);
    matchInputWithBusySlots(date, event.target.value, busyTimeSlots);
  };

  useEffect(() => {
    const busyTimeSlots = taskData?.events?.map((event) => {
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
    }).filter(Boolean);

    console.log("Busy Time Slots:", busyTimeSlots); // Log the busy time slots

    // Assuming week.start and week.end are available as Date objects
    const allTimeSlots = generateAllTimeSlots(week.start, week.end);

    console.log("All Time Slots:", allTimeSlots); // Log all time slots

    const filteredTimeSlots = filterBusyTimeSlots(allTimeSlots, busyTimeSlots, reservedEvent);

    console.log("Filtered Time Slots:", filteredTimeSlots); // Log the filtered time slots

    setBusyTimeSlots(busyTimeSlots);
    setAvailableTimeSlots(filteredTimeSlots);
  }, [taskData,matching]);


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
  const filterBusyTimeSlots = (allTimeSlots, busyTimeSlots, reservedEvent) => {
    return allTimeSlots.filter((timeSlot) => {
      // Check if the time slot is within any busy time slots
      for (const busySlot of busyTimeSlots) {
        if (timeSlot >= busySlot.start && timeSlot < busySlot.end) {
          return false; // Remove busy time slots
        }
      }

      // Check if the time slot matches the reserved event's time slot
      if (reservedEvent && timeSlot >= reservedEvent.start && timeSlot < reservedEvent.end) {
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

  const handleTimeSlotSelection = (timeSlot) => {
    // Check if the selected time slot falls within any busy time slots
    const isBusy = isTimeSlotBusy(timeSlot);

    if (isBusy) {
      // Additional logic to handle when the selected time slot is busy
      // For example, you can show a message or disable the button
      console.log("Selected time slot is busy");
    } else if (isTimeSlotReserved(timeSlot)) {
      // Additional logic to handle when the selected time slot is reserved
      // For example, you can show a message or disable the button
      console.log("Selected time slot is reserved");
    } else {
      // Logic to handle when the selected time slot is available
      // For example, you can update the UI or perform other actions
      console.log("Selected time slot is available");

      // Here, you can perform actions for an available time slot, if needed
      setSelectedTimeSlot(timeSlot);
    }
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
  console.log("Available ", availableTimeSlots);

  const addEvent = async () => {
    if (date && time) {
      const combinedDateTimeUTC = new Date(`${date}T${time}Z`);
const endDateTimeUTC = new Date(combinedDateTimeUTC);
endDateTimeUTC.setMinutes(endDateTimeUTC.getMinutes() + 30);
      const currentDateTime = new Date();
      const timeDifferenceInMilliseconds = combinedDateTimeUTC - currentDateTime;
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
              dateTime: combinedDateTimeUTC.toISOString(),
              timeZone: "UTC",
            },
            end: {
              dateTime: endDateTimeUTC.toISOString(),
              timeZone: "UTC",
            },
            // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              // { email: "naman.j@experimentlabs.in" },
              // { email: "gaurav@experimentlabs.in" },
              { email: user?.email },
              {
                email: adminMail
              },
              { email: "alrafi4@gmail.com" },
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
                  to: `${user?.email},shihab77023@gmail.com,alrafi4@gmail.com`,
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
                    start: new Date(combinedDateTimeUTC),
                    end: new Date(endDateTimeUTC),
                    organization: {
                      organizationId: userInfo?.organizationId,
                      organizationName: userInfo?.organizationName,
                    },
                    attendees: [
                      // { email: "naman.j@experimentlabs.in" },
                      // { email: "gaurav@experimentlabs.in" },
                      { email: user?.email },
                      { email: "alrafi4@gmail.com" },
                      {
                        email: adminMail
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
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  return (
    <div className="flex justify-center">
      <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
        <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[25px]">
          Request slots
        </h1>
        <div
          style={{
            filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
          }}
          className="bg-[#0E2749] w-full h-full rounded-[14px] py-[15px] px-[15px] mb-10 lg:p-[30px] flex flex-col justify-between items-center gap-5"
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
            <>
              { matching ? <><p className="text-white">Admin is Busy at that time</p>
              
              </> : <DashboardPrimaryButton
                bgColor="#3E4DAC"
                shadow="0px 6.32482px 0px #CA5F98"
                width="full"
                onClick={addEvent}
                disabled={!selectedTimeSlot || isTimeSlotBusy(selectedTimeSlot) || isTimeSlotReserved(selectedTimeSlot)}
              >
                <p className="flex items-center justify-center text-white">
                  Request Event{" "}
                  <img
                    className="pl-1 w-[21px] lg:w-[32px]"
                    src={RightArrowWhite}
                    alt="RightArrowBlack"
                  />
                </p>
              </DashboardPrimaryButton>}
            </>
          )}

        </div>
      </div>

    </div>
  );
};

export default ScheduleTask;
