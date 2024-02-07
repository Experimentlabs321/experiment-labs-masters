import React, { useContext, useEffect, useRef, useState } from "react";

import icon from "../../../icon192.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import Quiz from "./SubFile/Shared/Quiz";
const VideoTask = ({ taskData, something }) => {
  console.log(taskData);
  const navigate = useNavigate();
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
    Loading();
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
          completionDateTime: new Date(),
        },
        participantTask: {
          participant: {
            email: userInfo?.email,
            participantId: userInfo?._id,
            status: "Completed",
            completionDateTime: new Date(),
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
      if (submitCompletion?.data?.acknowledged) {
        setCompletionStatus(true);
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "You have completed successfully!",
        });
        // navigate(-1);
      }
    } else {
      Loading().close();
      setOpenQuiz(!openQuiz);
      setOverlayVisible(openQuiz);
    }
    Loading().close();
  };
  return (
    <div>
      {taskData?.additionalFiles && (
        <div className=" mb-[60px] ">
          {/* <iframe
            className="h-[68vh] mx-auto border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929]"
            width="90%"
            height="80vh"
            // src="https://experiment-labs-my-bucket.s3.eu-north-1.amazonaws.com/Coke+Studio+Bangla+_+Season+2+_+Return+of+Magic++%23+CokeStudioBangla+%23CSBS2+%23RealMagic.mp4"
            src={taskData?.additionalFiles}
            title="YouTube video player"
            frameborder="0"
            sandbox="allow-same-origin allow-scripts allow-presentation"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}
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
          <div className="relative">
            {taskData?.additionalFiles && (
              <video
                key={taskData?.additionalFiles}
                className=" mx-auto rounded-lg border-[#292929]"
                width="90%"
                height="80vh"
                controls
                controlsList="nodownload"
                disablePictureInPicture
              >
                <source
                  src={taskData?.additionalFiles}
                  // src="https://www.youtube.com/embed/0OK91ijimIU"
                  type="video/mp4"
                />
              </video>
            )}
            {/* <div className="flex items-center text-sm font-bold gap-1 absolute top-3 right-20 z-10">
              <img className="w-4" src={icon} alt="icon" />
              <p>Experiment Labs</p>
            </div> */}
          </div>
        </div>
      )}

      {openQuiz && (
        <Quiz
          setOpenQuiz={setOpenQuiz}
          setCompletionStatus={setCompletionStatus}
          openQuiz={openQuiz}
          taskData={taskData}
          questions={taskData?.completionParameter?.questions}
        />
      )}
    </div>
  );
};

export default VideoTask;
