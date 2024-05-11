//AdminStatistics
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ApexChart from "./ApexChart";
import RevenueChart from "./RevenueChart";
import inrIcon from "../../../assets/Dashboard/inrIcon.png";

import { CircularProgress } from "@mui/material";

const AdminStatistics = ({ itemDetails }) => {
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

  // console.log(overViewCount);

  useEffect(() => {
    if (userInfo?.organizationId) {
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
    }
  }, [userInfo]);
  useEffect(() => {
    if (userInfo?.organizationId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/getAllPaidInfo/organizationId/${userInfo?.organizationId}`
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
    }
  }, [userInfo]);

  return (
    <div>
      <h1 className="text-3xl font-bold my-10">
        {itemDetails?.overview ? itemDetails?.overview : "Overview"}{" "}
      </h1>
      {isLoading && (
        <div className=" flex align-items-center my-5 py-5">
          <CircularProgress className="w-full mx-auto" />
        </div>
      )}
      <div className="mb-5 flex gap-5 items-center">
        <label className="font-bold">
          {" "}
          {itemDetails?.selectFilter
            ? itemDetails?.selectFilter
            : "Select Filter"}
          :
        </label>
        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedFilter(e.target.value)}
          value={selectedFilter}
        >
          <option value="Last 7 Days">
            {itemDetails?.lastSevenDays
              ? itemDetails?.lastSevenDays
              : "Last 7 Days"}{" "}
          </option>
          <option value="Last 30 Days">
            {" "}
            {itemDetails?.lastThirtyDays
              ? itemDetails?.lastThirtyDays
              : "Last 30 Days"}
          </option>
          <option value="Last 11 Months">
            {itemDetails?.lastYear ? itemDetails?.lastYear : "Last year"}
          </option>
          <option value="Overall">
            {itemDetails?.overall ? itemDetails?.overall : "Overall"}
          </option>
          <option value="Custom date">
            {itemDetails?.customDate ? itemDetails?.customDate : "Custom date"}
          </option>
        </select>
      </div>
      {selectedFilter === "Custom date" && (
        <div className="flex gap-5 my-5">
          <p>
            <span>
              {itemDetails?.fromDate ? itemDetails?.fromDate : "From Date"} :
            </span>
            <input
              className="p-2 border rounded ms-2"
              type="datetime-local"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </p>
          <p>
            <span>
              {itemDetails?.toDate ? itemDetails?.toDate : "To Date"}:
            </span>
            <input
              className="p-2 border rounded ms-2"
              type="datetime-local"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </p>
        </div>
      )}

      <div className="flex gap-5">
        <Link
          to="/myStudents"
          className="w-[160px] justify-center items-stretch shadow-sm bg-[#8064F0] flex flex-col px-2 rounded-md py-4"
        >
          <div className="justify-between items-stretch flex gap-5">
            <div className="text-white text-sm font-medium tracking-widest">
              {itemDetails?.totalStudents
                ? itemDetails?.totalStudents
                : "Total Students"}
            </div>
            <img
              alt="icon"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
              className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
          </div>
          <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
            {totalStudents ? totalStudents : "0"}
          </div>
        </Link>
        <Link
          to={`/myStudents/${"paidStudents"}`}
          className="w-[160px] justify-center items-stretch shadow-sm bg-[#0A98EA] flex flex-col px-2 rounded-md py-4"
        >
          <div className="justify-between items-stretch flex gap-5">
            <div className="text-white text-sm font-medium tracking-widest">
              {itemDetails?.enrolledStudents
                ? itemDetails?.enrolledStudents
                : "Enrolled Students"}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
              className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
              alt="icon"
            />
          </div>
          <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
            {totalEnrolledStudents ? totalEnrolledStudents : "0"}
          </div>
        </Link>
        <Link
          to=""
          className="w-[160px] justify-center items-stretch shadow-sm bg-[#5c0aea] flex flex-col px-2 rounded-md py-4"
        >
          <div className="justify-between items-stretch flex gap-5">
            <div className="text-white text-sm font-medium tracking-widest">
              {itemDetails?.totalRevenue
                ? itemDetails?.totalRevenue
                : "Total Revenue"}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
              className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
              alt="icon"
            />
          </div>
          <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3 flex items-center">
            <img className="w-[20px] text-[#fff]" src={inrIcon} alt="icon" />
            {totalRevenue ? totalRevenue : "0"}
          </div>
        </Link>

        <Link
          to="/mentorAssignments"
          className="w-[160px] justify-center ms-10 items-stretch shadow-sm bg-[#6278FF] flex flex-col px-2 rounded-md py-4"
        >
          <div className="justify-between items-stretch flex gap-5">
            <div className="text-white text-sm font-medium tracking-widest">
              {itemDetails?.unevaluatedAssignments
                ? itemDetails?.unevaluatedAssignments
                : "Unevaluated Assignments"}
            </div>
            <img
              alt="icon"
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
              className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
            />
          </div>
          <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
            {overViewCount?.unevaluatedStudents
              ? overViewCount?.unevaluatedStudents
              : "0"}
          </div>
        </Link>

        <Link
          to={`/schedule/${"agenda"}`}
          className="w-[160px] justify-center items-stretch shadow-sm bg-[#E8B912] flex flex-col px-2 rounded-md py-4"
        >
          <div className="justify-between items-stretch flex gap-5">
            <div className="text-white text-sm font-medium tracking-widest">
              {itemDetails?.meetingsToday
                ? itemDetails?.meetingsToday
                : "Meetings Today"}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
              className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
              alt="icon"
            />
          </div>
          <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
            {overViewCount?.totalMeeting ? overViewCount?.totalMeeting : "0"}
          </div>
        </Link>
        {/*   <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#DD2025] flex flex-col px-2 rounded-md py-4">
                    <div className="justify-between items-stretch flex gap-5">
                        <div className="text-white text-sm font-medium tracking-widest">
                            Completion Rate
                        </div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                            className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                            alt="icon"/>
                    </div>
                    <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                        100
                    </div>
                </div> */}
      </div>
      <div className="my-10">
        <ApexChart
          itemDetails={itemDetails}
          selectedFilter={selectedFilter}
          students={students}
          setTotalStudents={setTotalStudents}
          setTotalEnrolledStudents={setTotalEnrolledStudents}
          toDate={toDate}
          fromDate={fromDate}
        />
        <RevenueChart
          itemDetails={itemDetails}
          selectedFilter={selectedFilter}
          paidStudents={paidStudents}
          setTotalRevenue={setTotalRevenue}
          fromDate={fromDate}
          toDate={toDate}
        />
      </div>
    </div>
  );
};

export default AdminStatistics;
