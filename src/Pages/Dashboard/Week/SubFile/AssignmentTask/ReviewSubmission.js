import React, { useRef, useEffect, useState } from "react";
import Person from "../../../../../assets/Dashboard/ReviewSubmissionPerson.png";
import { Pie } from "react-chartjs-2";
import { Chart, PieController, ArcElement, Tooltip } from "chart.js";

const ReviewSubmission = () => {
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

  useEffect(() => {
    // Register the required chart elements and controllers
    Chart.register(PieController, ArcElement, Tooltip);

    // Sample data for the chart
    const data = {
      labels: ["Delight", "Creativity", "Challenge Submission"],
      datasets: [
        {
          data: [5, 25, 40],
          backgroundColor: ["#86CF63", "#D86D6D", "#B380DC"],
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
  }, []);
  return (
    <div>
      <div className=" grid grid-cols-12 ">
        <div className=" col-span-8 px-4 py-[45px] ">
          <div className=" shadow-lg mb-[45px] ">
            <div className=" p-[33px] bg-[#F1F3FF] text-[16px] font-[400] rounded-t-[5px] ">
              <p>
                Lorem ipsum dolor sit amet consectetur. Fermentum nibh amet dui
                diam nullam. Dignissim consectetur felis rhoncus at urna quis.
                Commodo ornare arcu sodales tempus enim nulla quisque id. Varius
                odio nulla vestibulum diam adipiscing. Tortor ipsum mollis
                elementum eleifend dui fringilla suspendisse integer
                condimentum. Consectetur non in ultricies sapien aliquam.Commodo
                ornare arcu sodales tempus enim nulla quisque id. Varius odio
                nulla vestibulum diam adipiscing. Tortor ipsum mollis elementum
                eleifend dui fringilla suspendisse integer condimentum.
                Consectetur non in ultricies sapien aliquam.
              </p>
            </div>
            <div className=" py-[16px] px-[25px] flex items-center gap-[20px] ">
              <img
                className=" w-[42px] h-[42px] rounded-full object-cover "
                src={Person}
                alt="Person"
              />
              <div>
                <h1 className=" text-[18px] font-[600] ">Bimil Joseph</h1>
                <h2 className=" text-[#7C7C7C] text-[16] font-[400] ">
                  21st July 11:03 am
                </h2>
              </div>
            </div>
          </div>
          <div className=" shadow-lg mb-[45px] ">
            <div className=" p-[33px] bg-[#F1F3FF] text-[16px] font-[400] rounded-t-[5px] ">
              <p>
                Lorem ipsum dolor sit amet consectetur. Fermentum nibh amet dui
                diam nullam. Dignissim consectetur felis rhoncus at urna quis.
                Commodo ornare arcu sodales tempus enim nulla quisque id. Varius
                odio nulla vestibulum diam adipiscing. Tortor ipsum mollis
                elementum eleifend dui fringilla suspendisse integer
                condimentum. Consectetur non in ultricies sapien aliquam.Commodo
                ornare arcu sodales tempus enim nulla quisque id. Varius odio
                nulla vestibulum diam adipiscing. Tortor ipsum mollis elementum
                eleifend dui fringilla suspendisse integer condimentum.
                Consectetur non in ultricies sapien aliquam.
              </p>
            </div>
            <div className=" py-[16px] px-[25px] flex items-center gap-[20px] ">
              <img
                className=" w-[42px] h-[42px] rounded-full object-cover "
                src={Person}
                alt="Person"
              />
              <div>
                <h1 className=" text-[18px] font-[600] ">Bimil Joseph</h1>
                <h2 className=" text-[#7C7C7C] text-[16] font-[400] ">
                  21st July 11:03 am
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-4 pl-6 2xl:pl-10 ">
          <div className=" py-[28px] w-full h-full shadow-lg ">
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
                  <h1 className="text-[#3E4DAC] text-[27px] font-[700] ">70</h1>
                  <h1 className=" text-[#717171] text-[12px] font-[500] ">
                    Points
                  </h1>
                </div>
              </div>
              <div className=" w-[230px] mx-auto ">
                <h1 className="text-[16px] font-[600] ">Total Points Earned</h1>
                <div className="flex items-center justify-between text-[15] font-[500] ">
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
                </div>
              </div>
            </div>
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
              <div className="w-full mt-[24px]">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmission;
