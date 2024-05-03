//EditRedemptionItemForm

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import axios from "axios";
import uploadFileToS3 from "../../../UploadComponent/s3Uploader";

const EditRedemptionItemForm = ({
  selectedRedemptionLogic,
  setIsOpenRedemptionItemEditForm,
  setIsOpenRedemptionItemAddForm,
  UploadingImg,
  selectedRedemptionCategory,
  redemptionCategories,
  setSelectedRedemptionCategory,
  setRedemptionCategories,
  selectedCourse,
  userInfo,
  courseId,
  itemDetails
}) => {
  console.log(selectedRedemptionLogic);
  const [itemValue, setItemValue] = useState(
    parseInt(selectedRedemptionLogic?.itemValue)
  );
  const [minimumValue, setMinimumValue] = useState(
    parseInt(selectedRedemptionLogic?.minimumValue)
  );
  const [selectedIcon, setSelectedIcon] = useState(
    selectedRedemptionLogic?.selectedIcon
  );
  const [course, setCourse] = useState();
  const [selectedRedemptionOption, setSelectedRedemptionOption] = useState(
    selectedRedemptionLogic?.redemptionValue
  );
  const handleRedemptionOptionChange = (event) => {
    setSelectedRedemptionOption(event.target.value);
  };
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(selectedIcon);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/weeks/courseId/${courseId}`
      )
      .then((response) => {
        setCourse(response?.data);
      })
      .catch((error) => console.error(error));
  }, [courseId]);
  console.log(course);

  const handleEditRedemptionItem = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (selectedFile) fileUrl = await uploadFileToS3(selectedFile);
    const data = {
      organizationId: userInfo?.organizationId,
      categoryName: event?.target?.redemptionCategory?.value,
      courseId: selectedCourse?._id,
      oldItemName: selectedRedemptionLogic?.redemptionItemName,
      redemptionItem: {
        redemptionItemName: event?.target?.redemptionItemName?.value,
        redemptionValue: selectedRedemptionOption,
        itemValue: event?.target?.itemValue?.value,
        minimumValue: event?.target?.minimumValue?.value,
        redemptionLevel: event?.target?.redemptionLevel?.value,
        redemptionLink: event?.target?.redemptionLink?.value,
        selectedIcon: fileUrl,
        description: event?.target?.description?.value,
      },
    };
    console.log(data);
    if (data?.categoryName === selectedRedemptionCategory?.categoryName) {
      // if (
      //   selectedredemptionCategory?.earningItems?.find(
      //     (item) =>
      //       item?.redemptionItemName === event?.target?.redemptionItemName?.value
      //   )
      // ) {
      //   setIsOpenRedemptionItemEditForm(false);
      //   Swal.fire({
      //     icon: "error",
      //     title: "Item already exist!",
      //     text: "Please enter an unique item name!",
      //   });
      //   return;
      // }
      const updatedItem = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/editRedemptionItem`,
        data
      );

      if (updatedItem?.data?.acknowledged) {
        toast.success(itemDetails?.itemUpdatedSuccessfully ? itemDetails?.itemUpdatedSuccessfully : "Item Updated Successfully");
        const updateItemsArray = [
          ...selectedRedemptionCategory?.redemptionItems,
        ];
        const selectedRedemptionLogicIndex = updateItemsArray?.findIndex(
          (item) =>
            item?.redemptionItemName ===
            selectedRedemptionLogic?.redemptionItemName
        );
        updateItemsArray[selectedRedemptionLogicIndex] = data?.redemptionItem;
        const updatedCategoriesArray = [...redemptionCategories];
        const selectedIndex = updatedCategoriesArray.findIndex(
          (category) =>
            category.categoryName === selectedRedemptionCategory.categoryName
        );
        updatedCategoriesArray[selectedIndex].redemptionItems =
          updateItemsArray;
        setRedemptionCategories(updatedCategoriesArray);
        setSelectedRedemptionCategory(updatedCategoriesArray[selectedIndex]);
        setIsOpenRedemptionItemEditForm(false);
        event.target.reset();
      }
    } else {
      let currentCategory = redemptionCategories?.find(
        (item) => item?.categoryName === data?.categoryName
      );
      if (
        currentCategory?.redemptionItems?.find(
          (item) =>
            item?.redemptionItemName ===
            event?.target?.redemptionItemName?.value
        )
      ) {
        setIsOpenRedemptionItemEditForm(false);
        Swal.fire({
          icon: "error",
          title:itemDetails?.itemAlreadyExist ? itemDetails?.itemAlreadyExist : "Item already exist!",
          text: itemDetails?.pleaseEnterAnUniqueItemName ? itemDetails?.pleaseEnterAnUniqueItemName :"Please enter an unique item name!",
        });
        return;
      }
      const newItem = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/redemptionItems`,
        {
          organizationId: userInfo?.organizationId,
          categoryName: currentCategory?.categoryName,
          courseId: selectedCourse?._id,
          redemptionItem: {
            redemptionItemName: event?.target?.redemptionItemName?.value,
            redemptionValue: selectedRedemptionOption,
            itemValue: event?.target?.itemValue?.value,
            minimumValue: event?.target?.minimumValue?.value,
            redemptionLevel: event?.target?.redemptionLevel?.value,
            redemptionLink: event?.target?.redemptionLink?.value,
            description: event?.target?.description?.value,
            selectedIcon,
          },
        }
      );
      if (newItem?.data?.acknowledged) {
        fetch(`${process.env.REACT_APP_BACKEND_API}/deleteRedemptionItem`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organizationId: userInfo?.organizationId,
            categoryName: selectedRedemptionCategory?.categoryName,
            courseId: selectedCourse?._id,
            redemptionItemName: selectedRedemptionLogic?.redemptionItemName,
          }),
        })
          .then((result) => {
            if (result?.ok) {
              const remainingItems =
                selectedRedemptionCategory?.redemptionItems?.filter(
                  (item) =>
                    item?.redemptionItemName !==
                    selectedRedemptionLogic?.redemptionItemName
                );
              setSelectedRedemptionCategory({
                categoryName: selectedRedemptionCategory?.categoryName,
                redemptionItems: remainingItems,
              });
              const selectedCategoryItems = currentCategory?.redemptionItems
                ? [
                    ...currentCategory?.redemptionItems,
                    {
                      redemptionItemName:
                        event?.target?.redemptionItemName?.value,
                      redemptionValue: selectedRedemptionOption,
                      itemValue: event?.target?.itemValue?.value,
                      minimumValue: event?.target?.minimumValue?.value,
                      redemptionLevel: event?.target?.redemptionLevel?.value,
                      redemptionLink: event?.target?.redemptionLink?.value,
                      description: event?.target?.description?.value,
                      selectedIcon,
                    },
                  ]
                : [
                    {
                      redemptionItemName:
                        event?.target?.redemptionItemName?.value,
                      redemptionValue: selectedRedemptionOption,
                      itemValue: event?.target?.itemValue?.value,
                      minimumValue: event?.target?.minimumValue?.value,
                      redemptionLevel: event?.target?.redemptionLevel?.value,
                      redemptionLink: event?.target?.redemptionLink?.value,
                      description: event?.target?.description?.value,
                      selectedIcon,
                    },
                  ];
              setSelectedRedemptionCategory({
                categoryName: currentCategory?.categoryName,
                redemptionItems: selectedCategoryItems,
              });
              const otherCategories = redemptionCategories?.filter(
                (item) => currentCategory?.categoryName !== item?.categoryName
              );
              setRedemptionCategories([
                {
                  categoryName: currentCategory?.categoryName,
                  redemptionItems: selectedCategoryItems,
                },
                ...otherCategories,
              ]);
              setIsOpenRedemptionItemEditForm(false);
              event.target.reset();
              toast.success(itemDetails?.itemUpdatedSuccessfully ? itemDetails?.itemUpdatedSuccessfully :"Item Updated Successfully!");
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            // Handle error, display a message to the user, etc.
          });
      }
    }
  };
  return (
    <>
      <div className="px-4 my-[40px]">
        <div className=" border-[#B7B7B7] relative border p-8 rounded-lg ">
          <div className="absolute top-2 right-2 ">
            <button
              onClick={() => setIsOpenRedemptionItemEditForm(false)}
              className="flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]"
            >
              x
            </button>
          </div>
          <form onSubmit={handleEditRedemptionItem} className="w-full">
            <div className="flex">
              <div>
                <div
                  style={{
                    backgroundImage: `url(${UploadingImg})`,
                    background: `linear-gradient(0deg, rgba(46, 176, 251, 0.20) 0%, rgba(46, 176, 251, 0.20) 100%), lightgray 50% / cover no-repeat`,
                  }}
                  className="h-[170px] w-[170px] flex flex-col justify-center items-center mt-2 rounded-lg"
                >
                  <img
                    className="h-[170px] w-[170px] rounded-lg"
                    src={UploadingImg}
                    alt="UploadingImg"
                  />
                  <p className="mt-[-60px] text-base font-semibold text-[#fff] mb-4">
                    {itemDetails?.uploadIcon ? itemDetails?.uploadIcon :"Upload Icon"}
                    
                  </p>

                  <label
                    className="mt-[-16px] flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold"
                    htmlFor="input-file-upload"
                  >
                    
                    {itemDetails?.browser ? itemDetails?.browser :"Browser"}
                    
                  </label>
                  <input
                    className="w-[1%]"
                    style={{ fontSize: "0", opacity: "0" }}
                    type="file"
                    accept="image/*"
                    name="input-file-upload"
                    id="input-file-upload"
                    onChange={handleFileChange}
                    multiple
                  />
                </div>
                <textarea
                  className="mt-5 border rounded-lg h-[100px] ps-2  text-[#000000] focus:outline-0 "
                  defaultValue={selectedRedemptionLogic?.description}
                  id="description"
                  name="description"
                  rows="5"
                  cols="18"
                />
              </div>

              <div className="w-full pl-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 mt-2 sm:grid-cols-2 w-full">
                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                    {itemDetails?.redemptionCategory ? itemDetails?.redemptionCategory :"Redemption Category"}
                      
                    </label>
                    <select
                      defaultValue={selectedRedemptionCategory?.categoryName}
                      name="redemptionCategory"
                      id="redemptionCategory"
                      className="block w-full px-2 py-2 mt-2 bg-white rounded-md border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option value={selectedRedemptionCategory?.categoryName}>
                        {selectedRedemptionCategory?.categoryName}
                      </option>
                      {redemptionCategories?.map((redemptionCategory) => (
                        <>
                          {redemptionCategory?.categoryName !==
                            selectedRedemptionCategory?.categoryName && (
                            <option value={redemptionCategory?.categoryName}>
                              {redemptionCategory?.categoryName}
                            </option>
                          )}
                        </>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                    {itemDetails?.redemptionItemName ? itemDetails?.redemptionItemName :"Redemption Item Name"}
                      
                    </label>
                    <input
                      id="redemptionItemName"
                      name="redemptionItemName"
                      placeholder="Earning Point Item"
                      defaultValue={selectedRedemptionLogic?.redemptionItemName}
                      className="block w-full p-2 mt-2 rounded-md bg-white border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div className=" flex flex-col justify-center ">
                    <p className="font-semibold text-[#000000]  py-2">
                    {itemDetails?.redemptionValue ? itemDetails?.redemptionValue :"Redemption Value"}
                      
                    </p>
                    <div className=" flex gap-7 items-center  h-[40px]   text-[#535353] ">
                      <div>
                        <input
                          id="draft"
                          className="peer/draft me-2 "
                          type="radio"
                          name="status"
                          value="External"
                          checked={selectedRedemptionOption === "External"}
                          onChange={handleRedemptionOptionChange}
                        />
                        <label
                          for="draft"
                          className="peer-checked/draft: font-normal"
                        >
                          {itemDetails?.external ? itemDetails?.external :"External"}
                          
                        </label>
                      </div>

                      <div>
                        <input
                          id="published"
                          class="peer/published me-2"
                          type="radio"
                          name="status"
                          value="Internal"
                          checked={selectedRedemptionOption === "Internal"}
                          onChange={handleRedemptionOptionChange}
                        />
                        <label
                          for="published"
                          class="peer-checked/published: font-normal"
                        >
                          {itemDetails?.internal ? itemDetails?.internal :"Internal"}
                          
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className=" ">
                    <p className="font-semibold text-[#000000]  py-2">
                    {itemDetails?.redemptionLevel ? itemDetails?.redemptionLevel :"Redemption Level"}
                      
                    </p>
                    <div className="   w-[100%]  text-[#535353] ">
                      <select
                        required
                        className="block w-full px-2 py-2 mt-2 bg-white rounded-md border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                        name="redemptionLevel"
                        id="redemptionLevel"
                      >
                        {course?.map((week) => (
                          <option defaultValue={week?.weekName}>
                            {" "}
                            {week?.weekName}
                          </option>
                        ))}

                        {/*  <option value="Student">Week 1</option>
                                                <option value="Parent"></option>
                                                <option value="Counselor"></option>
                                                <option value="Others"></option> */}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                    {itemDetails?.redemptionLink ? itemDetails?.redemptionLink :"Redemption Link"}
                      
                    </label>
                    <input
                      id="redemptionLink"
                      name="redemptionLink"
                      defaultValue={selectedRedemptionLogic?.redemptionLink}
                      className="block w-full p-2 mt-2 rounded-md bg-white border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div className="flex flex-col gap-10 mt-5">
                    <div className="flex justify-between  items-center ">
                      <p className="font-bold text-base me-5">
                      {itemDetails?.itemValue ? itemDetails?.itemValue :"Item Value"}
                        </p>
                      <div className="text-[18px] w-[40%]  h-[40px] flex  ">
                        <button
                          type="button"
                          style={{
                            boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)",
                          }}
                          className=" border w-[50%] text-[#000000] rounded-s-full text-center"
                          onClick={() => setItemValue(itemValue - 1)}
                        >
                          -
                        </button>
                        <input
                          value={itemValue}
                          onChange={(e) =>
                            setItemValue(parseInt(e.target.value))
                          }
                          className="w-[60%] focus:outline-none flex justify-center items-center text-center font-sans"
                          type="number"
                          name="itemValue"
                          id="itemValue"
                        />
                        <button
                          type="button"
                          style={{
                            boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)",
                          }}
                          className="border w-[50%] text-[#000000] rounded-e-full text-center"
                          onClick={() => setItemValue(itemValue + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center ">
                      <p className="font-bold text-base me-5">
                      {itemDetails?.minimumValue ? itemDetails?.minimumValue :"Minimum Value"}
                        </p>
                      <div className="text-[18px] w-[40%]  h-[40px] flex  ">
                        <button
                          type="button"
                          style={{
                            boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)",
                          }}
                          className=" border w-[50%] text-[#000000] rounded-s-full text-center"
                          onClick={() => setMinimumValue(minimumValue - 1)}
                        >
                          -
                        </button>
                        <input
                          value={minimumValue}
                          onChange={(e) =>
                            setMinimumValue(parseInt(e.target.value))
                          }
                          className="w-[60%] focus:outline-none flex justify-center items-center text-center font-sans"
                          type="number"
                          name="minimumValue"
                          id="minimumValue"
                        />
                        <button
                          type="button"
                          style={{
                            boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)",
                          }}
                          className="border w-[50%] text-[#000000] rounded-e-full text-center"
                          onClick={() => setMinimumValue(minimumValue + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mt-5  ">
                  <input
                    type="submit"
                    value="Update"
                    className="bg-[#2EB0FB] cursor-pointer rounded-lg p-2 font-semibold text-[#fff]"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-[#001E75] flex justify-center items-center h-[40px] mx-5 rounded-b-3xl mb-5"></div>
      </div>
    </>
  );
};

export default EditRedemptionItemForm;
