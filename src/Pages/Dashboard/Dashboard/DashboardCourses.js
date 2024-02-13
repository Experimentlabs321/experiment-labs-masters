import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import Locked from "../../../assets/Dashboard/Locked.png";
import Expired from "../../../assets/Dashboard/Expired.png";
import Swal from "sweetalert2";

const DashboardCourses = ({ myCoursesChecked, allCoursesChecked, courseAccessUrl }) => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const Role = localStorage.getItem("role");
  const { userInfo } = useContext(AuthContext);
  const [shown, setShown] = useState(0);
  const router = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/courses/userId/${userInfo._id}`
      )
      .then((response) => {
        setMyCourses(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo, allCoursesChecked]);

  // console.log("userInfo ============>", userInfo);

  const daysDifferenceFromEnrolled = (enrolledDate) => {
    // Get the current date
    const currentDate = new Date();

    // Replace the following line with the specific date you want to compare
    const specificDate = new Date(enrolledDate); // Example: January 1, 2023

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - specificDate;

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    console.log(enrolledDate);

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
    <div className="px-8">
      {(myCoursesChecked && myCourses.length > 0) ? (
        <>
          <div className="flex items-center justify-between pt-20 lg:pt-[40px]  ">
            <h1 className="text-[28px] font-[700] ">My courses</h1>
            <Link
              to={"/courseAccess?state=myCourses"}
              className="text-blue text-xl hover:text-opacity-60"
            >
              See All
            </Link>
            {/* <div className="flex items-center ">
                        <div className="relative">
                            <img
                                className="absolute top-[16px] left-[12px]"
                                src={SearchIcon}
                                alt="SearchIcon"
                            />
                            <input
                                className="rounded-[20px] bg-[#EEEEEE] py-[16px] pl-[40px] pr-[10px]"
                                placeholder="Search"
                                type="text"
                            />
                        </div>
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
                    </div> */}
          </div>
          <div className="my-[60px] ">
            <div
              className={`flex flex-wrap ${myCourses.length <= 2
                ? "justify-start gap-x-14"
                : "justify-between gap-x-2"
                }  gap-y-5`}
            >
              {myCourses.slice(0, 3)?.map((course, index) => {
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
                console.log(remainingDay);
                return (
                  <div
                    key={index}
                    className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]"
                  >
                    <Link
                      to={
                        Role === "user" && remainingDay < 0
                          ? {}
                          : !myCourses?.find(
                            (item) => item?._id === course?._id
                          )
                            ? `/payment/${course?._id}`
                            : `/questLevels/${course?._id}`
                      }
                      target={
                        !myCourses?.find((item) => item?._id === course?._id)
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
                          {!myCourses?.find(
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
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) :
        (
          <div className="pt-20 lg:pt-[40px]">
            <h1 className="text-[28px] font-[700] ">My courses</h1>
            <div className="flex flex-col items-center justify-center p-6">

              <p className="text-gray-600 mb-4">You don't have any Active Courses</p>
              {!courseAccessUrl ?
                <Link to={"/courseAccess?state=allCourses"} className="bg-blue text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                  Explore Courses
                </Link> :
                <a href={courseAccessUrl} target="_blank" rel="noreferrer" className="bg-blue text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                  Explore Courses
                </a>
              }
            </div>
          </div>
        )
      }
      {allCoursesChecked && (
        <>
          <div className="flex items-center justify-between pt-20 lg:pt-[40px]  ">
            <h1 className="text-[28px] font-[700] ">All courses</h1>
            <Link
              to={"/courseAccess?state=allCourses"}
              className="text-blue text-xl hover:text-opacity-60"
            >
              See All
            </Link>
          </div>
          <div className="my-[60px] ">
            <div
              className={`flex flex-wrap ${courses.length <= 2
                ? "justify-start gap-x-14"
                : "justify-between gap-x-2"
                }  gap-y-5`}
            >
              {courses?.slice(0, 3)?.map((course, index) => {
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
                console.log(remainingDay);
                return (
                  <div
                    key={index}
                    className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]"
                  >
                    <Link
                      to={
                        Role === "user" && remainingDay < 0
                          ? {}
                          : !myCourses?.find(
                            (item) => item?._id === course?._id
                          )
                            ? `/payment/${course?._id}`
                            : `/questLevels/${course?._id}`
                      }
                      target={
                        !myCourses?.find((item) => item?._id === course?._id)
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
                          {!myCourses?.find(
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
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCourses;
