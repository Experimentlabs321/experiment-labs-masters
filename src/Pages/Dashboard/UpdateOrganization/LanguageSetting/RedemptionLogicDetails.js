//RedemptionLogicDetails

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const RedemptionLogicDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getPointsAndRedemptionsSubDetailsByOrganizationAndName/redemptionLogic/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getPointsAndRedemptionsSubDetailsByOrganizationAndName/redemptionLogic/organizationsId/${userInfo?.organizationId}`
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

    const newRedemptionLogicsName = form.redemptionLogics?.value;
    const newSearchName = form.search?.value;
    const newSelectCourseName = form.selectCourse?.value;

    const newRedemptionCategoryName = form.redemptionCategory?.value;
    const newEditCategoryNameName = form.editCategoryName?.value;
    const newDeleteCategoryName = form.deleteCategory?.value;
    const newCategoryNameName = form.categoryName?.value;
    const newUpdateName = form.update?.value;
    const newAreYouSureName = form.areYouSure?.value;
    const newOnceDeletedTheCategoryWillNotRecoverName =
      form.onceDeletedTheCategoryWillNotRecover?.value;
    const newDeleteName = form.delete?.value;
    const newCancelName = form.cancel?.value;
    const newAddDetailsName = form.addDetails?.value;
    const newEditItemName = form.editItem?.value;
    const newDeleteItemName = form.deleteItem?.value;
    const newUploadIconName = form.uploadIcon?.value;
    const newBrowserName = form.browser?.value;
    const newDescriptionName = form.description?.value;

    const newRedemptionItemNameName = form.redemptionItemName?.value;
    const newRedemptionValueName = form.redemptionValue?.value;
    const newExternalName = form.external?.value;
    const newInternalName = form.internal?.value;
    const newRedemptionLevelName = form.redemptionLevel?.value;
    const newWeekOneName = form.weekOne?.value;
    const newWeekTwoUpdateName = form.weekTwoUpdate?.value;
    const newWeekTwoName = form.weekTwo?.value;
    const newWeekFourUpdateName = form.weekFourUpdate.value;
    const newRedemptionLinkName = form.redemptionLink.value;
    const newItemValueName = form.itemValue.value;
    const newMinimumValueName = form.minimumValue.value;
    const newProceedName = form.proceed?.value;
    const onceDeletedTheItemWillNotRecover =
      form.onceDeletedTheItemWillNotRecover?.value;
    const itemDeletedSuccessfully = form.itemDeletedSuccessfully?.value;
    const noCourseAddedYet = form.noCourseAddedYet?.value;
    const pleaseCreateACourseFirst = form.pleaseCreateACourseFirst?.value;
    const categoryAddedSuccessfully = form.categoryAddedSuccessfully?.value;
    const categoryAlreadyExist = form.categoryAlreadyExist?.value;
    const pleaseEnterAnUniqueCategoryName =
      form.pleaseEnterAnUniqueCategoryName?.value;
    const categoryDeletedSuccessfully = form.categoryDeletedSuccessfully?.value;
    const pleaseAddCategory = form.pleaseAddCategory?.value;
    const pleaseAddAtLeastOneCategory = form.pleaseAddAtLeastOneCategory?.value;
    const theItemNameIsAlreadyExist = form.theItemNameIsAlreadyExist?.value;
    const itemAddedSuccessfully = form.itemAddedSuccessfully?.value;
    const itemUpdatedSuccessfully = form.itemUpdatedSuccessfully?.value;
    const itemAlreadyExist = form.itemAlreadyExist?.value;
    const pleaseEnterAnUniqueItemName = form.pleaseEnterAnUniqueItemName?.value;

    const itemDetail = {
      redemptionLogics: newRedemptionLogicsName,
      search: newSearchName,
      selectCourse: newSelectCourseName,

      redemptionCategory: newRedemptionCategoryName,
      editCategoryName: newEditCategoryNameName,
      deleteCategory: newDeleteCategoryName,
      categoryName: newCategoryNameName,
      update: newUpdateName,
      areYouSure: newAreYouSureName,
      onceDeletedTheCategoryWillNotRecover:
        newOnceDeletedTheCategoryWillNotRecoverName,
      delete: newDeleteName,
      cancel: newCancelName,
      addDetails: newAddDetailsName,
      editItem: newEditItemName,
      deleteItem: newDeleteItemName,
      uploadIcon: newUploadIconName,
      browser: newBrowserName,
      description: newDescriptionName,

      redemptionItemName: newRedemptionItemNameName,
      redemptionValue: newRedemptionValueName,
      external: newExternalName,
      internal: newInternalName,
      redemptionLevel: newRedemptionLevelName,
      weekOne: newWeekOneName,
      weekTwoUpdate: newWeekTwoUpdateName,
      weekTwo: newWeekTwoName,
      weekFourUpdate: newWeekFourUpdateName,
      redemptionLink: newRedemptionLinkName,
      itemValue: newItemValueName,
      minimumValue: newMinimumValueName,
      proceed: newProceedName,
      onceDeletedTheItemWillNotRecover: onceDeletedTheItemWillNotRecover,
      itemDeletedSuccessfully: itemDeletedSuccessfully,
      noCourseAddedYet: noCourseAddedYet,
      pleaseCreateACourseFirst: pleaseCreateACourseFirst,
      categoryAddedSuccessfully: categoryAddedSuccessfully,
      categoryAlreadyExist: categoryAlreadyExist,
      pleaseEnterAnUniqueCategoryName: pleaseEnterAnUniqueCategoryName,
      categoryDeletedSuccessfully: categoryDeletedSuccessfully,
      pleaseAddCategory: pleaseAddCategory,
      pleaseAddAtLeastOneCategory: pleaseAddAtLeastOneCategory,
      theItemNameIsAlreadyExist: theItemNameIsAlreadyExist,
      itemAddedSuccessfully: itemAddedSuccessfully,
      itemUpdatedSuccessfully: itemUpdatedSuccessfully,
      itemAlreadyExist: itemAlreadyExist,
      pleaseEnterAnUniqueItemName: pleaseEnterAnUniqueItemName,
    };
    // console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addPointsAndRedemptionsSubDetails/redemptionLogic/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    // console.log(item)
    if (
      item?.data === "Points And RedemptionsSubDetails updated successfully"
    ) {
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
              <p className="text-lg font-medium">Redemption Logics</p>
              <input
                name="redemptionLogics"
                defaultValue={itemDetails?.redemptionLogics}
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
              <p className="text-lg font-medium">Redemption Category</p>
              <input
                name="redemptionCategory"
                defaultValue={itemDetails?.redemptionCategory}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Edit Category Name</p>
              <input
                name="editCategoryName"
                defaultValue={itemDetails?.editCategoryName}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Delete Category</p>
              <input
                name="deleteCategory"
                defaultValue={itemDetails?.deleteCategory}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Category Name</p>
              <input
                name="categoryName"
                defaultValue={itemDetails?.categoryName}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Update</p>
              <input
                name="update"
                defaultValue={itemDetails?.update}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Are you sure</p>
              <input
                name="areYouSure"
                defaultValue={itemDetails?.areYouSure}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Once deleted, the category will not recover
              </p>
              <input
                name="onceDeletedTheCategoryWillNotRecover"
                defaultValue={itemDetails?.onceDeletedTheCategoryWillNotRecover}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Delete</p>
              <input
                name="delete"
                defaultValue={itemDetails?.delete}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Cancel</p>
              <input
                name="cancel"
                defaultValue={itemDetails?.cancel}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Add Details</p>
              <input
                name="addDetails"
                defaultValue={itemDetails?.addDetails}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Edit Item</p>
              <input
                name="editItem"
                defaultValue={itemDetails?.editItem}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Delete Item</p>
              <input
                name="deleteItem"
                defaultValue={itemDetails?.deleteItem}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Upload Icon</p>
              <input
                name="uploadIcon"
                defaultValue={itemDetails?.uploadIcon}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Browser</p>
              <input
                name="browser"
                defaultValue={itemDetails?.browser}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Description</p>
              <input
                name="description"
                defaultValue={itemDetails?.description}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>

            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Redemption Item Name</p>
              <input
                name="redemptionItemName"
                defaultValue={itemDetails?.redemptionItemName}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Redemption Value</p>
              <input
                name="redemptionValue"
                defaultValue={itemDetails?.redemptionValue}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">External</p>
              <input
                name="external"
                defaultValue={itemDetails?.external}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Internal</p>
              <input
                name="internal"
                defaultValue={itemDetails?.internal}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Redemption Level</p>
              <input
                name="redemptionLevel"
                defaultValue={itemDetails?.redemptionLevel}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Week 1 </p>
              <input
                name="weekOne"
                defaultValue={itemDetails?.weekOne}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Week 2 update</p>
              <input
                name="weekTwoUpdate"
                defaultValue={itemDetails?.weekTwoUpdate}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Week 2 </p>
              <input
                name="weekTwo"
                defaultValue={itemDetails?.weekTwo}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Week 4 update</p>
              <input
                name="weekFourUpdate"
                defaultValue={itemDetails?.weekFourUpdate}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Redemption Link</p>
              <input
                name="redemptionLink"
                defaultValue={itemDetails?.redemptionLink}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Item Value</p>
              <input
                name="itemValue"
                defaultValue={itemDetails?.itemValue}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Minimum Value</p>
              <input
                name="minimumValue"
                defaultValue={itemDetails?.minimumValue}
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
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Once deleted, the item will not recover!
              </p>
              <input
                name="onceDeletedTheItemWillNotRecover"
                defaultValue={itemDetails?.onceDeletedTheItemWillNotRecover}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Item Deleted Successfully!</p>
              <input
                name="itemDeletedSuccessfully"
                defaultValue={itemDetails?.itemDeletedSuccessfully}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">No course added yet!</p>
              <input
                name="noCourseAddedYet"
                defaultValue={itemDetails?.noCourseAddedYet}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Please create a course first!
              </p>
              <input
                name="pleaseCreateACourseFirst"
                defaultValue={itemDetails?.pleaseCreateACourseFirst}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Category added Successfully</p>
              <input
                name="categoryAddedSuccessfully"
                defaultValue={itemDetails?.categoryAddedSuccessfully}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Category already exist!</p>
              <input
                name="categoryAlreadyExist"
                defaultValue={itemDetails?.categoryAlreadyExist}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Please enter an unique category name!
              </p>
              <input
                name="pleaseEnterAnUniqueCategoryName"
                defaultValue={itemDetails?.pleaseEnterAnUniqueCategoryName}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Category Deleted Successfully!
              </p>
              <input
                name="categoryDeletedSuccessfully"
                defaultValue={itemDetails?.categoryDeletedSuccessfully}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Please Add Category</p>
              <input
                name="pleaseAddCategory"
                defaultValue={itemDetails?.pleaseAddCategory}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Please add at least one category!
              </p>
              <input
                name="pleaseAddAtLeastOneCategory"
                defaultValue={itemDetails?.pleaseAddAtLeastOneCategory}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                The item name is already exist!
              </p>
              <input
                name="theItemNameIsAlreadyExist"
                defaultValue={itemDetails?.theItemNameIsAlreadyExist}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Item added Successfully</p>
              <input
                name="itemAddedSuccessfully"
                defaultValue={itemDetails?.itemAddedSuccessfully}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Item Updated Successfully</p>
              <input
                name="itemUpdatedSuccessfully"
                defaultValue={itemDetails?.itemUpdatedSuccessfully}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Item already exist</p>
              <input
                name="itemAlreadyExist"
                defaultValue={itemDetails?.itemAlreadyExist}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Please enter an unique item name!
              </p>
              <input
                name="pleaseEnterAnUniqueItemName"
                defaultValue={itemDetails?.pleaseEnterAnUniqueItemName}
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

export default RedemptionLogicDetails;
