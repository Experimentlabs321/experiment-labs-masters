import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import ApexChart from "../AdminDashboard/ApexChart";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import SalesAndRevenueChart from "./SalesAndRevenueChart";
import { Link } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import inrIcon from "../../../assets/Dashboard/inrIcon.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SalesAndRevenue = () => {
  const { userInfo } = useContext(AuthContext);
  const [overViewCount, setOverViewCount] = useState();
  const [students, setStudents] = useState();
  const [selectedFilter, setSelectedFilter] = useState("Last 30 Days");
  const [totalStudents, setTotalStudents] = useState();
  const [bundles, setBundles] = useState();
  const [totalEnrolledStudents, setTotalEnrolledStudents] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [paidStudents, setPaidStudents] = useState();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [selectedValidationStatus, setSelectedValidationStatus] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [courseInput, setCourseInput] = useState("");
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 15;
  const [tableWidth, setTableWidth] = useState("100%");
  const tableRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/courseAndBatch/organizationId/${userInfo?.organizationId}`
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
    if (userInfo.organizationId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/bundles/organizationId/${userInfo.organizationId}`
        )
        .then((response) => {
          setBundles(response?.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [userInfo.organizationId]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/stats/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOverViewCount(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [userInfo]);

  console.log(filteredStudents);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/students/${userInfo?.organizationId}`
      )
      .then((response) => {
        setStudents(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [userInfo]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_SERVER_API}/api/v1/users/getAllPaidInfo/organizationId/${userInfo?.organizationId}`
  //     )
  //     .then((response) => {
  //       setPaidStudents(response?.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setIsLoading(false);
  //     });
  //   setIsLoading(false);
  // }, [userInfo]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/getAllPaidInfoWithPayerData/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setPaidStudents(response?.data?.reverse());
        setFilteredStudents(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [userInfo]);

  useEffect(() => {
    // Calculate the desired width (e.g., 200px less than the screen width)
    const screenWidth = window.innerWidth;
    const desiredWidth = screenWidth - 360;

    // Set the table width as a string
    setTableWidth(`${desiredWidth}px`);

    // Update the width if the window is resized
    const handleResize = () => {
      const updatedWidth = window.innerWidth - 360;
      setTableWidth(`${updatedWidth}px`);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const applyFilters = async (filterCourses, filterBatches) => {
    let filtered = paidStudents;

    if (filterCourses[0]) {
      filtered = await filtered?.filter((student) =>
        filterCourses?.find((course) => course?._id === student?.courseId)
      );
    }

    if (filterBatches[0]) {
      filtered = await filtered?.filter((student) =>
        filterBatches?.find((batch) => batch === student?.batchId)
      );
    }

    setFilteredStudents(filtered);
  };

  const handleCourseInputChange = (event) => {
    if (event.target.value.length > 0) setCourseDropdown(true);
    setCourseInput(event.target.value);
  };

  const handleCourseSelect = async (selectedCourse) => {
    setCourseInput("");
    setCourseDropdown(false);

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${selectedCourse._id}`
    );
    selectedCourse.batches = data;

    if (!selectedCourses?.includes(selectedCourse)) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
      applyFilters([...selectedCourses, selectedCourse], selectedBatches);
    }
  };

  const removeSelectedCourse = async (removedCourse) => {
    const filterBatches = selectedBatches?.filter(
      (batch) =>
        !removedCourse?.selectedBatches?.find((item) => item?._id === batch)
    );
    setSelectedBatches(filterBatches);
    await applyFilters(selectedCourses, filterBatches);
    const newSelectedCourses = selectedCourses.filter(
      (course) => course !== removedCourse
    );
    setSelectedCourses(newSelectedCourses);
    applyFilters(newSelectedCourses, filterBatches);
  };

  const handleBatches = async (batch, index) => {
    if (!selectedBatches?.includes(batch._id)) {
      setSelectedBatches([...selectedBatches, batch._id]);
      await applyFilters(selectedCourses, [...selectedBatches, batch._id]);
      if (selectedCourses[index].selectedBatches) {
        selectedCourses[index].selectedBatches = [
          batch,
          ...selectedCourses[index].selectedBatches,
        ];
        await applyFilters(selectedCourses, [...selectedBatches, batch._id]);
      } else {
        const course = { ...selectedCourses[index], selectedBatches: [batch] };
        selectedCourses[index] = course;
        await applyFilters(selectedCourses, [...selectedBatches, batch._id]);
      }
    } else {
      const newSelectedBatches = selectedBatches.filter(
        (removeBatch) => removeBatch !== batch._id
      );
      selectedCourses[index].selectedBatches = selectedCourses[
        index
      ].selectedBatches.filter((removeBatch) => removeBatch?._id !== batch._id);
      setSelectedBatches(newSelectedBatches);
      applyFilters(selectedCourses, newSelectedBatches);
    }
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

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredStudents.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  const paginate = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  console.log(bundles);

  const handleCourseOrBundleName = (std) => {
    let courseOrBundleName = "";
    const courseData = courses?.find(
      (item) => item?._id === std?.courses[0]?.courseId
    );
    const batchData = courseData?.batches?.find(
      (item) => item?._id === std?.batchId
    );
    const bundlesData = bundles?.find((item) => item?._id === std?.bundleId);
    console.log(std);
    console.log(bundlesData?.bundleFullName, courseData?.courseFullName);
    if (!std?.bundleId) {
      console.log(courseData?.courseFullName);
      courseOrBundleName = courseData?.courseFullName;
    } else {
      // courseOrBundleName = bundles?.find(
      //   (item) => item?._id === std?.bundleId
      // )?.bundleFullName;

      courseOrBundleName = bundlesData?.bundleFullName;
    }
    console.log(courseData, bundlesData);
    return courseOrBundleName || "";
  };

  return (
    <div>
      <Layout>
        <div className="p-4">
          <h1 className="text-3xl font-bold">Sales & Revenue</h1>
          {totalRevenue ? (
            <div className="my-5 flex gap-5 flex-wrap">
              <Link
                to=""
                className="w-fit min-w-[200px] justify-center items-stretch  bg-[#8064F0] text-white shadow-md border flex flex-col px-2 rounded-md py-4"
              >
                <h1 className=" text-sm font-medium tracking-widest">
                  Total Revenue
                </h1>
                <h1 className=" font-sans text-3xl font-bold tracking-[1px] whitespace-nowrap mt-3 flex items-center">
                  &#8377;{totalRevenue ? totalRevenue : "0"}
                </h1>
              </Link>
              <Link
                to=""
                className="w-fit min-w-[200px] justify-center items-stretch bg-[#0A98EA] text-white shadow-md border flex flex-col px-2 rounded-md py-4"
              >
                <h1 className=" text-sm font-medium tracking-widest">
                  Total Refunds
                </h1>
                <h1 className=" font-sans text-3xl font-bold tracking-[1px] whitespace-nowrap mt-3 flex items-center">
                  &#8377;0
                </h1>
              </Link>
              <Link
                to=""
                className="w-fit min-w-[200px] justify-center items-stretch bg-[#5c0aea] text-white shadow-md border flex flex-col px-2 rounded-md py-4"
              >
                <h1 className=" text-sm font-medium tracking-widest">
                  Total Courses
                </h1>
                <h1 className=" font-sans text-3xl font-bold tracking-[1px] whitespace-nowrap mt-3 flex items-center">
                  {courses?.length}
                </h1>
              </Link>
              <Link
                to=""
                className="w-fit min-w-[200px] justify-center items-stretch bg-[#6278FF] text-white shadow-md border flex flex-col px-2 rounded-md py-4"
              >
                <h1 className=" text-sm font-medium tracking-widest">
                  Enrolled Students
                </h1>
                <h1 className=" font-sans text-3xl font-bold tracking-[1px] whitespace-nowrap mt-3 flex items-center">
                  {paidStudents?.length}
                </h1>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              {" "}
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </div>
          )}

          <div className="mb-5 flex gap-5 items-center">
            <label className="font-bold">Select Filter:</label>
            <select
              className="p-2 border rounded font-sans"
              onChange={(e) => setSelectedFilter(e.target.value)}
              value={selectedFilter}
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 11 Months">Last year</option>
              <option value="Overall">Overall</option>
              <option value="Custom date">Custom date</option>
            </select>
          </div>
          {selectedFilter === "Custom date" && (
            <div className="flex gap-5 my-5">
              <p>
                <span>From Date :</span>
                <input
                  className="p-2 border rounded ms-2"
                  type="datetime-local"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </p>
              <p>
                <span>To Date:</span>
                <input
                  className="p-2 border rounded ms-2"
                  type="datetime-local"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </p>
            </div>
          )}

          <div className="mb-4">
            <div className="relative">
              <>
                <label className="text-[16px] font-[600]" htmlFor="course">
                  Select Courses
                </label>
                <input
                  // onKeyPress={handleKeyPress}
                  onChange={handleCourseInputChange}
                  // onFocus={() => setCourseDropdown(true)}
                  onBlur={() => setCourseDropdown(false)}
                  value={courseInput}
                  autoComplete="off"
                  name="Courses"
                  placeholder="Start typing to select courses"
                  className="block w-full px-4 py-2 mt-2 rounded-md border bg-white border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                />
                {courseDropdown && (
                  <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                    {courses
                      ?.filter((course) =>
                        course.courseFullName
                          ?.toLowerCase()
                          ?.includes(courseInput?.toLowerCase())
                      )
                      .map((course, index) => (
                        <div
                          key={index}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100`}
                          onMouseDown={() => handleCourseSelect(course)}
                        >
                          {course.courseFullName}
                        </div>
                      ))}
                  </div>
                )}

                {selectedCourses[0] && (
                  <div className="tag-container my-2 flex flex-wrap rounded-lg border-2 p-2">
                    {selectedCourses?.map((course, index) => {
                      return (
                        <div
                          key={index}
                          className="m-1 h-fit rounded-lg border-2 py-1 px-2"
                        >
                          {course?.courseFullName}{" "}
                          <span
                            className="cursor-pointer pl-1 text-xl font-bold"
                            onClick={() => removeSelectedCourse(course)}
                          >
                            ×
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>

              {selectedCourses[0] && (
                <div className="tag-container my-2 flex flex-col rounded-lg border-2 p-2">
                  {selectedCourses?.map((course, index) => {
                    return (
                      <div key={index} className="">
                        <h1 className="font-semibold">
                          {course?.courseFullName}{" "}
                        </h1>
                        <div className="flex gap-2 mt-2 flex-wrap mb-2">
                          {course?.batches?.map((batch, batchIndex) => {
                            return (
                              <div
                                onClick={() => handleBatches(batch, index)}
                                className={`px-2 py-1 border-2 rounded-full cursor-pointer ${
                                  selectedBatches?.includes(batch._id) &&
                                  "bg-[#39249957]"
                                }`}
                                key={batchIndex}
                              >
                                {batch.batchName}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-[97%] mx-auto">
          <SalesAndRevenueChart
            selectedCourses={selectedCourses[0] ? selectedCourses : courses}
            selectedBatches={selectedBatches}
            selectedFilter={selectedFilter}
            paidStudents={paidStudents}
            setTotalRevenue={setTotalRevenue}
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>

        <div className="p-4">
          <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <button className="bg-sky-400 text-white font-bold px-4 py-2 rounded-md ">
              {" "}
              Export excel{" "}
            </button>
          </DownloadTableExcel>
        </div>
        <div className="p-4">
          <div style={{ width: tableWidth }} className="overflow-x-auto">
            <table
              // ref={tableRef}
              className="min-w-full font-sans bg-white border border-gray-300"
            >
              <thead className="bg-gray-800 text-white sticky top-0">
                <tr>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Name
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Email
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Phone
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Purchase Date
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Course
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Batch
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Original Price
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Paid Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTasks &&
                  currentTasks[0] &&
                  currentTasks?.map((student, index) => {
                    const formattedDate = new Date(
                      student?.paidAt
                    )?.toLocaleDateString();

                    let courseData, batchData;

                    if (student?.courses?.length === 1) {
                      courseData = courses?.find(
                        (item) => item?._id === student?.courses[0]?.courseId
                      );
                      batchData = courseData?.batches?.find(
                        (item) => item?._id === student?.courses[0]?.batchId
                      );
                    } else {
                    }

                    return (
                      <tr
                        key={student?._id}
                        className={
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                        }
                      >
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.payer?.email}`}>
                            {student?.payer?.name}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.payer?.email}`}>
                            {student?.payer?.email}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.payer?.email}`}>
                            {student?.payer?.phone}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.payer?.email}`}>
                            {formattedDate}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.email}`}>
                            {handleCourseOrBundleName(student)}
                            {/* {courseData?.courseFullName} */}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.email}`}>
                            {batchData?.batchName}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.email}`}>
                            &#8377;
                            {student?.originalPrice
                              ? student?.originalPrice
                              : 0}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.email}`}>
                            &#8377;
                            {student?.paidAmount ? student?.paidAmount : 0}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <table
              ref={tableRef}
              className="min-w-full hidden font-sans bg-white border border-gray-300"
            >
              <thead className="bg-gray-800 text-white sticky top-0">
                <tr>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Name
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Email
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Phone
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Purchase Date
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Course
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Batch
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Original Price
                  </th>
                  <th
                    className="py-3 px-6 border-b text-left whitespace-nowrap
                  "
                  >
                    Paid Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents &&
                  filteredStudents[0] &&
                  filteredStudents?.map((student, index) => {
                    const formattedDate = new Date(
                      student?.paidAt
                    )?.toLocaleDateString();
                    let courseData, batchData;

                    if (student?.courses?.length === 1) {
                      courseData = courses?.find(
                        (item) => item?._id === student?.courses[0]?.courseId
                      );
                      batchData = courseData?.batches?.find(
                        (item) => item?._id === student?.courses[0]?.batchId
                      );
                    } else {
                    }
                    return (
                      <tr
                        key={student?._id}
                        className={
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                        }
                      >
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.payer?.email}`}>
                            {student?.payer?.name} some
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.payer?.email}`}>
                            {student?.payer?.email}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.payer?.email}`}>
                            {student?.payer?.phone}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.payer?.email}`}>
                            {formattedDate}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p>
                            {/* {courseData?.courseFullName} */}
                            {handleCourseOrBundleName(student)}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.email}`}>
                            {batchData?.batchName}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.email}`}>
                            &#8377;
                            {student?.originalPrice
                              ? student?.originalPrice
                              : 0}
                          </p>
                        </td>
                        <td className="py-4 px-6 border-b text-left whitespace-nowrap">
                          <p to={`/profile/${student?.email}`}>
                            &#8377;
                            {student?.paidAmount ? student?.paidAmount : 0}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center my-4">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(filteredStudents.length / tasksPerPage)}
                page={currentPage}
                onChange={paginate}
              />
            </Stack>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SalesAndRevenue;
