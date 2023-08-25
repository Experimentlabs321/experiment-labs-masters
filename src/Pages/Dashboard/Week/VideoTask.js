import React from "react";

const VideoTask = ({ taskData, something }) => {
  console.log(taskData);
  return (
    <div>
      {taskData?.additionalFiles && (
        <div className="h-[70vh] mb-[60px] ">
          {/* <iframe
            className="h-[68vh] mx-auto border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929]"
            width="90%"
            height="80vh"
            // src="https://experiment-labs-my-bucket.s3.eu-north-1.amazonaws.com/Coke+Studio+Bangla+_+Season+2+_+Return+of+Magic++%23+CokeStudioBangla+%23CSBS2+%23RealMagic.mp4"
            src={taskData?.additionalFiles}
            title="YouTube video player"
            frameborder="0"
            sandbox="allow-same-origin allow-scripts allow-presentation"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}
          <div>
            <video
              className="max-h-[68vh] max-w-[90%] w-fit mx-auto border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929]"
              width="90%"
              height="80vh"
              controls
              controlsList="nodownload"
            >
              <source
                src={taskData?.additionalFiles}
                // src="https://www.youtube.com/embed/0OK91ijimIU"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTask;
