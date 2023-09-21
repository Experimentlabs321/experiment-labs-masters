import React, { useContext, useEffect, useRef, useState } from "react";
import Statement from "./Statement";
import RightArrowBlack from "../../../assets/Dashboard/RightArrowBlack.png";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import LabPointsImg from "../../../assets/Dashboard/LabPoints.png";
import LabPointsCardBottomImg from "../../../assets/Dashboard/LabPointsCardBottomImg.png";
import LabPointsCardTopImg from "../../../assets/Dashboard/LabPointsCardTopImg.png";
import MilestonesStar from "../../../assets/Dashboard/MilestonesStar.png";
import MilestonesBg from "../../../assets/Dashboard/MilestonesBg.png";
import Milestones from "../../../assets/Dashboard/Milestones.png";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";


const LabPoints = () => {

  const { id } = useParams();
  const { userInfo, user } = useContext(AuthContext)
  console.log(userInfo._id)

  const [allResults, setAllResult] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/getSubmitAssignment/all/${userInfo._id}`)
      .then((response) => {

        // setAssignment(response?.data)

        const collection = response?.data.filter((item) => (item?.submitter?.result?.earningParameterData))
        setAllResult(collection)
        //console.log(a)


      })
      .catch((error) => console.error(error));
  }, [userInfo._id]);

  console.log(allResults)
  ////////////////////////////
  const [currentIndex, setCurrentIndex] = useState(1);
  const [CategoryName, setCategoryName] = useState({});



  const allCategoryNames = Object.keys(CategoryName);
  // const mainSkillItemDataValues = Object.values(mainSkillItem);

  useEffect(() => {
    if (allResults) {
      // Initialize an empty object to store category sums
      const CategoryName = {};

      allResults?.map((item) => {
        //  console.log(item.earningItems)
        item.submitter.result.earningParameterData?.forEach(m => {
          const earningName = m.categoryName;
          CategoryName[earningName] = 2;
        }


          // console.log(m.earningItemName)
        )
        setCategoryName(CategoryName)

      });

    }
  }, [allResults]);
  console.log(allCategoryNames)





  /*  useEffect(() => {
     if (allResults) {
       // Initialize an empty object to store category sums
       const categorySumMap = {};
 
       submittedResult.submitter.result?.earningParameterData?.forEach((item) => {
         const categoryName = item.categoryName;
         const skillSum = item.earningItems.reduce((sum, skill) => sum + skill.itemValue, 0);
 
         // Assign the sum to the category name
         categorySumMap[categoryName] = skillSum;
       });
 
       // Set the state with the category sums
      // setEarningItemResult(categorySumMap);
     }
   }, [submittedResult]); */

  //console.log(earningItemResult)

  const [itemName, setItemName] = useState({});
  const [newValue, setNewValue] = useState();
  /*  useEffect(() => {
     if (allResults) {
       // Initialize an empty object to store category sums
       const earningItemsName = {};
 
       allResults?.map((item) => {
       
 
         (item.submitter.result.earningParameterData?.map((data,i) =>
           data?.earningItems.forEach((a) => {
             console.log(a.earningItemName)
 
             const earningName = a.earningItemName;
 
 
             earningItemsName[earningName] = a.itemValue;
             console.log(earningItemsName[earningName])
            
 
 
         
 
           })
 
         ))
 
         // console.log(m.earningItemName)
 
        setItemName(earningItemsName)
 
       });
 
     }
   }, [allResults]);
 
   console.log(itemName) */


  useEffect(() => {
    if (allResults) {
      // Initialize an empty object to store category sums
      const earningItemsName = {};

      allResults.forEach((item) => {
        item.submitter.result.earningParameterData?.forEach((data) => {
          data?.earningItems.forEach((a) => {
            const earningName = a.earningItemName;

            // If earningName already exists in earningItemsName, add itemValue to the existing value, otherwise, set it to itemValue
            if (earningItemsName.hasOwnProperty(earningName)) {
              earningItemsName[earningName] += a.itemValue;
            } else {
              earningItemsName[earningName] = a.itemValue;
            }
          });
        });
      });

      // Store the result in the state variable itemName
      setItemName(earningItemsName);
    }
  }, [allResults]);

  console.log(itemName);
  const [itemCategorySum, setItemCategorySum] = useState({});

  useEffect(() => {
    if (allResults) {
      // Initialize an empty object to store category sums
      const CategoryName = {};

      allResults?.map((item) => {
        //  console.log(item.earningItems)
        item.submitter.result.earningParameterData?.forEach(m => {
          const earningName = m.categoryName;
          const earningSum = m.earningItems.reduce((sum, skill) => sum + itemName[skill.earningItemName], 0);
          CategoryName[earningName] = earningSum;
        }


          // console.log(m.earningItemName)
        )
        setItemCategorySum(CategoryName)

      });

    }
  }, [allResults, itemName]);
  console.log(itemCategorySum)

  const itemValue = Object.values(itemCategorySum);
  //const newEarningItemDataLabels = Object.keys(earningItemResult);
  const totalSum = itemValue.reduce((sum, value) => sum + value, 0);
  console.log(totalSum)

  const previous = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const forward = () => {
    if (currentIndex < allCategoryNames.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  console.log(allCategoryNames)

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-4 justify-between lg:h-[700px] mt-[56px] mb-5 lg:mb-0">
        <div className="w-[340px] lg:w-[490px]  min-w-[250px] lg:min-w-min lg:h-[575px] h-[500px] relative">
          <h1 className="text-[18px] lg:text-[25px] font-[700] lg:text-center pb-[32px]">
            My Lab Points
          </h1>




          {/*  <button onClick={previous} className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md">
                <i className="fas fa-chevron-left text-2xl font-bold text-gray-500"></i>
              </button> */}

          {/*     <button onClick={forward} className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md">
                <i className="fas fa-chevron-right text-2xl font-bold text-gray-500"></i>
              </button> */}

          {/* <div className=" " > */}


          {allCategoryNames.map((cat, index) => (
            <div
              style={{
                filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
              }}
              key={index}
              className={`mt-20 bg-[#082270] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5 overflow-hidden absolute top-0 ${currentIndex === index + 1 ? "" : "hidden"}`}
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
                  {totalSum}
                </h1>
                <p className="m-0 p-0 tracking-[1px]">Points</p>
              </div>
              <img className="z-0" src={LabPointsImg} alt="LabPointsImg" />

              {
                allResults?.map((item) => (


                  (item.submitter.result.earningParameterData?.find((data) => data.categoryName === cat))?.earningItems.map((a, i) => (


                    <>
                      <div className="absolute top-[172px] lg:top-[195px] left-[50px] lg:left-[107px] text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
                        <h1>{itemName[a?.earningItemName]}</h1>
                        <h1 className="text-[8px] lg:text-[12px] text-white mt-[37px]">
                          {a?.earningItemName}
                        </h1>
                      </div>
                      {/* <div className="absolute top-[172px] lg:top-[195px] left-[180px] lg:left-[252px] text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
                        <h1>150</h1>
                        <h1 className="text-[8px] lg:text-[12px] text-white mt-[37px]">
                          Challenge Submission
                        </h1>
                      </div> */}
                    </>




                  ))

                ))

              }


              {/*   {
                allResults?.map((item) => (
                

                  (item.submitter.result.earningParameterData?.find((data) => data.categoryName === cat))?.earningItems.map((a) => (
                   
                    

                    <div className="absolute top-[172px] lg:top-[195px] left-[50px] lg:left-[107px] text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
                      <h1>{itemName[a?.earningItemName]}</h1>
                      <h1 className="text-[8px] lg:text-[12px] text-white mt-[37px]">
                        {a?.earningItemName}
                      </h1>
                    </div>



                  ))

                ))

              } */}
              {/*    <div className="absolute top-[172px] lg:top-[195px] left-[50px] lg:left-[107px] text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
                <h1>200</h1>
                <h1 className="text-[8px] lg:text-[12px] text-white mt-[37px]">
                  Attendance
                </h1>
              </div> */}
              {/*  <div className="absolute top-[172px] lg:top-[195px] left-[180px] lg:left-[252px] text-[#FF0303] text-[13px] lg:text-[20px] tracking-[1px] font-[700] flex flex-col items-center justify-center w-[100px] lg:w-[120px] text-center">
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
                      </div> */}
              <p className="mt-[-360px] w-[100%] flex justify-between">
                <button className="bg-[#fff] p-1 rounded" onClick={previous}><ArrowBackIosIcon /></button>
                <button className="bg-[#fff] p-1 rounded" onClick={forward}><ArrowForwardIosIcon /></button>

              </p>
              <p className="mb-[-150px] text-[#fff] text-lg ">{cat} : {itemCategorySum[cat]}</p>
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
              {/* </div> */}



            </div>
          ))}
          {/* </div> */}





          {/*    {
            allResults?.map((allResult) => (
              allResult.submitter.result.earningParameterData?.map((data) => (
                <p>{data.categoryName}</p>
              ))
            ))
          } */}
          {/*  <div
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
          </div> */}
        </div>







        {/* </div> */}





        <div className="w-[340px] lg:mt-0 mt-20 lg:w-[490px] min-w-[250px] lg:min-w-min lg:h-[575px] relative">
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
