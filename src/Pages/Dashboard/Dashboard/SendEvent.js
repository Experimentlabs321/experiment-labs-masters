// import React, { useEffect, useState } from "react";

// const SendEvent = () => {
//   var gapi = window.gapi;
//   /*
//     Update with your own Client Id and Api key
//   */
//   var CLIENT_ID =
//     "175936106474-euedhf2c1trrvtc30gkogevnm6lsvg8e.apps.googleusercontent.com";
//   var API_KEY = "AIzaSyBjTKX2PIKQ-Rs5SFYfhw5_wCTGI5JBID0";
//   var DISCOVERY_DOCS = [
//     "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
//   ];
//   var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

//   const handleClick = () => {
//     gapi.load("client:auth2", () => {
//       console.log("loaded client");

//       gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPES,
//       });

//       gapi.client.load("calendar", "v3", () => console.log("bam!"));

//       gapi.auth2
//         .getAuthInstance()
//         .signIn()
//         .then(() => {
//           var event = {
//             summary: "Awesome Event!",
//             location: "800 Howard St., San Francisco, CA 94103",
//             description: "Really great refreshments",
//             start: {
//               dateTime: "2023-09-28T09:00:00-07:00",
//               timeZone: "America/Los_Angeles",
//             },
//             end: {
//               dateTime: "2023-09-28T17:00:00-07:00",
//               timeZone: "America/Los_Angeles",
//             },
//             recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
//             attendees: [
//               { email: "shihab77023@gmail.com" },
//               { email: "sbrin@example.com" },
//             ],
//             reminders: {
//               useDefault: false,
//               overrides: [
//                 { method: "email", minutes: 24 * 60 },
//                 { method: "popup", minutes: 10 },
//               ],
//             },
//           };

//           var request = gapi.client.calendar.events.insert({
//             calendarId: "primary",
//             resource: event,
//           });

//           request.execute((event) => {
//             console.log(event);
//             window.open(event.htmlLink);
//           });

//           /*
//             Uncomment the following block to get events
//         */
//           /*
//         // get events
//         gapi.client.calendar.events.list({
//           'calendarId': 'primary',
//           'timeMin': (new Date()).toISOString(),
//           'showDeleted': false,
//           'singleEvents': true,
//           'maxResults': 10,
//           'orderBy': 'startTime'
//         }).then(response => {
//           const events = response.result.items
//           console.log('EVENTS: ', events)
//         })
//         */
//         });
//     });
//   };

//   return (
//     <div className="App">
//       <button style={{ width: 100, height: 50 }} onClick={handleClick}>
//         Add Event
//       </button>
//     </div>
//   );
// };

// export default SendEvent;

// var API_KEY = "AIzaSyBnfJnJUxTpGxdR_xRiAc10P5aemwx4Ss8";AIzaSyAoKZKU-41OZp_CTp1puLJXmwNxePHuu4Y

// import React, { useState, useEffect } from "react";

// const SendEvent = () => {
//   let gapi = window.gapi;
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [eventCreated, setEventCreated] = useState(false);

//   useEffect(() => {
//     // Load the Google API library and initialize it when the component mounts
//     initializeGoogleAPI();
//   }, [gapi]);

//   const initializeGoogleAPI = () => {
//     // Ensure that gapi is available (loaded from the script tag)
//     if (window.gapi) {
//       // Initialize gapi client and other setup code here
//       gapi.load("client", () => {
//         // Initialize gapi client with your API key and discovery document
//         gapi.client.init({
//           apiKey: "AIzaSyBfKph5gt3z6H-NMQD8_d1UWsUkyZiYPTc",
//           discoveryDocs: [
//             "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
//           ],
//         });

//         // Now you can use the gapi object
//       });
//     } else {
//       console.error("Google API library failed to load.");
//     }
//   };

//   const handleCreateEvent = async () => {
//     if (!date || !time) {
//       // Ensure date and time fields are filled out before creating an event
//       return;
//     }

//     // Continue with creating the event using the loaded gapi
//     const event = {
//       summary: "My Event",
//       start: {
//         dateTime: `${date}T${time}:00:00Z`,
//       },
//       end: {
//         dateTime: `${date}T${time}:30:00Z`,
//       },
//       attendees: [
//         {
//           email: "shihab77023@gmail.com", // Replace with the recipient's email
//         },
//       ],
//       reminders: {
//         useDefault: true,
//       },
//     };

//     try {
//       // Create the event
//       const response = await gapi.client.calendar.events.insert(
//         {
//           calendarId: "primary",
//           resource: event,
//         },
//         {
//           auth: {
//             clientId:
//               "1039904180334-hj6hj9r63ktdal9uahuiga7vbnds7jhu.apps.googleusercontent.com",
//             clientSecret: "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",
//           },
//         }
//       );

//       console.log("Event created:", response);
//       setEventCreated(true);
//     } catch (error) {
//       console.error("Error creating event:", error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <input
//         type="time"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//       />
//       <button onClick={handleCreateEvent}>Create Event</button>
//       {eventCreated && <p>Event created successfully!</p>}
//     </div>
//   );
// };

// export default SendEvent;

// import React, { useState } from "react";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/functions";

// const SendEvent = () => {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [email, setEmail] = useState("");
//   const [eventCreated, setEventCreated] = useState(false);

//   const handleCreateEvent = async () => {
//     if (!date || !time || !email) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     const user = firebase.auth().currentUser;

//     if (!user) {
//       alert("User not authenticated. Please sign in.");
//       return;
//     }

//     const createEventFunction = firebase
//       .functions()
//       .httpsCallable("createEvent");
//     try {
//       const result = await createEventFunction({ date, time, email });

//       if (result.data.success) {
//         setEventCreated(true);
//         alert("Event created successfully!");
//       } else {
//         alert("Error creating event. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error creating event:", error);
//       alert("Error creating event. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <p>Welcome, {firebase.auth().currentUser.displayName}!</p>
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <input
//         type="time"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//       />
//       <input
//         type="email"
//         placeholder="Recipient's Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <button onClick={handleCreateEvent}>Create Event</button>
//       {eventCreated && <p>Event created successfully!</p>}
//     </div>
//   );
// };

// export default SendEvent;

// import React, { useState } from "react";
// import { GoogleButton } from "react-auth-library";
// import { GoogleCalendar, GoogleMeet } from "googleapis";

// function SendEvent() {
//   const [eventCreated, setEventCreated] = useState(false);
//   const [change, setchange] = useState(false);

//   const handleCreateEvent = async () => {
//     // Ensure the user is authenticated
//     if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
//       alert("Please sign in to Google first.");
//       return;
//     }

//     // Create an event on Google Calendar
//     const calendar = window.gapi.client.calendar;
//     const event = {
//       summary: "Mentor Meeting",
//       description: "Meeting with Mentor",
//       start: {
//         dateTime: "2023-09-15T10:00:00",
//         timeZone: "UTC",
//       },
//       end: {
//         dateTime: "2023-09-15T11:00:00",
//         timeZone: "UTC",
//       },
//     };

//     try {
//       const response = await calendar.events.insert({
//         calendarId: "primary", // Use 'primary' for the user's default calendar
//         resource: event,
//       });

//       if (response.status === 200) {
//         setEventCreated(true);
//         alert("Meeting scheduled successfully!");
//       } else {
//         alert("Failed to create the event.");
//       }
//     } catch (error) {
//       console.error("Error creating event:", error);
//       alert("An error occurred while scheduling the meeting.");
//     }
//   };

//   return (
//     <div>
//       {eventCreated ? (
//         <p>Meeting scheduled successfully!</p>
//       ) : (
//         <div>
//           <h1>Schedule a Meeting</h1>
//           <button onClick={handleCreateEvent}>Schedule Meeting</button>
//         </div>
//       )}
//       <GoogleButton
//         setChange={setchange}
//         clientId="175936106474-euedhf2c1trrvtc30gkogevnm6lsvg8e.apps.googleusercontent.com"
//       />
//     </div>
//   );
// }

// export default SendEvent;

// import React, { useEffect, useState } from "react";

// const SendEvent = () => {
//   const [event, setEvent] = useState({
//     title: "",
//     description: "",
//     start: "",
//     end: "",
//     guests: "",
//   });

//   useEffect(() => {
//     // Load the Google API client library
//     window.gapi.load("client:auth2", () => {
//       window.gapi.client.init({
//         apiKey: "AIzaSyBjTKX2PIKQ-Rs5SFYfhw5_wCTGI5JBID0", // Replace with your API key
//         clientId:
//           "175936106474-euedhf2c1trrvtc30gkogevnm6lsvg8e.apps.googleusercontent.com", // Replace with your OAuth client ID
//         discoveryDocs: [
//           "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
//         ],
//         scope: "https://www.googleapis.com/auth/calendar.events", // Request access to create events
//       });

//       // Authenticate the user (you may need to display a sign-in button or perform this action based on user interaction)
//       window.gapi.auth2.getAuthInstance().signIn();
//     });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure that the user is authenticated
//     if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
//       console.error("User is not authenticated.");
//       return;
//     }

//     const calendar = window.gapi.client.calendar;
//     const newEvent = {
//       start: {
//         dateTime: new Date(event.start).toISOString(),
//         timeZone: "Asia/Kolkata",
//       },
//       end: {
//         dateTime: new Date(event.end).toISOString(),
//         timeZone: "Asia/Kolkata",
//       },
//       summary: event.title,
//       description: event.description,
//       attendees: [{ email: event.guests }],
//     };

//     try {
//       const response = await calendar.events.insert({
//         calendarId: "primary", // You can specify your desired calendar ID
//         resource: newEvent,
//       });

//       console.log("Event created:", response.result);
//     } catch (error) {
//       console.error("Error creating event:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Meet Scheduler</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Event Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={event.title}
//             onChange={(e) => setEvent({ ...event, title: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Event Description:</label>
//           <input
//             type="text"
//             id="description"
//             name="description"
//             value={event.description}
//             onChange={(e) =>
//               setEvent({ ...event, description: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="start">Start Date and Time:</label>
//           <input
//             type="datetime-local"
//             id="start"
//             name="start"
//             value={event.start}
//             onChange={(e) => setEvent({ ...event, start: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="end">End Date and Time:</label>
//           <input
//             type="datetime-local"
//             id="end"
//             name="end"
//             value={event.end}
//             onChange={(e) => setEvent({ ...event, end: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="guests">Guests (Email):</label>
//           <input
//             type="email"
//             id="guests"
//             name="guests"
//             value={event.guests}
//             onChange={(e) => setEvent({ ...event, guests: e.target.value })}
//             required
//           />
//         </div>
//         <button type="submit">Schedule Meet</button>
//       </form>
//     </div>
//   );
// };

// export default SendEvent;

// import React, { useState } from "react";
// import ApiCalendar from "react-google-calendar-api";

// const SendEvent = () => {
//   const config = {
//     clientId:
//       "344492096403-ktib1l5g2dv5u4otjah2o55bdlq4h3vb.apps.googleusercontent.com",
//     apiKey: "AIzaSyCJJvQ5Wv03kDc5ydrJYbJuW15WiIe2fvY",
//     scope: "https://www.googleapis.com/auth/calendar",
//     discoveryDocs: [
//       "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
//     ],
//   };

//   const apiCalendar = new ApiCalendar(config);
//   const [eventDetails, setEventDetails] = useState({
//     title: "",
//     description: "",
//     startDateTime: "",
//     endDateTime: "",
//     attendees: "", // Add a field for attendees' email addresses
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails({ ...eventDetails, [name]: value });
//   };

//   const handleScheduleEvent = async () => {
//     // Convert startDateTime and endDateTime to the required format
//     const startDateTime = new Date(eventDetails.startDateTime);
//     const endDateTime = new Date(eventDetails.endDateTime);

//     // Split the comma-separated list of attendees into an array
//     const attendees = eventDetails.attendees
//       .split(",")
//       .map((email) => email.trim());

//     // Use try-catch to handle errors
//     try {
//       // Create an event object with attendees
//       // const event = {
//       //   summary: eventDetails.title,
//       //   description: eventDetails.description,
//       //   start: {
//       //     dateTime: startDateTime.toISOString(),
//       //     timeZone: "UTS",
//       //   },
//       //   end: {
//       //     dateTime: endDateTime.toISOString(),
//       //     timeZone: "UTS",
//       //   },
//       //   attendees: attendees.map((email) => ({ email })),
//       // };
//       const event = {
//         summary: "Event With Google Meet Conference",
//         start: {
//           dateTime: new Date().toISOString(),
//           timeZone: "Europe/Paris",
//         },
//         end: {
//           dateTime: new Date(new Date().getTime() + 3600000).toISOString(),
//           timeZone: "Europe/Paris",
//         },
//         attendees: attendees.map((email) => ({ email })),
//       };
//       // Check if the user is signed in
//       if (apiCalendar.sign) {
//         const success = await apiCalendar.createEventWithVideoConference(event);
//         console.log("Event created successfully.", success);
//       } else {
//         console.error("User is not signed in.");
//       }
//     } catch (error) {
//       console.error("Error creating event:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Schedule an Event</h2>
//       <input
//         type="text"
//         name="title"
//         placeholder="Event Title"
//         value={eventDetails.title}
//         onChange={handleInputChange}
//       />
//       <textarea
//         name="description"
//         placeholder="Event Description"
//         value={eventDetails.description}
//         onChange={handleInputChange}
//       />
//       <input
//         type="datetime-local"
//         name="startDateTime"
//         placeholder="Start Date & Time"
//         value={eventDetails.startDateTime}
//         onChange={handleInputChange}
//       />
//       <input
//         type="datetime-local"
//         name="endDateTime"
//         placeholder="End Date & Time"
//         value={eventDetails.endDateTime}
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="attendees"
//         placeholder="Attendees (comma-separated email addresses)"
//         value={eventDetails.attendees}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleScheduleEvent}>Schedule Event</button>
//     </div>
//   );
// };

// export default SendEvent;

// import React, { useState, useEffect } from "react";

// const SendEvent = () => {
//   const [gapiInited, setGapiInited] = useState(false);
//   const [gisInited, setGisInited] = useState(false);

//   const loadGoogleAPI = () => {
//     const script = document.createElement("script");
//     script.src = "https://apis.google.com/js/api.js";
//     script.async = true;
//     script.defer = true;
//     script.onload = gapiLoaded;
//     document.head.appendChild(script);
//   };

//   const loadGoogleIdentityServices = () => {
//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.defer = true;
//     script.onload = gisLoaded;
//     document.head.appendChild(script);
//   };

//   const gapiLoaded = () => {
//     window.gapi.load("client", initializeGapiClient);
//   };

//   const initializeGapiClient = async () => {
//     await window.gapi.client.init({
//       apiKey: "AIzaSyCJJvQ5Wv03kDc5ydrJYbJuW15WiIe2fvY",
//       discoveryDocs: [
//         "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
//       ],
//     });

//     setGapiInited(true);
//     maybeEnableButtons();
//   };

//   const gisLoaded = () => {
//     const tokenClient = window.google.accounts.oauth2.initTokenClient({
//       client_id:
//         "344492096403-ktib1l5g2dv5u4otjah2o55bdlq4h3vb.apps.googleusercontent.com",
//       scope: "https://www.googleapis.com/auth/calendar.readonly",
//       callback: "", // defined later
//     });

//     setGisInited(true);
//     maybeEnableButtons();

//     return tokenClient;
//   };

//   const maybeEnableButtons = () => {
//     if (gapiInited && gisInited) {
//       document.getElementById("authorize_button").style.visibility = "visible";
//     }
//   };

//   const handleAuthClick = () => {
//     const tokenClient = gisLoaded();

//     tokenClient.callback = async (resp) => {
//       if (resp.error !== undefined) {
//         throw resp;
//       }
//       document.getElementById("signout_button").style.visibility = "visible";
//       document.getElementById("authorize_button").innerText = "Refresh";
//       await listUpcomingEvents();
//     };

//     if (window.gapi.client.getToken() === null) {
//       tokenClient.requestAccessToken({ prompt: "consent" });
//     } else {
//       tokenClient.requestAccessToken({ prompt: "" });
//     }
//   };

//   const handleSignoutClick = () => {
//     const token = window.gapi.client.getToken();
//     if (token !== null) {
//       window.google.accounts.oauth2.revoke(token.access_token);
//       window.gapi.client.setToken("");
//       document.getElementById("content").innerText = "";
//       document.getElementById("authorize_button").innerText = "Authorize";
//       document.getElementById("signout_button").style.visibility = "hidden";
//     }
//   };

//   const listUpcomingEvents = async () => {
//     let response;
//     try {
//       const request = {
//         calendarId: "primary",
//         timeMin: new Date().toISOString(),
//         showDeleted: false,
//         singleEvents: true,
//         maxResults: 10,
//         orderBy: "startTime",
//       };
//       response = await window.gapi.client.calendar.events.list(request);
//     } catch (err) {
//       document.getElementById("content").innerText = err.message;
//       return;
//     }

//     const events = response.result.items;
//     if (!events || events.length === 0) {
//       document.getElementById("content").innerText = "No events found.";
//       return;
//     }
//     const output = events.reduce(
//       (str, event) =>
//         `${str}${event.summary} (${
//           event.start.dateTime || event.start.date
//         })\n`,
//       "Events:\n"
//     );
//     document.getElementById("content").innerText = output;
//   };

//   useEffect(() => {
//     loadGoogleAPI();
//     loadGoogleIdentityServices();
//   }, []);

//   return (
//     <div>
//       <p>Google Calendar API Quickstart</p>
//       <button id="authorize_button" onClick={handleAuthClick}>
//         Authorize
//       </button>
//       <button id="signout_button" onClick={handleSignoutClick}>
//         Sign Out
//       </button>
//       <pre id="content" style={{ whiteSpace: "pre-wrap" }}></pre>
//     </div>
//   );
// };

// export default SendEvent;

// import React, { useContext } from "react";
// import useGoogleApiAuth from "./googleAuth";
// import { AuthContext } from "../../../contexts/AuthProvider";

// const CalendarApp = () => {
//   useGoogleApiAuth(); // Initialize Google API and manage authentication

//   const { user } = useContext(AuthContext); // Example use of AuthContext hooks

//   const getCalendar = async () => {
//     try {
//       const response = await window.gapi.client.calendar.events.list({
//         calendarId: "primary",
//         timeMin: new Date().toISOString(),
//         showDeleted: false,
//         singleEvents: true,
//         maxResults: 10,
//         orderBy: "startTime",
//       });

//       console.log(response.result.items);
//       // Store the calendar events in a state or variable to display in your component.
//     } catch (error) {
//       console.error("Error retrieving calendar events:", error);
//     }
//   };

//   const hoursFromNow = (n) =>
//     new Date(Date.now() + n * 1000 * 60 * 60).toISOString();

//   const insertEvent = async () => {
//     try {
//       const response = await window.gapi.client.calendar.events.insert({
//         calendarId: "primary",
//         start: {
//           dateTime: hoursFromNow(2),
//           timeZone: "America/Los_Angeles",
//         },
//         end: {
//           dateTime: hoursFromNow(3),
//           timeZone: "America/Los_Angeles",
//         },
//         summary: "Have Fun!!!",
//         description: "Do some cool stuff and have a fun time doing it",
//       });

//       console.log("Event created:", response.result);
//       // Handle the created event as needed.
//     } catch (error) {
//       console.error("Error creating event:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Google Calendar App</h2>
//       {user && (
//         <div>
//           <button onClick={getCalendar}>Get Google Calendar</button>
//           <button onClick={insertEvent}>Add Event</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalendarApp;

// import {
//   useSession,
//   useSupabaseClient,
//   useSessionContext,
// } from "@supabase/auth-helpers-react";
// import { useState } from "react";

// function SendEvent() {
//   const [start, setStart] = useState(new Date());
//   const [end, setEnd] = useState(new Date());
//   const [eventName, setEventName] = useState("");
//   const [eventDescription, setEventDescription] = useState("");

//   const session = useSession(); // tokens, when session exists we have a user
//   const supabase = useSupabaseClient(); // talk to supabase!
//   const { isLoading } = useSessionContext();

//   if (isLoading) {
//     return <></>;
//   }

//   async function googleSignIn() {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         scopes: "https://www.googleapis.com/auth/calendar",
//       },
//     });
//     if (error) {
//       alert("Error logging in to Google provider with Supabase");
//       console.log(error);
//     }
//   }

//   async function signOut() {
//     await supabase.auth.signOut();
//   }

//   async function createCalendarEvent() {
//     console.log("Creating calendar event");
// const event = {
//   summary: eventName,
//   description: eventDescription,
//   start: {
//     dateTime: new Date(start).toISOString(), // Date.toISOString() ->
//     timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
//   },
//   end: {
//     dateTime: new Date(end).toISOString(), // Date.toISOString() ->
//     timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // America/Los_Angeles
//   },
//   attendees: [
//     { email: "shihab77023@gmail.com" },
//     { email: "shihab9448@gmail.com" },
//   ],
// };
//     await fetch(
//       "https://www.googleapis.com/calendar/v3/calendars/primary/events",
//       {
//         method: "POST",
//         headers: {
//           Authorization: "Bearer " + session.provider_token, // Access token for google
//         },
//         body: JSON.stringify(event),
//       }
//     )
//       .then((data) => {
//         return data.json();
//       })
//       .then((data) => {
//         console.log(data);
//         alert("Event created, check your Google Calendar!");
//       });
//   }

//   console.log(session);
//   console.log(start);
//   console.log(eventName);
//   console.log(eventDescription);
//   return (
//     <div className="App">
//       <div style={{ width: "400px", margin: "30px auto" }}>
//         {session ? (
//           <>
//             <h2>Hey there {session.user.email}</h2>
//             {/* <p>Start of your event</p>
//             <DateTimePicker onChange={setStart} value={start} />
//             <p>End of your event</p>
//             <DateTimePicker onChange={setEnd} value={end} /> */}
//             <input
//               type="datetime-local"
//               name="startDateTime"
//               placeholder="Start Date & Time"
//               // value={eventDetails.startDateTime}
//               onChange={(e) => setStart(e.target.value)}
//             />
//             <input
//               type="datetime-local"
//               name="endDateTime"
//               placeholder="End Date & Time"
//               // value={eventDetails.endDateTime}
//               onChange={(e) => setEnd(e.target.value)}
//             />
//             <p>Event name</p>
//             <input type="text" onChange={(e) => setEventName(e.target.value)} />
//             <p>Event description</p>
//             <input
//               type="text"
//               onChange={(e) => setEventDescription(e.target.value)}
//             />
//             <hr />
//             <button onClick={() => createCalendarEvent()}>
//               Create Calendar Event
//             </button>
//             <p></p>
//             <button onClick={() => signOut()}>Sign Out</button>
//           </>
//         ) : (
//           <>
//             <button onClick={() => googleSignIn()}>Sign In With Google</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SendEvent;

// import React, { useEffect, useState } from "react";
// import { gapi } from "gapi-script";

// function SendEvent() {
//   const calendarID = "shihab77023@gmail.com";
//   // const apiKey = "AIzaSyCJJvQ5Wv03kDc5ydrJYbJuW15WiIe2fvY";
//   // const accessToken =
//   //   "ya29.a0AfB_byCgQpr_grcisiD13HQjfAGqFsYNSZQnkEUaMkWI0UKDNDCyyGVXLwMsW2FhkYsEiYzNsfDVTfgnXa_83FDRjmC2AM6COEdqUHbEpQy2-B5Aal9h0a0EM4op2UlDN--02W4V6KAxPgCmqWuux2Z2pLUnLBQHs6C98QaCgYKAYcSARESFQGOcNnCcnjVGKvy3Krxgn4Kclt8WQ0173";

//   const [access_Token, setAccess_Token] = useState();
//   function refreshAccessToken() {
//     const refreshToken =
//       "1//048mgfX-fTbLpCgYIARAAGAQSNwF-L9IrsxBnTsUMrD7ziecm_ab44jpCvKMRbSb7SHtWRNtkBFO27dc7EEoKLbgRnYRdz2FueGw";

//     fetch("https://oauth2.googleapis.com/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=344492096403-ktib1l5g2dv5u4otjah2o55bdlq4h3vb.apps.googleusercontent.com&client_secret=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`,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the new access token and possibly a new refresh token
//         const newAccessToken = data.access_token;
//         const newRefreshToken = data.refresh_token; // Optional, depends on the OAuth provider
//         // Store the new access token for future API requests
//         console.log(data);
//         return newAccessToken;
//       })
//       .catch((error) => {
//         // Handle errors, e.g., refresh token has expired
//         console.error("Token refresh error:", error);
//       });
//   }

//   useEffect(() => {
//     refreshAccessToken();
//   }, []);
//   console.log(access_Token);

//   // var event = {
//   //   summary: "Testing again",
//   //   location: "",
//   //   start: {
//   //     dateTime: "2023-09-16T09:01:00-07:00",
//   //     timeZone: "America/Los_Angeles",
//   //   },
//   //   end: {
//   //     dateTime: "2023-09-16T17:02:00-07:00",
//   //     timeZone: "America/Los_Angeles",
//   //   },
//   //   recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
//   //   attendees: [
//   //     { email: "shihab77023@gmail.com" },
//   //     { email: "shihab9448@gmail.com" },
//   //   ],
//   //   reminders: {
//   //     useDefault: false,
//   //     overrides: [
//   //       { method: "email", minutes: 24 * 60 },
//   //       { method: "popup", minutes: 10 },
//   //     ],
//   //   },
//   // };

//   // const date = new Date("2023-09-22T01:01:00-07:00");
//   // console.log(date.toTimeString());
//   //   const timestamp = Date.now();
//   //   const requestId = `meeting-${timestamp}`;
//   var event = {
//     summary: "Testing again",
//     location: "",
//     start: {
//       dateTime: "2023-10-01T10:01:00.000Z",
//       timeZone: "UTC",
//     },
//     end: {
//       dateTime: "2023-10-01T11:01:00.000Z",
//       timeZone: "UTC",
//     },
//     // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
//     attendees: [
//       { email: "shihab77023@gmail.com" },
//       { email: "shihab9448@gmail.com" },
//     ],
//     reminders: {
//       useDefault: false,
//       overrides: [
//         { method: "email", minutes: 24 * 60 },
//         { method: "popup", minutes: 10 },
//       ],
//     },
//     conferenceDataVersion: 1,
//     conferenceData: {
//       createRequest: {
//         conferenceSolutionKey: {
//           type: "hangoutsMeet",
//         },
//         requestId: `meeting-${Date.now()}`,
//       },
//     },
//   };

//   const addEvent = () => {
//     console.log(event);
//     const refreshToken =
//       "1//048mgfX-fTbLpCgYIARAAGAQSNwF-L9IrsxBnTsUMrD7ziecm_ab44jpCvKMRbSb7SHtWRNtkBFO27dc7EEoKLbgRnYRdz2FueGw";

//     fetch("https://oauth2.googleapis.com/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=344492096403-ktib1l5g2dv5u4otjah2o55bdlq4h3vb.apps.googleusercontent.com&client_secret=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`,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the new access token and possibly a new refresh token
//         const newAccessToken = data.access_token;
//         // const newRefreshToken = data.refresh_token; // Optional, depends on the OAuth provider
//         // Store the new access token for future API requests
//         console.log(data);
//         setAccess_Token(newAccessToken);
//         function initiate() {
//           gapi.client
//             .request({
//               path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
//               method: "POST",
//               body: event,
//               headers: {
//                 "Content-type": "application/json",
//                 Authorization: `Bearer ${newAccessToken}`,
//               },
//             })
//             .then(
//               (response) => {
//                 console.log(response);
//                 return [true, response];
//               },
//               function (err) {
//                 console.log(err);
//                 return [false, err];
//               }
//             );
//         }
//         gapi.load("client", initiate);
//       })
//       .catch((error) => {
//         // Handle errors, e.g., refresh token has expired
//         console.error("Token refresh error:", error);
//       });
//   };

//   return (
//     <div className="App pt-4">
//       <h1 className="text-2xl font-bold mb-4">
//         React App with Google Calendar API!
//       </h1>
//       <button onClick={() => addEvent()}>add event</button>
//     </div>
//   );
// }

// export default SendEvent;

import React, { useContext, useState } from "react";
import { gapi } from "gapi-script";
import { AuthContext } from "../../../contexts/AuthProvider";

function SendEvent() {
  const { user } = useContext(AuthContext);
  const calendarID = "shihab77023@gmail.com";
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // const calendarID = user?.email;

  const [date, setDate] = useState(""); // State for the date
  const [time, setTime] = useState(""); // State for the time

  // Update the date state when the date input changes
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Update the time state when the time input changes
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  // Function to combine date and time into a single variable
  const combineDateTime = () => {
    if (date && time) {
      const combinedDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(
        new Date(`${date}T${time}`).setMinutes(
          new Date(`${date}T${time}`).getMinutes() + 30
        )
      );
      setStartTime(combinedDateTime.toISOString());
      setEndTime(endDateTime.toISOString());
      console.log(
        "Combined Date and Time:",
        combinedDateTime.toISOString(),
        endDateTime.toISOString()
      );
      // You can now use combinedDateTime as needed
    } else {
      console.error("Both date and time must be selected.");
    }
  };

  const addEvent = () => {
    const refreshToken =
      "1//048mgfX-fTbLpCgYIARAAGAQSNwF-L9IrsxBnTsUMrD7ziecm_ab44jpCvKMRbSb7SHtWRNtkBFO27dc7EEoKLbgRnYRdz2FueGw";

    fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=344492096403-ktib1l5g2dv5u4otjah2o55bdlq4h3vb.apps.googleusercontent.com&client_secret=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`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (date && time) {
          const combinedDateTime = new Date(`${date}T${time}`);
          const endDateTime = new Date(
            new Date(`${date}T${time}`).setMinutes(
              new Date(`${date}T${time}`).getMinutes() + 30
            )
          );
          setStartTime(combinedDateTime.toISOString());
          setEndTime(endDateTime.toISOString());
          console.log(
            "Combined Date and Time:",
            combinedDateTime.toISOString(),
            endDateTime.toISOString()
          );
          // You can now use combinedDateTime as needed
          var event = {
            summary: "Testing again",
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
              // { email: "naman.j@experimentlabs.in" },
              { email: "shihab9448@gmail.com" },
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
              notifyGuests: true,
            },
            sendNotifications: true,
            notifications: [
              {
                type: "email",
                method: "send",
                address: "shihab77023@gmail.com",
              },
              {
                type: "email",
                method: "send",
                address: "shihab9448@gmail.com",
              },
            ],
          };
          console.log(event);
          // Handle the new access token and possibly a new refresh token
          const newAccessToken = data.access_token;
          function initiate() {
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
                  return [true, response];
                },
                function (err) {
                  console.log(err);
                  return [false, err];
                }
              );
          }
          gapi.load("client", initiate);
        } else {
          console.error("Both date and time must be selected.");
        }
      })
      .catch((error) => {
        // Handle errors, e.g., refresh token has expired
        console.error("Token refresh error:", error);
      });
  };

  return (
    <div className="App pt-4">
      <h1 className="text-2xl font-bold mb-4">
        React App with Google Calendar API!
      </h1>
      <input
        required
        onChange={handleDateChange}
        className=" text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
        name="date"
        id="date"
        type="date"
      />
      <input
        required
        onChange={handleTimeChange}
        className=" text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
        name="time"
        id="time"
        type="time"
      />
      <button
        onClick={() => addEvent()}
        // onClick={addEvent()}
      >
        add event
      </button>
    </div>
  );
}

export default SendEvent;
