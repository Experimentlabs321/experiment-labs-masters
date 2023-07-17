import React, { useRef, useState } from "react";
import Layout from "../Layout";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import { Link } from "react-router-dom";
import axios from "axios";

const CourseAccess = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState();
  const [selectedOption, setSelectedOption] = useState("Category");
  const options = ["Category name"];
  const Role = localStorage.getItem("role");

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const params = new URLSearchParams();
  params.append("wstoken", "41dddfcce1f8e59ec0820ca1d47dbda3");
  params.append("wsfunction", "core_course_get_courses");
  params.append("moodlewsrestformat", "json");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  console.log(process.env.Moodal_URL);

  axios
    .post(
      "https://moodle-135099-0.cloudclusters.net/webservice/rest/server.php",
      params,
      config
    )
    .then((result) => {
      // Do somthing
      setCourses(result?.data);
    })
    .catch((err) => {
      // Do somthing
    });
  // console.log(courses[0].timecreated);
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
                  className="rounded-[20px] bg-[#EEEEEE] py-[16px] pl-[40px] pr-[10px]"
                  placeholder="Search"
                  type="text"
                />
              </div>
              {Role === "admin" && (
                <div className="">
                  <button className="w-[206.40px] ml-[100px] h-[46.40px] px-4 py-3 bg-[#3E4DAC] rounded-[8.86px] justify-start items-center gap-2 inline-flex">
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
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-[80px] flex items-center justify-between ">
            <div className="flex">
              <button className="pr-[60px] text-[18px] font-[700] text-[#3E4DAC] underline ">
                All
              </button>
              <button className="pr-[60px] text-[18px] font-[500] ">
                Active
              </button>
              <button className="pr-[60px] text-[18px] font-[500] ">
                Upcoming
              </button>
              <button className="pr-[60px] text-[18px] font-[500] ">
                Completed
              </button>
            </div>
            <div>
              {/* <div className="relative min-w-fit inline-flex border border-[#FF557A]">
                <svg
                  className=" absolute top-1 lg:top-2 right-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#3D3D3D"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h1 className="text-[14px] font-[500] min-w-fit ">Sort By: </h1>
                <select
                  required
                  className=" text-[10px] lg:text-[16px] font-[600] w-full rounded-[14px] text-blue focus:outline-none appearance-none bg-transparent pr-[12px] lg:pr-[20px]"
                  name="option"
                  id="option"
                >
                  <option className="hidden" value="">
                    Points
                  </option>
                  <option className="text-center  " value="500">
                    500
                  </option>
                  <option className="text-center" value="800">
                    800
                  </option>
                  <option className="text-center" value="1000">
                    1000
                  </option>
                  <option className="text-center" value="1200">
                    1200
                  </option>
                  <option className="text-center" value="1400">
                    1400
                  </option>
                  <option className="text-center" value="1600">
                    1600
                  </option>
                  <option className="text-center" value="1800">
                    1800
                  </option>
                  <option className="text-center" value="2000">
                    2000
                  </option>
                </select>
              </div> */}
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
            <div className="flex flex-wrap justify-between gap-x-2 gap-y-5 ">
              {courses?.map((course) => (
                <div className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]">
                  <img
                    className="w-full rounded-lg"
                    src={CourseTham}
                    alt="CourseTham"
                  />
                  <Link to="/questLevels">
                    <h1 className="text-[#3E4DAC] text-[16px] font-[800] mt-[16px] mb-[12px] ">
                      {course?.displayname}
                    </h1>
                  </Link>
                  <p className="text-[#7A7A7A] text-[12px] font-[500] mb-[16px] ">
                    Course Description
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      to="/questLevels"
                      className="bg-[#E1D7FF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] "
                    >
                      Course Category
                    </Link>
                    <button className="bg-[#CEDBFF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                      Starting Date
                    </button>
                  </div>
                  <div className={`${Role === "admin" ? "block" : "hidden"}`}>
                    <button className="bg-black mt-[24px] p-[3px] rounded-full float-right ">
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
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CourseAccess;
