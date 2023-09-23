import React from "react";
import LabPointsCardBottomImg from "../../../assets/Dashboard/LabPointsCardBottomImg.png";
import LabPointsCardTopImg from "../../../assets/Dashboard/LabPointsCardTopImg.png";
import LabPointsFrame from "../../../assets/Dashboard/LabPointsFrame.png";
import RightArrowBlack from "../../../assets/Dashboard/RightArrowBlack.png";
import LabCategoryButton from "../../../assets/Dashboard/LabCategoryButton.png";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MyLabPoints = ({
  allCategoryNames,
  currentIndex,
  previous,
  forward,
  itemCategorySum,
  totalSum,
  allResults,
  itemName,
}) => {
  return (
    <div>
      <div className="w-[340px] md:w-[490px]  min-w-[250px] md:min-w-min md:h-[575px] h-[500px] relative">
        <h1 className="text-[18px] md:text-[25px] font-[700] md:text-center pb-[32px]">
          My Lab Points
        </h1>
        {allCategoryNames.map((cat, index) => (
          <div
            style={{
              filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
            }}
            className={`mt-[10px] bg-[#082270] w-full h-full rounded-[14px] py-[20px] px-[15px] md:p-[30px] flex flex-col justify-between items-center gap-5 overflow-hidden ${
              currentIndex === index + 1 ? "" : "hidden"
            }`}
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
            <div
              className={`flex items-center justify-center min-h-[370px] min-w-[300px] md:min-h-[440px] md:min-w-[350px] `}
              style={{
                // minHeight: "440px",
                // minWidth: "350px",
                //   background: "red",
                background: `url(${LabPointsFrame}) no-repeat center center / cover`,
              }}
            >
              <div className="text-white text-center z-10 absolute top-[55px] lg:top-[60px] text-[8px] lg:text-[12px] font-[600]">
                <p className="m-0 p-0 tracking-[1px]">You Have</p>
                <h1 className="text-[#009E47] text-[30px] lg:text-[45px] font-[800] m-0 p-0 tracking-[3px]">
                  {totalSum}
                </h1>
                <p className="m-0 p-0 tracking-[1px]">Points</p>
              </div>
              <div
                className={` h-[200px] w-[225px] md:h-[220px] md:w-[260px] mt-24 md:mt-28 overflow-y-scroll hidden-scroll`}
              >
                <div className="grid grid-cols-2 gap-y-4">
                  {allResults?.map((item) =>
                    item.submitter.result.earningParameterData
                      ?.find((data) => data.categoryName === cat)
                      ?.earningItems.map((a, i) => (
                        <>
                          <div className="text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
                            <h1>{itemName[a?.earningItemName]}</h1>
                            <img
                              src={LabCategoryButton}
                              alt="LabCategoryButton"
                            />
                            <h1 className="text-[8px] lg:text-[12px] text-white">
                              {a?.earningItemName}
                            </h1>
                          </div>
                        </>
                      ))
                  )}
                  {allResults?.map((item) =>
                    item.submitter.result.earningParameterData
                      ?.find((data) => data.categoryName === cat)
                      ?.earningItems.map((a, i) => (
                        <>
                          <div className="text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
                            <h1>{itemName[a?.earningItemName]}</h1>
                            <img
                              src={LabCategoryButton}
                              alt="LabCategoryButton"
                            />
                            <h1 className="text-[8px] lg:text-[12px] text-white">
                              {a?.earningItemName}
                            </h1>
                          </div>
                        </>
                      ))
                  )}
                </div>
              </div>
            </div>
            <p className="mt-[-360px] w-[100%] flex justify-between">
              <button className="bg-[#fff] p-1 rounded" onClick={previous}>
                <ArrowBackIosIcon />
              </button>
              <button className="bg-[#fff] p-1 rounded" onClick={forward}>
                <ArrowForwardIosIcon />
              </button>
            </p>
            <p className="mb-[-150px] text-[#fff] text-lg ">
              {cat} : {itemCategorySum[cat]}
            </p>
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
        ))}
      </div>
    </div>
  );
};

export default MyLabPoints;
