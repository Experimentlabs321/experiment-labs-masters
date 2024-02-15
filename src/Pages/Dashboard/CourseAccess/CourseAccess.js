import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import Locked from "../../../assets/Dashboard/Locked.png";
import Expired from "../../../assets/Dashboard/Expired.png";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";

const CourseAccess = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [showCourses, setShowCourses] = useState([]);
  const [clickedCourse, setClickedCourse] = useState();
  const [selectedOption, setSelectedOption] = useState("Category");
  const [filterData, setFilterData] = useState([]);
  const [bundles, setBundles] = useState([]);
  const options = ["Category name"];
  const Role = localStorage.getItem("role");
  const [stateParams, setStateParams] = useState(
    Role === "user" ? "myCourses" : "allCourses"
  );
  const [courseCategories, setCourseCategories] = useState();
  const { userInfo } = useContext(AuthContext);
  const location = useLocation();

  const router = useNavigate();

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    Loading();
    const queryParams = new URLSearchParams(location.search);
    const stateParam = queryParams.get("state");
    if (stateParam) setStateParams(stateParam);

    const fetchAllData = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/courses/userId/${userInfo._id}`
        )
        .then((response) => {
          setMyCourses(response?.data);
        })
        .catch((error) => console.error(error));
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setCourses(response?.data);
          setFilterData(response?.data);
        })
        .catch((error) => console.error(error));
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/bundles/organizationId/${userInfo.organizationId}`
        )
        .then((response) => {
          setBundles(response?.data);
        })
        .catch((error) => console.error(error));

      Loading().close();
    };
    fetchAllData();
  }, [location, userInfo]);

  useEffect(() => {
    if (stateParams === "myCourses") setShowCourses(myCourses);
    else if (stateParams === "allCourses") setShowCourses(courses);
    else if (stateParams === "bundles") setShowCourses(bundles);
  }, [myCourses, courses, stateParams, Role, bundles]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/CourseCategory/getCourseCategory/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourseCategories(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  useEffect(() => {
    if (selectedOption !== "Category") {
      if (stateParams === "myCourses") {
        const filteredCourses = myCourses?.filter(
          (item) => item?.courseCategory === selectedOption
        );
        setShowCourses(filteredCourses);
      } else if (stateParams === "allCourses") {
        const filteredCourses = courses?.filter(
          (item) => item?.courseCategory === selectedOption
        );
        setShowCourses(filteredCourses);
      }
    }
  }, [selectedOption]);
  console.log(selectedOption);

  // useEffect(() => {
  //   if (stateParams === "myCourses") {
  //     Loading();
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_SERVER_API}/api/v1/courses/userId/${userInfo._id}`
  //       )
  //       .then((response) => {
  //         setShowCourses(response?.data);
  //         Loading().close();
  //       })
  //       .catch((error) => console.error(error));
  //   } else if (stateParams === "allCourses") {
  //     Loading();
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_SERVER_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
  //       )
  //       .then((response) => {
  //         setShowCourses(response?.data);
  //         setFilterData(response?.data);
  //         Loading().close();
  //       })
  //       .catch((error) => console.error(error));
  //   } else if (stateParams === "bundles") {
  //     Loading();
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_SERVER_API}/api/v1/bundles/organizationId/${userInfo.organizationId}`
  //       )
  //       .then((response) => {
  //         setShowCourses(response?.data);
  //         Loading().close();
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // }, [userInfo, stateParams]);

  const daysDifferenceFromEnrolled = (enrolledDate) => {
    // Get the current date
    const currentDate = new Date();

    // Replace the following line with the specific date you want to compare
    const specificDate = new Date(enrolledDate); // Example: January 1, 2023

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - specificDate;

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const handelExpire = (course) => {
    Swal.fire({
      title: "Validity Expired",
      text: "You have to renew if you want to access the course!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Renew now!",
    }).then((result) => {
      if (result.isConfirmed) {
        router(`/payment/${course?._id}`);
      }
    });
  };

  return (
    <div>
      <Layout>
        <div className="px-4">
          <div className="flex items-center justify-between pt-20 lg:pt-[40px]  ">
            <h1 className="text-[28px] font-[700] ">My courses</h1>
            <div className="flex items-center ">
              <div className="relative">
                <img
                  className="absolute top-[16px] left-[12px]"
                  src={SearchIcon}
                  alt="SearchIcon"
                />
                <input
                  onChange={(e) => {
                    setFilterData(
                      courses?.filter((course) => {
                        return Object.keys(course).some((key) =>
                          course[key]
                            ?.toString()
                            .toLowerCase()
                            .includes(e.target.value.toString().toLowerCase())
                        );
                      })
                    );
                  }}
                  className="rounded-[20px] bg-[#EEEEEE] py-[16px] pl-[40px] pr-[10px]"
                  placeholder="Search"
                  type="text"
                />
              </div>
              {Role === "admin" && (
                <div className="">
                  <Link
                    to="/createBundle"
                    className="w-[210.40px] ml-[100px] h-[46.40px] px-4 py-3 bg-[#3E4DAC] rounded-[8.86px] justify-start items-center gap-2 inline-flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="24"
                      viewBox="0 0 23 24"
                      fill="none"
                    >
                      <path
                        d="M17.7346 11.0658H12.1346V5.46582H10.268V11.0658H4.66797V12.9325H10.268V18.5325H12.1346V12.9325H17.7346V11.0658Z"
                        fill="white"
                      />
                    </svg>
                    <h1 className="text-white text-base font-bold">
                      Create new bundle
                    </h1>
                  </Link>
                </div>
              )}
              {Role === "admin" && (
                <div className="">
                  <Link
                    to="/createCourse"
                    className="w-[206.40px] ml-[100px] h-[46.40px] px-4 py-3 bg-[#3E4DAC] rounded-[8.86px] justify-start items-center gap-2 inline-flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="24"
                      viewBox="0 0 23 24"
                      fill="none"
                    >
                      <path
                        d="M17.7346 11.0658H12.1346V5.46582H10.268V11.0658H4.66797V12.9325H10.268V18.5325H12.1346V12.9325H17.7346V11.0658Z"
                        fill="white"
                      />
                    </svg>
                    <h1 className="text-white text-base font-bold">
                      Create new course
                    </h1>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="mt-[80px] flex items-center justify-between">
            <div className="flex gap-8">
              {Role === "user" && (
                <button
                  onClick={() => {
                    setStateParams("myCourses");
                    setShowCourses(myCourses);
                  }}
                  className={`text-[18px] font-[700] ${
                    stateParams === "myCourses"
                      ? "text-[#3E4DAC] underline"
                      : "text-black no-underline"
                  }`}
                >
                  My Courses
                </button>
              )}
              <button
                onClick={() => {
                  setStateParams("allCourses");
                  setShowCourses(filterData);
                }}
                className={`text-[18px] font-[700] ${
                  stateParams === "allCourses"
                    ? "text-[#3E4DAC] underline"
                    : "text-black no-underline"
                }`}
              >
                All Courses
              </button>
              {/* <button
                onClick={() => {
                  setStateParams("bundles");
                  setShowCourses(bundles);
                }}
                className={`text-[18px] font-[700] ${
                  stateParams === "bundles"
                    ? "text-[#3E4DAC] underline"
                    : "text-black no-underline"
                }`}
              >
                Bundles
              </button> */}
              {/* <button className="pr-[60px] text-[18px] font-[500] ">
                Active
              </button>
              <button className="pr-[60px] text-[18px] font-[500] ">
                Upcoming
              </button>
              <button className="pr-[60px] text-[18px] font-[500] ">
                Completed
              </button> */}
            </div>
            <div className="relative inline-block">
              <div
                className="cursor-pointer border border-[#FF557A] text-[14px] font-[500] py-2 px-4 rounded-[8px] shadow-[0px_2px_4px_0px_#00000026] "
                onClick={toggleOptions}
              >
                Sort By:{" "}
                <span className="text-[#3E4DAC] ">{selectedOption}</span>
              </div>
              {isOpen && (
                <ul className="absolute top-full z-10 left-0 w-full border border-[#FF557A] bg-white border-t-0 py-1 px-4 rounded-b-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                  {courseCategories?.courseCategories?.map((option, index) => (
                    <li
                      key={index}
                      className="cursor-pointer py-2 text-[#6A6A6A] text-[14px] font-[400] "
                      onClick={() => selectOption(option?.categoryName)}
                    >
                      {option?.categoryName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mb-[60px] mt-[20px] ">
            {stateParams === "allCourses" && (
              <button
                onClick={() => {
                  setStateParams("bundles");
                  setShowCourses(bundles);
                }}
                className={`text-[18px] font-[700] bg-[#677bff0a] rounded-md px-2 py-1 mb-5 ${
                  stateParams !== "bundles"
                    ? "text-[#3E4DAC] "
                    : "text-black no-underline"
                }`}
              >
                Show Bundles
              </button>
            )}
            {stateParams !== "bundles" && (
              <div
                className={`flex flex-wrap ${
                  showCourses?.length <= 2
                    ? "justify-start gap-x-14"
                    : "justify-between gap-x-2"
                }  gap-y-5`}
              >
                {showCourses?.map((course, index) => {
                  const date = new Date(course?.courseStartingDate);
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const enrolledDate = new Date(
                    userInfo?.courses?.find(
                      (item) => item?.courseId === course?._id
                    )?.enrollDate
                  );
                  const remainingDay =
                    parseInt(course?.expirationDay) -
                    daysDifferenceFromEnrolled(enrolledDate);
                  return (
                    <>
                      {Role === "admin" ? (
                        <div
                          key={index}
                          className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]"
                        >
                          <Link
                            to={
                              Role === "user" && remainingDay < 0
                                ? {}
                                : Role === "user" &&
                                  stateParams === "allCourses" &&
                                  !userInfo?.courses?.find(
                                    (item) => item?.courseId === course?._id
                                  )
                                ? `/payment/${course?._id}`
                                : `/questLevels/${course?._id}`
                            }
                            target={
                              Role === "user" &&
                              stateParams === "allCourses" &&
                              !userInfo?.courses?.find(
                                (item) => item?.courseId === course?._id
                              )
                                ? "_blank"
                                : "_self"
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              if (Role === "user" && remainingDay < 0) {
                                handelExpire(course);
                              }
                            }}
                          >
                            <div className="card-content">
                              <div className="relative">
                                <img
                                  className="w-full rounded-lg"
                                  src={
                                    course?.courseThumbnail
                                      ? course?.courseThumbnail
                                      : CourseTham
                                  }
                                  alt="CourseTham"
                                />
                                {Role === "user" &&
                                  stateParams === "allCourses" &&
                                  !userInfo?.courses?.find(
                                    (item) => item?.courseId === course?._id
                                  ) && (
                                    <div className="w-full h-full absolute top-0 flex items-center justify-center bg-[#ffffffb6]">
                                      <img
                                        className=" w-[50px]"
                                        src={Locked}
                                        alt="CourseTham"
                                      />
                                    </div>
                                  )}
                                {Role === "user" && remainingDay < 0 && (
                                  <div className="w-full h-full absolute top-0 flex items-center justify-center bg-[#ffffffb6]">
                                    <img
                                      className=" "
                                      src={Expired}
                                      alt="CourseTham"
                                    />
                                  </div>
                                )}
                              </div>
                              <h1 className="text-[#3E4DAC] text-[16px] font-[800] mt-[16px] mb-[12px]">
                                {course?.courseFullName}
                              </h1>
                              <p className="text-[#7A7A7A] text-[12px] font-[500] mb-[16px]">
                                {course?.courseDescription}
                              </p>
                              {/* <div className="flex items-center justify-between">
                        <p className="bg-[#E1D7FF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                          {course?.courseCategory}
                        </p>
                        <button className="bg-[#CEDBFF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                          {date?.toLocaleDateString("en-US", options)}
                        </button>
                      </div> */}
                            </div>
                          </Link>
                          <div className="flex items-center justify-between">
                            <div>
                              {course?.courseVisibility === false ? (
                                <div className="text-red-500 py-1 px-2 border-2 border-red-500 font-bold rounded-full">
                                  Unpublished
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div
                              className={`${
                                Role === "admin" ? "block" : "hidden"
                              } relative`}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (clickedCourse === course)
                                    setClickedCourse(null);
                                  else setClickedCourse(course);
                                }}
                                className="bg-black relative mt-[24px] p-[3px] rounded-full float-right"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M9.9987 8.33301C9.08203 8.33301 8.33203 9.08301 8.33203 9.99967C8.33203 10.9163 9.08203 11.6663 9.9987 11.6663C10.9154 11.6663 11.6654 10.9163 11.6654 9.99967C11.6654 9.08301 10.9154 8.33301 9.9987 8.33301ZM9.9987 3.33301C9.08203 3.33301 8.33203 4.08301 8.33203 4.99967C8.33203 5.91634 9.08203 6.66634 9.9987 6.66634C10.9154 6.66634 11.6654 5.91634 11.6654 4.99967C11.6654 4.08301 10.9154 3.33301 9.9987 3.33301ZM9.9987 13.333C9.08203 13.333 8.33203 14.083 8.33203 14.9997C8.33203 15.9163 9.08203 16.6663 9.9987 16.6663C10.9154 16.6663 11.6654 15.9163 11.6654 14.9997C11.6654 14.083 10.9154 13.333 9.9987 13.333Z"
                                    fill="white"
                                  />
                                </svg>
                                {clickedCourse === course && (
                                  <ul className="absolute right-0 bottom-[17px] w-max border bg-[#141414] border-t-0 p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                                    <li className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600]">
                                      <Link
                                        to={`/editCourse/${course?._id}`}
                                        onClick={() =>
                                          console.log("Edit Course Details")
                                        }
                                      >
                                        Edit Course Details
                                      </Link>
                                    </li>
                                    <li className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600]">
                                      <Link to={`/questLevels/${course?._id}`}>
                                        Edit Course Contents
                                      </Link>
                                    </li>
                                  </ul>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        course?.courseVisibility !== false && (
                          <div
                            key={index}
                            className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]"
                          >
                            <Link
                              to={
                                Role === "user" && remainingDay < 0
                                  ? {}
                                  : Role === "user" &&
                                    stateParams === "allCourses" &&
                                    !userInfo?.courses?.find(
                                      (item) => item?.courseId === course?._id
                                    )
                                  ? `/payment/${course?._id}`
                                  : `/questLevels/${course?._id}`
                              }
                              target={
                                Role === "user" &&
                                stateParams === "allCourses" &&
                                !userInfo?.courses?.find(
                                  (item) => item?.courseId === course?._id
                                )
                                  ? "_blank"
                                  : "_self"
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                if (Role === "user" && remainingDay < 0) {
                                  handelExpire(course);
                                }
                              }}
                            >
                              <div className="card-content">
                                <div className="relative">
                                  <img
                                    className="w-full rounded-lg"
                                    src={
                                      course?.courseThumbnail
                                        ? course?.courseThumbnail
                                        : CourseTham
                                    }
                                    alt="CourseTham"
                                  />
                                  {Role === "user" &&
                                    stateParams === "allCourses" &&
                                    !userInfo?.courses?.find(
                                      (item) => item?.courseId === course?._id
                                    ) && (
                                      <div className="w-full h-full absolute top-0 flex items-center justify-center bg-[#ffffffb6]">
                                        <img
                                          className=" w-[50px]"
                                          src={Locked}
                                          alt="CourseTham"
                                        />
                                      </div>
                                    )}
                                  {Role === "user" && remainingDay < 0 && (
                                    <div className="w-full h-full absolute top-0 flex items-center justify-center bg-[#ffffffb6]">
                                      <img
                                        className=" "
                                        src={Expired}
                                        alt="CourseTham"
                                      />
                                    </div>
                                  )}
                                </div>
                                <h1 className="text-[#3E4DAC] text-[16px] font-[800] mt-[16px] mb-[12px]">
                                  {course?.courseFullName}
                                </h1>
                                <p className="text-[#7A7A7A] text-[12px] font-[500] mb-[16px]">
                                  {course?.courseDescription}
                                </p>
                                {/* <div className="flex items-center justify-between">
                          <p className="bg-[#E1D7FF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                            {course?.courseCategory}
                          </p>
                          <button className="bg-[#CEDBFF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                            {date?.toLocaleDateString("en-US", options)}
                          </button>
                        </div> */}
                              </div>
                            </Link>
                            <div className="flex items-center justify-between">
                              <div>
                                {course?.courseVisibility === false ? (
                                  <div className="text-red-500 py-1 px-2 border-2 border-red-500 font-bold rounded-full">
                                    Unpublished
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div
                                className={`${
                                  Role === "admin" ? "block" : "hidden"
                                } relative`}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (clickedCourse === course)
                                      setClickedCourse(null);
                                    else setClickedCourse(course);
                                  }}
                                  className="bg-black relative mt-[24px] p-[3px] rounded-full float-right"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.9987 8.33301C9.08203 8.33301 8.33203 9.08301 8.33203 9.99967C8.33203 10.9163 9.08203 11.6663 9.9987 11.6663C10.9154 11.6663 11.6654 10.9163 11.6654 9.99967C11.6654 9.08301 10.9154 8.33301 9.9987 8.33301ZM9.9987 3.33301C9.08203 3.33301 8.33203 4.08301 8.33203 4.99967C8.33203 5.91634 9.08203 6.66634 9.9987 6.66634C10.9154 6.66634 11.6654 5.91634 11.6654 4.99967C11.6654 4.08301 10.9154 3.33301 9.9987 3.33301ZM9.9987 13.333C9.08203 13.333 8.33203 14.083 8.33203 14.9997C8.33203 15.9163 9.08203 16.6663 9.9987 16.6663C10.9154 16.6663 11.6654 15.9163 11.6654 14.9997C11.6654 14.083 10.9154 13.333 9.9987 13.333Z"
                                      fill="white"
                                    />
                                  </svg>
                                  {clickedCourse === course && (
                                    <ul className="absolute right-0 bottom-[17px] w-max border bg-[#141414] border-t-0 p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                                      <li className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600]">
                                        <Link
                                          to={`/editCourse/${course?._id}`}
                                          onClick={() =>
                                            console.log("Edit Course Details")
                                          }
                                        >
                                          Edit Course Details
                                        </Link>
                                      </li>
                                      <li className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600]">
                                        <Link
                                          to={`/questLevels/${course?._id}`}
                                        >
                                          Edit Course Contents
                                        </Link>
                                      </li>
                                    </ul>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </>
                  );
                })}
              </div>
            )}
            {stateParams === "bundles" && (
              <div
                className={`flex flex-wrap ${
                  showCourses?.length <= 2
                    ? "justify-start gap-x-14"
                    : "justify-between gap-x-2"
                }  gap-y-5`}
              >
                {showCourses?.map((course, index) => {
                  const date = new Date(course?.bundleStartingDate);
                  const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  };
                  const enrolledDate = new Date(
                    userInfo?.courses?.find(
                      (item) => item?.courseId === course?._id
                    )?.enrollDate
                  );
                  const remainingDay =
                    parseInt(course?.expirationDay) -
                    daysDifferenceFromEnrolled(enrolledDate);
                  // console.log(remainingDay);
                  return (
                    <>
                      {Role === "admin" ? (
                        <div
                          key={index}
                          className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]"
                        >
                          <Link
                            to={
                              Role === "user" && remainingDay < 0
                                ? {}
                                : Role === "user" &&
                                  stateParams === "allCourses" &&
                                  !myCourses?.find(
                                    (item) => item?._id === course?._id
                                  )
                                ? `/payment/${course?._id}`
                                : `/questLevels/${course?._id}`
                            }
                            target={
                              Role === "user" &&
                              stateParams === "allCourses" &&
                              !myCourses?.find(
                                (item) => item?._id === course?._id
                              )
                                ? "_blank"
                                : "_self"
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              if (Role === "user" && remainingDay < 0) {
                                handelExpire(course);
                              }
                            }}
                          >
                            <div className="card-content">
                              <div className="relative">
                                <img
                                  className="w-full rounded-lg"
                                  src={
                                    course?.bundleThumbnail
                                      ? course?.bundleThumbnail
                                      : CourseTham
                                  }
                                  alt="CourseTham"
                                />
                                {Role === "user" &&
                                  stateParams === "allCourses" &&
                                  !myCourses?.find(
                                    (item) => item?._id === course?._id
                                  ) && (
                                    <div className="w-full h-full absolute top-0 flex items-center justify-center bg-[#ffffffb6]">
                                      <img
                                        className=" w-[50px]"
                                        src={Locked}
                                        alt="CourseTham"
                                      />
                                    </div>
                                  )}
                                {Role === "user" && remainingDay < 0 && (
                                  <div className="w-full h-full absolute top-0 flex items-center justify-center bg-[#ffffffb6]">
                                    <img
                                      className=" "
                                      src={Expired}
                                      alt="CourseTham"
                                    />
                                  </div>
                                )}
                              </div>
                              <h1 className="text-[#3E4DAC] text-[16px] font-[800] mt-[16px] mb-[12px]">
                                {course?.bundleFullName}
                              </h1>
                              <p className="text-[#7A7A7A] text-[12px] font-[500] mb-[16px]">
                                {course?.bundleDescription}
                              </p>
                              {/* <div className="flex items-center justify-between">
                        <p className="bg-[#E1D7FF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                          {course?.courseCategory}
                        </p>
                        <button className="bg-[#CEDBFF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                          {date?.toLocaleDateString("en-US", options)}
                        </button>
                      </div> */}
                            </div>
                          </Link>
                          <div className="flex items-center justify-between">
                            <div>
                              {course?.bundleVisibility === false ? (
                                <div className="text-red-500 py-1 px-2 border-2 border-red-500 font-bold rounded-full">
                                  Unpublished
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div
                              className={`${
                                Role === "admin" ? "block" : "hidden"
                              } relative`}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (clickedCourse === course)
                                    setClickedCourse(null);
                                  else setClickedCourse(course);
                                }}
                                className="bg-black relative mt-[24px] p-[3px] rounded-full float-right"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M9.9987 8.33301C9.08203 8.33301 8.33203 9.08301 8.33203 9.99967C8.33203 10.9163 9.08203 11.6663 9.9987 11.6663C10.9154 11.6663 11.6654 10.9163 11.6654 9.99967C11.6654 9.08301 10.9154 8.33301 9.9987 8.33301ZM9.9987 3.33301C9.08203 3.33301 8.33203 4.08301 8.33203 4.99967C8.33203 5.91634 9.08203 6.66634 9.9987 6.66634C10.9154 6.66634 11.6654 5.91634 11.6654 4.99967C11.6654 4.08301 10.9154 3.33301 9.9987 3.33301ZM9.9987 13.333C9.08203 13.333 8.33203 14.083 8.33203 14.9997C8.33203 15.9163 9.08203 16.6663 9.9987 16.6663C10.9154 16.6663 11.6654 15.9163 11.6654 14.9997C11.6654 14.083 10.9154 13.333 9.9987 13.333Z"
                                    fill="white"
                                  />
                                </svg>
                                {clickedCourse === course && (
                                  <ul className="absolute right-0 bottom-[17px] w-max border bg-[#141414] border-t-0 p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                                    <li className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600]">
                                      <Link
                                        to={`/editBundle/${course?._id}`}
                                        onClick={() =>
                                          console.log("Edit Course Details")
                                        }
                                      >
                                        Edit Bundle Details
                                      </Link>
                                    </li>
                                    {/* <li className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600]">
                                      <Link to={`/questLevels/${course?._id}`}>
                                        Edit Course Contents
                                      </Link>
                                    </li> */}
                                  </ul>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        course?.bundleVisibility !== false && (
                          <div
                            key={index}
                            className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]"
                          >
                            <Link
                              to={
                                Role === "user" && remainingDay < 0
                                  ? {}
                                  : Role === "user" &&
                                    stateParams === "bundles" &&
                                    !userInfo?.courses?.find(
                                      (item) => item?.bundleId === course?._id
                                    )
                                  ? `/bundle/payment/${course?._id}`
                                  : `/courseAccess`
                              }
                              target={
                                Role === "user" &&
                                stateParams === "allCourses" &&
                                !myCourses?.find(
                                  (item) => item?._id === course?._id
                                )
                                  ? "_blank"
                                  : "_self"
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                if (Role === "user" && remainingDay < 0) {
                                  handelExpire(course);
                                }
                              }}
                            >
                              <div className="card-content">
                                <div className="relative">
                                  <img
                                    className="w-full rounded-lg"
                                    src={
                                      course?.bundleThumbnail
                                        ? course?.bundleThumbnail
                                        : CourseTham
                                    }
                                    alt="CourseTham"
                                  />
                                  {Role === "user" &&
                                    stateParams === "allCourses" &&
                                    !myCourses?.find(
                                      (item) => item?._id === course?._id
                                    ) && (
                                      <div className="w-full h-full absolute top-0 flex items-center justify-center bg-[#ffffffb6]">
                                        <img
                                          className=" w-[50px]"
                                          src={Locked}
                                          alt="CourseTham"
                                        />
                                      </div>
                                    )}
                                  {Role === "user" && remainingDay < 0 && (
                                    <div className="w-full h-full absolute top-0 flex items-center justify-center bg-[#ffffffb6]">
                                      <img
                                        className=" "
                                        src={Expired}
                                        alt="CourseTham"
                                      />
                                    </div>
                                  )}
                                </div>
                                <h1 className="text-[#3E4DAC] text-[16px] font-[800] mt-[16px] mb-[12px]">
                                  {course?.bundleFullName}
                                </h1>
                                <p className="text-[#7A7A7A] text-[12px] font-[500] mb-[16px]">
                                  {course?.bundleDescription}
                                </p>
                                {/* <div className="flex items-center justify-between">
                          <p className="bg-[#E1D7FF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                            {course?.courseCategory}
                          </p>
                          <button className="bg-[#CEDBFF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                            {date?.toLocaleDateString("en-US", options)}
                          </button>
                        </div> */}
                              </div>
                            </Link>
                            <div className="flex items-center justify-between">
                              <div>
                                {course?.bundleVisibility === false ? (
                                  <div className="text-red-500 py-1 px-2 border-2 border-red-500 font-bold rounded-full">
                                    Unpublished
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div
                                className={`${
                                  Role === "admin" ? "block" : "hidden"
                                } relative`}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (clickedCourse === course)
                                      setClickedCourse(null);
                                    else setClickedCourse(course);
                                  }}
                                  className="bg-black relative mt-[24px] p-[3px] rounded-full float-right"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.9987 8.33301C9.08203 8.33301 8.33203 9.08301 8.33203 9.99967C8.33203 10.9163 9.08203 11.6663 9.9987 11.6663C10.9154 11.6663 11.6654 10.9163 11.6654 9.99967C11.6654 9.08301 10.9154 8.33301 9.9987 8.33301ZM9.9987 3.33301C9.08203 3.33301 8.33203 4.08301 8.33203 4.99967C8.33203 5.91634 9.08203 6.66634 9.9987 6.66634C10.9154 6.66634 11.6654 5.91634 11.6654 4.99967C11.6654 4.08301 10.9154 3.33301 9.9987 3.33301ZM9.9987 13.333C9.08203 13.333 8.33203 14.083 8.33203 14.9997C8.33203 15.9163 9.08203 16.6663 9.9987 16.6663C10.9154 16.6663 11.6654 15.9163 11.6654 14.9997C11.6654 14.083 10.9154 13.333 9.9987 13.333Z"
                                      fill="white"
                                    />
                                  </svg>
                                  {clickedCourse === course && (
                                    <ul className="absolute right-0 bottom-[17px] w-max border bg-[#141414] border-t-0 p-2 rounded-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                                      <li className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600]">
                                        <Link
                                          to={`/editBundle/${course?._id}`}
                                          onClick={() =>
                                            console.log("Edit Course Details")
                                          }
                                        >
                                          Edit Bundle Details
                                        </Link>
                                      </li>
                                      {/* <li className="cursor-pointer p-2 hover:bg-[#5c5c5c5c] rounded-lg w-full text-left text-[#fff] text-[13px] font-[600]">
                                        <Link
                                          to={`/questLevels/${course?._id}`}
                                        >
                                          Edit Course Contents
                                        </Link>
                                      </li> */}
                                    </ul>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CourseAccess;
