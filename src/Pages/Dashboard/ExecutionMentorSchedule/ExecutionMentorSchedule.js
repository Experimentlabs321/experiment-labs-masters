import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { Link, useParams } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";
import meetIcon from "../../../assets/Dashboard/meetIcon.png"

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../../../contexts/AuthProvider";
import { gapi } from "gapi-script";
import axios from "axios";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";

import "react-big-calendar/lib/css/react-big-calendar.css";

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
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getItemDetailsByOrganizationAndName/schedule/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);

        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);
  //console.log(itemDetails)
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
  //for meet link
  function extractMeetLink(title) {
    const meetLinkRegex = /https:\/\/meet\.google\.com\/\S+/;
    const meetLinkArray = title?.match(meetLinkRegex);
    return meetLinkArray ? meetLinkArray[0] : null;
  }
  //for title
  function extractTitleWithoutMeetLink(title) {
    const meetLinkRegex = /https:\/\/meet\.google\.com\/\S+/;
    const titleWithoutLink = title?.replace(meetLinkRegex, '').trim();
    return titleWithoutLink || null;
  }

  function renderEventContent(eventInfo) {
    console.log(events);
    console.log(eventInfo?.event?.title);

    const formattedStartDate = eventInfo?.event?.start?.toUTCString();
    const formattedEndDate = eventInfo?.event?.end?.toUTCString();
    const meetlink = extractMeetLink(eventInfo?.event?.title);


    console.log(formattedStartDate)
    console.log(formattedEndDate)


    const startTimeStamp = new Date(formattedStartDate);
    const startTimeString = startTimeStamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'GMT' });
    const endTimeStamp = new Date(formattedEndDate);
    const endTimeString = endTimeStamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'GMT' });


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
        <h1>{extractTitleWithoutMeetLink(eventInfo?.event?.title)}</h1>

        {
          meetlink
            ?
            <a target="_blank" href={meetlink} rel="noreferrer" className="flex items-center"><span><img src={meetIcon} className="w-[30px]" alt="icon" /></span>  Google Meet</a>
            :
            <p>No Meeting Link Available</p>
        }

      </div>
    );
  }
  return (
    <div>
      <Layout>
        <div className="">
          <AssignmentUpNev page={"schedule"} />
        </div>

        <div className="flex mt-24">
          <div className="w-full mx-10 mt-10">
            <div className="text-2xl font-semibold">
              <p>{itemDetails?.mySchedule ? itemDetails?.mySchedule : "My Schedule"}</p>
            </div>

            {/* <div className="mt-10">
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
        
            </div> */}
            <div className="mt-5">
              {
                agenda ? <FullCalendar

                  height="600px"
                  plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                  initialView="list"
                  selectMirror={true}
                  headerToolbar={{
                    start: 'title',
                    center: 'today',
                    end: 'dayGridMonth,dayGridWeek,dayGridDay,list'
                  }}
                  eventContent={renderEventContent}
                  events={events?.map((event) => ({
                    title: event?.title,
                    start: event?.start,
                    end: event?.end,
                    link: event?.meeting,
                    meeting: extractMeetLink(event?.title),
                  }))}
                  // dateClick={(info) => handleDateClick(info.date)}
                  eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short',
                    hour12: true,
                  }}
                  timeZone="UTC" // Set the appropriate time zone
                />
                  :
                  <FullCalendar

                    height="600px"
                    plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectMirror={true}
                    headerToolbar={{
                      start: 'title',
                      center: 'today',
                      end: 'dayGridMonth,dayGridWeek,dayGridDay,list'
                    }}
                    eventContent={renderEventContent}
                    events={events?.map((event) => ({
                      title: event?.title,
                      start: event?.start,
                      end: event?.end,
                      link: event?.meeting,
                      meeting: extractMeetLink(event?.title),
                    }))}
                    // dateClick={(info) => handleDateClick(info.date)}
                    eventTimeFormat={{
                      hour: 'numeric',
                      minute: '2-digit',
                      meridiem: 'short',
                      hour12: true,
                    }}
                    timeZone="UTC" // Set the appropriate time zone
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
