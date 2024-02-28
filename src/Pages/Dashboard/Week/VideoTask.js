import React, { useContext, useEffect, useRef, useState } from "react";

import icon from "../../../icon192.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import ReactPlayer from 'react-player';
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
  const [durations, setDuration] = useState(0);
  console.log('durations ', durations)
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
  const formatTime = (seconds) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const hours = pad(Math.floor(seconds / 3600));
    const minutes = pad(Math.floor((seconds % 3600) / 60));
    const secondsLeft = pad(Math.floor(seconds % 60));
    return `${hours}:${minutes}:${secondsLeft}`;
  };
  useEffect(() => {
    if (
      taskData?.participants?.find(
        (item) => item?.participant?.email === user?.email
      )
    )
      setCompletionStatus(true);
  }, [taskData, user]);

  const videoRef = useRef(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  // useEffect(() => {
  //   console.log('Document State:', document.readyState);
  
  //   const handleVisibilityChange = () => {
  //     console.log('Visibility State:', document.visibilityState);
  //     console.log('inside');
  
  //     if (durations !== null && document.visibilityState === 'hidden') {
  //       console.log('Watched duration:', durations);
  //     }
  //   };
  
  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, [durations]);
  // Function to handle playback progress
  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds);
    // You can use state.playedSeconds to keep track of how much of the video has been played
  };

  // Example of handling playback state
  useEffect(() => {
    // You can perform actions based on playedSeconds here
    // This is just a logging example
    // console.log(`Current played duration: ${formatTime(playedSeconds)} seconds`);
    setDuration(formatTime(playedSeconds));
  }, [playedSeconds]);
  const setupEventListeners = (video) => {
    // Add the console log here to check the video object
    console.log(video, video instanceof HTMLVideoElement);

    if (!(video instanceof HTMLVideoElement)) {
      console.error('Attempted to attach video event listeners to a non-video element');
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // console.log(`Current time: ${formatTime(video.currentTime)}`);
      setDuration(formatTime(video.currentTime))
      localStorage.setItem('timeSpent', durations);
    };

    const handlePlay = () => {
      //console.log(`Video played at: ${formatTime(video.currentTime)}`);
      setIsPlaying(true);
      setDuration(formatTime(video.currentTime))
      localStorage.setItem('timeSpent', durations);
    };

    const handlePause = () => {
      // console.log(`Video paused: ${formatTime(video.currentTime)}`);
      setIsPlaying(false);
      setDuration(formatTime(video.currentTime))
      localStorage.setItem('timeSpent', durations);
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
    if (!video) return;
  
    const onMetadataLoaded = () => {
      console.log("Video metadata loaded");
      const cleanup = setupEventListeners(video);
  
      return cleanup;
    };
  
    const handleVisibilityChange = () => {
      console.log('Visibility state:', document.visibilityState);
      // Send duration data to the backend regardless of video player state
      console.log('Page visibility changed, sending data to backend');
      sendDurationToBackend();
    };
  
    video.addEventListener('loadedmetadata', onMetadataLoaded);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    return () => {
      video.removeEventListener('loadedmetadata', onMetadataLoaded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [videoRef, durations]);
  
  
  const sendDurationToBackend = async () => {
    // Use axios or your preferred method to send the duration data to the backend
    // try {
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_SERVER_API}/api/v1/your-backend-endpoint`,
    //     {
    //       duration: durations, // Assuming durations is the data you want to send
    //       // Add any other necessary data
    //     }
    //   );
    //   console.log('Duration data sent to backend:', response.data);
    // } catch (error) {
    //   console.error('Error sending duration data to backend:', error);
    // }
    console.log('here inside');
  };
  
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
                // <iframe
                //   width="90%"
                //   height="500"
                //   src={taskData?.additionalFiles}
                //   className=" mx-auto rounded-lg border-[#292929] "
                //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                //   allowFullScreen
                //   title="Embedded YouTube Video"
                //   ref={videoRef}
                // ></iframe>
                // <ReactPlayer
                //   url={taskData?.additionalFiles} // Your video URL here
                //   controls
                //   onProgress={handleProgress}
                //   width="90%"
                //   height="450px"
                //   className=" mx-auto rounded-lg border-[#292929] "
                // />
                <div>
                  <ReactPlayer
                    url={taskData?.additionalFiles}
                    onProgress={handleProgress}
                    onPause={() => {
                      if (durations) {
                        console.log('Watched duration: ', durations);
                        setDuration(durations);
                      }
                    }}
                    width="90%"
                    height="430px"
                    style={{ borderRadius: "10px", marginBottom: "30px" }}
                    className="mx-auto rounded-lg border-[#292929] mb-4"
                    config={{
                      youtube: {
                        playerVars: {
                          autoplay: 1,
                          controls: 1,
                          enablejsapi: 1,
                          modestbranding: 1,
                          fs: 1, // Enabling fullscreen
                          iv_load_policy: 3, // Hiding video annotations
                        },
                        embedOptions: {
                          enablejsapi: 1,
                        },
                      },
                    }}
                  />
                  <div className='mt-20'></div>
                </div>
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
