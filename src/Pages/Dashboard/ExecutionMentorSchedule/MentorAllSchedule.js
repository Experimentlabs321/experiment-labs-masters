
import 'react-circular-progressbar/dist/styles.css';

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import { red } from '@mui/material/colors';
import { AuthContext } from '../../../contexts/AuthProvider';
import Layout from '../Layout';
import Loading from '../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import googlemeet from "../../../assets/icons/googlemeet.png";
import zoom from "../../../assets/icons/zoom-240.png";
import eye from "../../../assets/ExecutionMentor/eye.svg";
import toast from 'react-hot-toast';
const MentorAllSchedule = () => {
  const { userInfo, user } = useContext(AuthContext);
  const [userRequesterEvents, setUserRequesterEvents] = useState([]);

  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  const [events, setEvents] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [editOrAssignMentor, setEditOrAssignMentor] = useState({});
  const [selectedMentorsForEditOrAssign, setSelectedMentorsForEditOrAssign] =
    useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    if (!userInfo?.email) {
      return;
    }
    Loading();
    axios
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/mentorEmail/${userInfo?.email}`)
      .then((response) => {
        Loading().close();
        console.log(response?.data);
        setUserRequesterEvents(response?.data);
        setEvents(response?.data);
        const currentDate = new Date(getCurrentDate()).getTime();
        const filteredEvents = response?.data.filter(event => {
          // Check for both date structures
          const eventStartDate = new Date(event.start?.dateTime || event.start_time).getTime();
          return eventStartDate >= currentDate;
        });
        

      })
      .catch((error) => {
        Loading().close();
        console.error(error);
      })
      .finally(() => {
        Loading().close();
      });
  }, [userInfo]);
  

  
  // Helper function to get today's date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  // function formatUtcDateTimeStringToListItems(dateTimeString) {
  //   const utcDateTime = new Date(dateTimeString);

  //   if (isNaN(utcDateTime.getTime())) {
  //     console.error("Invalid dateTimeString:", dateTimeString);
  //     return ["Invalid Date"];
  //   }

  //   const formatInTimeZone = (dateTime, timeZone, label) => (
  //     `${dateTime.toLocaleString('en-US', {
  //       timeZone,
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric',
  //       hour: 'numeric',
  //       minute: '2-digit',
  //       hour12: true,
  //     })} (${label})`
  //   );

  //   return [
  //     // formatInTimeZone(utcDateTime, "UTC", "UTC"),
  //     formatInTimeZone(utcDateTime, "Asia/Kolkata", "India-time"),
  //     // formatInTimeZone(utcDateTime, "Asia/Seoul", "Korea-time"),
  //     // formatInTimeZone(utcDateTime, "Asia/Dhaka", "Bangladesh-time"),
  //   ];
  // }
  // const formatTimeForZoom = (event, type) => {
  //   const utcTimeStr = event?.start_time;
  //   const timezoneStr = event?.timezone;
  //   const meetingLength = event?.duration; // Assuming this is in minutes
  //   const startDate = new Date(utcTimeStr);
  //   const meetingStartTime = new Date(utcTimeStr);
  //   const currentDateTime = new Date();
  //   const meetingEndTime = new Date(meetingStartTime.getTime() + meetingLength * 60000);

  //   // Convert start date to local time in the specified timezone
  //   const options = {
  //     timeZone: timezoneStr,
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit'
  //   };
  //   const meetingStart = startDate.toLocaleString(undefined, options);
  //   console.log(meetingStart);
  //   // Calculate end date by adding the duration to the start date
  //   const endDate = new Date(startDate.getTime() + meetingLength * 60000); // 60000 ms in a minute

  //   // Convert end date to local time in the specified timezone
  //   const meetingEnd = endDate.toLocaleString(undefined, options);
  //   if (currentDateTime > meetingEndTime && type === 'start') {
  //     return 'The meeting has already happened.'
  //   } else if (currentDateTime < meetingEndTime && type === 'start') {
  //     return meetingStart;
  //   }
  //   else if (currentDateTime > meetingEndTime && type === 'end') {
  //     return "";
  //   }
  //   else if (currentDateTime < meetingEndTime && type === 'end') {
  //     return meetingEnd;
  //   }
  // }
  const filterEventsByDate = () => {
    if (!fromDate || !toDate) {
      // If no dates are set, show all events
      setUserRequesterEvents(events);
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const filtered = events.filter((event) => {
      // Check for both potential start and end time formats
      const startTime = event.start?.dateTime
        ? new Date(event.start.dateTime)
        : event.start_time
          ? new Date(event.start_time)
          : null;

      console.log("from :", from, "to :", to, "start :", startTime);
      // Ensure both startTime and endTime are valid Date objects before comparing
      return startTime && startTime >= from && startTime <= to;
    });

    setUserRequesterEvents(filtered);
  };
  useEffect(() => {
    filterEventsByDate();
  }, [fromDate, toDate, events]);

  const now = new Date();
  const sortedEvents = userRequesterEvents.slice().sort((a, b) => {
    const dateA = new Date(a?.start_time);
    const dateB = new Date(b?.start_time);
    return dateA - dateB;
  }).filter(event => new Date(event?.start_time) > now);
  console.log(sortedEvents)
  const excludedEventId = sortedEvents[0]?._id;
  console.log(excludedEventId)
  const filteredEvents = userRequesterEvents.filter(event => event?._id !== excludedEventId);

  function getEditedEvents(events) {
    return events.sort((a, b) => {
      // Normalize start times to Date objects
      const startTimeA = new Date(a?.start_time || a.start?.dateTime || a?.start);
      const startTimeB = new Date(b?.start_time || b.start?.dateTime || b?.start);

      // Sort in descending order (most recent dates first)
      return startTimeB - startTimeA;
    });
  }
  const editedEvents = getEditedEvents(filteredEvents);
  console.log(editedEvents);




  return (
    <div>
      {userRequesterEvents?.length > 0 ? (
        // Render content specific to events where the user is the requester
        <>

          <div
            style={{
              maxWidth: `${window.innerWidth - (window.innerWidth > 1024 ? 370 : 40)
                }px`,
            }}
            className={`h-[70vh] w-fit overflow-y-auto mt-5 border`}
          >
            <table className={` font-sans bg-white border border-gray-300`}>
              <thead className="bg-gray-800 text-white sticky top-0">
                <tr>
                  <th className="py-3 px-6 border-b text-left whitespace-nowrap ">
                    Meeting Name
                  </th>
                  <th className="py-3 px-6 border-b text-left whitespace-nowrap ">
                    Student Name

                  </th>
                  <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                    Course Name
                  </th>
                  <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                    Meeting Date
                  </th>
                  <th className="py-3 px-6 border-b text-center whitespace-nowrap">
                    Meeting Start time
                  </th>
                  <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                    Start Url
                  </th>

                </tr>
              </thead>
              <tbody>
                {sortedEvents.length > 0 && (
                  <tr
                    className="bg-emerald-500 text-white font-medium"
                  >
                    <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                      {sortedEvents[0].topic ? sortedEvents[0].topic : sortedEvents[0].summary}
                    </td>
                    <td className="py-4 px-6 border-b text-left">
                      {sortedEvents[0].studentName}
                    </td>
                    <td className="py-4 px-4 text-left relative">
                      <div className='flex gap-2 items-center'>
                        <p>{sortedEvents[0].courseName}</p>
                        {sortedEvents[0].courseName && (
                          <div className="group cursor-pointer">
                            <img src={eye} alt="eye" className="inline w-4 h-4 bg-[#081765] hover:bg-opacity-70 text-[#fff]" />
                            <div className="absolute left-0 top-0 ml-1 w-auto p-2 min-w-max bg-black text-white text-sm rounded-lg hidden group-hover:block">
                              {sortedEvents[0].batchName}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b text-left">
                      {sortedEvents[0].start_time ? new Date(sortedEvents[0].start_time).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : sortedEvents[0].start ? new Date(sortedEvents[0].start).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : ''}
                    </td>
                    <td className="py-4 px-6 border-b text-left">
                      {sortedEvents[0].start_time ? new Date(sortedEvents[0].start_time).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                      }) : sortedEvents[0].start ? new Date(sortedEvents[0].start).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                      }) : ''}
                    </td>

                    <td className="py-4 px-6 border-b text-left">
                      {/* <Link
                          to={`${event?.start_url}`}
                          className="flex gap-2 text-center bg-[#4556a7] hover:bg-opacity-70 text-[#fff] px-4 rounded-lg mb-2 mt-3"
                        >
                          <p className="py-2 font-normal">
                            Link
                          </p>
                        </Link> */}
                      <Link
                        to={
                          sortedEvents[0]?.meetingType === "Zoom"
                            ? userInfo?.role === "admin"
                              ? sortedEvents[0]?.start_url
                              : sortedEvents[0]?.join_url
                            : sortedEvents[0]?.hangoutLink
                        }
                        className="flex gap-2 items-center justify-center py-[6px] px-4 rounded-lg mb-2 mt-3"
                      >
                        <img
                          src={
                            sortedEvents[0]?.meetingType === "Zoom"
                              ? zoom
                              : googlemeet
                          }
                          className="w-[21px] h-[21px]"
                          alt="googlemeet or zoom"
                        ></img>

                      </Link>
                    </td>

                  </tr>
                )}
                {editedEvents.map((event, index) => {
                  const eventStartTime = new Date(event.start_time || event.start.dateTime || event.start);
                  return (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                      }
                    >
                      <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                        {/* {userInfo?.role === "admin" && (
                            <input
                              className="mr-2"
                              type="checkbox"
                              id={`event-${event?._id}`}
                              name={`event-${event?._id}`}
                              value={`${event?._id}`}
                              checked={selectedSubmissions?.includes(
                                event?._id
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectAllStatus(true);
                                  setSelectedSubmissions([
                                    ...selectedSubmissions,
                                    event?._id,
                                  ]);
                                } else {
                                  setSelectAllStatus(false);
                                  let allSubmissionId =
                                    selectedSubmissions?.filter(
                                      (item) => item !== event?._id
                                    );
                                  setSelectedSubmissions(allSubmissionId);
                                }
                              }}
                            />
                          )} */}
                        {event?.topic ? event?.topic : event?.summary}
                      </td>
                      <td className="py-4 px-6 border-b text-left">
                        {event?.studentName}
                      </td>
                      <td className="py-4 px-4 text-left relative">
                        <div className='flex gap-2 items-center'>
                          <p>{event?.courseName}</p>
                          {event?.courseName ? <div className="group cursor-pointer">
                            <img src={eye} alt="eye" className="inline w-4 h-4 bg-[#081765] hover:bg-opacity-70 text-[#fff]" />
                            <div className="absolute left-0 top-0 ml-1 w-auto p-2 min-w-max bg-black text-white text-sm rounded-lg hidden group-hover:block">
                              {event?.batchName}
                            </div>
                          </div> : <></>}
                        </div>
                      </td>

                      <td className="py-4 px-6 border-b text-left">
                        {event?.start_time ? new Date(event.start_time).toLocaleDateString('en-US', {
                          weekday: 'long', // "Monday"
                          year: 'numeric', // "2024"
                          month: 'long', // "May"
                          day: 'numeric' // "30"
                        }) : event?.start ? new Date(event.start).toLocaleDateString('en-US', {
                          weekday: 'long', // "Monday"
                          year: 'numeric', // "2024"
                          month: 'long', // "May"
                          day: 'numeric' // "30"
                        }) : event?.start.dateTime ? new Date(event.start.dateTime).toLocaleDateString('en-US', {
                          weekday: 'long', // "Monday"
                          year: 'numeric', // "2024"
                          month: 'long', // "May"
                          day: 'numeric' // "30"
                        }) : ''}
                      </td>

                      <td className="py-4 px-6 border-b text-left">
                        {event?.start_time ? new Date(event.start_time).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true
                        }) : event?.start ? new Date(event.start).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true
                        }) : event?.start.dateTime ? new Date(event.start.dateTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: true
                        }) : ''}
                      </td>
                      <td className="py-4 px-6 border-b text-left">
                        {eventStartTime < now ? (
                          <p className='text-sm'>Meeting Concluded</p>  // Show this if the meeting time is in the past
                        ) : (
                          <Link  // Only show the link if the meeting time is in the future or present
                            to={
                              event?.meetingType === "Zoom"
                                ? (userInfo?.role === "admin" ? event?.start_url : event?.join_url)
                                : event?.hangoutLink
                            }
                            className="flex gap-2 items-center justify-center py-[6px] px-4 rounded-lg mb-2 mt-3"
                          >
                            <img
                              src={event?.meetingType === "Zoom" ? zoom : googlemeet}
                              className="w-[21px] h-[21px]"
                              alt={event?.meetingType === "Zoom" ? "zoom" : "googlemeet"}
                            ></img>
                          </Link>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )
        : <p className="text-center font-medium text-sky-400 mt-5 ">No Upcoming Scheduled Events</p>}
    </div>
  );
};

export default MentorAllSchedule;


