//AdminAssignmentsDetails

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const AdminAssignmentsDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/assignments/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/assignments/organizationsId/${userInfo?.organizationId}`
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

    const newPendingEvaluationsName = form.pendingEvaluations?.value;
    const newSelectCourseName = form.selectCourse?.value;
    const newSelectBatchName = form.selectBatch?.value;
    const newSelectStatusName = form.selectStatus?.value;
    const newApplyFiltersName = form.applyFilters?.value;
    const newStudentNameName = form.studentName?.value;
    const newAssignmentNameName = form.assignmentName?.value;
    const newSubmissionDateName = form.submissionDate?.value;
    const newStatusName = form.status?.value;
    const newViewAssignmentName = form.viewAssignment?.value;
    const newViewName = form.view?.value;
    const newPendingName = form.pending?.value;
    const newEvaluatedName = form.evaluated?.value;
    const submitted = form.submitted?.value;

    const itemDetails = {
      pendingEvaluations: newPendingEvaluationsName,
      selectCourse: newSelectCourseName,
      selectBatch: newSelectBatchName,
      selectStatus: newSelectStatusName,
      applyFilters: newApplyFiltersName,
      studentName: newStudentNameName,
      assignmentName: newAssignmentNameName,
      submissionDate: newSubmissionDateName,
      status: newStatusName,
      viewAssignment: newViewAssignmentName,
      view: newViewName,
      pending: newPendingName,
      evaluated: newEvaluatedName,
      submitted: submitted,
    };
    // console.log(itemDetails)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addNavItemsDetails/assignments/organizationId/${userInfo?.organizationId}`,
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
              <p className="text-lg font-medium">Pending evaluations</p>
              <input
                name="pendingEvaluations"
                defaultValue={itemDetails?.pendingEvaluations}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>

            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Select Course</p>
              <input
                name="selectCourse"
                defaultValue={itemDetails?.selectCourse}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Select Batch</p>
              <input
                name="selectBatch"
                defaultValue={itemDetails?.selectBatch}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Select Status</p>
              <input
                name="selectStatus"
                defaultValue={itemDetails?.selectStatus}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Apply Filters</p>
              <input
                name="applyFilters"
                defaultValue={itemDetails?.applyFilters}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Student Name</p>
              <input
                name="studentName"
                defaultValue={itemDetails?.studentName}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Assignment Name</p>
              <input
                name="assignmentName"
                defaultValue={itemDetails?.assignmentName}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Submission Date</p>
              <input
                name="submissionDate"
                defaultValue={itemDetails?.submissionDate}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Status</p>
              <input
                name="status"
                defaultValue={itemDetails?.status}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">View Assignment</p>
              <input
                name="viewAssignment"
                defaultValue={itemDetails?.viewAssignment}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">View</p>
              <input
                name="view"
                defaultValue={itemDetails?.view}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium"> Pending</p>
              <input
                name="pending"
                defaultValue={itemDetails?.pending}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Evaluated</p>
              <input
                name="evaluated"
                defaultValue={itemDetails?.evaluated}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Submitted</p>
              <input
                name="submitted"
                defaultValue={itemDetails?.submitted}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-20 mb-10 ">
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

export default AdminAssignmentsDetails;
