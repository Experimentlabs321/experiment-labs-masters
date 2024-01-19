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
const ScheduleTask = ({ taskData }) => {
  const {userInfo} = useContext(AuthContext);
  if(userInfo.role !== 'admin'){
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  };
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const session = useSession();
  console.log("session", session)
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();
  console.log(taskData)
  useEffect(() => {
    fetchAndDisplayGoogleCalendarEvents();
  }, []); // The empty dependency array ensures that this effect runs only once

  if (isLoading) {
    return <></>;
  }
  async function fetchGoogleCalendarEvents() {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session?.provider_token,
          // Access token for Google
        },
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch Google Calendar events");
    }

    const data = await response.json();
    console.log(data);
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
  console.log("calendar events ",calendarEvents)
  return (
    <div>
                <div>
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
                {/* <button className="bg-sky-600 px-5 py-3 text-white text-lg rounded-lg" onClick={() => googleSignIn()}>Sync with google </button> */}
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
              {/* <div className="grid items-center justify-center">
                <button className="bg-orange-500 text-white text-lg px-4 py-2 rounded-md my-2" onClick={() => createCalendarEvent()}>Add Event</button>
              </div> */}
            </Modal>
          </div>
    </div>
  );
};

export default ScheduleTask;
