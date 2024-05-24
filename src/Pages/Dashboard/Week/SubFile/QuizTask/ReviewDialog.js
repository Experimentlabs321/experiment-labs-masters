import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ReviewDialog = ({
  reviewOpen,
  setReviewOpen,
  handleClose,
  Transition,
  taskData,
  question,
  currentQuestion,
  showExplanation,
  setShowExplanation,
  selectedOption,
  selectedOptions,
  givenAnswers,
  handleBackQuestion,
  handleNextQuestion,
  handleJumpQuestion,
  questions,
}) => {
  return (
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

              {question?.additionalFiles && (
                <img
                  className="max-w-full"
                  src={question?.additionalFiles}
                  alt="Additional File"
                />
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
                          disabled
                          type={
                            question?.oneOrMultipleOption !== "multiple"
                              ? "radio"
                              : "checkbox"
                          }
                          className=" mr-[15px] h-6 w-6 border rounded-full border-blue"
                          value={option?.answerFormula}
                          checked={
                            question?.oneOrMultipleOption !== "multiple"
                              ? selectedOption === option?.answerFormula
                              : selectedOptions?.find(
                                  (item) => item === option?.answerFormula
                                )
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
                            {showExplanation ? (
                              <>
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
                                    <p className="text-[#17A914]">✅ Correct</p>
                                  )}

                                {question?.oneOrMultipleOption === "multiple" &&
                                  selectedOptions?.find(
                                    (item) => item === option?.answerFormula
                                  ) &&
                                  option?.answer !== "correct" && (
                                    <p className="text-[#EA1E1E]">
                                      ❌ Incorrect
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
                                    <p className="text-[#17A914]">✅ Correct</p>
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
  );
};

export default ReviewDialog;
