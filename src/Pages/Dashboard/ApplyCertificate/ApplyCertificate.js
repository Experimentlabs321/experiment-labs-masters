import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";

const ApplyCertificate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [clickedCourse, setClickedCourse] = useState();
  const [selectedOption, setSelectedOption] = useState("Category");
  const options = ["Category name"];
  const Role = localStorage.getItem("role");
  const { userInfo } = useContext(AuthContext);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

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
            </div>
          </div>
          <div className="my-[60px] ">
            <div className="flex flex-wrap justify-between gap-x-2 gap-y-5 ">
              {courses?.map((course) => {
                const date = new Date(course?.courseStartingDate);
                const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                return (
                  <div className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]">
                    <Link to={`/applyCertificate/${course?._id}`}>
                      <div className="card-content">
                        <img
                          className="w-full rounded-lg"
                          src={
                            course?.courseThumbnail
                              ? course?.courseThumbnail
                              : CourseTham
                          }
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

export default ApplyCertificate;
