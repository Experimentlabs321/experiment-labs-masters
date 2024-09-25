//AssignmentDetails

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AssignmentDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/assignment/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          // console.log(response)
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/assignment/organizationsId/${userInfo?.organizationId}`
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

    const newManageAssignmentInName = form.manageAssignmentIn?.value;
    const newPreviewModeName = form.previewMode?.value;
    const newAssignmentNameName = form.assignmentName?.value;
    const newAssignmentTotalPointsOrMarksName =
      form.assignmentTotalPointsOrMarks?.value;
    const newAssignmentInstructionsName = form.assignmentInstructions?.value;
    const newUploadFilesName = form.uploadFiles?.value;
    const newDragAndDropName = form.dragAndDrop?.value;
    const newOrName = form.or?.value;
    const newBrowserName = form.browser?.value;
    const newSelectBatchName = form.selectBatch?.value;
    const newContentStageName = form.contentStage?.value;
    const newEnableDripName = form.enableDrip?.value;
    const newAssignmentStartingDateAndTimeName =
      form.assignmentStartingDateAndTime?.value;
    const newAssignmentEndingDateAndTimeName =
      form.assignmentEndingDateAndTime?.value;
    const newSaveName = form.save?.value;

    const itemDetail = {
      manageAssignmentIn: newManageAssignmentInName,
      previewMode: newPreviewModeName,
      assignmentName: newAssignmentNameName,
      assignmentTotalPointsOrMarks: newAssignmentTotalPointsOrMarksName,
      assignmentInstructions: newAssignmentInstructionsName,
      uploadFiles: newUploadFilesName,
      dragAndDrop: newDragAndDropName,
      or: newOrName,
      browser: newBrowserName,
      selectBatch: newSelectBatchName,
      contentStage: newContentStageName,
      enableDrip: newEnableDripName,
      assignmentStartingDateAndTime: newAssignmentStartingDateAndTimeName,
      assignmentEndingDateAndTime: newAssignmentEndingDateAndTimeName,
      save: newSaveName,
    };
    // console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addContentManageSubDetails/assignment/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    // console.log(item)
    if (item?.data === "Content Manage Sub Details updated successfully") {
      setItemDetails({ ...itemDetails });
      fetchContentDetails();
      toast.success("Items Names added Successfully");
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
              <p className="text-lg font-medium">Manage Assignment in</p>
              <input
                name="manageAssignmentIn"
                defaultValue={itemDetails?.manageAssignmentIn}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Preview Mode</p>
              <input
                name="previewMode"
                defaultValue={itemDetails?.previewMode}
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
              <p className="text-lg font-medium">
                Assignment Total Points/Marks
              </p>
              <input
                name="assignmentTotalPointsOrMarks"
                defaultValue={itemDetails?.assignmentTotalPointsOrMarks}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Assignment Instructions</p>
              <input
                name="assignmentInstructions"
                defaultValue={itemDetails?.assignmentInstructions}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Upload Files</p>
              <input
                name="uploadFiles"
                defaultValue={itemDetails?.uploadFiles}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Drag and drop</p>
              <input
                name="dragAndDrop"
                defaultValue={itemDetails?.dragAndDrop}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Or</p>
              <input
                name="or"
                type="text"
                defaultValue={itemDetails?.or}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Browser</p>
              <input
                name="browser"
                type="text"
                defaultValue={itemDetails?.browser}
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
              <p className="text-lg font-medium">Content Stage</p>
              <input
                name="contentStage"
                defaultValue={itemDetails?.contentStage}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Enable Drip</p>
              <input
                name="enableDrip"
                defaultValue={itemDetails?.enableDrip}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Assignment Starting Date and Time
              </p>
              <input
                name="assignmentStartingDateAndTime"
                defaultValue={itemDetails?.assignmentStartingDateAndTime}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Assignment Ending Date and Time
              </p>
              <input
                name="assignmentEndingDateAndTime"
                defaultValue={itemDetails?.assignmentEndingDateAndTime}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Save</p>
              <input
                name="save"
                type="text"
                defaultValue={itemDetails?.save}
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

export default AssignmentDetails;
