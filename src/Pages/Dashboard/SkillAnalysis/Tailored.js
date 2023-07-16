import React, { useState } from "react";
import CommunicationSkill from "../../../assets/Dashboard/CommunicationSkill.png";
import LanguageProficiency from "../../../assets/Dashboard/LanguageProficiency.png";
import PersonSkillAnalysis from "../../../assets/Dashboard/PersonSkillAnaalysis.png";
import ICanDoThis from "../../../assets/Dashboard/ICanDoThis.png";
import TailoredRightArrow from "../../../assets/Dashboard/TailoredRightArrow.png";
import UploadFromFiles from "../../../assets/Dashboard/UploadFromFiles.png";
import DropBox from "../../../assets/Dashboard/DropBox.png";
import Drive from "../../../assets/Dashboard/Drive.png";
import DialogLayout from "../Shared/DialogLayout";

const Tailored = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-[60px]">
      <h1 className="hidden lg:block px-4 text-[24px] font-[700] mb-[40px]">
        Tailored for you
      </h1>
      <div className="flex">
        <div
          style={{
            width: "-webkit-fill-available",
            // boxShadow: "inset 4px 5px 0 0 black",
          }}
          className="h-[140px] lg:h-[350px] border-[#3E4DAC] border-t-[6px] lg:border-t-[12px] border-x-[6px] lg:border-x-[12px] rounded-t-full ml-[-10%] relative shadow-[inset_2px_2.5px_0px_0px_black] lg:shadow-[inset_4px_5px_0px_0px_black] "
        >
          <img
            className=" w-[24px] lg:w-auto absolute top-0 mt-[-12%] left-[40%]"
            src={TailoredRightArrow}
            alt="TailoredRightArrow"
          />
        </div>
        <div
          style={{
            width: "-webkit-fill-available",
            // boxShadow: "4px 0px 0px 0px black",
          }}
          className="h-[140px] lg:h-[350px] border-[#3E4DAC] border-b-[6px] lg:border-b-[12px] border-x-[6px] lg:border-x-[12px] rounded-b-full ml-[-6px] lg:ml-[-12px] mt-[55px] sm:mt-[100px] lg:mt-[135px] 2xl:mt-[195px] px-2 shadow-[2px_0px_0px_0px_black] lg:shadow-[4px_0px_0px_0px_black] "
        >
          <div className="flex flex-col items-center mt-[5%]">
            <p className="text-center text-[7px] lg:text-[16px] font-[600] ">
              Prepare and deliver a 1-minute impromptu speech on a given topic,
            </p>
            <h1 className=" text-[12px] lg:text-[20px] text-[#FF9D16] font-[800] text-center ">
              Communication Skills
            </h1>
            <img
              className="w-[60px] lg:w-auto "
              src={CommunicationSkill}
              alt="CommunicationSkill"
            />
            <DialogLayout
              open={open}
              setOpen={setOpen}
              bgColor="#FFFFFF"
              width={440}
              borderRadius={"20px"}
            >
              <h1 className="text-black text-[12px] mt-3 lg:mt-6 lg:text-[20px] font-[700] text-center ">
                Submit
              </h1>
              <div className="flex  items-center justify-around">
                <div className="text-center flex flex-col items-center justify-center">
                  <img src={DropBox} alt="DropBox" />
                  <h1 className="text-[8px] lg:text-[15px] font-[500] ">
                    Drop Box
                  </h1>
                </div>
                <div className="text-center flex flex-col items-center justify-center my-[40px]">
                  <img src={UploadFromFiles} alt="UploadFromFiles" />
                  <h1 className="text-[8px] lg:text-[15px] font-[500] ">
                    Upload
                    <br />
                    From Files
                  </h1>
                </div>
                <div className="text-center flex flex-col items-center justify-center">
                  <img src={Drive} alt="Drive" />
                  <h1 className="text-[8px] lg:text-[15px] font-[500] ">
                    Drive
                  </h1>
                </div>
              </div>
            </DialogLayout>
            <button
              onClick={() => setOpen(true)}
              className={`bg-[#FFDB70] py-[7.5px] lg:py-[15px] px-[11.5px] lg:px-[23px] rounded-[13px] text-[8px] lg:text-[18px] font-[700] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_8px_0px_0px_#F08323]`}
            >
              Submit
            </button>
          </div>
        </div>
        <div
          style={{
            width: "-webkit-fill-available",
            // boxShadow: "inset 4px 5px 0 0 black",
          }}
          className="h-[140px] lg:h-[350px] border-[#3E4DAC] border-t-[6px] lg:border-t-[12px] border-x-[6px] lg:border-x-[12px] rounded-t-full  ml-[-6px] lg:ml-[-12px] px-2  shadow-[inset_2px_2.5px_0px_0px_black] lg:shadow-[inset_4px_5px_0px_0px_black] "
        >
          <div className="flex flex-col items-center h-full ">
            <div className="mb-[15px] lg:mb-[30px] mt-[-15%] lg:mt-[-8%] ">
              <button
                onClick={() => setOpen(true)}
                className={`bg-[#FFDB70] py-[7.5px] lg:py-[15px] px-[11.5px] lg:px-[23px] rounded-[13px] text-[8px] lg:text-[18px] font-[700] z-[1] shadow-[0px_4px_0px_0px_#F08323] lg:shadow-[0px_8px_0px_0px_#F08323]`}
              >
                Submit
              </button>
            </div>
            <img
              className="w-[60px] lg:w-auto "
              src={LanguageProficiency}
              alt="LanguageProficiency"
            />
            <h1 className=" text-[12px] lg:text-[20px] text-[#FF9D16] font-[800] text-center ">
              Language Proficiency
            </h1>
            <p className="text-center text-[7px] lg:text-[16px] font-[600] ">
              Record an audio/video telling about yourself in any foreign
              language.
            </p>
          </div>
        </div>
        <div
          style={{
            width: "-webkit-fill-available",
            // boxShadow: "0px 4px 0px 0px black",
          }}
          className="h-[140px] lg:h-[350px] border-[#3E4DAC] border-b-[6px] lg:border-b-[12px] border-l-[6px] lg:border-l-[12px] rounded-b-full ml-[-6px] lg:ml-[-12px] mt-[55px] sm:mt-[100px] lg:mt-[135px] 2xl:mt-[195px] mr-[10%] lg:mr-[10%] relative w-full shadow-[0px_2px_0px_0px_black] lg:shadow-[0px_4px_0px_0px_black] "
        >
          <div
            // style={{ width: "-webkit-fill-available" }}
            className="flex w-full absolute bottom-[18px] sm:bottom-[30%] right-[-20%] lg:bottom-[10%] lg:right-[-20%]  2xl:bottom-[20%]"
          >
            <img className=" w-[50%]" src={ICanDoThis} alt="ICanDoThis" />
            <img
              className=" w-[50%]"
              src={PersonSkillAnalysis}
              alt="PersonSkillAnalysis"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tailored;
