import React, { useState } from "react";
import uploadFileToS3 from "../../../../UploadComponent/s3Uploader";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";

const Submission = ({ taskData }) => {
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  // upload file
  const [dragActive, setDragActive] = useState(true);
  const { userInfo } = useContext(AuthContext);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    let fileUrl = "";
    if (selectedFile) fileUrl = await uploadFileToS3(selectedFile);

    const manageAssignment = {
      taskId: taskData?._id,
      taskName: taskData?.taskName,
      fileUrl: fileUrl,
      submitter: userInfo,
    };

    if (manageAssignment) {
      const newAssignment = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/submitAssignment`,
        manageAssignment
      );

      if (newAssignment?.data?.acknowledged) {
        toast.success("Assignment Submitted Successfully");
      }

      console.log(manageAssignment);
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="49"
            viewBox="0 0 26 49"
            fill="none"
          >
            <path
              d="M0.382812 48.7921V0.25H25.1492V48.7921H0.382812Z"
              fill="#BA8864"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="202"
            height="56"
            viewBox="0 0 202 56"
            fill="none"
          >
            <path
              d="M201.714 50.2889L3.51277 55.6087L16.8306 29.8516L0.808594 3.89223L189.553 0.934166L201.714 50.2889Z"
              fill="#4D2609"
            />
          </svg>
          <h1 className=" text-[20px] font-[600] mt-[-44px] text-white ">
            {taskData?.assignmentTotalPointsMarks} Points
          </h1>
        </div>
      </div>
      <div className="px-4">
        <div className="rounded-lg mt-[85px] border-2 border-dashed border-[#1530DB] max-w-[950px] mx-auto p-3 text-center bg-[#F1F3FF] ">
          <label>
            <div
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="">
                {fileLoading && (
                  <div>
                    <img
                      className="mx-auto animate-ping"
                      style={{ height: "70px", width: "70px" }}
                      src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                      alt=""
                    />
                    <p className="text-xl text-gray-400">Loading ...</p>
                  </div>
                )}
                {!fileLoading && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-[#19835D] p-[15px] rounded-full mt-[30px] ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M17.6696 11.9719V15.1589C17.6696 15.5816 17.5018 15.9869 17.2029 16.2857C16.9041 16.5845 16.4988 16.7524 16.0761 16.7524H4.92163C4.499 16.7524 4.09369 16.5845 3.79485 16.2857C3.49601 15.9869 3.32813 15.5816 3.32812 15.1589V11.9719"
                          stroke="#F0F2FF"
                          stroke-width="1.5935"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.4831 6.39489L10.4994 2.41113L6.51562 6.39489"
                          stroke="#F0F2FF"
                          stroke-width="1.5935"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.4961 2.41113V11.9721"
                          stroke="#F0F2FF"
                          stroke-width="1.5935"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-[18px] font-[700] my-[30px] ">
                      Drag & Drop Files or{" "}
                      <span className=" text-[#3E4DAC] underline ">Browse</span>
                    </p>
                    {selectedFile && (
                      <p className="text-[18px] font-[700] mb-[30px] ">
                        File:{" "}
                        <span className="font-[500]">{selectedFile?.name}</span>
                      </p>
                    )}
                  </div>
                )}
                {/* <p className="py-4">
                  <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                    Upload Video
                  </span>
                </p> */}
              </div>
            </div>
            <input
              className="hidden"
              type="file"
              name="file"
              placeholder="upload"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <div className="my-[80px] flex items-center justify-center ">
        <button
          onClick={handleSubmit}
          className={`bg-[#3E4DAC] text-white px-4 h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
        >
          Submit assignment
        </button>
      </div>
    </div>
  );
};

export default Submission;
