import React, { useState } from "react";
import Reading from "../../../../assets/Dashboard/TaskIcon.png";
import ReadingActive from "../../../../assets/Dashboard/TaskIconActive.png";
import Assignment from "../../../../assets/Dashboard/Assignment.png";
import AssignmentActive from "../../../../assets/Dashboard/AssignmentActive.png";
import Classes from "../../../../assets/Dashboard/Classes.png";
import ClassesActive from "../../../../assets/Dashboard/ClassesActive.png";
import Quiz from "../../../../assets/Dashboard/Quiz.png";
import QuizActive from "../../../../assets/Dashboard/QuizActive.png";
import LiveTest from "../../../../assets/Dashboard/LiveTest.png";
import LiveTestActive from "../../../../assets/Dashboard/LiveTestActive.png";
import Video from "../../../../assets/Dashboard/Video.png";
import VideoActive from "../../../../assets/Dashboard/VideoActive.png";
import Audio from "../../../../assets/Dashboard/Audio.png";
import AudioActive from "../../../../assets/Dashboard/AudioActive.png";
import Files from "../../../../assets/Dashboard/Files.png";
import FilesActive from "../../../../assets/Dashboard/FilesActive.png";
import { Link, useLocation } from "react-router-dom";

const Aside = ({
  toggleButton,
  setToggleButton,
  data,
  openTask,
  setOpenTask,
  openTopic,
  setOpenTopic,
  chapters,
}) => {
  // const [openTopic, setOpenTopic] = useState(data[0]?.name);
  // const [openTask, setOpenTask] = useState(data[0]?.tasks[0]);
  const Role = localStorage.getItem("role");
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Category");
  const options = ["Category name"];

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <aside
      id="sidebar"
      className={`fixed ${
        toggleButton ? "flex lg:flex" : "hidden"
      } z-20 h-full top-0 bg-[#141414] shadow-lg left-0  flex-shrink-0 flex-col w-[324px] transition duration-500 ease-in-out delay-150`}
      aria-label="Sidebar"
    >
      <div className=" flex-1 flex flex-col min-h-0 pt-0">
        <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
          <div className="flex-1 space-y-1">
            <ul className="space-y-2  pt-[125px] pb-2 text-white">
              <li>
                <button
                  onClick={() => setToggleButton(false)}
                  className="text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px]  group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                  >
                    <path
                      d="M2.55758 6.94027C1.66762 6.94027 0.949219 7.65867 0.949219 8.54862C0.949219 9.43858 1.66762 10.157 2.55758 10.157C3.44753 10.157 4.16593 9.43858 4.16593 8.54862C4.16593 7.65867 3.44753 6.94027 2.55758 6.94027ZM2.55758 0.506836C1.66762 0.506836 0.949219 1.22524 0.949219 2.11519C0.949219 3.00515 1.66762 3.72355 2.55758 3.72355C3.44753 3.72355 4.16593 3.00515 4.16593 2.11519C4.16593 1.22524 3.44753 0.506836 2.55758 0.506836ZM2.55758 13.3737C1.66762 13.3737 0.949219 14.1028 0.949219 14.9821C0.949219 15.8613 1.67834 16.5904 2.55758 16.5904C3.43681 16.5904 4.16593 15.8613 4.16593 14.9821C4.16593 14.1028 3.44753 13.3737 2.55758 13.3737ZM5.77429 16.0543H20.7856V13.9098H5.77429V16.0543ZM5.77429 9.62086H20.7856V7.47639H5.77429V9.62086ZM5.77429 1.04296V3.18743H20.7856V1.04296H5.77429Z"
                      fill="white"
                    />
                  </svg>
                  <h1 className="ml-3 text-[18px] font-[500]">Hide menu</h1>
                </button>
              </li>
              {chapters?.map((item, index) => (
                <li>
                  <div>
                    <div
                      onClick={() => setOpenTopic(item?.chapterName)}
                      className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px] cursor-pointer group`}
                    >
                      <div className="w-[42px] h-[42px] bg-[#D7DDFF] text-black flex items-center justify-center rounded-full ">
                        {index + 1}
                      </div>

                      <h1
                        className={`text-white ml-3 text-[18px] font-[500] flex items-center justify-center `}
                      >
                        <span className="mr-[22px]">{item?.chapterName}</span>
                        {Role === "admin" && (
                          <svg
                            className="mr-[22px]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                          >
                            <path
                              d="M13.6558 0.724121L17.3789 4.64745L14.5407 7.63965L10.8176 3.71632L13.6558 0.724121ZM0.0195312 19.0173H3.74259L12.7859 9.48754L9.06284 5.5642L0.0195312 15.094V19.0173Z"
                              fill="white"
                            />
                          </svg>
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M6.17272 8.88379L11.8403 14.5513L17.5078 8.88379"
                            stroke="white"
                            stroke-width="1.88918"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </h1>
                    </div>
                    <div
                      className={`${
                        openTopic === item?.chapterName ? "" : "hidden"
                      }`}
                    >
                      {item?.tasks?.map((task, index) => (
                        <div
                          onClick={() => setOpenTask(task)}
                          className={`${
                            openTask?.taskId === task?.taskId
                              ? "bg-[#FFFDCF] border-[#3E4DAC] border-l-[12px] pl-[8px]"
                              : "pl-[20px]"
                          }  text-white font-normal flex items-center justify-between pr-[10px] py-[13px] group cursor-pointer`}
                        >
                          <div className="flex items-center">
                            <div className="w-[40px] h-[40px] text-black flex items-center justify-center rounded-full ">
                              {task?.taskType === "Reading" && (
                                <img
                                  className={`${
                                    openTask?.taskId === task?.taskId
                                      ? "border-black"
                                      : "border-white"
                                  }  border p-[5px] rounded-full `}
                                  src={
                                    openTask?.taskId === task?.taskId
                                      ? ReadingActive
                                      : Reading
                                  }
                                  alt="TaskIcon"
                                />
                              )}
                              {task?.taskType === "Assignment" && (
                                <img
                                  className={`${
                                    openTask?.taskId === task?.taskId
                                      ? "border-black"
                                      : "border-white"
                                  }  border p-[5px] rounded-full `}
                                  src={
                                    openTask?.taskId === task?.taskId
                                      ? AssignmentActive
                                      : Assignment
                                  }
                                  alt="TaskIcon"
                                />
                              )}
                              {task?.taskType === "Classes" && (
                                <img
                                  className={`${
                                    openTask?.taskId === task?.taskId
                                      ? "border-black"
                                      : "border-white"
                                  }  border p-[5px] rounded-full `}
                                  src={
                                    openTask?.taskId === task?.taskId
                                      ? ClassesActive
                                      : Classes
                                  }
                                  alt="TaskIcon"
                                />
                              )}
                              {task?.taskType === "Quiz" && (
                                <img
                                  className={`${
                                    openTask?.taskId === task?.taskId
                                      ? "border-black"
                                      : "border-white"
                                  }  border p-[5px] rounded-full `}
                                  src={
                                    openTask?.taskId === task?.taskId
                                      ? QuizActive
                                      : Quiz
                                  }
                                  alt="TaskIcon"
                                />
                              )}
                              {task?.taskType === "Live Test" && (
                                <img
                                  className={`${
                                    openTask?.taskId === task?.taskId
                                      ? "border-black"
                                      : "border-white"
                                  }  border p-[5px] rounded-full `}
                                  src={
                                    openTask?.taskId === task?.taskId
                                      ? LiveTestActive
                                      : LiveTest
                                  }
                                  alt="TaskIcon"
                                />
                              )}
                              {task?.taskType === "Video" && (
                                <img
                                  className={`${
                                    openTask?.taskId === task?.taskId
                                      ? "border-black"
                                      : "border-white"
                                  }  border p-[5px] rounded-full `}
                                  src={
                                    openTask?.taskId === task?.taskId
                                      ? VideoActive
                                      : Video
                                  }
                                  alt="TaskIcon"
                                />
                              )}
                              {task?.taskType === "Audio" && (
                                <img
                                  className={`${
                                    openTask?.taskId === task?.taskId
                                      ? "border-black"
                                      : "border-white"
                                  }  border p-[5px] rounded-full `}
                                  src={
                                    openTask?.taskId === task?.taskId
                                      ? AudioActive
                                      : Audio
                                  }
                                  alt="TaskIcon"
                                />
                              )}
                              {task?.taskType === "Files" && (
                                <img
                                  className={`${
                                    openTask?.taskId === task?.taskId
                                      ? "border-black"
                                      : "border-white"
                                  }  border p-[5px] rounded-full `}
                                  src={
                                    openTask?.taskId === task?.taskId
                                      ? FilesActive
                                      : Files
                                  }
                                  alt="TaskIcon"
                                />
                              )}
                            </div>
                            <h1
                              className={`text-white ml-3 text-[18px] font-[500]  `}
                            >
                              <span
                                className={`mr-[5px] ${
                                  openTask?.taskId === task?.taskId
                                    ? "text-black"
                                    : "text-white"
                                } `}
                              >
                                {/* Task {index + 1}:  */}
                                {task?.taskType}:
                              </span>{" "}
                              <span
                                className={`mr-[22px] ${
                                  openTask?.taskId === task?.taskId
                                    ? "text-[#3E4DAC]"
                                    : "text-[#A4B0FF]"
                                }  `}
                              >
                                {task?.taskName}
                              </span>
                            </h1>
                          </div>
                          {Role === "admin" && (
                            <>
                              {openTask?.taskId === task?.taskId ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 25 25"
                                  fill="none"
                                >
                                  <path
                                    d="M12.4974 10.417C11.3516 10.417 10.4141 11.3545 10.4141 12.5003C10.4141 13.6462 11.3516 14.5837 12.4974 14.5837C13.6432 14.5837 14.5807 13.6462 14.5807 12.5003C14.5807 11.3545 13.6432 10.417 12.4974 10.417ZM12.4974 4.16699C11.3516 4.16699 10.4141 5.10449 10.4141 6.25033C10.4141 7.39616 11.3516 8.33366 12.4974 8.33366C13.6432 8.33366 14.5807 7.39616 14.5807 6.25033C14.5807 5.10449 13.6432 4.16699 12.4974 4.16699ZM12.4974 16.667C11.3516 16.667 10.4141 17.6045 10.4141 18.7503C10.4141 19.8962 11.3516 20.8337 12.4974 20.8337C13.6432 20.8337 14.5807 19.8962 14.5807 18.7503C14.5807 17.6045 13.6432 16.667 12.4974 16.667Z"
                                    fill="black"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className=" float-right"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 25 25"
                                  fill="none"
                                >
                                  <path
                                    d="M12.4974 10.417C11.3516 10.417 10.4141 11.3545 10.4141 12.5003C10.4141 13.6462 11.3516 14.5837 12.4974 14.5837C13.6432 14.5837 14.5807 13.6462 14.5807 12.5003C14.5807 11.3545 13.6432 10.417 12.4974 10.417ZM12.4974 4.16699C11.3516 4.16699 10.4141 5.10449 10.4141 6.25033C10.4141 7.39616 11.3516 8.33366 12.4974 8.33366C13.6432 8.33366 14.5807 7.39616 14.5807 6.25033C14.5807 5.10449 13.6432 4.16699 12.4974 4.16699ZM12.4974 16.667C11.3516 16.667 10.4141 17.6045 10.4141 18.7503C10.4141 19.8962 11.3516 20.8337 12.4974 20.8337C13.6432 20.8337 14.5807 19.8962 14.5807 18.7503C14.5807 17.6045 13.6432 16.667 12.4974 16.667Z"
                                    fill="white"
                                  />
                                </svg>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
