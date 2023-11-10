import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const FilesTask = ({ taskData }) => {
  const {userInfo} = useContext(AuthContext);
  if(userInfo.role !== 'admin'){
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
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
