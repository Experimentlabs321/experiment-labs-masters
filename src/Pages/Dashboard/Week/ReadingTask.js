import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import Quiz from "./SubFile/Shared/Quiz";
const IFRAME_TIMEOUT = 5000; // 5 sec timeout for iframe loading

const ReadingTask = ({
  taskData,
  count,
  setCount,
  taskCompletionCount,
  setTaskCompletionCount,
}) => {
  const navigate = useNavigate();
  const [additionalFile, setAdditionalFile] = useState("");
  const { userInfo, user } = useContext(AuthContext);
  const [openTask, setOpenTask] = useState(
    JSON.parse(localStorage.getItem("task"))
  );
  const [openQuiz, setOpenQuiz] = useState(false);
  const [completionStatus, setCompletionStatus] = useState(false);
  const iframeRef = useRef(null); // Ref for iframe
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hasReloaded, setHasReloaded] = useState(false); // Track if the page has already reloaded
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    if (
      taskData?.participants?.find(
        (item) => item?.participant?.email === user?.email
      )
    ) {
      setCompletionStatus(true);
    } else {
      setCompletionStatus(false);
    }
    
    if (taskData?.additionalFiles && taskData?.additionalFiles !== additionalFile) {
      const timestamp = new Date().getTime()
      setAdditionalFile(
        `https://docs.google.com/viewer?url=${taskData?.additionalFiles}&embedded=true&timestamp=${timestamp}`
      );

      // Set a fallback timer to reload the page if the iframe doesn't load within 1 minute
      // const timeoutId = setTimeout(() => {
      //   if (!iframeLoaded && !hasReloaded) {
      //     console.log("Iframe did not load within 1 minute, reloading the page...");
      //     setHasReloaded(true); // Mark the reload as done
      //     window.location.reload(); // Reload the page
      //   }
      // }, IFRAME_TIMEOUT);
      // Set a fallback timer to reload the iframe if it doesn't load within 1 minute
// const timeoutId = setTimeout(() => {
//   if (!iframeLoaded && !hasReloaded) {
//     console.log("Iframe did not load within 1 minute, reloading the iframe...");
//     setHasReloaded(true); // Mark the reload as done
//     const iframe = document.getElementById(taskData?._id); // Replace with your iframe's ID
//     if (iframe) {
//       console.log("Reloaded",new Date())
//       iframe.src = iframe.src; // Reload the iframe by resetting its src
//     }
//   }
// }, IFRAME_TIMEOUT);

//       return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
    } else {
      setAdditionalFile("");
    }
  }, [taskData, taskData?._id, user, iframeLoaded, hasReloaded]);

  useEffect(()=>{
    // const timeoutId = setTimeout(() => {
    //   if (!iframeLoaded && !hasReloaded) {
    //     console.log("Iframe did not load within 1 minute, reloading the iframe...");
    //     setHasReloaded(true); // Mark the reload as done
    //     const iframe = document.getElementById("test"); // Replace with your iframe's ID
    //     if (iframe) {
    //       console.log("Reloaded",new Date())
    //       iframe.src = iframe.src; // Reload the iframe by resetting its src
    //     }
    //   }
    // }, IFRAME_TIMEOUT);
      const timeoutId = setTimeout(() => {
        if (!iframeLoaded && !hasReloaded) {
          console.log("Iframe did not load within 1 minute, reloading the page...");
          setHasReloaded(true); // Mark the reload as done
          window.location.reload(); // Reload the page
        }
      }, IFRAME_TIMEOUT);
    
          return () => clearTimeout(timeoutId);

  },[setAdditionalFile,hasReloaded,iframeLoaded,taskData?._id])

  const handleIframeLoad = () => {
    setIframeLoaded(true); // Mark iframe as successfully loaded
    setLoading(false); // Hide the loader
  };

  const handleCompletion = async () => {
    Loading();
    if (
      !taskData?.completionParameter ||
      taskData?.completionParameter?.completionParameter === "Without Quiz"
    ) {
      setOpenQuiz(false);
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
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/${openTask?.taskType}/taskId/${taskData?._id}/chapterId/${taskData?.chapterId}`,
        sendData
      );
      Loading().close();
      if (submitCompletion?.data?.acknowledged) {
        setCount(count + 1);
        setCompletionStatus(true);
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "You have completed successfully!",
        });
        setTimeout(() => {
          setTaskCompletionCount(taskCompletionCount + 1);
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Something went wrong, please try again later!",
        });
      }
    } else {
      Loading().close();
      setOpenQuiz(true);
    }
  };

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  const handleDownload = async () => {
    try {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Download cancelled");
      }

      const cancelToken = axios.CancelToken.source();
      setCancelTokenSource(cancelToken);

      const response = await axios.get(taskData?.additionalFiles, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setDownloadProgress(percentCompleted);
        },
        cancelToken: cancelToken.token,
      });

      const fileName = taskData?.additionalFiles.split("/").pop();
      const fileExtension = fileName.split(".").pop();
      const mimeType = getMimeType(fileExtension);

      const blob = new Blob([response.data], { type: mimeType });

      saveAs(blob, fileName);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Download cancelled:", error.message);
      } else {
        console.error("Error downloading the file:", error);
      }
    } finally {
      setCancelTokenSource(null);
      setDownloadProgress(0);
    }
  };

  const getMimeType = (extension) => {
    switch (extension.toLowerCase()) {
      case "pdf":
        return "application/pdf";
      case "doc":
      case "docx":
        return "application/msword";
      case "xls":
      case "xlsx":
        return "application/vnd.ms-excel";
      case "ppt":
      case "pptx":
        return "application/vnd.ms-powerpoint";
      default:
        return "application/octet-stream";
    }
  };

  useEffect(() => {
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Download cancelled due to component unmount");
      }
    };
  }, [taskData?.additionalFiles, cancelTokenSource]);

  return (
    <div>
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

      {loading && taskData?.additionalFiles && (
        <div className="flex justify-center w-full min-h-[72vh] items-center">
          <div className="flex flex-col items-center gap-3">
            <CircularProgress />
            <Typography variant="h6" align="center" color="textSecondary">
              Document is loading...
            </Typography>
          </div>
        </div>
      )}

      {additionalFile && (
        <div id="test" key={taskData?._id} className="min-h-[72vh] mb-[60px]" style={{ display: iframeLoaded ? "block" : "none" }}>
          <div className="container mx-auto relative">
          {additionalFile &&
              (taskData?.additionalFiles.endsWith(".png") ||
              taskData?.additionalFiles.endsWith(".jpg") ||
              taskData?.additionalFiles.endsWith(".jpeg") ||
              taskData?.additionalFiles.endsWith(".gif") ||
              taskData?.additionalFiles.endsWith(".bmp") ? (
                <div className="">
                  <img
                    src={taskData?.additionalFiles}
                    alt="Img"
                    onLoad={() => {
                      // console.log("iframe loaded");
                      setIframeLoaded(true);
                    }}
                    className="w-[90%] mx-auto h-[68vh] border-[10px] border-b-50 rounded-lg border-[#292929]"
                  />
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  id={taskData?._id}
                  key={taskData?._id}
                  src={additionalFile && additionalFile}
                   onLoad={() => {
                    // console.log("iframe loaded");
                     setIframeLoaded(true);
                  handleIframeLoad()
                 }}
                  // onLoad={handleIframeLoad}
                  title="Your Document"
                  className="h-[68vh] mx-auto border-x-30 mt-40 border-[10px] border-b-50 rounded-lg border-[#292929]"
                  width="90%"
                  height="80vh"
                ></iframe>
              ))}
            {/* <iframe
              ref={iframeRef}
              id={taskData?._id}
              key={taskData?._id}
              src={additionalFile}
              onLoad={handleIframeLoad}
              title="Your Document"
              className="h-[68vh] mx-auto border-x-30 mt-40 border-[10px] border-b-50 rounded-lg border-[#292929]"
              width="90%"
              height="80vh"
            ></iframe> */}
          </div>
          {taskData?.enableDownload && (
            <div className="flex justify-end me-20 my-10">
              <button
                className="bg-blue text-white p-3 rounded-lg text-xl"
                onClick={cancelTokenSource ? null : handleDownload}
                disabled={cancelTokenSource !== null}
              >
                {cancelTokenSource
                  ? `Downloading... ${downloadProgress}%`
                  : "Download"}
              </button>
              {cancelTokenSource && (
                <button
                  className="bg-red-400 text-white p-3 rounded-lg text-xl ml-4"
                  onClick={() => {
                    cancelTokenSource.cancel("Download cancelled by user");
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {openQuiz && (
        <Quiz
          setOpenQuiz={setOpenQuiz}
          setCompletionStatus={setCompletionStatus}
          openQuiz={openQuiz}
          taskData={taskData}
          questions={taskData?.completionParameter?.questions}
          count={count}
          setCount={setCount}
          taskCompletionCount={taskCompletionCount}
          setTaskCompletionCount={setTaskCompletionCount}
        />
      )}

      <div className="px-4 py-20 textEditor">
        <div dangerouslySetInnerHTML={{ __html: taskData?.readingMaterial }} />
      </div>
    </div>
  );
};

export default ReadingTask;
