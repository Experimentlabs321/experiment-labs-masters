import React, { useState, useEffect } from "react";
import DialogLayout from "../../../../Shared/DialogLayout";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
  const [openTimeOutDialog, setOpenTimeOutDialog] = useState(false);

  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isCounting && timeLeft === 0) {
      setIsCounting(false);
      setOpenTimeOutDialog(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isCounting, timeLeft]);

  const handleTimeOutDialog = () => {
    setOpenTimeOutDialog(false);
    handleClose();
    localStorage.setItem("questionWithSelectedAns", JSON.stringify(questions));
    setCongratulationOpen(true);
  };

  const handleStopTimer = () => {
    setIsCounting(false);
  };

  return (
    <>
      {/* Dialog for Time Out start */}
      <DialogLayout open={openTimeOutDialog} width={500} close={true}>
        <div className="flex items-center justify-center">
          <div className={` w-full h-full flex justify-center items-center `}>
            <div className="bg-white  p-6 mt-[20px] mb-[30px] ">
              <div className="flex flex-col items-center justify-center gap-4">
                <ErrorOutlineIcon
                  className="text-red-500 font-[40px] animate-pulse "
                  sx={{ fontSize: 80 }}
                />
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Your Time is Out!
                  </h2>
                  <p className="text-gray-600">Please try again later.</p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleTimeOutDialog}
                  className="px-5 py-2 text-[18px] font-[700] bg-[#FF557A] shadow-[0px_5px_0px_0px_#F08323] text-white rounded-[8px]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogLayout>
      {/* Dialog for Time Out end */}
      <div
        style={{ fontFamily: "Orbitron" }}
        className=" border-[8px] py-[5px] px-[17px] mx-auto border-[#FF557A] rounded-md "
      >
        <h1 className="text-[30px] font-[700] text-[#FF557A] ">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </h1>
      </div>
    </>
  );
};

export default TimeCounter;
