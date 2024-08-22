import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ClassStudentsList from "./ClassStudentsList";
import Assignment from "./Assignment";
import Schedule from "./Schedule";
import ClassRecord from "./ClassRecord";
import Reading from "./Reading";
import Videos from "./Videos";
import Quiz from "./Quiz";
import File from "./File";

const AdminAssetHome = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState("Live Class");
  const [loading, setLoading] = useState(false);
  const [Classes, setClasses] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [studentListOpen, setStudentListOpen] = useState(false);
  const [classRecordOpen, setClassRecordOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState();
  const [classRecordId, setClassRecordId] = useState();
  const [participants, setParticipants] = useState();
  const [classId, setClassId] = useState();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // New state to manage sorting order

  const [currentPageNumber, setCurrentPageNumber] = useState(1); // New state for pagination
  const itemsPerPage = 15; // Define how many items per page

  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/classes/classesByOrganization/${userInfo?.organizationId}`
        )
        .then((response) => {
          setClasses(response?.data.reverse());
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo?.organizationId) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/students/${userInfo?.organizationId}`
          );
          // Ensure response.data is an array before setting state
          setAllUsers(Array.isArray(response?.data) ? response.data : []);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
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

  const uniqueCourses = [...new Set(Classes.map((cls) => cls.courseFullName))];
  const uniqueBatches = [
    ...new Set(
      Classes.flatMap((cls) => cls.batches.map((batch) => batch.batchName))
    ),
  ];

  const filteredClasses = Classes.filter((cls) => {
    const courseMatch = selectedCourse
      ? cls.courseFullName === selectedCourse
      : true;
    const batchMatch = selectedBatch
      ? cls.batches?.some((batch) => batch.batchName === selectedBatch)
      : true;
    return courseMatch && batchMatch;
  });

  // Apply sorting by percentage
  const sortedClasses = [...filteredClasses].sort((a, b) => {
    const getPercentage = (cls) => {
      const totalStudents = allUsers?.filter((std) =>
        std?.courses?.some((data) => data?.batchId === cls?.batches[0]?.batchId)
      ).length;
      const participantsCount = cls?.participants?.length || 0;
      return totalStudents > 0 ? (participantsCount / totalStudents) * 100 : 0;
    };

    const percentageA = getPercentage(a);
    const percentageB = getPercentage(b);

    if (sortOrder === "asc") {
      return percentageA - percentageB;
    } else {
      return percentageB - percentageA;
    }
  });

  const totalPages = Math.ceil(sortedClasses.length / itemsPerPage);
  const paginatedClasses = sortedClasses.slice(
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
      <Layout>
        <div>
          <ClassStudentsList
            studentListOpen={studentListOpen}
            setStudentListOpen={setStudentListOpen}
            selectedBatchId={selectedBatchId}
            participants={participants}
            classId={classId}
            allUsers={allUsers}
          />
          <ClassRecord
            classRecordOpen={classRecordOpen}
            setClassRecordOpen={setClassRecordOpen}
            classRecordId={classRecordId}
            organizationId={userInfo?.organizationId}
          />
        </div>
        <div className="px-4 lg:mt-4 mt-24 lg:flex items-center gap-4 flex-wrap grid grid-cols-2">
          <button
            onClick={() => setCurrentPage("Live Class")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "Live Class"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            Live Class
          </button>
          <button
            onClick={() => setCurrentPage("Assignment")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "Assignment"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            Assignment
          </button>
          <button
            onClick={() => setCurrentPage("Schedule")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "Schedule"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            Schedule
          </button>
          <button
            onClick={() => setCurrentPage("Reading")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "Reading"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            Reading
          </button>
          <button
            onClick={() => setCurrentPage("Videos")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "Videos"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setCurrentPage("Quiz")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "Quiz"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => setCurrentPage("File")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "File"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            File
          </button>
        </div>

        {currentPage === "Live Class" && (
          <div>
            {loading ? (
              <div className="flex align-items-center my-5 py-5">
                <CircularProgress className="w-full mx-auto" />
              </div>
            ) : (
              <>
                {Classes.length === 0 && (
                  <div>
                    <p className="text-center text-lg font-semibold text-[red] mt-32">
                      No Class exist
                    </p>
                  </div>
                )}
              </>
            )}
            {
              Classes.length>0 && <>
              
           
            <div className="flex items-center gap-5 my-10">
              <p className=" text-lg font-semibold ms-5">Filter :</p>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border rounded-md p-2"
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
                className="border rounded-md p-2"
              >
                <option value="">All Batches</option>
                {uniqueBatches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>

              {/* Sorting Dropdown Component */}
              <p className=" text-lg font-semibold ms-5">Sort by Percentage:</p>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border rounded-md p-2"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
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
                    <th className="py-3 px-6 border-b text-left">Class name</th>
                    <th className="py-3 px-6 border-b text-left">
                      Course name
                    </th>
                    <th className="py-3 px-6 border-b text-left">Batches</th>
                    <th className="py-3 px-6 border-b text-left">
                      Class start time & date
                    </th>
                    <th className="py-3 px-6 border-b text-left">
                      Complete percentage(%)
                    </th>
                    <th className="py-3 px-6 border-b text-left">
                      Participant
                    </th>
                    <th className="py-3 px-6 border-b text-left">
                      Total student
                    </th>
                  </tr>
                </thead>
                <tbody>
  {paginatedClasses.map((cls, index) => {
    const formattedDate = new Date(cls?.courseStartingDateTime).toLocaleDateString();
    const formattedTime = new Date(cls?.courseStartingDateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const totalStudents = allUsers?.filter((std) =>
      std?.courses?.some((data) => data?.batchId === cls?.batches[0]?.batchId)
    ) || [];

    const totalStudent = totalStudents.length;
    const participantsCount = cls?.participants?.length || 0;

    // Calculate the percentage
    const percentage = totalStudent > 0 ? (participantsCount / totalStudent) * 100 : 0;

    let textColorClass = "text-[green]";
    if (percentage < 40) {
      textColorClass = "text-[red]";
    } else if (percentage >= 40 && percentage < 60) {
      textColorClass = "text-[orange]";
    }

    return (
      <tr
        key={cls?._id}
        className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
      >
        <td
          onClick={() => recordView(cls?.meetingData?.id)}
          className="py-4 px-6 border-b text-left cursor-pointer"
        >
          {cls?.taskName || "N/A"}
        </td>
        <td className="py-4 px-6 border-b text-left">
          {cls?.courseFullName || "N/A"}
        </td>
        <td className="py-4 px-6 border-b text-left">
          {selectedBatch
            ? selectedBatch
            : cls?.batches?.map((batch, index) => (
                <span key={index}>
                  {batch.batchName}
                  {index < cls.batches.length - 1 ? ", " : ""}
                </span>
              )) || "N/A"}
        </td>
        <td className="py-4 px-6 border-b text-left">
          {formattedTime}, {formattedDate}
        </td>
        <td
          className={`py-4 px-6 border-b text-left font-semibold ${
            percentage >= 60 ? "text-[green]" : textColorClass
          }`}
        >
          {`${percentage.toFixed(2)}%`}
        </td>
        <td
          onClick={() =>
            listView(cls?.batches[0].batchId, cls?.participants, cls?._id)
          }
          className="py-4 px-6 border-b text-left cursor-pointer"
        >
          {cls?.participants?.length || 0}
        </td>
        <td className="py-4 px-6 border-b text-left">
          {allUsers.length < 1 ? (
            <CircularProgress size={20} />
          ) : (
            totalStudent
          )}
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
            </>
            }
          </div>
        )}
        {currentPage === "Assignment" && <Assignment allUsers={allUsers} />}
        {currentPage === "Schedule" && <Schedule allUsers={allUsers} />}
        {currentPage === "Reading" && <Reading allUsers={allUsers} />}
        {currentPage === "Videos" && <Videos allUsers={allUsers} />}
        {currentPage === "Quiz" && <Quiz allUsers={allUsers} />}
        {currentPage === "File" && <File allUsers={allUsers} />}
      </Layout>
    </div>
  );
};

export default AdminAssetHome;
