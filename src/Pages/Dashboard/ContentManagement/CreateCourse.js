import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import arrowDown from "../../../assets/SkillsManagement/arrow.svg";
import arrowright from "../../../assets/SkillsManagement/arrowright.svg";
import required from "../../../assets/ContentManagement/required.png";
// import {
//   S3Client,
//   AbortMultipartUploadCommand,
//   PutObjectCommand,
//   __Client,
//   GetObjectCommand,
// } from "@aws-sdk/client-s3";

import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate, useParams } from "react-router-dom";
import Level from "../Dashboard/Level";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import Loading from "../../Shared/Loading/Loading";

// const client = new S3Client({
//   region: "eu-north-1",
//   credentials: {
//     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//   },
// });

const CreateCourse = () => {
  const [isOpenGeneralCourseInfo, setisOpenGeneralCourseInfo] = useState(true);
  const [isOpenCourseFormat, setisOpenCourseFormat] = useState(false);
  const [isOpenCompletionTracking, setisOpenCompletionTracking] =
    useState(false);
  //const [isOpenNumberofWeeksChapters, setisOpenNumberofWeeksChapters] = useState(false);
  const [courseCategoryInput, setCourseCategoryInput] = useState("");
  const [courseCategories, setCourseCategories] = useState();
  const [categoryName, setCategoryName] = useState();

  const toggleDropdownCourseSelection = () => {
    setisOpenGeneralCourseInfo(!isOpenGeneralCourseInfo);
  };
  const toggleDropdownCourseFormat = () => {
    setisOpenCourseFormat(!isOpenCourseFormat);
  };
  const toggleDropdownCompletionTracking = () => {
    setisOpenCompletionTracking(!isOpenCompletionTracking);
  };
  /*  const toggleDropdownNumberofWeeksChapters = () => {
         setisOpenNumberofWeeksChapters(!isOpenNumberofWeeksChapters);
     }; */

  /*   const [numberOfWeeks, setNumberOfWeeks] = useState(0);
      const [numberList, setNumberList] = useState([]);
  
      const handleInputChange = (event) => {
          const value = event.target.value;
          setNumberOfWeeks(value);
          generateNumberList(value);
      };
  
      const generateNumberList = (value) => {
          const numbers = [];
          for (let i = 1; i <= value; i++) {
              numbers.push(i);
          }
          setNumberList(numbers);
      }; */

  // addcoursecategory
  const [isOpenAddCourseCategory, setisOpenAddCourseCategory] = useState(false);

  const openModalAddCourseCategory = () => {
    setisOpenAddCourseCategory(true);
  };

  const closeModalAddCourseCategory = () => {
    setisOpenAddCourseCategory(false);
  };

  //file upload
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [url, setUrl] = useState("");

  ///week names
  /* const [formData, setFormData] = useState([]);
    
    const handleInputChangeweek = (e, number) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
          const updatedData = [...prevFormData];
          const index = updatedData.findIndex((data) => data.number === number);
          if (index !== -1) {
            updatedData[index][name] = value;
          } else {
            updatedData.push({ number, [name]: value });
          }
          return updatedData;
        });
      }; */

  const { user, userInfo } = useContext(AuthContext);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [enableDrip, setEnableDrip] = useState(false);
  const router = useNavigate();

  // console.log(userInfo);

  /// handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    Loading();
    const form = event.target;

    const courseFullName = "" + form.courseFullName?.value;
    const courseShortName = form.courseShortName?.value;
    const courseStartingDate = form.courseStartingDate?.value;
    const courseEndingDate = form.courseEndingDate?.value;
    const courseDescription = form.courseDescription?.value;
    const courseCategory = form.courseCategory?.value;
    const courseVisibility =
      form.courseVisibility?.value === "false" ? false : true;
    const courseIDNumber = form.courseIDNumber?.value;
    const courseFormat = form.courseFormat?.value;
    const gradesFormat = form.gradesFormat?.value;
    const courseInitialUrl = form.courseInitialUrl?.value;
    const groups = form.groups?.value;
    const showactivitydates = +form.showactivitydates?.value;
    const numberOfWeeks = +form.numberofWeeks?.value;
    const showactivityreports = +form.showactivityreports?.value;
    const enableCompletionTracking = +form.enableCompletionTracking?.value;
    // const enableDrip = enableDrip === "false" ? false : true;
    const showactivitycompletionconditions =
      +form.showactivitycompletionconditions?.value;
    const coursePurchaseUrl = +form.coursePurchaseUrl?.value;
    const expirationDay = form.expirationDay?.value;

    let fileUrl = "";
    if (selectedFile) {
      fileUrl = await uploadFileToS3(selectedFile);
    }

    const addCourse = {
      courseFullName,
      courseShortName,
      courseStartingDate,
      courseEndingDate,
      courseDescription,
      courseCategory,
      courseThumbnail: fileUrl,
      courseVisibility,
      courseIDNumber,
      courseFormat,
      gradesFormat,
      groups,
      showactivitydates,
      numberOfWeeks,
      courseInitialUrl,
      // coursePurchaseUrl,
      // weekChapterName: formData,
      showactivityreports,
      enableCompletionTracking,
      enableDrip,
      expirationDay,
      // certificateGeneration,
      showactivitycompletionconditions,
      //showGradebooktostudents,
      // newCourseEndingDate,
      // newCourseStartingDate,
      creator: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
      organization: {
        organizationId: userInfo?.organizationId,
        organizationName: userInfo?.organizationName,
      },
    };
    if (submitPermission) {
      const newCourse = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses`,
        addCourse
      );
      // console.log("new course --> ", newCourse);
      // console.log(newCourse?.data?.course?.acknowledged);

      if (newCourse?.data?.course?.acknowledged) {
        toast.success("Course added Successfully");
        router("/courseAccess");
        form.reset();
      }

      // console.log("Add Course----->", addCourse);
    }
    Loading().close();
  };

  ///////////////////////

  const handleSubmitCourseCategory = async () => {
    const addCourseCategory = {
      courseCategoryName: courseCategoryInput,
      creator: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
      organization: {
        organizationId: userInfo?.organizationId,
        organizationName: userInfo?.organizationName,
      },
    };

    // console.log(addCourseCategory);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/CourseCategory/addCourseCategory/organizationId/${userInfo?.organizationId}`,
        addCourseCategory
      );
      // console.log(response)
      if (response.data === "Course category added successfully") {
        toast.success("Category added Successfully");
        // Reset the form after successful submission
        setCategoryName(addCourseCategory?.courseCategoryName);
        setCourseCategoryInput("");
      } else {
        toast.error("Error submitting Category");
      }
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/CourseCategory/getCourseCategory/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourseCategories(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  // console.log(courseCategories?.courseCategories);

  return (
    <div>
      <Layout>
        <img
          src={
            "https://experiment-labs-my-bucket.s3.eu-north-1.amazonaws.com/Clip%20path%20group%20(1).png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVT26GH52EUHJTF4V%2F20230720%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20230720T051545Z&X-Amz-Expires=900&X-Amz-Signature=355530f5391cdf9769b35bfcc14b3b29d5e0e82984c812702f7981ca416b34dc&X-Amz-SignedHeaders=host"
          }
          alt=""
        />
        <div className="text-[#3E4DAC] mt-20 lg:mt-0 text-[26px] font-bold border-b border-b-[#A4A4A4] py-[35px] ps-[40px]">
          <p>Create/Edit Course </p>
        </div>
        <form onSubmit={handleSubmit} className=" ms-10  mt-12">
          <div
            className="select-option flex items-center gap-[40px]"
            onClick={toggleDropdownCourseSelection}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              1
            </h1>
            <p className="text-[25px] font-bold">General course information</p>
            {!isOpenGeneralCourseInfo && (
              <img className="w-6" src={arrowright} alt=""></img>
            )}

            {isOpenGeneralCourseInfo && <img src={arrowDown} alt=""></img>}

            <i
              className={`dropdown-arrow ${
                isOpenGeneralCourseInfo ? "open" : ""
              }`}
            ></i>
          </div>
          {isOpenGeneralCourseInfo && (
            <div className="dropdown-menu mt-[71px] mb-[45px] flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between me-10">
              <div>
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Course Full Name
                    </p>
                    <img src={required} alt="" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="courseFullName"
                    type="text"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Course Short Name
                    </p>
                    <img src={required} alt="" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="courseShortName"
                    type="text"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                </div>
                <div className="mt-20 flex flex-col">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Course Starting Date and Time{" "}
                    </p>
                    <img src={required} alt="" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="courseStartingDate"
                    type="datetime-local"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                  {/* <input required className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
                </div>
                <div className="mt-20 flex flex-col">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Course Ending Date and Time{" "}
                    </p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="courseEndingDate"
                    type="datetime-local"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                  {/* <input className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseEndingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
                </div>
                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Course Description
                    </p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[97px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="courseDescription"
                    type="text"
                    placeholder="Eg. This Lab will teach you about...."
                  />
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Course purchase url
                    </p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="coursePurchaseUrl"
                    type="url"
                    placeholder="https://www.google.com/"
                  />
                </div>
                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Course initial url
                    </p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="courseInitialUrl"
                    type="url"
                    placeholder="https://www.google.com/"
                  />
                </div>
              </div>

              <div>
                <div className="mb-[70px] mt-[] ">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Course Category
                    </p>
                    <img src={required} alt="" />
                  </div>

                  <div className=" flex gap-2  mt-6 ms-6 border rounded-md w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">
                    <select
                      required
                      className="w-full bg-[#F6F7FF]  text-base font-semibold focus:outline-0"
                      name="courseCategory"
                      // id="option"
                    >
                      {categoryName ? (
                        <option value={categoryName}>{categoryName}</option>
                      ) : (
                        <option value="">Select Category</option>
                      )}
                      {courseCategories?.courseCategories?.map((category) => (
                        <option
                          className="text-[#3E4DAC]"
                          value={category?.categoryName}
                        >
                          {category?.categoryName}
                        </option>
                      ))}
                    </select>
                    <div
                      onClick={openModalAddCourseCategory}
                      className="w-[96px] bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center"
                    >
                      <p className="text-2xl">+</p>
                      <div>
                        <p className="w-full">Add</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {isOpenAddCourseCategory && (
                      <div className="modal-overla lg:w-[438px] w-[100%] h-[325px] rounded-md mt-3 bg-[#fff] border">
                        <div className="modal-content">
                          <div className="border-b flex justify-between items-center pt-6 px-10 pb-5 text-[#3E4DAC] text-xl font-bold">
                            <p>Add Course Category</p>
                            <p
                              onClick={closeModalAddCourseCategory}
                              className=" flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]"
                            >
                              x
                            </p>
                          </div>
                          <div className="mt-6 mx-10">
                            <div className="flex items-center gap-4">
                              <p className="font-bold text-lg me-[36px]">
                                {" "}
                                Course Category Name
                              </p>
                            </div>
                            <div>
                              <input
                                className="mt-6 border rounded-md lg:w-[358px] w-[100%] lg:h-[50px] h-[40px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                name="courseCategory"
                                type="text"
                                placeholder="Eg. Entrepreneurship Lab"
                                value={courseCategoryInput}
                                onChange={(e) =>
                                  setCourseCategoryInput(e.target.value)
                                }
                              />
                              <div className="flex justify-center mt-5">
                                <button
                                  className="px-[20px] lg:py-3 py-2 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                                  onClick={handleSubmitCourseCategory}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>

                    <p className="font-bold text-lg me-[36px]">
                      Course Thumbnail
                    </p>
                  </div>

                  <div
                    onChange={handleFileChange}
                    className=" flex gap-2  mt-6 ms-6 border rounded-md w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                  >
                    <div className=" flex items-center">
                      <input
                        className="w-full h-full flex items-center text-[#3E4DAC] text-base font-semibold mt-4"
                        type="file"
                      />
                      <p className="w-[105px] h-full bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center">
                        Browse
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Course Visibility
                    </p>
                  </div>
                  <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                    <div className="">
                      <input
                        type="radio"
                        id="Yes"
                        name="courseVisibility"
                        value={true}
                      />
                      <lebel> Show</lebel>
                    </div>
                    <div className=" ms-[55px]">
                      <input
                        type="radio"
                        id="No"
                        name="courseVisibility"
                        value={false}
                      />
                      <lebel> Hide</lebel>
                    </div>
                  </div>

                  <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Course ID Number
                      </p>
                    </div>

                    <input
                      className="mt-6 ms-6 border rounded-md w-[272px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="courseIDNumber"
                      type="text"
                      placeholder="Eg. 02283847"
                    ></input>
                  </div>

                  <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Expiration Day
                      </p>
                    </div>

                    <input
                      className="mt-6 ms-6 border rounded-md w-[272px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="expirationDay"
                      type="number"
                      placeholder="Eg. 364"
                    ></input>
                  </div>

                  <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Price</p>
                    </div>

                    <input
                      className="mt-6 ms-6 border rounded-md w-[272px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="price"
                      type="number"
                      placeholder="Eg. 5000"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="select-option flex items-center gap-[40px] mt-10"
            onClick={toggleDropdownCourseFormat}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              2
            </h1>
            <p className="text-[25px] font-bold">Course Format</p>
            {!isOpenCourseFormat && (
              <img className="w-6" src={arrowright} alt=""></img>
            )}

            {isOpenCourseFormat && <img src={arrowDown} alt=""></img>}

            <i
              className={`dropdown-arrow ${isOpenCourseFormat ? "open" : ""}`}
            ></i>
          </div>

          {isOpenCourseFormat && (
            <div className="dropdown-menu mt-[71px] mb-[45px]  flex-col lg:flex-row gap-3 lg:gap-0 justify-between me-10">
              <div>
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Course Format</p>
                  </div>

                  <div
                    className=" flex gap-2  mt-6 ms-6   w-[230px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                    style={{
                      borderRadius: "8px",

                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <select
                      required
                      className="select select-bordered w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold"
                      name="courseFormat"
                      //id="option"
                    >
                      <option value="weeks">Weekly format</option>
                      <option value="Parent"></option>
                      <option value="Counselor"></option>
                      <option value="Others"></option>
                    </select>
                  </div>
                </div>
                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Grades Format</p>
                  </div>

                  <div
                    className=" flex gap-2  mt-6 ms-6   w-[230px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                    style={{
                      borderRadius: "8px",

                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <select
                      required
                      className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold"
                      name="gradesFormat"
                      id="option"
                    >
                      <option className="" value="Gamified">
                        Gamified
                      </option>
                      <option value="Parent"></option>
                      <option value="Counselor"></option>
                      <option value="Others"></option>
                    </select>
                  </div>
                </div>
                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Groups</p>
                  </div>

                  <div
                    className=" flex gap-2  mt-6 ms-6   w-[230px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                    style={{
                      borderRadius: "8px",

                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <select
                      required
                      className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold"
                      name="groups"
                      // id="option"
                    >
                      <option className="" value="No Groups">
                        No Groups
                      </option>
                      <option value="Parent"></option>
                      <option value="Counselor"></option>
                      <option value="Others"></option>
                    </select>
                  </div>
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Show activity dates
                    </p>
                  </div>

                  <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                    <div className="">
                      <input
                        type="radio"
                        id="Yes"
                        name="showactivitydates"
                        value="1"
                      />
                      <lebel> Yes</lebel>
                    </div>
                    <div className=" ms-[55px]">
                      <input
                        type="radio"
                        id="No"
                        name="showactivitydates"
                        value="0"
                      />
                      <lebel> No</lebel>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="bg-[#F4F4F4] px-4 py-8 rounded-md w-[90%]">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="text-[18px] font-bold">
                      Number of Weeks/Chapters
                    </p>
                  </div>
                  <div
                    className="flex items-center border w-[85px] h-[50px]  ms-6 mt-6"
                    style={{
                      borderRadius: "6px",
                      border: "1px solid #CECECE",
                    }}
                  >
                    <input
                      style={{
                        borderRadius: "6px",
                        border: "1px solid #CECECE",
                      }}
                      className="text-center  border w-full h-full focus:outline-0"
                      type="text"
                      placeholder="num"
                      name="numberofWeeks"
                    />
                  </div>
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Show activity reports
                    </p>
                  </div>

                  <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                    <div className="">
                      <input
                        type="radio"
                        id="Yes"
                        name="showactivityreports"
                        value="1"
                      />
                      <lebel> Yes</lebel>
                    </div>
                    <div className=" ms-[55px]">
                      <input
                        type="radio"
                        id="No"
                        name="showactivityreports"
                        value="0"
                      />
                      <lebel> No</lebel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="select-option flex items-center gap-[40px] mt-10"
            onClick={toggleDropdownCompletionTracking}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              3
            </h1>
            <p className="text-[25px] font-bold">Completion Tracking</p>
            {!isOpenCompletionTracking && (
              <img className="w-6" src={arrowright} alt=""></img>
            )}

            {isOpenCompletionTracking && <img src={arrowDown} alt=""></img>}

            <i
              className={`dropdown-arrow ${
                isOpenCompletionTracking ? "open" : ""
              }`}
            ></i>
          </div>

          {isOpenCompletionTracking && (
            <div className="dropdown-menu mt-[71px] mb-[45px] flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between ">
              <div>
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Enable Completion Tracking
                    </p>
                  </div>

                  <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                    <div className="">
                      <input
                        type="radio"
                        id="Yes"
                        name="enableCompletionTracking"
                        value="1"
                      />
                      <lebel> Yes</lebel>
                    </div>
                    <div className=" ms-[55px]">
                      <input
                        type="radio"
                        id="No"
                        name="enableCompletionTracking"
                        value="0"
                      />
                      <lebel> No</lebel>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Enable Drip</p>
                  </div>

                  <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                    <div className="">
                      <input
                        type="radio"
                        id="Yes"
                        name="enableDrip"
                        checked={enableDrip === true}
                        onChange={() => setEnableDrip(true)}
                      />
                      <lebel> Yes</lebel>
                    </div>
                    <div className=" ms-[55px]">
                      <input
                        type="radio"
                        id="No"
                        name="enableDrip"
                        checked={enableDrip === false}
                        onChange={() => setEnableDrip(false)}
                      />
                      <lebel> No</lebel>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Show activity completion conditions
                    </p>
                  </div>

                  <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                    <div className="">
                      <input
                        type="radio"
                        id="Yes"
                        name="showactivitycompletionconditions"
                        value="1"
                      />
                      <lebel> Yes</lebel>
                    </div>
                    <div className=" ms-[55px]">
                      <input
                        type="radio"
                        id="No"
                        name="showactivitycompletionconditions"
                        value="0"
                      />
                      <lebel> No</lebel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center mt-20 mb-10">
            <input
              type="submit"
              value="Save"
              onClick={() => setSubmitPermission(true)}
              className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
            />
            {/* <input
              type="submit"
              value="Save & Display"
              className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
            /> */}
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default CreateCourse;
