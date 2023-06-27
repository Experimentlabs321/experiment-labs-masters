import React from "react";
import Statement from "./Statement";
import RightArrowBlack from "../../../assets/Dashboard/RightArrowBlack.png";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import LabPointsImg from "../../../assets/Dashboard/LabPoints.png";
import LabPointsCardBottomImg from "../../../assets/Dashboard/LabPointsCardBottomImg.png";
import LabPointsCardTopImg from "../../../assets/Dashboard/LabPointsCardTopImg.png";
import MilestonesStar from "../../../assets/Dashboard/MilestonesStar.png";
import MilestonesBg from "../../../assets/Dashboard/MilestonesBg.png";
import Milestones from "../../../assets/Dashboard/Milestones.png";

const LabPoints = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-4 justify-between lg:h-[700px] mt-[56px] mb-5 lg:mb-0">
        <div className="w-[340px] lg:w-[490px] min-w-[250px] lg:min-w-min lg:h-[575px] relative">
          <h1 className="text-[18px] lg:text-[25px] font-[700] lg:text-center pb-[32px]">
            My Lab Points
          </h1>
          <div
            style={{
              filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
            }}
            className="bg-[#082270] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5 overflow-hidden"
          >
            <img
              className=" absolute top-0 left-0"
              src={LabPointsCardTopImg}
              alt="LabPointsCardTopImg"
            />
            <img
              className=" absolute bottom-0 right-0"
              src={LabPointsCardBottomImg}
              alt="LabPointsCardBottomImg"
            />
            <div className="text-white text-center z-10 absolute top-[55px] lg:top-[60px] text-[8px] lg:text-[12px] font-[600]">
              <p className="m-0 p-0 tracking-[1px]">You Have</p>
              <h1 className="text-[#009E47] text-[30px] lg:text-[45px] font-[800] m-0 p-0 tracking-[3px]">
                400
              </h1>
              <p className="m-0 p-0 tracking-[1px]">Points</p>
            </div>
            <img className="z-0" src={LabPointsImg} alt="LabPointsImg" />
            <div className="absolute top-[172px] lg:top-[195px] left-[50px] lg:left-[107px] text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
              <h1>200</h1>
              <h1 className="text-[8px] lg:text-[12px] text-white mt-[37px]">
                Attendance
              </h1>
            </div>
            <div className="absolute top-[172px] lg:top-[195px] left-[180px] lg:left-[252px] text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
              <h1>150</h1>
              <h1 className="text-[8px] lg:text-[12px] text-white mt-[37px]">
                Challenge Submission
              </h1>
            </div>
            <div className="absolute top-[270px] lg:top-[305px] left-[50px] lg:left-[107px] text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
              <h1>35</h1>
              <h1 className="text-[8px] lg:text-[12px] text-white mt-[37px]">
                Creativity
              </h1>
            </div>
            <div className="absolute top-[270px] lg:top-[305px] left-[180px] lg:left-[252px] text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
              <h1>15</h1>
              <h1 className="text-[8px] lg:text-[12px] text-white mt-[37px]">
                Delight
              </h1>
            </div>
            <DashboardPrimaryButton
              bgColor="#FFDB70"
              shadow="0px 7.50435px 0px #F08323"
            >
              <p className="flex items-center justify-center">
                Redeem now{" "}
                <img
                  className="pl-1 w-[21px] lg:w-[32px]"
                  src={RightArrowBlack}
                  alt="RightArrowBlack"
                />
              </p>
            </DashboardPrimaryButton>
          </div>
        </div>
        <div className="w-[340px] lg:w-[490px] min-w-[250px] lg:min-w-min lg:h-[575px] relative">
          <h1 className="text-[18px] lg:text-[25px] font-[700] lg:text-center pb-[32px]">
            Milestones
          </h1>
          <div
            style={{
              filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
            }}
            className="bg-[#131313] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5 overflow-hidden"
          >
            <img
              className=" absolute top-[105px] right-0 lg:right-[20px]"
              src={MilestonesStar}
              alt="LabPointsCardTopImg"
            />
            <img
              className=" absolute bottom-[80px] left-[15px] lg:left-[20px]"
              src={MilestonesStar}
              alt="LabPointsCardBottomImg"
            />
            <img className="px-5" src={MilestonesBg} alt="LabPointsImg" />
            <img
              className="absolute top-[80px] lg:top-[115px]"
              src={Milestones}
              alt="LabPointsImg"
            />
            <p className="w-[120px] lg:w-[178.12px] text-center text-[#C5FF32] text-[14px] lg:text-[20px] font-bold bottom-[145px] lg:bottom-[230px] tracking-widest absolute">
              200 points to unlock
            </p>
            <DashboardPrimaryButton
              bgColor="#FFDB70"
              shadow="0px 7.50435px 0px #F08323"
            >
              <p className="flex items-center justify-center">
                Earn now{" "}
                <img
                  className="pl-1 w-[21px] lg:w-[32px]"
                  src={RightArrowBlack}
                  alt="RightArrowBlack"
                />
              </p>
            </DashboardPrimaryButton>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Statement />
      </div>
    </div>
  );
};

export default LabPoints;
