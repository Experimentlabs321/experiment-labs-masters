import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import AssignmentUpNev from "../ExecutionMentorAssignments/AssignmentUpNev";
import AssignmentRightNev from "../ExecutionMentorAssignments/AssignmentRightNev";
import hand from "../../../assets/ExecutionMentor/hand.png";
import HumaaansSpace from "../../../assets/ExecutionMentor/HumaaansSpace.png";
import arrowDown from "../../../assets/ExecutionMentor/arrowDown.svg";
import arrowRight from "../../../assets/ExecutionMentor/arrowRight.svg";
import arrowRight1 from "../../../assets/ExecutionMentor/arrowRight1.svg";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { AuthContext } from "../../../contexts/AuthProvider";

const ExecutionMentorDashboard = () => {
  ///
  const [day, setDay] = useState("Monthly");

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  ////////

  const series = [
    {
      name: "series1",
      data: [2.8, 2, 3.5, 2],
    },
  ];

  const Monthly = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const Weekly = ["Sat", "Sun", "Mon", "Tus", "Wed", "Thu", "Fri"];
  const Daily = ["Sat", "Sun", "Mon", "Tus", "Wed", "Thu", "Fri"];

  let labels;
  if (day === "Monthly") {
    labels = Monthly;
  } else if (day === "Weekly") {
    labels = Weekly;
  } else if (day === "Daily") {
    labels = Daily;
  }

  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "text",
      categories: labels,
    },
  };

  const { userInfo, user } = useContext(AuthContext);

  console.log(user);
  return (
    <div>
      <Layout>
        <div className="lg:block hidden">
          <AssignmentUpNev page={""} />
        </div>

        <div className="flex mt-24 ">
          <div className="w-full lg:mx-10 ms-8 mt-10">
            <div
              className="lg:w-full w-[90%]  flex lg:flex-row flex-col items-center lg:justify-between text-[#fff]"
              style={{
                borderRadius: "20px",
                background: "linear-gradient(129deg, #6176FA 0%, #394694 100%)",
              }}
            >
              <div className="p-5 w-[100%] ">
                <p className="flex gap-5 text-[35px] font-bold">
                  Welcome back, {userInfo.name}{" "}
                  <span>
                    <img src={hand} alt=" " />
                  </span>{" "}
                </p>
                <p className="text-[15px] font-normal">
                  You’re on the right track and work through all of your
                  feedbacks to keep yourself up to date.
                  <Link
                    to="/performanceFeedback"
                    className="border-b font-bold"
                  >
                    {" "}
                    View all
                  </Link>
                </p>
              </div>
           
                <div className="w-full">
                  <img
                    className="w-[100%]"
                    src={HumaaansSpace}
                    alt="HumaaansSpace"
                  />
                </div>
             
            </div>

            <div className="mt-10 flex gap-10">
              <div className="lg:w-full w-[90%]">
                <div className="flex justify-between items-center mb-5">
                  <p className="text-[15px] font-bold">Your Performance</p>
                  <p>
                    {" "}
                    <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                      <InputLabel id="demo-select-small-label">
                        Overall
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={day}
                        label="day"
                        onChange={handleChange}
                      >
                        <MenuItem value={"Daily"}>Daily</MenuItem>
                        <MenuItem value={"Weekly"}>Weekly</MenuItem>
                        <MenuItem value={"Monthly"}>Monthly</MenuItem>
                      </Select>
                    </FormControl>
                  </p>
                </div>

                <div id="chart">
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="area"
                    height={350}
                  />
                </div>
              </div>

             {/*  <div className="w-[50%]">
                <div className="flex justify-between items-center">
                  <p className="text-[15px] font-bold">Progress</p>
                  <p className="flex items-center gap-2 text-[13px] font-bold text-[#8A8A8A]">
                    View all{" "}
                    <span>
                      <img src={arrowDown} alt="arrowDown" />
                    </span>
                  </p>
                </div>
                <div className="overflow-auto h-[300px] mt-5">
                  <div className="flex justify-between items-center mt-5">
                    <div>
                      <p className="text-[15px] font-bold">Punctual</p>
                      <p className="text-[10px] font-bold text-[#8A8A8A]">
                        Chapter 3
                      </p>
                    </div>
                    <div className="w-[20%]">
                      <CircularProgressbar
                        value={60}
                        text={`${60}%`}
                        strokeWidth={10}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <div>
                      <p className="text-[15px] font-bold">Task completion </p>
                      <p className="text-[10px] font-bold text-[#8A8A8A]">
                        Chapter 4
                      </p>
                    </div>
                    <div className="w-[20%]">
                      <CircularProgressbar
                        value={60}
                        text={`${60}%`}
                        strokeWidth={10}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <div>
                      <p className="text-[15px] font-bold">Understanding</p>
                      <p className="text-[10px] font-bold text-[#8A8A8A]">
                        Chapter 3
                      </p>
                    </div>
                    <div className="w-[20%]">
                      <CircularProgressbar
                        value={60}
                        text={`${60}%`}
                        strokeWidth={10}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <div>
                      <p className="text-[15px] font-bold">On point</p>
                      <p className="text-[10px] font-bold text-[#8A8A8A]">
                        Chapter 5
                      </p>
                    </div>
                    <div className="w-[20%]">
                      <CircularProgressbar
                        value={60}
                        text={`${60}%`}
                        strokeWidth={10}
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

          {/*   <div className="flex justify-between items-center my-10">
              <p className="text-[15px] font-bold">
                Performance of the Students
              </p>
              <Link
                to="/students"
                className="flex items-center gap-2 text-[13px] font-bold text-[#8A8A8A]"
              >
                View all{" "}
                <span>
                  <img src={arrowDown} alt="arrowDown" />
                </span>
              </Link>
            </div> */}

          {/*   <div className="w-[100%] h-[30px] text-[#fff] flex ">
              <div className="w-[70%] bg-[#081765] flex items-center justify-center rounded-s-xl">
                70%
              </div>
              <div className="w-[10%] bg-[#2063DA] flex items-center justify-center rounded-s-xl ms-[-10px]"></div>
              <div className="w-[5%] bg-[#BEC9FF] flex items-center justify-center rounded-s-xl ms-[-10px]"></div>
              <div className="w-[15%] bg-[#F0F7FF] flex items-center justify-center rounded-xl ms-[-10px]"></div>
            </div> */}

            {/* <div className="grid grid-cols-2 gap-10 mt-10">
              <div className=" bg-[#081765] text-[#fff] p-2 flex justify-between items-center rounded-xl text-sm font-semibold">
                <p>Students, who are right on track</p>
                <p className="flex items-center gap-4">
                  25{" "}
                  <span>
                    <img src={arrowRight1} alt="" />
                  </span>
                </p>
              </div>

              <div className="bg-[#BEC9FF]  p-2 flex justify-between items-center rounded-xl text-sm font-semibold">
                <p>Students, who are willing to improve</p>
                <p className="flex items-center gap-4">
                  25{" "}
                  <span>
                    <img src={arrowRight} alt="" />
                  </span>
                </p>
              </div>

              <div className=" bg-[#2063DA] text-[#fff] p-2 flex justify-between items-center rounded-xl text-sm font-semibold">
                <p>Students, who need guidance</p>
                <p className="flex items-center gap-4">
                  25{" "}
                  <span>
                    <img src={arrowRight1} alt="" />
                  </span>
                </p>
              </div>

              <div className=" bg-[#F0F7FF] p-2 flex justify-between items-center rounded-xl text-sm font-semibold">
                <p>Students, who need guidance right away</p>
                <p className="flex items-center gap-4">
                  25{" "}
                  <span>
                    <img src={arrowRight} alt="" />
                  </span>
                </p>
              </div>
            </div> */}
          {/*   <div className="flex justify-between items-center my-10">
              <p className="text-[15px] font-bold">
                Students who need more guidance and attention
              </p>
              <Link
                to="/studentsWhoNeedMoreGuidance"
                className="flex items-center gap-2 text-[13px] font-bold text-[#8A8A8A]"
              >
                View all{" "}
                <span>
                  <img src={arrowDown} alt="arrowDown" />
                </span>
              </Link>
            </div> */}

           {/*  <div className="flex gap-5 w-full">
              <div className="w-[100%] flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#E90000]">
                <div className="flex gap-3 ">
                  <div className=" w-[40px] bg-[#fff] text-[#000] rounded-full flex items-center justify-center ms-5">
                    <p className="text-[15px] font-bold">JA</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-[15px] font-bold">Janki Akhandiya</p>
                    <p className="text-[10px] font-bold">9.6/10 points</p>
                  </div>
                </div>

                <div className="me-5 text-[10px] font-semibold flex items-end">
                  <p>View Profile</p>
                </div>
              </div>

              <div className="w-[100%] flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#E90000]">
                <div className="flex gap-3 ">
                  <div className=" w-[40px] bg-[#fff] text-[#000] rounded-full flex items-center justify-center ms-5">
                    <p className="text-[15px] font-bold">JA</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-[15px] font-bold">Janki Akhandiya</p>
                    <p className="text-[10px] font-bold">9.6/10 points</p>
                  </div>
                </div>

                <div className="me-5 text-[10px] font-semibold flex items-end">
                  <p>View Profile</p>
                </div>
              </div>

              <div className="w-[100%] flex justify-between py-5 mt-5 rounded-[20px] text-[#fff] bg-[#E90000]">
                <div className="flex gap-3 ">
                  <div className=" w-[40px] bg-[#fff] text-[#000] rounded-full flex items-center justify-center ms-5">
                    <p className="text-[15px] font-bold">JA</p>
                  </div>
                  <div className="mt-1">
                    <p className="text-[15px] font-bold">Janki Akhandiya</p>
                    <p className="text-[10px] font-bold">9.6/10 points</p>
                  </div>
                </div>

                <div className="me-5 text-[10px] font-semibold flex items-end">
                  <p>View Profile</p>
                </div>
              </div>
            </div> */}
          </div>

        {/*   <div>
            <AssignmentRightNev />
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

export default ExecutionMentorDashboard;
