import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const AudioTask = ({ taskData, count, setCount }) => {
  const { userInfo } = useContext(AuthContext);
  if (userInfo.role !== "admin") {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }
  return (
    <div>
      {taskData?.additionalFiles && (
        <div className="h-[70vh] mb-[60px] ">
          <div className="h-[68vh] w-[90%] mx-auto border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929] flex items-center justify-center">
            <audio controls controlsList="nodownload">
              <source src={taskData?.additionalFiles} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* <iframe
            // src="https://experiment-labs-my-bucket.s3.eu-north-1.amazonaws.com/Coke+Studio+Bangla+_+Season+2+_+Return+of+Magic++%23+CokeStudioBangla+%23CSBS2+%23RealMagic.mp4"
            src={taskData?.additionalFiles}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}
        </div>
      )}
    </div>
  );
};

export default AudioTask;
