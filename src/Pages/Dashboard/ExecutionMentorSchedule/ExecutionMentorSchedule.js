import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../../../contexts/AuthProvider";
import { gapi } from "gapi-script";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Give Quizzes to all the respective batches",
    start: new Date(),
    end: new Date(),
  },
  {
    title: "Work",
    start: new Date(),
    end: new Date(),
  },
  // Add more events here
];

const ExecutionMentorSchedule = () => {
  const { user } = useContext(AuthContext);
  const calendarID = "shihab77023@gmail.com";
  const clientID =
    "344492096403-ktib1l5g2dv5u4otjah2o55bdlq4h3vb.apps.googleusercontent.com";
  const apiKey = "AIzaSyCJJvQ5Wv03kDc5ydrJYbJuW15WiIe2fvY";

  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
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
        const newAccessToken = data.access_token;
        console.log(newAccessToken);

        gapi.client
          .request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
            method: "GET",
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          })
          .then(
            (response) => {
              console.log("Fetched events:", response.result.items);
              setEvents(response.result.items);
            },
            (err) => {
              console.error("Error fetching events:", err);
            }
          );
      })
      .catch((error) => {
        console.error("Token refresh error:", error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  console.log(events);

  return (
    <div>
      <Layout>
        <div className="">
          <AssignmentUpNev page={"schedule"} />
        </div>

        <div className="flex mt-24">
          <div className="w-full ms-10 mt-10">
            <div className="text-2xl font-semibold">
              <p>My Schedule</p>
            </div>

            <div className="mt-10">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
              />
            </div>
          </div>

          <div>
            <AssignmentRightNev />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ExecutionMentorSchedule;
