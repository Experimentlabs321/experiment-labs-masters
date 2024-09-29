import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import Level from "./Level";
import DashboardUserUpdate from "./DashboardUserUpdate";
import AdjustIcon from "@mui/icons-material/Adjust";
import TechnicalUpdate from "./TechnicalUpdate";
import UpcomingQuest from "../../../assets/Dashboard/UpcomingQuest.png";
import RightArrowBlack from "../../../assets/Dashboard/RightArrowBlack.png";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import googlemeet from "../../../assets/icons/googlemeet.png";
import { red } from "@mui/material/colors";
import "./style.css";
import Lock from "../../../assets/Dashboard/lock.png";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
// import SendEvent from "./SendEvent";
import Person from "../../../assets/Dashboard/person.png";
import PersonForMobile from "../../../assets/Dashboard/personForMobile.png";
import OpenBox from "../../../assets/Dashboard/OpenBox.png";
import WeekUpdate from "../../../assets/Dashboard/WeekUpdate.png";
import Challenges from "../../../assets/Dashboard/Challenges.png";
import DashboardCourses from "./DashboardCourses";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import zoom from "../../../assets/icons/zoom-240.png";
const Dashboard = () => {
  const data = [
    {
      name: "Level - 1",
      status: "Completed",
      score: "20/25",
      expression: "👍",
    },
    {
      name: "Level - 2",
      status: "Completed",
      score: "37/60",
      expression: "🤞",
    },
    {
      name: "Level - 3",
      status: "Completed",
      score: "40/60",
      expression: "🙌",
    },
    {
      name: "Level - 4",
      status: "Ongoing",
      score: "0/60",
    },
    {
      name: "Level - 5",
      status: "Locked",
      score: "0/160",
    },
    {
      name: "Level - 6",
      status: "Locked",
      score: "0/160",
    },
    {
      name: "Level - 7",
      status: "Locked",
      score: "0/160",
    },
    {
      name: "Level - 8",
      status: "Locked",
      score: "0/160",
    },
    {
      name: "Level - 9",
      status: "Locked",
      score: "0/160",
    },
    {
      name: "Level - 10",
      status: "Locked",
      score: "0/160",
    },
    {
      name: "Level - 11",
      status: "Locked",
      score: "0/160",
    },
    {
      name: "Level - 12",
      status: "Locked",
      score: "0/160",
    },
  ];

  const [viewAllLevel, setViewAllLevel] = useState(false);
  // const [length, setLength] = useState(data.length < 5 ? data.length : 5);
  const [length, setLength] = useState(data.length);
  const [courses, setCourses] = useState([]);
  const [userRequesterEvents, setUserRequesterEvents] = useState([]);
  const { userInfo, user } = useContext(AuthContext);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [weeks, setWeeks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentWeekCompletion, setCurrentWeekCompletion] = useState(0);
  const [currentCourseCompletion, setCurrentCourseCompletion] = useState(0);
  const [dashboardTheme, setDashboardTheme] = useState({});
  const [courseAccessUrl, setCourseAccessUrl] = useState(``);

  const handleViewAllLevel = () => {
    setViewAllLevel(true);
    setLength(data.length);
  };

  const handleCloseViewAllLevel = () => {
    setViewAllLevel(false);
    setLength(data.length < 5 ? data.length : 5);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/userId/${userInfo._id}`
      )
      .then((response) => {
        setCourses(response?.data);

        if (localStorage.getItem("course")) {
          const findCourse = response?.data?.find(
            (item) => item?.courseFullName === localStorage.getItem("course")
          );
          if (findCourse) {
            setSelectedCourse(findCourse);
            setIsLoading(false);
          } else {
            setSelectedCourse(response?.data[0]);
            setIsLoading(false);
          }
        } else {
          setSelectedCourse(response?.data[0]);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [userInfo]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks/courseId/${selectedCourse?._id}`
  //     )
  //     .then((response) => {
  //       setWeeks(response?.data || []);
  //       setIsLoading(false)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       setIsLoading(false)
  //     });
  // }, [selectedCourse]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks/courseId/${selectedCourse?._id}`
      )
      .then((response) => {
        // console.log('API Response:', response?.data);  // Log response data
        setWeeks(Array.isArray(response?.data) ? response?.data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [selectedCourse]);

  useEffect(() => {
    setCurrentWeek(null);
    weeks?.forEach((singleData) => {
      const weekStartDate = new Date(singleData?.weekStartDate);
      const weekEndDate = new Date(singleData?.weekEndDate);
      const currentDateTime = new Date();
      if (weekStartDate <= currentDateTime && weekEndDate >= currentDateTime) {
        setCurrentWeek(singleData);
        setIsLoading(false);
        return;
      }
    });
  }, [selectedCourse, weeks]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/weekId/${currentWeek?._id}`
  //     )
  //     .then((response) => {
  //       setChapters(response?.data || []);
  //       setIsLoading(false)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       setIsLoading(false)
  //     });
  // }, [currentWeek]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/weekId/${currentWeek?._id}`
      )
      .then((response) => {
        console.log("API Response:", response?.data); // Add this line
        setChapters(Array.isArray(response?.data) ? response?.data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [currentWeek]);

  useEffect(() => {
    let totalCompleted = 0;
    let totalTask = 0;
    if (chapters) {
      chapters?.forEach((item) => {
        // console.log(item);
        item?.tasks?.forEach((task) => {
          totalTask++;
          if (task?.participants) {
            if (
              task?.participants?.find(
                (item) => item?.participantId === userInfo?._id
              )
            ) {
              totalCompleted++;
            }
          }
        });
      });
    }
    setCurrentWeekCompletion(parseInt((totalCompleted / totalTask) * 100));
    setIsLoading(false);
    //  console.log(totalCompleted, totalTask);
  }, [chapters, user, userInfo]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters`)
      .then((response) => {
        const currentCourseChapter = response?.data?.filter(
          (item) => item?.courseId === selectedCourse?._id
        );
        if (currentCourseChapter) {
          let totalCompleted = 0;
          let totalTask = 0;
          currentCourseChapter?.forEach((item) => {
            item?.tasks?.forEach((singleTask) => {
              totalTask++;
              if (singleTask?.participants) {
                if (
                  singleTask?.participants?.find(
                    (item) => item?.participantId === userInfo?._id
                  )
                ) {
                  totalCompleted++;
                }
              }
            });
          });
          setCurrentCourseCompletion(
            parseInt((totalCompleted / totalTask) * 100)
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [user, userInfo, selectedCourse]);
  function isWithinSixtyMinutes(startTime) {
    const now = new Date();
    // console.log("time now ", now)
    const start = new Date(startTime);
    // console.log("start time ", start)
    const diffInMs = start - now;
    const diffInMinutes = diffInMs / (1000 * 60);
    return diffInMinutes <= 60;
  }
  const handleLinkClick = async (event, userInfo, meetingType, link) => {
    const scheduleData = await axios.get(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/schedule/taskId/${event?.scheduleId}`
    );
    // console.log(scheduleData);
    const sendData = {
      participantChapter: {
        email: userInfo?.email,
        participantId: userInfo?._id,
        status: "Completed",
        completionDateTime: new Date(),
      },
      participantTask: {
        participant: {
          email: userInfo?.email,
          participantId: userInfo?._id,
          status: "Completed",
          completionDateTime: new Date(),
        },
      },
    };

    try {
      if (scheduleData?.data?.chapterId) {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/Schedule/taskId/${event?.scheduleId}/chapterId/${scheduleData?.data?.chapterId}`,
          sendData
        );
        // console.log(response);

        if (response.status === 200) {
          // Navigate to the meeting link
          window.location.href = link;
        }
      }
    } catch (error) {
      console.error("Error sending participant data:", error);
    }
  };
  const dashboardImages = {
    userImg: Person,
    userImgMobile: PersonForMobile,
    treasureImg: OpenBox,
    questImg: WeekUpdate,
    challengesImg: Challenges,
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setDashboardTheme(response?.data?.dashboardTheme || {});
        setCourseAccessUrl(response?.data?.courseAccessUrl || "");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [userInfo]);
  useEffect(() => {
    if (!userInfo?.email) {
      return;
    }
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/email/${userInfo.email}`
      )
      .then((response) => {
        // console.log(response?.data);
        const currentDate = new Date(getCurrentDate()).getTime();
        const filteredEvents = response?.data.filter((event) => {
          // Check for both date structures
          const eventStartDate = new Date(
            event.start?.dateTime || event.start_time
          ).getTime();
          return eventStartDate >= currentDate;
        });
        setUserRequesterEvents(filteredEvents);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userInfo]);
  // console.log(userRequesterEvents);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  function getCurrentDatee() {
    // This function should return the current date in the format required by your comparison.
    // Make sure this returns a date string or a timestamp that can be directly compared.
    return new Date().toISOString();
  }
  function formatUtcDateTimeStringToListItems(dateTimeString) {
    const utcDateTime = new Date(dateTimeString);

    if (isNaN(utcDateTime.getTime())) {
      console.error("Invalid dateTimeString:", dateTimeString);
      return ["Invalid Date"];
    }

    const formatInTimeZone = (dateTime, timeZone, label) =>
      `${dateTime.toLocaleString("en-US", {
        timeZone,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })} (${label})`;

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
    const meetingEndTime = new Date(
      meetingStartTime.getTime() + meetingLength * 60000
    );

    // Convert start date to local time in the specified timezone
    const options = {
      timeZone: timezoneStr,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const meetingStart = startDate.toLocaleString(undefined, options);
    //console.log(meetingStart);
    // Calculate end date by adding the duration to the start date
    const endDate = new Date(startDate.getTime() + meetingLength * 60000); // 60000 ms in a minute

    // Convert end date to local time in the specified timezone
    const meetingEnd = endDate.toLocaleString(undefined, options);
    if (currentDateTime > meetingEndTime && type === "start") {
      return "The meeting has already happened.";
    } else if (currentDateTime < meetingEndTime && type === "start") {
      return meetingStart;
    } else if (currentDateTime > meetingEndTime && type === "end") {
      return "";
    } else if (currentDateTime < meetingEndTime && type === "end") {
      return meetingEnd;
    }
  };
  return (
    <div>
      <Layout>
        <div className="">
          <div className="grid grid-col-1 lg:grid-cols-3 gap-2">
            <div className="lg:col-span-2 pt-20 lg:pt-10 px-4">
              <DashboardUserUpdate
                dashboardImages={dashboardImages}
                currentCourseCompletion={currentCourseCompletion}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                courses={courses}
                setSelectedCourse={setSelectedCourse}
                selectedCourse={selectedCourse}
                weeks={weeks}
                dashboardTheme={dashboardTheme}
                isLoading={isLoading}
              />
              {/* <SendEvent /> */}
            </div>
            <div className={`lg:max-h-[732px]  lg:overflow-y-scroll`}>
              {dashboardTheme?.showLabJourney && (
                <div
                  className={`mb-3 lg:border-b-2 lg:border-l-2 lg:border-[#E8E8E8] pt-10 pb-10 px-4 text-center lg:max-h-[732px] overflow-x-scroll lg:overflow-y-scroll ${
                    viewAllLevel ? "labJourney" : "labJourneyRemoveScroll"
                  } `}
                >
                  <h1 className="text-[18px] lg:text-[26px] font-[700]">
                    Lab Journey
                  </h1>

                  <div className="pt-[40px] px-[30px] w-full  relative">
                    {weeks?.map((singleData, i) => (
                      <Level
                        selectedCourse={selectedCourse}
                        viewAllLevel={viewAllLevel}
                        length={length}
                        onClick={handleCloseViewAllLevel}
                        singleData={singleData}
                        i={i}
                        key={singleData?._id}
                      />
                    ))}
                  </div>
                  {/*  <div className="mt-[20px] bg-[#D7ECFF] labJourney rounded-lg px-[10px] flex lg:hidden overflow-x-scroll h-[155px]">
                    {data?.map((singleData, i) => (
                      <div
                        className={`${i % 2 === 0
                          ? "flex-col border-b-white border-b-0 rounded-t-full"
                          : " flex-col-reverse border-t-white border-t-0 rounded-b-full self-end"
                          } h-[92px] relative flex ml-[-5.26px] p-[5px] border-[#0F3934] border-[5px] overflow-visible my-4`}
                      >
                        <div
                          // style={[{ boxShadow: "1.70448px 1.70448px 0px #000000" }]}
                          className={`rounded-[50%] w-[44px] h-[44px] lg:w-[71px] lg:h-[69px] flex flex-col items-center justify-center text-[8px] lg:text-[17px] font-[700] underline underline-offset-4 z-[1] ${singleData?.status === "Completed" &&
                            " decoration-white text-white bg-[#3E4DAC]"
                            } ${singleData?.status === "Ongoing" && "  bg-[#FFDB70]"
                            } ${singleData?.status === "Locked"
                              ? "lockShadow border-x-4 border-y-4 bg-[#D9D9D9] text-[#706F6F]"
                              : "normalShadow"
                            }`}
                        >
                          {singleData?.status === "Ongoing" && (
                            <h1 className="text-[8px] lg:text-[13px] ">
                              Ongoing
                            </h1>
                          )}
                          {singleData?.status === "Locked" && (
                            <img
                              className="w-[12px] h-[10px]"
                              src={Lock}
                              alt="lock"
                            />
                          )}
                          <h1
                            className={`${singleData?.status !== "Completed" &&
                              "text-[8px] lg:text-[13px]"
                              }`}
                          >
                            {singleData?.score}
                          </h1>
                          {singleData?.status === "Completed" && (
                            <h1>{singleData?.expression}</h1>
                          )}
                        </div>
                        <h1
                          className={`underline underline-offset-2 rounded-[9px] z-0 text-[8px] lg:text-[12px] font-[700] py-1 ${singleData?.status === "Completed" && "bg-[#9CAAFF]"
                            } ${singleData?.status === "Ongoing" && "bg-[#FFC13D]"
                            } ${singleData?.status === "Locked" && "bg-[#D9D9D9]"
                            } ${i % 2 === 0 ? "mt-[10px]" : "mb-[10px]"}`}
                        >
                          {singleData?.name}
                        </h1>
                      </div>
                    ))}
                  </div> */}
                </div>
              )}
              {dashboardTheme?.showSchedule && (
                <div>
                  {userRequesterEvents?.length > 0 ? (
                    // Render content specific to events where the user is the requester
                    <div className="grid grid-cols-1 my-5 justify-items-center gap-5 items-center">
                      {/* <p>You are the requester in the following events:</p> */}
                      {userRequesterEvents?.map((event, index) => (
                        <div
                          key={index}
                          className=" shadow-lg outline-double outline-offset-2 outline-2 outline-emerald-500  w-[80%] rounded p-2 "
                        >
                          <p className="flex gap-1 items-center text-sm">
                            <FiberManualRecordIcon
                              sx={{ color: red[400] }}
                            ></FiberManualRecordIcon>
                            Meeting with {event?.organization?.organizationName}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="mt-3 mb-1 ">
                              <p className="font-medium text-sm flex justify-between  gap-2 my-1">
                                <div className="flex justify-between gap-2">
                                  <AccessAlarmOutlinedIcon fontSize="small" />
                                  <span className="font-semibold text-[14px]">
                                    Starts{" "}
                                  </span>
                                </div>
                                <ul className="text-[13px]">
                                  {event?.meetingType === "Zoom" ? (
                                    <li key={index}>
                                      {formatTimeForZoom(
                                        event,
                                        event?.start_time ? "start" : ""
                                      )}
                                    </li>
                                  ) : (
                                    formatUtcDateTimeStringToListItems(
                                      event?.start?.dateTime
                                    )?.map((item, index) => (
                                      <li key={index}>{item}</li>
                                    ))
                                  )}
                                </ul>
                              </p>
                              <p className="font-medium text-sm flex  justify-between gap-2 mt-2">
                                <div className="flex  justify-between gap-2">
                                  <AccessAlarmOutlinedIcon fontSize="small" />
                                  <span className="font-semibold text-[14px]">
                                    Ends{" "}
                                  </span>
                                </div>
                                <ul className="text-[13px]">
                                  {event?.meetingType === "Zoom" ? (
                                    <li key={index}>
                                      {formatTimeForZoom(
                                        event,
                                        event?.end_time ? "" : "end"
                                      )}
                                    </li>
                                  ) : (
                                    formatUtcDateTimeStringToListItems(
                                      event?.end?.dateTime
                                    )?.map((item, index) => (
                                      <li key={index}>{item}</li>
                                    ))
                                  )}
                                </ul>
                              </p>
                            </div>
                          </div>
                          <div className="w-11/12 mx-auto mt-3 text-white bg-sky-600  rounded-md">
                            {/* <Link to={event?.hangoutLink} className="flex gap-2 items-center justify-center py-[6px]">
                              <img src={googlemeet} className="w-[21px] h-[21px]" alt="googlemeet"></img><p>Go to Meet Link</p>
                            </Link> */}
                            {isWithinSixtyMinutes(event?.start_time) ? (
                              <div>
                                <button
                                  onClick={() =>
                                    handleLinkClick(
                                      event,
                                      userInfo,
                                      event?.meetingType,
                                      event?.meetingType === "Zoom"
                                        ? userInfo?.role === "admin"
                                          ? event?.start_url
                                          : event?.join_url
                                        : event?.hangoutLink
                                    )
                                  }
                                  className="flex gap-2 items-center justify-center py-[6px] w-full"
                                >
                                  <img
                                    src={
                                      event?.meetingType === "Zoom"
                                        ? zoom
                                        : googlemeet
                                    }
                                    className="w-[21px] h-[21px]"
                                    alt="googlemeet or zoom"
                                  />
                                  <p>
                                    Go to{" "}
                                    {event?.meetingType === "Zoom"
                                      ? "zoom"
                                      : "meet"}{" "}
                                    Link
                                  </p>
                                </button>
                              </div>
                            ) : (
                              <p className="mt-3 text-center">
                                Link will be available 60 minutes before the
                                start time
                              </p>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add any additional content or components specific to user requester events */}
                    </div>
                  ) : (
                    <p className="text-center font-medium text-sky-400 mt-5 ">
                      No Upcoming Scheduled Events
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          {(dashboardTheme?.addRequestSlots ||
            dashboardTheme?.addChallenges) && (
            <div className="lg:grid lg:grid-cols-3 gap-2 mb-[150px] lg:mb-0">
              {(dashboardTheme?.addRequestSlots ||
                dashboardTheme?.addChallenges) && (
                <div className="lg:col-span-2 pt-10 px-4">
                  <TechnicalUpdate
                    dashboardImages={dashboardImages}
                    currentWeekCompletion={currentWeekCompletion}
                    selectedCourse={selectedCourse}
                    weeks={weeks}
                    dashboardTheme={dashboardTheme}
                  />
                </div>
              )}
              {/* <div className=" lg:border-b-2 lg:border-l-2 lg:border-[#E8E8E8] pt-10 px-4">
              <div className="w-full flex justify-center">
                <div className="w-full lg:max-w-[355px] lg:h-[515px]">
                  <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[32px]">
                    Upcoming Quest
                  </h1>
                  <div
                    style={{
                      filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                    }}
                    className="bg-[#1F093C] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-row lg:flex-col lg:justify-between items-center gap-3 lg:gap-5"
                  >
                    <div className="bg-[#FF1B1B] text-center rounded-md w-[75%] lg:w-full">
                      <img
                        className="self-center w-full"
                        src={UpcomingQuest}
                        alt="Challenges"
                      />
                    </div>
                    <h1 className="text-[14px] hidden lg:block lg:text-[18px] text-white font-[700]">
                      Week 5: Networking
                    </h1>
                    <div className="w-full hidden lg:flex justify-around items-center">
                      <button className="bg-[#FFDB70] p-[6px] lg:p-[12px] text-[10px] font-[700] rounded-full">
                        Thursday
                      </button>
                      <button className="bg-[#FFDB70] p-[6px] lg:p-[12px] text-[10px] font-[700] rounded-full">
                        Quest-4
                      </button>
                      <button className="bg-[#FFDB70] p-[6px] lg:p-[12px] text-[10px] font-[700] rounded-full">
                        2 hours
                      </button>
                    </div>
                    <div className="w-full hidden lg:block">
                      <DashboardPrimaryButton
                        bgColor="#FFDB70"
                        shadow="0px 7.50435px 0px #F08323"
                        width="full"
                      >
                        <p className="flex items-center justify-center">
                          Set Reminder{" "}
                          <img
                            className="pl-1 w-[21px] lg:w-[32px]"
                            src={RightArrowBlack}
                            alt="RightArrowBlack"
                          />
                        </p>
                      </DashboardPrimaryButton>
                    </div>
                    <div className="lg:hidden flex flex-col items-center justify-around w-full h-full">
                      <h1 className="text-[14px] lg:text-[18px] text-white font-[700]">
                        Week 5: Networking
                      </h1>
                      <div className="w-full flex justify-around items-center">
                        <button className="bg-[#FFDB70] p-[6px] lg:p-[12px] text-[10px] font-[700] rounded-full">
                          Thursday
                        </button>
                        <button className="bg-[#FFDB70] p-[6px] lg:p-[12px] text-[10px] font-[700] rounded-full">
                          Quest-4
                        </button>
                        <button className="bg-[#FFDB70] p-[6px] lg:p-[12px] text-[10px] font-[700] rounded-full">
                          2 hours
                        </button>
                      </div>
                      <DashboardPrimaryButton
                        bgColor="#FFDB70"
                        shadow="0px 7.50435px 0px #F08323"
                        width="full"
                      >
                        <p className="flex items-center justify-center">
                          Set Reminder{" "}
                          <img
                            className="pl-1 w-[21px] lg:w-[32px]"
                            src={RightArrowBlack}
                            alt="RightArrowBlack"
                          />
                        </p>
                      </DashboardPrimaryButton>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            </div>
          )}
          <div>
            {dashboardTheme?.addCourses && (
              <DashboardCourses
                courseAccessUrl={courseAccessUrl}
                myCoursesChecked={dashboardTheme?.myCoursesChecked}
                allCoursesChecked={dashboardTheme?.allCoursesChecked}
              />
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
