import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";

const MyStudents = () => {
  const { userInfo } = useContext(AuthContext);
  const [allMyStudents, setAllMyStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [tableWidth, setTableWidth] = useState("100%");
  const [courseFilter, setCourseFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  useEffect(() => {
    if (selectedCourse?._id)
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/batches/courseId/${selectedCourse?._id}`
        )
        .then((response) => {
          setBatchesData(response?.data);
        })
        .catch((error) => console.error(error));
  }, [selectedCourse]);

  useEffect(() => {
    // Calculate the desired width (e.g., 200px less than the screen width)
    const screenWidth = window.innerWidth;
    const desiredWidth = screenWidth - 350;

    // Set the table width as a string
    setTableWidth(`${desiredWidth}px`);

    // Update the width if the window is resized
    const handleResize = () => {
      const updatedWidth = window.innerWidth - 350;
      setTableWidth(`${updatedWidth}px`);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users/students/${userInfo?.organizationId}`
      )
      .then((response) => {
        setAllMyStudents(response?.data);
        setFilteredStudents(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  const applyFilters = () => {
    let filtered = allMyStudents;
    console.log(selectedBatch, selectedCourse);

    // Apply course filter
    if (selectedCourse?._id) {
      filtered = filtered.filter((student) =>
        student.courses?.some(
          (course) => course?.courseId === selectedCourse?._id
        )
      );
    }
    console.log(filtered);

    // Apply batch filter
    if (selectedBatch?._id) {
      filtered = filtered.filter((student) =>
        student.courses?.some((batch) => batch?.batchId === selectedBatch._id)
      );
    }

    setFilteredStudents(filtered);
  };
  console.log(courses);
  return (
    <div>
      <Layout>
        <div className="p-4">
          <h1 className="text-xl font-bold">My Students</h1>
          <div>
            <div>
              <input
                onChange={(e) => {
                  setFilteredStudents(
                    allMyStudents?.filter((student) => {
                      return Object.keys(student).some((key) =>
                        student[key]
                          ?.toString()
                          .toLowerCase()
                          .includes(e.target.value.toString().toLowerCase())
                      );
                    })
                  );
                }}
                name="Search"
                placeholder="Search"
                className="block w-full px-4 py-2 mt-2 rounded-md border bg-white border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex space-x-4 my-4">
              {/* Course Filter Dropdown */}
              <select
                className="p-2 border rounded"
                value={selectedCourse?._id}
                onChange={(e) => {
                  const course = courses.find((c) => c._id === e.target.value);
                  setSelectedCourse(course);
                }}
              >
                <option value="">Select Course</option>
                {courses?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course?.courseFullName}
                  </option>
                ))}
              </select>

              {/* Batch Filter Dropdown */}
              <select
                className="p-2 border rounded"
                value={selectedBatch?._id}
                onChange={(e) => {
                  const batch = batchesData.find(
                    (b) => b._id === e.target.value
                  );
                  setSelectedBatch(batch);
                }}
              >
                <option value="">Select Batch</option>
                {batchesData?.map((batch) => (
                  <option key={batch?._id} value={batch?._id}>
                    {batch?.batchName}
                  </option>
                ))}
              </select>

              {/* Apply Filters Button */}
              <button
                className="bg-sky-500 text-white px-4 py-2 rounded"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
          <div
            style={{ width: tableWidth, height: "70vh" }}
            className="overflow-x-auto"
          >
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-800 text-white sticky top-0">
                <tr>
                  <th className="py-3 px-6 border-b text-left">Name</th>
                  <th className="py-3 px-6 border-b text-left">Email</th>
                  <th className="py-3 px-6 border-b text-left">Joining Date</th>
                  <th className="py-3 px-6 border-b text-left">Paid/Unpaid</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents &&
                  filteredStudents[0] &&
                  filteredStudents?.map((student, index) => (
                    <tr
                      key={student?.id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                    >
                      <td className="py-4 px-6 border-b text-left">
                        {student?.name}
                      </td>
                      <td className="py-4 px-6 border-b text-left">
                        {student?.email}
                      </td>
                      <td className="py-4 px-6 border-b text-left">
                        {student?.dateCreated}
                      </td>
                      <td className="py-4 px-6 border-b text-left">
                        {student?.courses && student?.courses[0] ? (
                          <span className="text-green font-semibold">
                            &#x2713; Paid
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            &#x2717; Unpaid
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default MyStudents;