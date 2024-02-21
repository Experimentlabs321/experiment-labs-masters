import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import ApexChart from "../AdminDashboard/ApexChart";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import RevenueChart from "../AdminDashboard/RevenueChart";

const SalesAndRevenue = () => {
  const { userInfo } = useContext(AuthContext);
  const [overViewCount, setOverViewCount] = useState();
  const [students, setStudents] = useState();
  const [selectedFilter, setSelectedFilter] = useState("Last 7 Days");
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

  const applyFilters = async (topic, batch, status) => {
    let filtered = paidStudents;
    console.log(topic, batch, status);

    // Apply course filter
    if (topic?._id) {
      filtered = await filtered.filter(
        (student) => student?.courseId === topic?._id
      );
    }
    console.log(filtered);

    // Apply batch filter
    if (batch?._id) {
      filtered = await filtered.filter(
        (student) => student?.batchId === batch._id
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

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users/getAllPaidInfo/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setPaidStudents(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [userInfo]);

  return (
    <div>
      <Layout>
        <div className="p-4">
          <h1 className="text-3xl font-bold">Sales & Revenue</h1>

          <div className="flex space-x-4 my-4">
            {/* Course Filter Dropdown */}
            <select
              className="p-2 border rounded"
              value={selectedCourse?._id}
              onChange={async (e) => {
                const course = courses.find((c) => c._id === e.target.value);
                await setSelectedCourse(course);
                setSelectedBatch({});
                setBatchesData([]);
                applyFilters(course, "", selectedValidationStatus);
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
              onChange={async (e) => {
                const batch = batchesData.find((b) => b._id === e.target.value);
                await setSelectedBatch(batch);
                applyFilters(selectedCourse, batch, selectedValidationStatus);
              }}
            >
              <option value="">Select Batch</option>
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
                applyFilters(selectedCourse, selectedBatch, e.target.value);
              }}
            >
              <option value="">Select Validation</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Expired">Expired</option>
            </select>

            {/* Apply Filters Button */}
            {/* <button
                    className="bg-sky-500 text-white px-4 py-2 rounded"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button> */}
          </div>

          <div className="mb-5 flex gap-5 items-center">
            <label className="font-bold">Select Filter:</label>
            <select
              className="p-2 border rounded"
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
        </div>
        <div className="w-[97%] mx-auto">
          <RevenueChart
            selectedFilter={selectedFilter}
            paidStudents={filteredStudents}
            setTotalRevenue={setTotalRevenue}
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>
      </Layout>
    </div>
  );
};

export default SalesAndRevenue;
