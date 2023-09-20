import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link, useParams } from "react-router-dom";
import AssignmentUpNev from "./AssignmentUpNev";
import AssignmentRightNev from "./AssignmentRightNev";
import axios from "axios";
import { useEffect } from "react";
import arrowRight from "../../../assets/ExecutionMentor/arrowRight.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toast } from "react-hot-toast";

const EditResult = (submittedAssignment) => {
  const Assignment = submittedAssignment.submittedAssignment.submitter?.result;
  const { id } = useParams();
  // console.log(id)
  const [mainAssignments, setMainAssignments] = useState();

  const [newAssignment, setNewAssignment] = useState();

  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedEarningCategoryCategoryName, setSelectedEarningCategoryName] =
    useState("");
  const [selectedSkillName, setSelectedSkillName] = useState("");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [edit, setEdit] = useState(false);

  const taskid = submittedAssignment.submittedAssignment?.taskId;
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/tasks/assignments/?id=${taskid}`
      )
      .then((response) => {
        const ass = response?.data;

        setMainAssignments(ass);
        // setNewValueAssignment(ass)
      })
      .catch((error) => console.error(error));
  }, [submittedAssignment.submittedAssignment]);

  console.log(mainAssignments);

  const [CategoryMain, setCategoryMain] = useState({});

  useEffect(() => {
    if (mainAssignments) {
      // Initialize an empty object to store category sums
      const categoryMap = {};

      mainAssignments?.skillParameterData?.forEach((items) => {
        items.skills.forEach((item) => {
          const skillName = item.skillName;
          const skillValue = item.skillValue;

          // Assign the sum to the category name
          categoryMap[skillName] = skillValue;
        });
      });

      // Set the state with the category sums
      setCategoryMain(categoryMap);
    }
  }, [mainAssignments]);

  console.log(CategoryMain);

  const [parameters, setParameters] = useState({});

  useEffect(() => {
    if (mainAssignments) {
      // Initialize an empty object to store category sums
      const categoryMap = {};

      mainAssignments?.skillParameterData?.forEach((items) => {
        items.skills.forEach((item) => {
          item.parameters.forEach((i) => {
            const parameterName = i.parameterName;
            const parameterValue = i.parameterValue;

            // Assign the sum to the category name
            categoryMap[parameterName] = parameterValue;
          });
        });
      });

      // Set the state with the category sums
      setParameters(categoryMap);
    }
  }, [mainAssignments]);

  console.log(parameters);

  const [earning, setEarning] = useState({});

  useEffect(() => {
    if (mainAssignments) {
      // Initialize an empty object to store category sums
      const categoryMap = {};

      mainAssignments?.earningParameterData?.forEach((items) => {
        items.earningItems.forEach((item) => {
          const earningItemName = item.earningItemName;
          const itemValue = item.itemValue;

          // Assign the sum to the category name
          categoryMap[earningItemName] = itemValue;
        });
      });

      // Set the state with the category sums
      setEarning(categoryMap);
    }
  }, [mainAssignments]);

  console.log(earning);

  const handleClickCategory = (categoryName) => {
    setSelectedCategoryName(categoryName);
    //  const assignment = newValueAssignment

    //setChangeValueAssignment(assignment)
  };

  const handleClickEarningCategory = (categoryName) => {
    setSelectedEarningCategoryName(categoryName);
  };

  // console.log(mainAssignments)

  const handleClickSkill = (skillName) => {
    setSelectedSkillName(skillName);
  };

  const handleSkillValue = (e, skill, mainValue) => {
    setEdit(true);
    // console.log(mainAssignments.skillParameterData)

    const categoryName = Assignment?.skillParameterData.find(
      (item) => item?.categoryName === selectedCategoryName
    );
    const skillsName = categoryName?.skills.find(
      (item) => item?.skillName === skill?.skillName
    );
    skillsName.skillValue = +e.target?.value;
    setNewAssignment(Assignment);
    const check = mainValue;
    const value = +e.target?.value;
    if (check < value) {
      setError2(true);
    } else {
      setError2(false);
    }
  };

  const handleParameterValue = (e, parameter, mainValue) => {
    setEdit(true);
    const categoryName = Assignment?.skillParameterData.find(
      (item) => item?.categoryName === selectedCategoryName
    );
    const skillsName = categoryName.skills.find(
      (item) => item?.skillName === selectedSkillName
    );
    const parameters = skillsName.parameters.find(
      (item) => item?.parameterName === parameter?.parameterName
    );

    const check = mainValue;
    const value = +e.target?.value;

    if (check < value) {
      setError1(true);
    } else {
      setError1(false);
    }
    parameters.parameterValue = +e.target?.value;
    setNewAssignment(Assignment);
  };

  const handleEarningParameterValue = (e, earningItem, mainValue) => {
    setEdit(true);
    const categoryName = Assignment?.earningParameterData.find(
      (item) => item?.categoryName === selectedEarningCategoryCategoryName
    );
    const earningItems = categoryName.earningItems.find(
      (item) => item?.earningItemName === earningItem?.earningItemName
    );
    earningItems.itemValue = +e.target?.value;
    setNewAssignment(Assignment);
    const check = mainValue;
    const value = +e.target?.value;
    if (check < value) {
      setError3(true);
    } else {
      setError3(false);
    }
  };
  console.log(newAssignment);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = newAssignment;

    const manageAssignment = {
      skillParameterData: data?.skillParameterData,
      earningParameterData: data?.earningParameterData,
      review: data?.review,
    };

    //  console.log(manageAssignment)
    if (error1 || error2 || error3) {
      toast.error("Value error");
    } else {
      const addMarks = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/submitAssignment/${id}/addResult`,
        manageAssignment
      );

      if (addMarks?.data?.acknowledged) {
        toast.success("Result Edit Successfully");
      } else {
        toast.error("Result not Edit ");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" ms-10 my-10">
          <p className="text-2xl font-bold mb-10">SkillParameter</p>

          <div className=" flex ">
            <div className="">
              {Assignment?.skillParameterData.map((mainAssignment) => (
                <div
                  className={` p-3 flex gap-2 items-center justify-between rounded-md h-[60px] mb-5 ${
                    selectedCategoryName === mainAssignment.categoryName
                      ? "bg-[#F0F7FF]"
                      : " border"
                  }`}
                >
                  <div className="">
                    <p>{mainAssignment.categoryName}</p>
                    <p className="text-[#B7B7B7] text-[10px] font-bold">
                      Marks
                    </p>
                  </div>
                  <img
                    onClick={() =>
                      handleClickCategory(mainAssignment.categoryName)
                    }
                    src={arrowRight}
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className=" ms-5">
              {Assignment?.skillParameterData.map((data) => (
                <>
                  {data?.categoryName === selectedCategoryName && (
                    <>
                      {data?.skills.map((skill) => (
                        <>
                          <div
                            className={`flex items-center justify-between p-2 mb-5  w-[100%] h-[60px] ${
                              selectedSkillName === skill.skillName
                                ? "bg-[#F0F7FF]"
                                : ""
                            }`}
                            style={{
                              borderRadius: "5px",
                              border: "1px solid #D9D9D9",
                            }}
                          >
                            <div className="text-xs font-semibold flex items-center gap-2 ">
                              <label htmlFor={skill.skillName}>
                                {skill.skillName}
                              </label>
                            </div>
                            <div className=" flex gap-2 ms-5">
                              <input
                                className="w-[50px] h-[25px] text-[14px] font-semibold border rounded-lg text-center"
                                name={skill?.skillName}
                                type="number"
                                defaultValue={skill?.skillValue}
                                onChange={(e) =>
                                  handleSkillValue(
                                    e,
                                    skill,
                                    CategoryMain[skill?.skillName]
                                  )
                                }
                                placeholder="mark"
                              />

                              {error2 && (
                                <>
                                  <span className="text-[red] text-[10px]">
                                    error
                                  </span>
                                </>
                              )}
                              <span>/{CategoryMain[skill?.skillName]}</span>
                              <p
                                onClick={() =>
                                  handleClickSkill(skill.skillName)
                                }
                              >
                                <ArrowForwardIcon />
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </>
              ))}
            </div>

            <div className=" ms-5">
              {Assignment?.skillParameterData.map((data) => (
                <>
                  {data?.categoryName === selectedCategoryName && (
                    <>
                      {data?.skills.map((skill) => (
                        <>
                          {skill.skillName === selectedSkillName && (
                            <>
                              {skill?.parameters.map((parameter) => (
                                <>
                                  <div
                                    className={`flex items-center justify-between p-2 mb-5  w-[100%] h-[60px] ${
                                      selectedSkillName === skill.skillName
                                        ? "bg-[#F0F7FF]"
                                        : ""
                                    }`}
                                    style={{
                                      borderRadius: "5px",
                                      border: "1px solid #D9D9D9",
                                    }}
                                  >
                                    <div className="text-xs font-semibold flex items-center gap-2 ">
                                      <label htmlFor={parameter.parameterName}>
                                        {parameter.parameterName}
                                      </label>
                                    </div>
                                    <div className=" flex gap-2 ms-5">
                                      <input
                                        className="w-[50px] h-[25px] text-[14px] font-semibold border rounded-lg text-center"
                                        name={parameter.parameterName}
                                        type="number"
                                        defaultValue={parameter.parameterValue}
                                        onChange={(e) =>
                                          handleParameterValue(
                                            e,
                                            parameter,
                                            parameters[parameter.parameterName]
                                          )
                                        }
                                        placeholder="mark"
                                      />
                                      {error1 && (
                                        <>
                                          <span className="text-[red] text-[10px]">
                                            error
                                          </span>
                                        </>
                                      )}
                                      <span>
                                        /{parameters[parameter.parameterName]}
                                      </span>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        <div className=" ms-10 my-10">
          <p className="text-2xl font-bold mb-10">earningParameter</p>

          <div className=" flex ">
            <div className="">
              {Assignment?.earningParameterData.map((mainAssignment) => (
                <div
                  className={` p-3 flex gap-2 items-center justify-between rounded-md h-[60px] mb-5 ${
                    selectedEarningCategoryCategoryName ===
                    mainAssignment.categoryName
                      ? "bg-[#F0F7FF]"
                      : " border"
                  }`}
                >
                  <div className="">
                    <p>{mainAssignment.categoryName}</p>
                    <p className="text-[#B7B7B7] text-[10px] font-bold">
                      Marks
                    </p>
                  </div>
                  <img
                    onClick={() =>
                      handleClickEarningCategory(mainAssignment.categoryName)
                    }
                    src={arrowRight}
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className=" ms-5">
              {Assignment?.earningParameterData.map((data) => (
                <>
                  {data?.categoryName ===
                    selectedEarningCategoryCategoryName && (
                    <>
                      {data?.earningItems.map((earningItem) => (
                        <>
                          <div
                            className={`flex items-center justify-between p-2 mb-5  w-[100%] h-[60px] ${
                              selectedEarningCategoryCategoryName ===
                              data?.categoryName
                                ? "bg-[#F0F7FF]"
                                : " border"
                            }`}
                            style={{
                              borderRadius: "5px",
                              border: "1px solid #D9D9D9",
                            }}
                          >
                            <div className="text-xs font-semibold flex items-center gap-2 ">
                              <label htmlFor={earningItem.earningItemName}>
                                {earningItem.earningItemName}
                              </label>
                            </div>
                            <div className=" flex gap-2 ms-5">
                              <input
                                className="w-[50px] h-[25px] text-[14px] font-semibold border rounded-lg text-center"
                                name={earningItem.earningItemName}
                                type="number"
                                defaultValue={earningItem.itemValue}
                                onChange={(e) =>
                                  handleEarningParameterValue(
                                    e,
                                    earningItem,
                                    earning[earningItem.earningItemName]
                                  )
                                }
                                placeholder="mark"
                              />
                              {error3 && (
                                <span className="text-[red] text-[10px]">
                                  error
                                </span>
                              )}
                              <span>
                                /{earning[earningItem.earningItemName]}
                              </span>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        {edit && (
          <div className="mt-5 flex gap-3 justify-center mb-20">
            <input
              style={{
                borderRadius: "8.856px",
                border: "1px solid #CECECE",
                background: "#3E4DAC",
              }}
              className=" text-[#fff] text-base font-bold px-5 py-2"
              type="submit"
              value="Save"
            />
            <input
              style={{
                borderRadius: "8.856px",
                border: "1px solid #CECECE",
                background: "#FF557A",
              }}
              className=" text-[#fff] text-base font-bold px-5 py-2"
              type="submit"
              value="Save all"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default EditResult;
