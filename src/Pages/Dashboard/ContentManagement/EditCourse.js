import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import arrowDown from "../../../assets/SkillsManagement/arrow.svg";
import arrowright from "../../../assets/SkillsManagement/arrowright.svg";
import required from "../../../assets/ContentManagement/required.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Level from "../Dashboard/Level";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Loading from "../../Shared/Loading/Loading";

const EditCourse = () => {
  const { id } = useParams();
  const [isOpenGeneralCourseInfo, setisOpenGeneralCourseInfo] = useState(true);
  const [isOpenCourseFormat, setisOpenCourseFormat] = useState(false);
  const [isOpenCompletionTracking, setisOpenCompletionTracking] =
    useState(false);
  const rootUrl = window.location.origin;
  // console.log(rootUrl);
  const [courseCategories, setCourseCategories] = useState();
  const [courseCategoryInput, setCourseCategoryInput] = useState("");

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
  // addcoursecategory
  const [isOpenaddcoursecategory, setIsOpenaddcoursecategory] = useState(false);

  const openModaladdcoursecategory = () => {
    setIsOpenaddcoursecategory(true);
  };

  const closeModaladdcoursecategory = () => {
    setIsOpenaddcoursecategory(false);
  };

  //file upload
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [url, setUrl] = useState("");

  const { user, userInfo } = useContext(AuthContext);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [courseData, setCourseData] = useState({});
  const [enableDrip, setEnableDrip] = useState();
  const [courseVisibility, setCourseVisibility] = useState();
  const router = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${id}`)
      .then((response) => {
        setCourseData(response?.data);
        setEnableDrip(response?.data?.enableDrip);
        setCourseVisibility(response?.data?.courseVisibility);
      })
      .catch((error) => console.error(error));
  }, [id]);
  // console.log(courseData);
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
    // const courseVisibility = +form.courseVisibility?.value;
    const courseIDNumber = form.courseIDNumber?.value;
    const courseFormat = form.courseFormat?.value;
    const gradesFormat = form.gradesFormat?.value;
    const groups = form.groups?.value;
    const showactivitydates = +form.showactivitydates?.value;
    const numberOfWeeks = +form.numberofWeeks?.value;
    const showactivityreports = +form.showactivityreports?.value;
    const enableCompletionTracking = +form.enableCompletionTracking?.value;

    const price = form.price?.value;
    const showactivitycompletionconditions =
      +form.showactivitycompletionconditions?.value;
    const coursePurchaseUrl = "" + form.coursePurchaseUrl?.value;
    const enableDrip = form.enableDrip?.value === "false" ? false : true;
    const courseVisibility =
      form.courseVisibility?.value === "false" ? false : true;
    const expirationDay = form.expirationDay?.value;
    const courseInitialUrl = form.courseInitialUrl?.value;

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
      courseThumbnail: fileUrl ? fileUrl : courseData?.courseThumbnail,
      courseVisibility,
      courseIDNumber,
      courseFormat,
      gradesFormat,
      price,
      groups,
      showactivitydates,
      numberOfWeeks,
      courseInitialUrl,
      // coursePurchaseUrl,
      expirationDay,
      // weekChapterName: formData,
      showactivityreports,
      enableCompletionTracking,
      enableDrip,
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
      const newCourse = await axios.put(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${id}`,
        addCourse
      );
      // console.log("new course --> ", newCourse);
      // console.log(newCourse?.data?.course?.acknowledged);

      if (newCourse?.data?.acknowledged) {
        toast.success("Course Edited Successfully");
        router("/courseAccess");
        form.reset();
      }

      // console.log("Add Course----->", addCourse);
    }
    Loading().close();
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

  return (
    <div>
      <Layout>
        <img
          src={
            "https://experiment-labs-my-bucket.s3.eu-north-1.amazonaws.com/Clip%20path%20group%20(1).png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVT26GH52EUHJTF4V%2F20230720%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20230720T051545Z&X-Amz-Expires=900&X-Amz-Signature=355530f5391cdf9769b35bfcc14b3b29d5e0e82984c812702f7981ca416b34dc&X-Amz-SignedHeaders=host"
          }
          alt=""
        />
        <div className="text-[#3E4DAC] text-[26px] mt-20 lg:mt-0 font-bold border-b border-b-[#A4A4A4] py-[35px] ps-[40px]">
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
                    defaultValue={courseData?.courseFullName}
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
                    defaultValue={courseData?.courseShortName}
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
                    defaultValue={courseData?.courseStartingDate}
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
                    defaultValue={courseData?.courseEndingDate}
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
                    defaultValue={courseData?.courseDescription}
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
                  <div className="flex">
                    <button
                      onMouseDown={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            `${rootUrl}/payment/${id}`
                          );
                          toast.success("Url Copied!");
                        } catch (err) {
                          console.error("Unable to copy to clipboard", err);
                        }
                      }}
                      className="mt-6 ms-6 border rounded-l-md lg:w-fit w-[80%] h-[50px] p-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {`${rootUrl}/payment/${id}`}
                    </button>
                    <button
                      className="mt-6 border rounded-r-md w-fit h-[50px] p-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            `${rootUrl}/payment/${id}`
                          );
                          toast.success("Url Copied!");
                        } catch (err) {
                          console.error("Unable to copy to clipboard", err);
                        }
                      }}
                    >
                      <FileCopyIcon />
                    </button>
                  </div>
                </div>
                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Course initial url
                    </p>
                  </div>
                  <div className="flex">
                    <input
                      className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="courseInitialUrl"
                      defaultValue={courseData?.courseInitialUrl}
                      type="url"
                      placeholder="https://www.google.com/"
                    />
                    {/*   <button
                      onMouseDown={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            `${courseData?.courseInitialUrl}`
                          );
                          toast.success("Url Copied!");
                        } catch (err) {
                          console.error("Unable to copy to clipboard", err);
                        }
                      }}
                      className="mt-6 ms-6 border rounded-l-md w-fit h-[50px] p-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    >{`${courseData?.courseInitialUrl}`}
                    </button> */}
                    <button
                      className="mt-6 border rounded-r-md w-fit h-[50px] p-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            `${courseData?.courseInitialUrl}`
                          );
                          toast.success("Url Copied!");
                        } catch (err) {
                          console.error("Unable to copy to clipboard", err);
                        }
                      }}
                    >
                      <FileCopyIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="">
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
                      className="w-full bg-[#F6F7FF] text-base font-semibold focus:outline-0"
                      name="courseCategory"
                    >
                      {/* Default option */}

                      {categoryName ? (
                        <option value={categoryName}>{categoryName}</option>
                      ) : (
                        <option defaultValue={courseData?.courseCategory || ""}>
                          {courseData?.courseCategory
                            ? courseData?.courseCategory
                            : ""}
                        </option>
                      )}

                      {/* Map over courseCategories and render options */}
                      {courseCategories?.courseCategories?.map((category) => (
                        <option
                          key={category?.categoryName}
                          className="text-[#3E4DAC]"
                          value={category?.categoryName}
                        >
                          {category?.categoryName}
                        </option>
                      ))}
                    </select>

                    <div
                      onClick={openModaladdcoursecategory}
                      className="w-[96px] bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center"
                    >
                      <p className="text-2xl">+</p>
                      <div>
                        <p className="w-full">Add</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {isOpenaddcoursecategory && (
                      <div className="modal-overla lg:w-[438px] w-[100%] h-[325px] rounded-md mt-3 bg-[#fff] border">
                        <div className="modal-content">
                          <div className="border-b flex justify-between items-center pt-6 px-10 pb-5 text-[#3E4DAC] text-xl font-bold">
                            <p>Add Course Category</p>
                            <p
                              onClick={closeModaladdcoursecategory}
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

                <div className="mt-20">
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
                        defaultValue={courseData?.courseThumbnail}
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
                        checked={courseVisibility === true}
                        onChange={() => setCourseVisibility(true)}
                      />
                      <lebel> Show</lebel>
                    </div>
                    <div className=" ms-[55px]">
                      <input
                        type="radio"
                        id="No"
                        name="courseVisibility"
                        value={false}
                        checked={courseVisibility === false}
                        onChange={() => setCourseVisibility(false)}
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
                      defaultValue={courseData?.courseIDNumber}
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
                      defaultValue={courseData?.expirationDay}
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
                      defaultValue={courseData?.price}
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
            <div className="dropdown-menu mt-[71px] mb-[45px] flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between me-10">
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
                      defaultValue={courseData?.courseFormat}
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
                      defaultValue={courseData?.gradesFormate}
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
                      defaultValue={courseData?.groups}
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
                      defaultValue={courseData?.numberOfWeeks}
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
                        value={true}
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
                        value={false}
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

export default EditCourse;
