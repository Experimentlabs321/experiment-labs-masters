// import mammoth from "mammoth";
import React, { useContext, useEffect, useState, useRef } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Quiz from "./SubFile/Shared/Quiz";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import icon from "../../../icon192.png";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import { saveAs } from 'file-saver';

const ReadingTask = ({ taskData, chapterId }) => {
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
    if (taskData?.additionalFiles) {
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
      console.log(
        "Specific div has loaded.",
        additionalFile,
        taskData?.additionalFiles
      );
      // You can perform actions related to the specific div here
    }
  }, [taskData, user, additionalFile]);

  const handleCompletion = async () => {
    Loading();
    if (
      !taskData?.completionParameter ||
      taskData?.completionParameter?.completionParameter === "Without Quiz"
    ) {
      console.log("in");
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
  console.log(taskData);
  const handleDownload = async () => {
    try {
      const response = await axios.get(taskData?.additionalFiles, {
        responseType: 'blob', // Important
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, 'Your_Document_Name.pdf');
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
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

      {additionalFile && (
        <div className="min-h-[72vh] mb-[60px]">
          <div className="container mx-auto relative">
            {isOverlayVisible && (
              <div
                className="fixed top-0 left-0 w-full h-full z-[9999] bg-transparent"
                onClick={handleCompletion}
              ></div>
            )}

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
                    className="w-[90%] mx-auto h-[68vh] border-[10px] border-b-50 rounded-lg border-[#292929]"
                  />
                </div>
              ) : (
                <iframe
                  id="document"
                  key={taskData?._id || additionalFile}
                  src={additionalFile}
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
          {
            (taskData?.enableDownload) && (
              <div className="flex justify-end me-20 my-10">
                <button
                  className="bg-blue text-white p-3 rounded-lg text-xl"
                  onClick={handleDownload}
                >
                  Download
                </button>

              </div>
            )
          }

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
        <div dangerouslySetInnerHTML={{ __html: taskData?.readingMaterial }} />
      </div>
    </div>
  );
};

export default ReadingTask;
