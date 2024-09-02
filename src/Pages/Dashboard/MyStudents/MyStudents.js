import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddStudent from "../AddStudent/AddStudent";
import Loading from "../../Shared/Loading/Loading";
import toast from "react-hot-toast";
import { Box, LinearProgress } from "@mui/material";

const MyStudents = () => {
  const { paidStudents } = useParams();
  const { userInfo } = useContext(AuthContext);
  const [allMyStudents, setAllMyStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [tableWidth, setTableWidth] = useState("100%");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [currentPage, setCurrentPage] = useState("My Learners");
  const [selectedValidationStatus, setSelectedValidationStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  const [executionMentors, setExecutionMentors] = useState([]);
  const [editOrAssignExecutionMentor, setEditOrAssignExecutionMentor] =
    useState({});
  const [
    selectedExecutionMentorsForEditOrAssign,
    setSelectedExecutionMentorsForEditOrAssign,
  ] = useState([]);
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [enteredSearchQuery, setEnteredSearchQuery] = useState("");
  const [paginationPages, setPaginationPages] = useState([]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPaginationPage(newPage);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getMyLearnersSubDetailsByOrganizationAndName/myLearners/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          console.log(response);
          setItemDetails(response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);
  // console.log(itemDetails)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${selectedCourse?._id}`
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
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v2/users/students/${
          userInfo?.organizationId
        }?page=${currentPaginationPage}&search=${enteredSearchQuery}&course=${
          selectedCourse?._id || ""
        }&batch=${selectedBatch?._id || ""}&status=${
          selectedValidationStatus || ""
        }`
        // `http://localhost:5000/api/v1/users/students/${
        //   userInfo?.organizationId
        // }?page=${currentPaginationPage}&search=${enteredSearchQuery}&course=${
        //   selectedCourse?._id || ""
        // }&batch=${selectedBatch?._id || ""}&status=${
        //   selectedValidationStatus || ""
        // }`
      )
      .then((response) => {
        console.log(response);
        // response?.data?.students.reverse();
        setProgress(100);
        if (paidStudents) {
          const paidStudents = response?.data?.students?.filter(
            (student) => student?.courses && student?.courses[0]
          );
          console.log(paidStudents);
          setAllMyStudents(paidStudents);
          setFilteredStudents(paidStudents);
          setTotalPages(response?.data?.totalPages);
        } else {
          setAllMyStudents(response?.data?.students);
          setFilteredStudents(response?.data?.students);
          setTotalPages(response?.data?.totalPages);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setProgress(100);
        setLoading(false);
      });
  }, [userInfo, paidStudents, currentPaginationPage]);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setEnteredSearchQuery(e.target.value);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v2/users/students/${
          userInfo?.organizationId
        }?search=${searchQuery}&course=${selectedCourse?._id || ""}&batch=${
          selectedBatch?._id || ""
        }&status=${selectedValidationStatus || ""}`
      );
      setProgress(100);
      const data = await response.json();
      console.log(data);
      setFilteredStudents(data.students);
      setTotalPages(data?.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered students:", error);
      setProgress(100);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/mentors/organizationId/${userInfo?.organizationId}/role/execution mentor`
        // `http://localhost:5000/api/v1/users/mentors/organizationId/${userInfo?.organizationId}/role/execution mentor`
      )
      .then((response) => {
        setExecutionMentors(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  const applyFilters = async (topic, batch, status) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v2/users/students/${
        userInfo?.organizationId
      }?course=${topic?._id || ""}&batch=${batch?._id || ""}&status=${
        status || ""
      }`
    );
    const data = await response.json();
    setProgress(100);
    setFilteredStudents(data.students);
    setTotalPages(data.totalPages);
    setCurrentPaginationPage(data.currentPage);
    setLoading(false);
  };
  const formateDate = (dateCreated) => {
    const date = new Date(dateCreated);
    return date;
  };
  const daysDifferenceFromEnrolled = (enrolledDate) => {
    // Get the current date
    const currentDate = new Date();

    // Replace the following line with the specific date you want to compare
    const specificDate = new Date(enrolledDate); // Example: January 1, 2023

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - specificDate;

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const handleExecutionMentorSelectChange = (mentor, e) => {
    console.log(e.target.checked, mentor);
    if (e.target.checked) {
      setSelectedExecutionMentorsForEditOrAssign([
        {
          mentorId: mentor?._id,
          mentorEmail: mentor?.email,
          mentorRole: mentor?.role,
        },
      ]);
    } else {
      setSelectedExecutionMentorsForEditOrAssign([]);
    }
  };

  const handleAddOrUpdateMentor = async (learnerId, index) => {
    Loading();

    if (selectedExecutionMentorsForEditOrAssign?.length > 0) {
      console.log(selectedExecutionMentorsForEditOrAssign);
      const newAssign = await axios.put(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/learnerId/${learnerId}/assign-executionMentor`,
        // `http://localhost:5000/api/v1/users/learnerId/${learnerId}/assign-executionMentor`,
        { executionMentors: selectedExecutionMentorsForEditOrAssign }
      );

      console.log(newAssign);
      if (newAssign) {
        toast.success("Mentor Added Successfully!");
        filteredStudents[index].executionMentors =
          selectedExecutionMentorsForEditOrAssign;
        setEditOrAssignExecutionMentor({});
      }
      // if (newAssignment?.data?.result?.acknowledged) {
      //   toast.success("Assignment added Successfully");
      //   const newNotification = await axios.post(
      //     `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
      //     {
      //       message: `New assignment added in course ${course?.courseFullName}.`,
      //       dateTime: new Date(),
      //       redirectLink: `/questLevels/${course?._id}?week=${chapter?.weekId}`,
      //       recipient: {
      //         type: "Students",
      //         organizationId: orgData?._id,
      //         courseId: course?._id,
      //         batches: selectedBatches,
      //       },
      //       type: "Create Task",
      //       readBy: [],
      //       notificationTriggeredBy: user?.email,
      //     }
      //   );
      //   console.log(newNotification);
      //   navigate(-1);
      // }

      // console.log(manageAssignment);
    }
    Loading().close();
  };

  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        if (loading)
          setProgress((oldProgress) => {
            if (oldProgress === 100) {
              return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
          });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [loading, progress]);

  const getPaginationPages = () => {
    const pages = [];
    const maxPagesToShow = 4;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if the total is less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first two, current page, and last two
      const startPages = [1, 2];
      const endPages = [totalPages - 1, totalPages];

      if (currentPaginationPage <= 2) {
        pages.push(...startPages, "...", ...endPages);
      } else if (currentPaginationPage >= totalPages - 1) {
        pages.push(...startPages, "...", ...endPages);
      } else {
        pages.push(1, "...", currentPaginationPage, "...", totalPages);
      }
    }

    return pages;
  };

  useEffect(() => {
    setPaginationPages(getPaginationPages());
  }, [totalPages, currentPaginationPage]);

  // const paginationPages = getPaginationPages();

  return (
    <div>
      <Layout>
        <div className="p-4 mt-20 lg:mt-0">
          <div className="px-4 my-5  flex items-center gap-4">
            <button
              onClick={() => setCurrentPage("My Learners")}
              className={`px-4 py-2 text-lg font-semibold rounded-lg ${
                currentPage === "My Learners"
                  ? "bg-[#3E4DAC] text-white"
                  : "bg-white border-2 border-gray-400 text-black"
              }`}
            >
              {itemDetails?.myLearners
                ? itemDetails?.myLearners
                : "My Learners"}
            </button>
            <button
              onClick={() => setCurrentPage("Add Learners")}
              className={`px-4 py-2 text-lg font-semibold rounded-lg ${
                currentPage === "Add Learners"
                  ? "bg-[#3E4DAC] text-white"
                  : "bg-white border-2 border-gray-400 text-black"
              }`}
            >
              {itemDetails?.addLearners
                ? itemDetails?.addLearners
                : "Add Learners"}
            </button>
          </div>
          {currentPage === "My Learners" ? (
            <>
              <h1 className="text-xl font-bold">
                {itemDetails?.myLearners
                  ? itemDetails?.myLearners
                  : "My Learners"}
              </h1>
              <div>
                <div>
                  <input
                    onChange={handleSearch}
                    name="Search"
                    placeholder="Search"
                    className="block w-full px-4 py-2 mt-2 rounded-md border bg-white border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:space-x-4 my-4">
                  {/* Course Filter Dropdown */}
                  <select
                    className="p-2 border rounded"
                    value={selectedCourse?._id}
                    onChange={async (e) => {
                      const course = courses.find(
                        (c) => c._id === e.target.value
                      );
                      await setSelectedCourse(course);
                      setSelectedBatch({});
                      setBatchesData([]);
                      applyFilters(course, "", selectedValidationStatus);
                    }}
                  >
                    <option value="">
                      {itemDetails?.selectCourse
                        ? itemDetails?.selectCourse
                        : "Select Course"}
                    </option>
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
                    onChange={async (e) => {
                      const batch = batchesData.find(
                        (b) => b._id === e.target.value
                      );
                      await setSelectedBatch(batch);
                      applyFilters(
                        selectedCourse,
                        batch,
                        selectedValidationStatus
                      );
                    }}
                  >
                    <option value="">
                      {itemDetails?.selectBatch
                        ? itemDetails?.selectBatch
                        : "Select Batch"}
                    </option>
                    {batchesData?.map((batch) => (
                      <option key={batch?._id} value={batch?._id}>
                        {batch?.batchName}
                      </option>
                    ))}
                  </select>

                  {/* Validation Filter Dropdown */}
                  <select
                    className="p-2 border rounded"
                    onChange={async (e) => {
                      await setSelectedValidationStatus(e.target.value);
                      applyFilters(
                        selectedCourse,
                        selectedBatch,
                        e.target.value
                      );
                    }}
                  >
                    <option value="">
                      {itemDetails?.selectValidation
                        ? itemDetails?.selectValidation
                        : "Select Validation"}
                    </option>
                    <option value="Paid">
                      {itemDetails?.paid ? itemDetails?.paid : "Paid"}
                    </option>
                    <option value="Unpaid">
                      {itemDetails?.unpaid ? itemDetails?.unpaid : "Unpaid"}
                    </option>
                    <option value="Expired">
                      {itemDetails?.expired ? itemDetails?.expired : "Expired"}
                    </option>
                  </select>

                  {/* Apply Filters Button */}
                  {/* <button
                    className="bg-sky-500 text-white px-4 py-2 rounded"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button> */}
                </div>
              </div>
              {loading && filteredStudents?.length === 0 && (
                <div className=" flex justify-center  w-full  ">
                  <div className="flex flex-col items-center gap-3">
                    <p className="mt-20">Loading...</p>
                    <Box sx={{ width: "500px" }}>
                      <LinearProgress
                        sx={{ height: "20px", borderRadius: "10px" }}
                        variant="determinate"
                        value={progress}
                      />
                    </Box>
                  </div>

                  {/* <CircularProgress className="w-full mx-auto" /> */}
                </div>
              )}
              {filteredStudents[0] && (
                <div
                  style={{
                    maxWidth: `${
                      window.innerWidth - (window.innerWidth > 1024 ? 370 : 40)
                    }px`,
                  }}
                  // style={{ height: "70vh" }}
                  className="overflow-x-auto h-[60vh] overscroll-y-auto"
                >
                  <table className=" min-w-full font-sans bg-white border border-gray-300">
                    <thead className="bg-gray-800 text-white sticky top-0">
                      <tr>
                        <th className="py-3 px-6 border-b text-left">
                          {itemDetails?.name ? itemDetails?.name : "Name"}
                        </th>
                        <th className="py-3 px-6 border-b text-left">
                          {itemDetails?.email ? itemDetails?.email : "Email"}
                        </th>
                        <th className="py-3 px-6 border-b text-left">
                          {itemDetails?.phone ? itemDetails?.phone : "Phone"}
                        </th>
                        <th className="py-3 px-6 border-b text-left">
                          {itemDetails?.joiningDate
                            ? itemDetails?.joiningDate
                            : "Joining Date"}
                        </th>
                        <th className="py-3 px-6 border-b text-left">
                          {itemDetails?.paidOrUnpaid
                            ? itemDetails?.paidOrUnpaid
                            : "Paid/Unpaid"}
                        </th>
                        <th className="py-3 px-6 border-b text-left">
                          Assign Mentor
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents &&
                        !loading &&
                        filteredStudents[0] &&
                        filteredStudents?.reverse()?.map((student, index) => {
                          const formattedDate = new Date(
                            student?.dateCreated
                          )?.toLocaleDateString();

                          return (
                            <tr
                              key={student?._id}
                              className={
                                index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                              }
                            >
                              <td className="py-4 px-6 border-b text-left">
                                <Link to={`/profile/${student?.email}`}>
                                  {student?.name}
                                </Link>
                              </td>
                              <td className="py-4 px-6 border-b text-left">
                                <Link to={`/profile/${student?.email}`}>
                                  {student?.email}
                                </Link>
                              </td>
                              <td className="py-4 px-6 border-b text-left">
                                <Link to={`/profile/${student?.email}`}>
                                  {student?.phone}
                                </Link>
                              </td>
                              <td className="py-4 px-6 border-b text-left">
                                <Link to={`/profile/${student?.email}`}>
                                  {formattedDate}
                                </Link>
                              </td>
                              <td className="py-4 px-6 border-b text-left">
                                {parseInt(selectedCourse?.expirationDay) -
                                  daysDifferenceFromEnrolled(
                                    student?.courses?.find(
                                      (item) =>
                                        item?.courseId === selectedCourse?._id
                                    )?.enrollDate
                                  ) <
                                  0 ||
                                (!selectedCourse?._id &&
                                  selectedValidationStatus === "Expired") ? (
                                  <Link to={`/profile/${student?.email}`}>
                                    <span className="text-orange-600 font-semibold">
                                      &#9888;{" "}
                                      {itemDetails?.expired
                                        ? itemDetails?.expired
                                        : "Expired"}
                                    </span>
                                  </Link>
                                ) : (
                                  <Link to={`/profile/${student?.email}`}>
                                    {student?.courses && student?.courses[0] ? (
                                      <span className="text-green font-semibold">
                                        &#x2713;{" "}
                                        {itemDetails?.paid
                                          ? itemDetails?.paid
                                          : "Paid"}
                                      </span>
                                    ) : (
                                      <span className="text-red-600 font-semibold">
                                        &#x2717;{" "}
                                        {itemDetails?.unpaid
                                          ? itemDetails?.unpaid
                                          : "Unpaid"}
                                      </span>
                                    )}
                                  </Link>
                                )}
                              </td>
                              <td className="py-4 px-6 border-b text-left">
                                <div className=" flex gap-1">
                                  <div>
                                    {editOrAssignExecutionMentor?._id !==
                                      student?._id && (
                                      <div className="flex gap-1">
                                        <div
                                          className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] p-2 cursor-pointer"
                                          // onClick={handleToggleDropdown}
                                        >
                                          {student?.executionMentors?.length >
                                          0 ? (
                                            student?.executionMentors?.map(
                                              (mentor, idx) => (
                                                <span className=" whitespace-nowrap">
                                                  {student?.executionMentors
                                                    ?.length >
                                                  idx + 1
                                                    ? `${
                                                        executionMentors?.find(
                                                          (item) =>
                                                            item?.email ===
                                                            mentor?.mentorEmail
                                                        )?.name
                                                      }, `
                                                    : executionMentors?.find(
                                                        (item) =>
                                                          item?.email ===
                                                          mentor?.mentorEmail
                                                      )?.name}
                                                </span>
                                              )
                                            )
                                          ) : (
                                            <span className=" whitespace-nowrap">
                                              Mentor not assigned!
                                            </span>
                                          )}
                                        </div>
                                        {userInfo?.role === "admin" && (
                                          <button
                                            onClick={() => {
                                              setEditOrAssignExecutionMentor(
                                                student
                                              );
                                              setSelectedExecutionMentorsForEditOrAssign(
                                                student?.executionMentors
                                                  ? student?.executionMentors
                                                  : []
                                              );
                                            }}
                                            className="px-3 py-1 bg-blue text-white rounded"
                                          >
                                            Edit
                                          </button>
                                        )}
                                      </div>
                                    )}
                                    {editOrAssignExecutionMentor?._id ===
                                      student?._id &&
                                      userInfo?.role === "admin" && (
                                        <div className="flex gap-1 items-end">
                                          <div className=" w-full rounded-md shadow-lg bg-white">
                                            <ul className="max-h-48 overflow-auto rounded-md py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5 ">
                                              {executionMentors?.map(
                                                (mentor, idx) => (
                                                  <li
                                                    key={mentor?._id + idx}
                                                    className="flex items-center p-2"
                                                  >
                                                    <input
                                                      type="radio"
                                                      checked={
                                                        selectedExecutionMentorsForEditOrAssign[0]
                                                          ?.mentorId ===
                                                        mentor?._id
                                                      }
                                                      onChange={(e) =>
                                                        handleExecutionMentorSelectChange(
                                                          mentor,
                                                          e
                                                        )
                                                      }
                                                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                                    />
                                                    <span className="ml-2 whitespace-nowrap text-gray-700">
                                                      {mentor?.name}
                                                    </span>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                          <button
                                            onClick={() =>
                                              handleAddOrUpdateMentor(
                                                student?._id,
                                                index
                                              )
                                            }
                                            className="px-3 py-1 bg-blue text-white rounded"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {loading && (
                    <div className=" flex justify-center  w-full  ">
                      <div className="flex flex-col items-center gap-3">
                        <p className="mt-20">Loading...</p>
                        <Box sx={{ width: "500px" }}>
                          <LinearProgress
                            sx={{ height: "20px", borderRadius: "10px" }}
                            variant="determinate"
                            value={progress}
                          />
                        </Box>
                      </div>

                      {/* <CircularProgress className="w-full mx-auto" /> */}
                    </div>
                  )}
                </div>
              )}
              <div class="flex items-center justify-between border-t border-gray-200 bg-white py-3">
                <div class="">
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          handlePageChange(currentPaginationPage - 1)
                        }
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        disabled={currentPaginationPage === 1}
                      >
                        <span className="sr-only">Previous</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {paginationPages.map((page, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            typeof page === "number" && handlePageChange(page)
                          }
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            page === currentPaginationPage
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          } focus:z-20 focus:outline-offset-0 font-sans`}
                          disabled={typeof page !== "number"}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() =>
                          handlePageChange(currentPaginationPage + 1)
                        }
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        disabled={currentPaginationPage === totalPages}
                      >
                        <span className="sr-only">Next</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <AddStudent />
            </>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default MyStudents;
