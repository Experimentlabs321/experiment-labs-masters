
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
const AdminAllSchedule = () => {
  const { userInfo, user } = useContext(AuthContext);
  const [userRequesterEvents, setUserRequesterEvents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(userInfo);
  const [events, setEvents] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [editOrAssignMentor, setEditOrAssignMentor] = useState({});
  const [selectedMentorsForEditOrAssign, setSelectedMentorsForEditOrAssign] =
    useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [mentorpush,setMentorpush] = useState(false);
  useEffect(() => {

    if (!userInfo?.organizationId) {
      return;
    }
    Loading();
    axios
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/events?organization.organizationId=${userInfo?.organizationId}`)
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
        setMentorpush(false);

      })
      .catch((error) => {
        Loading().close();
        console.error(error);
      })
      .finally(() => {
        Loading().close();
      });
  }, [userInfo,mentorpush]);
  console.log(userRequesterEvents);
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
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/mentors/organizationId/${userInfo?.organizationId}/role/execution mentor`
        // `http://localhost:5000/api/v1/users/mentors/organizationId/${userInfo?.organizationId}/role/execution mentor`
      )
      .then((response) => {
        setMentors(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  const now = new Date();

  // Sort events by start_time where nearest future events come first
  const sortedEvents = userRequesterEvents.slice().sort((a, b) => {
    const dateA = new Date(a.start_time);
    const dateB = new Date(b.start_time);
    return dateA - dateB;
  }).filter(event => new Date(event?.start_time) > now);
  console.log(sortedEvents)
  const excludedEventId = sortedEvents[0]?._id;
  const filteredEvents = userRequesterEvents.filter(event => event?._id !== excludedEventId);

  function getEditedEvents(events) {
    return events.sort((a, b) => {
      // Normalize start times to Date objects
      const startTimeA = new Date(a?.start_time || a?.start?.dateTime || a?.start);
      const startTimeB = new Date(b?.start_time || b?.start?.dateTime || b?.start);

      // Sort in descending order (most recent dates first)
      return startTimeB - startTimeA;
    });
  }
  const editedEvents = getEditedEvents(filteredEvents);
  console.log(editedEvents);
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dropdownRef = useRef(null);

  const handleMentorSelectChange = (mentor, e) => {
    console.log(e.target.checked, mentor);
    if (e.target.checked) {
      setSelectedMentorsForEditOrAssign([
        ...selectedMentorsForEditOrAssign,
        {
          mentorId: mentor?._id,
          mentorEmail: mentor?.email,
          mentorRole: mentor?.role,
        },
      ]);
    } else {
      const data = selectedMentorsForEditOrAssign?.filter(
        (item) => item?.mentorId !== mentor?._id
      );
      console.log(data);
      setSelectedMentorsForEditOrAssign(data);
    }
    console.log(selectedMentorsForEditOrAssign);
    // setSelectedMentorsForEditOrAssign((prevState) =>
    //   prevState.includes(mentor)
    //     ? prevState.filter((item) => item?._id !== mentor?._id)
    //     : [...prevState, mentor]
    // );
  };
  const handleAddOrUpdateMentor = async (submissionId, index) => {
    Loading();
    if (selectedMentorsForEditOrAssign?.length > 0) {
      console.log(submissionId);
      console.log(selectedMentorsForEditOrAssign);
      const newAssign = await axios.put(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/eventId/${submissionId}/assign-executionMentor`,
        // `http://localhost:5000/api/v1/assignmentSubmissions/submissionId/${submissionId}/assign-mentor`,
        { executionMentors: selectedMentorsForEditOrAssign }
      );
      if (newAssign) {
        Loading().close();
        toast.success("Mentor Added Successfully!");
        console.log(newAssign);
        editedEvents[index].mentors = selectedMentorsForEditOrAssign;
        setMentorpush(true);
        setEditOrAssignMentor({});
      }
      // if (newAssignment?.data?.result?.acknowledged) {
      //   toast.success("Assignment added Successfully");
      //   const newNotification = await axios.post(
      //     `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
      //     {
      //       message: `New assignment added in course ${course?.courseFullName}.`,
      //       dateTime: new Date(),
      //       redirectLink: `/questLevels/${course?._id}?week=${chapter?.weekId}`,
      //       recipient: {
      //         type: "Students",
      //         organizationId: orgData?._id,
      //         courseId: course?._id,
      //         batches: selectedBatches,
      //       },
      //       type: "Create Task",
      //       readBy: [],
      //       notificationTriggeredBy: user?.email,
      //     }
      //   );
      //   console.log(newNotification);
      //   navigate(-1);
      // }

      // console.log(manageAssignment);
    }
    Loading().close();
  };
  return (
    <div>
      {userRequesterEvents?.length > 0 ? (
        // Render content specific to events where the user is the requester
        <>
          {/* <div className="flex gap-5 my-5 px-4">
            <p>
              <span>From Date :</span>
              <input
                className="p-2 border rounded ms-2"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </p>
            <p>
              <span>To Date :</span>
              <input
                className="p-2 border rounded ms-2"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </p>
          </div> */}
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
                  <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                    Assigned Mentor
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
                    <td className="py-4 px-6 border-b text-left text-black">
                        <div className=" flex gap-1">
                          <div>
                            {editOrAssignMentor?._id !== sortedEvents[0]?._id && (
                              <div className="flex gap-1">
                                <div
                                  className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] p-2 cursor-pointer"
                                  onClick={handleToggleDropdown}
                                >
                                  {sortedEvents[0]?.executionMentors?.length > 0 ? (
                                    sortedEvents[0]?.executionMentors?.map(
                                      (mentor, idx) => (
                                        <span className=" whitespace-nowrap">
                                          {sortedEvents[0]?.executionMentors?.length >
                                            idx + 1
                                            ? `${mentors?.find(
                                              (item) =>
                                                item?.email ===
                                                mentor?.mentorEmail
                                            )?.name
                                            }, `
                                            : mentors?.find(
                                              (item) =>
                                                item?.email ===
                                                mentor?.mentorEmail
                                            )?.name}
                                        </span>
                                      )
                                    )
                                  ) : (
                                    <span className=" whitespace-nowrap">
                                      Mentor not assigned!
                                    </span>
                                  )}
                                </div>
                                {userInfo?.role === "admin" && (
                                  <button
                                    onClick={() => {
                                      setEditOrAssignMentor(sortedEvents[0]);
                                      setSelectedMentorsForEditOrAssign(
                                        sortedEvents[0]?.executionMentors
                                          ? sortedEvents[0]?.executionMentors
                                          : []
                                      );
                                    }}
                                    className="px-3 py-1 bg-blue text-white rounded"
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            )}
                            {editOrAssignMentor?._id === sortedEvents[0]?._id &&
                              userInfo?.role === "admin" && (
                                <div className="flex items-end gap-1">
                                  <div className=" w-full rounded-md shadow-lg bg-white">
                                    <ul className="max-h-48 overflow-auto rounded-md py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
                                      {mentors?.map((mentor, idx) => (
                                        <li
                                          key={mentor?._id + idx}
                                          className="flex items-center p-2"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={selectedMentorsForEditOrAssign?.find(
                                              (item) =>
                                                item?.mentorId === mentor?._id
                                            )}
                                            onChange={(e) =>
                                              handleMentorSelectChange(
                                                mentor,
                                                e
                                              )
                                            }
                                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                          />
                                          <span className="ml-2 whitespace-nowrap text-gray-700">
                                            {mentor?.name}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleAddOrUpdateMentor(
                                        sortedEvents[0]?._id,
                                        0
                                      )
                                    }
                                    className="px-3 py-1 bg-blue text-white rounded"
                                  >
                                    Save
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                       
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
                      <td className="py-4 px-6 border-b text-left">
                        <div className=" flex gap-1">
                          <div>
                            {editOrAssignMentor?._id !== event?._id && (
                              <div className="flex gap-1">
                                <div
                                  className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] p-2 cursor-pointer"
                                  onClick={handleToggleDropdown}
                                >
                                  {event?.executionMentors?.length > 0 ? (
                                    event?.executionMentors?.map(
                                      (mentor, idx) => (
                                        <span className=" whitespace-nowrap">
                                          {event?.executionMentors?.length >
                                            idx + 1
                                            ? `${mentors?.find(
                                              (item) =>
                                                item?.email ===
                                                mentor?.mentorEmail
                                            )?.name
                                            }, `
                                            : mentors?.find(
                                              (item) =>
                                                item?.email ===
                                                mentor?.mentorEmail
                                            )?.name}
                                        </span>
                                      )
                                    )
                                  ) : (
                                    <span className=" whitespace-nowrap">
                                      Mentor not assigned!
                                    </span>
                                  )}
                                </div>
                                {userInfo?.role === "admin" && (
                                  <button
                                    onClick={() => {
                                      setEditOrAssignMentor(event);
                                      setSelectedMentorsForEditOrAssign(
                                        event?.executionMentors
                                          ? event?.executionMentors
                                          : []
                                      );
                                    }}
                                    className="px-3 py-1 bg-blue text-white rounded"
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            )}
                            {editOrAssignMentor?._id === event?._id &&
                              userInfo?.role === "admin" && (
                                <div className="flex items-end gap-1">
                                  <div className=" w-full rounded-md shadow-lg bg-white">
                                    <ul className="max-h-48 overflow-auto rounded-md py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
                                      {mentors?.map((mentor, idx) => (
                                        <li
                                          key={mentor?._id + idx}
                                          className="flex items-center p-2"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={selectedMentorsForEditOrAssign?.find(
                                              (item) =>
                                                item?.mentorId === mentor?._id
                                            )}
                                            onChange={(e) =>
                                              handleMentorSelectChange(
                                                mentor,
                                                e
                                              )
                                            }
                                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                          />
                                          <span className="ml-2 whitespace-nowrap text-gray-700">
                                            {mentor?.name}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleAddOrUpdateMentor(
                                        event?._id,
                                        index
                                      )
                                    }
                                    className="px-3 py-1 bg-blue text-white rounded"
                                  >
                                    Save
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-items-center gap-10 items-center">
           
            {userRequesterEvents.length > 0 ? (
              userRequesterEvents?.map((event, index) =>
                event?.requester ? (
                  <div
                    key={index}
                    className=" shadow-lg outline-double outline-offset-2 outline-2 outline-emerald-500  w-[320px] rounded p-2 "
                  >
                    <p className="flex gap-1 items-center text-sm">
                      <FiberManualRecordIcon
                        sx={{ color: red[400] }}
                      ></FiberManualRecordIcon>
                      Meeting with {event?.requester}
                    </p>
                    {event?.meetingType === "Zoom" ? (
                      <div className="flex items-center gap-2">
                        <div className="mt-3 mb-1 ">
                          <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                            <div className="flex justify-between gap-2">
                              <AccessAlarmOutlinedIcon fontSize="small" />
                              <span className="font-semibold text-[12px]">
                                Starts{" "}
                              </span>
                            </div>
                            <ul className="text-sm">
                              <li key={index}>
                                {formatTimeForZoom(
                                  event,
                                  event?.start_time ? "start" : ""
                                )}
                              </li>
                            </ul>
                          </p>
                          <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                            <div className="flex justify-between  gap-2">
                              <AccessAlarmOutlinedIcon fontSize="small" />
                              <span className="font-semibold text-[12px]">
                                Ends{" "}
                              </span>
                            </div>
                            <ul className="text-sm">
                              <li key={index}>
                                {formatTimeForZoom(
                                  event,
                                  event?.end_time ? "" : "end"
                                )}
                              </li>
                            </ul>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="mt-3 mb-1 ">
                          <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                            <div className="flex justify-between gap-2">
                              <AccessAlarmOutlinedIcon fontSize="small" />
                              <span className="font-semibold text-[12px]">
                                Starts{" "}
                              </span>
                            </div>
                            <ul className="text-sm">
                              {formatUtcDateTimeStringToListItems(
                                event?.start?.dateTime
                              )?.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </p>
                          <p className="font-medium text-sm flex justify-between mt-2 gap-2">
                            <div className="flex justify-between  gap-2">
                              <AccessAlarmOutlinedIcon fontSize="small" />
                              <span className="font-semibold text-[12px]">
                                Ends{" "}
                              </span>
                            </div>
                            <ul className="text-sm">
                              {formatUtcDateTimeStringToListItems(
                                event?.end?.dateTime
                              )?.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="grid gap-2 align-middle items-center">
                      <div className="w-10/12 mx-auto mt-3 text-white bg-sky-500  rounded-md">
                        <Link
                          to={
                            event?.meetingType === "Zoom"
                              ? userInfo?.role === "admin"
                                ? event?.start_url
                                : event?.join_url
                              : event?.hangoutLink
                          }
                          className="flex gap-2 items-center justify-center py-[6px]"
                        >
                          <img
                            src={
                              event?.meetingType === "Zoom"
                                ? zoom
                                : googlemeet
                            }
                            className="w-[21px] h-[21px]"
                            alt="googlemeet or zoom"
                          ></img>
                          <p>
                            Go to{" "}
                            {event?.meetingType === "Zoom"
                              ? "zoom"
                              : "meet"}{" "}
                            Link
                          </p>
                        </Link>
                      </div>

                    </div>
                  </div>
                ) : (
                  <></>
                )
              )
            ) : (
              <div className="col-span-full text-center">
              </div>
            )}


          </div> */}
        </>
      )
        : <p className="text-center font-medium text-sky-400 mt-5 ">No Upcoming Scheduled Events</p>}
    </div>
  );
};

export default AdminAllSchedule;


