import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import DialogLayoutForFromControl from "../../../Shared/DialogLayoutForFromControl";
import Loading from "../../../../Shared/Loading/Loading";

const Quiz = ({
  taskData,
  questions,
  setOpenQuiz,
  openQuiz,
  setCompletionStatus,
  count,
  setCount,
}) => {
  const { user, userInfo } = useContext(AuthContext);
  const [openTask, setOpenTask] = useState(
    JSON.parse(localStorage.getItem("task"))
  );
  const [allQuestions, setAllQuestions] = useState(
    questions ? [...questions] : null
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [point, setPoint] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [question, setQuestion] = useState(
    questions ? allQuestions[currentQuestion] : null
  );

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    const correctAnswer = allQuestions[currentQuestion]?.options.find(
      (item) => item?.status === "Right"
    ).option;
    if (e.target.value === correctAnswer) {
      if (
        !allQuestions[currentQuestion]?.givenAnswer ||
        question[currentQuestion]?.givenAnswer !== correctAnswer
      ) {
        setScore(score + 1);
        setPoint(point + question?.defaultMarks);
      }
    } else {
      if (
        allQuestions[currentQuestion]?.givenAnswer &&
        allQuestions[currentQuestion]?.givenAnswer === correctAnswer
      ) {
        setScore(score - 1);
        setPoint(point - question?.defaultMarks);
      }
    }
    if (e.target.value) {
      if (!allQuestions[currentQuestion]?.givenAnswer)
        setAnswered(answered + 1);
      allQuestions[currentQuestion] = {
        ...allQuestions[currentQuestion],
        givenAnswer: e.target.value,
      };
    }
    // console.log(score, point);
  };

  const handleNextQuestion = () => {
    const myForm = document.getElementById("myForm");
    myForm.reset();
    setSelectedOption("");
    setQuestion(allQuestions[currentQuestion + 1]);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBackQuestion = () => {
    const myForm = document.getElementById("myForm");
    myForm.reset();
    setSelectedOption("");
    setQuestion(allQuestions[currentQuestion - 1]);
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = async () => {
    // console.log(openTask?.taskType, taskData?._id, taskData?.chapterId);
    Loading();
    if (point >= taskData?.completionParameter?.passMarks) {
      setOpenQuiz(false);
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
          questions: allQuestions,
        },
      };
      const submitCompletion = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/${openTask?.taskType}/taskId/${taskData?._id}/chapterId/${taskData?.chapterId}`,
        sendData
      );
      Loading().close();
      // setCompletionStatus(true);
      if (submitCompletion?.data?.acknowledged) {
        setCount(count + 1);
        setCompletionStatus(true);
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: "You have completed successfully!",
        });
        // navigate(-1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Some thing wrong happen please try again later!",
        });
      }
    } else {
      setOpenQuiz(false);
      Loading().close();
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please learn again and try again!",
      });
    }
    // localStorage.setItem("questionWithSelectedAns", JSON.stringify(questions));
    // setAnswered(0);
    // setCurrentQuestion(0);
    // console.log(point, score);
    // setScore(0);
    // setCongratulationOpen(true);
  };
  return (
    <div>
      <DialogLayoutForFromControl
        open={openQuiz}
        setOpen={setOpenQuiz}
        width={650}
      >
        <div className="max-w-[650px] w-full py-10 mx-auto">
          <h1 className="text-[#FF557A] text-center h-[50px] text-[22px] font-[700] ">
            Question {question.questionNo}
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
            <div
              className="text-[18px] font-[700] textEditor"
              dangerouslySetInnerHTML={{ __html: question?.questionTitle }}
            />
            {/* <p className=" text-[18px] font-[700] pt-4 ">
            {question?.questionTitle}
          </p> */}
            <form id="myForm" className="mt-5">
              {/* {!question?.options && (
                <input
                  defaultValue={question?.givenAnswer}
                  // onChange={(e) => setSelectedOption(e.target.value)}
                  onChange={handleOptionChange}
                  className="w-[435px] p-[24px] text-[20px] font-[500] rounded-[8px] border-[#323232] border-2 bg-transparent "
                  placeholder="Write Here"
                  type="text"
                />
              )} */}
              {question?.options &&
                question?.options?.map((option, index) => (
                  <div key={index}>
                    <label className="flex items-center mb-[15px] text-[#3E4DAC] text-[15px] font-[600] ">
                      <input
                        className="form-radio mr-[15px] h-6 w-6  border rounded-full border-gray-400"
                        // className="w-[22px]"
                        type="radio"
                        value={option?.option}
                        // checked={
                        //   selectedOption === option ||
                        //   question?.givenAnswer === option
                        // }
                        checked={
                          selectedOption
                            ? selectedOption === option?.option
                            : question?.givenAnswer === option?.option
                        }
                        // checked={question?.givenAnswer === option}
                        onChange={(e) => {
                          // setSelectedOption(option?.option);
                          handleOptionChange(e);
                        }}
                        // onChange={() => {
                        //   setSelectedOption(option?.option);
                        //   // selectedOption = option?.option;
                        //   console.log(selectedOption);
                        // }}
                      />
                      {option?.option}
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
                    currentQuestion === questions?.length - 1 && "opacity-[0.5]"
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
      </DialogLayoutForFromControl>
    </div>
  );
};

export default Quiz;
