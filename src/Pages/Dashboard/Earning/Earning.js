import React, { useState } from "react";
import Layout from "../Layout";
import LabPoints from "./LabPoints";
import Statement from "./Statement";
import HelpAndSupport from "./HelpAndSupport";

const Earning = () => {
  const [active, setActive] = useState("Lab points");
  return (
    <div>
      <Layout>
        <div className=" pt-20 lg:pt-10 px-4 ">
          <div className="flex flex-wrap gap-[20px] lg:gap-14">
            <button
              onClick={() => setActive("Lab points")}
              className={`${
                active === "Lab points"
                  ? "bg-[#3E4DAC] border border-[#3E4DAC] text-white"
                  : "border border-black text-stone-900"
              }  p-[12px] lg:py-[24px] lg:px-[56px] rounded-full lg:rounded-[16px] text-[12px] lg:text-[16px] font-[600]`}
            >
              Lab points
            </button>
            <button
              onClick={() => setActive("Statement")}
              className={`${
                active === "Statement"
                  ? "bg-[#3E4DAC] border border-[#3E4DAC] text-white"
                  : "border border-black text-stone-900"
              } lg:hidden p-[12px] lg:py-[24px] lg:px-[56px] rounded-full lg:rounded-[16px] text-[12px] lg:text-[16px] font-[600]`}
            >
              Statement
            </button>
            <button
              onClick={() => setActive("Help & support")}
              className={`${
                active === "Help & support"
                  ? "bg-[#3E4DAC] border border-[#3E4DAC] text-white"
                  : "border border-black text-stone-900"
              }  p-[12px] lg:py-[24px] lg:px-[56px] rounded-full lg:rounded-[16px] text-[12px] lg:text-[16px] font-[600]`}
            >
              Help & support
            </button>
          </div>
          <div>
            {active === "Lab points" && <LabPoints />}
            {active === "Statement" && <Statement />}
            {active === "Help & support" && <HelpAndSupport />}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Earning;
