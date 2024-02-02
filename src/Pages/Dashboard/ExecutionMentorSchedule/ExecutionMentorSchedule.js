import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { Link, useParams } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../../../contexts/AuthProvider";
import { gapi } from "gapi-script";
import axios from "axios";

const localizer = momentLocalizer(moment);

// const demoEvents = [
//   {
//     title: "Give Quizzes to all the respective batches",
//     start: new Date(),
//     end: new Date(),
//   },
//   {
//     title: "Work",
//     start: new Date(),
//     end: new Date(),
//   },
//   {
//     title: "Give Quizzes to all the respective batches",
//     start: new Date(),
//     end: new Date(),
//   },
//   {
//     title: "Work",
//     start: new Date(),
//     end: new Date(),
//   },
//   // Add more events here
// ];
const demoEvents = [
  {
    _id: "6508f7b3b1ca4dc43b42cc40",
    title: "execution mentor <> Experiment Labs",
    start: new Date("2023-09-20T01:25:00.000Z"),
    end: new Date("2023-09-20T01:55:00.000Z"),
    attendees: [
      {
        email: "naman.j@experimentlabs.in",
      },
      {
        email: "gaurav@experimentlabs.in",
      },
      {
        email: "executionmentor@gmail.com",
      },
    ],
  },
  {
    _id: "6508f7c2b1ca4dc43b42cc41",
    title: "execution mentor <> Experiment Labs",
    start: new Date("2023-09-21T01:25:00.000Z"),
    end: new Date("2023-09-21T01:55:00.000Z"),
    attendees: [
      {
        email: "naman.j@experimentlabs.in",
      },
      {
        email: "gaurav@experimentlabs.in",
      },
      {
        email: "executionmentor@gmail.com",
      },
    ],
  },
  {
    _id: "6508fb3621f4063eb070b64f",
    title: "execution mentor <> Experiment Labs",
    start: new Date("2023-09-19T01:25:00.000Z"),
    end: new Date("2023-09-19T01:55:00.000Z"),
    attendees: [
      {
        email: "naman.j@experimentlabs.in",
      },
      {
        email: "gaurav@experimentlabs.in",
      },
      {
        email: "executionmentor@gmail.com",
      },
    ],
  },
  {
    _id: "6508fb4321f4063eb070b650",
    title: "execution mentor <> Experiment Labs",
    start: new Date("2023-09-19T03:30:00.000Z"),
    end: new Date("2023-09-19T04:00:00.000Z"),
    attendees: [
      {
        email: "naman.j@experimentlabs.in",
      },
      {
        email: "gaurav@experimentlabs.in",
      },
      {
        email: "executionmentor@gmail.com",
      },
    ],
  },
  {
    _id: "6508fb4d21f4063eb070b651",
    title: "execution mentor <> Experiment Labs",
    start: new Date("2023-09-19T06:30:00.000Z"),
    end: new Date("2023-09-19T07:00:00.000Z"),
    attendees: [
      {
        email: "naman.j@experimentlabs.in",
      },
      {
        email: "gaurav@experimentlabs.in",
      },
      {
        email: "executionmentor@gmail.com",
      },
    ],
  },
];

const ExecutionMentorSchedule = () => {
  const { agenda } = useParams();
  const { user, userInfo } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/events`)
      .then((response) => {
        console.log(response?.data);
        let filteredEvent = [];
        response?.data?.forEach((element) => {
          if (
            element?.organization?.organizationId === userInfo?.organizationId
          ) {
            let event = {
              _id: element?._id,
              title: element?.title,
              start: new Date(element?.start),
              end: new Date(element?.end),
              organization: element?.organization,
              attendees: element?.attendees,
              weekData: element?.weekData,
            };
            filteredEvent = [...filteredEvent, event];
          }
        });
        setEvents(filteredEvent);
      });
  }, [userInfo]);
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
              {
                agenda ?    <Calendar
              
                defaultView="agenda" // Set 'agenda' as the default view
                localizer={localizer}
                events={events}
                step={60}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 750, maxWidth: 900 }}
              />
              :
              <Calendar
              
            
              localizer={localizer}
              events={events}
              step={60}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 750, maxWidth: 900 }}
            />
              }
        
            </div>
          </div>

          {/* <div>
            <AssignmentRightNev />
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

export default ExecutionMentorSchedule;
