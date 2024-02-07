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

const ReadingTask = ({ taskData }) => {
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
    else setCompletionStatus(false);
    if (taskData?.additionalFiles) {
      setAdditionalFile(
        `https://docs.google.com/viewer?url=${taskData?.additionalFiles}&embedded=true`
      );
    }
  }, [taskData, user]);

  useEffect(() => {
    const specificDiv = document.getElementById("document");
    if (specificDiv) {
      console.log("Specific div has loaded.");
      // You can perform actions related to the specific div here
    }
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

  console.log(additionalFile);
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
      <div className="min-h-[72vh] mb-[60px]">
        <div className="container mx-auto relative">
          {isOverlayVisible && (
            <div
              className="fixed top-0 left-0 w-full h-full z-[9999] bg-transparent"
              onClick={handleCompletion}
            ></div>
          )}
          {additionalFile && (
            <iframe
              id="document"
              key={additionalFile}
              src={additionalFile}
              title="Your Document"
              className="h-[68vh] mx-auto border-x-30 mt-40 border-t-30 border-b-50 rounded-lg border-[#292929]"
              width="90%"
              height="80vh"
            ></iframe>
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
      </div>
    </div>
  );
};

export default ReadingTask;
