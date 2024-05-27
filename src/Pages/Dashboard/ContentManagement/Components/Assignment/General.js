import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import required from "../../../../../assets/ContentManagement/required.png";
import TextEditor from "../../../../Shared/TextEditor/TextEditor";
import ContentStage from "../Shared/ContentStage";

const General = ({
  selectedFile,
  setSelectedFile,
  instructions,
  setInstructions,
  assignmentData,
  batchesData,
  selectedBatches,
  setSelectedBatches,
  handleOptionChangeBatch,
  schedule,
  setSchedule,
  contentStage,
  setContentStage,
  enableDrip,
  setTaskDrip,
  taskDrip,
  executionMentors,
  setExecutionMentors,
  selectedMentors,
  setSelectedMentors,
}) => {
  // upload file
  const [dragActive, setDragActive] = useState(true);

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
  const handleOptionChangeMentor = (event, optionValue) => {
    // const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedMentors([
        ...selectedMentors,
        { mentorEmail: optionValue?.email, mentorId: optionValue?._id },
      ]);
      // if (selectedMentors) {
      // } else {
      //   setSelectedMentors([
      //     { mentorEmail: optionValue?.email, mentorId: optionValue?._id },
      //   ]);
      // }
    } else {
      setSelectedMentors(
        selectedMentors.filter(
          (option) => option?.mentorId !== optionValue?._id
        )
      );
    }
  };

  console.log(schedule);
  return (
    <div>
      <div className="dropdown-menu mt-[71px] mb-[45px] border-b-2 ">
        <div className="flex flex-col lg:flex-row justify-between me-10 mb-20">
          <div>
            <div className="">
              <div className="flex items-center gap-4">
                <p className="h-2 w-2 bg-black rounded-full"></p>
                <p className="font-bold text-lg me-[36px]">Assignment Name</p>
                <img src={required} alt="required" />
              </div>

              <input
                required
                defaultValue={
                  assignmentData ? assignmentData?.assignmentName : ""
                }
                className="mt-6 ms-6 border rounded-md lg:w-[430px] w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                name="assignmentName"
                type="text"
                placeholder="Eg. Excel with Shekhar Gupta"
              />
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
                <div className="bg-white text-black textEditor">
                  <TextEditor value={instructions} setValue={setInstructions} />
                </div>
              </div>
              {/* <p>{instructions}</p>
              <div dangerouslySetInnerHTML={{ __html: instructions }} /> */}
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
                defaultValue={
                  assignmentData
                    ? assignmentData?.assignmentTotalPointsMarks
                    : ""
                }
                className="mt-6 ms-6 border rounded-md lg:w-[430px] w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                name="assignmentTotalPointsMarks"
                type="text"
                placeholder="Eg. 40 point"
              />
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
                  {assignmentData && (
                    <p className=" text-center break-words max-w-full overflow-hidden">
                      {assignmentData?.file}
                    </p>
                  )}
                  {selectedFile && (
                    <p className=" text-center break-words max-w-full overflow-hidden">
                      Selected file: {selectedFile.name}
                    </p>
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
                          defaultValue={
                            assignmentData ? assignmentData?.file : ""
                          }
                          // accept=".jpg, .jpeg, .png"
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
        <div className="mb-5">
          <div className="flex items-center gap-4">
            <p className="h-2 w-2 bg-black rounded-full"></p>
            <p className="font-bold text-lg me-[36px]">Select Batch</p>
            <img src={required} alt="" />
          </div>
          <ul className="flex gap-4 flex-wrap ">
            {batchesData?.map((option, index) => {
              return (
                <>
                  <li
                    key={index}
                    className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] "
                  >
                    <input
                      type="checkbox"
                      id="student"
                      name={option?.batchName}
                      value={option?.batchName}
                      checked={selectedBatches?.find(
                        (item) => item?.batchId === option?._id
                      )}
                      onChange={(e) => handleOptionChangeBatch(e, option)}
                      className=" mb-1"
                    />
                    <div className="flex mb-1 items-center">
                      <label className="ms-4" htmlFor={option?.batchName}>
                        {option?.batchName}
                      </label>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        {schedule && (
          <>
            {schedule?.map((singleSchedule, index) => (
              <>
                <h1 className="text-xl font-bold">
                  {singleSchedule?.batchName}
                </h1>
                <div className="flex flex-col lg:flex-row">
                  <div className="mb-12 basis-1/2 flex flex-col">
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
                      defaultValue={
                        singleSchedule
                          ? singleSchedule?.assignmentStartingDateTime
                          : ""
                      }
                      onChange={(e) => {
                        schedule[index].assignmentStartingDateTime =
                          e.target.value;
                      }}
                      className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name={`${singleSchedule?.batchId}AssignmentStartingDateTime`}
                      type="datetime-local"
                      placeholder="Eg. Entrepreneurship Lab"
                    />
                  </div>
                  <div className="mb-12 basis-1/2 flex flex-col">
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
                      defaultValue={
                        singleSchedule
                          ? singleSchedule?.assignmentEndingDateTime
                          : ""
                      }
                      onChange={(e) => {
                        schedule[index].assignmentEndingDateTime =
                          e.target.value;
                      }}
                      className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name={`${singleSchedule?.batchId}AssignmentEndingDateTime`}
                      type="datetime-local"
                      placeholder="Eg. Entrepreneurship Lab"
                    />
                  </div>
                </div>
              </>
            ))}
          </>
        )}
        <div className="mb-5">
          <div className="flex items-center gap-4">
            <p className="h-2 w-2 bg-black rounded-full"></p>
            <p className="font-bold text-lg me-[36px]">Select Mentor</p>
            {/* <img src={required} alt="" /> */}
          </div>
          <ul className="flex gap-4 flex-wrap ">
            {executionMentors?.map((option, index) => {
              return (
                <>
                  <li
                    key={index}
                    className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] "
                  >
                    <input
                      type="checkbox"
                      id="student"
                      name={option?._id}
                      value={option?._id}
                      checked={selectedMentors?.find(
                        (item) => item?.mentorId === option?._id
                      )}
                      onChange={(e) => handleOptionChangeMentor(e, option)}
                      className=" mb-1"
                    />
                    <div className="flex mb-1 items-center">
                      <label className="ms-4" htmlFor={option?._id}>
                        {option?.name}
                      </label>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="mb-8">
          <ContentStage
            contentStage={contentStage}
            setContentStage={setContentStage}
          />
        </div>
        <div className="space-y-4 mb-8">
          <fieldset>
            <div className="flex items-center gap-4 mb-5">
              <p className="h-2 w-2 bg-black rounded-full"></p>
              <p className="font-bold text-lg me-[36px]">Enable Drip</p>
              <img src={required} alt="" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="radioYes"
                  name="radioOption"
                  checked={taskDrip === true}
                  onChange={() => setTaskDrip(true)}
                  disabled={enableDrip}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label
                  htmlFor="radioYes"
                  className={`ml-2 text-sm font-medium ${
                    enableDrip ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  Yes
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="radioNo"
                  name="radioOption"
                  checked={taskDrip === false}
                  onChange={() => setTaskDrip(false)}
                  disabled={enableDrip}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label
                  htmlFor="radioNo"
                  className={`ml-2 text-sm font-medium ${
                    enableDrip ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  No
                </label>
              </div>
            </div>
          </fieldset>

          {enableDrip && (
            <p className="text-sm text-red-500">
              Course Drip Must Be Turned Off to add Task Drip.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default General;
