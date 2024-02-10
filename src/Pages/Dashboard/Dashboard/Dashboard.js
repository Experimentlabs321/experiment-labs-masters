import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import Level from "./Level";
import DashboardUserUpdate from "./DashboardUserUpdate";
import AdjustIcon from '@mui/icons-material/Adjust';
import TechnicalUpdate from "./TechnicalUpdate";
import UpcomingQuest from "../../../assets/Dashboard/UpcomingQuest.png";
import RightArrowBlack from "../../../assets/Dashboard/RightArrowBlack.png";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
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
import { Link } from "react-router-dom";
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
  const [currentWeek, setCurrentWeek] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentWeekCompletion, setCurrentWeekCompletion] = useState(0);
  const [currentCourseCompletion, setCurrentCourseCompletion] = useState(0);
  const [dashboardTheme, setDashboardTheme] = useState({});

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
        `${process.env.REACT_APP_SERVER_API}/api/v1/courses/userId/${userInfo._id}`
      )
      .then((response) => {
        setCourses(response?.data);
        if (localStorage.getItem("course")) {
          const findCourse = response?.data?.find(
            (item) => item?.courseFullName === localStorage.getItem("course")
          );
          if (findCourse) {
            setSelectedCourse(findCourse);
          } else setSelectedCourse(response?.data[0]);
        } else setSelectedCourse(response?.data[0]);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/weeks/courseId/${selectedCourse?._id}`
      )
      .then((response) => {
        setWeeks(response?.data);
      })
      .catch((error) => console.error(error));
  }, [selectedCourse]);

  useEffect(() => {
    setCurrentWeek(null);
    weeks.forEach((singleData) => {
      const weekStartDate = new Date(singleData?.weekStartDate);
      const weekEndDate = new Date(singleData?.weekEndDate);
      const currentDateTime = new Date();
      if (weekStartDate <= currentDateTime && weekEndDate >= currentDateTime) {
        setCurrentWeek(singleData);
        return;
      }
    });
  }, [selectedCourse, weeks]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/chapters/weekId/${currentWeek?._id}`
      )
      .then((response) => {
        setChapters(response?.data);
      })
      .catch((error) => console.error(error));
  }, [currentWeek]);
  useEffect(() => {
    let totalCompleted = 0;
    let totalTask = 0;
    if (chapters) {
      chapters.forEach((item) => {
        console.log(item);
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
    console.log(totalCompleted, totalTask);
  }, [chapters, user, userInfo]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/api/v1/chapters`)
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
        }
      })
      .catch((error) => console.error(error));
  }, [user, userInfo, selectedCourse]);

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
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setDashboardTheme(response?.data?.dashboardTheme || {});
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/events/email/${userInfo?.email}`
      )
      .then((response) => {
        setUserRequesterEvents(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  console.log(userRequesterEvents);
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
              />
              {/* <SendEvent /> */}
            </div>
            {dashboardTheme?.showLabJourney && (
              <div
                className={`lg:border-b-2 lg:border-l-2 lg:border-[#E8E8E8] pt-10 pb-10 px-4 text-center lg:max-h-[732px] overflow-x-scroll lg:overflow-y-scroll ${viewAllLevel ? "labJourney" : "labJourneyRemoveScroll"
                  } `}
              >
                <h1 className="text-[18px] lg:text-[26px] font-[700]">
                  Lab Journey
                </h1>
                <div className="pt-[40px] px-[30px] w-full hidden lg:inline-block relative">
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
                <div className="mt-[20px] bg-[#D7ECFF] labJourney rounded-lg px-[10px] flex lg:hidden overflow-x-scroll h-[155px]">
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
                </div>
                {/* <div>
                  {userRequesterEvents?.length > 0 ? (
                   
                    <div className="grid grid-cols-1 my-5 justify-items-center gap-5 items-center">

                      {userRequesterEvents?.map((event, index) => (

                        <div key={index} className="shadow-lg w-[400px] bg-sky-400 text-white rounded-md p-2 ">
                          <p className="flex gap-1 items-center justify-center mt-2"><AdjustIcon sx={{ color: red[400] }} ></AdjustIcon>Meeting with {event?.organization?.organizationName}</p>
                          <div className="flex justify-center items-center gap-2">
                      
                            <div className=" my-3">
                              <p className="font-semibold">From : <span className="text-sm">{new Date(event.start).toUTCString()}</span></p>
                              <p className="font-semibold">To : <span className="text-sm">{new Date(event.end).toUTCString()}</span></p>
                            </div>
                          </div>
                          <div className="flex justify-center items-center mt-3">
                            <Link to={event?.hangoutLink} className=" text-white bg-black px-3 py-2 rounded-md">
                              Go to Meet Link
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <></>}
                </div> */}
              </div>
            )}
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
