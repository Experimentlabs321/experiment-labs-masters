import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
/* import '@fullcalendar/common/main.css';  
import '@fullcalendar/daygrid/main.css'; */


const AdminCalendarSchedule = () => {
  const { id } = useParams()
  console.log(id)
  const navigate = useNavigate();
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);

  const session = useSession();
  const supabase = useSupabaseClient();

  const { isLoading } = useSessionContext();

  // Call this function when your component mounts to fetch and display events
  useEffect(() => {
    fetchAndDisplayGoogleCalendarEvents();
  }, []); // The empty dependency array ensures that this effect runs only once



  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    // navigate(`/adminCalendarSchedule/${id}`)

    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }

  }


  async function signOut() {
    await supabase.auth.signOut();
  }

  async function fetchGoogleCalendarEvents() {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.provider_token, // Access token for Google
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Google Calendar events");
    }

    const data = await response.json();
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
  console.log(calendarEvents)

  function renderEventContent(eventInfo) {
    console.log(eventInfo?.event.start);

    const formattedStartDate = eventInfo?.event?.start?.toLocaleTimeString();
    const formattedEndDate = eventInfo?.event?.end?.toLocaleTimeString();

    return (
        <div
            style={{
                backgroundColor: 'blue', // Set the background color of the event
                color: 'white', // Set the text color of the event
                borderRadius: '5px',
                padding: '5px',
            }}
        >
            <h1>{eventInfo?.event?.title}</h1>
            <p>Start time : {formattedStartDate}</p>
            <p>End time : {formattedEndDate}</p>
        </div>
    );
}



  return (
    <div>
      <Layout>
        <div>
          {session ? (
            <>
              <div className="my-6">
                <h2>Your Calendar Events</h2>
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]} // Include the interactionPlugin
                  initialView="dayGridMonth"
                  eventContent={renderEventContent}
                  events={calendarEvents.map((event) => ({
                    title: event.summary,
                    start: event.start.dateTime,
                    end: event.end.dateTime,
                  }))}
                
                />
               
              </div>
              <button onClick={() => signOut()}>Sign out </button>
            </>
          ) : (
            <button onClick={() => googleSignIn()}>Sync with google </button>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default AdminCalendarSchedule;