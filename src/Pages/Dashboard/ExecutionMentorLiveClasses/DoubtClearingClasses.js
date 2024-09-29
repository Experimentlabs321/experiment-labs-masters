import React, { useContext, useEffect, useState } from "react";
import clock from "../../../assets/ExecutionMentor/clock.svg";
import list from "../../../assets/ExecutionMentor/list.svg";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import ScheduleStudentsList from "./ScheduleStudentsList";

const DoubtClearingClasses = () => {
  const { userInfo } = useContext(AuthContext);
  const [userRequesterEvents, setUserRequesterEvents] = useState([]);

  const [events, setEvents] = useState([]);
  const [studentOpen, setStudentOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (!userInfo?.email) {
      return;
    }
    Loading();
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/mentorEmail/${userInfo?.email}`
      )
      .then((response) => {
        Loading().close();
        //console.log(response?.data)
        setUserRequesterEvents(response?.data);
        setEvents(response?.data);
        const currentDate = new Date(getCurrentDate()).getTime();
        const filteredEvents = response?.data.filter((event) => {
          // Check for both date structures
          const eventStartDate = new Date(
            event.start?.dateTime || event.start_time
          ).getTime();
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

  const reloadEventData = () => {
    if (userInfo?.email) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/mentorEmail/${userInfo?.email}`
        )
        .then((response) => {
          setUserRequesterEvents(response?.data);
          setEvents(response?.data);
          const currentDate = new Date(getCurrentDate()).getTime();
          const filteredEvents = response?.data.filter((event) => {
            // Check for both date structures
            const eventStartDate = new Date(
              event.start?.dateTime || event.start_time
            ).getTime();
            return eventStartDate >= currentDate;
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    }
  };
  // Helper function to get today's date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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

      // console.log("from :", from, "to :", to, "start :", startTime);
      // Ensure both startTime and endTime are valid Date objects before comparing
      return startTime && startTime >= from && startTime <= to;
    });

    setUserRequesterEvents(filtered);
  };
  useEffect(() => {
    filterEventsByDate();
  }, [fromDate, toDate, events]);

  const now = new Date();
  const sortedEvents = userRequesterEvents
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a?.start_time);
      const dateB = new Date(b?.start_time);
      return dateA - dateB;
    })
    .filter((event) => new Date(event?.start_time) > now);
  // console.log(sortedEvents);
  const excludedEventId = sortedEvents[0]?._id;

  const filteredEvents = userRequesterEvents.filter(
    (event) => event?._id !== excludedEventId
  );

  function getEditedEvents(events) {
    return events.sort((a, b) => {
      // Normalize start times to Date objects
      const startTimeA = new Date(
        a?.start_time || a.start?.dateTime || a?.start
      );
      const startTimeB = new Date(
        b?.start_time || b.start?.dateTime || b?.start
      );

      // Sort in descending order (most recent dates first)
      return startTimeB - startTimeA;
    });
  }
  const editedEvents = getEditedEvents(filteredEvents);

  const getTimeLeft = (startTime) => {
    const diff = new Date(startTime) - now;
    if (diff <= 0) return null;

    const minutes = Math.floor(diff / 60000) % 60;
    const hours = Math.floor(diff / 3600000);

    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m left`;
  };

  const listView = (event) => {
    setStudentOpen(true);
    setEventDetails(event);

    // setSelectedBatchId(id);
    // setParticipants(participants);
    // setClassId(classId);

    //  console.log(id)
  };
  /*   console.log(sortedEvents);
  console.log(editedEvents); */

  return (
    <div>
      <ScheduleStudentsList
        setStudentOpen={setStudentOpen}
        eventDetails={eventDetails}
        studentOpen={studentOpen}
        reloadEventData={reloadEventData}
      />
      {userRequesterEvents?.length > 0 ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mx-5 my-10">
          {sortedEvents.length > 0 && (
            <div
              className="p-5 "
              style={{
                borderRadius: "10px",
                border: "1px solid #EFEFEF",

                boxShadow: "0px 4px 4px 0px rgba(57, 80, 126, 0.14)",
              }}
            >
              <div className="flex gap-2 border-b pb-2">
                {/* <div className="">
                  <img src="" alt="imag" />
                </div> */}
                <div className="flex flex-col gap-2 ">
                  <p className="text-xl font-medium">
                    {sortedEvents[0].topic
                      ? sortedEvents[0].topic
                      : sortedEvents[0].summary}
                  </p>
                  <p className="flex justify-between text-sm font-normal text-[#8A8A8A]">
                    {sortedEvents[0].studentName}{" "}
                    {/* <span className="flex gap-2 text-[#2E8760] bg-[#E3FFF3] rounded-md px-2">
                      <img src={active} />
                      <span>online</span>
                    </span> */}
                  </p>
                  <p className="text-[#2E8760] text-sm font-normal">
                    {sortedEvents[0].start_time
                      ? new Date(sortedEvents[0].start_time).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : sortedEvents[0].start
                      ? new Date(sortedEvents[0].start).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : ""}{" "}
                    ||{" "}
                    {sortedEvents[0].start_time
                      ? new Date(sortedEvents[0].start_time).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          }
                        )
                      : sortedEvents[0].start
                      ? new Date(sortedEvents[0].start).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          }
                        )
                      : ""}
                  </p>
                </div>
              </div>
              <div className="text-[#8A8A8A] text-base font-normal my-5">
                <p className=" flex gap-5 ">
                  <img src={clock} alt="clock" />{" "}
                  {getTimeLeft(
                    new Date(
                      sortedEvents[0].start_time ||
                        sortedEvents[0].start.dateTime ||
                        sortedEvents[0].start
                    )
                  ) || " Time ended"}
                </p>
                <p
                  // onClick={() =>
                  //   listView(
                  //     sortedEvents[0]
                  //   )
                  // }
                  className=" mt-3 flex gap-5 cursor-pointer"
                >
                  <img src={list} alt="list" /> Students -{" "}
                  {sortedEvents[0]?.participants?.length || 0}/1
                </p>
              </div>
              <div className=" flex justify-center">
                <Link
                  to={
                    sortedEvents[0]?.meetingType === "Zoom"
                      ? userInfo?.role === "admin"
                        ? sortedEvents[0]?.start_url
                        : sortedEvents[0]?.join_url
                      : sortedEvents[0]?.hangoutLink
                  }
                  className="px-6 py-1 text-[#fff] text-base font-medium"
                  style={{
                    borderRadius: "7px",
                    background:
                      "linear-gradient(180deg, #2063DA 0%, #081765 100%)",
                  }}
                >
                  Join now
                </Link>
              </div>
            </div>
          )}
          {editedEvents.map((event, index) => {
            const eventStartTime = new Date(
              event.start_time || event.start.dateTime || event.start
            );
            const timeLeft = getTimeLeft(eventStartTime);

            return (
              <div
                className="p-5"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #EFEFEF",
                  background: "#FFF",
                  boxShadow: "0px 4px 4px 0px rgba(57, 80, 126, 0.14)",
                }}
              >
                <div className="flex gap-2 border-b pb-2">
                  {/* <div className="">
                  <img src="" alt="imag" />
                </div> */}
                  <div className="flex flex-col gap-2 ">
                    <p className="text-xl font-medium">
                      {event?.topic ? event?.topic : event?.summary}
                    </p>
                    <p className="flex justify-between text-sm font-normal text-[#8A8A8A]">
                      {event?.studentName}{" "}
                      {/* <span className="flex gap-2 text-[#2E8760] bg-[#E3FFF3] rounded-md px-2">
                      <img src={active} />
                      <span>online</span>
                    </span> */}
                    </p>
                    <p className="text-[#2E8760] text-sm font-normal">
                      {event?.start_time
                        ? new Date(event.start_time).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long", // "Monday"
                              year: "numeric", // "2024"
                              month: "long", // "May"
                              day: "numeric", // "30"
                            }
                          )
                        : event?.start
                        ? new Date(event.start).toLocaleDateString("en-US", {
                            weekday: "long", // "Monday"
                            year: "numeric", // "2024"
                            month: "long", // "May"
                            day: "numeric", // "30"
                          })
                        : event?.start.dateTime
                        ? new Date(event.start.dateTime).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long", // "Monday"
                              year: "numeric", // "2024"
                              month: "long", // "May"
                              day: "numeric", // "30"
                            }
                          )
                        : ""}{" "}
                      ||{" "}
                      {event?.start_time
                        ? new Date(event.start_time).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            }
                          )
                        : event?.start
                        ? new Date(event.start).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })
                        : event?.start.dateTime
                        ? new Date(event.start.dateTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            }
                          )
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="text-[#8A8A8A] text-base font-normal my-5">
                  <p className=" flex gap-5 ">
                    <img src={clock} alt="clock" /> {timeLeft || "Time ended"}
                  </p>
                  <p
                    onClick={() => listView(event)}
                    className=" mt-3 flex gap-5 cursor-pointer"
                  >
                    <img src={list} alt="list" /> Students -{" "}
                    {event?.participants?.length || 0}/1
                  </p>
                </div>
                <div className=" flex justify-center">
                  {eventStartTime < now ? (
                    <p className="text-sm border rounded-md p-2 text-[#A1887F]">
                      Meeting Concluded
                    </p> // Show this if the meeting time is in the past
                  ) : (
                    <Link
                      to={
                        event?.meetingType === "Zoom"
                          ? userInfo?.role === "admin"
                            ? event?.start_url
                            : event?.join_url
                          : event?.hangoutLink
                      }
                      className="px-6 py-1 text-[#fff] text-base font-medium"
                      style={{
                        borderRadius: "7px",
                        background:
                          "linear-gradient(180deg, #2063DA 0%, #081765 100%)",
                      }}
                    >
                      Join now
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center font-medium text-sky-400 mt-5 ">
          No Upcoming Scheduled Events
        </p>
      )}
    </div>
  );
};

export default DoubtClearingClasses;
