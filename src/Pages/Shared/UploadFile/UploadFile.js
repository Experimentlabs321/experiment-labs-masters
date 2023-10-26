import React, { useState } from "react";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";

const UploadFile = ({ setFileUrl, children }) => {
  const [fileLoading, setFileLoading] = useState(false);

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileFileDrop = async (e) => {
    e.preventDefault();
    setFileLoading(true);
    const files = e.dataTransfer.files;

    let res = "";
    if (files[0]) res = await uploadFileToS3(files[0]);

    setFileUrl(res);
    setFileLoading(false);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    setFileLoading(true);
    const files = e.target.files;

    let res = "";
    if (files[0]) res = await uploadFileToS3(files[0]);

    setFileUrl(res);
    setFileLoading(false);
  };

  return (
    <div>
      <div className="col-span-12 md:col-span-6">
        <div className="rounded-lg border-2 border-dotted border-gray-400 p-3 text-center">
          <label>
            <div
              // className="mt-12 text-center"
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileFileDrop}
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
                {!fileLoading && <div>{children}</div>}
                {/* <p className="py-4">
                  <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold  text-Docy-Dark dark:text-white">
                    Upload Thumbnail
                  </span>
                </p> */}
              </div>
            </div>
            <input
              className="hidden"
              type="file"
              name="thumbnail"
              placeholder="upload"
              onChange={uploadFile}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
