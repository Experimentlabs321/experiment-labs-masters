//AdminSkillsManagementDetails

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const AdminSkillsManagementDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/skillsManagement/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/skillsManagement/organizationsId/${userInfo?.organizationId}`
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

    const newSkillsManagementName = form.skillsManagement?.value;
    const newSearchName = form.search?.value;
    const newShowSkillsManagementName = form.showSkillsManagement?.value;
    const newSkillsCreationsName = form.skillsCreations?.value;
    const newSkillsImprovementEngineName = form.skillsImprovementEngine?.value;
    const removeSkillsManagement = form.removeSkillsManagement?.value;
    const visibilityOfSkillsManagementEditedSuccessfully =
      form.visibilityOfSkillsManagementEditedSuccessfully?.value;

    const itemDetails = {
      skillsManagement: newSkillsManagementName,
      search: newSearchName,
      showSkillsManagement: newShowSkillsManagementName,
      skillsCreations: newSkillsCreationsName,
      skillsImprovementEngine: newSkillsImprovementEngineName,
      removeSkillsManagement: removeSkillsManagement,
      visibilityOfSkillsManagementEditedSuccessfully:
        visibilityOfSkillsManagementEditedSuccessfully,
    };
    // console.log(itemDetails)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addNavItemsDetails/skillsManagement/organizationId/${userInfo?.organizationId}`,
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
              <p className="text-lg font-medium">Skills Management</p>
              <input
                name="skillsManagement"
                defaultValue={itemDetails?.skillsManagement}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>

            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Search</p>
              <input
                name="search"
                defaultValue={itemDetails?.search}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Show Skills Management</p>
              <input
                name="showSkillsManagement"
                defaultValue={itemDetails?.showSkillsManagement}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Remove Skills Management</p>
              <input
                name="removeSkillsManagement"
                defaultValue={itemDetails?.removeSkillsManagement}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Skills Creations</p>
              <input
                name="skillsCreations"
                type="text"
                defaultValue={itemDetails?.skillsCreations}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Skills Improvement Engine</p>
              <input
                name="skillsImprovementEngine"
                defaultValue={itemDetails?.skillsImprovementEngine}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">
                Visibility of skills management edited successfully
              </p>
              <input
                name="visibilityOfSkillsManagementEditedSuccessfully"
                defaultValue={
                  itemDetails?.visibilityOfSkillsManagementEditedSuccessfully
                }
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

export default AdminSkillsManagementDetails;
