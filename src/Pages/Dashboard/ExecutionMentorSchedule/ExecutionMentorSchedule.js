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
