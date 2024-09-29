import React, { useState } from "react";
import Layout from "../Layout";
import arrowDown from "../../../assets/SkillsManagement/arrow.svg";
import arrowright from "../../../assets/SkillsManagement/arrowright.svg";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import required from "../../../assets/ContentManagement/required.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import closeCircle from "../../../assets/ContentManagement/closeCircle.svg";
import edit from "../../../assets/ContentManagement/edit.svg";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";

const QuizEvaluationParameter = () => {
  const [selectedTab, setSelectedTab] = useState("Evaluation Parameter");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  ////

  const [isOpenEvaluationParameter, setIsOpenEvaluationParameter] =
    useState(true);

  const toggleDropdownEvaluationParameter = () => {
    setIsOpenEvaluationParameter(!isOpenEvaluationParameter);
  };
  const [isOpenItemEarningParameter, setIsOpenItemEarningParameter] =
    useState(true);

  const toggleDropdownItemEarningParameter = () => {
    setIsOpenItemEarningParameter(!isOpenItemEarningParameter);
  };

  // skill category
  const [isOpenEvaluationSkillCategory, setIsOpenEvaluationSkillCategory] =
    useState(false);
  const [selectedOptionSkillName, setSelectedOptionSkillName] = useState([]);

  const toggleDropdownSkillCategory = () => {
    setIsOpenEvaluationSkillCategory(!isOpenEvaluationSkillCategory);
  };

  // skill Parameter
  const [isOpenEvaluationSkillParameter, setIsOpenEvaluationSkillParameter] =
    useState(false);

  const toggleDropdownSkillParameter = () => {
    setIsOpenEvaluationSkillParameter(!isOpenEvaluationSkillParameter);
  };

  //skill name
  const [isOpenSkillName, setIsOpenSkillName] = useState(false);
  const toggleDropdownSkillName = () => {
    setIsOpenSkillName(!isOpenSkillName);
  };
  const handleOptionChangeSkillName = (event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedOptionSkillName([...selectedOptionSkillName, optionValue]);
    } else {
      setSelectedOptionSkillName(
        selectedOptionSkillName.filter((option) => option !== optionValue)
      );
    }
  };

  const handleSelectAllSkillName = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedOptionSkillName(["Student", "Parent", "Counselor", "Others"]);
    } else {
      setSelectedOptionSkillName([]);
    }
  };

  //proceed
  const [proceed, setProceed] = useState(false);
  const handleProceed = () => {
    setProceed(true);
  };
  //Parameter section
  const [parameterSection, setParameterSection] = useState(false);
  const handleParameterSection = () => {
    setParameterSection(true);
    setProceed(false);
  };

  //
  const [selectedSection, setSelectedSection] = useState(null);

  const handleArrowClick = (category) => {
    setSelectedSection(category);
  };
  // console.log(selectedSection);

  //
  const [SoftSkills, setSoftSkill] = useState(true);

  const handleSoftSkill = () => {
    setSoftSkill(true);
  };

  ///////////////////////// new category
  const BootstrapDialogCategory = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitleCategory(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitleCategory.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [openCategory, setOpenCategory] = React.useState(false);

  const handleClickOpenCategory = () => {
    setOpenCategory(true);
  };
  const handleCloseCategory = () => {
    setOpenCategory(false);
  };

  /// Add new Item earning parameter
  const BootstrapDialogEarningParameter = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitleEarningParameter(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  BootstrapDialogTitleEarningParameter.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [openEarningParameter, setOpenEarningParameter] = React.useState(false);

  const handleClickOpenEarningParameter = () => {
    setOpenEarningParameter(true);
  };
  const handleCloseearningparameter = () => {
    setOpenEarningParameter(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const assignmentName = form.assignmentName?.value;
    const AssignmentStartingDateTime = form.AssignmentStartingDateTime?.value;
    const AssignmentEndingDateTime = form.AssignmentEndingDateTime?.value;
    const assignmentTotalPointsMarks = +form.assignmentTotalPointsMarks?.value;
    const skillCategory = form.selectskillcategory?.value;

    const manageclass = {
      assignmentName,
      AssignmentStartingDateTime,
      assignmentTotalPointsMarks,
      AssignmentEndingDateTime,
      skillCategory,
    };

    // console.log(manageclass);
  };

  const { id } = useParams();

  return (
    <div>
      {/* <Layout>
        <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
          <p>Manage Quiz in Topic 1</p>
        </div>
        <div className="px-10 flex  justify-between pb-3 text-lg">
          <Link
            to={`/quizGeneralInfo/${id}`}
            onClick={() => handleTabClick("Quiz General Information")}
            style={{
              fontWeight:
                selectedTab === "Quiz General Information" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Quiz General Information"
                  ? "2px solid black"
                  : "none",
            }}
          >
            Quiz General Information
          </Link>
          <Link
            to={`/manageQuestion/${id}`}
            onClick={() => handleTabClick("Questions")}
            style={{
              fontWeight: selectedTab === "Questions" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Questions" ? "2px solid black" : "none",
            }}
          >
            Questions
          </Link>
          <Link
            to={`/manageQuestionBank/${id}`}
            onClick={() => handleTabClick("Question Bank")}
            style={{
              fontWeight: selectedTab === "Question Bank" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Question Bank" ? "2px solid black" : "none",
            }}
          >
            Question Bank
          </Link>
          <Link
            to={`/quizResult/${id}`}
            onClick={() => handleTabClick("Results")}
            style={{
              fontWeight: selectedTab === "Results" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Results" ? "2px solid black" : "none",
            }}
          >
            Results
          </Link>
          <Link
            to={`/quizEvaluationParameter/${id}`}
            onClick={() => handleTabClick("Evaluation Parameter")}
            style={{
              fontWeight:
                selectedTab === "Evaluation Parameter" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Evaluation Parameter"
                  ? "2px solid black"
                  : "none",
            }}
          >
            Evaluation Parameter
          </Link>
        </div> */}

      {selectedTab === "Quiz General Information" && (
        <div className="mx-10 my-20">
          <form>
            <div className="flex">
              <div className="w-full">
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Quiz Name</p>
                    <img src={required} alt="required" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="readingTopicName"
                    type="text"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                </div>

                <div className=" mt-16">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Quiz Description
                    </p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="readingTopicName"
                    type="text"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                </div>
                <div className="w-[80%]">
                  <div className="flex justify-between mt-16">
                    <div className=" ">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-semibold text-[#000000]  py-2">
                          Grade Method
                        </p>
                      </div>
                      <div
                        style={{
                          border: "1.085px solid #CECECE",
                          background: "#F6F7FF",
                        }}
                        className=" flex  border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] ms-5"
                      >
                        <select
                          required
                          className="w-full border-0 focus:outline-0 bg-[#F6F7FF]"
                          name="option"
                          id="option"
                        >
                          <option className="" value="Student">
                            Highest Grade
                          </option>
                          <option value="Parent"></option>
                          <option value="Counselor"></option>
                          <option value="Others"></option>
                        </select>
                      </div>
                    </div>

                    <div className=" ">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-semibold text-[#000000]  py-2">
                          Shuffle within Questions
                        </p>
                      </div>

                      <div className=" flex gap-7 items-center  h-[40px] ms-5   text-[#535353] ">
                        <div>
                          <input
                            id="draft"
                            className="peer/draft me-2 "
                            type="radio"
                            name="shufflewithinQuestions"
                            checked
                          />
                          <label
                            for="draft"
                            className="peer-checked/draft: font-normal"
                          >
                            Yes
                          </label>
                        </div>

                        <div>
                          <input
                            id="published"
                            class="peer/published me-2"
                            type="radio"
                            name="shufflewithinQuestions"
                          />
                          <label
                            for="published"
                            class="peer-checked/published: font-normal"
                          >
                            NO
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Quiz Total Points/Marks
                    </p>
                    <img src={required} alt="required" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="readingTopicName"
                    type="text"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                </div>

                <div className="flex justify-between mt-16">
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-semibold text-[#000000]  py-2">
                        Quiz Attempts
                      </p>
                    </div>
                    <div
                      style={{
                        border: "1.085px solid #CECECE",
                        background: "#F6F7FF",
                      }}
                      className=" flex mx-5 mt-5 border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] "
                    >
                      <select
                        required
                        className="w-full border-0 focus:outline-0 bg-[#F6F7FF]"
                        name="option"
                        id="option"
                      >
                        <option className="" value="Student">
                          Unlimited
                        </option>
                        <option value="Parent"></option>
                        <option value="Counselor"></option>
                        <option value="Others"></option>
                      </select>
                    </div>
                  </div>
                  <div className="ms-16">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-semibold text-[#000000]  py-2">
                        Grade to pass
                      </p>
                    </div>
                    <div className="flex gap-2 mt-5">
                      <div
                        style={{
                          border: "1.085px solid #CECECE",
                          background: "#F6F7FF",
                        }}
                        className=" flex  border  rounded-lg h-[40px] w-[20%] px-2 text-[#535353] "
                      >
                        <input
                          className="w-[100%] bg-[#F6F7FF]"
                          type="text"
                          name=""
                        />
                      </div>
                      <div
                        style={{
                          border: "1.085px solid #CECECE",
                          background: "#F6F7FF",
                        }}
                        className="flex items-center border  rounded-lg h-[40px] w-[40%] text-[#535353]"
                      >
                        <select
                          required
                          className=" border-0 focus:outline-0 bg-[#F6F7FF]"
                          name="option"
                          id="option"
                        >
                          <option className="" value="Student">
                            Percentage
                          </option>
                          <option value="Parent"></option>
                          <option value="Counselor"></option>
                          <option value="Others"></option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-semibold text-[#000000]  py-2">
                      Is Marks= Total Points ?
                    </p>
                  </div>

                  <div className=" flex gap-7 items-center  h-[40px] ms-5  text-[#535353] ">
                    <div>
                      <input
                        id="draft"
                        className="peer/draft me-2 "
                        type="radio"
                        name="IsMarksTotalPoints"
                        checked
                      />
                      <label
                        for="draft"
                        className="peer-checked/draft: font-normal"
                      >
                        Yes
                      </label>
                    </div>

                    <div>
                      <input
                        id="published"
                        class="peer/published me-2"
                        type="radio"
                        name="IsMarksTotalPoints"
                      />
                      <label
                        for="published"
                        class="peer-checked/published: font-normal"
                      >
                        NO
                      </label>
                    </div>
                  </div>
                  <div className="flex mt-5">
                    <input
                      style={{
                        border: "1.085px solid #CECECE",
                        background: "#F6F7FF",
                      }}
                      className="border rounded px-4 py-2 w-[100px]"
                      type="text"
                      name=""
                      placeholder="Marks"
                    />
                    <p className="w-[50px] flex justify-center items-center font-bold">
                      =
                    </p>
                    <input
                      style={{
                        border: "1.085px solid #CECECE",
                        background: "#F6F7FF",
                      }}
                      className="border rounded px-4 py-2 "
                      type="text"
                      name=""
                      placeholder="Total Points"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-20 mb-10">
              <input
                type="submit"
                value="Save"
                className="px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
              />
              <input
                type="submit"
                value="Save & Display"
                className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
              />
            </div>
          </form>
        </div>
      )}

      {selectedTab === "Evaluation Parameter" && (
        <div className="mx-10 my-20">
          <form onSubmit={handleSubmit} className="  mt-12">
            <div className="flex justify-between">
              <div
                className="select-option flex items-center gap-[40px]"
                onClick={toggleDropdownEvaluationParameter}
              >
                <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                  1
                </h1>
                <p className="text-[25px] font-bold">Skill Based Parameter</p>
                {!isOpenEvaluationParameter && (
                  <img className="w-6" src={arrowright} alt="arrowRight" />
                )}

                {isOpenEvaluationParameter && (
                  <img src={arrowDown} alt="arrowDown" />
                )}

                <i
                  className={`dropdown-arrow ${
                    isOpenEvaluationParameter ? "open" : ""
                  }`}
                ></i>
              </div>
              <div className="flex justify-between me-10">
                <div className=" flex flex-col">
                  <div className="flex gap-[72px]">
                    {parameterSection && (
                      <div className="w-[94px] bg-[#FFEAE9]  rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center">
                        <p className="text-2xl">+</p>
                        <div>
                          <p className="w-full ">Add</p>
                        </div>
                      </div>
                    )}
                    <div>
                      <div>
                        <div
                          variant="outlined"
                          onClick={handleClickOpenCategory}
                          className="button w-[298px] bg-[#3E4DAC] text-[#fff] rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center"
                        >
                          <p className="text-2xl">+</p>
                          <div>
                            <p className="w-full ">Create new skill category</p>
                          </div>
                        </div>

                        <BootstrapDialogCategory
                          onClose={handleCloseCategory}
                          aria-labelledby="customized-dialog-title"
                          open={openCategory}
                        >
                          <BootstrapDialogTitleCategory
                            id="customized-dialog-title"
                            onClose={handleCloseCategory}
                          >
                            <p className="text-[22px] font-bold text-[#3E4DAC]">
                              Add new skill category
                            </p>
                          </BootstrapDialogTitleCategory>
                          <DialogContent dividers>
                            <Typography gutterBottom>
                              <form className="mt-6 mx-10">
                                <div className="flex items-center gap-4">
                                  <p className="font-bold text-lg me-[36px]">
                                    Skill Category
                                  </p>
                                  <img src={required} alt="required" />
                                </div>

                                <input
                                  required
                                  className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                  name="itemEarningParameter1"
                                  type="text"
                                  placeholder="Eg. Entrepreneurship Lab"
                                />

                                <div className="flex items-center gap-4">
                                  <p className="font-bold text-lg me-[36px] mt-5">
                                    Skill Name
                                  </p>
                                  <img
                                    className="mt-5"
                                    src={required}
                                    alt="required"
                                  />
                                </div>

                                <input
                                  required
                                  className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                  name="itemEarningParameter1"
                                  type="text"
                                  placeholder="Eg. Entrepreneurship Lab"
                                />

                                <div className="flex items-center gap-4">
                                  <p className="font-bold text-lg me-[36px] mt-5">
                                    Skill Parameter
                                  </p>
                                  <img
                                    className="mt-5"
                                    src={required}
                                    alt="required"
                                  />
                                </div>

                                <input
                                  required
                                  className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                  name="itemEarningParameter1"
                                  type="text"
                                  placeholder="Eg. Entrepreneurship Lab"
                                />

                                <div className="mt-12 mb-7 flex justify-center">
                                  <input
                                    autoFocus
                                    className="bg-[#3E4DAC] rounded-lg px-12 py-3 text-xl font-bold text-[#fff]"
                                    type="submit"
                                    value="Add"
                                  />
                                </div>
                              </form>
                            </Typography>
                          </DialogContent>
                        </BootstrapDialogCategory>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isOpenEvaluationParameter && (
              <div className="dropdown-menu mt-[71px] mb-[45px] ">
                <div className="flex me-10 justify-between mt-20">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg ">Skill Category</p>
                      <img src={required} alt="required" />
                    </div>

                    <div
                      className="bg-[#F6F7FF] mt-6 ms-5 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] font-normal "
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #B7B7B7",
                      }}
                    >
                      <span className=" text-base text-[#3E4DAC] font-semibold">
                        Select Skill Category
                      </span>

                      <div
                        className="select-option"
                        onClick={toggleDropdownSkillCategory}
                      >
                        {!isOpenEvaluationSkillCategory && (
                          <img src={arrowright} alt="arrowRight" />
                        )}
                        {isOpenEvaluationSkillCategory && (
                          <img src={arrowDown} alt="arrowDown" />
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
                        className="dropdown-menu w-[312px] ms-5 mt-2"
                        style={{
                          borderRadius: "8px",
                          border: "1px solid #B7B7B7",
                        }}
                      >
                        <ul className="p-3">
                          <li
                            className="flex "
                            style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                          >
                            <input
                              type="radio"
                              id="html"
                              name="selectskillcategory"
                              value="HTML"
                            />
                            <div className="flex items-center">
                              <label className="ms-5" htmlFor="communication">
                                Communication
                              </label>
                            </div>
                          </li>
                          <li
                            className="flex"
                            style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                          >
                            <input
                              type="radio"
                              id="html"
                              name="selectskillcategory"
                              value="HTML"
                            />
                            <div className="flex items-center">
                              <label className="ms-5" htmlFor="com">
                                Com
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="  ">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Skill Name</p>
                      <img src={required} alt="required" />
                    </div>
                    <div
                      className="bg-[#F6F7FF] ms-5 mt-6 custom-dropdown flex justify-between items-center gap-2 h-[40px] w-[100%] px-2 text-[#535353] font-normal"
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
                      <div
                        className="select-option"
                        onClick={toggleDropdownSkillName}
                      >
                        {!isOpenSkillName && (
                          <img src={arrowright} alt="arrowRight" />
                        )}
                        {isOpenSkillName && (
                          <img src={arrowDown} alt="arrowDown" />
                        )}
                        <i
                          className={`dropdown-arrow ${
                            isOpenSkillName ? "open" : ""
                          }`}
                        ></i>
                      </div>
                    </div>
                    {isOpenSkillName && (
                      <div
                        className="dropdown-menu w-[300px] mt-2"
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
                            checked={selectedOptionSkillName.length === 4}
                            onChange={handleSelectAllSkillName}
                          />
                          <label
                            className="text-[#009EF9] text-xs font-medium"
                            htmlFor="selectAll"
                          >
                            Select All
                          </label>
                        </div>
                        <ul className="p-3 ">
                          <li
                            className=" flex items-center p-1"
                            style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                          >
                            <input
                              className="me-3"
                              type="checkbox"
                              id="student"
                              name="option"
                              value="Student"
                              checked={selectedOptionSkillName.includes(
                                "Student"
                              )}
                              onChange={handleOptionChangeSkillName}
                            />
                            <label
                              className="text-xs font-normal"
                              htmlFor="student"
                            >
                              Student
                            </label>
                          </li>
                          <li
                            className=" flex items-center p-1"
                            style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                          >
                            <input
                              className="me-3"
                              type="checkbox"
                              id="parent"
                              name="option"
                              value="Parent"
                              checked={selectedOptionSkillName.includes(
                                "Parent"
                              )}
                              onChange={handleOptionChangeSkillName}
                            />
                            <label
                              className="text-xs font-normal"
                              htmlFor="parent"
                            >
                              Parent
                            </label>
                          </li>
                          <li
                            className=" flex items-center p-1"
                            style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                          >
                            <input
                              className="me-3"
                              type="checkbox"
                              id="counselor"
                              name="option"
                              value="Counselor"
                              checked={selectedOptionSkillName.includes(
                                "Counselor"
                              )}
                              onChange={handleOptionChangeSkillName}
                            />
                            <label
                              className="text-xs font-normal"
                              htmlFor="counselor"
                            >
                              Counselor
                            </label>
                          </li>
                          <li
                            className=" flex items-center p-1"
                            style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                          >
                            <input
                              className="me-3"
                              type="checkbox"
                              id="others"
                              name="option"
                              value="Others"
                              checked={selectedOptionSkillName.includes(
                                "Others"
                              )}
                              onChange={handleOptionChangeSkillName}
                            />
                            <label
                              className="text-xs font-normal"
                              htmlFor="others"
                            >
                              Others
                            </label>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="">
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Skill Parameter
                        </p>
                      </div>

                      <div
                        className=" bg-[#F6F7FF] mt-6 ms-5 custom-dropdown flex justify-between items-center gap-2  border  rounded-lg h-[40px] w-[100%] px-2 text-[#535353] font-normal "
                        style={{
                          borderRadius: "8px",
                          border: "1px solid #B7B7B7",
                        }}
                      >
                        <span className=" text-base text-[#3E4DAC] font-semibold">
                          Select Skill Parameter
                        </span>

                        <div
                          className="select-option"
                          onClick={toggleDropdownSkillParameter}
                        >
                          {!isOpenEvaluationSkillParameter && (
                            <img src={arrowright} alt="arrowRight" />
                          )}
                          {isOpenEvaluationSkillParameter && (
                            <img src={arrowDown} alt="arrowDown" />
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
                            <li
                              className="flex "
                              style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                            >
                              <input
                                type="radio"
                                id="html"
                                name="selectskillParameter"
                                value="HTML"
                              />
                              <div className="flex items-center">
                                <label className="ms-5" htmlFor="communication">
                                  Communication
                                </label>
                              </div>
                            </li>
                            <li
                              className="flex"
                              style={{ boxShadow: "0px 2px 0px 0px #E6E6E6" }}
                            >
                              <input
                                type="radio"
                                id="html"
                                name="selectskillParameter"
                                value="HTML"
                              />
                              <div className="flex items-center">
                                <label className="ms-5" htmlFor="com">
                                  Com
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" mt-[90px]  border-b-2">
                  <div className="flex justify-center">
                    {!parameterSection && (
                      <p
                        onClick={handleProceed}
                        className="bg-[#FFDB70] text-base font-bold p-3 rounded-lg mb-10 flex justify-center w-[97px]"
                      >
                        Procced
                      </p>
                    )}
                  </div>

                  {proceed && (
                    <div className=" mt-2 rounded border mb-5 flex  ">
                      <form className="w-full">
                        <div className="flex justify-between">
                          <div className="mx-10 mt-10 w-1/6 ">
                            {/* 1 */}
                            <div
                              className={`w-11/12  h-[38px] flex justify-between items-center px-4 py-2 text-sm font-medium ${
                                SoftSkills ? "text-[#0A98EA] " : "text-[black]"
                              }`}
                              style={{
                                borderRadius: "8px",

                                border: `${
                                  !SoftSkills ? "1px solid #B7B7B7" : "none"
                                }`,
                                background: " #FFF",
                                boxShadow: `${
                                  SoftSkills
                                    ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    : "none"
                                }`,
                              }}
                            >
                              <p>Soft Skills</p>
                              <img
                                onClick={handleSoftSkill}
                                src={arrowright}
                                alt="arrowRight"
                              />
                            </div>

                            <div
                              className="w-11/12  h-[38px] flex justify-between items-center px-4 py-2 text-sm font-medium mt-4"
                              style={{
                                borderRadius: "8px",
                                border: "1px solid #B7B7B7",
                                background: " #FFF",
                              }}
                            >
                              <p>Skill Category 2</p>
                              <img src={arrowright} alt="arrowRight" />
                            </div>

                            <div
                              className="w-11/12  h-[38px] flex justify-between items-center px-4 py-2 text-sm font-medium mt-4"
                              style={{
                                borderRadius: "8px",
                                border: "1px solid #B7B7B7",
                                background: " #FFF",
                              }}
                            >
                              <p>Skill Category 2</p>
                              <img src={arrowright} alt="arrowRight" />
                            </div>

                            <div
                              className="w-11/12 h-[38px] flex justify-between items-center px-4 py-2 text-sm font-medium mt-4"
                              style={{
                                borderRadius: "8px",
                                border: "1px solid #B7B7B7",
                                background: " #FFF",
                              }}
                            >
                              <p>Skill Category 2</p>
                              <img src={arrowright} alt="arrowRight" />
                            </div>
                          </div>

                          <div className="flex-1 flex   me-10">
                            {SoftSkills && (
                              <div className="w-full flex flex-col items-center">
                                <div
                                  className={`flex text-base font-medium mt-10 w-11/12  h-[65px] justify-between rounded-md px-4 items-center ${
                                    selectedSection === "communication"
                                      ? "bg-[#E2F1FF]"
                                      : "bg-[#F8F8F8]"
                                  }`}
                                >
                                  <p className="w-full">Communication</p>
                                  <div className="flex justify-between ms-2 items-center w-full">
                                    <input
                                      className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                                      name="communication"
                                      type="text"
                                    />
                                    <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                                      %
                                    </p>
                                    <ArrowForwardIcon
                                      onClick={() =>
                                        handleArrowClick("communication")
                                      }
                                    />
                                  </div>
                                </div>

                                <div
                                  className={`flex text-base font-medium mt-8  w-11/12 h-[65px] justify-between rounded-md px-4 items-center ${
                                    selectedSection === "negotiation"
                                      ? "bg-[#E2F1FF]"
                                      : "bg-[#F8F8F8]"
                                  }`}
                                >
                                  <p className="w-full">Negotiation</p>
                                  <div className="flex justify-between ms-2 items-center w-full">
                                    <input
                                      className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                                      name="negotiation"
                                      type="text"
                                    />
                                    <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                                      %
                                    </p>
                                    <ArrowForwardIcon
                                      onClick={() =>
                                        handleArrowClick("negotiation")
                                      }
                                    />
                                  </div>
                                </div>

                                <div
                                  className={`flex  text-base font-medium mt-8 w-11/12 h-[65px] justify-between rounded-md px-4 items-center ${
                                    selectedSection === "Time Management"
                                      ? "bg-[#E2F1FF]"
                                      : "bg-[#F8F8F8]"
                                  }`}
                                >
                                  <p className="w-full">Time Management</p>
                                  <div className="flex justify-between ms-2 items-center w-full">
                                    <input
                                      className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                                      name="Time Management"
                                      type="text"
                                    />
                                    <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                                      %
                                    </p>
                                    <ArrowForwardIcon
                                      onClick={() =>
                                        handleArrowClick("Time Management")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                            {selectedSection && (
                              <div className="w-full flex flex-col items-center">
                                <div className="flex text-base font-medium mt-10 bg-[#E2F1FF] w-11/12 h-[65px] justify-between rounded-md px-4 items-center">
                                  <p className="w-full">
                                    {" "}
                                    Verbal Communication
                                  </p>
                                  <div className="flex justify-between ms-2 items-center w-full">
                                    <input
                                      className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                                      name="verbalCommunication"
                                      type="text"
                                    />
                                    <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                                      %
                                    </p>
                                  </div>
                                </div>
                                <div className="flex text-base font-medium mt-8 bg-[#E2F1FF] w-11/12 h-[65px] justify-between rounded-md px-4 items-center">
                                  <p className="w-full">
                                    Non- Verbal Communication
                                  </p>
                                  <div className="flex justify-between ms-2 items-center w-full">
                                    <input
                                      className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                                      name="verbalCommunication"
                                      type="text"
                                    />
                                    <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                                      %
                                    </p>
                                  </div>
                                </div>
                                <div className="flex text-base font-medium mt-8 bg-[#E2F1FF] w-11/12 h-[65px] justify-between rounded-md px-4 items-center">
                                  <p className="w-full">Active Listening</p>
                                  <div className="flex justify-between ms-2 items-center w-full">
                                    <input
                                      className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]"
                                      name="verbalCommunication"
                                      type="text"
                                    />
                                    <p className="w-1/3 h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#fff]">
                                      %
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-9 mb-7 flex justify-center">
                          <p
                            onClick={handleParameterSection}
                            className="bg-[#2EB0FB] rounded-lg px-4 py-1 font-semibold text-[#fff]"
                          >
                            Apply
                          </p>
                        </div>
                      </form>
                    </div>
                  )}
                  {parameterSection && (
                    <div
                      className="flex  justify-between px-10 py-6 mb-5 me-10 "
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #939393",
                      }}
                    >
                      <div>
                        <p className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal">
                          Soft Skills
                        </p>
                      </div>
                      <div>
                        <p className="bg-[#FFFEE2] px-4 py-3 rounded-lg text-sm font-normal">
                          Communication
                        </p>
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
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div
                className="select-option flex items-center gap-[40px]"
                onClick={toggleDropdownItemEarningParameter}
              >
                <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                  2
                </h1>
                <p className="text-[25px] font-bold">Item Earning Parameter </p>
                {!isOpenItemEarningParameter && (
                  <img className="w-6" src={arrowright} alt="arrowRight" />
                )}

                {isOpenItemEarningParameter && (
                  <img src={arrowDown} alt="arrowDown" />
                )}

                <i
                  className={`dropdown-arrow ${
                    isOpenItemEarningParameter ? "open" : ""
                  }`}
                ></i>
              </div>

              <div className="flex justify-between me-10 ">
                <div className="">
                  <div className=" flex flex-col">
                    <div className="flex gap-[72px]">
                      {parameterSection && (
                        <div className="w-[94px] bg-[#FFEAE9]  rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center">
                          <p className="text-2xl">+</p>
                          <div>
                            <p className="w-full ">Add</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <div>
                          <div
                            variant="outlined"
                            onClick={handleClickOpenEarningParameter}
                            className="button w-[298px] bg-[#3E4DAC] text-[#fff] rounded-lg text-base px-4 py-3 font-semibold flex gap-2 justify-center items-center"
                          >
                            <p className="text-2xl">+</p>
                            <div>
                              <p className="w-full ">
                                Create new earning parameter
                              </p>
                            </div>
                          </div>

                          <BootstrapDialogEarningParameter
                            onClose={handleCloseearningparameter}
                            aria-labelledby="customized-dialog-title"
                            open={openEarningParameter}
                          >
                            <BootstrapDialogTitleEarningParameter
                              id="customized-dialog-title"
                              onClose={handleCloseearningparameter}
                            >
                              <p className="text-[22px] font-bold text-[#3E4DAC]">
                                Add new Item earning parameter
                              </p>
                            </BootstrapDialogTitleEarningParameter>
                            <DialogContent dividers>
                              <Typography gutterBottom>
                                <form className="mt-6 mx-10">
                                  <div className="flex items-center gap-4">
                                    <p className="font-bold text-lg me-[36px]">
                                      Item Earning Parameter
                                    </p>
                                  </div>

                                  <input
                                    className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                                    name="itemEarningParameter1"
                                    type="text"
                                    placeholder="Eg. Entrepreneurship Lab"
                                  />

                                  <div className="mt-12 mb-7 flex justify-center">
                                    <input
                                      autoFocus
                                      onClick={handleCloseearningparameter}
                                      className="bg-[#3E4DAC] rounded-lg px-12 py-3 text-xl font-bold text-[#fff]"
                                      type="submit"
                                      value="Add"
                                    />
                                  </div>
                                </form>
                              </Typography>
                            </DialogContent>
                          </BootstrapDialogEarningParameter>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isOpenItemEarningParameter && (
              <div className="">
                <div className=" mt-12">
                  {!parameterSection && (
                    <>
                      <div className="flex items-center gap-4">
                        <p className="h-2 w-2 bg-black rounded-full"></p>
                        <p className="font-bold text-lg me-[36px]">
                          Item Earning Parameter
                        </p>
                      </div>
                      <div className="flex gap-20 items-center">
                        <div
                          className=" flex gap-2  mt-6 ms-6 border rounded-md w-[349px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                          style={{
                            boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
                          }}
                        >
                          <select
                            required
                            className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0"
                            name="itemEarningParameter"
                          >
                            <option selected className="">
                              Select Item Earning Parameter
                            </option>
                            <option value="Offline"> Offline</option>
                          </select>
                        </div>
                        {proceed && (
                          <div className="mt-12 mb-7 flex justify-center">
                            <input
                              className="bg-[#2EB0FB] rounded-lg px-4 py-3 font-semibold text-[#fff]"
                              type="submit"
                              value="Apply"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {proceed && (
                    <div className="flex gap-5 items-center ms-5 mt-5">
                      <div className="flex gap-2 bg-[#DAFFD3] p-2 rounded">
                        <p>Creativity</p>
                        <img src={closeCircle} alt="closeCircle" />
                      </div>
                      <input
                        className="w-[47px] h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#F6F7FF]"
                        name="communication"
                        type="text"
                        placeholder="0"
                      />
                      <div className="w-[47px] h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#F6F7FF]">
                        <p>%</p>
                        <img src={arrowDown} alt="arrowDown" />
                      </div>
                    </div>
                  )}

                  {parameterSection && (
                    <div className=" mt-12">
                      <div
                        className=" w-[420px] px-[36px] py-[25px] mt-16"
                        style={{
                          borderRadius: "20px",
                          border: "1px solid #B4B4B4",
                        }}
                      >
                        <div className="flex  justify-between items-center ">
                          <div className="flex gap-2 bg-[#DAFFD3] p-2 rounded">
                            <p>Creativity</p>
                          </div>
                          <div className="flex gap-10 me-[70px]">
                            <div className="w-[47px] h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#DAFFD3]">
                              <p>50</p>
                              <p>%</p>
                            </div>
                            <div className="bg-[#282828] rounded-full w-5 h-5  flex items-center justify-center ">
                              <img src={edit} alt="edit" />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center  mt-5">
                          <div className="flex gap-2 bg-[#E8F1FF] p-2 rounded">
                            <p>Delight</p>
                          </div>
                          <div className="flex gap-10 me-[70px]">
                            <div className="w-[47px] h-[32px] border border-black rounded-lg flex items-center justify-center bg-[#E8F1FF]">
                              <p>50</p>
                              <p>%</p>
                            </div>
                            <div className="bg-[#282828] rounded-full w-5 h-5  flex items-center justify-center ">
                              <img src={edit} alt="edit" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center mt-20 mb-10">
              <input
                type="submit"
                value="Save"
                className="px-[25px] py-2 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
              />
              <input
                type="submit"
                value="Save & Display"
                className="px-[25px] py-2 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
              />
            </div>
          </form>
        </div>
      )}
      {/* </Layout> */}
    </div>
  );
};

export default QuizEvaluationParameter;
