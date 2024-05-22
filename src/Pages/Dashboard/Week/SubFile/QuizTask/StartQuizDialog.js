import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const StartQuizDialog = ({
  open,
  taskData,
  Transition,
  currentQuestion,
  question,
  selectedOption,
  selectedOptions,
  questions,
  answered,
  handleOptionChange,
  handleMultipleOptionChange,
  handleBackQuestion,
  handleNextQuestion,
  handleJumpQuestion,
  handleSubmit,
  handleClose,
}) => {
  return (
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
            <h1 className="text-white font-sans">{taskData?.quizName}</h1>
            <p className="text-[#8595FF] font-sans">
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
              {question?.questionType === "Multiple choice" && (
                <>
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
                    {!question?.options && (
                      <input
                        defaultValue={question?.givenAnswer}
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
                              type={
                                question?.oneOrMultipleOption !== "multiple"
                                  ? "radio"
                                  : "checkbox"
                              }
                              className=" mr-[15px] h-6 w-6 border rounded-full border-blue"
                              value={option?.answerFormula}
                              checked={
                                question?.oneOrMultipleOption !== "multiple"
                                  ? selectedOption
                                    ? selectedOption === option?.answerFormula
                                    : question?.givenAnswer === option
                                  : selectedOptions?.length > 0
                                  ? selectedOptions?.find(
                                      (item) => item === option?.answerFormula
                                    )
                                  : question?.givenAnswer?.find(
                                      (item) => item === option
                                    )
                              }
                              onChange={(e) => {
                                if (
                                  question?.oneOrMultipleOption !== "multiple"
                                )
                                  handleOptionChange(option);
                                else handleMultipleOptionChange(e, option);
                              }}
                            />

                            <p
                              dangerouslySetInnerHTML={{
                                __html: option?.answerFormula,
                              }}
                            ></p>
                          </label>
                        </div>
                      ))}
                  </form>
                </>
              )}
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
  );
};

export default StartQuizDialog;
