import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import eye from "../../../assets/ExecutionMentor/eye.svg";
import { AuthContext } from "../../../contexts/AuthProvider";
import Layout from "../Layout";
import AssignmentUpNev from "./AssignmentUpNev";
import Loading from "../../Shared/Loading/Loading";

const MentorAssignments = () => {
  const { userInfo } = useContext(AuthContext);

  const [tableWidth, setTableWidth] = useState("100%");
  const [courses, setCourses] = useState([]);
  const [batchesData, setBatchesData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedBatch, setSelectedBatch] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [allMyStudents, setAllMyStudents] = useState([]);
  const [filteredAssignments, setFilteredAssignment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  const [selectedMentor, setSelectedMentor] = useState({});
  const [selectAllStatus, setSelectAllStatus] = useState(false);
  const [selectedSubmissions, setSelectedSubmissions] = useState([]);

  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/assignments/organizationsId/${userInfo?.organizationId}`
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

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/assignmentSubmissions/organizationId/${userInfo.organizationId}`
      )
      .then((response) => {
        setAssignments(response?.data?.slice().reverse());
        if (userInfo?.role === "admin")
          setFilteredAssignment(response?.data?.slice().reverse());
        else {
          setFilteredAssignment(
            response?.data
              ?.slice()
              .reverse()
              ?.filter((item) => item?.mentor?.mentorId === userInfo?._id)
          );
        }
        //console.log(response?.data[0]);
        const ass = response?.data;
        setIsLoading(false);
        // setPendingEvaluations(ass.length)
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [userInfo]);

  const filteredData = assignments.filter((item) => !item?.submitter.result);

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
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [userInfo]);

  useEffect(() => {
    if (selectedCourse?._id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${selectedCourse?._id}`
        )
        .then((response) => {
          setBatchesData(response?.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
  }, [selectedCourse]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/students/${userInfo?.organizationId}`
      )
      .then((response) => {
        setAllMyStudents(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/mentors/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setMentors(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  // const applyFilters = () => {
  //   let filtered = allMyStudents;
  //   console.log(selectedStatus);

  //   // Apply course filter
  //   if (selectedCourse?._id) {
  //     filtered = filtered?.filter((student) =>
  //       student.courses?.some(
  //         (course) => course?.courseId === selectedCourse?._id
  //       )
  //     );
  //   }
  //   //console.log(filtered);

  //   // Apply batch filter
  //   if (selectedBatch?._id) {
  //     filtered = filtered?.filter((student) =>
  //       student.courses?.some((batch) => batch?.batchId === selectedBatch?._id)
  //     );
  //   }

  //   // status
  //   var matchingAssignments = assignments?.filter((assignment) =>
  //     filtered?.some(
  //       (filteredStudent) => assignment?.submitter?._id === filteredStudent?._id
  //     )
  //   );
  //   if (selectedStatus === "Submitted") {
  //     matchingAssignments = matchingAssignments?.filter(
  //       (assignment) => assignment?.submitter?.result
  //     );
  //   }
  //   if (selectedStatus === "Pending") {
  //     matchingAssignments = matchingAssignments?.filter(
  //       (assignment) => !assignment?.submitter?.result
  //     );
  //   }
  //   if (matchingAssignments) {
  //     setFilteredAssignment(matchingAssignments);
  //   } else {
  //     console.log("none");
  //     setFilteredAssignment(assignments);
  //   }
  // };

  const applyFilters = () => {
    let filtered = assignments;
    console.log(selectedStatus);

    // Apply course filter
    if (selectedCourse?._id) {
      filtered = filtered?.filter(
        (submission) => submission?.courseId === selectedCourse?._id
      );
    }
    //console.log(filtered);

    // Apply batch filter
    if (selectedBatch?._id) {
      filtered = filtered?.filter(
        (submission) => submission?.batchId === selectedBatch?._id
      );
    }

    if (selectedStatus === "Submitted") {
      filtered = filtered?.filter(
        (assignment) => assignment?.submitter?.result
      );
    }
    if (selectedStatus === "Pending") {
      filtered = filtered?.filter(
        (assignment) => !assignment?.submitter?.result
      );
    }
    setFilteredAssignment(filtered);
    // if (matchingAssignments) {
    // } else {
    //   console.log("none");
    //   setFilteredAssignment(assignments);
    // }
  };

  function formatDateTime(dateTimeString) {
    const dateObject = new Date(dateTimeString);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour format with AM/PM
    };

    return dateObject.toLocaleString("en-US", options);
  }

  const handleAddOrUpdateMentor = async (submissionId, mentorId) => {
    Loading();

    const mentorData = mentors?.find((item) => item?._id === mentorId);

    console.log(mentorData);

    const sendMentorData = {
      mentorId: mentorData?._id,
      mentorEmail: mentorData?.email,
      mentorRole: mentorData?.role,
    };

    console.log(sendMentorData);

    if (sendMentorData?.mentorEmail) {
      const newAssign = await axios.put(
        // `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/assignments`,
        `http://localhost:5000/api/v1/assignmentSubmissions/submissionId/${submissionId}/assign-mentor`,
        { mentor: sendMentorData }
      );
      console.log(newAssign);
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

  const handleAddOrUpdateMentorToMultipleSubmission = async (mentorId) => {
    Loading();

    const mentorData = mentors?.find((item) => item?._id === mentorId);

    console.log(mentorData);

    const sendMentorData = {
      mentorId: mentorData?._id,
      mentorEmail: mentorData?.email,
      mentorRole: mentorData?.role,
    };

    console.log(sendMentorData);

    if (sendMentorData?.mentorEmail) {
      const newAssign = await axios.put(
        // `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/assignments`,
        `http://localhost:5000/api/v1/assignmentSubmissions/assign-mentor`,
        { mentor: sendMentorData, submissionIds: selectedSubmissions }
      );
      console.log(newAssign);
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

  console.log(filteredAssignments);

  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const availableParticipants = [
    "Participant 1",
    "Participant 2",
    "Participant 3",
    "Participant 4",
  ]; // Example list of participants
  const dropdownRef = useRef(null);

  const handleSelectChange = (participant) => {
    setSelectedParticipants((prevState) =>
      prevState.includes(participant)
        ? prevState.filter((item) => item !== participant)
        : [...prevState, participant]
    );
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Layout>
        {isLoading && (
          <div className=" flex align-items-center my-5 py-5">
            <CircularProgress className="w-full mx-auto" />
          </div>
        )}
        <div className="lg:block hidden">
          <AssignmentUpNev page={"assignment"} />
        </div>

        <div className="flex mt-24">
          <div className="w-full mx-5">
            <div className="flex justify-between">
              <div className="mt-10 text-[#F50000] text-lg font-medium">
                <p>
                  {itemDetails?.pendingEvaluations
                    ? itemDetails?.pendingEvaluations
                    : "Total Pending evaluations"}{" "}
                  - {filteredData.length}
                </p>
              </div>
            </div>

            <div className=" flex flex-col md:flex-row gap-10 pb-3 text-lg mt-10">
              <>
                {/*       <Link
                  to="/mentorAssignments"
                  onClick={() => handleTabClick("Assignments")}
                  style={{
                    fontWeight:
                      selectedTab === "Assignments" || "mentorAssignments"
                        ? "bold"
                        : "normal",
                    borderBottom:
                      selectedTab === "Assignments" || "mentorAssignments"
                        ? "2px solid black"
                        : "none",
                  }}
                >
                  Assignments
                </Link> */}
                {/*   <Link
                  to="/assignmentsQuiz"
                  onClick={() => handleTabClick("Quiz")}
                  style={{
                    fontWeight: selectedTab === "Quiz" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "Quiz" ? "2px solid black" : "none",
                  }}
                >
                  Quiz
                </Link>
                <Link
                  to="/assignmentsLiveTest"
                  onClick={() => handleTabClick("Live Test")}
                  style={{
                    fontWeight: selectedTab === "Live Test" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "Live Test" ? "2px solid black" : "none",
                  }}
                >
                  Live Test
                </Link> */}
              </>
              <select
                className="p-2 border rounded w-[90%]"
                value={selectedCourse?._id}
                onChange={(e) => {
                  const course = courses?.find((c) => c._id === e.target.value);
                  setSelectedCourse(course);
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

              <select
                className="p-2 border rounded w-[90%]"
                value={selectedBatch?._id}
                onChange={(e) => {
                  const batch = batchesData.find(
                    (b) => b._id === e.target.value
                  );
                  setSelectedBatch(batch);
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
              <select
                className="p-2 border rounded w-[90%]"
                // value={selectedBatch?._id}
                onChange={(e) => {
                  setSelectedStatus(e.currentTarget.value);
                }}
              >
                <option value="">
                  {itemDetails?.selectStatus
                    ? itemDetails?.selectStatus
                    : "Select Status"}{" "}
                </option>

                <option value="Submitted">
                  {itemDetails?.submitted
                    ? itemDetails?.submitted
                    : "Submitted"}
                </option>
                <option value="Pending">
                  {itemDetails?.pending ? itemDetails?.pending : "Pending"}
                </option>
              </select>

              <button
                className="bg-sky-500 hover:bg-opacity-70 text-white px-4 py-2 rounded w-[50%]"
                onClick={applyFilters}
              >
                {itemDetails?.applyFilters
                  ? itemDetails?.applyFilters
                  : "Apply Filters"}
              </button>
            </div>
            {userInfo?.role === "admin" && (
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center gap-4">
                  <h1>Filter By Mentor:</h1>
                  <select
                    className="p-2 border rounded"
                    onChange={async (e) => {
                      e.preventDefault();
                      setSelectedMentor(e.target.value);
                      // await applyFilters();
                      const filterAssignment = filteredAssignments?.filter(
                        (item) => item?.mentor?.mentorId === e.target.value
                      );
                      setFilteredAssignment(filterAssignment);
                    }}
                  >
                    {userInfo?.role === "admin" && (
                      <>
                        <option className="hidden" value="">
                          Select Mentor
                        </option>
                        {mentors?.map((mentor) => (
                          <option key={mentor._id} value={mentor._id}>
                            {mentor?.name}
                          </option>
                        ))}
                      </>
                    )}
                    {userInfo?.role !== "admin" && (
                      <option className="hidden">{userInfo?.name}</option>
                    )}
                  </select>
                </div>
                {selectedSubmissions?.length > 0 && (
                  <div className="flex items-center gap-4">
                    <h1>Assign to:</h1>
                    <select
                      className="p-2 border rounded"
                      onChange={(e) => {
                        e.preventDefault();
                        handleAddOrUpdateMentorToMultipleSubmission(
                          e.target.value
                        );
                      }}
                    >
                      <option className="hidden" value="">
                        Select Mentor
                      </option>
                      {mentors?.map((mentor) => (
                        <option key={mentor._id} value={mentor._id}>
                          {mentor?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
            <>
              {/*  <div className="flex ms-10 justify-between items-center text-lg font-bold mt-10 mb-7">
                            <div className="flex items-center gap-4">
                                <p className="h-2 w-2 bg-black rounded-full"></p>
                                <p className="">

                                    Subject Name
                                </p>

                            </div>
                            <p>Total weighted marks of the Assignment</p>
                        </div>
                        <div className="ms-10">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            </p>
                        </div> */}

              {/*   <div className="flex justify-between items-center ms-10 mt-10 text-lg font-bold">
              <p>Grade method</p>
              <p>Name of the Lab</p>
            </div> */}

              {/*  <div className="grid grid-cols-3 gap-3 ms-5 my-10">
              {assignments?.map((assignment) => (
                <div className="bg-[#F0F7FF] rounded-[20px] flex gap-2 flex-col items-center py-5">
                  <p className="text-lg text-center font-bold">
                    {assignment?.courseName}
                  </p>
                  <p className="text-[15px] font-medium">
                    {assignment.submitter.name}
                  </p>
                  <p className="text-[15px] font-medium">
                    {assignment?.weekName}
                  </p>
                  {assignment?.submitter.result && (
                    <p className="text-[10px] text-[blue] ">Result submitted</p>
                  )}

                  <p className="text-[15px] font-bold">{assignment.taskName}</p>
                  <div className="flex gap-3 mt-5">
                    <p className="text-[15px] font-semibold text-[#038400] border-b border-b-[#038400]">
                      Accept
                    </p>
                    <p className="text-[15px] font-semibold text-[#F00] border-b border-b-[#F00]">
                      Decline
                    </p>
                  </div>
                  <Link
                    to={`/assignmentEvaluation1/${assignment?._id}`}
                    className="flex gap-2 bg-[#081765] text-[#fff] p-2 rounded-md mb-2 mt-3"
                  >
                    <img src={eye} alt="eye" />
                    <p className="text-base font-normal">View assignment</p>
                  </Link>
                </div>
              ))}
            </div> */}
            </>
            <div
              style={{
                maxWidth: `${
                  window.innerWidth - (window.innerWidth > 1024 ? 370 : 40)
                }px`,
              }}
              className={`h-[60vh] w-fit overflow-y-auto mt-5 border`}
            >
              <table className={` font-sans bg-white border border-gray-300`}>
                <thead className="bg-gray-800 text-white sticky top-0">
                  <tr>
                    <th className="py-3 px-6 border-b text-left whitespace-nowrap ">
                      Student Name
                      <div>
                        <input
                          type="checkbox"
                          id="selectAll"
                          checked={
                            selectedSubmissions?.length ===
                            filteredAssignments?.length
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectAllStatus(true);
                              let allSubmissionId = [];
                              filteredAssignments?.forEach((item) => {
                                allSubmissionId.push(item?._id);
                              });
                              setSelectedSubmissions(allSubmissionId);
                            } else {
                              setSelectAllStatus(false);
                              setSelectedSubmissions([]);
                            }
                          }}
                        />
                        <label
                          className=" text-base font-semibold  p-2"
                          htmlFor="selectAll"
                        >
                          Select All
                        </label>
                      </div>
                    </th>
                    <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                      Assignment Name
                    </th>
                    <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                      Submission Date
                    </th>
                    <th className="py-3 px-6 border-b text-center whitespace-nowrap">
                      Submission Status
                    </th>
                    <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                      View Assignment
                    </th>
                    <th className="py-3 px-6 border-b text-left whitespace-nowrap">
                      Assigned Mentor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments?.map((assignment, index) => {
                    return (
                      <tr
                        key={assignment?._id}
                        className={
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                        }
                      >
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          {userInfo?.role === "admin" && (
                            <input
                              className="mr-2"
                              type="checkbox"
                              id={`assignment-${assignment?._id}`}
                              name={`assignment-${assignment?._id}`}
                              value={`${assignment?._id}`}
                              checked={selectedSubmissions?.includes(
                                assignment?._id
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectAllStatus(true);
                                  setSelectedSubmissions([
                                    ...selectedSubmissions,
                                    assignment?._id,
                                  ]);
                                } else {
                                  setSelectAllStatus(false);
                                  let allSubmissionId =
                                    selectedSubmissions?.filter(
                                      (item) => item !== assignment?._id
                                    );
                                  setSelectedSubmissions(allSubmissionId);
                                }
                              }}
                            />
                          )}
                          {assignment?.submitter?.name}
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          {assignment?.taskName}
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          {formatDateTime(assignment?.submissionDateTime)}
                        </td>

                        <td className="py-4 px-6 border-b text-left">
                          {assignment?.submitter?.result ? (
                            <span className="text-green font-semibold">
                              &#x2713;{" "}
                              {itemDetails?.evaluated
                                ? itemDetails?.evaluated
                                : "Evaluated"}
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              &#x2717;{" "}
                              {itemDetails?.pending
                                ? itemDetails?.pending
                                : "Pending"}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          <Link
                            to={`/assignmentEvaluation2/${assignment?._id}`}
                            className="flex gap-2 bg-[#081765] hover:bg-opacity-70 text-[#fff] p-2 rounded-md mb-2 mt-3"
                          >
                            <img src={eye} alt="eye" />
                            <p className="text-base font-normal">
                              {itemDetails?.view ? itemDetails?.view : "View"}
                            </p>
                          </Link>
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          <select
                            className="p-2 border rounded"
                            defaultValue={
                              mentors?.find(
                                (item) =>
                                  item?._id === assignment?.mentor?.mentorId
                              )?._id
                            }
                            onChange={(e) => {
                              e.preventDefault();
                              handleAddOrUpdateMentor(
                                assignment?._id,
                                e.target.value
                              );
                            }}
                          >
                            {userInfo?.role === "admin" && (
                              <>
                                <option className="hidden" value="">
                                  {mentors?.find(
                                    (item) =>
                                      item?._id === assignment?.mentor?.mentorId
                                  )?.name || "Select Mentor"}
                                </option>
                                {mentors?.map((mentor) => (
                                  <option
                                    className={`${
                                      mentors?.find(
                                        (item) =>
                                          item?._id ===
                                          assignment?.mentor?.mentorId
                                      )?._id === mentor?._id && "hidden"
                                    }`}
                                    key={mentor._id}
                                    value={mentor._id}
                                  >
                                    {mentor?.name}
                                  </option>
                                ))}
                              </>
                            )}
                            {userInfo?.role !== "admin" && (
                              <option className="hidden">
                                {userInfo?.name}
                              </option>
                            )}
                          </select>
                          <div className="basis-1/2 px-2">
                            <div className="relative" ref={dropdownRef}>
                              <div
                                className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] cursor-pointer"
                                onClick={handleToggleDropdown}
                              >
                                {selectedParticipants.length === 0
                                  ? "Select Participants"
                                  : selectedParticipants.join(", ")}
                              </div>
                              {isDropdownOpen && (
                                <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white z-10">
                                  <ul className="max-h-48 overflow-auto rounded-md py-1 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
                                    {availableParticipants.map(
                                      (participant, index) => (
                                        <li
                                          key={index}
                                          className="flex items-center p-2"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={selectedParticipants.includes(
                                              participant
                                            )}
                                            onChange={() =>
                                              handleSelectChange(participant)
                                            }
                                            className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                          />
                                          <span className="ml-2 text-gray-700">
                                            {participant}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                          {selectedParticipants.length > 0 && (
                            <>
                              <h1 className="text-[18px] px-2 font-[700] mt-[16px] mb-[4px]">
                                Selected Participants
                              </h1>
                              <div className="tag-container my-2 flex flex-wrap w-full rounded-lg border-2 p-2 mx-2">
                                {selectedParticipants.map(
                                  (participant, index) => (
                                    <div
                                      key={index}
                                      className="m-1 h-fit rounded-lg border-2 py-1 px-2"
                                    >
                                      {participant}
                                      <span
                                        className="cursor-pointer pl-1 text-xl font-bold"
                                        onClick={() =>
                                          handleSelectChange(participant)
                                        }
                                      >
                                        ×
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/*  <div>
            <AssignmentRightNev />
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

export default MentorAssignments;
