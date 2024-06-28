//UpcomingClasses

import React, { useContext, useEffect, useState } from "react";

import active from "../../../assets/ExecutionMentor/active.svg";
import clock from "../../../assets/ExecutionMentor/clock.svg";
import list from "../../../assets/ExecutionMentor/list.svg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const UpComingClasses = ({ classes }) => {
  // Get current date and time
  const currentDate = new Date();

  // Filter classes with past dates
  const filteredClasses = classes?.filter((cls) => {
    const classDate = new Date(cls.courseStartingDateTime);
    return classDate > currentDate;
  });

  const getTimeLeft = (classDate) => {
    const diffInMilliseconds = classDate - currentDate;
    const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return { hours, minutes };
  };
 
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mx-5 my-10 h-[700px] overflow-y-auto">
        {filteredClasses.length ? (
          filteredClasses.map((cls) => {
            const classDate = new Date(cls.courseStartingDateTime);
            const formattedDate = classDate.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
            const { hours, minutes } = getTimeLeft(classDate);

            return (
              <div
                key={cls.id} // Assuming each class has a unique id
                className="p-5 h-[250px]"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #EFEFEF",
                  background: "#FFF",
                  boxShadow: "0px 4px 4px 0px rgba(57, 80, 126, 0.14)",
                }}
              >
                <div className="flex gap-2 border-b pb-2">
                  <div className="">
                    <img src={cls.imageUrl} alt="" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-medium">{cls.taskName}</p>
                    <p className="flex justify-between text-sm font-normal text-[#8A8A8A]">
                      {cls.creatorName}
                      <span className="flex gap-2 text-[#2E8760] bg-[#E3FFF3] rounded-md px-2">
                        <img src={active} alt="" />
                        <span>online</span>
                      </span>
                    </p>
                    <p className="text-[#2E8760] text-sm font-normal">
                      {formattedDate}
                    </p>
                  </div>
                </div>
                <div className="text-[#8A8A8A] text-base font-normal my-5">
                  <p className="flex gap-5">
                    <img src={clock} alt="clock" />
                    {hours > 0 || minutes > 0
                      ? `${hours} hours ${minutes} minutes left`
                      : "Class started"}
                  </p>
               {/*    <p className="mt-3 flex gap-5">
                    <img src={list} alt="list" /> Students - 22/35
                  </p> */}
                </div>
                <div className="flex justify-center">
                  <Link
                  to={cls?.meetingData?.join_url}
                    className="px-6 py-1 text-[#fff] text-base font-medium"
                    style={{
                      borderRadius: "7px",
                      background:
                        "linear-gradient(180deg, #2063DA 0%, #081765 100%)",
                    }}
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center font-medium text-sky-400 mt-5 w-full ">
          No Upcoming classes available
        </p>
         
        )}
      </div>
    </div>
  );
};

export default UpComingClasses;
