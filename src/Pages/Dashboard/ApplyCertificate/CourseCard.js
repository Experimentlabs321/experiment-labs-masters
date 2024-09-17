import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";

const CourseCard = ({ course }) => {
  const { userInfo } = useContext(AuthContext);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const date = new Date(course?.courseStartingDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  useEffect(() => {
    if (course?._id && userInfo?._id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/courseId/${course?._id}/userId/${userInfo?._id}`
        )
        .then((response) => {
          setCompletionPercentage(response?.data?.completionPercentage);
        })
        .catch((error) => console.error(error));
  }, [userInfo, course]);
  return (
    <div className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]">
      <Link to={`/applyCertificate/${course?._id}`} className=" cursor-pointer">
        <div className="card-content">
          <img
            className="w-full rounded-lg"
            src={course?.courseThumbnail ? course?.courseThumbnail : CourseTham}
            alt="CourseTham"
          />
          <h1 className="text-[#3E4DAC] text-[16px] font-[800] mt-[16px] mb-[12px]">
            {course?.courseFullName}
          </h1>
          <div className="w-full">
            <small className="text-[#3E4DAC] font-sans pb-[10px] font-[700]">
              {completionPercentage ? completionPercentage : "O"}% Completed
            </small>
            <div className="relative w-full">
              <div className="w-full bg-gray-200 rounded-lg h-2">
                <div
                  className="bg-[#3E4DAC] h-2 rounded-lg"
                  // className="bg-cyan-600 h-2 rounded-sm"
                  style={{ width: `${completionPercentage}%` }}
                  // style={{ width: "20%" }}
                ></div>
              </div>
            </div>
          </div>
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
};

export default CourseCard;
