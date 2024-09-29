import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CongratulationsLeft from "../../../../../assets/Dashboard/CongratulationsLeft.png";
import CongratulationsRight from "../../../../../assets/Dashboard/CongratulationsRight.png";
import CongratulationsBatch from "../../../../../assets/Dashboard/CongratulationsBatch.png";

const CongratulationDialog = ({
  congratulationOpen,
  setCongratulationOpen,
  taskData,
  setReviewOpen,
  setGivenAnswers,
  setSelectedOption,
  setSelectedOptions,
  questions,
  participationData,
  currentQuestion,
  score,
  point,
  Transition,
  handleClose,
}) => {
  return (
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
      <div className="max-w-[1023px] pt-[80px] lg:mx-auto ms-5 flex flex-col lg:flex-row justify-between mb-5">
        <img
          className="w-auto h-fit mt-[100px] lg:block hidden"
          src={CongratulationsLeft}
          alt="CongratulationsLeft"
        />
        <div className="flex flex-col items-center bg-[#0E0534] p-[32px] lg:w-[520px] w-[95%] rounded-[11px]">
          <h1 className="text-[#FFDB70] text-[28px] font-[700] text-center mb-[32px] ">
            Congratulations
          </h1>
          <img src={CongratulationsBatch} alt="CongratulationsBatch" />
          <div className="text-white text-center mt-[22px] text-[20px] font-[700]">
            <p>You answered</p>
            <p>
              <span className="text-[#21D63E]">
                {score} out of {questions?.length}
              </span>{" "}
              questions correctly.
            </p>
          </div>
          <div className="lg:w-[453.97px] w-[90%] h-[122.47px] bg-yellow-50 rounded-[9.21px] flex items-center justify-between py-[30px] px-[40px] mt-[45px] bg-[#FFFCE0]">
            <div className="mx-auto">
              <div className="flex-col justify-start items-center inline-flex">
                <h1 className="text-zinc-800 text-[16.90px] font-semibold">
                  Your Points Earned
                </h1>
                <h1 className="text-rose-400 font-sans text-[25.52px] font-semibold">
                  {point} points out of {taskData?.points} points
                </h1>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setReviewOpen(true);
              setGivenAnswers(participationData?.questions);

              if (
                questions[currentQuestion]?.questionType === "Multiple choice"
              ) {
                const findGivenAns = participationData?.questions?.find(
                  (item) => item?.questionId === questions[currentQuestion]?._id
                );
                // console.log(findGivenAns);
                if (questions[currentQuestion]?.oneOrMultipleOption === "one") {
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
            }}
            className="bg-[#FFDB70] text-black px-[21px] py-[14px] text-[16px] font-[700] text-center rounded-[8px] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_7px_0px_0px_#F08323] flex items-center gap-[7px] mt-[50px] mb-[20px]"
          >
            Review Submission
          </button>
        </div>
        <img
          className="w-auto h-fit mt-[100px] lg:block hidden"
          src={CongratulationsRight}
          alt="CongratulationsRight"
        />
      </div>
    </Dialog>
  );
};

export default CongratulationDialog;
