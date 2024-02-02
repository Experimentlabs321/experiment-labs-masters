import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import Locked from "../../../assets/Dashboard/Locked.png";

const CourseAccess = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [showCourses, setShowCourses] = useState([]);
  const [stateParams, setStateParams] = useState("myCourses");
  const [clickedCourse, setClickedCourse] = useState();
  const [selectedOption, setSelectedOption] = useState("Category");
  const [filterData, setFilterData] = useState([]);
  const options = ["Category name"];
  const Role = localStorage.getItem("role");
  const { userInfo } = useContext(AuthContext);
  const location = useLocation();

  console.log(userInfo);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const stateParam = queryParams.get("state");
    setStateParams(stateParam || stateParams);

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
  }, [userInfo, location]);

  useEffect(() => {
    stateParams === "myCourses"
      ? setShowCourses(myCourses)
      : setShowCourses(courses);
  }, [myCourses, courses]);
  console.log(stateParams);

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
                   /*  setFilteredStudents(
                      courses?.filter((student) => {
                        return Object.keys(student).some((key) =>
                          student[key]
                            ?.toString()
                            .toLowerCase()
                            .includes(e.target.value.toString().toLowerCase())
                        );
                      })
                    ); */
                  }}
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
            </div>
          </div>
          <div className="mt-[80px] flex items-center justify-between">
            <div className="flex gap-8">
             {/*  <button
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
              </button> */}
              <button
                onClick={() => {
                  setStateParams("allCourses");
                  setShowCourses(courses);
                }}
                className={`text-[18px] font-[700] ${
                  stateParams === "allCourses"
                    ? "text-[#3E4DAC] underline"
                    : "text-black no-underline"
                }`}
              >
                All Courses
              </button>
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
                <ul className="absolute top-full left-0 w-full border border-[#FF557A] bg-white border-t-0 py-1 px-4 rounded-b-[8px] mt-1 transform translate-y-[-10px] shadow-[0px_2px_4px_0px_#00000026]">
                  {options.map((option, index) => (
                    <li
                      key={index}
                      className="cursor-pointer py-2 text-[#6A6A6A] text-[14px] font-[400] "
                      onClick={() => selectOption(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="my-[60px] ">
            <div
              className={`flex flex-wrap ${
                showCourses.length <= 2
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
                return (
                  <div
                    key={index}
                    className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]"
                  >
                    <Link
                      to={
                        Role !== "admin" &&
                        stateParams === "allCourses" &&
                        !myCourses?.find((item) => item?._id === course?._id)
                          ? course?.coursePurchaseUrl
                          : `/questLevels/${course?._id}`
                      }
                      target={
                        Role !== "admin" &&
                        stateParams === "allCourses" &&
                        !myCourses?.find((item) => item?._id === course?._id)
                          ? "_blank"
                          : "_self"
                      }
                      onClick={(e) => e.stopPropagation()}
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
                          {Role !== "admin" &&
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
                        </div>
                        <h1 className="text-[#3E4DAC] text-[16px] font-[800] mt-[16px] mb-[12px]">
                          {course?.courseFullName}
                        </h1>
                        <p className="text-[#7A7A7A] text-[12px] font-[500] mb-[16px]">
                          {course?.courseDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="bg-[#E1D7FF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                            {course?.courseCategory}
                          </p>
                          <button className="bg-[#CEDBFF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                            {date?.toLocaleDateString("en-US", options)}
                          </button>
                        </div>
                      </div>
                    </Link>

                    <div
                      className={`${
                        Role === "admin" ? "block" : "hidden"
                      } relative`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (clickedCourse === course) setClickedCourse(null);
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
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CourseAccess;
