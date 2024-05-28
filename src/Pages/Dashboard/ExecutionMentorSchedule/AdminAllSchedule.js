
import 'react-circular-progressbar/dist/styles.css';

import React, {
  useContext,
  useEffect,
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
const AdminAllSchedule = () => {
  const { userInfo, user } = useContext(AuthContext);
  const [userRequesterEvents, setUserRequesterEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(userInfo);
  const [events, setEvents] = useState([]);
 
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  useEffect(() => {
   
    if (!userInfo?.organizationId) {
      return;
    }
    Loading();
    axios
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/events?organization.organizationId=${userInfo?.organizationId}`)
      .then((response) => {

        console.log(response?.data);
        const currentDate = new Date(getCurrentDate()).getTime();
        const filteredEvents = response?.data.filter(event => {
          // Check for both date structures
          const eventStartDate = new Date(event.start?.dateTime || event.start_time).getTime();
          return eventStartDate >= currentDate;
        });
        Loading().close();
        setUserRequesterEvents(filteredEvents);
        setEvents(filteredEvents);
      })
      .catch((error) => {
        Loading().close();
        console.error(error);
      })
      .finally(() => {
        Loading().close();
      });
  }, [userInfo]);
  console.log(userRequesterEvents);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  function formatUtcDateTimeStringToListItems(dateTimeString) {
    const utcDateTime = new Date(dateTimeString);

    if (isNaN(utcDateTime.getTime())) {
      console.error("Invalid dateTimeString:", dateTimeString);
      return ["Invalid Date"];
    }

    const formatInTimeZone = (dateTime, timeZone, label) => (
      `${dateTime.toLocaleString('en-US', {
        timeZone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })} (${label})`
    );

    return [
      // formatInTimeZone(utcDateTime, "UTC", "UTC"),
      formatInTimeZone(utcDateTime, "Asia/Kolkata", "India-time"),
      // formatInTimeZone(utcDateTime, "Asia/Seoul", "Korea-time"),
      // formatInTimeZone(utcDateTime, "Asia/Dhaka", "Bangladesh-time"),
    ];
  }
  const formatTimeForZoom = (event, type) => {
    const utcTimeStr = event?.start_time;
    const timezoneStr = event?.timezone;
    const meetingLength = event?.duration; // Assuming this is in minutes
    const startDate = new Date(utcTimeStr);
    const meetingStartTime = new Date(utcTimeStr);
    const currentDateTime = new Date();
    const meetingEndTime = new Date(meetingStartTime.getTime() + meetingLength * 60000);

    // Convert start date to local time in the specified timezone
    const options = {
      timeZone: timezoneStr,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const meetingStart = startDate.toLocaleString(undefined, options);
    console.log(meetingStart);
    // Calculate end date by adding the duration to the start date
    const endDate = new Date(startDate.getTime() + meetingLength * 60000); // 60000 ms in a minute

    // Convert end date to local time in the specified timezone
    const meetingEnd = endDate.toLocaleString(undefined, options);
    if (currentDateTime > meetingEndTime && type === 'start') {
      return 'The meeting has already happened.'
    } else if (currentDateTime < meetingEndTime && type === 'start') {
      return meetingStart;
    }
    else if (currentDateTime > meetingEndTime && type === 'end') {
      return "";
    }
    else if (currentDateTime < meetingEndTime && type === 'end') {
      return meetingEnd;
    }
  }
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
  return (
    <div>
      {userRequesterEvents?.length > 0 ? (
        // Render content specific to events where the user is the requester
        <>
          <div className="flex gap-5 my-5 px-4">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5 justify-items-center gap-10 items-center">
            {/* <p>You are the requester in the following events:</p> */}
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
                <p className="font-medium">
                  No events found for the selected date range.
                </p>
              </div>
            )}
            
            {/* Add any additional content or components specific to user requester events */}
          </div>
        </>
      )
        : <p className="text-center font-medium text-sky-400 mt-5 ">No Upcoming Scheduled Events</p>}
    </div>
  );
};

export default AdminAllSchedule;
