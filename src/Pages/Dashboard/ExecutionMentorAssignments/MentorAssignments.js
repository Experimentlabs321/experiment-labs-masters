import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import eye from '../../../assets/ExecutionMentor/eye.svg';
import { AuthContext } from '../../../contexts/AuthProvider';
import Layout from '../Layout';
import AssignmentUpNev from './AssignmentUpNev';

const MentorAssignments = () => {
  const [selectedTab, setSelectedTab] = useState("mentorAssignments");
  const [pendingEvaluations, setPendingEvaluations] = useState();
  const [countSubmittedResult, setCountSubmittedResult] = useState(0);
  const [tableWidth, setTableWidth] = useState("100%");
  const [courses, setCourses] = useState([]);
  const [batchesData, setBatchesData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedBatch, setSelectedBatch] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [allMyStudents, setAllMyStudents] = useState([]);
  const [filteredAssignments, setFilteredAssignment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 /*  console.log(selectedCourse)
  console.log(selectedBatch)
  console.log(selectedStatus) */

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  ///
  const [assignments, setAssignments] = useState([]);


  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

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
 // console.log(itemDetails)

  //console.log(userInfo);

  useEffect(() => {
    
    axios
      // .get(
      //   `${process.env.REACT_APP_BACKEND_API}/getSubmitAssignment/${userInfo.organizationId}`
      // )
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/assignmentSubmissions/organizationId/${userInfo.organizationId}`
      )
      .then((response) => {
        setAssignments(response?.data?.slice().reverse());
        setFilteredAssignment(response?.data?.slice().reverse());
        //console.log(response?.data[0]);
        const ass = response?.data;
        setIsLoading(false)
        // setPendingEvaluations(ass.length)
      })
      .catch((error) => {console.error(error)
        setIsLoading(false)});
    setIsLoading(false);
  }, [userInfo]);
  //console.log(userInfo.organizationId);

  const filteredData = assignments.filter((item) => !item?.submitter.result);
  //setPendingEvaluations(filteredData.length)

  //console.log(assignments);
  // console.log(countSubmittedResult)

  /////////////////////////////
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
        setIsLoading(false)
      })
      .catch((error) => {console.error(error)
        setIsLoading(false)});
  }, [userInfo]);

  useEffect(() => {
    if (selectedCourse?._id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${selectedCourse?._id}`
        )
        .then((response) => {
          setBatchesData(response?.data);
          setIsLoading(false)
        })
        .catch((error) => {console.error(error)
          setIsLoading(false)});
  }, [selectedCourse]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/students/${userInfo?.organizationId}`
      )
      .then((response) => {
        setAllMyStudents(response?.data);
        setIsLoading(false)

      })
      .catch((error) => {console.error(error)
        setIsLoading(false)});
  }, [userInfo]);

  const applyFilters = () => {
    let filtered = allMyStudents;
    console.log(selectedStatus);

    // Apply course filter
    if (selectedCourse?._id) {
      filtered = filtered?.filter((student) =>
        student.courses?.some(
          (course) => course?.courseId === selectedCourse?._id
        )
      );
    }
    //console.log(filtered);

    // Apply batch filter
    if (selectedBatch?._id) {
      filtered = filtered?.filter((student) =>
        student.courses?.some((batch) => batch?.batchId === selectedBatch?._id)
      );
    }

    // status
    var matchingAssignments = assignments?.filter(assignment =>
      filtered?.some(filteredStudent => assignment?.submitter?._id === filteredStudent?._id)
    );
    if (selectedStatus === "Submitted") {
      matchingAssignments = matchingAssignments?.filter((assignment) => (assignment?.submitter?.result))
    }
    if (selectedStatus === "Pending") {
      matchingAssignments = matchingAssignments?.filter((assignment) => (!assignment?.submitter?.result))
    }
    if (matchingAssignments) {
      setFilteredAssignment(matchingAssignments);
    }
    else {
      console.log("none")
      setFilteredAssignment(assignments);
    }


  };
  function formatDateTime(dateTimeString) {
    const dateObject = new Date(dateTimeString);

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true // Use 12-hour format with AM/PM
    };

    return dateObject.toLocaleString('en-US', options);
  }

  console.log(filteredAssignments)

  return (
    <div>
      <Layout>
        {isLoading && (
          <div className=" flex align-items-center my-5 py-5">
            <CircularProgress className="w-full mx-auto" />
          </div>
        )}
        <div className="">
          <AssignmentUpNev page={"assignment"} />
        </div>

        <div className="flex mt-24">
          <div className="w-full mx-5">
            <div className="flex justify-between">


              <div className="mt-10 text-[#F50000] text-lg font-medium">
                <p>{itemDetails?.pendingEvaluations ? itemDetails?.pendingEvaluations : "Total Pending evaluations"}  - {filteredData.length}</p>
              </div>
            </div>
            {/*  <div>
              <input
                onChange={(e) => {
                  setFilteredAssignment(
                    filteredAssignments?.filter((student) => {
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
            </div> */}

            <div className=" flex gap-10 pb-3 text-lg mt-10">
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
              <select
                className="p-2 border rounded"
                value={selectedCourse?._id}
                onChange={(e) => {
                  const course = courses?.find((c) => c._id === e.target.value);
                  setSelectedCourse(course);
                }}
              >
                <option value="">{itemDetails?.selectCourse ? itemDetails?.selectCourse : "Select Course"}</option>
                {courses?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course?.courseFullName}
                  </option>
                ))}
              </select>

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
                <option value="">{itemDetails?.selectBatch ? itemDetails?.selectBatch : "Select Batch"}</option>
                {batchesData?.map((batch) => (
                  <option key={batch?._id} value={batch?._id}>
                    {batch?.batchName}
                  </option>
                ))}
              </select>
              <select
                className="p-2 border rounded"
                // value={selectedBatch?._id}
                onChange={(e) => {

                  setSelectedStatus(e.currentTarget.value);
                }}
              >
                <option value="">{itemDetails?.selectStatus ? itemDetails?.selectStatus : "Select Status"} </option>

                <option value="Submitted">
                {itemDetails?.submitted ? itemDetails?.submitted : "Submitted"}
                  
                </option>
                <option value="Pending" >
                {itemDetails?.pending ? itemDetails?.pending : "Pending"}
                  
                </option>

              </select>

              <button
                className="bg-sky-500 hover:bg-opacity-70 text-white px-4 py-2 rounded"
                onClick={applyFilters}
              >
                {itemDetails?.applyFilters ? itemDetails?.applyFilters : "Apply Filters"}
                
              </button>
            </div>

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
            <div

              className="h-[70vh] overflow-y-auto mt-5"
            >
              <table className="min-w-full font-sans bg-white border border-gray-300">
                <thead className="bg-gray-800 text-white sticky top-0">
                  <tr>
                    <th className="py-3 px-6 border-b text-left">{itemDetails?.studentName ? itemDetails?.studentName : "Student Name"}</th>
                    <th className="py-3 px-6 border-b text-left"> {itemDetails?.assignmentName ? itemDetails?.assignmentName : "Assignment Name"}</th>
                    <th className="py-3 px-6 border-b text-left">{itemDetails?.submissionDate ? itemDetails?.submissionDate : "Submission Date"}</th>
                    <th className="py-3 px-6 border-b text-center">{itemDetails?.status ? itemDetails?.status : "Status"}</th>
                    <th className="py-3 px-6 border-b text-left"> {itemDetails?.viewAssignment ? itemDetails?.viewAssignment : "View Assignment"} </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredAssignments?.map((assignment, index) => {

                      return (
                        <tr
                          key={assignment?._id}
                          className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
                        >
                          <td className="py-4 px-6 border-b text-left">
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
                                &#x2713; {itemDetails?.evaluated ? itemDetails?.evaluated : "Evaluated"} 
                              </span>
                            ) : (
                              <span className="text-red-600 font-semibold">
                                &#x2717; {itemDetails?.pending ? itemDetails?.pending : "Pending"} 
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 border-b text-left">
                            <Link
                              to={`/assignmentEvaluation2/${assignment?._id}`}
                              className="flex gap-2 bg-[#081765] hover:bg-opacity-70 text-[#fff] p-2 rounded-md mb-2 mt-3"
                            >
                              <img src={eye} alt="eye" />
                              <p className="text-base font-normal">{itemDetails?.view ? itemDetails?.view : "View"}</p>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  }


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
