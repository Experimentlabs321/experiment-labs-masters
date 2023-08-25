///PreviousClassHomework


import React, { useContext, useState } from "react";
import play from '../../../../assets/ExpertMentorDashboard/play.svg'
import Arrow2 from '../../../../assets/ExpertMentorDashboard/Arrow2.svg'
import arrow3 from '../../../../assets/ExpertMentorDashboard/arrow3.svg'


const PreviousClassHomework = () => {




    return (
        <div className="flex items-center justify-between gap-5 p-5"
            style={{
                borderRadius: "20px",
                background: "#303031",
                boxShadow: "3.7425336837768555px 11.227601051330566px 25px 0px rgba(93, 110, 255, 0.60)"
            }}
        >
            <div className=" flex flex-col items-center justify-center w-[100%] text-[#fff]">
                <p>Week 1</p>

                <p className=" flex items-center gap-3 p-2 mt-4"
                    style={{
                        borderRadius: "24px",
                        border: "3px solid #FFF"
                    }}
                >
                    <span><img src={play} alt="icon"/></span>
                    Introduction - Why this lab?
                </p>

            </div>

            <div className="bg-[#fff] w-[100%] rounded-lg p-5">
                <p className="text-[#676767] text-base font-semibold">Topic 1</p>
                <p className=" text-base font-bold">Product development</p>

                <p className="text-[#676767] text-base font-semibold mt-3"> 1. What is a product </p>
                <p className="text-[#676767] text-base font-semibold "> 2. How to build a product</p>
                <p className="text-[#676767] text-base font-semibold "> 3. How to sell a product</p>
                <p className="flex justify-end items-center gap-2 text-[#3E4DAC] text-base font-semibold mt-4 me-10">View Full Topic <span><img src={Arrow2} alt="icon"/></span> </p>


            </div>

            <div className="bg-[#fff] w-[100%] rounded-lg p-5">
                <p className="text-[#676767] text-base font-semibold">Topic 2</p>
                <p className=" text-base font-bold">Product development</p>

                <p className="text-[#676767] text-base font-semibold mt-3"> 1. What is a product </p>
                <p className="text-[#676767] text-base font-semibold "> 2. How to build a product</p>
                <p className="text-[#676767] text-base font-semibold "> 3. How to sell a product</p>
                <p className="flex justify-end items-center gap-2 text-[#3E4DAC] text-base font-semibold mt-4 me-10">View Full Topic <span><img src={Arrow2} alt="icon"/></span> </p>


            </div>
            <div className=" flex flex-col items-center justify-center w-[30%] text-[#fff]">
                

                <p className="" >
                    <img src={arrow3} alt="icon"/>    
                </p>

            </div>


        </div>

    );
};

export default PreviousClassHomework;

