import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import SearchIcon from "../../../assets/Dashboard/SearchIcon.png";
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import CourseCard from "./CourseCard";

const ApplyCertificate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [clickedCourse, setClickedCourse] = useState();
  const [selectedOption, setSelectedOption] = useState("Category");
  const options = ["Category name"];
  const Role = localStorage.getItem("role");
  const { userInfo } = useContext(AuthContext);
  console.log(userInfo);

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
        `${process.env.REACT_APP_SERVER_API}/api/v1/courses/userId/${userInfo._id}`
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
              {courses?.map((course) => (
                <CourseCard course={course} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ApplyCertificate;
