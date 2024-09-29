import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { AuthContext } from "../../../contexts/AuthProvider";
import DialogLayout from "../Shared/DialogLayout";

const SkillsStatistics = ({ skillsData, selectedCourse }) => {
  // console.log(selectedCourse?._id);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [selectedSkillName, setSelectedSkillName] = useState("");

  const { userInfo, user } = useContext(AuthContext);
  // console.log(userInfo);
  const [course, setCourse] = useState();
  const [taskIds, setTaskIds] = useState();
  const [chapterIds, setChapterIds] = useState();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/courseId/${selectedCourse?._id}`
      )
      .then((response) => {
        // console.log(response);
        const taskName = {};
        const chapterName = {};
        // setAssignment(response?.data)
        const chapters = response?.data;
        chapters?.map((chap) => {
          chapterName[chap.chapterName] = chap._id;
          chap.tasks.map((task) => {
            if (task.taskType === "Assignment") {
              taskName[task.taskName] = task.taskId;
            }
          });
        });
        setChapterIds(chapterName);
        setTaskIds(taskName);
        setCourse(response?.data);
        //console.log(a)
      })
      .catch((error) => console.error(error));
  }, [selectedCourse?._id]);

  // console.log(course);
  // console.log(taskIds);
  // console.log(chapterIds);

  const [allResults, setAllResult] = useState();

  useEffect(() => {
    axios
      .get(
        // `${process.env.REACT_APP_BACKEND_API}/getSubmitAssignment/all/${userInfo._id}`
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/assignmentSubmissions/submitterId/${userInfo._id}`
      )
      .then((response) => {
        // setAssignment(response?.data)

        const collection = response?.data.filter(
          (item) =>
            item?.submitter?.result?.skillParameterData &&
            item?.taskId === taskIds[item?.taskName]
        );
        setAllResult(collection);
        //console.log(a)
      })
      .catch((error) => console.error(error));
  }, [userInfo._id, taskIds]);

  // console.log(allResults);

  const [submittedTaskID, setSubmittedTaskID] = useState({});

  useEffect(() => {
    if (allResults) {
      // Initialize an empty object to store category sums
      const taskName = {};

      allResults.forEach((item) => {
        taskName[item.taskName] = item.taskId;
      });

      // Store the result in the state variable itemName
      setSubmittedTaskID(taskName);
    }
  }, [allResults]);

  // console.log(submittedTaskID);

  const [mainAssignments, setMainAssignments] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/assignments`)
      .then((response) => {
        const ass = response?.data.filter(
          (item) => item._id === submittedTaskID[item.taskName]
        );

        setMainAssignments(ass);
        // setNewValueAssignment(ass)
      })
      .catch((error) => console.error(error));
  }, [submittedTaskID]);

  // console.log(mainAssignments);

  const handleClickSkill = (skillName) => {
    setSelectedSkillName(skillName);
  };

  const [sumParametersMain, setSumParametersMain] = useState({});
  const [sumSkillMain, setSumSkillMain] = useState({});

  useEffect(() => {
    if (mainAssignments) {
      // Initialize an empty object to store category sums
      const parametersName = {};
      const skillName = {};

      mainAssignments.forEach((item) => {
        item?.skillParameterData?.forEach((data) => {
          //   console.log(data)
          data?.skills.forEach((item) => {
            if (skillName.hasOwnProperty(item.skillName)) {
              skillName[item.skillName] += +item.skillValue;
            } else {
              skillName[item.skillName] = +item.skillValue;
            }
            item?.parameters.forEach((a) => {
              const parameterName = a.parameterName;
              // console.log(parameterName);
              // If earningName already exists in earningItemsName, add itemValue to the existing value, otherwise, set it to itemValue
              if (parametersName.hasOwnProperty(parameterName)) {
                parametersName[parameterName] += +a.parameterValue;
              } else {
                parametersName[parameterName] = +a.parameterValue;
              }
            });
          });
        });
      });

      // Store the result in the state variable itemName
      setSumParametersMain(parametersName);
      setSumSkillMain(skillName);
    }
  }, [mainAssignments]);

  // console.log(sumParametersMain);
  // console.log(sumSkillMain);

  const [sumParameters, setSumParameters] = useState({});
  const [sumSkill, setSumSkill] = useState({});

  useEffect(() => {
    if (allResults) {
      // Initialize an empty object to store category sums
      const parametersName = {};
      const skillName = {};

      allResults.forEach((item) => {
        item.submitter.result.skillParameterData?.forEach((data) => {
          //   console.log(data)
          data?.skills.forEach((item) => {
            if (skillName.hasOwnProperty(item.skillName)) {
              skillName[item.skillName] += +item.skillValue;
            } else {
              skillName[item.skillName] = +item.skillValue;
            }
            item?.parameters.forEach((a) => {
              const parameterName = a.parameterName;
              // console.log(parameterName);
              // If earningName already exists in earningItemsName, add itemValue to the existing value, otherwise, set it to itemValue
              if (parametersName.hasOwnProperty(parameterName)) {
                parametersName[parameterName] += +a.parameterValue;
              } else {
                parametersName[parameterName] = +a.parameterValue;
              }
            });
          });
        });
      });

      // Store the result in the state variable itemName
      setSumParameters(parametersName);
      setSumSkill(skillName);
    }
  }, [allResults]);

  // console.log(sumParameters);
  // console.log(sumSkill);

  return (
    <div className="flex flex-row justify-between gap-4 overflow-x-scroll lg:grid grid-cols-3 lg:overflow-x-visible px-4 mt-[30px] lg:mt-0">
      {allResults?.map((data) =>
        data.submitter.result.skillParameterData?.map((item) => (
          <div
            style={{ width: "-webkit-fill-available" }}
            className="min-w-[230px] max-w-[380px] bg-[#2D2D2D] rounded-2xl py-[30px] "
          >
            <h1 className="text-white text-[12px] lg:text-[20px] font-[700] text-center ">
              {item?.categoryName}
            </h1>
            <div className=" px-3 lg:px-6">
              {item?.skills?.map((subSkill) => (
                <div className="flex items-center gap-3 mt-[30px]">
                  <div
                    //   style={{ background: `${item?.themeColor}` }}
                    style={{ background: "#FFDBC1" }}
                    className="w-[28px] h-[23px] lg:w-[55px] lg:h-[45px] rounded-full flex items-center justify-center "
                  >
                    <img
                      className="w-[16px] lg:w-[30px]"
                      src={subSkill?.icon}
                      alt="icon"
                    />
                  </div>
                  <div className="w-full mb-[-18px] lg:mb-[-30px]">
                    <div className="relative w-full">
                      <div className="w-full border border-white rounded-lg h-[8px] lg:h-[16px]">
                        <div
                          className={`h-[8px] lg:h-[16px] rounded-lg mt-[-1px] ml-[-1px] `}
                          style={{
                            // background: `${item?.themeColor}`,
                            // border: `1px solid ${item?.themeColor}`,
                            background: "#FFDBC1",
                            border: "1px solid #FFDBC1",
                            // width: `${subSkill?.percentage}%`,
                            width: `${
                              (100 * sumSkill[subSkill?.skillName]) /
                              sumSkillMain[subSkill?.skillName]
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <h1 className="text-white text-[8px] lg:text-[15px] font-[500] mt-[8px] lg:mt-[12px] ">
                      {subSkill?.skillName}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <DialogLayout
              open={open && item?.categoryName === status}
              setOpen={setOpen}
              bgColor="#FFFFFF"
              width={700}
              borderRadius={"20px"}
            >
              <h1 className="text-black text-[12px] mt-3 lg:mt-6 lg:text-[20px] font-[700] text-center ">
                {item?.categoryName}
              </h1>
              <div className="flex gap-5 px-3 lg:px-6 pb-[50px]">
                <div className="w-[100%]">
                  {item?.skills?.map((subSkill) => (
                    <div className={`flex items-center gap-3 mt-[30px] `}>
                      <div
                        style={{ background: `${item?.themeColor}` }}
                        className="w-[28px] h-[23px] lg:w-[55px] lg:h-[45px] rounded-full flex items-center justify-center "
                      >
                        <img
                          className="w-[16px] lg:w-[30px]"
                          src={subSkill?.icon}
                          alt="icon"
                        />
                      </div>
                      <div className="w-full mb-[-18px] lg:mb-[-30px]">
                        <div className="relative w-full">
                          <div className="w-full border border-[#A7A6A6] rounded-lg h-[8px] lg:h-[16px]">
                            <div
                              className={`h-[6px] lg:h-[14px] rounded-lg   `}
                              style={{
                                //background: `${item?.themeColor}`,
                                background: "#FFDBC1",
                                // border: `1px solid black`,
                                width: `${
                                  (100 * sumSkill[subSkill?.skillName]) /
                                  sumSkillMain[subSkill?.skillName]
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <h1 className="text-black text-[8px] lg:text-[15px] font-[500]  lg:mt-[12px] ">
                          {subSkill?.skillName}
                        </h1>
                      </div>
                      <p
                        className={`rounded-full ${
                          selectedSkillName === subSkill.skillName
                            ? "bg-[#FFDBC1]"
                            : ""
                        }`}
                        onClick={() => handleClickSkill(subSkill?.skillName)}
                      >
                        <ArrowRightIcon />
                      </p>
                    </div>
                  ))}
                </div>

                {/*   {item?.subSkills?.map((subSkill) => (
                    <div className="flex items-center gap-3 mt-[30px]">
                      <div
                        style={{ background: `${item?.themeColor}` }}
                        className="w-[28px] h-[23px] lg:w-[55px] lg:h-[45px] rounded-full flex items-center justify-center "
                      >
                        <img
                          className="w-[16px] lg:w-[30px]"
                          src={subSkill?.icon}
                          alt="something"
                        />
                      </div>
                      <div className="w-full mb-[-18px] lg:mb-[-30px]">
                        <div className="relative w-full">
                          <div className="w-full border border-[#A7A6A6] rounded-lg h-[8px] lg:h-[16px]">
                            <div
                              className={`h-[6px] lg:h-[14px] rounded-lg   `}
                              style={{
                                background: `${item?.themeColor}`,
                                // border: `1px solid black`,
                                width: `${subSkill?.percentage}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <h1 className="text-black text-[8px] lg:text-[15px] font-[500] mt-[8px] lg:mt-[12px] ">
                          {subSkill?.subSkillName}
                        </h1>
                      </div>
                    </div>
                  ))} */}
                {/* <div className="mt-[30px] bg-[#FFDBC1] w-[100%] rounded-2xl me-5 p-2"> */}
                {item?.skills?.map((skill) => (
                  <>
                    {skill.skillName === selectedSkillName && (
                      <div className="w-[100%] bg-[#FFDBC1] mt-[30px] rounded-2xl me-5">
                        {skill?.parameters?.map((parameter) => (
                          <>
                            <div className="   flex items-center justify-between p-2 mb-5  w-[100%] h-[60px] ">
                              <div className="text-sm font-bold flex items-center gap-2 ">
                                <label htmlFor={parameter?.parameterName}>
                                  {parameter?.parameterName}
                                </label>
                              </div>
                              <div className="text-sm font-bold flex gap-2 ms-5">
                                <p>
                                  {Math.round(
                                    (100 *
                                      sumParameters[parameter?.parameterName]) /
                                      sumParametersMain[
                                        parameter?.parameterName
                                      ]
                                  )}{" "}
                                  %
                                </p>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    )}
                  </>
                ))}
                {/* </div> */}
              </div>
            </DialogLayout>
            <div className=" mt-[60px] flex justify-center ">
              <button
                onClick={() => {
                  setOpen(true);
                  setStatus(item?.categoryName);
                }}
                className={`bg-[#FFDB70] text-black py-[5px] lg:py-[15px] px-[20.5px] lg:px-[40px] rounded-[13px] text-[10px] lg:text-[18px] font-[700] z-[1] shadow-[0px_4px_0px_#F08323] lg:shadow-[0px_8px_0px_#F08323]`}
              >
                View More
              </button>
            </div>
          </div>
        ))
      )}
      {}
    </div>
  );
};

export default SkillsStatistics;
