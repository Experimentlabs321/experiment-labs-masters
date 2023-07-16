import React from "react";

const FAQs = ({ Faqs }) => {
  return (
    <div>
      <h1 className="text-[12px] lg:text-[20px] font-[700] px-4 py-4">FAQs</h1>
      <div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 lg:gap-y-8 ">
        {Faqs?.map((item, index) => (
          <div className=" py-[15px] px-[25px]  lg:p-[25px] shadow-[5px_5px_20px_0px_#00000040] rounded-full lg:rounded-[30px]  ">
            <div className="flex">
              <div>
                <svg
                  className="block lg:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <circle cx="6" cy="6" r="6" fill="#6278FF" />
                  <circle
                    cx="6"
                    cy="6"
                    r="6"
                    fill="url(#paint0_linear_1636_5704)"
                    fill-opacity="0.45"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1636_5704"
                      x1="6"
                      y1="9.38773e-07"
                      x2="6"
                      y2="12"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop />
                      <stop offset="0.355495" stop-opacity="0.609575" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  className="hidden lg:block"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <circle cx="13" cy="13" r="13" fill="#6278FF" />
                  <circle
                    cx="13"
                    cy="13"
                    r="13"
                    fill="url(#paint0_linear_1177_1490)"
                    fill-opacity="0.45"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1177_1490"
                      x1="13"
                      y1="2.03401e-06"
                      x2="13"
                      y2="26"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop />
                      <stop offset="0.355495" stop-opacity="0.609575" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h1 className="ml-[7px] lg:ml-[20px] text-[8px] lg:text-[18px] font-[500] ">
                  Q{index + 1}. {item?.question}
                </h1>
              </div>
            </div>
            <div>
              <p className=" text-[7px] lg:text-[16px] text-[#7D7D7D] mt-[6px] lg:mt-[12px] ">
                {item?.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
