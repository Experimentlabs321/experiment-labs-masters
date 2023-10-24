//MyRecordings

import React, { useContext, useEffect, useRef, useState } from "react";
import play from "../../../../assets/ExpertMentorDashboard/play.svg";
import img3 from "../../../../assets/ExpertMentorDashboard/img3.png";
import arrow3 from "../../../../assets/ExpertMentorDashboard/arrow3.svg";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const MyRecordings = ({ courses }) => {
  const containerRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [recordedClasses, setRecordedClasses] = useState([]);
  const navigate = useNavigate();

  function handleScrollLeft() {
    containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
  }

  function handleScrollRight() {
    containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
  }

  useEffect(() => {
    if (!selectedCourse) setSelectedCourse(courses[0]);
  }, [courses]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/classes/courseId/${selectedCourse?._id}`
      )
      .then((response) => {
        setRecordedClasses(response?.data);
      })
      .catch((error) => console.error(error));
  }, [selectedCourse]);

  console.log(recordedClasses);

  return (
    <>
      <div className="mt-10 w-full">
        <div className="flex justify-between items-center ">
          <div className="px-10 flex flex-wrap gap-10 pb-3 text-lg  ">
            {courses?.map((course) => (
              <button
                className=" inline-block "
                onClick={() => setSelectedCourse(course)}
                style={{
                  fontWeight:
                    selectedCourse?._id === course?._id ? "bold" : "normal",
                  borderBottom:
                    selectedCourse?._id === course?._id
                      ? "2px solid black"
                      : "none",
                  color:
                    selectedCourse?._id === course?._id ? "#081765" : "#BEBEBE",
                }}
              >
                {course?.courseFullName}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* {selectedTab1 === "Product Lab" && ( */}
      <div className="flex gap-5 lg:mt-5 ">
        <div
          ref={containerRef}
          className="flex overflow-x-scroll scroll-smooth gap-5 lg:gap-10 mtm-container lg:w-[70vw] pr-5"
        >
          {recordedClasses?.map((recordedClass) => {
            if (
              !recordedClass?.mentors?.find(
                (item) => item?.email === user?.email
              )
            ) {
              const meetingDate = new Date(
                recordedClass?.courseStartingDateTime
              );
              return (
                <div
                  className=" rounded-lg min-w-[250px] mb-10 "
                  style={{
                    borderRadius: "20px",
                    boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
                  }}
                >
                  <p className="">
                    <img className="" src={img3} alt="img" />
                  </p>
                  <div
                    className="text-[#676767] text-base font-semibold p-5 "
                    style={{
                      borderRadius: "20px",
                      background: "#FFF",
                      boxShadow:
                        "3.7425336837768555px 11.227601051330566px 25px 0px rgba(93, 110, 255, 0.60)",
                    }}
                  >
                    <p>{recordedClass?.batches[0]?.batchName}</p>
                    {/* <p>Monday | 8:00 pm</p> */}
                    <p className=" font-sans">{meetingDate?.toDateString()}</p>
                    <Link
                      onClick={async () => {
                        // localStorage.setItem("chapter", chapter?.chapterName);
                        localStorage.setItem(
                          "task",
                          JSON.stringify({
                            taskId: recordedClass?._id,
                            taskType: "Classes",
                            taskName: recordedClass?.taskName,
                            batches: recordedClass?.batches,
                            contentStage: recordedClass?.contentStge,
                          })
                        );
                        await axios
                          .get(
                            `${process.env.REACT_APP_SERVER_API}/api/v1/weeks/${recordedClass?.weekId}`
                          )
                          .then((response) => {
                            localStorage.setItem(
                              "currentWeek",
                              JSON.stringify(response?.data)
                            );
                          })
                          .catch((error) => console.error(error));
                        // localStorage.setItem(
                        //   "currentWeek",
                        //   JSON.stringify(currentWeek)
                        // );
                        localStorage.setItem(
                          "courseId",
                          JSON.stringify(recordedClass?.courseId)
                        );
                        navigate(`/week/${recordedClass?.weekId}`);
                      }}
                      //   to={`/week/${week?._id}`}
                      // to={`/week/${recordedClass?.weekId}`}
                      className="text-[#000]"
                    >
                      {recordedClass?.taskName}
                    </Link>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div
          onClick={handleScrollRight}
          className=" flex flex-col items-center justify-center text-[#fff]"
        >
          <p className="">
            <img src={arrow3} alt="icon" />
          </p>
        </div>
      </div>
      {/* <div className="flex items-center justify-between gap-10 mt-10">
        <div
          className=" rounded-lg "
          style={{
            borderRadius: "20px",
            boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
          }}
        >
          <p className="">
            <img className="" src={img3} alt="img" />
          </p>
          <div
            className="text-[#676767] text-base font-semibold p-5"
            style={{
              borderRadius: "20px",
              background: "#FFF",
              boxShadow:
                "3.7425336837768555px 11.227601051330566px 25px 0px rgba(93, 110, 255, 0.60)",
            }}
          >
            <p>Batch - 1</p>
            <p>Monday | 8:00 pm</p>
            <p className="text-[#000]">Product development</p>
          </div>
        </div>
        <div
          className=" rounded-lg "
          style={{
            borderRadius: "20px",

            boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
          }}
        >
          <p className="">
            <img className="" src={img3} alt="img" />
          </p>

          <div
            className="text-[#676767] text-base font-semibold p-5"
            style={{
              borderRadius: "20px",
              background: "#FFF",
              boxShadow:
                "3.7425336837768555px 11.227601051330566px 25px 0px rgba(93, 110, 255, 0.60)",
            }}
          >
            <p>Batch - 1</p>
            <p>Monday | 8:00 pm</p>
            <p className="text-[#000]">Product development</p>
          </div>
        </div>
        <div
          className=" rounded-lg "
          style={{
            borderRadius: "20px",
            boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
          }}
        >
          <p className="">
            <img className="" src={img3} alt="img" />
          </p>

          <div
            className="text-[#676767] text-base font-semibold p-5"
            style={{
              borderRadius: "20px",
              background: "#FFF",
              boxShadow:
                "3.7425336837768555px 11.227601051330566px 25px 0px rgba(93, 110, 255, 0.60)",
            }}
          >
            <p>Batch - 1</p>
            <p>Monday | 8:00 pm</p>
            <p className="text-[#000]">Product development</p>
          </div>
        </div>

        <div className=" flex flex-col items-center justify-center w-[20%] text-[#fff]">
          <p className="">
            <img src={arrow3} alt="icon" />
          </p>
        </div>
      </div> */}
      {/* // )} */}
    </>
  );
};

export default MyRecordings;
