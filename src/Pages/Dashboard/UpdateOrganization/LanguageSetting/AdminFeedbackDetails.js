//AdminFeedbackDetails

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const AdminFeedbackDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/feedback/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/feedback/organizationsId/${userInfo?.organizationId}`
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

    const newFeedbackName = form.feedback?.value;
    const newSearchName = form.search?.value;
    const newLiveClassFeedbackName = form.liveClassFeedback?.value;
    const newFeedbackSettingsName = form.feedbackSettings?.value;

    const itemDetails = {
      feedback: newFeedbackName,
      search: newSearchName,
      liveClassFeedback: newLiveClassFeedbackName,
      feedbackSettings: newFeedbackSettingsName,
    };
    // console.log(itemDetails)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addNavItemsDetails/feedback/organizationId/${userInfo?.organizationId}`,
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
              <p className="text-lg font-medium">Feedback</p>
              <input
                name="feedback"
                defaultValue={itemDetails?.feedback}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Search</p>
              <input
                name="search"
                defaultValue={itemDetails?.search}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Live Class Feedback</p>
              <input
                name="liveClassFeedback"
                defaultValue={itemDetails?.liveClassFeedback}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Feedback Settings</p>
              <input
                name="feedbackSettings"
                defaultValue={itemDetails?.feedbackSettings}
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

export default AdminFeedbackDetails;
