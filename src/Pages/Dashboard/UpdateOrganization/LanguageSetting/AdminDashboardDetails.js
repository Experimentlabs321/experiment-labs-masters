//DashboardDetails
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AdminDashboardDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/dashboard/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
    setAdminLoading(false);
  }, [userInfo]);
  // console.log(itemDetails)

  const fetchContentDetails = () => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/dashboard/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const newWelcomeName = form.welcome?.value;
    const newOverviewName = form.overview?.value;
    const newSelectFilterName = form.selectFilter?.value;
    const newLastSevenDaysName = form.lastSevenDays?.value;
    const newLastThirtyDaysName = form.lastThirtyDays?.value;
    const newLastYearName = form.lastYear?.value;
    const newOverallName = form.overall?.value;
    const newCustomDateName = form.customDate?.value;
    const newFromDateName = form.fromDate?.value;
    const newToDateName = form.toDate?.value;
    const newTotalStudentsName = form.totalStudents?.value;
    const newEnrolledStudentsName = form.enrolledStudents?.value;
    const newTotalRevenueName = form.totalRevenue?.value;
    const newUnevaluatedAssignmentsName = form.unevaluatedAssignments?.value;
    const newMeetingsTodayName = form.meetingsToday?.value;
    const newTotalStudentsVsEnrolledStudentsName =
      form.totalStudentsVsEnrolledStudents?.value;
    const newTotalRevenueVsTotalDiscountName =
      form.totalRevenueVsTotalDiscount?.value;
    const totalDiscount = form.totalDiscount?.value;

    const itemDetails = {
      welcome: newWelcomeName,
      overview: newOverviewName,
      selectFilter: newSelectFilterName,
      lastSevenDays: newLastSevenDaysName,
      lastThirtyDays: newLastThirtyDaysName,
      lastYear: newLastYearName,
      overall: newOverallName,
      customDate: newCustomDateName,
      fromDate: newFromDateName,
      toDate: newToDateName,
      totalStudents: newTotalStudentsName,
      enrolledStudents: newEnrolledStudentsName,
      totalRevenue: newTotalRevenueName,
      unevaluatedAssignments: newUnevaluatedAssignmentsName,
      meetingsToday: newMeetingsTodayName,
      totalStudentsVsEnrolledStudents: newTotalStudentsVsEnrolledStudentsName,
      totalRevenueVsTotalDiscount: newTotalRevenueVsTotalDiscountName,
      totalDiscount: totalDiscount,
    };
    // console.log(itemDetails)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addNavItemsDetails/dashboard/organizationId/${userInfo?.organizationId}`,
      itemDetails
    );
    // console.log(item)
    if (item?.data === "Items Name updated successfully") {
      setItemDetails({ ...itemDetails });
      fetchContentDetails();
      toast.success("Items Name added Successfully");
      form.reset();
    }
  };

  return (
    <div>
      {adminLoading ? (
        <div className="flex justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-2 border p-4 rounded-xl">
          <div className=" grid grid-cols-2 gap-4">
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Welcome</p>
              <input
                name="welcome"
                type="text"
                defaultValue={itemDetails?.welcome}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>

            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Overview</p>
              <input
                name="overview"
                type="text"
                defaultValue={itemDetails?.overview}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>

            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Select Filter</p>
              <input
                name="selectFilter"
                type="text"
                defaultValue={itemDetails?.selectFilter}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Last 7 Days</p>
              <input
                name="lastSevenDays"
                type="text"
                defaultValue={itemDetails?.lastSevenDays}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Last 30 Days</p>
              <input
                name="lastThirtyDays"
                type="text"
                defaultValue={itemDetails?.lastThirtyDays}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Last year</p>
              <input
                name="lastYear"
                type="text"
                defaultValue={itemDetails?.lastYear}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Overall</p>
              <input
                name="overall"
                type="text"
                defaultValue={itemDetails?.overall}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Custom date</p>
              <input
                name="customDate"
                type="text"
                defaultValue={itemDetails?.customDate}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">From Date</p>
              <input
                name="fromDate"
                type="text"
                defaultValue={itemDetails?.fromDate}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">To Date</p>
              <input
                name="toDate"
                type="text"
                defaultValue={itemDetails?.toDate}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Total Students</p>
              <input
                name="totalStudents"
                type="text"
                defaultValue={itemDetails?.totalStudents}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Enrolled Students</p>
              <input
                name="enrolledStudents"
                type="text"
                defaultValue={itemDetails?.enrolledStudents}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Total Revenue</p>
              <input
                name="totalRevenue"
                type="text"
                defaultValue={itemDetails?.totalRevenue}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Total Discount</p>
              <input
                name="totalDiscount"
                type="text"
                defaultValue={itemDetails?.totalDiscount}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Unevaluated Assignments</p>
              <input
                name="unevaluatedAssignments"
                type="text"
                defaultValue={itemDetails?.unevaluatedAssignments}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">Meetings Today</p>
              <input
                name="meetingsToday"
                type="text"
                defaultValue={itemDetails?.meetingsToday}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">
                Total Students Vs Enrolled Students
              </p>
              <input
                name="totalStudentsVsEnrolledStudents"
                type="text"
                defaultValue={itemDetails?.totalStudentsVsEnrolledStudents}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mt-4">
              <p className="text-lg font-medium">
                Total Revenue Vs Total Discount
              </p>
              <input
                name="totalRevenueVsTotalDiscount"
                type="text"
                defaultValue={itemDetails?.totalRevenueVsTotalDiscount}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-20 mb-10">
            <input
              type="submit"
              value="Save"
              className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminDashboardDetails;
