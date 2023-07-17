import React from "react";
import RecommendedSessions from "../../../assets/Dashboard/RecommendedSessions.png";

const FeedbackAndSession = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 px-4 my-[60px]">
        <div className="col-span-2 flex flex-col items-center justify-center">
          <h1 className="block lg:hidden w-[295px] text-[12px] font-[700] text-left mb-[30px] ">
            Tailored for You !
          </h1>
          <div className="bg-[#2D2D2D] w-[295px] lg:w-[642px] h-[50px] lg:h-[125px] rounded-2xl flex items-center justify-around lg:justify-between lg:ml-[38px] lg:pr-[30px]">
            <div className="w-[72px] lg:w-[170px] lg:ml-[-38px] h-[72px] lg:h-[170px]  border-[6px] lg:border-[12px] border-[#6278FF] border-r-transparent rounded-full z-[1] ">
              <div className="w-[60px] lg:w-[145px] h-[60px] lg:h-[145px] bg-white rounded-full shadow-[4px_4px_8px_#5965B1] text-[7px] lg:text-[16px] font-[600] flex items-center justify-center text-center px-6 ">
                <p>You are in Top 50 in Presentation</p>
              </div>
            </div>
            <p className="text-[10px] text-white lg:text-[24px] font-[700] ">
              Strong Suits
            </p>
            <button
              className={`bg-[#3E4DAC] text-white py-[5px] lg:py-[15px] px-[20.5px] lg:px-[40px] rounded-[13px] text-[10px] lg:text-[20px] font-[700] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
            >
              View All
            </button>
          </div>
          <div className="bg-[#2D2D2D] w-[295px] lg:w-[642px] h-[50px] lg:h-[125px] rounded-2xl flex items-center justify-around lg:justify-between lg:ml-[38px] lg:pr-[30px] mt-[40px] lg:mt-[100px]">
            <div className="w-[72px] lg:w-[170px] lg:ml-[-38px] h-[72px] lg:h-[170px]  border-[6px] lg:border-[12px] border-[#6278FF] border-l-transparent border-b-transparent rounded-full z-[1] ">
              <div className="w-[60px] lg:w-[145px] h-[60px] lg:h-[145px] bg-white rounded-full shadow-[0px_4px_8px_#5965B1] text-[6px] lg:text-[16px] font-[600] flex items-center justify-center text-center px-6 ">
                <p>Can do better for in Language Proficiency</p>
              </div>
            </div>
            <p className="text-[10px] text-white lg:text-[24px] font-[700] ">
              Focus Areas
            </p>
            <button
              className={`bg-[#3E4DAC] text-white py-[5px] lg:py-[15px] px-[20.5px] lg:px-[40px] rounded-[13px] text-[10px] lg:text-[20px] font-[700] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98]`}
            >
              View All
            </button>
          </div>
        </div>
        <div className="mt-[40px] lg:mt-0">
          <div className="bg-[#FFC7C7] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] shadow-[0px_8px_0px_0px_#CA5F98] gap-3 lg:gap-5">
            <h1 className="text-[12px] lg:text-[24px] font-[700] text-center mb-[10px] ">
              Recommended Sessions
            </h1>
            <div className="flex flex-row lg:flex-col gap-2 lg:gap-0 ">
              <img
                className="w-[50%] lg:w-full rounded-lg "
                src={RecommendedSessions}
                alt="RecommendedSessions"
              />
              <div className="w-[50%] lg:w-full flex flex-col justify-between">
                <h1 className="text-[10px] lg:text-[18px] font-[800] text-white lg:text-center lg:mt-[22px] ">
                  Session : Graphic Design
                </h1>
                <div className="flex items-center justify-between py-[10px] lg:py-[20px] ">
                  <button className="p-[10px] bg-white rounded-full text-[6px] lg:text-[12px] font-sans ">
                    Thursday
                  </button>
                  <button className="p-[10px] bg-white rounded-full text-[6px] lg:text-[12px] font-sans ">
                    Starts-9.00 am
                  </button>
                  <button className="p-[10px] bg-white rounded-full text-[6px] lg:text-[12px] font-sans ">
                    15 min
                  </button>
                </div>
                <button
                  className={`bg-[#3E4DAC] text-white py-[5px] lg:py-[15px] px-[20.5px] lg:px-[40px] rounded-[13px] text-[10px] lg:text-[20px] font-[700] z-[1] shadow-[0px_4px_0px_0px_#CA5F98] lg:shadow-[0px_8px_0px_0px_#CA5F98] w-fit lg:w-full lg:mb-[10px] lg:mt-[10px]`}
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAndSession;
