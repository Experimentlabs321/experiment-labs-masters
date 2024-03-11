import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Swal from "sweetalert2";
import axios from "axios";
import { saveAs } from "file-saver";
import Loading from "../../Shared/Loading/Loading";

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
  const pdfContainerRef = useRef(null);
  useEffect(() => {
    setCompletionStatus(false);
    if (
      taskData?.participants?.find(
        (item) => item?.participant?.email === user?.email
      )
    )
      setCompletionStatus(true);

    console.log(taskData);
  }, [taskData, user, count, taskData?._id]);

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

      {taskData?.additionalFiles && (
        <>
          <div className="h-[70vh] mb-[60px] ">
            <iframe
              className="h-[68vh] mx-auto border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929]"
              src={`https://docs.google.com/viewer?url=${taskData?.additionalFiles}&embedded=true`}
              width="90%"
              height="80vh"
              title="W3Schools Free Online Web Tutorials"
            ></iframe>
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
                  className="bg-red text-white p-3 rounded-lg text-xl ml-4"
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
        </>
      )}

      <div
        className={`my-5 mb-5 px-2 ${!taskData?.additionalFiles ? " " : ""}`}
        dangerouslySetInnerHTML={{ __html: taskData?.fileDescription }}
      />
    </div>
  );
};

export default FilesTask;
