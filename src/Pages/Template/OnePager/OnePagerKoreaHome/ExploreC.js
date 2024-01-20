import React from "react";

const ExploreC = ({ courseInfoData }) => {
  return (
    <div>
      <div className="w-11/12 mx-auto">
        <h1
          style={{
            borderBottom: "2px solid #4555BA",
            padding: "13px 0",
          }}
          className="text-black font-inter font-bold sm:text-[20px] md:text-[32px] pb-3 w-full lg:w-[583px]"
        >
          {courseInfoData.courseInfoOutHeading}
        </h1>
        <p className="text-[#4555BA] font-inter sm:text-[16px] md:text-[24px] font-bold sm:mt-[9px] md:mt-[23px] inline-block">
          {courseInfoData.courseInfoOutUnderHeading}
        </p>
      </div>
      <div className="bg-[rgb(241,243,255)] mt-[14px]">
        <div className="grid md:grid-flow-col  w-11/12 mx-auto justify-between py-[30px] md:py-[51px]">
          <div className="md:w-2/4">
            <h1 className="font-inter font-bold sm:text-[20px] md:text-[32px] pb-3">
              {courseInfoData.courseInfoInHeading}
            </h1>
            <p
              className="text-[#4555BA] font-inter font-bold sm:text-[20px] md:text-[32px] inline-block"
              style={{ borderBottom: "3px solid #4555BA" }}
            >
              {courseInfoData.courseInfoInHeadline}
            </p>
            <p className="text-[#242424] font-inter font-bold sm:text-[16px] md:text-[24px] sm:mt-[16px] md:mt-[69px]">
              {courseInfoData.courseInfoInTitle}
            </p>
            <div className="font-inter sm:text-[16px] md:text-[16px] mt-[12px] inline-block">
              <p className="text-[#3E3E3E]">
                {courseInfoData.courseInfoInDescription}{" "}
                <span>
                  {" "}
                  <button className="text-[#4555BA] inline-block ">
                    {courseInfoData.courseInfoInShowMoreButton}
                  </button>
                </span>
              </p>
            </div>
          </div>
          <div className="bg-white md:bg-[rgb(241,243,255)] container sm:mx-auto sm:rounded-lg">
            <p className="font-inter text-center mt-2 sm:text-center font-bold sm:text-[20px] md:text-[27px] sm:mt-[53px] md:mt-0">
              {courseInfoData.courseInfoInOutline}
            </p>
            <div className="flex items-center justify-center mb-2">
              <div className="w-fit">
                {courseInfoData?.courseInfoSubjects?.map((subject) => {
                  return (
                    <div className="flex sm:justify-items-center md:items-center sm:text-[15px] md:text-[16px]  font-inter font-bold mt-[8px]">
                      <img alt="tick" src={courseInfoData.courseInfoTick}></img>
                      <p>{subject}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-[20px] md:text-[24px] font-inter font-bold flex items-center justify-around">
              <span>신규 런칭!</span>
              <div>
                {/* <img
                  alt="rupee"
                  src={courseInfoData?.courseInfoPriceIcon}
                  className="inline-block"
                ></img> */}
                <span className="text-[#4555BA]  sm:text-[20px] md:text-[27px]">
                  {courseInfoData.courseInfoPrice}
                </span>
              </div>
            </p>
            <div className="flex items-center justify-center mb-3">
              <button className="font-inter text-[16px] md:text-[20px] text-white btn mt-[19px] w-[159px] md:w-[192px] p-[10px] bg-[#4555BA] rounded-md ">
                {courseInfoData.courseInfoButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreC;
