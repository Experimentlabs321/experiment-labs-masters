import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../../../contexts/AuthProvider";
import AssignmentStdList from "./AssignmentStdList";
import ScheduleStdList from "./ScheduleStdList";
import ClassRecord from "./ClassRecord";

const Schedule = () => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [studentListOpen, setStudentListOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState();
  const [participants, setParticipants] = useState();
  const [classId, setClassId] = useState();
  const [classRecordOpen, setClassRecordOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [classRecordId, setClassRecordId] = useState();

  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `http://localhost:5000/api/v1/events/getEventsByOrganizationId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setSchedules(response?.data.reverse());
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);

//console.log(schedules)

  useEffect(() => {
    if (userInfo?.organizationId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/students/${userInfo?.organizationId}`
        )
        .then((response) => {
          setAllUsers(response?.data);
        })
        .catch((error) => console.error(error));
    }
  }, [userInfo?.organizationId]);

  const listView = (id, participants, classId) => {
    setStudentListOpen(true);
    setSelectedBatchId(id);
    setParticipants(participants);
    setClassId(classId);
  };
  const recordView = (id) => {
    setClassRecordOpen(true);
    setClassRecordId(id);
  };

  const uniqueCourses = [
    ...new Set(schedules.map((assignment) => assignment.courseFullName)),
  ];
  const uniqueBatches = [
    ...new Set(
      schedules.flatMap((assignment) =>
        assignment.batches.map((batch) => batch.batchName)
      )
    ),
  ];

  const filteredSchedules = schedules.filter((assignment) => {
    const matchesCourse = selectedCourse
      ? assignment.courseFullName === selectedCourse
      : true;
    const matchesBatch = selectedBatch
      ? assignment.batches?.some((batch) => batch.batchName === selectedBatch)
      : true;
    return matchesCourse && matchesBatch;
  });


  return (
    <div>
      <ScheduleStdList
        studentListOpen={studentListOpen}
        setStudentListOpen={setStudentListOpen}
        selectedBatchId={selectedBatchId}
        participants={participants}
        classId={classId}
      />
       <ClassRecord
            classRecordOpen={classRecordOpen}
            setClassRecordOpen={setClassRecordOpen}
            classRecordId={classRecordId}
            organizationId={userInfo?.organizationId}
          />
      {loading && (
        <div className="flex align-items-center my-5 py-5">
          <CircularProgress className="w-full mx-auto" />
        </div>
      )}
      <div className="flex items-center gap-5 my-10">
        <p className=" text-lg font-semibold ms-5">Filter : </p>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="mr-4 p-2 border rounded-md border-gray-300"
        >
          <option value="">All Courses</option>
          {uniqueCourses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="p-2 border rounded-md border-gray-300"
        >
          <option value="">All Batches</option>
          {uniqueBatches.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          maxWidth: `${
            window.innerWidth - (window.innerWidth > 1024 ? 370 : 40)
          }px`,
        }}
        className="overflow-x-auto h-[70vh] overscroll-y-auto my-10"
      >
        <table className="min-w-full font-sans bg-white border border-gray-300">
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className="py-3 px-6 border-b text-left">Schedule name</th>
              <th className="py-3 px-6 border-b text-left">Course name</th>
              <th className="py-3 px-6 border-b text-left">Batches</th>
              {/* <th className="py-3 px-6 border-b text-left">
                Schedule start time & date
              </th> */}
              {/* <th className="py-3 px-6 border-b text-left">Schedule start date</th> */}
              <th className="py-3 px-6 border-b text-left">Participants</th>
              <th className="py-3 px-6 border-b text-left">Total student</th>
           
            </tr>
          </thead>
          <tbody>
            {filteredSchedules?.map((Schedule, index) => {
              const formattedDate = Schedule?.schedule?.[0]
                ? new Date(
                    Schedule.schedule[0].ScheduleStartingDateTime
                  )?.toLocaleDateString()
                : "N/A";

              const formattedTime = Schedule?.schedule?.[0]
                ? new Date(
                    Schedule.schedule[0].ScheduleEndingDateTime
                  )?.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "N/A";

              const batchStudentCounts = Schedule?.batches?.map((batch) => {
                const studentsInBatch = allUsers?.filter((std) =>
                  std?.courses?.some((data) => data?.batchId === batch?.batchId)
                );
                return {
                  batchName: batch.batchName,
                  batchId: batch.batchId,
                  studentCount: studentsInBatch?.length || 0,
                };
              });

              const totalStudents = batchStudentCounts?.reduce( (acc, batch) => acc + batch.studentCount,0) || 0;


              return (
                <tr
                  key={Schedule?._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                >
                  <td
                  onClick={() =>
                    recordView(Schedule?.eventId)
                  }
                  className="py-4 px-6 border-b text-left cursor-pointer">
                    {Schedule?.taskName}
                 
                   
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {Schedule?.courseFullName}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {selectedBatch
                      ? selectedBatch
                      : Schedule?.batches?.map((batch, index) => (
                          <span key={index}>
                            {batch.batchName}
                            {index < Schedule.batches.length - 1 ? ", " : ""}
                          </span>
                        ))}
                  </td>
                  {/* <td className="py-4 px-6 border-b text-left">
                    {formattedTime} , {formattedDate}
                  </td> */}
                  {/* <td className="py-4 px-6 border-b text-left">{formattedDate}</td> */}
                  <td
                    onClick={() =>
                      Schedule?.batches?.[0] &&
                      listView(
                        Schedule.batches[0].batchId,
                        Schedule?.participants,
                        Schedule?._id
                      )
                    }
                    className="py-4 px-6 border-b text-left cursor-pointer"
                  >
                    {Schedule?.participants?.length || 0}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {totalStudents}
                  </td>
              
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
