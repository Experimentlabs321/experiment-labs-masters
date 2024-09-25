//AdminContentManagementDetails

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const AdminContentManagementDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/contentManagement/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/contentManagement/organizationsId/${userInfo?.organizationId}`
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

    const newMyCoursesName = form.myCourses?.value;
    const newCreateNewBundleName = form.createNewBundle?.value;
    const newCreateNewCourseName = form.createNewCourse?.value;
    const newAllCoursesName = form.allCourses?.value;
    const newSortByName = form.sortBy?.value;
    const newCategoryName = form.category?.value;
    const newShowBundlesName = form.showBundles?.value;
    const newSearchName = form.search?.value;
    const newEditCourseDetailsName = form.editCourseDetails?.value;
    const newEditCourseContentsName = form.editCourseContents?.value;
    const newUnpublishedName = form.unpublished?.value;

    const itemDetails = {
      myCourses: newMyCoursesName,
      createNewBundle: newCreateNewBundleName,
      createNewCourse: newCreateNewCourseName,
      allCourses: newAllCoursesName,
      sortBy: newSortByName,
      category: newCategoryName,
      showBundles: newShowBundlesName,
      search: newSearchName,
      editCourseDetails: newEditCourseDetailsName,
      editCourseContents: newEditCourseContentsName,
      unpublished: newUnpublishedName,
    };
    // console.log(itemDetails)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addNavItemsDetails/contentManagement/organizationId/${userInfo?.organizationId}`,
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
              <p className="text-lg font-medium">My courses</p>
              <input
                name="myCourses"
                type="text"
                defaultValue={itemDetails?.myCourses}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Create new bundle</p>
              <input
                name="createNewBundle"
                type="text"
                defaultValue={itemDetails?.createNewBundle}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Create new course</p>
              <input
                name="createNewCourse"
                type="text"
                defaultValue={itemDetails?.createNewCourse}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">All Courses</p>
              <input
                name="allCourses"
                type="text"
                defaultValue={itemDetails?.allCourses}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Sort By</p>
              <input
                name="sortBy"
                type="text"
                defaultValue={itemDetails?.sortBy}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Category</p>
              <input
                name="category"
                type="text"
                defaultValue={itemDetails?.category}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Show Bundles</p>
              <input
                name="showBundles"
                type="text"
                defaultValue={itemDetails?.showBundles}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Search</p>
              <input
                name="search"
                type="text"
                defaultValue={itemDetails?.search}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Edit Course Details</p>
              <input
                name="editCourseDetails"
                type="text"
                defaultValue={itemDetails?.editCourseDetails}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Edit Course Contents</p>
              <input
                name="editCourseContents"
                type="text"
                defaultValue={itemDetails?.editCourseContents}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] ">
              <p className="text-lg font-medium">Unpublished</p>
              <input
                name="unpublished"
                type="text"
                defaultValue={itemDetails?.unpublished}
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

export default AdminContentManagementDetails;
