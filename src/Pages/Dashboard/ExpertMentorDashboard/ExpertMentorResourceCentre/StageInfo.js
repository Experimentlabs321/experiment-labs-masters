///PreviousClassHomework

import React, { useContext, useEffect, useRef, useState } from "react";
import play from "../../../../assets/ExpertMentorDashboard/play.svg";
import Arrow2 from "../../../../assets/ExpertMentorDashboard/Arrow2.svg";
import arrow3 from "../../../../assets/ExpertMentorDashboard/arrow3.svg";
import { Link } from "react-router-dom";

const StageInfo = ({ chapters, stage, week }) => {
  const containerRef = useRef(null);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);

  function handleScrollLeft() {
    containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
  }

  function handleScrollRight() {
    containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
  }
  useEffect(() => {
    setFilteredClasses([]);
    chapters?.forEach((element) => {
      let singleChapter = { ...element };
      const filteredTasks = element?.tasks.filter((item) =>
        item?.contentStage?.find((singleStage) => singleStage === stage)
      );
      element?.tasks?.forEach((singleTask) => {
        if (singleTask?.taskType === "Classes") {
          setFilteredClasses([...filteredClasses, singleTask]);
        }
      });
      singleChapter.tasks = filteredTasks;
      filteredChapters.push(singleChapter);
    });
  }, [chapters]);
  // console.log(filteredChapters);
  return (
    <div
      className="flex items-center justify-between gap-5 p-5"
      style={{
        borderRadius: "20px",
        background: "#303031",
        boxShadow:
          "3.7425336837768555px 11.227601051330566px 25px 0px rgba(93, 110, 255, 0.60)",
      }}
    >
      <div className=" flex flex-col items-center justify-center w-[100%] text-[#fff]">
        <p>{week?.weekName}</p>

        {filteredClasses?.map((singleClass) => (
          <Link
            onClick={() => {
              // localStorage.setItem("chapter", chapter?.chapterName);
              localStorage.setItem("task", JSON.stringify(singleClass));
              localStorage.setItem("currentWeek", JSON.stringify(week));
              localStorage.setItem("courseId", JSON.stringify(week?.courseId));
            }}
            to={`/week/${week?._id}`}
            className=" flex items-center gap-3 p-2 mt-4"
            style={{
              borderRadius: "24px",
              border: "3px solid #FFF",
            }}
          >
            <span>
              <img src={play} alt="icon" />
            </span>
            {singleClass?.taskName}
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-5 lg:mt-5">
        {/* <button
          onClick={handleScrollLeft}
          className="hidden lg:block"
          type="button"
        >
          <ArrowBackIosNewIcon
            sx={{
              fontSize: "28px",
              color: "#141414",
              borderRadius: "50%",
              ":hover": { color: "#397FEB" },
              background: "#94A4FF",
              height: "40px",
              width: "40px",
              padding: "5px",
            }}
          />
        </button> */}
        <div
          ref={containerRef}
          className="flex overflow-x-scroll scroll-smooth gap-5 mtm-container lg:w-[45vw]"
        >
          {!chapters[0] && (
            <div>
              <h1 className="text-white text-lg">No {stage}</h1>
            </div>
          )}
          {chapters?.map((chapter, index) => (
            <div className="bg-[#fff] min-w-fit rounded-lg p-5">
              <p className="text-[#676767] text-base font-semibold">
                Topic {index + 1}
              </p>
              <p className=" text-base font-bold mb-3">
                {chapter?.chapterName}
              </p>

              {chapter?.tasks
                .filter((item) =>
                  item?.contentStage?.find(
                    (singleStage) => singleStage === stage
                  )
                )
                ?.map((singleTask, i) => (
                  <Link
                    onClick={() => {
                      localStorage.setItem("chapter", chapter?.chapterName);
                      localStorage.setItem("task", JSON.stringify(singleTask));
                      localStorage.setItem("currentWeek", JSON.stringify(week));
                      localStorage.setItem(
                        "courseId",
                        JSON.stringify(week?.courseId)
                      );
                    }}
                    to={`/week/${week?._id}`}
                    className="text-[#676767] text-base font-semibold block"
                  >
                    {" "}
                    {i + 1}. {singleTask?.taskName}{" "}
                  </Link>
                ))}
              <Link
                to={`/questLevels/${week?.courseId}?week=${week?._id}`}
                className="flex justify-end items-center gap-2 text-[#3E4DAC] text-base font-semibold mt-4 me-10"
              >
                View Full Topic{" "}
                <span>
                  <img src={Arrow2} alt="icon" />
                </span>{" "}
              </Link>
            </div>
          ))}
        </div>
        <div
          onClick={handleScrollRight}
          className=" flex flex-col items-center justify-center text-[#fff]"
        >
          <p className="">
            <img src={arrow3} alt="icon" />
          </p>
        </div>
        {/* <button
          className="hidden lg:block"
          type="button"
        >
          <ArrowForwardIosIcon
            sx={{
              fontSize: "28px",
              color: "#141414",
              borderRadius: "50%",
              ":hover": { color: "#397FEB" },
              background: "#94A4FF",
              height: "40px",
              width: "40px",
              padding: "5px",
            }}
          />
        </button> */}
      </div>

      {/* <div className="bg-[#fff] w-[100%] rounded-lg p-5">
        <p className="text-[#676767] text-base font-semibold">Topic 1</p>
        <p className=" text-base font-bold">Product development</p>

        <p className="text-[#676767] text-base font-semibold mt-3">
          {" "}
          1. What is a product{" "}
        </p>
        <p className="text-[#676767] text-base font-semibold ">
          {" "}
          2. How to build a product
        </p>
        <p className="text-[#676767] text-base font-semibold ">
          {" "}
          3. How to sell a product
        </p>
        <p className="flex justify-end items-center gap-2 text-[#3E4DAC] text-base font-semibold mt-4 me-10">
          View Full Topic{" "}
          <span>
            <img src={Arrow2} alt="icon" />
          </span>{" "}
        </p>
      </div>

      <div className="bg-[#fff] w-[100%] rounded-lg p-5">
        <p className="text-[#676767] text-base font-semibold">Topic 2</p>
        <p className=" text-base font-bold">Product development</p>

        <p className="text-[#676767] text-base font-semibold mt-3">
          {" "}
          1. What is a product{" "}
        </p>
        <p className="text-[#676767] text-base font-semibold ">
          {" "}
          2. How to build a product
        </p>
        <p className="text-[#676767] text-base font-semibold ">
          {" "}
          3. How to sell a product
        </p>
        <p className="flex justify-end items-center gap-2 text-[#3E4DAC] text-base font-semibold mt-4 me-10">
          View Full Topic{" "}
          <span>
            <img src={Arrow2} alt="icon" />
          </span>{" "}
        </p>
      </div>
      <div className=" flex flex-col items-center justify-center w-[30%] text-[#fff]">
        <p className="">
          <img src={arrow3} alt="icon" />
        </p>
      </div> */}
    </div>
  );
};

export default StageInfo;
