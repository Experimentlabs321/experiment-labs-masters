import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Swal from "sweetalert2";
import axios from "axios";
import { saveAs } from "file-saver";
import Loading from "../../Shared/Loading/Loading";
import Quiz from "./SubFile/Shared/Quiz";
import { CircularProgress } from "@mui/material";

const FilesTask = ({ taskData, count, setCount }) => {
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
  const [additionalFile, setAdditionalFile] = useState("");
  const pdfContainerRef = useRef(null);
  // useEffect(() => {
  //   setCompletionStatus(false);
  //   if (
  //     taskData?.participants?.find(
  //       (item) => item?.participant?.email === user?.email
  //     )
  //   )
  //     setCompletionStatus(true);

  //   console.log(taskData);
  // }, [taskData, user, count, taskData?._id]);

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
      // const submitCompletion = await axios.post(
      //   `https://experiment-labs-master-server.vercel.app/chapter/${taskData?.chapterId}/task/${taskData?._id}/add-participant/${openTask?.taskType}`,
      //   sendData
      // );

      const submitCompletion = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/${openTask?.taskType}/taskId/${taskData?._id}/chapterId/${taskData?.chapterId}`,
        sendData
      );
      console.log(submitCompletion);
      console.log(sendData);
      setCompletionStatus(true);
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
      console.log("else");
      Loading().close();
      setOpenQuiz(true);
      setOverlayVisible(true);
    }
  };
  console.log(taskData?.fileDescription);
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
        console.log("Download cancelled:", error.message);
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
  return (
    <div>
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
          <div className=" flex align-items-center my-5 py-5 w-full">
            <CircularProgress className="w-full mx-auto" />
          </div>
        )}

        {additionalFile && (
          <div
            key={taskData?._id}
            className="min-h-[72vh] mb-[60px]"
            style={{ display: iframeLoaded ? "block" : "none" }}
          >
            <div className="container mx-auto relative">
              {isOverlayVisible && (
                <div
                  className="fixed top-0 left-0 w-full h-full z-[9999] bg-transparent"
                  onClick={handleCompletion}
                ></div>
              )}

              <>
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
                          console.log("iframe loaded");
                          setIframeLoaded(true);
                        }}
                        className="w-[90%] mx-auto h-[68vh] border-[10px] border-b-50 rounded-lg border-[#292929]"
                      />
                    </div>
                  ) : taskData?.additionalFiles.endsWith(".mp4") ||
                    taskData?.additionalFiles.endsWith(".mov") ||
                    taskData?.additionalFiles.endsWith(".wmv") ||
                    taskData?.additionalFiles.endsWith(".flv") ||
                    taskData?.additionalFiles.endsWith(".avi") ||
                    taskData?.additionalFiles.endsWith(".avchd") ||
                    taskData?.additionalFiles.endsWith(".webm") ||
                    taskData?.additionalFiles.endsWith(".mkv") ? (
                    <div className="">
                      <video
                        key={taskData?._id}
                        className="mx-auto rounded-lg border-[#292929]"
                        width="90%"
                        height="80vh"
                        onLoadedData={() => {
                          console.log("iframe loaded");
                          setIframeLoaded(true);
                        }}
                        controls
                        controlsList="nodownload"
                        disablePictureInPicture
                      >
                        <source
                          src={taskData?.additionalFiles}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  ) : (
                    <>
                      <iframe
                        id={taskData?._id}
                        key={taskData?._id}
                        src={additionalFile && additionalFile}
                        onLoad={() => {
                          console.log("iframe loaded");
                          setIframeLoaded(true);
                        }}
                        title="Your Document"
                        className="h-[68vh] mx-auto border-x-30 mt-40 border-[10px] border-b-50 rounded-lg border-[#292929]"
                        width="90%"
                        height="80vh"
                      ></iframe>
                    </>
                  ))}
              </>

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
          />
        )}
        <div className="px-4 py-20 textEditor">
          <div
            dangerouslySetInnerHTML={{ __html: taskData?.readingMaterial }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilesTask;
