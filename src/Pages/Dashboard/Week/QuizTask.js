import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CongratulationsLeft from "../../../assets/Dashboard/CongratulationsLeft.png";
import CongratulationsRight from "../../../assets/Dashboard/CongratulationsRight.png";
import CongratulationsBatch from "../../../assets/Dashboard/CongratulationsBatch.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// let questions = [
//   {
//     id: 1,
//     question: "In Figma, What is the use Opt + Cmd + K / Ctrl + Alt + K ?",
//     options: [
//       "A. Run last plugin",
//       "B. Create component",
//       "C. Share a file",
//       "D. Frame selection",
//     ],
//     explanations: [
//       "It is runed by Ctrl + Alt + P/ Opt + Cmd + P",
//       "It is runed by Ctrl + Alt + P/ Opt + Cmd + P",
//       "It is runed by Ctrl + Alt + P/ Opt + Cmd + P",
//       "It is runed by Ctrl + Alt + P/ Opt + Cmd + P",
//     ],
//     correctAnswer: "C. Share a file",
//     point: 1,
//   },
//   {
//     id: 2,
//     question: 'Which planet is known as the "Red Planet"?',
//     options: ["Venus", "Mars", "Jupiter", "Mercury"],
//     correctAnswer: "Mars",
//     point: 1,
//     explanations: [
//       "Venus is known as the 'Morning Star', not the 'Red Planet'.",
//       "Correct! Mars is known as the 'Red Planet'.",
//       "Jupiter is the largest planet in our solar system, not the 'Red Planet'.",
//       "Mercury is the smallest planet in our solar system, not the 'Red Planet'.",
//     ],
//   },
//   {
//     id: 3,
//     question: "What is the chemical symbol for water?",
//     options: ["H2O", "CO2", "O2", "NaCl"],
//     correctAnswer: "H2O",
//     point: 1,
//     explanations: [
//       "H2O is the chemical symbol for water.",
//       "CO2 is the chemical symbol for carbon dioxide.",
//       "O2 is the chemical symbol for oxygen.",
//       "NaCl is the chemical symbol for sodium chloride (salt).",
//     ],
//   },
//   {
//     id: 4,
//     question: "What is the largest mammal on Earth?",
//     options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
//     correctAnswer: "Blue Whale",
//     point: 1,
//     explanations: [
//       "Elephants are large mammals, but they are not the largest.",
//       "Correct! Blue Whales are the largest mammals on Earth.",
//       "Giraffes are tall mammals, but they are not the largest.",
//       "Hippopotamuses are large mammals, but they are not the largest.",
//     ],
//   },
//   {
//     id: 5,
//     question: "Which scientist developed the theory of relativity?",
//     options: [
//       "Isaac Newton",
//       "Albert Einstein",
//       "Galileo Galilei",
//       "Marie Curie",
//     ],
//     correctAnswer: "Albert Einstein",
//     point: 1,
//     explanations: [
//       "Isaac Newton is known for his laws of motion and universal gravitation, not the theory of relativity.",
//       "Correct! Albert Einstein developed the theory of relativity.",
//       "Galileo Galilei made significant contributions to astronomy and physics, but he did not develop the theory of relativity.",
//       "Marie Curie was a pioneering physicist and chemist, but she did not develop the theory of relativity.",
//     ],
//   },
//   {
//     id: 6,
//     question: "What is the capital of Japan?",
//     options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
//     correctAnswer: "Tokyo",
//     point: 1,
//     explanations: [
//       "Beijing is the capital of China, not Japan.",
//       "Seoul is the capital of South Korea, not Japan.",
//       "Correct! Tokyo is the capital of Japan.",
//       "Bangkok is the capital of Thailand, not Japan.",
//     ],
//   },
//   {
//     id: 7,
//     question: "What is the chemical symbol for gold?",
//     options: ["Au", "Ag", "Fe", "Cu"],
//     correctAnswer: "Au",
//     point: 1,
//     explanations: [
//       "Correct! Au is the chemical symbol for gold.",
//       "Ag is the chemical symbol for silver, not gold.",
//       "Fe is the chemical symbol for iron, not gold.",
//       "Cu is the chemical symbol for copper, not gold.",
//     ],
//   },
//   {
//     id: 8,
//     question: 'Which planet is known as the "Red Planet"?',
//     options: ["Venus", "Mars", "Jupiter", "Mercury"],
//     correctAnswer: "Mars",
//     point: 1,
//     explanations: [
//       "Venus is known as the 'Morning Star', not the 'Red Planet'.",
//       "Correct! Mars is known as the 'Red Planet'.",
//       "Jupiter is the largest planet in our solar system, not the 'Red Planet'.",
//       "Mercury is the smallest planet in our solar system, not the 'Red Planet'.",
//     ],
//   },
//   {
//     id: 9,
//     question: "What is the chemical symbol for water?",
//     options: ["H2O", "CO2", "O2", "NaCl"],
//     correctAnswer: "H2O",
//     point: 1,
//     explanations: [
//       "H2O is the chemical symbol for water.",
//       "CO2 is the chemical symbol for carbon dioxide.",
//       "O2 is the chemical symbol for oxygen.",
//       "NaCl is the chemical symbol for sodium chloride (salt).",
//     ],
//   },
//   {
//     id: 10,
//     question: "What is the largest mammal on Earth?",
//     options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
//     correctAnswer: "Blue Whale",
//     point: 1,
//     explanations: [
//       "Elephants are large mammals, but they are not the largest.",
//       "Correct! Blue Whales are the largest mammals on Earth.",
//       "Giraffes are tall mammals, but they are not the largest.",
//       "Hippopotamuses are large mammals, but they are not the largest.",
//     ],
//   },
//   {
//     id: 11,
//     question: "Which scientist developed the theory of relativity?",
//     options: [
//       "Isaac Newton",
//       "Albert Einstein",
//       "Galileo Galilei",
//       "Marie Curie",
//     ],
//     correctAnswer: "Albert Einstein",
//     point: 1,
//     explanations: [
//       "Isaac Newton is known for his laws of motion and universal gravitation, not the theory of relativity.",
//       "Correct! Albert Einstein developed the theory of relativity.",
//       "Galileo Galilei made significant contributions to astronomy and physics, but he did not develop the theory of relativity.",
//       "Marie Curie was a pioneering physicist and chemist, but she did not develop the theory of relativity.",
//     ],
//   },
//   {
//     id: 12,
//     question: "What is the capital of Japan?",
//     options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
//     correctAnswer: "Tokyo",
//     point: 1,
//     explanations: [
//       "Beijing is the capital of China, not Japan.",
//       "Seoul is the capital of South Korea, not Japan.",
//       "Correct! Tokyo is the capital of Japan.",
//       "Bangkok is the capital of Thailand, not Japan.",
//     ],
//   },
//   {
//     id: 13,
//     question: "What is the chemical symbol for gold?",
//     options: ["Au", "Ag", "Fe", "Cu"],
//     correctAnswer: "Au",
//     point: 1,
//     explanations: [
//       "Correct! Au is the chemical symbol for gold.",
//       "Ag is the chemical symbol for silver, not gold.",
//       "Fe is the chemical symbol for iron, not gold.",
//       "Cu is the chemical symbol for copper, not gold.",
//     ],
//   },
//   {
//     id: 14,
//     question: "What is the capital of France?",
//     correctAnswer: "Paris",
//     point: 2,
//     explanations: "Correct! Paris is the capital of France.",
//   },
// ];

// let questions = [
//   {
//     id: 1,
//     questionText: "<p>question 2</p>",
//     options: [
//       {
//         answerFormula: "<p>1</p>",
//         feedback: "<p>1</p>",
//         answer: "wrong",
//       },
//       {
//         answerFormula: "<p>2</p>",
//         feedback: "<p>2</p>",
//         answer: "correct",
//       },
//     ],
//     explanations: [
//       "It is runed by Ctrl + Alt + P/ Opt + Cmd + P",
//       "It is runed by Ctrl + Alt + P/ Opt + Cmd + P",
//       "It is runed by Ctrl + Alt + P/ Opt + Cmd + P",
//       "It is runed by Ctrl + Alt + P/ Opt + Cmd + P",
//     ],
//     correctAnswer: "C. Share a file",
//     defaultMarks: 1,
//   },
// ];

const QuizTask = ({ taskData, count, setCount, chapter }) => {
  const { userInfo } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [congratulationOpen, setCongratulationOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [point, setPoint] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [givenAnswers, setGivenAnswers] = useState([]);
  const [participationData, setParticipationData] = useState({});

  console.log(taskData);

  const handleClickOpen = () => {
    setOpen(true);
    setPoint(0);
    setCurrentQuestion(0);
    setAnswered(0);
    setScore(0);
  };

  const handleClose = () => {
    setOpen(false);
    setCongratulationOpen(false);
    setReviewOpen(false);
    setCurrentQuestion(0);
    setAnswered(0);
    setScore(0);
  };

  useEffect(() => {
    if (taskData?.participants) {
      const findUser = taskData?.participants?.find(
        (item) => item?.participant?.email === userInfo?.email
      );
      if (findUser) {
        setGivenAnswers(findUser?.questions);
        setParticipationData(findUser);
      }
    }
  }, [taskData, userInfo]);
  console.log(participationData);

  const handleOptionChange = (option) => {
    setSelectedOption(option?.answerFormula);
    console.log(option);
    // if (e.target.value === questions[currentQuestion].correctAnswer) {
    //   if (
    //     !question[currentQuestion]?.givenAnswer ||
    //     question[currentQuestion]?.givenAnswer !==
    //       questions[currentQuestion].correctAnswer
    //   )
    //     setScore(score + 1);
    //   setPoint(point + question?.point);
    // }
    if (option?.answer === "correct") {
      if (
        !questions[currentQuestion]?.givenAnswer ||
        questions[currentQuestion]?.givenAnswer?.answer === "wrong"
      )
        setScore(score + 1);
      setPoint(point + +question?.defaultMarks);
    }
    if (option) {
      if (!questions[currentQuestion]?.givenAnswer) setAnswered(answered + 1);
      questions[currentQuestion] = {
        ...questions[currentQuestion],
        givenAnswer: option,
      };
      givenAnswers[currentQuestion] = {
        questionId: question?._id,
        givenAnswer: option,
      };
    }
  };

  const handleNextQuestion = () => {
    const myForm = document.getElementById("myForm");
    myForm.reset();
    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBackQuestion = () => {
    const myForm = document.getElementById("myForm");
    myForm.reset();
    setSelectedOption("");
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleJumpQuestion = (i) => {
    const myForm = document.getElementById("myForm");
    myForm.reset();
    console.log(questions);
    setSelectedOption("");
    setCurrentQuestion(i);
  };

  const handleSubmit = async () => {
    Loading();
    setOpen(false);
    localStorage.setItem("questionWithSelectedAns", JSON.stringify(questions));
    setAnswered(0);
    setCurrentQuestion(0);
    // setScore(0);
    if ((+taskData?.points * +taskData?.gradeToPass) / 100 > point) {
      const sendData = {
        participantChapter: {
          email: userInfo?.email,
          participantId: userInfo?._id,
          status: "In Progress",
          completionDateTime: new Date(),
        },
        participantTask: {
          participant: {
            email: userInfo?.email,
            participantId: userInfo?._id,
            status: "In Progress",
            completionDateTime: new Date(),
          },
          questions: givenAnswers,
          earnedPoint: point,
          correctlyAnswered: score,
          attempted: participationData?.attempted
            ? +participationData?.attempted + 1
            : 1,
        },
      };
      setParticipationData(sendData?.participantTask);
      const submitCompletion = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/Quiz/taskId/${taskData?._id}/chapterId/${taskData?.chapterId}`,
        sendData
      );
      setCount(count + 1);
      setCongratulationOpen(true);
    } else {
      const sendData = {
        participantChapter: {
          email: userInfo?.email,
          participantId: userInfo?._id,
          status: "Completed",
          completionDateTime: new Date(),
        },
        participantTask: {
          participant: {
            email: userInfo?.email,
            participantId: userInfo?._id,
            status: "Completed",
            completionDateTime: new Date(),
          },
          questions: givenAnswers,
          earnedPoint: point,
          correctlyAnswered: score,
          attempted: participationData?.attempted
            ? +participationData?.attempted + 1
            : 1,
        },
      };
      setParticipationData(sendData?.participantTask);
      const submitCompletion = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/Quiz/taskId/${taskData?._id}/chapterId/${taskData?.chapterId}`,
        sendData
      );
      setCount(count + 1);
      setCongratulationOpen(true);
    }
    Loading().close();
  };

  const question = questions[currentQuestion];
  const submittedQuestions = localStorage.getItem("questionWithSelectedAns");
  let submittedQuestion = null;

  if (submittedQuestions)
    submittedQuestion = JSON.parse(submittedQuestions)[currentQuestion];

  console.log(JSON.parse(submittedQuestions));

  if (userInfo.role !== "admin") {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  useEffect(() => {
    const findCourse = userInfo?.courses?.find(
      (item) => item?.courseId === chapter?.courseId
    );
    console.log(findCourse);
    if (findCourse?.batchId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/questionBank/quizId/${taskData?._id}/batchId/${findCourse?.batchId}`
        )
        .then((response) => {
          if (response?.data) setQuizQuestions(response?.data);
          console.log(response?.data);
        });
    }
  }, [chapter, taskData, userInfo, participationData]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="49"
          viewBox="0 0 26 49"
          fill="none"
        >
          <path
            d="M0.382812 48.7921V0.25H25.1492V48.7921H0.382812Z"
            fill="#BA8864"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="202"
          height="56"
          viewBox="0 0 202 56"
          fill="none"
        >
          <path
            d="M201.714 50.2889L3.51277 55.6087L16.8306 29.8516L0.808594 3.89223L189.553 0.934166L201.714 50.2889Z"
            fill="#4D2609"
          />
        </svg>
        <h1 className=" text-[20px] font-sans font-[600] mt-[-44px] text-white ">
          {taskData?.points} Points
        </h1>
      </div>
      <div className="px-4 pb-20">
        <h1 className="text-[30px] font-[600] mt-[70px] ">
          {taskData?.quizName}
        </h1>
        <div className="mt-[95px] flex items-center justify-between">
          <div className="">
            <h1 className="text-[20px] font-[500]">Submit your Quiz</h1>
            <p className="text-[18px] font-[400] text-[#6B6B6B]">
              Attempts:{" "}
              <span className="text-[#3E4DAC]">{taskData?.quizAttempts}</span>
            </p>
          </div>
          <div>
            <button
              onClick={handleClickOpen}
              className={`bg-[#3E4DAC] text-white w-[150px] h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
            >
              {participationData?.participant ? "Reattempt" : "Start Quiz"}
            </button>
          </div>
        </div>
        {participationData?.participant && (
          <>
            <hr className="my-[65px]" />
            <div className=" flex items-center justify-between">
              <div className=" flex flex-col justify-between h-full gap-[20px]">
                <h1 className="text-[20px] font-[500]">Results</h1>
                <p className="text-[18px] font-[400] text-[#6B6B6B]">
                  To Pass:{" "}
                  <span className="text-[#3E4DAC]">
                    {/* {(((+taskData?.points * +taskData?.gradeToPass) / 100 -
                      participationData?.earnedPoint) *
                      100) /
                      ((+taskData?.points * +taskData?.gradeToPass) / 100)} */}
                    {taskData?.gradeToPass}% or more
                  </span>
                </p>
              </div>
              <div className="w-[161px] flex-col justify-start items-center gap-[22.96px] inline-flex">
                <h1 className="text-zinc-800 text-lg font-semibold">
                  Your Points Earned
                </h1>
                <h1 className="text-amber-700 text-[26px] font-semibold">
                  {participationData?.earnedPoint} Points
                </h1>
              </div>
              {/* <div className="w-32 flex-col justify-start items-center gap-[22.96px] inline-flex">
                <h1 className="text-zinc-800 text-lg font-semibold">
                  Your Quiz Rank
                </h1>
                <h1 className="text-[#2F97B7] text-3xl font-semibold">2/20</h1>
              </div> */}

              <div>
                <button
                  onClick={() => setReviewOpen(true)}
                  className={`bg-[#FFDB70] text-black px-4 h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_8px_0px_0px_#F08323]`}
                >
                  Review Submission
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Review submission dialog start */}
      <Dialog
        fullScreen
        open={reviewOpen}
        setOpen={setReviewOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ backgroundColor: "#151718", position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <div className="text-center text-[21px] font-[600] w-full py-[20px] ">
              <h1 className="text-white">{taskData?.quizName}</h1>
              <p className="text-[#8595FF]">
                Quiz - {taskData?.points} Total points
              </p>
            </div>
          </Toolbar>
        </AppBar>
        <div>
          <div className=" max-w-[1262px] pt-[80px] mx-auto flex justify-between">
            <div className="w-[625px]">
              <h1 className="text-[#FF557A] text-center h-[50px] text-[22px] font-[700] ">
                Question {currentQuestion + 1}
              </h1>
              <div className="bg-[#FFFCDE] rounded-[8px] w-full px-[20px] py-[30px] relative">
                {showExplanation ? (
                  <>
                    <svg
                      className="absolute top-0 left-0"
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
                    <h1 className=" text-white text-[16px] font-[500] absolute top-[6px] left-0 w-[108px] text-center ">
                      {question?.defaultMarks} points
                    </h1>
                  </>
                ) : (
                  <>
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
                      {question?.defaultMarks} points
                    </h1>
                  </>
                )}

                <p
                  className=" text-[18px] font-[700] pt-4 "
                  dangerouslySetInnerHTML={{
                    __html: question?.questionText,
                  }}
                ></p>
                <form id="myForm" className="mt-[45px]">
                  {/* {!submittedQuestion?.options && (
                    <>
                      {!showExplanation ? (
                        <div>
                          <div className="flex items-center justify-between text-[20px] font-[500] text-[#3E4DAC] ">
                            <p>{submittedQuestion?.givenAnswer}</p>
                            <p>
                              {submittedQuestion?.givenAnswer ===
                              submittedQuestion?.correctAnswer ? (
                                <p className="text-[#17A914]">✅ Correct</p>
                              ) : (
                                <p className="text-[#EA1E1E]">❌ Incorrect</p>
                              )}
                            </p>
                          </div>
                          {submittedQuestion?.givenAnswer !==
                            submittedQuestion?.correctAnswer && (
                            <div className="flex items-center justify-between text-[20px] font-[500] text-[#3E4DAC] mt-5 ">
                              <p>{submittedQuestion?.correctAnswer}</p>
                              <p className="text-[#17A914]">✅ Correct</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center text-[20px] font-[500] text-[#3E4DAC] mt-5 ">
                            <p>{submittedQuestion?.givenAnswer}</p>
                            <p className="ml-[5px] text-[#FF557A]">
                              ( {submittedQuestion?.explanations} )
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )} */}
                  {question?.options &&
                    question?.options?.map((option, index) => (
                      <div key={index}>
                        <label className="flex items-center mb-[15px] text-[#3E4DAC] text-[15px] font-[600] ">
                          <input
                            className="form-radio mr-[15px] h-6 w-6  border rounded-full border-gray-400"
                            type="radio"
                            value={option}
                            checked={
                              givenAnswers?.find(
                                (item) => item?.questionId === question?._id
                              )?.givenAnswer?.answerFormula ===
                              option?.answerFormula
                            }
                          />
                          <div className="flex items-center justify-between w-full">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: option?.answerFormula,
                              }}
                            ></p>
                            <p
                              className={`flex items-center ${
                                !showExplanation && "justify-between"
                              }  `}
                            >
                              {/* {option}{" "} */}
                              {showExplanation ? (
                                <>
                                  {/* {question?.explanations && (
                                    <p className=" ml-[5px] text-[#FF557A] ">
                                      ( {submittedQuestion?.explanations[index]} )
                                    </p>
                                  )} */}
                                  {option?.feedback && (
                                    <p
                                      className=" ml-[5px] text-[#FF557A] "
                                      dangerouslySetInnerHTML={{
                                        __html: option?.feedback,
                                      }}
                                    ></p>
                                  )}
                                </>
                              ) : (
                                <p>
                                  {givenAnswers?.find(
                                    (item) => item?.questionId === question?._id
                                  )?.givenAnswer?.answerFormula ===
                                    option?.answerFormula &&
                                    option?.answer === "correct" && (
                                      <p className="text-[#17A914]">
                                        ✅ Correct
                                      </p>
                                    )}
                                  {givenAnswers?.find(
                                    (item) => item?.questionId === question?._id
                                  )?.givenAnswer?.answerFormula ===
                                    option?.answerFormula &&
                                    option?.answer !== "correct" && (
                                      <p className="text-[#EA1E1E]">
                                        ❌ Incorrect
                                      </p>
                                    )}
                                  {givenAnswers?.find(
                                    (item) => item?.questionId === question?._id
                                  )?.givenAnswer?.answerFormula !==
                                    option?.answerFormula &&
                                    option?.answer === "correct" && (
                                      <p className="text-[#17A914]">
                                        ✅ Correct
                                      </p>
                                    )}
                                </p>
                              )}
                            </p>
                          </div>
                        </label>
                      </div>
                    ))}
                </form>
                <div className="flex items-center justify-between mt-[40px]">
                  <div>
                    {!showExplanation && (
                      <button
                        onClick={() => {
                          setShowExplanation(true);
                        }}
                        className={`bg-[#282828] text-white px-[21px] py-[14px] text-[12px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#FF557A] flex items-center gap-[7px]`}
                      >
                        Show Explanation
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-[30px]">
                    {showExplanation ? (
                      <button
                        onClick={() => {
                          setShowExplanation(false);
                        }}
                        className={`bg-[#282828] text-white px-[21px] py-[14px] text-[12px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#FF557A] flex items-center gap-[7px]`}
                      >
                        Back to problem
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            if (currentQuestion > 0) handleBackQuestion();
                          }}
                          className={`bg-[#FF557A] ${
                            currentQuestion === 0 && "opacity-[0.5]"
                          }  text-white px-[21px] py-[14px] text-[12px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#F08323] flex items-center gap-[7px]`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M8.58594 4.10726L5.41984 7.27335L8.58594 10.4395"
                              stroke="white"
                              stroke-width="0.903057"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Back
                        </button>
                        <button
                          onClick={() => {
                            if (currentQuestion < questions?.length - 1)
                              handleNextQuestion();
                          }}
                          className={`bg-[#FFDB70] ${
                            currentQuestion === questions?.length - 1 &&
                            "opacity-[0.5]"
                          } text-black px-[21px] py-[14px] text-[12px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#F08323] flex items-center gap-[7px]`}
                        >
                          Next
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M5.1875 10.4416L8.3536 7.27547L5.1875 4.10938"
                              stroke="#282828"
                              stroke-width="1.04683"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[500px]">
              <div className="bg-[#ECF4F7] rounded-[8px] mt-[50px]">
                <h1 className=" text-[#282828] text-[18px] font-[700] text-center py-[30px] ">
                  Question Bank
                </h1>
                <div className="grid grid-cols-8 px-[20px] pb-[20px]">
                  {questions?.map((question, index) => (
                    <div className="flex">
                      <button
                        onClick={() => handleJumpQuestion(index)}
                        className={`${
                          currentQuestion === index
                            ? "bg-[#001246] text-white"
                            : "bg-white text-black"
                        } min-w-[45px] flex items-center justify-center text-[16px] font-[600] rounded-full py-[10px] mb-[28px]`}
                      >
                        {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      {/* Review submission dialog end */}
      {/* Start quiz dialog start */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ backgroundColor: "#151718", position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <div className="text-center text-[21px] font-[600] w-full py-[20px] ">
              <h1 className="text-white">{taskData?.quizName}</h1>
              <p className="text-[#8595FF]">
                Quiz - {taskData?.points} Total points
              </p>
            </div>
          </Toolbar>
        </AppBar>
        <div>
          <div className=" max-w-[1262px] pt-[80px] mx-auto flex justify-between">
            <div className="w-[625px]">
              <h1 className="text-[#FF557A] text-center h-[50px] text-[22px] font-[700] ">
                Question {currentQuestion + 1}
              </h1>
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
                  {question?.defaultMarks} points
                </h1>
                <p
                  className=" text-[18px] font-[700] pt-4 "
                  dangerouslySetInnerHTML={{
                    __html: question?.questionText,
                  }}
                ></p>
                <form id="myForm" className="mt-[45px]">
                  {!question?.options && (
                    <input
                      defaultValue={question?.givenAnswer}
                      // onChange={(e) => setSelectedOption(e.target.value)}
                      onChange={handleOptionChange}
                      className="w-[435px] p-[24px] text-[20px] font-[500] rounded-[8px] border-[#323232] border-2 bg-transparent "
                      placeholder="Write Here"
                      type="text"
                    />
                  )}
                  {question?.options &&
                    question?.options?.map((option, index) => (
                      <div key={index}>
                        <label className="flex items-center mb-[15px] text-[#3E4DAC] text-[15px] font-[600] ">
                          <input
                            className="form-radio mr-[15px] h-6 w-6  border rounded-full border-gray-400"
                            // className="w-[22px]"
                            type="radio"
                            value={option?.answerFormula}
                            // checked={
                            //   selectedOption === option ||
                            //   question?.givenAnswer === option
                            // }
                            checked={
                              selectedOption
                                ? selectedOption === option?.answerFormula
                                : question?.givenAnswer === option
                            }
                            // checked={question?.givenAnswer === option}
                            onChange={(e) => handleOptionChange(option)}
                          />
                          {/* {option} */}
                          <p
                            dangerouslySetInnerHTML={{
                              __html: option?.answerFormula,
                            }}
                          ></p>
                        </label>
                      </div>
                    ))}
                </form>
                <div className="flex items-center justify-between mt-[40px]">
                  <div>
                    <button
                      onClick={() => {
                        handleSubmit();
                      }}
                      className={`bg-[#3E4DAC] ${
                        answered === questions?.length ? "block" : "hidden"
                      }  text-white px-[21px] py-[14px] text-[12px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#FF557A] flex items-center gap-[7px]`}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="flex items-center gap-[30px]">
                    <button
                      onClick={() => {
                        if (currentQuestion > 0) handleBackQuestion();
                      }}
                      className={`bg-[#FF557A] ${
                        currentQuestion === 0 && "opacity-[0.5]"
                      }  text-white px-[21px] py-[14px] text-[12px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#F08323] flex items-center gap-[7px]`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M8.58594 4.10726L5.41984 7.27335L8.58594 10.4395"
                          stroke="white"
                          stroke-width="0.903057"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Back
                    </button>
                    <button
                      onClick={() => {
                        if (currentQuestion < questions?.length - 1)
                          handleNextQuestion();
                      }}
                      className={`bg-[#FFDB70] ${
                        currentQuestion === questions?.length - 1 &&
                        "opacity-[0.5]"
                      } text-black px-[21px] py-[14px] text-[12px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#F08323] flex items-center gap-[7px]`}
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M5.1875 10.4416L8.3536 7.27547L5.1875 4.10938"
                          stroke="#282828"
                          stroke-width="1.04683"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[500px]">
              <div className="bg-[#ECF4F7] rounded-[8px] mt-[50px]">
                <h1 className=" text-[#282828] text-[18px] font-[700] text-center py-[30px] ">
                  Question Bank
                </h1>
                <div className="grid grid-cols-8 px-[20px] pb-[20px]">
                  {questions?.map((question, index) => (
                    <div className="flex">
                      <button
                        onClick={() => handleJumpQuestion(index)}
                        className={`${
                          currentQuestion === index
                            ? "bg-[#001246] text-white"
                            : "bg-white text-black"
                        } min-w-[45px] flex items-center justify-center text-[16px] font-[600] rounded-full py-[10px] mb-[28px]`}
                      >
                        {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      {/* Start quiz dialog end */}
      {/* Congratulation dialog start */}
      <Dialog
        fullScreen
        open={congratulationOpen}
        setOpen={setCongratulationOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ backgroundColor: "#151718", position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <div className="text-center text-[21px] font-[600] w-full py-[20px] ">
              <h1 className="text-white">{taskData?.quizName}</h1>
              <p className="text-[#8595FF]">
                Quiz - {taskData?.points} Total points
              </p>
            </div>
          </Toolbar>
        </AppBar>
        <div>
          <div className=" max-w-[1023px] pt-[80px] mx-auto flex justify-between">
            <img
              className="w-auto h-fit mt-[100px]"
              src={CongratulationsLeft}
              alt="CongratulationsLeft"
            />
            <div className="flex flex-col items-center bg-[#0E0534] p-[32px] w-[520px] rounded-[11px] ">
              <h1 className=" text-[#FFDB70] text-[28px] font-[700] text-center mb-[32px] ">
                Congratulations
              </h1>
              <img src={CongratulationsBatch} alt="CongratulationsBatch" />
              <div className="text-white text-center mt-[22px] text-[20px] font-[700]">
                <p>You answered</p>
                <p>
                  <span className="text-[#21D63E]">
                    {score} out of {questions?.length}
                  </span>{" "}
                  questions correctly.{" "}
                </p>
              </div>
              <div className="w-[453.97px] h-[122.47px] bg-yellow-50 rounded-[9.21px] flex items-center justify-between py-[30px] px-[40px] mt-[45px] bg-[#FFFCE0]">
                <div className="mx-auto">
                  <div className=" flex-col justify-start items-center  inline-flex">
                    <h1 className="text-zinc-800 text-[16.90px] font-semibold">
                      Your Points Earned
                    </h1>
                    <h1 className="text-rose-400 text-[25.52px] font-semibold">
                      {point} Points
                    </h1>
                  </div>
                </div>
                {/* <div className="bg-[#D6D6D6] w-[1px] h-[56.56px]"></div>
                <div>
                  <div className=" flex-col justify-start items-center inline-flex">
                    <h1 className="text-zinc-800 text-[16.90px] font-semibold">
                      Your Quiz Rank
                    </h1>
                    <h1 className="text-[#2F97B7] text-3xl font-semibold">
                      2/20
                    </h1>
                  </div>
                </div> */}
              </div>
              <button
                onClick={() => setReviewOpen(true)}
                className={`bg-[#FFDB70] text-black px-[21px] py-[14px] text-[16px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#F08323] flex items-center gap-[7px] mt-[50px] mb-[20px]`}
              >
                Review Submission
              </button>
            </div>
            <img
              className="w-auto h-fit mt-[100px]"
              src={CongratulationsRight}
              alt="CongratulationsRight"
            />
          </div>
        </div>
      </Dialog>
      {/* Congratulation dialog end */}
    </div>
  );
};

export default QuizTask;
