import React from "react";

const QuizMain = ({
  taskData,
  participationData,
  questions,
  currentQuestion,
  handleClickOpen,
  setReviewOpen,
  setGivenAnswers,
  setSelectedOption,
  setSelectedOptions,
}) => {
  const renderResultSection = () => {
    if (!participationData?.participant) return null;

    return (
      <>
        <hr className="my-[65px]" />
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-between h-full gap-[20px]">
            <h1 className="text-[20px] font-[500]">Results</h1>
            <p className="text-[18px] font-[400] text-[#6B6B6B]">
              To Pass:{" "}
              <span className="text-[#3E4DAC]">
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
          <div>
            <button
              onClick={handleReviewSubmission}
              className="bg-[#FFDB70] text-black px-4 h-[50px] text-[16px] font-[600] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_8px_0px_0px_#F08323]"
            >
              Review Submission
            </button>
          </div>
        </div>
      </>
    );
  };

  const handleReviewSubmission = () => {
    setReviewOpen(true);
    setGivenAnswers(participationData?.questions);

    if (questions[currentQuestion]?.questionType === "Multiple choice") {
      const findGivenAns = participationData?.questions?.find(
        (item) => item?.questionId === questions[currentQuestion]?._id
      );
      if (findGivenAns) {
        if (questions[currentQuestion]?.oneOrMultipleOption === "one") {
          setSelectedOption(findGivenAns?.givenAnswer?.answerFormula);
        } else {
          let selectedAns = [];
          findGivenAns?.givenAnswer?.forEach((element) => {
            selectedAns.push(element?.answerFormula);
          });
          setSelectedOptions(selectedAns);
        }
      }
    }
  };

  return (
    <div className="">
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
        <p
          className=" pt-2 "
          dangerouslySetInnerHTML={{
            __html: taskData?.quizDescription,
          }}
        ></p>
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
        {renderResultSection()}
      </div>
    </div>
  );
};

export default QuizMain;
