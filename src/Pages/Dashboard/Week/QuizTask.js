import React, { useContext, useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import QuizMain from "./SubFile/QuizTask/QuizMain";
import ReviewDialog from "./SubFile/QuizTask/ReviewDialog";
import StartQuizDialog from "./SubFile/QuizTask/StartQuizDialog";
import CongratulationDialog from "./SubFile/QuizTask/CongratulationDialog";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuizTask = ({ taskData, count, setCount, chapter }) => {
  const { userInfo } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [congratulationOpen, setCongratulationOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
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
    setGivenAnswers([]);
  };

  const handleClose = () => {
    setOpen(false);
    setCongratulationOpen(false);
    setReviewOpen(false);
    setCurrentQuestion(0);
    setAnswered(0);
    setScore(0);
    setGivenAnswers([]);
  };

  useEffect(() => {
    if (taskData?.participants) {
      const findUser = taskData?.participants?.find(
        (item) => item?.participant?.email === userInfo?.email
      );
      if (findUser) {
        // setGivenAnswers(findUser?.questions);
        setParticipationData(findUser);
      }
    }
  }, [taskData, userInfo]);

  const handleOptionChange = (option) => {
    setSelectedOption(option?.answerFormula);
    console.log(option);
    if (option?.answer === "correct") {
      if (
        !questions[currentQuestion]?.givenAnswer ||
        questions[currentQuestion]?.givenAnswer?.answer === "wrong"
      ) {
        setScore(score + 1);
        setPoint(point + +question?.defaultMarks);
      }
    } else {
      if (questions[currentQuestion]?.givenAnswer?.answer === "correct") {
        setScore(score - 1);
        setPoint(point - +question?.defaultMarks);
      }
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

  const handleMultipleOptionChange = (e, option) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add the selected option to the array of selected options
      setSelectedOptions([...selectedOptions, option?.answerFormula]);

      // If this is the first answer selected for the current question, increment 'answered' count
      if (!questions[currentQuestion]?.givenAnswer) {
        setAnswered(answered + 1);
      }

      // Update given answers with the selected answer
      questions[currentQuestion] = {
        ...questions[currentQuestion],
        givenAnswer: [
          ...(questions[currentQuestion]?.givenAnswer || []),
          option,
        ],
      };
      givenAnswers[currentQuestion] = {
        questionId: question?._id,
        givenAnswer: [
          ...(givenAnswers[currentQuestion]?.givenAnswer || []),
          option,
        ],
      };

      // Calculate score and points
      const isCorrectAnswer = option?.answer === "correct";
      const totalCorrectAnswers = questions[currentQuestion]?.options?.filter(
        (opt) => opt.answer === "correct"
      )?.length;
      const partialPoints = +question?.defaultMarks / totalCorrectAnswers;

      if (isCorrectAnswer) {
        // Increment score for each correct answer

        const selectedCorrectAnswers = [
          ...selectedOptions,
          option?.answerFormula,
        ].filter(
          (opt) =>
            questions[currentQuestion]?.options?.find(
              (o) => o.answerFormula === opt
            )?.answer === "correct"
        )?.length;

        const prevCorrectAnswers = selectedOptions?.filter(
          (opt) =>
            questions[currentQuestion]?.options?.find(
              (o) => o.answerFormula === opt
            )?.answer === "correct"
        )?.length;

        console.log(
          selectedCorrectAnswers,
          totalCorrectAnswers,
          prevCorrectAnswers
        );

        if (selectedOptions?.length + 1 <= totalCorrectAnswers) {
          if (selectedCorrectAnswers === totalCorrectAnswers) {
            // If the user selects all correct answers, assign full points
            setScore(score + 1);
            setPoint(
              point +
                +question?.defaultMarks -
                prevCorrectAnswers * partialPoints
            );
          } else {
            // Calculate partial points if the user selects only some of the correct answers
            const totalPoints = selectedCorrectAnswers * partialPoints;
            setPoint(point + totalPoints - prevCorrectAnswers * partialPoints);
          }
        } else {
          if (selectedOptions?.length + 1 === totalCorrectAnswers + 1) {
            setPoint(point - prevCorrectAnswers * partialPoints);
          }
        }
      } else {
        const prevCorrectAnswers = selectedOptions?.filter(
          (opt) =>
            questions[currentQuestion]?.options?.find(
              (o) => o.answerFormula === opt
            )?.answer === "correct"
        )?.length;
        if (
          prevCorrectAnswers === totalCorrectAnswers &&
          selectedOptions?.length === totalCorrectAnswers
        ) {
          setScore(score - 1);
          setPoint(point - +question?.defaultMarks);
        }
        if (
          // selectedOptions?.length + 1 > totalCorrectAnswers &&
          selectedOptions?.length === totalCorrectAnswers
        ) {
          setPoint(point - prevCorrectAnswers * partialPoints);
        }
      }
    } else {
      // Remove the unchecked answer from the array of selected options
      const presentSelectedOptions = selectedOptions?.filter(
        (item) => item !== option?.answerFormula
      );
      const prevSelectedOptions = selectedOptions;
      setSelectedOptions(presentSelectedOptions);

      // Remove the unchecked answer from given answers
      questions[currentQuestion] = {
        ...questions[currentQuestion],
        givenAnswer: questions[currentQuestion]?.givenAnswer?.filter(
          (item) => item !== option
        ),
      };
      givenAnswers[currentQuestion] = {
        questionId: question?._id,
        givenAnswer: givenAnswers[currentQuestion]?.givenAnswer?.filter(
          (item) => item !== option
        ),
      };

      // Decrement score if the unchecked option was a correct answer
      if (option?.answer === "correct") {
        const totalCorrectAnswers = questions[currentQuestion]?.options?.filter(
          (opt) => opt.answer === "correct"
        )?.length;
        const partialPoints = +question?.defaultMarks / totalCorrectAnswers;
        const selectedCorrectAnswers = presentSelectedOptions.filter(
          (opt) =>
            questions[currentQuestion]?.options?.find(
              (o) => o.answerFormula === opt
            )?.answer === "correct"
        )?.length;
        const prevCorrectAnswers = prevSelectedOptions.filter(
          (opt) =>
            questions[currentQuestion]?.options?.find(
              (o) => o.answerFormula === opt
            )?.answer === "correct"
        )?.length;

        if (presentSelectedOptions?.length <= totalCorrectAnswers) {
          if (
            prevCorrectAnswers === totalCorrectAnswers &&
            prevSelectedOptions?.length === totalCorrectAnswers
          ) {
            setScore(score - 1);
            setPoint(point - partialPoints);
          } else if (prevCorrectAnswers < totalCorrectAnswers) {
            setPoint(point - partialPoints);
          } else {
            setPoint(point + partialPoints * selectedCorrectAnswers);
          }
        }
      } else {
        const totalCorrectAnswers = questions[currentQuestion]?.options?.filter(
          (opt) => opt.answer === "correct"
        )?.length;
        const partialPoints = +question?.defaultMarks / totalCorrectAnswers;
        const selectedCorrectAnswers = presentSelectedOptions.filter(
          (opt) =>
            questions[currentQuestion]?.options?.find(
              (o) => o.answerFormula === opt
            )?.answer === "correct"
        )?.length;
        if (presentSelectedOptions?.length <= totalCorrectAnswers) {
          if (selectedCorrectAnswers === totalCorrectAnswers) {
            // If the user selects all correct answers, assign full points
            setScore(score + 1);
            setPoint(point + +question?.defaultMarks);
          } else {
            // Calculate partial points if the user selects only some of the correct answers
            if (presentSelectedOptions?.length === totalCorrectAnswers) {
              const totalPoints = selectedCorrectAnswers * partialPoints;
              setPoint(point + totalPoints);
            }
          }
        }
      }
    }
  };
  console.log("point ==>", point, "score ==>", score);

  const handleNextQuestion = () => {
    const myForm = document.getElementById("myForm");
    myForm.reset();
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption("");
    setSelectedOptions([]);
    if (questions[currentQuestion + 1]?.questionType === "Multiple choice") {
      const findGivenAns = givenAnswers?.find(
        (item) => item?.questionId === questions[currentQuestion + 1]?._id
      );
      console.log(findGivenAns);
      if (questions[currentQuestion + 1]?.oneOrMultipleOption === "one") {
        if (findGivenAns)
          setSelectedOption(findGivenAns?.givenAnswer?.answerFormula);
      } else {
        if (findGivenAns) {
          let selectedAns = [];
          findGivenAns?.givenAnswer?.forEach((element) => {
            selectedAns.push(element?.answerFormula);
          });
          setSelectedOptions(selectedAns);
        }
      }
    }
  };

  const handleBackQuestion = () => {
    const myForm = document.getElementById("myForm");
    myForm.reset();
    setCurrentQuestion(currentQuestion - 1);
    setSelectedOption("");
    setSelectedOptions([]);
    if (questions[currentQuestion - 1]?.questionType === "Multiple choice") {
      const findGivenAns = givenAnswers?.find(
        (item) => item?.questionId === questions[currentQuestion - 1]?._id
      );
      console.log(findGivenAns);
      if (questions[currentQuestion - 1]?.oneOrMultipleOption === "one") {
        if (findGivenAns)
          setSelectedOption(findGivenAns?.givenAnswer?.answerFormula);
      } else {
        if (findGivenAns) {
          let selectedAns = [];
          findGivenAns?.givenAnswer?.forEach((element) => {
            selectedAns.push(element?.answerFormula);
          });
          setSelectedOptions(selectedAns);
        }
      }
    }
  };

  const handleJumpQuestion = (i) => {
    const myForm = document.getElementById("myForm");
    myForm.reset();
    console.log(questions);
    setCurrentQuestion(i);
    setSelectedOption("");
    setSelectedOptions([]);

    if (questions[i]?.questionType === "Multiple choice") {
      const findGivenAns = givenAnswers?.find(
        (item) => item?.questionId === questions[i]?._id
      );
      console.log(findGivenAns);
      if (questions[i]?.oneOrMultipleOption === "one") {
        if (findGivenAns)
          setSelectedOption(findGivenAns?.givenAnswer?.answerFormula);
      } else {
        if (findGivenAns) {
          let selectedAns = [];
          findGivenAns?.givenAnswer?.forEach((element) => {
            selectedAns.push(element?.answerFormula);
          });
          setSelectedOptions(selectedAns);
        }
      }
    }
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

  if (userInfo.role !== "admin") {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  useEffect(() => {
    try {
      const findCourse = userInfo?.courses?.find(
        (item) => item?.courseId === chapter?.courseId
      );
      console.log(findCourse);
      if (findCourse?.batchId && taskData?.questions?.length > 0) {
        axios
          .get(
            `${process.env.REACT_APP_SERVER_API}/api/v1/questionBank/quizId/${taskData?._id}/batchId/${findCourse?.batchId}`
            // `http://localhost:5000/api/v1/questionBank/quizId/${taskData?._id}/batchId/${findCourse?.batchId}`
          )
          .then((response) => {
            if (response?.data) setQuizQuestions(response?.data);
            console.log(response?.data);
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [chapter, taskData, userInfo, participationData]);

  console.log(taskData);

  return (
    <div>
      <QuizMain
        taskData={taskData}
        participationData={participationData}
        questions={questions}
        currentQuestion={currentQuestion}
        handleClickOpen={handleClickOpen}
        setReviewOpen={setReviewOpen}
        setGivenAnswers={setGivenAnswers}
        setSelectedOption={setSelectedOption}
        setSelectedOptions={setSelectedOptions}
      />
      {/* Review submission dialog start */}
      <ReviewDialog
        reviewOpen={reviewOpen}
        setReviewOpen={setReviewOpen}
        handleClose={handleClose}
        Transition={Transition}
        taskData={taskData}
        question={question}
        currentQuestion={currentQuestion}
        showExplanation={showExplanation}
        setShowExplanation={setShowExplanation}
        selectedOption={selectedOption}
        selectedOptions={selectedOptions}
        givenAnswers={givenAnswers}
        handleBackQuestion={handleBackQuestion}
        handleNextQuestion={handleNextQuestion}
        handleJumpQuestion={handleJumpQuestion}
        questions={questions}
      />
      {/* Review submission dialog end */}
      {/* Start quiz dialog start */}
      <StartQuizDialog
        open={open}
        taskData={taskData}
        Transition={Transition}
        currentQuestion={currentQuestion}
        question={question}
        selectedOption={selectedOption}
        selectedOptions={selectedOptions}
        questions={questions}
        answered={answered}
        handleOptionChange={handleOptionChange}
        handleMultipleOptionChange={handleMultipleOptionChange}
        handleBackQuestion={handleBackQuestion}
        handleNextQuestion={handleNextQuestion}
        handleJumpQuestion={handleJumpQuestion}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
      {/* Start quiz dialog end */}
      {/* Congratulation dialog start */}
      <CongratulationDialog
        congratulationOpen={congratulationOpen}
        setCongratulationOpen={setCongratulationOpen}
        taskData={taskData}
        setReviewOpen={setReviewOpen}
        setGivenAnswers={setGivenAnswers}
        setSelectedOption={setSelectedOption}
        setSelectedOptions={setSelectedOptions}
        questions={questions}
        participationData={participationData}
        currentQuestion={currentQuestion}
        score={score}
        point={point}
        Transition={Transition}
        handleClose={handleClose}
      />
      {/* Congratulation dialog end */}
    </div>
  );
};

export default QuizTask;
