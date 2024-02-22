import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import ApexChart from "../AdminDashboard/ApexChart";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import SalesAndRevenueChart from "./SalesAndRevenueChart";
import { Link } from "react-router-dom";

const SalesAndRevenue = () => {
  const { userInfo } = useContext(AuthContext);
  const [overViewCount, setOverViewCount] = useState();
  const [students, setStudents] = useState();
  const [selectedFilter, setSelectedFilter] = useState("Last 30 Days");
  const [totalStudents, setTotalStudents] = useState();
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
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/stats/organizationId/${userInfo?.organizationId}`
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

  // console.log(overViewCount);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users/students/${userInfo?.organizationId}`
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
        `http://localhost:5000/api/v1/users/getAllPaidInfoWithPayerData/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setPaidStudents(response?.data);
        setFilteredStudents(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [userInfo]);

  const applyFilters = async () => {
    let filtered = paidStudents;
    // console.log(topic, batch, status);

    // Apply course filter
    // if (topic?._id) {
    //   filtered = await filtered.filter(
    //     (student) => student?.courseId === topic?._id
    //   );
    // }
    if (selectedCourses[0]) {
      filtered = await filtered?.filter((student) =>
        selectedCourses?.find((course) => course?._id === student?.courseId)
      );
    }
    console.log(filtered);

    // Apply batch filter
    // if (batch?._id) {
    //   filtered = await filtered.filter(
    //     (student) => student?.batchId === batch._id
    //   );
    // }
    if (selectedBatches[0]) {
      filtered = await filtered?.filter((student) =>
        selectedBatches?.find((batch) => batch === student?.batchId)
      );
    }

    // Apply validation filter
    // if (status) {
    //   if (status === "Paid") {
    //     filtered = await filtered.filter(
    //       (item) => item?.courses && item?.courses[0]
    //     );
    //   } else if (status === "Unpaid") {
    //     filtered = await filtered.filter(
    //       (item) => !item?.courses || !item?.courses[0]
    //     );
    //   } else if (status === "Expired") {
    //     filtered = await filtered.filter(
    //       (item) => item?.courses && item?.courses[0]
    //     );
    //     filtered = await filtered.filter((item) => {
    //       let flag = false;
    //       item?.courses?.map((course) => {
    //         if (course?.enrollDate) {
    //           const actualCourse = courses?.find(
    //             (i) => i?._id === course?.courseId
    //           );
    //           if (
    //             parseInt(actualCourse?.expirationDay) -
    //               daysDifferenceFromEnrolled(course?.enrollDate) <
    //             0
    //           ) {
    //             flag = true;
    //           }
    //         }
    //       });
    //       return flag;
    //     });
    //   }
    // }

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
      `${process.env.REACT_APP_SERVER_API}/api/v1/batches/courseId/${selectedCourse._id}`
    );
    selectedCourse.batches = data;
    console.log("Selected Course", selectedCourse);

    if (!selectedCourses?.includes(selectedCourse)) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
    }
    applyFilters();
  };

  const removeSelectedCourse = (removedCourse) => {
    setSelectedBatches(
      selectedBatches?.filter(
        (batch) =>
          !removedCourse?.selectedBatches?.find((item) => item?._id === batch)
      )
    );
    const newSelectedCourses = selectedCourses.filter(
      (course) => course !== removedCourse
    );
    setSelectedCourses(newSelectedCourses);
    applyFilters();
  };

  const handleBatches = (batch, index) => {
    if (!selectedBatches?.includes(batch._id)) {
      setSelectedBatches([...selectedBatches, batch._id]);
      if (selectedCourses[index].selectedBatches)
        selectedCourses[index].selectedBatches = [
          batch,
          ...selectedCourses[index].selectedBatches,
        ];
      else {
        const course = { ...selectedCourses[index], selectedBatches: [batch] };
        selectedCourses[index] = course;
      }
    } else {
      console.log(selectedBatches, batch._id);
      const newSelectedBatches = selectedBatches.filter(
        (removeBatch) => removeBatch !== batch._id
      );
      selectedCourses[index].selectedBatches = selectedCourses[
        index
      ].selectedBatches.filter((removeBatch) => removeBatch?._id !== batch._id);
      setSelectedBatches(newSelectedBatches);
    }
    applyFilters();
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

  console.log(filteredStudents);

  return (
    <div>
      <Layout>
        <div className="p-4">
          <h1 className="text-3xl font-bold">Sales & Revenue</h1>

          <div className="my-5 flex gap-5 flex-wrap">
            <Link
              to=""
              className="w-fit min-w-[200px] justify-center items-stretch shadow-md border flex flex-col px-2 rounded-md py-4"
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
              className="w-fit min-w-[200px] justify-center items-stretch shadow-md border flex flex-col px-2 rounded-md py-4"
            >
              <h1 className=" text-sm font-medium tracking-widest">
                Total Refunds
              </h1>
              <h1 className=" font-sans text-3xl font-bold tracking-[1px] whitespace-nowrap mt-3 flex items-center">
                &#8377;0
              </h1>
            </Link>
          </div>

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
          <div
            // style={{ width: tableWidth, height: "70vh" }}
            className="overflow-x-auto"
          >
            <table className="min-w-full font-sans bg-white border border-gray-300">
              <thead className="bg-gray-800 text-white sticky top-0">
                <tr>
                  <th className="py-3 px-6 border-b text-left">Name</th>
                  <th className="py-3 px-6 border-b text-left">Email</th>
                  <th className="py-3 px-6 border-b text-left">phone</th>
                  <th className="py-3 px-6 border-b text-left">Joining Date</th>
                  <th className="py-3 px-6 border-b text-left">Paid/Unpaid</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents &&
                  filteredStudents[0] &&
                  filteredStudents?.reverse()?.map((student, index) => {
                    const formattedDate = new Date(
                      student?.payer?.dateCreated
                    )?.toLocaleDateString();

                    return (
                      <tr
                        key={student?._id}
                        className={
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                        }
                      >
                        <td className="py-4 px-6 border-b text-left">
                          <Link to={`/profile/${student?.payer?.email}`}>
                            {student?.payer?.name}
                          </Link>
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          <Link to={`/profile/${student?.payer?.email}`}>
                            {student?.payer?.email}
                          </Link>
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          <Link to={`/profile/${student?.payer?.email}`}>
                            {student?.payer?.phone}
                          </Link>
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          <Link to={`/profile/${student?.payer?.email}`}>
                            {formattedDate}
                          </Link>
                        </td>
                        <td className="py-4 px-6 border-b text-left">
                          {parseInt(selectedCourse?.expirationDay) -
                            daysDifferenceFromEnrolled(
                              student?.courses?.find(
                                (item) => item?.courseId === selectedCourse?._id
                              )?.enrollDate
                            ) <
                            0 ||
                          (!selectedCourse?._id &&
                            selectedValidationStatus === "Expired") ? (
                            <Link to={`/profile/${student?.email}`}>
                              <span className="text-orange-600 font-semibold">
                                &#9888; Expired
                              </span>
                            </Link>
                          ) : (
                            <Link to={`/profile/${student?.email}`}>
                              {student?.courses && student?.courses[0] ? (
                                <span className="text-green font-semibold">
                                  &#x2713; Paid
                                </span>
                              ) : (
                                <span className="text-red-600 font-semibold">
                                  &#x2717; Unpaid
                                </span>
                              )}
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SalesAndRevenue;
