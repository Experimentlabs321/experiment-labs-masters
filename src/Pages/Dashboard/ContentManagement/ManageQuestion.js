import required from "../../../assets/ContentManagement/required.png";
import chevronright from "../../../assets/ContentManagement/chevronright.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

import bxseditalt from "../../../assets/ContentManagement/bxseditalt.svg";
import Vector from "../../../assets/ContentManagement/Vector.svg";
import trash from "../../../assets/ContentManagement/trash.svg";
import back from "../../../assets/ContentManagement/back.svg";
import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import arrow from "../../../assets/SkillsManagement/arrow.svg";
import { Link, useParams } from "react-router-dom";
import AddingEditingCalQues from "./AddingEditingCalQues";
import Layout from "../Layout";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import AddingEditingMultiChoQues from "./AddingEditingMultiChoQues";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";

const ManageQuestion = ({
  batchesData,
  selectedBatches,
  quizData,
  setQuizData,
}) => {
  const [selectedTab, setSelectedTab] = useState("Questions");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  //

  const [allSelect, setAllSelect] = useState(false);
  const [move, setMove] = useState(false);
  const [selectedOptionsQuestion, setSelectedOptionsQuestion] = useState([]);
  const dropdownRef = useRef(null);

  const handleOptionChangeQuestion = (event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedOptionsQuestion([...selectedOptionsQuestion, optionValue]);
      setMove(true);
    } else {
      setSelectedOptionsQuestion(
        selectedOptionsQuestion.filter((option) => option !== optionValue)
      );
      setMove(false);
    }
  };

  const handleSelectAllQues = (event) => {
    const isChecked = event.target.checked;
    setAllSelect(true);

    if (isChecked) {
      setSelectedOptionsQuestion(["1", "2", "3"]);
    } else {
      setSelectedOptionsQuestion([]);
    }
  };
  ///

  const handleAllSelect = () => {
    setAllSelect(false);
    setSelectedOptionsQuestion([]);
  };

  // popup add from ques bank

  const [allSelectFromQuesBank, setAllSelectFromQuesBank] = useState(false);
  // const [move, setMove] = useState(false);
  const [
    selectedOptionsQuestionFromQuesBank,
    setSelectedOptionsQuestionFromQuesBank,
  ] = useState(quizData?.questions);

  const handleSelectAllQuesFromQuesBank = (event) => {
    const isChecked = event.target.checked;
    setAllSelectFromQuesBank(true);
    setAllSelect(false);

    if (isChecked) {
      setSelectedOptionsQuestionFromQuesBank(["1", "2", "3"]);
    } else {
      setSelectedOptionsQuestionFromQuesBank([]);
    }
  };
  ///

  const handleAllSelectFromQuesBank = () => {
    setAllSelectFromQuesBank(false);
    setSelectedOptionsQuestionFromQuesBank([]);
  };

  ////////////////////// add ques type
  const BootstrapDialogNewQues = styled(Dialog)(({ theme }) => ({
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

  const [openNewQuesType, setOpenNewQuesType] = React.useState(false);

  const handleClickOpenNewQuesType = () => {
    setOpenNewQuesType(true);
  };
  const handleCloseNewQuesType = () => {
    setOpenNewQuesType(false);
  };

  ////////////////////// Add From QuesBank
  const BootstrapDialogAddFromQuesBank = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
    "& .MuiDialog-paper": {
      width: "100%",
    },
  }));

  function BootstrapDialogTitleAddFromQuesBank(props) {
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

  BootstrapDialogTitleAddFromQuesBank.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [openAddFromQuesBank, setOpenAddFromQuesBank] = useState(false);

  const handleClickOpenAddFromQuesBank = () => {
    setOpenAddFromQuesBank(true);
  };
  const handleCloseAddFromQuesBank = () => {
    setOpenAddFromQuesBank(false);
  };
  useEffect(() => {
    // Function to close dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenEvaluationCourseSelection(false);
      }
    };

    // Adding event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleaning up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //
  const [isOpenEvaluationCourseSelection, setIsOpenEvaluationCourseSelection] =
    useState(false);

  const toggleDropdownCourseSelection = () => {
    setIsOpenEvaluationCourseSelection(!isOpenEvaluationCourseSelection);
  };

  //

  const [addQues, setAddQues] = useState(false);

  //

  const updateQuestionsForBatch = async (batchId, newQuestions) => {
    // Create a copy of the quizObject
    const updatedQuizObject = { ...quizData };
    updatedQuizObject.questions = newQuestions;
    setQuizData(updatedQuizObject);
    await delete updatedQuizObject?._id;
    Loading();
    const newTask = await axios.put(
      `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/quizes/taskId/${quizData?._id}`,
      updatedQuizObject
    );

    if (newTask?.data?.result?.acknowledged) {
      toast.success("Question Added Successfully!");
      Loading().close();
      setOpenAddFromQuesBank(false);
    }
    console.log(updatedQuizObject);
  };

  const handleAddSelQues = () => {
    console.log(quizData);
    updateQuestionsForBatch(
      selectedBatchForAddingQuestion?._id,
      selectedOptionsQuestionFromQuesBank
    );
    setSelectedBatchForAddingQuestion({});
  };

  const { id } = useParams();

  // code by shihab
  const { userInfo } = useContext(AuthContext);
  const [questionType, setQuestionType] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionBankQuestions, setQuestionBankQuestions] = useState([]);
  const [selectedBatchForAddingQuestion, setSelectedBatchForAddingQuestion] =
    useState({});
  const [
    selectedBatchesForAddingQuestion,
    setSelectedBatchesForAddingQuestion,
  ] = useState([]);
  const [selectedBatchForShowingQuestion, setSelectedBatchForShowingQuestion] =
    useState({});
  const [questionsForSelectedBatch, setQuestionsForSelectedBatch] = useState(
    []
  );
  const [
    selectedBatchesForShowingQuestion,
    setSelectedBatchesForShowingQuestion,
  ] = useState([]);
  const [questionsForSelectedBatches, setQuestionsForSelectedBatches] =
    useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const handleOptionChangeQuestionFromQuesBank = (event) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;
    if (!selectedBatchForAddingQuestion?._id) {
      toast.error("Please select a batch!");
      return;
    }
    if (isChecked) {
      if (selectedOptionsQuestionFromQuesBank[0]) {
        const questionIndex = selectedOptionsQuestionFromQuesBank.findIndex(
          (question) => question.questionId === optionValue
        );
        if (questionIndex !== -1) {
          const updatedQuestions = [...selectedOptionsQuestionFromQuesBank];
          updatedQuestions[questionIndex].batches.push(
            selectedBatchForAddingQuestion?._id
          );
          setSelectedOptionsQuestionFromQuesBank(updatedQuestions);
        } else {
          setSelectedOptionsQuestionFromQuesBank([
            ...selectedOptionsQuestionFromQuesBank,
            {
              questionId: optionValue,
              batches: [selectedBatchForAddingQuestion?._id],
            },
          ]);
        }
      } else
        setSelectedOptionsQuestionFromQuesBank([
          {
            questionId: optionValue,
            batches: [selectedBatchForAddingQuestion?._id],
          },
        ]);
      setMove(true);
    } else {
      const questionIndex = selectedOptionsQuestionFromQuesBank.findIndex(
        (question) => question.questionId === optionValue
      );
      const updateQuestion = {
        ...selectedOptionsQuestionFromQuesBank[questionIndex],
      };
      updateQuestion.batches = updateQuestion?.batches?.filter(
        (item) => item !== selectedBatchForAddingQuestion?._id
      );
      selectedOptionsQuestionFromQuesBank[questionIndex] = updateQuestion;
      if (updateQuestion?.batches?.length === 0) {
        setSelectedOptionsQuestionFromQuesBank(
          selectedOptionsQuestionFromQuesBank.filter(
            (option) => option?.questionId !== optionValue
          )
        );
      }
      setMove(false);
    }
  };

  useEffect(() => {
    filterQuestionsForSelectedBatches();
  }, [selectedBatchesForShowingQuestion]);

  const filterQuestionsForSelectedBatches = () => {
    console.log(selectedBatchesForShowingQuestion);
    const filteredQuestions = quizData.questions.filter((batch) =>
      selectedBatches.includes(batch.batchId)
    ).questions;
    setQuestionsForSelectedBatches(filteredQuestions);
    console.log(filteredQuestions);
  };

  const handleOptionChangeBatch = (event, optionValue) => {
    // const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedBatchesForShowingQuestion([
        ...selectedBatchesForShowingQuestion,
        { batchName: optionValue?.batchName, batchId: optionValue?._id },
      ]);
      if (quizData?.questions) {
        const findBatch = quizData?.questions?.find(
          (item) => item?.batchId === optionValue?._id
        );
        if (findBatch) {
          console.log("batch question found");
          setQuestionsForSelectedBatches(findBatch?.questions);
        } else {
          console.log("batch question not found");
          setQuestionsForSelectedBatches([]);
        }
      } else {
        quizData.questions = [];
        quizData.questions.push({
          batchId: optionValue?._id,
          batchName: optionValue?.batchName,
          questions: [],
        });
      }
    } else {
      setSelectedBatchesForShowingQuestion(
        selectedBatchesForShowingQuestion.filter(
          (option) => option?.batchId !== optionValue?._id
        )
      );
    }
  };

  useEffect(() => {
    if (quizData?.questions[0]) {
      const findBatch = batchesData?.find(
        (item) => item?._id === quizData?.questions[0]?.batchId
      );
      setSelectedBatchForShowingQuestion(findBatch);
      setQuestionsForSelectedBatch(quizData?.questions[0]?.questions);
    }
  }, [quizData, batchesData]);

  useEffect(() => {
    if (userInfo?.organizationId)
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/questionBank/organizationId/${userInfo?.organizationId}`
        )
        .then((response) => {
          if (response?.data) setQuestionBankQuestions(response?.data);
        });
  }, [userInfo?.organizationId]);

  console.log(questionBankQuestions);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleRow = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Close the currently expanded row
    } else {
      setExpandedIndex(index); // Expand the clicked row
    }
  };

  useEffect(() => {
    let updatedShowQuestion = [];
    selectedOptionsQuestionFromQuesBank.forEach((item) => {
      const question = questionBankQuestions?.find(
        (q) => q?._id === item?.questionId
      );
      if (question) {
        if (selectedBatchesForShowingQuestion[0]) {
          const matchesBatch = item?.batches?.some((batchId) =>
            selectedBatchesForShowingQuestion?.some(
              (batch) => batch?.batchId === batchId
            )
          );

          // If the question matches any selected batch, add it to the updatedShowQuestion array
          if (matchesBatch) {
            updatedShowQuestion.push(question);
          }
        } else {
          updatedShowQuestion.push(question);
        }
      }
    });
    setQuizQuestions(updatedShowQuestion);
  }, [
    selectedBatchesForShowingQuestion,
    selectedOptionsQuestionFromQuesBank,
    questionBankQuestions,
  ]);

  console.log(quizQuestions);

  return (
    <div>
      <>
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
      </>

      {selectedTab === "Questions" && !showQuestionForm && (
        <div className="mx-10 my-20">
          {!addQues && (
            <div>
              <div className="flex justify-between">
                <div className=" flex items-center">
                  <div className="flex items-center justify-between border rounded-2xl  h-[40px] px-5 text-[#535353]  bg-[#F6F7FF] ">
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

                {!allSelect && (
                  <div ref={dropdownRef} className=" ">
                    <div
                      onClick={toggleDropdownCourseSelection}
                      className="custom-dropdown flex justify-between items-center gap-2 cursor-pointer h-[40px]  px-2 text-base text-[#fff] bg-[#3E4DAC] font-bold"
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #B7B7B7",
                      }}
                    >
                      <div>
                        <div className="flex gap-2">
                          <p>+</p>
                          <p>Add Question</p>
                        </div>
                      </div>
                      <div className="select-option">
                        <img src={chevronright} alt="chevronRight" />
                        <i
                          className={`dropdown-arrow ${
                            isOpenEvaluationCourseSelection ? "open" : ""
                          }`}
                        ></i>
                      </div>
                    </div>
                    {isOpenEvaluationCourseSelection && (
                      <div
                        className="dropdown-menu bg-[black] absolute text-[#fff] mt-1 flex gap-3 flex-col p-3"
                        style={{
                          borderRadius: "8px",
                          border: "1px solid #B7B7B7",
                        }}
                      >
                        <button onClick={handleClickOpenNewQuesType}>
                          Add new question
                        </button>

                        <div className="flex items-center">
                          <div>
                            <DialogLayoutForFromControl
                              title={
                                <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                  Question Type
                                </p>
                              }
                              width={600}
                              setOpen={setOpenNewQuesType}
                              open={openNewQuesType}
                            >
                              <form className=" mx-10 text-black w-full">
                                <div className="flex gap-10">
                                  <div className="">
                                    {/* <div className=" ">
                                      <input
                                        type="radio"
                                        id="Calculated"
                                        name="fav_language"
                                        value="Calculated"
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
                                      />
                                      <label
                                        className="ms-6 text-sm font-semibold"
                                        for="Calculated Multichoice"
                                      >
                                        Calculated Multichoice
                                      </label>
                                    </div> */}
                                    <div className="mt-6">
                                      <input
                                        type="radio"
                                        id="Multiple choice"
                                        name="fav_language"
                                        value="Multiple choice"
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
                                      />
                                      <label
                                        className="ms-6 text-sm font-semibold"
                                        for="Multiple choice"
                                      >
                                        Multiple choice
                                      </label>
                                    </div>
                                    {/* <div className="mt-6">
                                      <input
                                        type="radio"
                                        id="Short answer"
                                        name="fav_language"
                                        value="Short answer"
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                          setQuestionType(e.target.value)
                                        }
                                      />
                                      <label
                                        className="ms-6 text-sm font-semibold"
                                        for="True/False"
                                      >
                                        Select missing words
                                      </label>
                                    </div> */}
                                  </div>
                                </div>

                                <div className="flex justify-center mt-10">
                                  {/* <Link
                                        to="/addingEditingCalQues"
                                        className="px-10 py-2 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
                                      >
                                        {" "}
                                        Add{" "}
                                      </Link> */}
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      console.log(questionType);
                                      setAddQues(true);
                                    }}
                                    className="px-10 py-2 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
                                  >
                                    Add
                                  </button>
                                </div>
                              </form>
                            </DialogLayoutForFromControl>
                          </div>
                        </div>

                        <button onClick={handleClickOpenAddFromQuesBank}>
                          Add from question bank
                        </button>

                        <div className="w-full">
                          <DialogLayoutForFromControl
                            title={
                              <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                                Add Question From Question Bank
                              </p>
                            }
                            width={800}
                            setOpen={setOpenAddFromQuesBank}
                            open={openAddFromQuesBank}
                          >
                            <div className=" w-full text-black ">
                              <div className="flex justify-between items-center mb-10">
                                <div className="  flex items-center">
                                  <div className="flex items-center gap-4">
                                    <p className="text-lg font-semibold">
                                      Select Batch
                                    </p>
                                  </div>
                                  <div className=" flex gap-2  ms-6 border rounded-md  h-[40px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">
                                    <select
                                      required
                                      className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0"
                                      name="selectBatch"
                                      id="selectBatch"
                                      // defaultValue={
                                      //   selectedBatchForAddingQuestion?.batchName
                                      // }
                                      value={"Select Batch"}
                                      onChange={(e) => {
                                        const selectedBatch = batchesData?.find(
                                          (item) => item?._id === e.target.value
                                        );
                                        setSelectedBatchForAddingQuestion(
                                          selectedBatch
                                        );
                                        // if (quizData?.questions) {
                                        //   const findBatch =
                                        //     quizData?.questions?.find(
                                        //       (item) =>
                                        //         item?.batchId ===
                                        //         selectedBatch?._id
                                        //     );
                                        //   if (findBatch) {
                                        //     console.log("batch question found");
                                        //     setSelectedOptionsQuestionFromQuesBank(
                                        //       findBatch?.questions
                                        //     );
                                        //   } else {
                                        //     console.log(
                                        //       "batch question not found"
                                        //     );
                                        //     quizData.questions.push({
                                        //       batchId: selectedBatch?._id,
                                        //       batchName:
                                        //         selectedBatch?.batchName,
                                        //       questions: [],
                                        //     });
                                        //     setSelectedOptionsQuestionFromQuesBank(
                                        //       []
                                        //     );
                                        //   }
                                        // } else {
                                        //   quizData.questions = [];
                                        //   quizData.questions.push({
                                        //     batchId: selectedBatch?._id,
                                        //     batchName: selectedBatch?.batchName,
                                        //     questions: [],
                                        //   });
                                        // }
                                      }}
                                    >
                                      <option className="hidden">
                                        {selectedBatchForAddingQuestion?.batchName
                                          ? selectedBatchForAddingQuestion?.batchName
                                          : "Select Batch"}
                                      </option>
                                      {batchesData?.map((option, index) => {
                                        if (
                                          selectedBatches?.find(
                                            (item) =>
                                              item?.batchId === option?._id
                                          )
                                        )
                                          return (
                                            <option
                                              className=""
                                              value={option?._id}
                                            >
                                              {option?.batchName}
                                            </option>
                                          );
                                      })}
                                    </select>
                                  </div>
                                </div>
                                <>
                                  {/*   <div className="flex ">
                                  {!allSelectFromQuesBank && (
                                    <div className="">
                                      <div>
                                        <input
                                          style={{
                                            fontSize: "0",
                                            opacity: "0",
                                          }}
                                          className="w-[0%]"
                                          type="checkbox"
                                          id="selectAllfromquesbank"
                                          checked={
                                            selectedOptionsQuestionFromQuesBank?.length ===
                                            questionBankQuestions?.length
                                          }
                                          onChange={
                                            handleSelectAllQuesFromQuesBank
                                          }
                                        />
                                        <label
                                          className=" text-base font-semibold bg-[#E8E8E8] rounded-lg border p-2"
                                          htmlFor="selectAllfromquesbank"
                                        >
                                          Select All
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                  {allSelectFromQuesBank && (
                                    <div className="flex  p-2">
                                      <label
                                        onClick={handleAllSelectFromQuesBank}
                                        className=" text-base font-semibold bg-[#E8E8E8] rounded-lg border p-2"
                                        htmlFor="DeSelect All"
                                      >
                                        Deselect All
                                      </label>
                                    </div>
                                  )}
                                  {allSelectFromQuesBank && (
                                    <div className="flex  p-2">
                                      <label
                                        className=" text-base font-semibold bg-[#FFE9E9] rounded-lg border p-2"
                                        htmlFor="Delete Selected"
                                      >
                                        Delete Selected
                                      </label>
                                    </div>
                                  )}
                                </div> */}
                                </>
                              </div>

                              <div className="">
                                <div className=" mt-2 border rounded-sm">
                                  <div className="overflow-x-auto">
                                    <table className="w-full table-auto">
                                      <thead className="bg-[#FFFDEA] text-[#3E4DAC] text-base font-bold">
                                        <tr>
                                          <th className="py-3 px-2 whitespace-nowrap text-center">
                                            Question No
                                          </th>
                                          <th className="px-2 whitespace-nowrap text-center">
                                            Question Name
                                          </th>
                                          <th className="px-2 whitespace-nowrap text-center">
                                            Question Type
                                          </th>
                                          <th className="px-2 whitespace-nowrap text-center">
                                            Marks
                                          </th>
                                          <th className="px-2 whitespace-nowrap text-center">
                                            Preview
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {questionBankQuestions?.map(
                                          (question, index) => (
                                            <React.Fragment key={index}>
                                              <tr
                                                className={`${
                                                  index % 2 === 0
                                                    ? "bg-[#F2FFFA]"
                                                    : ""
                                                }`}
                                              >
                                                <td className="py-5 text-center">
                                                  <input
                                                    type="checkbox"
                                                    id={`question-${question?._id}`}
                                                    name={`question-${question?._id}`}
                                                    value={`${question?._id}`}
                                                    checked={
                                                      selectedOptionsQuestionFromQuesBank?.find(
                                                        (item) =>
                                                          item?.questionId ===
                                                            question?._id &&
                                                          item?.batches?.find(
                                                            (b) =>
                                                              b ===
                                                              selectedBatchForAddingQuestion?._id
                                                          )
                                                      )?.questionId ===
                                                      question?._id
                                                    }
                                                    onChange={
                                                      handleOptionChangeQuestionFromQuesBank
                                                    }
                                                  />
                                                  <label
                                                    htmlFor={`question-${
                                                      index + 1
                                                    }`}
                                                    className="ml-2"
                                                  >
                                                    {index + 1}
                                                  </label>
                                                </td>
                                                <td className="text-center">
                                                  {question?.questionName}
                                                </td>
                                                <td className="text-center">
                                                  {question.questionType}
                                                </td>
                                                <td className="text-center">
                                                  {question.defaultMarks}
                                                </td>
                                                <td className="text-center">
                                                  <img
                                                    onClick={() =>
                                                      handleToggleRow(index)
                                                    }
                                                    className="mx-auto cursor-pointer"
                                                    src={Vector}
                                                    alt="Preview"
                                                  />
                                                </td>
                                              </tr>
                                              {expandedIndex === index && (
                                                <tr className="border ">
                                                  <td colSpan="5">
                                                    <div className="bg-[#FFFCDE] rounded-[8px] w-full px-[20px] py-[30px] relative">
                                                      <svg
                                                        className="absolute top-0 right-0"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="108"
                                                        height="38"
                                                        viewBox="0 0 108 38"
                                                        fill="none"
                                                      >
                                                        <path
                                                          d="M98.97 37.4233L9.65459 37.4233C3.30196 37.4233 -1.01009 30.9655 1.42462 25.098L2.5147 22.4709C3.50542 20.0833 3.41044 17.3832 2.2544 15.0711L1.16635 12.895C-1.79591 6.9705 2.51221 -0.000183105 9.13601 -0.000183105L98.97 -0.000183105C103.891 -0.000183105 107.88 3.98912 107.88 8.91017V28.513C107.88 33.434 103.891 37.4233 98.97 37.4233Z"
                                                          fill="#4D2609"
                                                        />
                                                      </svg>
                                                      <h1 className=" text-white text-[16px] font-[500] absolute top-[6px] right-0 w-[108px] text-center ">
                                                        {question?.defaultMarks}{" "}
                                                        points
                                                      </h1>
                                                      <p
                                                        className=" text-[18px] font-[700] pt-4 "
                                                        dangerouslySetInnerHTML={{
                                                          __html:
                                                            question?.questionText,
                                                        }}
                                                      ></p>
                                                      <form
                                                        id="myForm"
                                                        className="mt-[45px]"
                                                      >
                                                        {!question?.options && (
                                                          <input
                                                            defaultValue={
                                                              question?.givenAnswer
                                                            }
                                                            // onChange={(e) => setSelectedOption(e.target.value)}
                                                            // onChange={
                                                            //   handleOptionChange
                                                            // }
                                                            className="w-[435px] p-[24px] text-[20px] font-[500] rounded-[8px] border-[#323232] border-2 bg-transparent "
                                                            placeholder="Write Here"
                                                            type="text"
                                                          />
                                                        )}
                                                        {question?.options &&
                                                          question?.options?.map(
                                                            (option, index) => (
                                                              <div key={index}>
                                                                <label className="flex items-center mb-[15px] text-[#3E4DAC] text-[15px] font-[600] ">
                                                                  <input
                                                                    className="form-radio mr-[15px] h-6 w-6  border rounded-full border-gray-400"
                                                                    // className="w-[22px]"
                                                                    type="radio"
                                                                    value={
                                                                      option?.answerFormula
                                                                    }
                                                                  />
                                                                  <p
                                                                    dangerouslySetInnerHTML={{
                                                                      __html:
                                                                        option?.answerFormula,
                                                                    }}
                                                                  ></p>
                                                                </label>
                                                              </div>
                                                            )
                                                          )}
                                                      </form>
                                                    </div>
                                                  </td>
                                                </tr>
                                              )}
                                            </React.Fragment>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-center mt-10">
                                <button
                                  onClick={() => {
                                    console.log("add");
                                    handleAddSelQues();
                                  }}
                                  className="px-10 py-2 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
                                >
                                  Add selected questions to quiz
                                </button>
                              </div>
                            </div>
                          </DialogLayoutForFromControl>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* <div className="flex justify-between mt-20 mb-10">
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
                        onClick={handleAllSelect}
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
                </div>
              </div> */}

              <div className=" my-10 flex items-center">
                <div className="flex items-center gap-4">
                  <p className="text-lg font-semibold">Select Batch</p>
                </div>

                <ul className="ms-6 flex gap-4 flex-wrap ">
                  {batchesData?.map((option, index) => {
                    if (
                      selectedBatches?.find(
                        (item) => item?.batchId === option?._id
                      )
                    )
                      return (
                        <>
                          <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                            <input
                              type="checkbox"
                              id="student"
                              name={option?.batchName}
                              value={option?.batchName}
                              checked={selectedBatchesForShowingQuestion?.find(
                                (item) => item?.batchName === option?.batchName
                              )}
                              onChange={(e) =>
                                handleOptionChangeBatch(e, option)
                              }
                              className=" mb-1"
                            />
                            <div className="flex mb-1 items-center">
                              <label className="ms-4" htmlFor={option?._id}>
                                {option?.batchName}
                              </label>
                            </div>
                          </li>
                        </>
                      );
                  })}
                </ul>

                <div className=" flex gap-2  ms-6 border rounded-md  h-[40px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">
                  <select
                    required
                    className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0"
                    name="selectBatchForShowingQuestion"
                    id="selectBatchForShowingQuestion"
                    // defaultValue={
                    //   selectedBatchForAddingQuestion?.batchName
                    // }
                    value={"Select Batch"}
                    onChange={(e) => {
                      const selectedBatch = batchesData?.find(
                        (item) => item?._id === e.target.value
                      );
                      setSelectedBatchForShowingQuestion(selectedBatch);
                      if (quizData?.questions) {
                        const findBatch = quizData?.questions?.find(
                          (item) => item?.batchId === selectedBatch?._id
                        );
                        if (findBatch) {
                          console.log("batch question found");
                          setQuestionsForSelectedBatch(findBatch?.questions);
                        } else {
                          console.log("batch question not found");
                          setQuestionsForSelectedBatch([]);
                        }
                      } else {
                        quizData.questions = [];
                        quizData.questions.push({
                          batchId: selectedBatch?._id,
                          batchName: selectedBatch?.batchName,
                          questions: [],
                        });
                      }
                    }}
                  >
                    <option className="hidden">
                      {selectedBatchForShowingQuestion?.batchName
                        ? selectedBatchForShowingQuestion?.batchName
                        : "Select Batch"}
                    </option>
                    {batchesData?.map((option, index) => {
                      if (
                        selectedBatches?.find(
                          (item) => item?.batchId === option?._id
                        )
                      )
                        return (
                          <option className="" value={option?._id}>
                            {option?.batchName}
                          </option>
                        );
                    })}
                  </select>
                </div>
              </div>

              <div className="flex justify-between text-lg font-medium mb-10">
                <div className="flex gap-2 items-center">
                  <p>
                    {" "}
                    Total Questions :{" "}
                    <span className="text-[#3E4DAC]">
                      {quizQuestions?.length}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p>
                    Total Marks/Points :{" "}
                    <span className="text-[#3E4DAC]">{quizData?.points}</span>
                  </p>
                  {/* <img src={bxseditalt} alt="bxseditalt" /> */}
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
                        {/* <th>Edit</th>
                        <th>Delete</th> */}
                      </tr>
                    </thead>
                    <tbody className="">
                      {quizQuestions?.map((question, index) => (
                        <tr
                          className={`${index % 2 === 0 ? "bg-[#F2FFFA]" : ""}`}
                        >
                          <td className="flex justify-center py-5 ">
                            {allSelect && (
                              <input
                                className="me-3"
                                type="checkbox"
                                id="1"
                                name="option"
                                value="1"
                                checked={selectedOptionsQuestion.includes("1")}
                                onChange={handleOptionChangeQuestion}
                              />
                            )}

                            <p>{index + 1}</p>
                          </td>
                          <td className="text-center">
                            {question?.questionName}
                          </td>
                          <td className="text-center">
                            {question?.questionType}
                          </td>
                          <td className="text-center">
                            {question?.defaultMarks}
                          </td>
                          {/* <td className="flex items-center justify-center">
                                <img src={bxseditalt} alt="bxseditalt" />
                              </td>

                              <td className="">
                                <img src={trash} alt="trash" />
                              </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {addQues && (
            <>
              {questionType === "Multiple choice" && (
                <AddingEditingMultiChoQues
                  addQues={addQues}
                  setAddQues={setAddQues}
                  setOpenNewQuesType={setOpenNewQuesType}
                />
              )}
              {/* <div>
                <div className="flex justify-between items-center mb-10">
                  <p className=" text-[26px] font-bold ">
                    Adding/Editing Calculation Question{" "}
                  </p>
                  <div
                    onClick={() => setAddQues(false)}
                    className="bg-[#3E4DAC] flex  px-4 py-2 rounded-lg text-[#fff]"
                  >
                    <img src={back} />
                    <p className="">Back</p>
                  </div>
                </div>
                <AddingEditingCalQues />
              </div> */}
            </>
          )}
        </div>
      )}
      {/* </Layout> */}
    </div>
  );
};

export default ManageQuestion;
