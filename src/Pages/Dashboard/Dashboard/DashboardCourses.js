import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";

const DashboardCourses = ({ myCoursesChecked, allCoursesChecked }) => {
    const [courses, setCourses] = useState([]);
    const [myCourses, setMyCourses] = useState([]);
    const Role = localStorage.getItem("role");
    const { userInfo } = useContext(AuthContext);
    const [shown, setShown] = useState(0);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`)
            .then((response) => {
                setCourses(response?.data);
            })
            .catch((error) => console.error(error));

        axios
            .get(`${process.env.REACT_APP_SERVER_API}/api/v1/courses/userId/${userInfo._id}`)
            .then((response) => {
                setMyCourses(response?.data);
            })
            .catch((error) => console.error(error));

    }, [userInfo, allCoursesChecked]);


    // console.log("userInfo ============>", userInfo);

    return (
        <div className='px-8'>
            {
                myCoursesChecked &&
                <>
                    <div className="flex items-center justify-between pt-20 lg:pt-[40px]  ">
                        <h1 className="text-[28px] font-[700] ">My courses</h1>
                        <Link to={'/courseAccess?state=myCourses'} className='text-blue text-xl hover:text-opacity-60'>See All</Link>
                        {
                            /* <div className="flex items-center ">
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
                    </div> */
                        }
                    </div>
                    <div className="my-[60px] ">
                        <div className={`flex flex-wrap ${myCourses.length<=2 ? "justify-start gap-x-14":"justify-between gap-x-2"}  gap-y-5`}>
                            {myCourses.slice(0, 3)?.map((course, index) => {
                                const date = new Date(course?.courseStartingDate);
                                const options = {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                };

                                return (
                                    <div key={index} className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]">
                                        <Link to={`/questLevels/${course?._id}`} onClick={(e) => e.stopPropagation()}>
                                            <div className="card-content">
                                                <img
                                                    className="w-full rounded-lg"
                                                    src={course?.courseThumbnail ? course?.courseThumbnail : CourseTham}
                                                    alt="CourseTham"
                                                />
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

                                        <div className={`${Role === "admin" ? "block" : "hidden"} relative`}>
                                            <button
                                                // onClick={(e) => {
                                                //     e.stopPropagation();
                                                //     if (clickedCourse === course) setClickedCourse(null);
                                                //     else setClickedCourse(course);
                                                // }}
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
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            }
            {
                allCoursesChecked &&
                <>
                    <div className="flex items-center justify-between pt-20 lg:pt-[40px]  ">
                        <h1 className="text-[28px] font-[700] ">All courses</h1>
                        <Link to={'/courseAccess?state=allCourses'} className='text-blue text-xl hover:text-opacity-60'>See All</Link>
                    </div>
                    <div className="my-[60px] ">
                        <div className={`flex flex-wrap ${courses.length<=2 ? "justify-start gap-x-14":"justify-between gap-x-2"}  gap-y-5`}>
                            {courses?.slice(0, 3)?.map((course, index) => {
                                const date = new Date(course?.courseStartingDate);
                                const options = {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                };

                                return (
                                    <div key={index} className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]">
                                        <Link to={`/questLevels/${course?._id}`} onClick={(e) => e.stopPropagation()}>
                                            <div className="card-content">
                                                <img
                                                    className="w-full rounded-lg"
                                                    src={course?.courseThumbnail ? course?.courseThumbnail : CourseTham}
                                                    alt="CourseTham"
                                                />
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

                                        <div className={`${Role === "admin" ? "block" : "hidden"} relative`}>
                                            <button
                                                // onClick={(e) => {
                                                //     e.stopPropagation();
                                                //     if (clickedCourse === course) setClickedCourse(null);
                                                //     else setClickedCourse(course);
                                                // }}
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
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default DashboardCourses;