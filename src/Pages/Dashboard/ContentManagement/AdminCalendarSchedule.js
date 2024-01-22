import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
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
import 'react-clock/dist/Clock.css';
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import required from "../../../assets/ContentManagement/required.png";
/* import '@fullcalendar/common/main.css';  
import '@fullcalendar/daygrid/main.css'; */

let global;
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
const AdminCalendarSchedule = () => {

  const { id } = useParams();
  const { user, userInfo } = useContext(AuthContext);
  const [chapter, setChapter] = useState({});
  const [course, setCourse] = useState({});
  const [preview, setPreview] = useState(false);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [assignmentData, setAssignmentData] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const navigate = useNavigate();
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarId, setCalendarId] = useState("");
  const session = useSession();
  const [rafi, setRafi] = useState(null);
  global = session;
  const supabase = useSupabaseClient();

  const { isLoading } = useSessionContext();
  useEffect(() => {
    console.log(rafi);
  }, [rafi]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API
        }/api/v1/batches/courseId/${localStorage.getItem("courseId")}`
      )
      .then((response) => {
        setBatchesData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [chapter?.courseId]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
      .then((response) => {
        setChapter(response?.data);
      })

      .catch((error) => console.error(error));
  }, [id, userInfo, userInfo?.email]);
  useEffect(() => {
    if (chapter?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/courses/${chapter?.courseId}`
        )
        .then((response) => {
          setCourse(response?.data);
        });
  }, [chapter]);

  const handleOptionChangeBatch = (event, optionValue) => {
    // const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      if (selectedBatches) {
        setSelectedBatches([
          ...selectedBatches,
          { batchName: optionValue?.batchName, batchId: optionValue?._id },
        ]);
        setSchedule([
          ...schedule,
          {
            batchName: optionValue?.batchName,
            batchId: optionValue?._id,

          },
        ]);
      } else {
        setSelectedBatches([
          { batchName: optionValue?.batchName, batchId: optionValue?._id },
        ]);
        setSchedule([
          {
            batchName: optionValue?.batchName,
            batchId: optionValue?._id,

          },
        ]);
      }
    } else {
      setSelectedBatches(
        selectedBatches.filter((option) => option?.batchId !== optionValue?._id)
      );
      setSchedule(
        schedule.filter((option) => option?.batchId !== optionValue?._id)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const form = event.target;

    const scheduleName = form.scheduleName?.value;


    const manageSchedule = {
      scheduleName,
      taskName: scheduleName,

      chapterId: chapter?._id,
      courseId: chapter?.courseId,
      batches: selectedBatches,
      usersession: global,
      events : calendarEvents,
    };

    setAssignmentData(manageSchedule);
    console.log(manageSchedule);

    if (submitPermission) {
      const newSchedule = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/schedule`,
        manageSchedule
      );
      console.log(newSchedule);
      if (newSchedule?.data?.result?.acknowledged) {
        toast.success("Schedule added Successfully");
        event.target.reset();
        navigate(`/questLevels/${chapter?.courseId}`)
      }

      console.log(manageSchedule);
    }
  };

  // console.log(chapter);
  console.log("Start", start)
  console.log("End", end)
  console.log("Event", eventName)
  console.log("Description", eventDescription)
  // Call this function when your component mounts to fetch and display events
  // The empty dependency array ensures that this effect runs only once

  useEffect(() => {
    if (!session) {

    } else {
      // If there's a session, fetch and display events
      fetchAndDisplayGoogleCalendarEvents();
      fetchPrimaryCalendarInfo();
      checkAndRefreshToken(); // Call this function initially

      // Set up an interval to periodically refresh the token
      const refreshInterval = setInterval(() => {
        checkAndRefreshToken();
      }, 30 * 60 * 1000); // Refresh every 30 minutes (adjust as needed)

      // Cleanup the interval when the component unmounts
      return () => clearInterval(refreshInterval);
    }
  }, [session, isModalOpen]);
  console.log('session before ', session);

  if (isLoading) {
    return <></>;
  }

  async function checkAndRefreshToken() {
    const currentTime = Math.floor(Date.now() / 1000);

    if (session.expires_at && session.expires_at < currentTime) {
      try {
        const refreshResponse = await fetch("https://qzgeifdgviycxooauyum.supabase.co/auth/v1/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: session.refresh_token,
          }),
        });

        if (refreshResponse.ok) {
          const newTokens = await refreshResponse.json();

          // Update session with new tokens
          session.access_token = newTokens.access_token;
          session.expires_at = currentTime + newTokens.expires_in;
        } else {
          // Handle refresh token failure
          console.error("Failed to refresh access token");
        }
      } catch (error) {
        console.error("Error during token refresh:", error.message);
      }
    }
  }
  console.log("session after ", session);

  const googleSignIn = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/calendar',
          persistSession: true,
        },
      });
  
      if (user) {
        console.log('Successfully signed in:', user);
        // Add any additional logic you need after successful sign-in
      }
  
      if (error) {
        console.error('Error during Google Sign-In:', error.message);
        alert('Error logging in to Google provider with Supabase');
      }
    } catch (error) {
      console.error('Unexpected error during Google Sign-In:', error.message);
      alert('Unexpected error. Please try again.');
    }
  };

  // Use useEffect to log rafi whenever it changes


  async function signOut() {
    await supabase.auth.signOut();
    // You might want to redirect or perform other actions after sign out
  }



  async function fetchPrimaryCalendarInfo() {
    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + session.provider_token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch primary calendar information");
      }

      const calendarInfo = await response.json();
      const primaryCalendarId = calendarInfo.id;
      setCalendarId(primaryCalendarId);
    } catch (error) {
      console.error(error.message);
    }
  }

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
  console.log(url)
  async function fetchGoogleCalendarEvents() {

    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.provider_token,
          // Access token for Google
        },
      }
    );
    console.log(session)
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
  // console.log(calendarEvents)

  function renderEventContent(eventInfo) {
    // console.log(eventInfo?.event.start);

    const formattedStartDate = eventInfo?.event?.start?.toUTCString();
    const formattedEndDate = eventInfo?.event?.end?.toUTCString();
    const meetlink = eventInfo?.event?.extendedProps?.link;









    return (
      <div
        style={{
          width: '100%',
          backgroundColor: 'blue', // Set the background color of the event
          color: 'white', // Set the text color of the event
          borderRadius: '5px',
          paddingLeft: '5px',
        }}
      >
        <h1>{eventInfo?.event?.title}</h1>
        <p>Start time : <br></br>{formattedStartDate}</p>
        <p>End time : <br></br>{formattedEndDate}</p>
        <a target="_blank" href={meetlink} rel="noreferrer">Google Meet</a>
      </div>
    );
  }


  const handleDateClick = (date) => {
    setSelectedDate(date);
    setStart(date);
    setEnd(date);
    setIsModalOpen(true);
  };

  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': end.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    try {
      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      console.log('Response status:', response.status);

      // Store the response text in a variable
      const responseBody = await response.text();
      console.log('Response body:', responseBody);

      if (!response.ok) {
        throw new Error(`Failed to create Google Calendar event: ${response.statusText}`);
      }

      // Parse the response text as JSON
      const data = JSON.parse(responseBody);
      console.log('API response:', data);
      alert("Event created, check your Google Calendar!");
    } catch (error) {
      console.error('Error creating event:', error.message);
      alert("Error creating event. Please try again.");
    }
  }



  return (
    <div>
      <Layout>
        <div>
          <div className=" border-b-2 ">
            <div className="container mx-auto px-4 flex items-center justify-between ">
              <div className="flex items-center pt-[30px] pb-[30px] ">
                <Link
                  to="/courseAccess"
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  My Courses
                </Link>
                <svg
                  className="mr-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 18.667L15 12.667L9 6.66699"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Link
                  to={`/questLevels/${course?._id}`}
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  {course?.courseFullName}
                </Link>
                <svg
                  className="mr-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 18.667L15 12.667L9 6.66699"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <button className=" font-sans mr-[30px] text-[20px] font-[400] ">
                  {chapter?.chapterName}
                </button>
              </div>
              <div className="flex items-center mt-[-10px] ">
                <div className="flex items-center text-black text-[16px] font-[600] mr-[32px] ">
                  <h1 className="mr-[16px]">Preview Mode</h1>
                  {preview ? (
                    <svg
                      className="cursor-pointer"
                      onClick={() => setPreview(!preview)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="27"
                      viewBox="0 0 58 27"
                      fill="none"
                    >
                      <rect
                        width="57.8422"
                        height="26.7841"
                        rx="13.392"
                        fill="#9747FF"
                      />
                      <circle
                        cx="44.4512"
                        cy="13.3916"
                        r="10.1153"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="cursor-pointer"
                      onClick={() => setPreview(!preview)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="28"
                      viewBox="0 0 58 28"
                      fill="none"
                    >
                      <rect
                        y="0.608398"
                        width="57.8422"
                        height="26.7841"
                        rx="13.392"
                        fill="#A3A3A3"
                      />
                      <circle cx="13.3926" cy="14" r="10.1153" fill="white" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${preview ? "block" : "hidden"}`}>
          {/* <AssignmentTask taskData={assignmentData} /> */}
        </div>
        <div className={`${preview ? "hidden" : "block"}`}>
          <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
            <p>Manage Schedule in {chapter?.chapterName}</p>
          </div>
          <div>
            {session ? (
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
                <form onSubmit={handleSubmit} className="ms-[40px]  mt-12">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Schedule Name</p>
                      <img src={required} alt="required" />
                    </div>

                    <input
                      required
                      /*   defaultValue={
                          assignmentData ? assignmentData?.scheduleName : ""
                        } */
                      className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="scheduleName"
                      type="text"
                      placeholder="schedule Name"
                    />
                  </div>
                  <div className="my-5">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Select Batch</p>
                      <img src={required} alt="icon" />
                    </div>
                    <ul className="flex gap-4 flex-wrap ">
                      {batchesData?.map((option, index) => {
                        return (
                          <>
                            <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                              <input
                                type="checkbox"
                                id="student"
                                name={option?.batchName}
                                value={option?.batchName}
                                checked={selectedBatches?.find(
                                  (item) => item?.batchName === option?.batchName
                                )}
                                onChange={(e) => handleOptionChangeBatch(e, option)}
                                className=" mb-1"
                              />
                              <div className="flex mb-1 items-center">
                                <label className="ms-4" htmlFor={option?.batchName}>
                                  {option?.batchName}
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>



                  <div className="flex items-center gap-10 justify-center mt-20 mb-10">
                    <button className="bg-sky-600 px-4 py-3 text-white text-lg rounded-lg" onClick={() => signOut()}>Sign out </button>
                    <input
                      type="submit"
                      onClick={() => setSubmitPermission(true)}
                      value="Save"
                      className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
                    />
                  </div>
                </form>


              </>
            ) : (
              <div className="grid justify-center items-center">
                <button className="bg-sky-600 px-5 py-3 text-white text-lg rounded-lg" onClick={() => googleSignIn()}>Sync with google </button>
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
              <div className="grid items-center justify-center">
                <button className="bg-orange-500 text-white text-lg px-4 py-2 rounded-md my-2" onClick={() => createCalendarEvent()}>Add Event</button>
              </div>
            </Modal>
          </div>







        </div>


      </Layout>
    </div>
  );
};

export default AdminCalendarSchedule;