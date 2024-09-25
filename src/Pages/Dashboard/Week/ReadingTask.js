// import mammoth from "mammoth";
import React, { useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, LinearProgress } from "@mui/material";

import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import Quiz from "./SubFile/Shared/Quiz";

const ReadingTask = ({ taskData, count, setCount }) => {
  const navigate = useNavigate();
  const [additionalFile, setAdditionalFile] = useState("");
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
  useEffect(() => {
    if (
      taskData?.participants?.find(
        (item) => item?.participant?.email === user?.email
      )
    )
      setCompletionStatus(true);
    else setCompletionStatus(false);
    if (
      taskData?.additionalFiles &&
      taskData?.additionalFiles !== additionalFile
    ) {
      setAdditionalFile(
        `https://docs.google.com/viewer?url=${taskData?.additionalFiles}&embedded=true`
      );
    } else {
      setAdditionalFile("");
    }
  }, [taskData, taskData?._id, user]);

  useEffect(() => {
    const specificDiv = document.getElementById("document");
    if (specificDiv) {
      // console.log(
      //   "Specific div has loaded.",
      //   additionalFile,
      //   taskData?.additionalFiles
      // );
      // You can perform actions related to the specific div here
    }
  }, [taskData, user, additionalFile]);

  const handleCompletion = async () => {
    Loading();
    if (
      !taskData?.completionParameter ||
      taskData?.completionParameter?.completionParameter === "Without Quiz"
    ) {
      // console.log("in");
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
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/${openTask?.taskType}/taskId/${taskData?._id}/chapterId/${taskData?.chapterId}`,
        sendData
      );
      Loading().close();
      // setCompletionStatus(true);
      if (submitCompletion?.data?.acknowledged) {
        setCount(count + 1);
        setCompletionStatus(true);
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "You have completed successfully!",
        });
        // navigate(`/questLevels/${chapterId}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Some thing wrong happen please try again later!",
        });
      }
    } else {
      // console.log("else");
      Loading().close();
      setOpenQuiz(true);
      setOverlayVisible(true);
    }
  };
  // console.log(taskData);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleDownload = async () => {
    try {
      // If there's an ongoing download, cancel it
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

      // Determine file name and extension
      const fileName = taskData?.additionalFiles.split("/").pop();
      const fileExtension = fileName.split(".").pop();
      const mimeType = getMimeType(fileExtension);

      // Create Blob with response data
      const blob = new Blob([response.data], { type: mimeType });

      // Save file
      saveAs(blob, fileName);
    } catch (error) {
      if (axios.isCancel(error)) {
        // console.log("Download cancelled:", error.message);
      } else {
        console.error("Error downloading the file:", error);
      }
    } finally {
      setCancelTokenSource(null);
      setDownloadProgress(0);
    }
  };

  // Helper function to get MIME type based on file extension
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
    // Cleanup the download if component unmounts or taskData?.additionalFiles changes
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Download cancelled due to component unmount");
      }
    };
  }, [taskData?.additionalFiles, cancelTokenSource]);

  useEffect(() => {
    // Cleanup the download if taskData?.additionalFiles changes
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel(
          "Download cancelled due to change in taskData"
        );
        setCancelTokenSource(null);
        setDownloadProgress(0);
      }
    };
  }, [taskData?.additionalFiles, cancelTokenSource]);
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
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

      {!iframeLoaded && (
        <div className=" flex justify-center  w-full  ">
          <div className="flex flex-col items-center gap-3">
            <p className="mt-20">Loading...</p>
            <Box sx={{ width: "500px" }}>
              <LinearProgress
                sx={{ height: "20px", borderRadius: "10px" }}
                variant="determinate"
                value={progress}
              />
            </Box>
          </div>

          {/* <CircularProgress className="w-full mx-auto" /> */}
        </div>
      )}

      {additionalFile && (
        <div
          key={taskData?._id}
          className="min-h-[72vh] mb-[60px]"
          style={{ display: iframeLoaded ? "block" : "none" }}
        >
          <div className="container mx-auto relative">
            {/*   {isOverlayVisible && (
              <div
                className="fixed top-0 left-0 w-full h-full z-[9999] bg-transparent"
                onClick={handleCompletion}
              ></div>
            )} */}

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
                  id={taskData?._id}
                  key={taskData?._id}
                  src={additionalFile && additionalFile}
                  onLoad={() => {
                    // console.log("iframe loaded");
                    setIframeLoaded(true);
                  }}
                  title="Your Document"
                  className="h-[68vh] mx-auto border-x-30 mt-40 border-[10px] border-b-50 rounded-lg border-[#292929]"
                  width="90%"
                  height="80vh"
                ></iframe>
              ))}

            {/* <iframe
            id="document"
            // key={additionalFile}
            key={taskData?._id || additionalFile}
            src="https://experiment-labs-my-bucket.s3.eu-north-1.amazonaws.com/_Level+1+-+Getting+Started+Edvanta.pdf"
            // src={`https://docs.google.com/viewer?url=${
            //   taskData?.additionalFiles ? taskData?.additionalFiles : ""
            // }&embedded=true`
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
              {/*  {downloadProgress > 0 && (
                <div className="ml-4 flex items-center">
                  <p>{downloadProgress}%</p>
                </div>
              )} */}
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
        />
      )}
      <div className="px-4 py-20 textEditor">
        <div dangerouslySetInnerHTML={{ __html: taskData?.readingMaterial }} />
      </div>
    </div>
  );
};

export default ReadingTask;
