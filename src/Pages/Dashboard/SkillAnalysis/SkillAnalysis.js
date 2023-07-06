import React from "react";
import Layout from "../Layout";
import FluentCommunication from "../../../assets/Dashboard/FluentCommunication.png";
import Teamwork from "../../../assets/Dashboard/Teamwork.png";
import Computer from "../../../assets/Dashboard/Computer.png";
import LogicalReasoning from "../../../assets/Dashboard/LogicalReasoning.png";
import Language from "../../../assets/Dashboard/Language.png";
import Science from "../../../assets/Dashboard/Science.png";
import CommunicationSkill from "../../../assets/Dashboard/CommunicationSkill.png";
import LanguageProficiency from "../../../assets/Dashboard/LanguageProficiency.png";
import PersonSkillAnalysis from "../../../assets/Dashboard/PersonSkillAnaalysis.png";
import CommentPic from "../../../assets/Dashboard/CommentPic.png";
import TailoredRightArrow from "../../../assets/Dashboard/TailoredRightArrow.png";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";

const skillsData = [
  {
    type: "Super Skills",
    themeColor: "#FFDBC1",
    subSkills: [
      {
        subSkillName: "Communication Skills",
        percentage: 30,
        icon: FluentCommunication,
      },
      {
        subSkillName: "Teamwork",
        percentage: 60,
        icon: Teamwork,
      },
    ],
  },
  {
    type: "Hard Skills",
    themeColor: "#FFC7C7",
    subSkills: [
      {
        subSkillName: "Computer Analytics",
        percentage: 80,
        icon: Computer,
      },
      {
        subSkillName: "Logical Reasoning",
        percentage: 70,
        icon: LogicalReasoning,
      },
    ],
  },
  {
    type: "Academic Skills",
    themeColor: "#BCC5FF",
    subSkills: [
      {
        subSkillName: "Language Proficiency",
        percentage: 50,
        icon: Language,
      },
      {
        subSkillName: "Science",
        percentage: 75,
        icon: Science,
      },
    ],
  },
];

const SkillAnalysis = () => {
  return (
    <div>
      <Layout>
        <div>
          <div className="py-[65px]">
            <div className="flex flex-row justify-between gap-4 overflow-x-scroll lg:overflow-x-visible px-4 mt-[30px] lg:mt-0">
              {skillsData?.map((item) => (
                <div
                  style={{ width: "-webkit-fill-available" }}
                  className="min-w-[230px] max-w-[380px] bg-[#2D2D2D] rounded-2xl py-[30px] "
                >
                  <h1 className="text-white text-[12px] lg:text-[20px] font-[700] text-center ">
                    {item?.type}
                  </h1>
                  <div className=" px-3 lg:px-6">
                    {item?.subSkills?.map((subSkill) => (
                      <div className="flex items-center gap-3 mt-[30px]">
                        <div
                          style={{ background: `${item?.themeColor}` }}
                          className="w-[28px] h-[23px] lg:w-[55px] lg:h-[45px] rounded-full flex items-center justify-center "
                        >
                          <img
                            className="w-[16px] lg:w-[30px]"
                            src={subSkill?.icon}
                            alt="something"
                          />
                        </div>
                        <div className="w-full mb-[-18px] lg:mb-[-30px]">
                          <div className="relative w-full">
                            <div className="w-full border border-white rounded-lg h-[8px] lg:h-[16px]">
                              <div
                                className={`h-[8px] lg:h-[16px] rounded-lg mt-[-1px] ml-[-1px] `}
                                style={{
                                  background: `${item?.themeColor}`,
                                  border: `1px solid ${item?.themeColor}`,
                                  width: `${subSkill?.percentage}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <h1 className="text-white text-[8px] lg:text-[15px] font-[500] mt-[8px] lg:mt-[12px] ">
                            {subSkill?.subSkillName}
                          </h1>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className=" mt-[60px] flex justify-center ">
                    <DashboardPrimaryButton
                      bgColor="#FFDB70"
                      shadow="0px 7.50435px 0px #F08323"
                    >
                      View More
                    </DashboardPrimaryButton>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-[400px]">
              <h1 className="px-4 text-[24px] font-[700] mb-[40px]">
                Tailored for you
              </h1>
              <div className="flex">
                <div
                  style={{ width: "-webkit-fill-available" }}
                  className=" h-[350px] border-[#3E4DAC] border-t-[12px] border-x-[12px] rounded-t-full ml-[-100px] relative "
                >
                  <img
                    className=" absolute top-0 mt-[-12%] left-[40%]"
                    src={TailoredRightArrow}
                    alt="TailoredRightArrow"
                  />
                </div>
                <div
                  style={{ width: "-webkit-fill-available" }}
                  className=" h-[350px] shadow-[0px_8px_0px_0px_#0000] border-[#3E4DAC] border-b-[12px] border-x-[12px] rounded-b-full ml-[-12px] mt-[205px] px-2 "
                >
                  <div className="flex flex-col items-center mt-[5%]">
                    <p className="text-center text-[7px] lg:text-[16px] font-[600] ">
                      Prepare and deliver a 1-minute impromptu speech on a given
                      topic,
                    </p>
                    <h1 className=" text-[12px] lg:text-[20px] text-[#FF9D16] font-[800] ">
                      Communication Skills
                    </h1>
                    <img src={CommunicationSkill} alt="CommunicationSkill" />
                    <DashboardPrimaryButton
                      bgColor="#FFDB70"
                      shadow="0px 8px 0px 0px #F08323"
                    >
                      Submit
                    </DashboardPrimaryButton>
                  </div>
                </div>
                <div
                  style={{ width: "-webkit-fill-available" }}
                  className=" h-[350px] border-[#3E4DAC] border-t-[12px] border-x-[12px] rounded-t-full  ml-[-12px] px-2 "
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-[30px] mt-[-8%] ">
                      <DashboardPrimaryButton
                        bgColor="#FFDB70"
                        shadow="0px 8px 0px 0px #F08323"
                      >
                        Submit
                      </DashboardPrimaryButton>
                    </div>
                    <img src={LanguageProficiency} alt="LanguageProficiency" />
                    <h1 className=" text-[12px] lg:text-[20px] text-[#FF9D16] font-[800] ">
                      Language Proficiency
                    </h1>
                    <p className="text-center text-[7px] lg:text-[16px] font-[600] ">
                      Record an audio/video telling about yourself in any
                      foreign language.
                    </p>
                  </div>
                </div>
                <div
                  style={{ width: "-webkit-fill-available" }}
                  className=" h-[350px] border-[#3E4DAC] border-b-[12px] border-x-[12px] rounded-b-full ml-[-12px] mt-[205px] mr-[150px] "
                >
                  <div
                    // style={{ width: "-webkit-fill-available" }}
                    className="flex ml-[55px] mt-[-15px] "
                  >
                    <img className="w-fit" src={CommentPic} alt="CommentPic" />
                    <img
                      className="w-fit"
                      src={PersonSkillAnalysis}
                      alt="PersonSkillAnalysis"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div></div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SkillAnalysis;
