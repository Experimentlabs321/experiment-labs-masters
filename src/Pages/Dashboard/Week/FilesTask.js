import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Swal from "sweetalert2";
import axios from "axios";

const FilesTask = ({ taskData }) => {
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
        },
        participantTask: {
          participant: {
            email: userInfo?.email,
            participantId: userInfo?._id,
            status: "Completed",
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
      if (submitCompletion?.data?.acknowledged)
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "You have completed successfully!",
        });
    } else {
      setOpenQuiz(!openQuiz);
      setOverlayVisible(openQuiz);
    }
  };
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
      <div className="h-[70vh] mb-[60px] ">
        {taskData?.additionalFiles && (
          <iframe
            className="h-[68vh] mx-auto border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929]"
            src={`https://docs.google.com/viewer?url=${taskData?.additionalFiles}&embedded=true`}
            width="90%"
            height="80vh"
            title="W3Schools Free Online Web Tutorials"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default FilesTask;
