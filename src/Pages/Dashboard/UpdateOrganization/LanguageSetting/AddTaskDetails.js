//AddTaskDetails

import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider";

const AddTaskDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/addTask/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getContentManageSubDetailsByOrganizationAndName/addTask/organizationsId/${userInfo?.organizationId}`
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

    const newAddTaskName = form.addTask?.value;
    const newClassesName = form.classes?.value;
    const newAssignmentName = form.assignment?.value;
    const newReadingName = form.reading?.value;
    const newQuizName = form.quiz?.value;
    const newLiveTestName = form.liveTest?.value;
    const newVideoName = form.video?.value;
    const newAudioName = form.audio?.value;
    const newFilesName = form.files?.value;
    const newScheduleName = form.schedule?.value;

    const itemDetail = {
      addTask: newAddTaskName,
      classes: newClassesName,
      assignment: newAssignmentName,
      reading: newReadingName,
      quiz: newQuizName,
      liveTest: newLiveTestName,
      video: newVideoName,
      audio: newAudioName,
      files: newFilesName,
      schedule: newScheduleName,
    };
    // console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addContentManageSubDetails/addTask/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    // console.log(item)
    if (item?.data === "Content Manage Sub Details updated successfully") {
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
              <p className="text-lg font-medium">Add Task</p>
              <input
                name="addTask"
                defaultValue={itemDetails?.addTask}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Classes</p>
              <input
                name="classes"
                type="text"
                defaultValue={itemDetails?.classes}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Assignment</p>
              <input
                name="assignment"
                type="text"
                defaultValue={itemDetails?.assignment}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Reading</p>
              <input
                name="reading"
                type="text"
                defaultValue={itemDetails?.reading}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Quiz</p>
              <input
                name="quiz"
                type="text"
                defaultValue={itemDetails?.quiz}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Live Test</p>
              <input
                name="liveTest"
                type="text"
                defaultValue={itemDetails?.liveTest}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Video</p>
              <input
                name="video"
                type="text"
                defaultValue={itemDetails?.video}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Audio</p>
              <input
                name="audio"
                type="text"
                defaultValue={itemDetails?.audio}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Files</p>
              <input
                name="files"
                type="text"
                defaultValue={itemDetails?.files}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Schedule</p>
              <input
                name="schedule"
                type="text"
                defaultValue={itemDetails?.schedule}
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

export default AddTaskDetails;
