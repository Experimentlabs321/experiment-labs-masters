import React, { useContext, useEffect, useState } from "react";
import arrowDown from "../../../../../assets/SkillsManagement/arrow.svg";
import arrowRight from "../../../../../assets/SkillsManagement/arrowright.svg";
import edit from "../../../../../assets/ContentManagement/edit.svg";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SkillBasedParameter = ({
  categories,
  selectedData,
  setSelectedData,
  forEdit,
}) => {
  const { id } = useParams();
  const { user, userInfo } = useContext(AuthContext);

  const [isOpenEvaluationSkillCategory, setIsOpenEvaluationSkillCategory] =
    useState(false);
  const [isOpenSkillName, setIsOpenSkillName] = useState(false);
  const [isOpenEvaluationSkillParameter, setIsOpenEvaluationSkillParameter] =
    useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  useEffect(() => {
    if (selectedData[0] && forEdit) {
      setSelectedCategories(selectedData);
      let filterSkills = [];
      selectedData?.forEach((item) => {
        filterSkills.push(...item?.skills);
      });
      setSelectedSkills(filterSkills);
    }
  }, [forEdit, selectedData]);

  // const [selectedData, setSelectedData] = useState([]);
  const [openSelectedSkillParameters, setOpenSelectedSkillParameters] =
    useState(false);
  const [selectedSkill, setSelectedSkill] = useState({});

  const handleOptionChangeCategory = (category, event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
      setSelectedData([
        ...selectedData,
        { categoryName: category?.categoryName, skills: [] },
      ]);
    } else {
      setSelectedCategories(
        selectedCategories.filter(
          (option) => option?.categoryName !== optionValue
        )
      );
      setSelectedData(
        selectedData?.filter((option) => option?.categoryName !== optionValue)
      );
    }
  };
  const handleSelectAllSkillName = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedSkills(["Student", "Parent", "Counselor", "Others"]);
    } else {
      setSelectedSkills([]);
    }
  };
  const handleOptionChangeSkillName = (category, event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    const findCategory = selectedData?.find(
      (item) => item?.categoryName === category?.categoryName
    );
    if (isChecked) {
      setSelectedSkills([
        ...selectedSkills,
        { skillName: optionValue, parameters: [], skillValue: 0 },
      ]);
      setSelectedData(
        selectedData.filter(
          (option) => option?.categoryName !== category?.categoryName
        )
      );
      setSelectedData([
        ...selectedData?.filter(
          (option) => option?.categoryName !== category?.categoryName
        ),
        {
          categoryName: category?.categoryName,
          skills: [
            ...findCategory?.skills,
            { skillName: optionValue, parameters: [], skillValue: 0 },
          ],
        },
      ]);
    } else {
      setSelectedSkills(
        selectedSkills.filter((option) => option?.skillName !== optionValue)
      );
      // setSelectedData(
      //   selectedData
      // );
      setSelectedData([
        ...selectedData.filter(
          (option) => option?.categoryName !== category?.categoryName
        ),
        {
          categoryName: category?.categoryName,
          skills: [
            ...findCategory?.skills.filter(
              (option) => option?.skillName !== optionValue
            ),
          ],
        },
      ]);
    }
  };
  const handleOptionChangeSkillParameter = (
    category,
    parameter,
    skill,
    event
  ) => {
    const optionValue = parameter;
    const isChecked = event.target.checked;

    const findCategory = selectedData?.find(
      (item) => item?.categoryName === category?.categoryName
    );

    if (isChecked) {
      let findSkill = findCategory?.skills?.find(
        (item) => item?.skillName === skill?.skillName
      );
      if (
        !findSkill?.parameters?.find(
          (item) => item?.parameterName === parameter
        )
      ) {
        findSkill = {
          skillName: findSkill?.skillName,
          parameters: [
            ...findSkill?.parameters,
            { parameterName: parameter, parameterValue: 0 },
          ],
          skillValue: findSkill?.skillValue,
        };
      }

      setSelectedSkills([
        ...selectedSkills.filter(
          (option) => option?.skillName !== skill?.skillName
        ),
        findSkill,
      ]);
      setSelectedData([
        ...selectedData?.filter(
          (item) => item?.categoryName !== findCategory?.categoryName
        ),
        {
          categoryName: findCategory?.categoryName,
          skills: [
            ...findCategory?.skills.filter(
              (option) => option?.skillName !== skill?.skillName
            ),
            findSkill,
          ],
        },
      ]);
    } else {
      let findSkill = findCategory?.skills?.find(
        (item) => item?.skillName === skill?.skillName
      );
      setSelectedSkills([
        ...selectedSkills?.filter(
          (option) => option?.skillName !== skill?.skillName
        ),
        {
          skillName: findSkill?.skillName,
          parameters: findSkill?.parameters?.filter(
            (option) => option?.parameterName !== parameter
          ),
          skillValue: findSkill?.skillValue,
        },
      ]);
      setSelectedData([
        ...selectedData?.filter(
          (item) => item?.categoryName !== findCategory?.categoryName
        ),
        {
          categoryName: findCategory?.categoryName,
          skills: [
            ...findCategory?.skills.filter(
              (option) => option?.skillName !== skill?.skillName
            ),
            {
              skillName: findSkill?.skillName,
              parameters: findSkill?.parameters?.filter(
                (option) => option?.parameterName !== parameter
              ),
              skillValue: findSkill?.skillValue,
            },
          ],
        },
      ]);
    }
  };
  const handleSkillValue = (skill, e) => {
    skill["skillValue"] = e.target.value;
    let newParameters = [];
    skill?.parameters?.forEach((element) => {
      newParameters?.push({
        parameterName: element?.parameterName,
        parameterValue: e.target.value / skill?.parameters?.length,
      });
    });
    skill["parameters"] = newParameters;
    const newSkills = [];
    selectedCategory?.skills?.forEach((element) => {
      if (element?.skillName !== skill?.skillName) {
        newSkills?.push(element);
      } else {
        newSkills?.push(skill);
      }
    });
    setSelectedCategory({
      categoryName: selectedCategory?.categoryName,
      skills: newSkills,
    });
    setSelectedSkill({
      skillName: skill?.skillName,
      skillValue: skill?.skillValue,
      parameters: newParameters,
    });
    setSelectedData([
      ...selectedData?.filter(
        (item) => item?.categoryName !== selectedCategory?.categoryName
      ),
      selectedCategory,
    ]);
  };
  const handleParameterValue = (parameter, e) => {
    const findParameter = selectedSkill?.parameters?.find(
      (item) => item?.parameterName === parameter?.parameterName
    );
    findParameter["parameterValue"] = e.target.value;
    let newParameters = [];
    selectedSkill?.parameters?.forEach((element) => {
      if (element?.parameterName !== parameter?.parameterName) {
        newParameters?.push(element);
      } else {
        newParameters?.push(findParameter);
      }
    });
    setSelectedSkill({
      skillName: selectedSkill?.skillName,
      skillValue: selectedSkill?.skillValue,
      parameters: newParameters,
    });
    const newSkills = [];
    selectedCategory?.skills?.forEach((element) => {
      if (element?.skillName !== selectedSkill?.skillName) {
        newSkills?.push(element);
      } else {
        newSkills?.push({
          skillName: selectedSkill?.skillName,
          skillValue: selectedSkill?.skillValue,
          parameters: newParameters,
        });
      }
    });
    setSelectedCategory({
      categoryName: selectedCategory?.categoryName,
      skills: newSkills,
    });
    setSelectedData([
      ...selectedData?.filter(
        (item) => item?.categoryName !== selectedCategory?.categoryName
      ),
      selectedCategory,
    ]);
  };

  const [proceed, setProceed] = useState(false);
  const [skillParameterNumberingSection, setSkillParameterNumberingSection] =
    useState(false);
  const [skillParameterNumberingView, setSkillParameterNumberingView] =
    useState(false);

  return (
    <div>
      <div className="flex justify-between me-10">
        <p className="flex items-center border-b-2 h-[50px] text-xl font-medium">
          Skill Based Parameter
        </p>
        <div className=" flex flex-col">
          <div className="flex gap-[72px]">
            <div
              variant="outlined"
              // onClick={handleClickOpencategory}
              className="button w-[298px] bg-[#3E4DAC] text-[#fff] rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center"
            >
              <p className="text-2xl">+</p>
              <div>
                <p className="w-full ">Create new skill category</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 me-10 mt-20">
        <div className="">
          <div className="flex items-center gap-4">
            <p className="h-2 w-2 bg-black rounded-full"></p>
            <p className="font-bold text-lg ">Skill Category</p>
          </div>
          <div
            onClick={() =>
              setIsOpenEvaluationSkillCategory(!isOpenEvaluationSkillCategory)
            }
            className="bg-[#F6F7FF] mt-6 ms-5 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[100%] cursor-pointer px-2 text-[#535353] font-normal "
            style={{
              borderRadius: "8px",
              border: "1px solid #B7B7B7",
            }}
          >
            <span className=" text-base text-[#3E4DAC] font-semibold">
              Select Skill Category
            </span>
            <div className="select-option">
              {!isOpenEvaluationSkillCategory && (
                <img src={arrowRight} alt="arrow" />
              )}
              {isOpenEvaluationSkillCategory && (
                <img src={arrowDown} alt="arrow" />
              )}
              <i
                className={`dropdown-arrow ${
                  isOpenEvaluationSkillCategory ? "open" : ""
                }`}
              ></i>
            </div>
          </div>
          {isOpenEvaluationSkillCategory && (
            <div
              className="dropdown-menu w-full ms-5 mt-2"
              style={{
                borderRadius: "8px",
                border: "1px solid #B7B7B7",
              }}
            >
              <ul className="p-3">
                {categories?.map((category) => (
                  <li
                    className="flex mb-2 items-center"
                    style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                  >
                    <input
                      type="checkbox"
                      id="html"
                      name="selectedSkillCategory"
                      onChange={(e) => {
                        handleOptionChangeCategory(category, e);
                      }}
                      value={category?.categoryName}
                      className=" mb-1"
                      defaultChecked={selectedData?.find(
                        (item) => item?.categoryName === category?.categoryName
                      )}
                    />
                    <div className="flex mb-1 items-center">
                      <label className="ms-4" htmlFor="communication">
                        {category?.categoryName}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="">
          <div className="flex items-center gap-4">
            <p className="h-2 w-2 bg-black rounded-full"></p>
            <p className="font-bold text-lg me-[36px]">Skill Name</p>
          </div>
          <div
            onClick={() => setIsOpenSkillName(!isOpenSkillName)}
            className="bg-[#F6F7FF] ms-5 mt-6 custom-dropdown flex justify-between cursor-pointer items-center gap-2 h-[40px] w-[100%] px-2 text-[#535353] font-normal"
            style={{
              borderRadius: "8px",
              border: "1px solid #B7B7B7",
            }}
          >
            <div>
              <span className="text-[#3E4DAC] text-base font-semibold">
                Select Skill Name{" "}
              </span>
            </div>
            <div className="select-option">
              {!isOpenSkillName && <img src={arrowRight} alt="arrow" />}
              {isOpenSkillName && <img src={arrowDown} alt="arrow" />}
              <i
                className={`dropdown-arrow ${isOpenSkillName ? "open" : ""}`}
              ></i>
            </div>
          </div>
          {isOpenSkillName && (
            <div
              className="dropdown-menu w-full ms-5 mt-2"
              style={{
                borderRadius: "8px",
                border: "1px solid #B7B7B7",
              }}
            >
              <div className="flex justify-end p-2">
                <input
                  className="me-3"
                  type="checkbox"
                  id="selectAll"
                  // checked={
                  //   selectedSkills?.length === selectedCategory?.skills?.length
                  // }
                  // onChange={handleSelectAllSkillName}
                />
                <label
                  className="text-[#009EF9] text-xs font-medium"
                  htmlFor="selectAll"
                >
                  Select All
                </label>
              </div>
              <ul className="p-3 ">
                {categories?.map((category) => (
                  <>
                    {selectedCategories?.find(
                      (item) => item?.categoryName === category?.categoryName
                    ) && (
                      <>
                        {category?.skills?.map((skill) => (
                          <li
                            className="flex mb-2 items-center"
                            style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                          >
                            <input
                              type="checkbox"
                              id="student"
                              name="option"
                              value={skill?.skillName}
                              checked={selectedSkills.find(
                                (item) => item?.skillName === skill?.skillName
                              )}
                              onChange={(e) =>
                                handleOptionChangeSkillName(category, e)
                              }
                              className=" mb-1"
                            />
                            <div className="flex mb-1 items-center">
                              <label className="ms-4" htmlFor="student">
                                {skill?.skillName}
                              </label>
                            </div>
                          </li>
                        ))}
                      </>
                    )}
                  </>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <div className="">
            <div className="flex items-center gap-4">
              <p className="h-2 w-2 bg-black rounded-full"></p>
              <p className="font-bold text-lg me-[36px]">Skill Parameter</p>
            </div>

            <div
              onClick={() =>
                setIsOpenEvaluationSkillParameter(
                  !isOpenEvaluationSkillParameter
                )
              }
              className=" bg-[#F6F7FF] cursor-pointer mt-6 ms-5 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] font-normal "
              style={{
                borderRadius: "8px",
                border: "1px solid #B7B7B7",
              }}
            >
              <span className=" text-base text-[#3E4DAC] font-semibold">
                Select Skill Parameter
              </span>

              <div className="select-option">
                {!isOpenEvaluationSkillParameter && (
                  <img src={arrowRight} alt="arrow" />
                )}
                {isOpenEvaluationSkillParameter && (
                  <img src={arrowDown} alt="arrow" />
                )}

                <i
                  className={`dropdown-arrow ${
                    isOpenEvaluationSkillParameter ? "open" : ""
                  }`}
                ></i>
              </div>
            </div>
            {isOpenEvaluationSkillParameter && (
              <div
                className="dropdown-menu w-[312px] ms-5 mt-2"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #B7B7B7",
                }}
              >
                <ul className="p-3">
                  {categories?.map((category) => (
                    <>
                      {selectedData?.find(
                        (item) => item?.categoryName === category?.categoryName
                      ) && (
                        <>
                          {category?.skills?.map((skill, index) => {
                            const currentSkill = selectedData
                              ?.find(
                                (item) =>
                                  item?.categoryName === category?.categoryName
                              )
                              ?.skills?.find(
                                (item) => item?.skillName === skill?.skillName
                              );
                            if (currentSkill) {
                              return (
                                <>
                                  {skill?.parameters?.map((parameter) => (
                                    <li
                                      className="flex mb-2 items-center"
                                      style={{
                                        boxShadow: "0px 2px 0px 0px #E6E6E6",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id={
                                          category?.categoryName +
                                          skill?.skillName +
                                          parameter
                                        }
                                        name={
                                          category?.categoryName +
                                          skill?.skillName +
                                          parameter
                                        }
                                        value={
                                          category?.categoryName +
                                          skill?.skillName +
                                          parameter
                                        }
                                        onChange={(e) =>
                                          handleOptionChangeSkillParameter(
                                            category,
                                            parameter,
                                            skill,
                                            e
                                          )
                                        }
                                        defaultChecked={
                                          forEdit &&
                                          currentSkill?.parameters?.find(
                                            (param) =>
                                              param?.parameterName === parameter
                                          )
                                        }
                                        className=" mb-1"
                                      />
                                      <div className="flex mb-1 items-center">
                                        <label
                                          className="ms-4"
                                          htmlFor="communication"
                                        >
                                          {parameter}
                                        </label>
                                      </div>
                                    </li>
                                  ))}
                                </>
                              );
                            }
                          })}
                        </>
                      )}
                      {/* {selectedCategories?.find(
                        (item) => item?.categoryName === category?.categoryName
                      ) && (
                        <>
                          {category?.skills?.map((skill) => (
                            <>
                              {selectedSkills?.find(
                                (item) => item?.skillName === skill?.skillName
                              ) && (
                                <>
                                  {skill?.parameters?.map((parameter) => (
                                    <li
                                      className="flex mb-2 items-center"
                                      style={{
                                        boxShadow: "0px 2px 0px 0px #E6E6E6",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id="html"
                                        name="selectedSkillParameter"
                                        value={parameter}
                                        onChange={(e) =>
                                          handleOptionChangeSkillParameter(
                                            category,
                                            parameter,
                                            skill,
                                            e
                                          )
                                        }
                                        className=" mb-1"
                                      />
                                      <div className="flex mb-1 items-center">
                                        <label
                                          className="ms-4"
                                          htmlFor="communication"
                                        >
                                          {parameter}
                                        </label>
                                      </div>
                                    </li>
                                  ))}
                                </>
                              )}
                            </>
                          ))}
                        </>
                      )} */}
                    </>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className=" mt-[50px]  border-b-2">
        <div className="flex justify-center">
          {!skillParameterNumberingSection && (
            <p
              onClick={() => {
                setProceed(true);
                setSelectedCategory({});
                setOpenSelectedSkillParameters(false);
              }}
              className="bg-[#FFDB70] cursor-pointer text-base font-bold p-4 rounded-lg mb-10 flex justify-center w-[97px]"
            >
              Proceed
            </p>
          )}
        </div>
        {proceed && (
          <div className=" mt-2 rounded border mb-5 flex me-10 ">
            <form className="w-full">
              <div className="grid grid-cols-12 gap-4 2xl:gap-6 p-8">
                <div className=" col-span-4 ">
                  {categories?.map((category) => (
                    <>
                      {selectedData?.find(
                        (item) => item?.categoryName === category?.categoryName
                      ) && (
                        <div
                          onClick={() => {
                            // setSelectedData([
                            //   ...selectedData?.filter(
                            //     (item) =>
                            //       item?.categoryName !==
                            //       selectedCategory?.categoryName
                            //   ),
                            //   selectedCategory,
                            // ]);
                            setSelectedCategory(
                              selectedData?.find(
                                (item) =>
                                  item?.categoryName === category?.categoryName
                              )
                            );
                            setOpenSelectedSkillParameters(false);
                          }}
                          className={` flex cursor-pointer justify-between items-center px-4 py-2 mb-4 text-sm font-medium ${
                            category?.categoryName ===
                            selectedCategory?.categoryName
                              ? "text-[#0A98EA] "
                              : "text-[black]"
                          }`}
                          style={{
                            borderRadius: "8px",
                            border: `${
                              category?.categoryName !==
                              selectedCategory?.categoryName
                                ? "1px solid #B7B7B7"
                                : "none"
                            }`,
                            background: " #FFF",
                            boxShadow: `${
                              category?.categoryName ===
                              selectedCategory?.categoryName
                                ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                : "none"
                            }`,
                          }}
                        >
                          <p>{category?.categoryName}</p>
                          <img alt="arrow" src={arrowRight} />
                        </div>
                      )}
                    </>
                  ))}
                </div>
                <div className="flex-1 col-span-8 flex ">
                  {selectedCategory && (
                    <div className="w-full flex flex-col items-center">
                      {selectedCategory?.skills?.map((skill) => (
                        <div
                          className={`flex text-base font-medium mb-4 w-11/12  h-[65px] justify-between rounded-md px-4 items-center ${
                            selectedSkill?.skillName === skill?.skillName
                              ? "bg-[#E2F1FF]"
                              : "bg-[#F8F8F8]"
                          }`}
                        >
                          <p className="w-full">{skill?.skillName}</p>
                          <div className="flex justify-between ms-2 items-center w-full">
                            <input
                              required
                              className="w-1/3 h-[32px] text-center border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                              name={skill?.skillName}
                              type="number"
                              value={skill?.skillValue}
                              onChange={(e) => handleSkillValue(skill, e)}
                            />
                            <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                              %
                            </p>
                            <ArrowForwardIcon
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedSkill(skill);
                                setOpenSelectedSkillParameters(true);
                                // console.log(skill);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {openSelectedSkillParameters && (
                    <div className="w-full flex flex-col items-center">
                      {selectedSkill?.parameters?.map((item) => (
                        <div className="flex text-base font-medium mb-4 bg-[#E2F1FF] w-11/12 h-[65px] justify-between rounded-md px-4 items-center">
                          <p className="w-full">{item?.parameterName}</p>
                          <div className="flex justify-between ms-2 items-center w-full">
                            <input
                              value={item?.parameterValue}
                              onChange={(e) => {
                                handleParameterValue(item, e);
                              }}
                              className="w-1/3 h-[32px] border border-black rounded-lg text-center flex items-center justify-center bg-[#fff]"
                              name={item?.parameterName}
                              type="number"
                            />
                            <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                              %
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 mb-7 flex justify-center">
                <p
                  onClick={() => {
                    setProceed(false);
                    setSkillParameterNumberingSection(true);
                    setSkillParameterNumberingView(true);
                  }}
                  className="bg-[#2EB0FB] cursor-pointer rounded-lg px-4 py-1 font-semibold text-[#fff]"
                >
                  Apply
                </p>
              </div>
            </form>
          </div>
        )}
        {skillParameterNumberingView && (
          <div className=" mt-2 rounded border mb-5 flex me-10 ">
            <form
              onSubmit={() => {
                // console.log("data")
              }}
              className="w-full"
            >
              <div className="grid grid-cols-12 gap-4 2xl:gap-6 p-8">
                <div className=" col-span-4 ">
                  {categories?.map((category) => (
                    <>
                      {selectedData?.find(
                        (item) => item?.categoryName === category?.categoryName
                      ) && (
                        <div
                          onClick={() => {
                            setSelectedCategory(
                              selectedData?.find(
                                (item) =>
                                  item?.categoryName === category?.categoryName
                              )
                            );
                            setOpenSelectedSkillParameters(false);
                          }}
                          className={` flex cursor-pointer justify-between items-center px-4 py-2 mb-4 text-sm font-medium ${
                            category?.categoryName ===
                            selectedCategory?.categoryName
                              ? "text-[#0A98EA] "
                              : "text-[black]"
                          }`}
                          style={{
                            borderRadius: "8px",
                            border: `${
                              category?.categoryName !==
                              selectedCategory?.categoryName
                                ? "1px solid #B7B7B7"
                                : "none"
                            }`,
                            background: " #FFF",
                            boxShadow: `${
                              category?.categoryName ===
                              selectedCategory?.categoryName
                                ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                : "none"
                            }`,
                          }}
                        >
                          <p>{category?.categoryName}</p>
                          <img alt="arrow" src={arrowRight} />
                        </div>
                      )}
                    </>
                  ))}
                </div>
                <div className="flex-1 col-span-8 flex ">
                  {selectedCategory && (
                    <div className="w-full flex flex-col items-center">
                      {selectedCategory?.skills?.map((skill) => (
                        <div
                          className={`flex text-base font-medium mb-4 w-11/12  h-[65px] justify-between rounded-md px-4 items-center ${
                            selectedSkill?.skillName === skill?.skillName
                              ? "bg-[#E2F1FF]"
                              : "bg-[#F8F8F8]"
                          }`}
                        >
                          <p className="w-full">{skill?.skillName}</p>
                          <div className="flex justify-between ms-2 items-center w-full">
                            <input
                              required
                              className="w-1/3 h-[32px] text-center border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                              name={skill?.skillName}
                              type="number"
                              value={skill?.skillValue}
                              disabled
                            />
                            <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                              %
                            </p>
                            <ArrowForwardIcon
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedSkill(skill);
                                setOpenSelectedSkillParameters(true);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {openSelectedSkillParameters && (
                    <div className="w-full flex flex-col items-center">
                      {selectedSkill?.parameters?.map((item) => (
                        <div className="flex text-base font-medium mb-4 bg-[#E2F1FF] w-11/12 h-[65px] justify-between rounded-md px-4 items-center">
                          <p className="w-full">{item?.parameterName}</p>
                          <div className="flex justify-between ms-2 items-center w-full">
                            <input
                              value={item?.parameterValue}
                              disabled
                              className="w-1/3 h-[32px] border border-black rounded-lg text-center flex items-center justify-center bg-[#fff]"
                              name={item?.parameterName}
                              type="number"
                            />
                            <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                              %
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 mb-7 flex justify-center">
                <p
                  onClick={() => {
                    setProceed(true);
                    setSkillParameterNumberingView(false);
                  }}
                  className="bg-[#2EB0FB] cursor-pointer rounded-lg px-4 py-1 font-semibold text-[#fff]"
                >
                  Edit
                </p>
              </div>
            </form>
          </div>
        )}
        {/* {skillParameterNumberingSection && (
          <div
            className="flex  justify-between px-10 py-6 mb-5 me-10 "
            style={{
              borderRadius: "10px",
              border: "1px solid #939393",
            }}
          >
            <div>
              <p className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal">
                {selectedCategory?.categoryName}
              </p>
            </div>
            <div>
              {selectedSkills?.map((skill) => (
                <p className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal">
                  {skill?.skillName}
                </p>
              ))}
            </div>

            <div className="flex gap-10">
              <div className="flex flex-col gap-5">
                <p className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal">
                  Verbal Communication
                </p>
                <p className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal">
                  Non-Verbal Communication
                </p>
                <p className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal">
                  Active Listening
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex gap-16 items-center ">
                  <p
                    className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal"
                    style={{
                      border: " 0.909px solid #CECECE",
                      background: "#FFFEE2",
                    }}
                  >
                    50%
                  </p>
                  <div className="bg-[#282828] rounded-full w-5 h-5  flex items-center justify-center ">
                    <img src={edit} alt="edit" />
                  </div>
                </div>
                <div className="flex gap-16 items-center ">
                  <p
                    className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal"
                    style={{
                      border: " 0.909px solid #CECECE",
                      background: "#FFFEE2",
                    }}
                  >
                    50%
                  </p>
                </div>
                <div className="flex gap-16 items-center ">
                  <p
                    className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal"
                    style={{
                      border: " 0.909px solid #CECECE",
                      background: "#FFFEE2",
                    }}
                  >
                    50%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SkillBasedParameter;
