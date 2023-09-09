// import React, { useEffect, useState } from "react";

// const SendEvent = () => {
//   var gapi = window.gapi;
//   /*
//     Update with your own Client Id and Api key
//   */
//   var CLIENT_ID =
//     "86204309404-9o24gjnbclgm9n07s5fcjfcprg0abni1.apps.googleusercontent.com";
//   var API_KEY = "AIzaSyBJVhYqfZ_wDe5d-AznzXQ-RnE9lqV0qfQ";
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
