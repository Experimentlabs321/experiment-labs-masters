//SkillsImprovementEngineDetails

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SkillsImprovementEngineDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getSkillsManagementSubDetailsByOrganizationAndName/skillsImprovementEngine/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getSkillsManagementSubDetailsByOrganizationAndName/skillsImprovementEngine/organizationsId/${userInfo?.organizationId}`
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
    const newCourseSelectionName = form.courseSelection?.value;
    const newSelectCategoriesName = form.selectCategories?.value;
    const newSkillCategoryName = form.skillCategory?.value;
    const newSoftSkillsName = form.softSkills?.value;
    const newSkillNameName = form.skillName?.value;
    const newStudentName = form.student?.value;
    const newParentName = form.parent?.value;
    const newCounselorName = form.counselor?.value;
    const newOthersName = form.others?.value;
    const newSelectAllName = form.selectAll?.value;
    const newSkillParametersName = form.skillParameters?.value;
    const newProceedName = form.proceed?.value;

    const itemDetail = {
      skillsManagement: newSkillsManagementName,
      search: newSearchName,
      courseSelection: newCourseSelectionName,
      selectCategories: newSelectCategoriesName,
      skillCategory: newSkillCategoryName,
      softSkills: newSoftSkillsName,
      skillName: newSkillNameName,
      student: newStudentName,
      parent: newParentName,
      counselor: newCounselorName,
      others: newOthersName,
      selectAll: newSelectAllName,
      skillParameters: newSkillParametersName,
      proceed: newProceedName,
    };
    // console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addSkillsManagementSubDetails/skillsImprovementEngine/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    // console.log(item)
    if (item?.data === "Skills Management SubDetails updated successfully") {
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
              <p className="text-lg font-medium">Skills Management</p>
              <input
                name="skillsManagement"
                defaultValue={itemDetails?.skillsManagement}
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
              <p className="text-lg font-medium">Course Selection</p>
              <input
                name="courseSelection"
                defaultValue={itemDetails?.courseSelection}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Select Categories</p>
              <input
                name="selectCategories"
                defaultValue={itemDetails?.selectCategories}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Skill Category</p>
              <input
                name="skillCategory"
                defaultValue={itemDetails?.skillCategory}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Soft Skills</p>
              <input
                name="softSkills"
                defaultValue={itemDetails?.softSkills}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Skill Name</p>
              <input
                name="skillName"
                defaultValue={itemDetails?.skillName}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Student</p>
              <input
                name="student"
                defaultValue={itemDetails?.student}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Parent</p>
              <input
                name="parent"
                defaultValue={itemDetails?.parent}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Counselor</p>
              <input
                name="counselor"
                defaultValue={itemDetails?.counselor}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Others</p>
              <input
                name="others"
                defaultValue={itemDetails?.others}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Select All</p>
              <input
                name="selectAll"
                defaultValue={itemDetails?.selectAll}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Skill Parameters</p>
              <input
                name="skillParameters"
                defaultValue={itemDetails?.skillParameters}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Proceed</p>
              <input
                name="proceed"
                defaultValue={itemDetails?.proceed}
                type="text"
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

export default SkillsImprovementEngineDetails;
