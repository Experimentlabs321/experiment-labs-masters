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
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
  const [completionStatus, setCompletionStatus] = useState(false);
  const pdfContainerRef = useRef(null);
  function formatTime(seconds) {
    const pad = (num) => (num < 10 ? `0${num}` : num);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(secondsLeft)}`;
  }
  useEffect(() => {
    if (
      taskData?.participants?.find(
        (item) => item?.participant?.email === user?.email
      )
    )
      setCompletionStatus(true);
  }, [taskData, user]);
  const videoRef = useRef(null);

const setupEventListeners = (video) => {
    // Add the console log here to check the video object
    console.log(video, video instanceof HTMLVideoElement);

    if (!(video instanceof HTMLVideoElement)) {
        console.error('Attempted to attach video event listeners to a non-video element');
        return;
    }

    const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
        console.log(`Current time: ${formatTime(video.currentTime)}`);
    };

    const handlePlay = () => {
        console.log(`Video played at: ${formatTime(video.currentTime)}`);
        setIsPlaying(true);
    };

    const handlePause = () => {
        console.log(`Video paused: ${formatTime(video.currentTime)}`);
        setIsPlaying(false);
    };

    // Attach event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Cleanup function to remove event listeners
    return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
    };
};

  useEffect(() => {
    const video = videoRef.current;
    console.log(video)
    if (!video) return;

    // Wait for the video metadata to load before setting up event listeners
    const onMetadataLoaded = () => {
      console.log("Video metadata loaded");
      // Setup event listeners
      const cleanup = setupEventListeners(video);

      // Cleanup on component unmount or when video changes
      return cleanup;
    };

    video.addEventListener('loadedmetadata', onMetadataLoaded);

    return () => {
      video.removeEventListener('loadedmetadata', onMetadataLoaded);
    };
  }, [videoRef]);
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
                  ref={videoRef}
                ></iframe>
                :
                <video
                  key={taskData?.additionalFiles}
                  ref={videoRef}
                  className="mx-auto rounded-lg border-[#292929]"
                  width="90%"
                  height="80vh"
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  onLoadedMetadata={() => {
                    console.log("Video metadata loaded");
                    const video = videoRef.current;
                    if (video) {
                      setupEventListeners(video);
                    }
                  }}
                >
                  <source src={taskData?.additionalFiles} type="video/mp4" />
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
