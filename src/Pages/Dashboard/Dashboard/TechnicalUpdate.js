import React, { useContext, useEffect, useState } from "react";
import Challenges from "../../../assets/Dashboard/Challenges.png";
import RightArrowBlack from "../../../assets/Dashboard/RightArrowBlack.png";
import RightArrowWhite from "../../../assets/Dashboard/RightArrowWhite.png";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import { gapi } from "gapi-script";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TechnicalUpdate = ({ weeks, selectedCourse, currentWeekCompletion }) => {
  const { user, userInfo } = useContext(AuthContext);
  const [date, setDate] = useState(""); // State for the date
  const [time, setTime] = useState(""); // State for the time
  const [currentWeek, setCurrentWeek] = useState(null);
  const [reservedEvent, setReservedEvent] = useState(null);

  // Update the date state when the date input changes
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Update the time state when the time input changes
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

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

  const [startTime, setStartTime] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/events`)
      .then((response) => {
        const findEvent = response?.data?.find(
          (item) =>
            item?.requester === user?.email &&
            item?.organization?.organizationId === userInfo?.organizationId &&
            item?.weekData?._id === currentWeek?._id
        );
        setReservedEvent(findEvent);
        setStartTime(new Date(findEvent?.start));
      })
      .catch((error) => console.error(error));
  }, [weeks, selectedCourse, currentWeek]);

  // Function to combine date and time into a single variable
  const combineDateTime = async () => {
    if (date && time) {
      const combinedDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(
        new Date(`${date}T${time}`).setMinutes(
          new Date(`${date}T${time}`).getMinutes() + 30
        )
      );
      const currentDateTime = new Date();
      const timeDifferenceInMilliseconds = combinedDateTime - currentDateTime;
      if (timeDifferenceInMilliseconds < 0) {
        Swal.fire({
          icon: "error",
          title: "Invalid Date and time!",
          text: "Please enter valid date & time for event!",
        });
        return;
      }
      var event = {
        title: `${userInfo?.name} <> Experiment Labs <> Discussion`,
        start: new Date(combinedDateTime),
        end: new Date(endDateTime),
        organization: {
          organizationId: userInfo?.organizationId,
          organizationName: userInfo?.organizationName,
        },
        attendees: [
          { email: "naman.j@experimentlabs.in" },
          { email: "gaurav@experimentlabs.in" },
          { email: user?.email },
        ],
        weekData: currentWeek,
      };
      // You can now use combinedDateTime as needed

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/events`,
        { ...event }
      );
      const sendMail = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/sendMail`,
        {
          from: `${user?.email}`,
          to: `${user?.email},shihab77023@gmail.com`,
          subject: `Event request`,
          message: `A event is going to held for doubt clearing at ${event?.start.toLocaleString()} to ${event?.end.toLocaleTimeString()}. Meeting link event?.hangoutLink`,
        }
      );
      if (sendMail?.data?.Success && response?.data?.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Request Sent!",
          text: "Your slot request has been sent!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Date and time!",
        text: "Both date and time must be selected.",
      });
    }
  };

  const calendarID = process.env.REACT_APP_calendarID;

  const addEvent = async () => {
    if (date && time) {
      const combinedDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(
        new Date(`${date}T${time}`).setMinutes(
          new Date(`${date}T${time}`).getMinutes() + 30
        )
      );
      const currentDateTime = new Date();
      const timeDifferenceInMilliseconds = combinedDateTime - currentDateTime;
      if (timeDifferenceInMilliseconds < 0) {
        Swal.fire({
          icon: "error",
          title: "Invalid Date and time!",
          text: "Please enter valid date & time for event!",
        });
        return;
      }
      const refreshToken = process.env.REACT_APP_refreshToken;

      fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${process.env.REACT_APP_google_clientId}&client_secret=${process.env.REACT_APP_google_clientSecret}`,
      })
        .then((response) => response.json())
        .then((data) => {
          // You can now use combinedDateTime as needed
          var event = {
            summary: `${userInfo?.name} <> Experiment Labs`,
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
              { email: "naman.j@experimentlabs.in" },
              { email: "gaurav@experimentlabs.in" },
              { email: user?.email },
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
            },
          };
          // Handle the new access token and possibly a new refresh token
          const newAccessToken = data.access_token;
          function initiate() {
            const sendData = async (event) => {
              const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_API}/events`,
                event
              );
              const sendMail = await axios.post(
                `${process.env.REACT_APP_BACKEND_API}/sendMail`,
                {
                  from: `${user?.email}`,
                  to: `naman.j@experimentlabs.in,gaurav@experimentlabs.in,${user?.email},shihab77023@gmail.com`,
                  subject: `Event request`,
                  message: `A event is going to held for doubt clearing at ${event?.start.toLocaleString()} to ${event?.end.toLocaleTimeString()}. Meeting link ${
                    event?.hangoutLink
                  }`,
                }
              );
              if (sendMail?.data?.Success && response?.data?.acknowledged) {
                Swal.fire({
                  icon: "success",
                  title: "Request Sent!",
                  text: "Your slot request has been sent!",
                });
              }
            };
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
                  var event = {
                    title: `${userInfo?.name} <> Experiment Labs <> Doubt clearing <> ${response?.result?.hangoutLink}`,
                    start: new Date(combinedDateTime),
                    end: new Date(endDateTime),
                    organization: {
                      organizationId: userInfo?.organizationId,
                      organizationName: userInfo?.organizationName,
                    },
                    attendees: [
                      { email: "naman.j@experimentlabs.in" },
                      { email: "gaurav@experimentlabs.in" },
                      { email: user?.email },
                    ],
                    weekData: currentWeek,
                    hangoutLink: response?.result?.hangoutLink,
                    requester: user?.email,
                  };
                  // You can now use combinedDateTime as needed

                  sendData(event);
                  return [true, response];
                },
                function (err) {
                  console.log(err);
                  return [false, err];
                }
              );
          }
          gapi.load("client", initiate);
        })
        .catch((error) => {
          // Handle errors, e.g., refresh token has expired
          console.error("Token refresh error:", error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Date and time!",
        text: "Please enter valid date & time for event!",
      });
    }
  };
  return (
    <div className="flex flex-row md:justify-around md:flex-row-reverse gap-4 overflow-x-scroll lg:overflow-x-visible h-[450px] lg:h-[630px]">
      <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
        <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[32px]">
          Request slots
        </h1>
        <div
          style={{
            filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
          }}
          className="bg-[#0E2749] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5"
        >
          <div>
            <h1 className="text-white text-[18px] font-[700]">
              <span className="pr-4">{"<"}</span>
              {currentWeek
                ? currentWeek?.weekName.slice(0, 24)
                : "Post Programme Support"}
              <span className=" pl-4 ">{">"}</span>
            </h1>
          </div>
          <div className="w-full relative">
            <p className="text-[#C0C0C0] text-[18px] font-[600] pb-[18px]">
              Date
            </p>
            <div className="relative inline-flex w-full">
              <input
                required
                defaultValue={reservedEvent?.start?.slice(0, 10)}
                onChange={handleDateChange}
                className=" text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                name="date"
                id="date"
                type="date"
              />
            </div>
            <p className="text-[#C0C0C0] text-[18px] font-[600] py-[18px]">
              Time
            </p>
            <div className="relative inline-flex w-full">
              <input
                required
                onChange={handleTimeChange}
                className=" text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                name="time"
                // defaultValue={() => {const startEvent = new Date(reservedEvent?.start)?toTimeString().slice(0, 8)}}
                defaultValue={startTime?.toTimeString().slice(0, 8)}
                id="time"
                type="time"
              />
            </div>
          </div>
          {reservedEvent ? (
            <a
              href={reservedEvent?.hangoutLink}
              target="_blank"
              style={{ boxShadow: "0px 6.32482px 0px #CA5F98" }}
              className="bg-[#0F3934] w-full py-[15px] px-[23px] rounded-[13px] text-[12px] lg:text-[18px] font-[700] z-[1]"
            >
              <p className="flex items-center justify-center text-white">
                Join Meeting{" "}
                <img
                  className="pl-1 w-[21px] lg:w-[32px]"
                  src={RightArrowWhite}
                  alt="RightArrowBlack"
                />
              </p>
            </a>
          ) : (
            <DashboardPrimaryButton
              bgColor="#3E4DAC"
              shadow="0px 6.32482px 0px #CA5F98"
              width="full"
              onClick={addEvent}
            >
              <p className="flex items-center justify-center text-white">
                Request Event{" "}
                <img
                  className="pl-1 w-[21px] lg:w-[32px]"
                  src={RightArrowWhite}
                  alt="RightArrowBlack"
                />
              </p>
            </DashboardPrimaryButton>
          )}
          {/* <DashboardPrimaryButton
            bgColor="#3E4DAC"
            shadow="0px 6.32482px 0px #CA5F98"
            width="full"
            onClick={addEvent}
          >
            <p className="flex items-center justify-center text-white">
              Request Event{" "}
              <img
                className="pl-1 w-[21px] lg:w-[32px]"
                src={RightArrowWhite}
                alt="RightArrowBlack"
              />
            </p>
          </DashboardPrimaryButton> */}
        </div>
      </div>
      <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
        <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[32px]">
          Challenges
        </h1>
        <div
          style={{
            filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
          }}
          className="bg-[#2B0825] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5"
        >
          <div className="bg-[#FF881B] rounded-md">
            <img src={Challenges} alt="Challenges" />
          </div>
          <h1 className="text-[14px] lg:text-[18px] text-white font-[700]">
            {currentWeek ? currentWeek?.weekName : "Course Completed"}
          </h1>
          <div className="w-full">
            <small className="text-white pb-[10px] font-[700]">
              {currentWeekCompletion}% Completed
            </small>
            <div className="relative w-full">
              <div className="w-full bg-gray-200 rounded-lg h-2">
                <div
                  className="bg-[#3E4DAC] h-2 rounded-lg"
                  // className="bg-cyan-600 h-2 rounded-sm"
                  style={{ width: `${currentWeekCompletion}%` }}
                  // style={{ width: "20%" }}
                ></div>
              </div>
            </div>
          </div>
          {currentWeek && (
            <Link
              to={`/questLevels/${currentWeek?.courseId}?week=${currentWeek?._id}`}
              style={{ boxShadow: "0px 7.50435px 0px #F08323" }}
              className="bg-[#FFDB70] w-full py-[15px] px-[23px] rounded-[13px] text-[12px] lg:text-[18px] font-[700] z-[1]"
            >
              <p className="flex items-center justify-center text-black">
                Complete Challenge{" "}
                <img
                  className="pl-1 w-[21px] lg:w-[32px]"
                  src={RightArrowBlack}
                  alt="RightArrowBlack"
                />
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalUpdate;
