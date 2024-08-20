import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../../../contexts/AuthProvider";
import AssignmentStdList from "./AssignmentStdList";
import FileDownload from "./FileDownload";

// SortingDropdown Component
const SortingDropdown = ({ sortOrder, setSortOrder }) => {
  return (<>
  <p className=" text-lg font-semibold ms-5">Sort by Percentage: </p>
   <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="border rounded-md p-2"
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </>
   
  );
};

const Assignment = () => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [studentListOpen, setStudentListOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState();
  const [participants, setParticipants] = useState();
  const [classId, setClassId] = useState();
  const [fileOpen, setFileOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [file, setFile] = useState(); 
  const [currentPageNumber, setCurrentPageNumber] = useState(1); // New state for pagination
  const itemsPerPage = 15; // Define how many items per page

  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/assignmentSubmissions/assignmentsByOrganization/${userInfo?.organizationId}`
        )
        .then((response) => {
          setAssignments(response?.data.reverse());
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);

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
  const fileView = (file) => {
    setFileOpen(true);
    setFile(file);
  };

  const uniqueCourses = [
    ...new Set(assignments?.map((assignment) => assignment.courseFullName)),
  ];
  const uniqueBatches = [
    ...new Set(
      assignments.flatMap((assignment) =>
        assignment.batches?.map((batch) => batch.batchName)
      )
    ),
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesCourse = selectedCourse
      ? assignment.courseFullName === selectedCourse
      : true;
    const matchesBatch = selectedBatch
      ? assignment.batches?.some((batch) => batch.batchName === selectedBatch)
      : true;
    return matchesCourse && matchesBatch;
  });

  const sortedAssignments = filteredAssignments.sort((a, b) => {
    const totalStudentsA =
      a.batches?.reduce(
        (acc, batch) =>
          acc +
          (allUsers?.filter((std) =>
            std?.courses?.some((data) => data?.batchId === batch?.batchId)
          ).length || 0),
        0
      ) || 0;
    const participantsCountA = a?.participants?.length || 0;
    const percentageA =
      totalStudentsA > 0 ? (participantsCountA / totalStudentsA) * 100 : 0;

    const totalStudentsB =
      b.batches?.reduce(
        (acc, batch) =>
          acc +
          (allUsers?.filter((std) =>
            std?.courses?.some((data) => data?.batchId === batch?.batchId)
          ).length || 0),
        0
      ) || 0;
    const participantsCountB = b?.participants?.length || 0;
    const percentageB =
      totalStudentsB > 0 ? (participantsCountB / totalStudentsB) * 100 : 0;

    return sortOrder === "asc" ? percentageA - percentageB : percentageB - percentageA;
  });

  const totalPages = Math.ceil(sortedAssignments.length / itemsPerPage);
  const paginatedClasses = sortedAssignments.slice(
    (currentPageNumber - 1) * itemsPerPage,
    currentPageNumber * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPageNumber(pageNumber);
    }
  };

  return (
    <div>
      <AssignmentStdList
        studentListOpen={studentListOpen}
        setStudentListOpen={setStudentListOpen}
        selectedBatchId={selectedBatchId}
        participants={participants}
        classId={classId}
      />
       <FileDownload
            fileOpen={fileOpen}
            setFileOpen={setFileOpen}
            file={file}
         
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
          {uniqueCourses?.map((course) => (
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
          {uniqueBatches?.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
        <SortingDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
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
              <th className="py-3 px-6 border-b text-left">Assignment name</th>
              <th className="py-3 px-6 border-b text-left">Course name</th>
              <th className="py-3 px-6 border-b text-left">Batches</th>
              <th className="py-3 px-6 border-b text-left">
                start time & date
              </th>
              <th className="py-3 px-6 border-b text-left">Complete percentage(%)</th>
              <th className="py-3 px-6 border-b text-left">Participants</th>
              <th className="py-3 px-6 border-b text-left">Total student</th>
              <th className="py-3 px-6 border-b text-left">
                Evaluated
              </th>
              <th className="py-3 px-6 border-b text-left">
                Unevaluated
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedClasses?.map((assignment, index) => {
              const formattedDate = assignment?.schedule?.[0]
                ? new Date(assignment.schedule[0].assignmentStartingDateTime)?.toLocaleDateString()
                : "N/A";

              const formattedTime = assignment?.schedule?.[0]
                ? new Date(assignment.schedule[0].assignmentEndingDateTime)?.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "N/A";

              const batchStudentCounts = assignment?.batches?.map((batch) => {
                const studentsInBatch = allUsers?.filter((std) =>
                  std?.courses?.some((data) => data?.batchId === batch?.batchId)
                );
                return {
                  batchName: batch.batchName,
                  batchId: batch.batchId,
                  studentCount: studentsInBatch?.length || 0,
                };
              });

              const totalStudents = batchStudentCounts?.reduce(
                (acc, batch) => acc + batch.studentCount,
                0
              ) || 0;

              const evaluatedAssignmentTotal =
                assignment?.participants?.filter(
                  (participant) =>
                    participant?.participant?.status === "Completed"
                ).length || 0;

              const unevaluatedAssignmentTotal =
                assignment?.participants?.filter(
                  (participant) =>
                    participant?.participant?.status === "In Progress"
                ).length || 0;

              const participantsCount = assignment?.participants?.length || 0;

              // Calculate the percentage
              const percentage =
                totalStudents > 0 ? (participantsCount / totalStudents) * 100 : 0;

              // Determine the background color based on the percentage
              let textColorClass = "text-[green]"; // Default to green for 60% and above

              if (percentage < 40) {
                textColorClass = "text-[red]"; // Red for below 40%
              } else if (percentage >= 40 && percentage < 60) {
                textColorClass = "text-[orange]"; // Orange for 40-59.99%
              }

           
              return (
                <tr
                  key={assignment?._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                >
                  <td
                   onClick={() =>
                    fileView(assignment?.file)
                  }
                  className="py-4 px-6 border-b text-left cursor-pointer">
                    {assignment?.taskName}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {assignment?.courseFullName}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {selectedBatch
                      ? selectedBatch
                      : assignment?.batches?.map((batch, index) => (
                          <span key={index}>
                            {batch.batchName}
                            {index < assignment.batches.length - 1 ? ", " : ""}
                          </span>
                        ))}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {formattedTime}, {formattedDate}
                  </td>
                  <td
                    className={`py-4 px-6 border-b text-left font-semibold ${
                      percentage >= 60 ? "text-[green]" : textColorClass
                    } `}
                  >
                    {`${percentage.toFixed(2)}%`}
                  </td>
                  <td
                    onClick={() =>
                      assignment?.batches?.[0] &&
                      listView(
                        assignment.batches[0].batchId,
                        assignment?.participants,
                        assignment?._id
                      )
                    }
                    className={`py-4 px-6 border-b text-left cursor-pointer `}
                  >
                    {assignment?.participants?.length || 0}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {totalStudents}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {evaluatedAssignmentTotal}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {unevaluatedAssignmentTotal}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
       {/* Pagination Controls */}
       <div className="flex justify-center my-5">
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number + 1)}
                      className={`mx-1 px-3 py-1 border rounded ${
                        number + 1 === currentPageNumber
                          ? "bg-black text-white"
                          : "bg-white"
                      }`}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
    </div>
  );
};

export default Assignment;
