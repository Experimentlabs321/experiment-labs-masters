import required from "../../../assets/ContentManagement/required.png";
import chevronright from "../../../assets/ContentManagement/chevronright.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import arrowRight from "../../../assets/SkillsManagement/arrowright.svg";
import bxseditalt from "../../../assets/ContentManagement/bxseditalt.svg";
import trash from "../../../assets/ContentManagement/trash.svg";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import ImportQuestionToFile from "./ImportQuestionToFile";
import chevronRight1 from "../../../assets/ContentManagement/chevronRight1.svg";
import ExportQuesToFile from "./ExportQuesToFile";
import Layout from "../Layout";

const ManageQuestionBank = () => {
  const [selectedTab, setSelectedTab] = useState("Question Bank");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  //

  const [allSelect, setAllselect] = useState(false);
  const [importQues, setImportQues] = useState(false);
  const [exportQues, setExportQues] = useState(false);
  const [move, setMove] = useState(false);
  const [selectedOptionsQuestion, setselectedOptionsQuestion] = useState([]);

  const handlesetImportQues1 = () => {
    setImportQues(true);
    setExportQues(false);
  };

  const handlesetImportQues = () => {
    setImportQues(false);
  };
  const handlesetexportQues1 = () => {
    setExportQues(true);
  };
  const handlesetExportQues = () => {
    setExportQues(false);
  };

  // console.log(exportQues);
  // console.log(importQues);

  const handleOptionChangeQuestion = (event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setselectedOptionsQuestion([...selectedOptionsQuestion, optionValue]);
      setMove(true);
    } else {
      setselectedOptionsQuestion(
        selectedOptionsQuestion.filter((option) => option !== optionValue)
      );
      setMove(false);
    }
  };

  const handleSelectAllQues = (event) => {
    const isChecked = event.target.checked;
    setAllselect(true);

    if (isChecked) {
      setselectedOptionsQuestion(["1", "2", "3"]);
    } else {
      setselectedOptionsQuestion([]);
    }
  };
  ///

  const handleAllselect = () => {
    setAllselect(false);
    setselectedOptionsQuestion([]);
  };

  //////////////////////
  const BootstrapDialognewQues = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitleNewQuesType(props) {
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

  BootstrapDialogTitleNewQuesType.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [openNewQuesType, setopenNewQuesType] = React.useState(false);

  const handleClickopenNewQuesType = () => {
    setopenNewQuesType(true);
  };
  const handleCloseNewQuesType = () => {
    setopenNewQuesType(false);
  };

  //
  const [isOpenEvluationCourseSelection, setisOpenEvluationCourseSelection] =
    useState(false);
  const [selectedOptionsCourseSelection, setSelectedOptionsCourseSelection] =
    useState([]);
  const toggleDropdownCourseSelection = () => {
    setisOpenEvluationCourseSelection(!isOpenEvluationCourseSelection);
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
                    <img src={required} />
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
                    <img src={required} />
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

      {selectedTab === "Question Bank" && (
        <div>
          {!importQues && !exportQues && (
            <div className="mx-10 my-20">
              <div className="flex justify-between">
                <div className=" w-[30%] flex items-center">
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">Select Batch</p>
                  </div>

                  <div className=" flex gap-2  ms-6 border rounded-md w-[35%] h-[40px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">
                    <select
                      required
                      className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0"
                      name="courseCategory"
                      // id="option"
                    >
                      <option className="" selected>
                        Batch 1
                      </option>
                      <option value="Parent"></option>
                      <option value="Counselor"></option>
                      <option value="Others"></option>
                    </select>
                  </div>
                </div>

                <div className=" flex items-center">
                  <div className="flex items-center justify-between ms-6 border rounded-md  h-[40px] px-5 text-[#535353]  bg-[#F6F7FF] ">
                    <div className="flex gap-2">
                      <SearchIcon />
                      <input
                        className="focus:outline-0 text-[#535353]  bg-[#F6F7FF]"
                        name="Location"
                        type="text"
                        placeholder="Search Question"
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex items-center">
                  <div className=" ">
                    <div
                      onClick={toggleDropdownCourseSelection}
                      className="custom-dropdown flex justify-between items-center gap-2  h-[40px]  px-2 text-base text-[#fff] bg-[#3E4DAC] font-bold"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #B7B7B7",
                      }}
                    >
                      <div>
                        <div className="flex gap-2">
                          <p>Question</p>
                        </div>
                      </div>
                      <div className="select-option">
                        <img src={chevronright}></img>
                        <i
                          className={`dropdown-arrow ${
                            isOpenEvluationCourseSelection ? "open" : ""
                          }`}
                        ></i>
                      </div>
                    </div>
                    {isOpenEvluationCourseSelection && (
                      <div
                        className="dropdown-menu bg-[black] text-[#fff] mt-1 flex gap-3 flex-col p-3"
                        style={{
                          borderRadius: "8px",
                          border: "1px solid #B7B7B7",
                        }}
                      >
                        <button onClick={handlesetImportQues1}>
                          Import question
                        </button>
                        <button onClick={handlesetexportQues1}>
                          Export question
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-20 mb-10">
                <div className="flex ">
                  {!allSelect && (
                    <div className="flex  p-2">
                      <input
                        style={{ fontSize: "0", opacity: "0" }}
                        className="w-[0%]"
                        type="checkbox"
                        id="selectAll"
                        checked={selectedOptionsQuestion.length === 3}
                        onChange={handleSelectAllQues}
                      />
                      <label
                        className=" text-base font-semibold bg-[#E8E8E8] rounded-lg border p-2"
                        htmlFor="selectAll"
                      >
                        Select All
                      </label>
                    </div>
                  )}
                  {allSelect && (
                    <div className="flex  p-2">
                      <label
                        onClick={handleAllselect}
                        className=" text-base font-semibold bg-[#E8E8E8] rounded-lg border p-2"
                        htmlFor="DeSelect All"
                      >
                        Deselect All
                      </label>
                    </div>
                  )}
                  {allSelect && (
                    <div className="flex  p-2">
                      <label
                        className=" text-base font-semibold bg-[#FFE9E9] rounded-lg border p-2"
                        htmlFor="Delete Selected"
                      >
                        Delete Selected
                      </label>
                    </div>
                  )}
                  {allSelect && (
                    <div className="flex  p-2">
                      <label
                        className=" text-base font-semibold bg-[#E4FFE7] rounded-lg border p-2"
                        htmlFor="Move to"
                      >
                        Move to
                      </label>
                    </div>
                  )}
                  {move && (
                    <div className="flex  p-2">
                      <label
                        className=" text-base font-semibold bg-[#E4FFE7] rounded-lg border p-2"
                        htmlFor="Move to"
                      >
                        Move to
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <div>
                    <div
                      variant="outlined"
                      onClick={handleClickopenNewQuesType}
                      className="button w-[100%] bg-[#FF557A] text-[#fff] rounded-lg text-base px-4 py-2 font-semibold flex gap-2 justify-center items-center"
                    >
                      <p className="text-2xl">+</p>
                      <div>
                        <p className="w-full ">Add new question</p>
                      </div>
                      <img src={chevronright} />
                    </div>

                    <BootstrapDialognewQues
                      onClose={handleCloseNewQuesType}
                      aria-labelledby="customized-dialog-title"
                      open={openNewQuesType}
                    >
                      <BootstrapDialogTitleNewQuesType
                        id="customized-dialog-title"
                        onClose={handleCloseNewQuesType}
                      >
                        <p className="text-[22px] font-bold text-[#3E4DAC]">
                          Question Type
                        </p>
                      </BootstrapDialogTitleNewQuesType>
                      <DialogContent dividers>
                        <Typography gutterBottom>
                          <form className=" mx-10">
                            <div className="flex gap-10">
                              <div className="">
                                <div className=" ">
                                  <input
                                    type="radio"
                                    id="Calculated"
                                    name="fav_language"
                                    value="Calculated"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="Calculated"
                                  >
                                    Calculated
                                  </label>
                                </div>
                                <div className="mt-6">
                                  <input
                                    type="radio"
                                    id="Matching"
                                    name="fav_language"
                                    value="Matching"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="Matching"
                                  >
                                    Matching
                                  </label>
                                </div>
                                <div className="mt-6">
                                  <input
                                    type="radio"
                                    id="Numerical"
                                    name="fav_language"
                                    value="Numerical"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="Numerical"
                                  >
                                    Numerical
                                  </label>
                                </div>
                                <div className="mt-6">
                                  <input
                                    type="radio"
                                    id="Essay"
                                    name="fav_language"
                                    value="Essay"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="Essay"
                                  >
                                    Essay
                                  </label>
                                </div>
                                <div className="mt-6">
                                  <input
                                    type="radio"
                                    id="Drag and drop into text"
                                    name="fav_language"
                                    value="Drag and drop into text"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="Drag and drop into text"
                                  >
                                    Drag and drop into text
                                  </label>
                                </div>
                              </div>
                              <div className="">
                                <div className="">
                                  <input
                                    type="radio"
                                    id="Calculated Multichoice"
                                    name="fav_language"
                                    value="Calculated Multichoice"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="Calculated Multichoice"
                                  >
                                    Calculated Multichoice
                                  </label>
                                </div>
                                <div className="mt-6">
                                  <input
                                    type="radio"
                                    id="Multiple choice"
                                    name="fav_language"
                                    value="Multiple choice"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="Multiple choice"
                                  >
                                    Multiple choice
                                  </label>
                                </div>
                                <div className="mt-6">
                                  <input
                                    type="radio"
                                    id="Short answer"
                                    name="fav_language"
                                    value="Short answer"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="Short answer"
                                  >
                                    Short answer
                                  </label>
                                </div>
                                <div className="mt-6">
                                  <input
                                    type="radio"
                                    id="True/False"
                                    name="fav_language"
                                    value="True/False"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="True/False"
                                  >
                                    True/False
                                  </label>
                                </div>
                                <div className="mt-6">
                                  <input
                                    type="radio"
                                    id="Select missing words"
                                    name="fav_language"
                                    value="Select missing words"
                                  />
                                  <label
                                    className="ms-6 text-sm font-semibold"
                                    for="True/False"
                                  >
                                    Select missing words
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-center mt-10">
                              <Link
                                to="/addingEditingCalQues"
                                className="px-10 py-2 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
                              >
                                Add
                              </Link>
                            </div>
                          </form>
                        </Typography>
                      </DialogContent>
                    </BootstrapDialognewQues>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-lg font-medium mb-10">
                <div className="flex gap-2 items-center">
                  <p>
                    {" "}
                    Total Questions : <span className="text-[#3E4DAC]">3</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p>
                    Total Marks/Points :{" "}
                    <span className="text-[#3E4DAC]">100</span>
                  </p>
                  <img src={bxseditalt} />
                </div>
              </div>

              <div className="">
                <div className="w-[100%] mt-2">
                  <table className="w-full">
                    <thead className="bg-[#FFFDEA]  ">
                      <tr className="text-[#3E4DAC] text-base font-bold">
                        <th className="py-5">Question No</th>
                        <th>Question Name</th>
                        <th>Question Type</th>
                        <th>Marks</th>
                        <th>Edit</th>
                        <th>Last Used</th>
                        <th>Usage</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      <tr className="bg-[#F2FFFA] ">
                        <td className="flex justify-center py-5 ">
                          <input
                            className="me-3"
                            type="checkbox"
                            id="1"
                            name="option"
                            value="1"
                            checked={selectedOptionsQuestion.includes("1")}
                            onChange={handleOptionChangeQuestion}
                          />
                          <p>1</p>
                        </td>
                        <td className="text-center">Question Name</td>
                        <td className="text-center">Question Type</td>
                        <td className="text-center">Marks</td>
                        <td className="flex items-center justify-center">
                          <img src={bxseditalt} />
                        </td>
                        <td className="text-center">Batch 1</td>
                        <td className="text-center">1</td>
                        <td className="flex items-center justify-center">
                          <img src={trash} />
                        </td>
                      </tr>
                      <tr className="">
                        <td className="flex justify-center py-5">
                          <input
                            className="me-3"
                            type="checkbox"
                            id="2"
                            name="option"
                            value="2"
                            checked={selectedOptionsQuestion.includes("2")}
                            onChange={handleOptionChangeQuestion}
                          />
                          <p>2</p>
                        </td>
                        <td className="text-center">Question Name</td>
                        <td className="text-center">Question Type</td>
                        <td className="text-center">Marks</td>
                        <td className="flex items-center justify-center">
                          <img src={bxseditalt} />
                        </td>
                        <td className="text-center">Batch 1</td>
                        <td className="text-center">1</td>
                        <td className="flex items-center justify-center">
                          <img src={trash} />
                        </td>
                      </tr>
                      <tr className=" bg-[#F2FFFA]">
                        <td className="flex justify-center py-5">
                          <input
                            className="me-3"
                            type="checkbox"
                            id="3"
                            name="option"
                            value="3"
                            checked={selectedOptionsQuestion.includes("3")}
                            onChange={handleOptionChangeQuestion}
                          />
                          <p>3</p>
                        </td>
                        <td className="text-center">Question Name</td>
                        <td className="text-center">Question Type</td>
                        <td className="text-center">Marks</td>
                        <td className="flex items-center justify-center">
                          <img src={bxseditalt} />
                        </td>
                        <td className="text-center">Batch 1</td>
                        <td className="text-center">1</td>
                        <td className="flex items-center justify-center">
                          <img src={trash} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {importQues && (
            <>
              <div className="flex gap-5 text-2xl font-bold ms-10 my-10">
                <img onClick={handlesetImportQues} src={chevronRight1} />
                <p>Import Questions to file</p>
              </div>
              <ImportQuestionToFile />
              <div className="flex justify-center">
                <p
                  onClick={handlesetImportQues}
                  className="bg-[#3E4DAC] text-[#fff] px-3 py-2 rounded-lg font-bold"
                >
                  Import Question
                </p>
              </div>
            </>
          )}

          {exportQues && (
            <>
              <div className="flex gap-5 text-2xl font-bold ms-10 my-10">
                <img onClick={handlesetExportQues} src={chevronRight1} />
                <p>Export Questions to file</p>
              </div>
              <ExportQuesToFile />
              <div className="flex justify-center">
                <p
                  onClick={handlesetExportQues}
                  className="bg-[#3E4DAC] text-[#fff] px-3 py-2 rounded-lg font-bold"
                >
                  Export Question
                </p>
              </div>
            </>
          )}
        </div>
      )}
      {/* </Layout> */}
    </div>

    /*   */
  );
};

export default ManageQuestionBank;
