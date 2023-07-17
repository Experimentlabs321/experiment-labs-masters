import React, { useState } from "react";
import StarLight from "../../../../assets/Dashboard/StarLight.png";
import StarDark from "../../../../assets/Dashboard/StarDark.png";
import WebinarsLight from "../../../../assets/Dashboard/WebinarsLight.png";
import WebinarsDark from "../../../../assets/Dashboard/WebinarsDark.png";
import BookmarksLight from "../../../../assets/Dashboard/BookmarksLight.png";
import BookmarksDark from "../../../../assets/Dashboard/BookmarksDark.png";
import DiscussionsLight from "../../../../assets/Dashboard/DiscussionsLight.png";
import DiscussionsDark from "../../../../assets/Dashboard/DiscussionsDark.png";
import CourseAccessIconLight from "../../../../assets/Dashboard/CourseAccessIconLight.svg";
import CourseAccessIconDark from "../../../../assets/Dashboard/CourseAccessIconDark.svg";
import CourseTham from "../../../../assets/Dashboard/CourseTham.png";
import Reading from "../../../../assets/Dashboard/TaskIcon.png";
import ReadingActive from "../../../../assets/Dashboard/TaskIconActive.png";
import { Link, useLocation } from "react-router-dom";

const data = [
  {
    name: "Topic 1",
    tasks: [
      {
        taskName: "Task of topic 1",
        type: "Reading",
      },
      {
        taskName: "Task of topic 1",
        type: "Reading",
      },
    ],
  },
  {
    name: "Topic 2",
    tasks: [
      {
        taskName: "Task of topic 2",
        type: "Classes",
      },
      {
        taskName: "Task of topic 2",
        type: "Quiz",
      },
      {
        taskName: "Task of topic 2",
        type: "File",
      },
      {
        taskName: "Task of topic 2",
        type: "LiveTest",
      },
    ],
  },
];

const Aside = ({ toggleButton, setToggleButton }) => {
  const [openTopic, setOpenTopic] = useState(data[0]?.name);
  const [openTask, setOpenTask] = useState(data[0]?.tasks[0]);
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

  console.log(toggleButton);
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
              {data?.map((item, index) => (
                <li>
                  <div>
                    <div
                      onClick={() => setOpenTopic(item?.name)}
                      className={`text-white font-normal rounded-[15px] flex items-center px-[20px] py-[13px] cursor-pointer group`}
                    >
                      <div className="w-[42px] h-[42px] bg-[#D7DDFF] text-black flex items-center justify-center rounded-full ">
                        {index + 1}
                      </div>

                      <h1
                        className={`text-white ml-3 text-[18px] font-[500] flex items-center justify-center `}
                      >
                        <span className="mr-[22px]">{item.name}</span>
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
                      className={`${openTopic === item?.name ? "" : "hidden"}`}
                    >
                      {item?.tasks?.map((task, index) => (
                        <div
                          onClick={() => setOpenTask(task)}
                          className={`${
                            openTask === task
                              ? "bg-[#FFFDCF] border-[#3E4DAC] border-l-[12px] pl-[8px]"
                              : "pl-[20px]"
                          }  text-white font-normal flex items-center pr-[10px] py-[13px] group cursor-pointer`}
                        >
                          <div className="w-[40px] h-[40px] text-black flex items-center justify-center rounded-full ">
                            <img
                              className={`${
                                openTask === task
                                  ? "border-black"
                                  : "border-white"
                              }  border p-[5px] rounded-full `}
                              src={openTask === task ? ReadingActive : Reading}
                              alt="TaskIcon"
                            />
                          </div>

                          <h1
                            className={`text-white ml-3 text-[18px] font-[500] flex items-center justify-center `}
                          >
                            <span
                              className={`mr-[5px] ${
                                openTask === task ? "text-black" : "text-white"
                              } `}
                            >
                              Task {index + 1}:{" "}
                            </span>{" "}
                            <span
                              className={`mr-[22px] ${
                                openTask === task
                                  ? "text-[#3E4DAC]"
                                  : "text-[#A4B0FF]"
                              }  `}
                            >
                              {task?.taskName}
                            </span>
                          </h1>
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
