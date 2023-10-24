//EditFeedbackItemForm

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import axios from "axios";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";

const EditFeedbackItemForm = ({
  selectedFeedback,
  setIsOpenFeedbackItemEditForm,
  setIsOpenRedemptionItemAddForm,
  UploadingImg,
  selectedFeedbackCategory,
  feedbackCategories,
  setSelectedFeedbackCategory,
  setFeedbackCategories,
  selectedCourse,
  userInfo,
  courseId,
}) => {
  console.log(selectedFeedback);

  const [selectedIcon, setSelectedIcon] = useState(
    selectedFeedback?.selectedIcon
  );
  const [course, setCourse] = useState();
  const [selectedRatingOption, setSelectedRatingOption] = useState(
    selectedFeedback?.itemRating
  );
  const [selectedAccessOptions, setSelectedAccessOptions] = useState(
    selectedFeedback?.giveAccess
  );
  /*  const [selectedAccessOption, setSelectedAccessOption] = useState(
        selectedFeedback?.giveAccess
    ); */

  const handleRatingOptionChange = (event) => {
    setSelectedRatingOption(event.target.value);
  };

  const handleAccessOptionChange = (option) => {
    if (selectedAccessOptions?.includes(option)) {
      // If the option is already selected, remove it
      setSelectedAccessOptions(
        selectedAccessOptions.filter((item) => item !== option)
      );
    } else {
      // If the option is not selected, add it to the selected options
      setSelectedAccessOptions([...selectedAccessOptions, option]);
    }
  };

  /*   const handleAccessOptionChange = (event) => {
        setSelectedAccessOption(event.target.value);
    }; */
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(selectedIcon);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/weeks/courseId/${courseId}`
      )
      .then((response) => {
        setCourse(response?.data);
      })
      .catch((error) => console.error(error));
  }, [courseId]);
  console.log(course);

  const handleEditFeedbackItem = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (selectedFile) fileUrl = await uploadFileToS3(selectedFile);
    const data = {
      organizationId: userInfo?.organizationId,
      categoryName: event?.target?.feedbackCategory?.value,
      courseId: selectedCourse?._id,
      oldItemName: selectedFeedback?.feedbackItemName,
      feedbackItem: {
        feedbackItemName: event?.target?.feedbackItemName?.value,
        itemRating: selectedRatingOption,
        giveAccess: selectedAccessOptions,
        selectedIcon: fileUrl,
      },
    };
    console.log(data);
    if (data?.categoryName === selectedFeedbackCategory?.categoryName) {
      /*    if (
               selectedFeedbackCategory?.feedbackItems?.find(
                (item) =>
                   item?.feedbackItemName === event?.target?.feedbackItemName?.value
               )
             ) {
               setIsOpenFeedbackItemEditForm(false);
               Swal.fire({
                 icon: "error",
                 title: "Item already exist!",
                 text: "Please enter an unique item name!",
               });
              return;
             } */
      const updatedItem = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/editFeedbackItem`,
        data
      );

      if (updatedItem?.data?.acknowledged) {
        toast.success("Item Updated Successfully");
        const updateItemsArray = [...selectedFeedbackCategory?.feedbackItems];
        const selectedFeedbackIndex = updateItemsArray?.findIndex(
          (item) =>
            item?.feedbackItemName === selectedFeedback?.feedbackItemName
        );
        updateItemsArray[selectedFeedbackIndex] = data?.feedbackItem;
        const updatedCategoriesArray = [...feedbackCategories];
        const selectedIndex = updatedCategoriesArray.findIndex(
          (category) =>
            category.categoryName === selectedFeedbackCategory.categoryName
        );
        updatedCategoriesArray[selectedIndex].feedbackItems = updateItemsArray;
        setFeedbackCategories(updatedCategoriesArray);
        setSelectedFeedbackCategory(updatedCategoriesArray[selectedIndex]);
        setIsOpenFeedbackItemEditForm(false);
        event.target.reset();
      }
    } else {
      let currentCategory = feedbackCategories?.find(
        (item) => item?.categoryName === data?.categoryName
      );
      if (
        currentCategory?.feedbackItems?.find(
          (item) =>
            item?.feedbackItemName === event?.target?.feedbackItemName?.value
        )
      ) {
        setIsOpenFeedbackItemEditForm(false);
        Swal.fire({
          icon: "error",
          title: "Item already exist!",
          text: "Please enter an unique item name!",
        });
        return;
      }
      const newItem = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/feedbackItems`,
        {
          organizationId: userInfo?.organizationId,
          categoryName: currentCategory?.categoryName,
          courseId: selectedCourse?._id,
          feedbackItem: {
            feedbackItemName: event?.target?.feedbackItemName?.value,
            itemRating: selectedRatingOption,
            giveAccess: selectedAccessOptions,
            selectedIcon: fileUrl,
          },
        }
      );
      if (newItem?.data?.acknowledged) {
        fetch(`${process.env.REACT_APP_BACKEND_API}/deleteFeedbackItem`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organizationId: userInfo?.organizationId,
            categoryName: selectedFeedbackCategory?.categoryName,
            courseId: selectedCourse?._id,
            feedbackItemName: selectedFeedback?.feedbackItemName,
          }),
        })
          .then((result) => {
            if (result?.ok) {
              const remainingItems =
                selectedFeedbackCategory?.feedbackItems?.filter(
                  (item) =>
                    item?.feedbackItemName !==
                    selectedFeedback?.feedbackItemName
                );
              setSelectedFeedbackCategory({
                categoryName: selectedFeedbackCategory?.categoryName,
                feedbackItems: remainingItems,
              });
              const selectedCategoryItems = currentCategory?.feedbackItems
                ? [
                    ...currentCategory?.feedbackItems,
                    {
                      feedbackItemName: event?.target?.feedbackItemName?.value,
                      itemRating: selectedRatingOption,
                      giveAccess: selectedAccessOptions,
                      selectedIcon,
                    },
                  ]
                : [
                    {
                      feedbackItemName: event?.target?.feedbackItemName?.value,
                      itemRating: selectedRatingOption,
                      giveAccess: selectedAccessOptions,
                      selectedIcon,
                    },
                  ];
              setSelectedFeedbackCategory({
                categoryName: currentCategory?.categoryName,
                feedbackItems: selectedCategoryItems,
              });
              const otherCategories = feedbackCategories?.filter(
                (item) => currentCategory?.categoryName !== item?.categoryName
              );
              setFeedbackCategories([
                {
                  categoryName: currentCategory?.categoryName,
                  feedbackItems: selectedCategoryItems,
                },
                ...otherCategories,
              ]);
              setIsOpenFeedbackItemEditForm(false);
              event.target.reset();
              toast.success("Item Updated Successfully!");
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
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
              onClick={() => setIsOpenFeedbackItemEditForm(false)}
              className="flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]"
            >
              x
            </button>
          </div>
          <form onSubmit={handleEditFeedbackItem} className="w-full">
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
                    Upload Icon
                  </p>

                  <label
                    className="mt-[-16px] flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold"
                    htmlFor="input-file-upload"
                  >
                    Browser
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
              </div>

              <div className="w-full pl-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 mt-2 sm:grid-cols-2 w-full">
                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                      Feedback Category
                    </label>
                    <select
                      defaultValue={selectedFeedbackCategory?.categoryName}
                      name="feedbackCategory"
                      id="feedbackCategory"
                      className="block w-full px-2 py-2 mt-2 bg-white rounded-md border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                    >
                      <option value={selectedFeedbackCategory?.categoryName}>
                        {selectedFeedbackCategory?.categoryName}
                      </option>
                      {feedbackCategories?.map((feedbackCategory) => (
                        <>
                          {feedbackCategory?.categoryName !==
                            selectedFeedbackCategory?.categoryName && (
                            <option value={feedbackCategory?.categoryName}>
                              {feedbackCategory?.categoryName}
                            </option>
                          )}
                        </>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[16px] font-[600]" htmlFor="case">
                      Feedback Item Name
                    </label>
                    <input
                      id="feedbackItemName"
                      name="feedbackItemName"
                      placeholder="Feedback Item name"
                      defaultValue={selectedFeedback?.feedbackItemName}
                      className="block w-full p-2 mt-2 rounded-md bg-white border border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                    />
                  </div>

                  <div className=" flex flex-col justify-center ">
                    <p className="font-semibold text-[#000000]  py-2">
                      Item Rating
                    </p>
                    <div className=" flex gap-7 items-center  h-[40px]   text-[#535353] ">
                      <div>
                        <input
                          id="draft"
                          className="peer/draft me-2 "
                          type="radio"
                          name="status"
                          value="5"
                          checked={selectedRatingOption === "5"}
                          onChange={handleRatingOptionChange}
                        />
                        <label
                          for="draft"
                          className="peer-checked/draft: font-normal"
                        >
                          5
                        </label>
                      </div>

                      <div>
                        <input
                          id="10"
                          class="peer/published me-2"
                          type="radio"
                          name="status"
                          value="10"
                          checked={selectedRatingOption === "10"}
                          onChange={handleRatingOptionChange}
                        />
                        <label
                          for="10"
                          class="peer-checked/published: font-normal"
                        >
                          10
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-[#000000] py-2">
                      Give Access
                    </p>
                    <div className="flex gap-7 items-center h-[40px] text-[#535353]">
                      <div className="flex items-center">
                        <input
                          id="ExecutionMentor"
                          className="peer/draft me-2"
                          type="checkbox"
                          name="ExecutionMentor"
                          value="Execution mentor"
                          checked={selectedAccessOptions?.includes(
                            "Execution mentor"
                          )}
                          onChange={() =>
                            handleAccessOptionChange("Execution mentor")
                          }
                        />
                        <label
                          htmlFor="ExecutionMentor"
                          className="peer-checked/draft: font-normal"
                        >
                          Execution mentor
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="ExpertMentor"
                          className="peer/published me-2"
                          type="checkbox"
                          name="ExpertMentor"
                          value="Expert mentor"
                          checked={selectedAccessOptions?.includes(
                            "Expert mentor"
                          )}
                          onChange={() =>
                            handleAccessOptionChange("Expert mentor")
                          }
                        />
                        <label
                          htmlFor="ExpertMentor"
                          className="peer-checked/published: font-normal"
                        >
                          Expert mentor
                        </label>
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

export default EditFeedbackItemForm;
