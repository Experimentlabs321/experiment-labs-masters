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
  console.log(taskData?.usersession?.provider_token)
  const { user, userInfo } = useContext(AuthContext);
  if (userInfo.role !== 'admin') {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  };
  ///////////------------ shihab's code/////////////////

  console.log(week)

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
        const findEvent = response?.data?.find(
          (item) =>
            item?.requester === user?.email &&
            item?.organization?.organizationId === userInfo?.organizationId &&
            item?.weekData?._id === week?._id
        );
        setReservedEvent(findEvent);
        setStartTime(new Date(findEvent?.start));
      })
      .catch((error) => console.error(error));
  }, []);


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
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // const session = useSession();
  // console.log("session", session)
  // const supabase = useSupabaseClient();
  // const { isLoading } = useSessionContext();

  useEffect(() => {
    fetchAndDisplayGoogleCalendarEvents();
  }, []); // The empty dependency array ensures that this effect runs only once

  // if (isLoading) {
  //   return <></>;
  // }
  async function fetchGoogleCalendarEvents() {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + taskData?.usersession?.provider_token,
          // Access token for Google
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Google Calendar events");
    }

    const data = await response.json();
    console.log("data : ",data);
    return data.items || [];
  }

  async function fetchAndDisplayGoogleCalendarEvents() {
    try {
      const events = await fetchGoogleCalendarEvents();
      setCalendarEvents(events);
    } catch (error) {
      console.error(error.message);
    }
  }
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

  // async function createCalendarEvent() {
  //   console.log("Creating calendar event");
  //   const event = {
  //     'summary': eventName,
  //     'description': eventDescription,
  //     'start': {
  //       'dateTime': start.toISOString(),
  //       'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
  //     },
  //     'end': {
  //       'dateTime': end.toISOString(),
  //       'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
  //     }
  //   };

  //   try {
  //     const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
  //       method: "POST",
  //       headers: {
  //         'Authorization': `Bearer ${taskData?.usersession?.provider_token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(event),
  //     });

  //     console.log('Response status:', response.status);

  //     // Store the response text in a variable
  //     const responseBody = await response.text();
  //     console.log('Response body:', responseBody);

  //     if (!response.ok) {
  //       throw new Error(`Failed to create Google Calendar event: ${response.statusText}`);
  //     }

  //     // Parse the response text as JSON
  //     const data = JSON.parse(responseBody);
  //     console.log('API response:', data);
  //     alert("Event created, check your Google Calendar!");
  //   } catch (error) {
  //     console.error('Error creating event:', error.message);
  //     alert("Error creating event. Please try again.");
  //   }
  // }
  //console.log("calendar events ", calendarEvents)
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
          {/*    <div>
            <h1 className="text-white text-[18px] font-[700]">
              <span className="pr-4">{"<"}</span>
              {currentWeek
                ? currentWeek?.weekName.slice(0, 24)
                : "Post Programme Support"}
              <span className=" pl-4 ">{">"}</span>
            </h1>
          </div> */}
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
          {/* <DashboardPrimaryButton
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
          </DashboardPrimaryButton> */}
        </div>
      </div>

      {/*   <div>
        {taskData?.usersession?.provider_token ? (
          <>
            <div className="my-6 px-5">
              <h2>Your Calendar Events</h2>
              <FullCalendar
                height="600px"
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectMirror={true}
                eventContent={renderEventContent}
                events={calendarEvents?.map((event) => ({
                  title: event?.summary,
                  start: event?.start.dateTime,
                  end: event?.end.dateTime,
                  link: event?.hangoutLink,
                }))}
                dateClick={(info) => handleDateClick(info.date)}
              />
            </div>



          </>
        ) : (
          <div className="grid justify-center items-center">
            <button className="bg-sky-600 px-5 py-3 text-white text-lg rounded-lg" onClick={() => googleSignIn()}>Sync with google </button>
            <p>No Admin Registered</p>
          </div>
        )}

        <Modal
          ariaHideApp={false}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles} // Apply custom styles to the modal
          shouldCloseOnOverlayClick={false}

        >
          <div>
            <h2 className="text-center mb-3 font-medium text-lg text-blue">Add Event</h2>
            <p>Date: {selectedDate && selectedDate.toLocaleDateString()}</p>
            <div className='flex justify-between gap-2 my-1'>
              <label>
                Event Name:
                <input
                  className="border border-black"
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </label>
              <label className="my-1">
                Event Description:
                <input
                  className="border border-black"
                  type="text"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </label>
            </div>
            <p className="mt-1">Event Start Time</p>
            <DateTimePicker
              className="border-black mb-1"
              onChange={(date) => setStart(date)}
              value={start}
              disableClock={true}
              disableCalendar={true}
            />
            <p className="mt-1">Event End Time</p>
            <DateTimePicker
              className="border-black  mb-1"
              onChange={(date) => {
                setEnd(date);
              }}
              value={end}
              disableClock={true}
              disableCalendar={true}
            />

          </div>
       
        </Modal>
      </div> */}
    </div>
  );
};

export default ScheduleTask;
