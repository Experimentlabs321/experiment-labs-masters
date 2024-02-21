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
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/${openTask?.taskType}/taskId/${taskData?._id}/chapterId/${taskData?.chapterId}`,
        sendData
      );
      Loading().close();
      // setCompletionStatus(true);
      if (submitCompletion?.data?.acknowledged) {
        setCompletionStatus(true);
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "You have completed successfully!",
        });
        // navigate(-1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Some thing wrong happen please try again later!",
        });
      }
    } else {
      Loading().close();
      setOpenQuiz(!openQuiz);
      setOverlayVisible(openQuiz);
    }
  };
  return (
    <div>
      {taskData?.additionalFiles && (
        <div className=" mb-[60px] ">
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
              taskData?.isYoutubeLink ?
                <iframe
                  width="90%"
                  height="500"
                  src={taskData?.additionalFiles}
                  className=" mx-auto rounded-lg border-[#292929] "
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded YouTube Video"
                ></iframe>
                :
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
