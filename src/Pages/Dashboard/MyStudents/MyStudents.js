import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddStudent from "../AddStudent/AddStudent";
import Loading from "../../Shared/Loading/Loading";
import toast from "react-hot-toast";

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
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/students/${userInfo?.organizationId}`
      )
      .then((response) => {
        response?.data.reverse();
        if (paidStudents) {
          const paidStudents = response?.data?.filter(
            (student) => student?.courses && student?.courses[0]
          );
          console.log(paidStudents);
          setAllMyStudents(paidStudents);
          setFilteredStudents(paidStudents);
        } else {
          setAllMyStudents(response?.data);
          setFilteredStudents(response?.data);
        }
      })
      .catch((error) => console.error(error));
  }, [userInfo, paidStudents]);

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
    let filtered = allMyStudents;
    console.log(topic, batch, status);

    // Apply course filter
    if (topic?._id) {
      filtered = await filtered.filter((student) =>
        student.courses?.find((course) => course?.courseId === topic?._id)
      );
    }
    console.log(filtered);

    // Apply batch filter
    if (batch?._id) {
      filtered = await filtered.filter((student) =>
        student.courses?.find((b) => b?.batchId === batch._id)
      );
    }

    // Apply validation filter
    if (status) {
      if (status === "Paid") {
        filtered = await filtered.filter(
          (item) => item?.courses && item?.courses[0]
        );
      } else if (status === "Unpaid") {
        filtered = await filtered.filter(
          (item) => !item?.courses || !item?.courses[0]
        );
      } else if (status === "Expired") {
        filtered = await filtered.filter(
          (item) => item?.courses && item?.courses[0]
        );
        filtered = await filtered.filter((item) => {
          let flag = false;
          item?.courses?.map((course) => {
            if (course?.enrollDate) {
              const actualCourse = courses?.find(
                (i) => i?._id === course?.courseId
              );
              if (
                parseInt(actualCourse?.expirationDay) -
                  daysDifferenceFromEnrolled(course?.enrollDate) <
                0
              ) {
                flag = true;
              }
            }
          });
          return flag;
        });
      }
    }

    setFilteredStudents(filtered);
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
                    placeholder={
                      itemDetails?.search ? itemDetails?.search : "Search"
                    }
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
