// import mammoth from "mammoth";
import React, { useContext, useEffect, useState, useRef } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Quiz from "./SubFile/Shared/Quiz";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import icon from "../../../icon192.png";

const ReadingTask = ({ taskData }) => {
  const { userInfo, user } = useContext(AuthContext);
  if (userInfo.role !== "admin") {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }
  const [openTask, setOpenTask] = useState(
    JSON.parse(localStorage.getItem("task"))
  );
  const [openQuiz, setOpenQuiz] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  console.log(taskData);
  const [completionStatus, setCompletionStatus] = useState(false);
  const pdfContainerRef = useRef(null);
  useEffect(() => {
    if (
      taskData?.participants?.find(
        (item) => item?.participant?.email === user?.email
      )
    )
      setCompletionStatus(true);
  }, [taskData, user]);

  const handleCompletion = async () => {
    if (
      !taskData?.completionParameter ||
      taskData?.completionParameter?.completionParameter === "Without Quiz"
    ) {
      setOpenQuiz(false);
      setOverlayVisible(false);
      const sendData = {
        participantChapter: {
          email: userInfo?.email,
          participantId: userInfo?._id,
          status: "Completed",
        },
        participantTask: {
          participant: {
            email: userInfo?.email,
            participantId: userInfo?._id,
            status: "Completed",
          },
        },
      };
      const submitCompletion = await axios.post(
        `https://experiment-labs-master-server.vercel.app/chapter/${taskData?.chapterId}/task/${taskData?._id}/add-participant/${openTask?.taskType}`,
        sendData
      );
      console.log(submitCompletion);
      console.log(sendData);
      setCompletionStatus(true);
      if (submitCompletion?.data?.acknowledged)
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "You have completed successfully!",
        });
    } else {
      setOpenQuiz(!openQuiz);
      setOverlayVisible(openQuiz);
    }
  };
  return (
    <div>
      {/* <div
        className={`relative  w-[400px] mt-[40px] px-4 mb-[10px] flex items-center gap-[32px] `}
      >
        <div className=" " onClick={toggleOptions}>
          <button className="cursor-pointer bg-[#FFDB70] text-[15px] font-[600] py-[20px] px-[25px] rounded-[15px] flex items-center justify-center shadow-[0px_2px_4px_0px_#00000026]">
            Week 1: Week Name{" "}
            <svg
              className="ml-[20px]"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
            >
              <g clip-path="url(#clip0_3016_13126)">
                <path
                  d="M1.52352 5.08398L5.82231 9.38277L10.1211 5.08398"
                  stroke="#282828"
                  stroke-width="1.43293"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3016_13126">
                  <rect
                    width="12.5818"
                    height="12.5818"
                    fill="white"
                    transform="matrix(0 1 -1 0 12.6328 0.890625)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        {isOpen && (
          <ul className="absolute top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100">
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
      </div> */}
      {/* <div className="h-full flex items-center justify-center ">
        <object
          className="  border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929]"
          // data={taskData?.additionalFiles}
          data={`https://docs.google.com/viewer?url=${taskData?.additionalFiles}&embedded=true`}
          type="application/pdf"
          width="865px"
          height="500px"
        >
          <p>
            Alternative text - include a link{" "}
            <a href="http://africau.edu/images/default/sample.pdf">
              to the PDF!
            </a>
          </p>
        </object>
      </div> */}
      {completionStatus ? (
        <div className="container mx-auto relative z-10">
          <button className="bg-green py-2 px-5 my-4 float-right mr-4 rounded-lg text-lg text-white font-bold">
            Completed <CheckCircleOutlineIcon />
          </button>
        </div>
      ) : (
        <button
          onClick={handleCompletion}
          className="bg-green py-2 px-5 my-4 float-right mr-4 rounded-lg text-lg text-white font-bold relative z-10"
        >
          Mark as complete <CheckCircleOutlineIcon />
        </button>
      )}
      <div className="min-h-[72vh] mb-[60px]">
        <div className="container mx-auto relative">
          {isOverlayVisible && (
            <div
              className="fixed top-0 left-0 w-full h-full z-[9999] bg-transparent"
              onClick={handleCompletion}
            ></div>
          )}
          {isOverlayVisible ? null : (
            <iframe
              src={`https://docs.google.com/viewer?url=${taskData?.additionalFiles}&embedded=true`}
              title="Your Document"
              className="h-[68vh] mx-auto border-x-30 mt-40 border-t-30 border-b-50 rounded-lg border-[#292929]"
              width="90%"
              height="80vh"
            ></iframe>
          )}
          {openQuiz && (
            <Quiz
              setOpenQuiz={setOpenQuiz}
              openQuiz={openQuiz}
              taskData={taskData}
              questions={taskData?.completionParameter?.questions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingTask;
