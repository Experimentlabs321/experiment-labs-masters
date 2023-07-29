import React, { useState, useEffect } from "react";

const TimeCounter = ({
  isCounting,
  setIsCounting,
  timeLeft,
  setTimeLeft,
  fixedTimeInMinutes,
  handleClose,
  setCongratulationOpen,
  questions,
}) => {
  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isCounting && timeLeft === 0) {
      setIsCounting(false);
      handleClose();
      localStorage.setItem(
        "questionWithSelectedAns",
        JSON.stringify(questions)
      );
      setCongratulationOpen(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isCounting, timeLeft]);

  const handleStartTimer = () => {
    setIsCounting(true);
    setTimeLeft(fixedTimeInMinutes * 60);
  };

  const handleStopTimer = () => {
    setIsCounting(false);
  };

  return (
    <>
      <div
        style={{ fontFamily: "Orbitron" }}
        className=" border-[8px] py-[5px] px-[17px] mx-auto border-[#FF557A] rounded-md "
      >
        <h1 className="text-[30px] font-[700] text-red-700 ">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </h1>
      </div>
    </>
  );
};

export default TimeCounter;
