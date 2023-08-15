import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import required from "../../../../../assets/ContentManagement/required.png";
import TextEditor from "../../../../Shared/TextEditor/TextEditor";

const General = ({selectedFile, setSelectedFile}) => {
  // upload file
  const [dragActive, setDragActive] = useState(true);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [instructions, setInstructions] = useState("");

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
  return (
    <div>
      <div className="dropdown-menu mt-[71px] mb-[45px] border-b-2 ">
        <div className="flex justify-between me-10 mb-20">
          <div>
            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">Assignment Name</p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                name="assignmentName"
                type="text"
                placeholder="Eg. Excel with Shekhar Gupta"
              />
            </div>

            <div className="mt-12 flex flex-col">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">
                  {" "}
                  Assignment Starting Date and Time{" "}
                </p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                name="AssignmentStartingDateTime"
                type="datetime-local"
                placeholder="Eg. Entrepreneurship Lab"
              />
              {/* <input required className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
            </div>

            <div className="mt-12">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">
                  {" "}
                  Assignment Instructions
                </p>
                <img src={required} alt="required" />
              </div>

              {/* Text editor */}
              <div className="py-4">
                <div className="bg-white text-black">
                  <TextEditor setValue={setInstructions} />
                </div>
              </div>
              {/* <p>{value}</p>
            <div dangerouslySetInnerHTML={{ __html: value }} /> */}
              {/* Add Tags */}
              {/* <input
                required
                className="mt-6 ms-6 border rounded-md w-[440px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                name="assignmentInstructions"
                type="text"
                placeholder="Eg. Excel with Shekhar Gupta"
              /> */}
            </div>
          </div>

          <div>
            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">
                  Assignment Total Points/Marks
                </p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                className="mt-6 ms-6 border rounded-md w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                name="assignmentTotalPointsMarks"
                type="text"
                placeholder="Eg. 40 point"
              />
            </div>

            <div className="mt-12 flex flex-col">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">
                  {" "}
                  Assignment Ending Date and Time{" "}
                </p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                name="AssignmentEndingDateTime"
                type="datetime-local"
                placeholder="Eg. Entrepreneurship Lab"
              />
              {/* <input required className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
            </div>

            <div className="w-full mt-12">
              <div className=" flex flex-col">
                <div className="flex items-center gap-4">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]">Upload Files</p>
                </div>

                <div
                  className="w-3/4 h-[253px] bg-[#F6F7FF] flex flex-col items-center justify-center rounded-b-lg mt-6 ms-6"
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  style={{
                    border: "0.917px dashed #000",
                    background: "#F6F7FF",
                  }}
                >
                  {dragActive ? (
                    <>
                      <CloudUploadIcon />
                      <p className="text-[17px] font-semibold mb-3 mt-3">
                        Drag and drop{" "}
                      </p>
                      <p className="text-sm font-medium mb-3">Or</p>
                    </>
                  ) : (
                    selectedFile && <p>Selected file: {selectedFile.name}</p>
                  )}
                  {!selectedFile && (
                    <>
                      <div className="flex gap-2 justify-center w-full">
                        <label
                          className="flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold"
                          htmlFor="input-file-upload"
                        >
                          Browser
                        </label>
                        <input
                          className="w-[1%]"
                          style={{ fontSize: "0", opacity: "0" }}
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          name="input-file-upload"
                          id="input-file-upload"
                          onChange={handleFileChange}
                          multiple
                        />
                      </div>
                    </>
                    // <input type="file" id="input-file-upload" onChange={handleFileChange} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
