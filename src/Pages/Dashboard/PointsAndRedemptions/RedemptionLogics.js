//PointsRedemptions.js

import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
/* import Category1 from './Category1'; */

import updateimg from "../../../assets/PointsRedemptions/Upload.svg";
import editimg from "../../../assets/PointsRedemptions/edit.svg";
import deleteimg from "../../../assets/PointsRedemptions/delete.svg";
import Filterimg from "../../../assets/PointsRedemptions/Filter.svg";
import undo from "../../../assets/PointsRedemptions/Sync-retry.svg";
import RedemptionCategory from "./RedemptionCategory";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import SelectRedemptionCategory from "./RedemptionLogicsComponents/SelectRedemptionCategory";
import AddRedemptionPointItemForm from "./RedemptionLogicsComponents/AddRedemptionPointItemForm";
import UploadingImg from "../../../assets/PointsRedemptions/uploadimg.png";
import EditRedemptionItemForm from "./RedemptionLogicsComponents/EditRedemptionItemForm";

const RedemptionLogics = () => {
  const { userInfo } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [orgRedemptionLogics, setOrgRedemptionLogics] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(
    courses?.length > 0 ? courses[0] : {}
  );
  const [redemptionCategories, setRedemptionCategories] = useState([]);
  const [selectedRedemptionCategory, setSelectedRedemptionCategory] = useState(
    {}
  );
  const [categoryThreeDot, setCategoryThreeDot] = useState(false);
  const [redemptionThreeDot, setRedemptionThreeDot] = useState(false);
  const [selectedRedemptionLogic, setSelectedRedemptionLogic] = useState({});
  const [isOpenRedemptionItemAddForm, setIsOpenRedemptionItemAddForm] =
    useState(false);
  const [isOpenRedemptionItemEditForm, setIsOpenRedemptionItemEditForm] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getPointsAndRedemptionsSubDetailsByOrganizationAndName/redemptionLogic/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {

          console.log(response)
          setItemDetails(response?.data);

        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);
  console.log(itemDetails)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
        setSelectedCourse(response?.data[0]);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  // console.log(userInfo?.organizationId)
  // console.log(selectedCourse._id)
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/redemption_categories/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgRedemptionLogics(response?.data?.courses);
        const findCategories = response?.data?.courses?.find(
          (course) => course?.courseId === selectedCourse?._id
        );
        setRedemptionCategories([...findCategories?.categories]);
        setSelectedRedemptionCategory({ ...findCategories?.categories[0] });
      })
      .catch((error) => console.error(error));
  }, [userInfo, selectedCourse]);

  const handleSelectCourse = (item) => {
    setSelectedCourse(item);
    const findCategories = orgRedemptionLogics?.find(
      (course) => course?.courseId === item?._id
    );
    if (findCategories) {
      setRedemptionCategories(findCategories?.categories);
      setSelectedRedemptionCategory(findCategories?.categories[0]);
    } else {
      setRedemptionCategories([]);
      setSelectedRedemptionCategory({});
    }
    setIsOpenRedemptionItemAddForm(false);
  };

  const handleItemDelete = async (name) => {
    const deleteData = {
      organizationId: userInfo?.organizationId,
      categoryName: selectedRedemptionCategory?.categoryName,
      courseId: selectedCourse?._id,
      redemptionItemName: name,
    };
    console.log(deleteData);
    await Swal.fire({
      title: itemDetails?.areYouSure ? itemDetails?.areYouSure : "Are you sure?",
      text: itemDetails?.onceDeletedTheItemWillNotRecover ? itemDetails?.onceDeletedTheItemWillNotRecover : "Once deleted, the item will not recover!",
      icon: "warning",
      buttons: true,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_BACKEND_API}/deleteRedemptionItem`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deleteData),
        })
          .then((result) => {
            console.log(result);
            if (result?.ok) {
              toast.success(itemDetails?.itemDeletedSuccessfully ? itemDetails?.itemDeletedSuccessfully : "Item Deleted Successfully!");
              const remainingItems =
                selectedRedemptionCategory?.redemptionItems?.filter(
                  (item) => item?.redemptionItemName !== name
                );
              setSelectedRedemptionCategory({
                categoryName: selectedRedemptionCategory?.categoryName,
                redemptionItems: remainingItems,
              });
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            // Handle error, display a message to the user, etc.
          });
      }
    });
  };

  return (
    <div>
      <Layout>
        {/*   <div className='flex items-center justify-center gap-7 pt-20 lg:pt-10 '>
                    <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">Redemption Logics</div>
                    <div className="Input w-[425px] h-16 relative bg-slate-100 rounded-[40px] shadow-inner">
                        <input className="Search w-[329px] left-[32px] top-[12px] absolute text-zinc-500 text-[20px] font-light leading-10 bg-transparent focus:outline-0" placeholder='Search' />
                        <div className="Button w-10 h-10 left-[373px] top-[12px] absolute bg-zinc-500 rounded-[32px] shadow">
                            <SearchIcon className="Search1 w-6 h-6 left-[8px] top-[8px] absolute text-white" />
                        </div>
                    </div>
                    <Badge badgeContent={1} color='error'>
                        <NotificationsIcon color="action" />
                    </Badge>
                </div>
                <div className='flex justify-end mx-[75px] my-9'>
                    <img src={undo} ></img>

                </div>
                <div className='flex justify-between mx-10'>

                    <div className='flex justify-between items-center '>
                        <input className='me-2 text-[#737373] h-[20px] ' type="checkbox" id="" name="" value="" />
                        <p className='font-semibold text-[#000000]'>Select All</p>
                    </div>

                    <div className='flex items-center '>
                        <p className='font-semibold  text-[#000000] px-4 py-2'>Select Category</p>
                        <div className=" flex gap-2  border  rounded-lg h-[40px]  px-2 ms-5 text-[#535353] ">

                            <select
                                required
                                className="w-full border-0 focus:outline-0"
                                name="option"
                                id="option"
                            >

                                <option className="" value="Student">Select Level</option>
                                <option value="Parent"></option>
                                <option value="Counselor"></option>
                                <option value="Others"></option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center '>
                        <p className='font-semibold text-[#000000]'>Upload</p>
                        <img className='h-[70px] w-[70px]' src={updateimg}></img>
                        <p className='font-semibold text-[#000000] me-3'>Edit</p>
                        <img className='h-[35px] w-[35px] bg-[#404040] rounded-full p-1' src={editimg}></img>
                        <p className='font-semibold text-[#000000] me-3'>Delete</p>
                        <img className='h-[35px] w-[35px] bg-[#E70000] rounded-full p-1 ' src={deleteimg}></img>
                    </div>
                </div> */}

        <div className="flex items-center justify-between container mx-auto px-4 gap-7 pt-20 lg:pt-10 ">
          <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">
            {itemDetails?.redemptionLogics ? itemDetails?.redemptionLogics : "Redemption Logics"}

          </div>
          <div className="Input w-[425px] h-16 relative bg-slate-100 rounded-[40px] shadow-inner">
            <input
              className="Search w-[329px] left-[32px] top-[12px] absolute text-zinc-500 text-[20px] font-light leading-10 bg-transparent focus:outline-0"
              placeholder={itemDetails?.search ? itemDetails?.search : "Search"}
            />
            <div className="Button w-10 h-10 left-[373px] top-[12px] absolute bg-zinc-500 rounded-[32px] shadow">
              <SearchIcon className="Search1 w-6 h-6 left-[8px] top-[8px] absolute text-white" />
            </div>
          </div>
          <Badge className="mr-4" badgeContent={1} color="error">
            <NotificationsIcon color="action" />
          </Badge>
        </div>
        <div className="px-4 mt-[40px]">
          <div>
            <h1 className=" text-[#737373] text-[24px] font-[500] mb-2 ">
              {itemDetails?.selectCourse ? itemDetails?.selectCourse : "Select Course"}

            </h1>
            <div className="flex flex-wrap">
              {!courses[0] && (
                <div
                  className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                >
                  {itemDetails?.noCourseAddedYet ? itemDetails?.noCourseAddedYet : "No course added yet!"}

                </div>
              )}
              {courses?.map((item, index) => (
                <button
                  key={index}
                  className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 ${selectedCourse?._id === item?._id
                      ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                      : "text-[#949494]"
                    }`}
                  onClick={() => handleSelectCourse(item)}
                >
                  {item?.courseFullName}
                </button>
              ))}
            </div>
          </div>
          <SelectRedemptionCategory
            itemDetails={itemDetails}
            setRedemptionCategories={setRedemptionCategories}
            redemptionCategories={redemptionCategories}
            selectedRedemptionCategory={selectedRedemptionCategory}
            setSelectedRedemptionCategory={setSelectedRedemptionCategory}
            setCategoryThreeDot={setCategoryThreeDot}
            categoryThreeDot={categoryThreeDot}
            selectedCourse={selectedCourse}
          />
        </div>
        <div className="px-4 mt-[40px] mb-[20px] grid grid-cols-6 gap-4">
          <div
            onClick={() => {
              if (!redemptionCategories[0]) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:itemDetails?.pleaseAddAtLeastOneCategory ? itemDetails?.pleaseAddAtLeastOneCategory : "Please add at least one category!",
                });
                return;
              }
              setIsOpenRedemptionItemAddForm(true);
              setIsOpenRedemptionItemEditForm(false);
            }}
            className=" bg-[#DBDBDB] border w-full flex flex-col justify-center items-center mt-2 rounded-2xl cursor-pointer z-0"
            style={{ boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <div className=" flex justify-center items-center text-[250px] font-thin text-[#ffffff] py-3">
              <AddSharpIcon sx={{ fontSize: 150 }} />
            </div>
            <div className="text-[#8F8F8F] pb-5  mt-[-10px] font-medium text-base">
              {itemDetails?.addDetails ? itemDetails?.addDetails : "Add Details"}

            </div>
          </div>
          {selectedRedemptionCategory?.redemptionItems?.map((item) => (
            <div
              className=" bg-[#fff] w-full flex flex-col justify-between items-center mt-2 min-h-[210px] rounded-2xl cursor-pointer border relative "
              style={{ boxShadow: " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <button
                onClick={() => {
                  setRedemptionThreeDot(!redemptionThreeDot);
                  setSelectedRedemptionLogic(item);
                }}
                onBlur={() => setRedemptionThreeDot(false)}
                className="absolute top-[2px] right-[2px] px-3 py-2 rounded-full hover:bg-slate-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="5"
                  height="18"
                  viewBox="0 0 5 18"
                  fill="none"
                >
                  <path
                    d="M4.31777 2.88577C4.31777 4.09795 3.35121 5.08061 2.15889 5.08061C0.966567 5.08061 0 4.09795 0 2.88577C0 1.67358 0.966567 0.690918 2.15889 0.690918C3.35121 0.690918 4.31777 1.67358 4.31777 2.88577Z"
                    fill="#8F8F8F"
                  />
                  <path
                    d="M4.31777 9.15676C4.31777 10.3689 3.35121 11.3516 2.15889 11.3516C0.966567 11.3516 0 10.3689 0 9.15676C0 7.94458 0.966567 6.96191 2.15889 6.96191C3.35121 6.96191 4.31777 7.94458 4.31777 9.15676Z"
                    fill="#8F8F8F"
                  />
                  <path
                    d="M4.31777 15.1142C4.31777 16.3264 3.35121 17.309 2.15889 17.309C0.966567 17.309 0 16.3264 0 15.1142C0 13.902 0.966567 12.9194 2.15889 12.9194C3.35121 12.9194 4.31777 13.902 4.31777 15.1142Z"
                    fill="#8F8F8F"
                  />
                </svg>
              </button>
              {selectedRedemptionLogic?.redemptionItemName ===
                item?.redemptionItemName &&
                redemptionThreeDot && (
                  <ul className="absolute right-0 top-[40px] w-max border  bg-white p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026] z-10 ">
                    <li
                      className="cursor-pointer p-2 hover:bg-[#5c5c5c21] rounded-lg w-full text-left text-black text-[13px] font-[600] "
                      onMouseDown={() => {
                        setSelectedRedemptionLogic(item);
                        setIsOpenRedemptionItemEditForm(true);
                        setIsOpenRedemptionItemAddForm(false);
                      }}
                    >
                      {itemDetails?.editItem ? itemDetails?.editItem : "Edit Item"}

                    </li>
                    <li
                      className="cursor-pointer p-2 hover:bg-[#5c5c5c21] rounded-lg w-full text-left text-black text-[13px] font-[600] "
                      onMouseDown={() =>
                        handleItemDelete(item?.redemptionItemName)
                      }
                    >
                      {itemDetails?.deleteItem ? itemDetails?.deleteItem : "Delete Item"}

                    </li>
                  </ul>
                )}
              <h1 className=" text-[#737373] text-[16px] font-[700] mt-[18px] px-5 text-center ">
                {item?.redemptionItemName}
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="53"
                height="41"
                viewBox="0 0 53 41"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M28.1417 12.2969H45.1646C49.0548 12.2969 52.2085 15.5032 52.2085 19.4582V33.7808C52.2085 37.7359 49.0548 40.9421 45.1646 40.9421H7.59691C3.70665 40.9421 0.552979 37.7359 0.552979 33.7808V19.4582C0.552979 15.5032 3.70665 12.2969 7.59691 12.2969H24.6197V7.40338C24.6197 5.09626 26.4594 3.22596 28.7287 3.22596C29.0529 3.22596 29.3157 2.95878 29.3157 2.62919C29.3157 1.64042 30.1041 0.838867 31.0767 0.838867C32.0493 0.838867 32.8377 1.64042 32.8377 2.62919C32.8377 3.73711 32.4048 4.79965 31.6342 5.58307C30.8636 6.36649 29.8185 6.80661 28.7287 6.80661C28.4045 6.80661 28.1417 7.07379 28.1417 7.40338V12.2969ZM16.4018 28.4098H19.3368C20.3094 28.4098 21.0978 27.6083 21.0978 26.6195C21.0978 25.6307 20.3094 24.8292 19.3368 24.8292H16.4018V21.8453C16.4018 20.8566 15.6134 20.055 14.6408 20.055C13.6683 20.055 12.8799 20.8566 12.8799 21.8453V24.8292H9.94489C8.97232 24.8292 8.18391 25.6307 8.18391 26.6195C8.18391 27.6083 8.97232 28.4098 9.94489 28.4098H12.8799V31.3937C12.8799 32.3825 13.6683 33.184 14.6408 33.184C15.6134 33.184 16.4018 32.3825 16.4018 31.3937V28.4098ZM35.7726 19.4582C37.0694 19.4582 38.1206 20.527 38.1206 21.8453C38.1206 23.1637 37.0694 24.2324 35.7726 24.2324C34.4759 24.2324 33.4247 23.1637 33.4247 21.8453C33.4247 20.527 34.4759 19.4582 35.7726 19.4582ZM28.7287 26.6195C28.7287 27.9379 29.7799 29.0066 31.0767 29.0066C32.3734 29.0066 33.4247 27.9379 33.4247 26.6195C33.4247 25.3012 32.3734 24.2324 31.0767 24.2324C29.7799 24.2324 28.7287 25.3012 28.7287 26.6195ZM35.7726 33.7808C34.4759 33.7808 33.4247 32.7121 33.4247 31.3937C33.4247 30.0753 34.4759 29.0066 35.7726 29.0066C37.0694 29.0066 38.1206 30.0753 38.1206 31.3937C38.1206 32.7121 37.0694 33.7808 35.7726 33.7808ZM38.1206 26.6195C38.1206 27.9379 39.1718 29.0066 40.4686 29.0066C41.7654 29.0066 42.8166 27.9379 42.8166 26.6195C42.8166 25.3012 41.7654 24.2324 40.4686 24.2324C39.1718 24.2324 38.1206 25.3012 38.1206 26.6195Z"
                  fill="#0551E6"
                />
              </svg>
              <p className="mb-[15px] px-[15px] text-center text-[#8F8F8F] text-sm font-[500] ">
                {item?.itemRedemptionValue}
              </p>
            </div>
          ))}
        </div>
        {isOpenRedemptionItemAddForm && (
          <AddRedemptionPointItemForm
          itemDetails={itemDetails}
            setIsOpenRedemptionItemAddForm={setIsOpenRedemptionItemAddForm}
            UploadingImg={UploadingImg}
            selectedRedemptionCategory={selectedRedemptionCategory}
            redemptionCategories={redemptionCategories}
            setSelectedRedemptionCategory={setSelectedRedemptionCategory}
            setRedemptionCategories={setRedemptionCategories}
            selectedCourse={selectedCourse}
            userInfo={userInfo}
            courseId={selectedCourse?._id}
          />
        )}

        {isOpenRedemptionItemEditForm &&
          selectedRedemptionLogic?.redemptionItemName && (
            <EditRedemptionItemForm
            itemDetails={itemDetails}
              selectedRedemptionLogic={selectedRedemptionLogic}
              setIsOpenRedemptionItemEditForm={setIsOpenRedemptionItemEditForm}
              setIsOpenRedemptionItemAddForm={setIsOpenRedemptionItemAddForm}
              UploadingImg={UploadingImg}
              selectedRedemptionCategory={selectedRedemptionCategory}
              redemptionCategories={redemptionCategories}
              setSelectedRedemptionCategory={setSelectedRedemptionCategory}
              setRedemptionCategories={setRedemptionCategories}
              selectedCourse={selectedCourse}
              userInfo={userInfo}
              courseId={selectedCourse?._id}
            />
          )}

        {/*   <div>
                    <RedemptionCategory />
                 
                </div> */}
      </Layout>
    </div>
  );
};

export default RedemptionLogics;
