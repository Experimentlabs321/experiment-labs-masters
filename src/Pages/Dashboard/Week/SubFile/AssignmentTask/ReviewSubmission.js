import React, { useRef, useEffect, useState, useContext } from "react";
import Person from "../../../../../assets/Dashboard/ReviewSubmissionPerson.png";
import { Pie } from "react-chartjs-2";
import { Chart, PieController, ArcElement, Tooltip } from "chart.js";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import axios from "axios";
import { saveAs } from "file-saver";
import { CircularProgress } from "@mui/material";

const ReviewSubmission = (taskData) => {
  const { userInfo } = useContext(AuthContext);
  const [submittedResult, setSubmittedResult] = useState();
  const [skillMainValue, setSkillMainValue] = useState({});
  const [earningItemResult, setEarningItemResult] = useState({});
  const [SkillItemResult, setSkillItemResult] = useState({});
  const [mainSkillItem, setMainSkillItem] = useState({});
  const [orgData, setOrgData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // console.log(taskData.taskData.skillParameterData)

  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    // Destroy the previous chart instance when the component is unmounted or the data changes
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  const newEarningItemDataValues = Object.values(earningItemResult);
  const newEarningItemDataLabels = Object.keys(earningItemResult);
  const totalSum = newEarningItemDataValues.reduce(
    (sum, value) => sum + value,
    0
  );

  //
  ///
  console.log(submittedResult);
  console.log(taskData?.taskData._id);
  console.log(userInfo?._id);
  const [value, setvalue] = useState();
  useEffect(() => {
    axios

      /* .get(
        `${process.env.REACT_APP_BACKEND_API}/getSubmitAssignment/submitter/${userInfo?._id}/${taskData?.taskData?._id}`
      ) */
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/assignmentSubmissions/taskId/${taskData?.taskData._id}/submitterId/${userInfo?._id}`
      )
      .then((response) => {
        setSubmittedResult(response?.data[0]);
        setIsLoading(false);
        //   console.log(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo._id, taskData.taskData._id]);

  const review = submittedResult?.submitter?.result?.review;

  console.log(submittedResult?.submitter?.result?.attachFile);
  console.log(submittedResult);
  const colorData = [
    { progressBarColor: "#F0E823" },
    { progressBarColor: "#23F050" },
    { progressBarColor: "#F023DB" },
    { progressBarColor: "#3E4DAC" },
    { progressBarColor: "#B380DC" },
    { progressBarColor: "#D86D6D" },
    { progressBarColor: "#86CF63" },
    // Add more color objects as needed
  ];
  const colorDataChart = [
    { Color: "#86CF63" },
    { Color: "#D86D6D" },
    { Color: "#B380DC" },
    { Color: "#3E4DAC" },
    { Color: "#F0E823" },
    { Color: "#23F050" },
    { Color: "#F023DB" },

    // Add more color objects as needed
  ];
  const [CategoryMainSum, setCategoryMainSum] = useState({});

  useEffect(() => {
    if (taskData) {
      // Initialize an empty object to store category sums
      const categorySumMap = {};

      taskData?.taskData?.skillParameterData?.forEach((item) => {
        const categoryName = item.categoryName;
        const skillSum = item.skills.reduce(
          (sum, skill) => sum + +skill.skillValue,
          0
        );

        // Assign the sum to the category name
        categorySumMap[categoryName] = skillSum;
      });

      // Set the state with the category sums
      setCategoryMainSum(categorySumMap);
    }
  }, [taskData]);

  //console.log(CategoryMainSum)

  /*  useEffect(() => {
     if (submittedResult) {
       // Initialize an empty object to store category sums
       const categorySumMap = {};
 
       submittedResult.submitter.result?.skillParameterData?.forEach((item) => {
         const categoryName = item.categoryName;
         const skillSum = item.skills.reduce((sum, skill) => sum + skill.skillValue, 0);
 
         // Assign the sum to the category name
         categorySumMap[categoryName] = skillSum;
       });
 
       // Set the state with the category sums
      // setCategoryResultSum(categorySumMap);
     }
   }, [submittedResult]); */

  // console.log(CategoryResultSum)

  /*  useEffect(() => {
     if (submittedResult) {
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

  const [earningMainSum, setEarningMainSum] = useState({});

  useEffect(() => {
    if (taskData) {
      // Initialize an empty object to store category sums
      const categorySumMap = {};

      taskData?.taskData?.earningParameterData?.forEach((item) => {
        const categoryName = item.categoryName;
        const skillSum = item.earningItems.reduce(
          (sum, skill) => sum + +skill.itemValue,
          0
        );

        // Assign the sum to the category name
        categorySumMap[categoryName] = skillSum;
      });

      // Set the state with the category sums
      setEarningMainSum(categorySumMap);
    }
  }, [taskData]);

  //console.log(earningMainSum)

  useEffect(() => {
    // Register the required chart elements and controllers
    Chart.register(PieController, ArcElement, Tooltip);

    // Sample data for the chart
    const data = {
      labels: newEarningItemDataLabels,
      datasets: [
        {
          data: newEarningItemDataValues,
          backgroundColor: [
            "#86CF63",
            "#D86D6D",
            "#B380DC",
            "#3E4DAC",
            "#F0E823",
            "#23F050",
            "#F023DB",
          ],
        },
      ],
    };

    // Create a new chart instance
    const newChartInstance = new Chart(chartRef.current, {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        hover: false, // Turn off the hover effect
        tooltips: {
          callbacks: {
            // Remove the data label when hovering
            label: function (context) {
              return "";
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
          tooltip: {
            enabled: false, // Disable the default tooltip behavior
          },
        },
        elements: {
          arc: {
            borderWidth: 0, // Remove the border
          },
        },
        layout: {
          padding: {
            left: 50,
            right: 50,
          },
        },
      },
    });

    // Save the new chart instance in state
    setChartInstance(newChartInstance);

    // Clean up the chart instance on component unmount
    return () => {
      newChartInstance.destroy();
    };
  }, [taskData, totalSum]);

  console.log(newEarningItemDataValues);
  console.log(newEarningItemDataLabels);

  useEffect(() => {
    if (submittedResult) {
      // Initialize an empty object to store category sums
      const earningItemName = {};

      submittedResult?.submitter?.result?.earningParameterData?.map((item) => {
        //  console.log(item.earningItems)
        item.earningItems.forEach(
          (m) => {
            const earningName = m.earningItemName;
            earningItemName[earningName] = m.itemValue;
          }

          // console.log(m.earningItemName)
        );
        setEarningItemResult(earningItemName);
      });
    }
  }, [submittedResult]);
  //console.log(earningItemResult)

  const newSkillItemDataLabels = Object.keys(SkillItemResult);
  const newSkillItemDataValues = Object.values(SkillItemResult);

  useEffect(() => {
    if (submittedResult) {
      // Initialize an empty object to store category sums
      const skillName = {};

      submittedResult?.submitter?.result?.skillParameterData?.map((item) => {
        //  console.log(item.earningItems)
        item.skills?.forEach(
          (m) => {
            const earningName = m.skillName;
            skillName[earningName] = m.skillValue;
          }

          // console.log(m.earningItemName)
        );
        setSkillItemResult(skillName);
      });
    }
  }, [submittedResult]);
  console.log(newSkillItemDataLabels);
  console.log(newSkillItemDataValues);

  const mainSkillItemDataLabels = Object.keys(mainSkillItem);
  const mainSkillItemDataValues = Object.values(mainSkillItem);

  useEffect(() => {
    if (taskData) {
      // Initialize an empty object to store category sums
      const skillName = {};

      taskData?.taskData?.skillParameterData?.map((item) => {
        //  console.log(item.earningItems)
        item.skills?.forEach(
          (m) => {
            const earningName = m.skillName;
            skillName[earningName] = m.skillValue;
          }

          // console.log(m.earningItemName)
        );
        setMainSkillItem(skillName);
      });
    }
  }, [taskData]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  console.log(mainSkillItemDataLabels);
  console.log(mainSkillItemDataValues);

  function formatDateTime(dateTimeString) {
    const dateObject = new Date(dateTimeString);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour format with AM/PM
    };

    return dateObject.toLocaleString("en-US", options);
  }

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  const handleDownload = async () => {
    try {
      // If there's an ongoing download, cancel it
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Download cancelled");
      }

      const cancelToken = axios.CancelToken.source();
      setCancelTokenSource(cancelToken);

      const response = await axios.get(
        submittedResult?.submitter?.result?.attachFile,
        {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setDownloadProgress(percentCompleted);
          },
          cancelToken: cancelToken.token,
        }
      );

      // Determine file name and extension
      const fileName = submittedResult?.submitter?.result?.attachFile
        .split("/")
        .pop();
      const fileExtension = fileName.split(".").pop();
      const mimeType = getMimeType(fileExtension);

      // Create Blob with response data
      const blob = new Blob([response.data], { type: mimeType });

      // Save file
      saveAs(blob, fileName);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Download cancelled:", error.message);
      } else {
        console.error("Error downloading the file:", error);
      }
    } finally {
      setCancelTokenSource(null);
      setDownloadProgress(0);
    }
  };
  // Helper function to get MIME type based on file extension
  const getMimeType = (extension) => {
    switch (extension.toLowerCase()) {
      case "pdf":
        return "application/pdf";
      case "doc":
      case "docx":
        return "application/msword";
      case "xls":
      case "xlsx":
        return "application/vnd.ms-excel";
      case "ppt":
      case "pptx":
        return "application/vnd.ms-powerpoint";
      default:
        return "application/octet-stream";
    }
  };
  useEffect(() => {
    // Cleanup the download if component unmounts or submittedResult?.submitter?.result?.attachFile changes
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Download cancelled due to component unmount");
      }
    };
  }, [submittedResult?.submitter?.result?.attachFile, cancelTokenSource]);

  return (
    <>
      {isLoading ? (
        <div className=" flex align-items-center my-5 py-5">
          <CircularProgress className="w-full mx-auto" />
        </div>
      ) : (
        <div>
          {submittedResult?.submitter?.result && (
            <div className=" lg:grid grid-cols-12 ">
              <div className=" col-span-8 px-4 py-[45px] ">
                {submittedResult?.submitter?.result?.review && (
                  <div className=" shadow-lg mb-[45px] ">
                    <div className=" p-[33px] bg-[#F1F3FF] text-[16px] font-[400] rounded-t-[5px] ">
                      <p>{review?.feedback}</p>
                      <p>{submittedResult?.submitter?.result?.status}</p>
                    </div>
                    <div className=" py-[16px] px-[25px] flex items-center gap-[20px] ">
                      <img
                        className=" w-[42px] h-[42px] rounded-full object-cover "
                        src={review?.resultSubmitterPhotoURL}
                        alt="Person"
                      />
                      <div>
                        <h1 className=" text-[18px] font-[600] ">
                          {review?.resultSubmitterName}
                        </h1>
                        <h2 className=" text-[#7C7C7C] text-[16] font-[400] ">
                          {formatDateTime(review?.dateAndTime)}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
                {!submittedResult?.submitter?.result?.review && (
                  <div className=" shadow-lg mb-[45px] ">
                    <div className=" p-[33px] bg-[#F1F3FF] text-[16px] font-[400] rounded-t-[5px] ">
                      <p>{submittedResult?.submitter?.result?.feedback}</p>
                      <p>{submittedResult?.submitter?.result?.status}</p>
                    </div>
                    <div className=" py-[16px] px-[25px] flex items-center gap-[20px] ">
                      <img
                        className=" w-[42px] h-[42px] rounded-full object-cover "
                        src={
                          submittedResult?.submitter?.result
                            ?.resultSubmitterPhotoURL
                        }
                        alt="Person"
                      />
                      <div>
                        <h1 className=" text-[18px] font-[600] ">
                          {
                            submittedResult?.submitter?.result
                              ?.resultSubmitterName
                          }
                        </h1>
                        <h2 className=" text-[#7C7C7C] text-[16] font-[400] ">
                          {formatDateTime(
                            submittedResult?.submitter?.result?.dateAndTime
                          )}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}

                {/* z */}
                {submittedResult?.submitter?.result?.attachFile && (
                  <div className="flex justify-end me-20 my-10">
                    <button
                      className="bg-blue text-white p-3 rounded-lg text-xl"
                      onClick={cancelTokenSource ? null : handleDownload}
                      disabled={cancelTokenSource !== null}
                    >
                      {cancelTokenSource
                        ? `Downloading... ${downloadProgress}%`
                        : "Download File"}
                    </button>
                    {cancelTokenSource && (
                      <button
                        className="border p-3 rounded-lg text-xl ml-4"
                        onClick={() => {
                          cancelTokenSource.cancel(
                            "Download cancelled by user"
                          );
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    {/*  {downloadProgress > 0 && (
             <div className="ml-4 flex items-center">
               <p>{downloadProgress}%</p>
             </div>
           )} */}
                  </div>
                )}
              </div>
              {(orgData?.showPointsAndRedemptions ||
                orgData?.showSkillsManagement) && (
                <>
                  {submittedResult?.submitter?.result && (
                    <div className=" col-span-4 pl-6 2xl:pl-10 ">
                      <div className=" py-[28px] w-full h-full shadow-lg ">
                        {orgData?.showSkillsManagement && (
                          <div className="pb-[40px] border-b-[1px] px-[24px] ">
                            <h1 className="flex items-center gap-[16px] text-[#3E4DAC] text-[18px] font-[700] ">
                              Item Earning Parameter{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M4.83333 7.25122L9.66667 12.0846L14.5 7.25122"
                                  stroke="#282828"
                                  stroke-width="1.61111"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </h1>
                            <div
                              className="flex items-center justify-center mx-auto"
                              style={{ width: "250px", height: "200px" }}
                            >
                              <canvas ref={chartRef} />
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="bg-white w-[115px] h-[115px] mt-[-198px] text-center rounded-full flex flex-col items-center justify-center  ">
                                <h1 className="text-[#3E4DAC] text-[27px] font-[700] ">
                                  {totalSum}
                                </h1>
                                <h1 className=" text-[#717171] text-[12px] font-[500] ">
                                  Points
                                </h1>
                              </div>
                            </div>
                            <div className=" w-[230px] mx-auto ">
                              <h1 className="text-[16px] font-[600] ">
                                Total Points Earned
                              </h1>
                              {/*    {submittedResult?.submitter?.result?.earningParameterData?.map((item, index) => (
 
                       item.earningItems.map(ma =>
                       (
                         <>
                          
                         </>
                       )
                       )
 
 
                     ))} */}
                              {/*   {
                        submittedResult?.submitter?.result?.earningParameterData.map((item) => (
                        // console.log(item.earningItems)
                        //<p>{item.categoryName}</p>
                         item?.earningItems.map((ma,index) =>
                           (
                             < div className="flex items-center justify-between text-[15] font-[500] key={index} " >
                             <div className="flex items-center gap-[12px] ">
                               <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="7"
                                 height="7"
                                 viewBox="0 0 7 7"
                                 fill="none"
                               >
                                 <circle cx="3.5" cy="3.5" r="3.5" fill={`${colorDataChart[index].Color}`} />
                               </svg>
                               
                               <h1>{ma?.earningItemName}</h1>
 
                             </div>
 
                             <h1 className="text-[#3E4DAC]">{ma?.itemValue}</h1>
                           </div>
                           )
                         )
                 
                         // Assign the sum to the category name
                         //  categorySumMap[categoryName] = skillSum;
                        ))
                     } */}

                              {newEarningItemDataLabels.map((item, index) => (
                                <div className="flex items-center justify-between text-[15] font-[500] key={index} ">
                                  <div className="flex items-center gap-[12px] ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="7"
                                      height="7"
                                      viewBox="0 0 7 7"
                                      fill="none"
                                    >
                                      <circle
                                        cx="3.5"
                                        cy="3.5"
                                        r="3.5"
                                        fill={`${colorDataChart[index].Color}`}
                                      />
                                    </svg>

                                    <h1>{item}</h1>
                                  </div>

                                  <h1 className="text-[#3E4DAC]">
                                    {newEarningItemDataValues[index]}
                                  </h1>
                                </div>
                              ))}

                              {/* <div className="flex items-center justify-between text-[15] font-[500] ">
                     <div className="flex items-center gap-[12px] ">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="7"
                         height="7"
                         viewBox="0 0 7 7"
                         fill="none"
                       >
                         <circle cx="3.5" cy="3.5" r="3.5" fill="#B380DC" />
                       </svg>
                       <h1>Challenge Submission</h1>
                     </div>
                     <h1 className="text-[#3E4DAC]">40</h1>
                   </div> */}
                              {/*   <div className="flex items-center justify-between text-[15] font-[500] ">
                     <div className="flex items-center gap-[12px] ">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="7"
                         height="7"
                         viewBox="0 0 7 7"
                         fill="none"
                       >
                         <circle cx="3.5" cy="3.5" r="3.5" fill="#D86D6D" />
                       </svg>
                       <h1>Creativity</h1>
                     </div>
                     <h1 className="text-[#3E4DAC]">25</h1>
                   </div>
                   <div className="flex items-center justify-between text-[15] font-[500] ">
                     <div className="flex items-center gap-[12px] ">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="7"
                         height="7"
                         viewBox="0 0 7 7"
                         fill="none"
                       >
                         <circle cx="3.5" cy="3.5" r="3.5" fill="#86CF63" />
                       </svg>
                       <h1>Delight</h1>
                     </div>
                     <h1 className="text-[#3E4DAC]">5</h1>
                   </div> */}
                            </div>
                          </div>
                        )}

                        {orgData?.showPointsAndRedemptions && (
                          <div className=" px-[24px] pt-[30px]">
                            <h1 className="flex items-center gap-[16px] mb-[10px] text-[#3E4DAC] text-[18px] font-[700] ">
                              Skill Based Parameter{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M4.83333 7.25122L9.66667 12.0846L14.5 7.25122"
                                  stroke="#282828"
                                  stroke-width="1.61111"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </h1>
                            {newSkillItemDataLabels?.map((item, index) => (
                              <div className="w-full mt-[24px]" key={index}>
                                <h1 className="text-[15] pb-[10px] flex items-center justify-between font-[500]">
                                  {item} {}
                                  <span className="text-[#3E4DAC]">
                                    {Math.round(
                                      (100 * SkillItemResult[item]) /
                                        +mainSkillItem[item]
                                    )}{" "}
                                    %
                                  </span>
                                </h1>
                                <div
                                  className={`w-full bg-[#EEEEEE] rounded-lg h-2`}
                                >
                                  <div
                                    className={`bg-[${colorData[index].progressBarColor}] h-2 rounded-lg`}
                                    style={{
                                      width: `${Math.round(
                                        (100 * SkillItemResult[item]) /
                                          +mainSkillItem[item]
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                            {/*  <div className="w-full mt-[24px]">
                   <h1 className=" text-[15] pb-[10px] flex items-center justify-between font-[500]">
                     Verbal Communication{" "}
                     <span className="text-[#3E4DAC]">25%</span>
                   </h1>
                   <div className="relative w-full">
                     <div className="w-full bg-[#EEEEEE] rounded-lg h-2">
                       <div
                         className="bg-[#F0E823] h-2 rounded-lg"
                         // className="bg-cyan-600 h-2 rounded-sm"
                         // style={{ width: `${p}%` }}
                         style={{ width: "25%" }}
                       ></div>
                     </div>
                   </div>
                 </div>
                 <div className="w-full mt-[24px]">
                   <h1 className=" text-[15] pb-[10px] flex items-center justify-between font-[500]">
                     Leadership <span className="text-[#3E4DAC]">25%</span>
                   </h1>
                   <div className="relative w-full">
                     <div className="w-full bg-[#EEEEEE] rounded-lg h-2">
                       <div
                         className="bg-[#23F050] h-2 rounded-lg"
                         // className="bg-cyan-600 h-2 rounded-sm"
                         // style={{ width: `${p}%` }}
                         style={{ width: "25%" }}
                       ></div>
                     </div>
                   </div>
                 </div>
                 <div className="w-full mt-[24px]">
                   <h1 className=" text-[15] pb-[10px] flex items-center justify-between font-[500]">
                     Active Listening <span className="text-[#3E4DAC]">25%</span>
                   </h1>
                   <div className="relative w-full">
                     <div className="w-full bg-[#EEEEEE] rounded-lg h-2">
                       <div
                         className="bg-[#F023DB] h-2 rounded-lg"
                         // className="bg-cyan-600 h-2 rounded-sm"
                         // style={{ width: `${p}%` }}
                         style={{ width: "25%" }}
                       ></div>
                     </div>
                   </div>
                 </div> */}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {!submittedResult?.submitter?.result && (
            <p className=" text-3xl font-bold text-center mt-12">
              Result pending
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ReviewSubmission;
