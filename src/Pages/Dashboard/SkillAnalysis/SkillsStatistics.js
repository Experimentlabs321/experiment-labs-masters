import React, { useContext, useEffect, useState } from "react";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import DialogLayout from "../Shared/DialogLayout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";


const SkillsStatistics = ({ skillsData }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();

  const { userInfo, user } = useContext(AuthContext)
  console.log(userInfo._id)

  const [allResults, setAllResult] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/getSubmitAssignment/all/${userInfo._id}`)
      .then((response) => {

        // setAssignment(response?.data)

        const collection = response?.data.filter((item) => (item?.submitter?.result?.skillParameterData))
        setAllResult(response?.data.filter((item) => (item?.submitter?.result?.skillParameterData)))
        //console.log(a)


      })
      .catch((error) => console.error(error));
  }, [userInfo._id]);

  console.log(allResults)



  return (
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
          <DialogLayout
            open={open && item?.type === status}
            setOpen={setOpen}
            bgColor="#FFFFFF"
            width={440}
            borderRadius={"20px"}
          >
            <h1 className="text-black text-[12px] mt-3 lg:mt-6 lg:text-[20px] font-[700] text-center ">
              {item?.type}
            </h1>
            <div className=" px-3 lg:px-6 pb-[50px]">
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
                      <div className="w-full border border-[#A7A6A6] rounded-lg h-[8px] lg:h-[16px]">
                        <div
                          className={`h-[6px] lg:h-[14px] rounded-lg   `}
                          style={{
                            background: `${item?.themeColor}`,
                            // border: `1px solid black`,
                            width: `${subSkill?.percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <h1 className="text-black text-[8px] lg:text-[15px] font-[500] mt-[8px] lg:mt-[12px] ">
                      {subSkill?.subSkillName}
                    </h1>
                  </div>
                </div>
              ))}
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
                      <div className="w-full border border-[#A7A6A6] rounded-lg h-[8px] lg:h-[16px]">
                        <div
                          className={`h-[6px] lg:h-[14px] rounded-lg   `}
                          style={{
                            background: `${item?.themeColor}`,
                            // border: `1px solid black`,
                            width: `${subSkill?.percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <h1 className="text-black text-[8px] lg:text-[15px] font-[500] mt-[8px] lg:mt-[12px] ">
                      {subSkill?.subSkillName}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </DialogLayout>
          <div className=" mt-[60px] flex justify-center ">
            <button
              onClick={() => {
                setOpen(true);
                setStatus(item?.type);
              }}
              className={`bg-[#FFDB70] text-black py-[5px] lg:py-[15px] px-[20.5px] lg:px-[40px] rounded-[13px] text-[10px] lg:text-[18px] font-[700] z-[1] shadow-[0px_4px_0px_#F08323] lg:shadow-[0px_8px_0px_#F08323]`}
            >
              View More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsStatistics;
