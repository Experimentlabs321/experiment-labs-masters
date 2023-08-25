//Overall

import React, { useContext, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import eye from '../../../../assets/ExpertMentorDashboard/eye.svg';
import img2 from '../../../../assets/ExpertMentorDashboard/img2.png';




const Overall = () => {


    return (
        <div>

            <>
                <div className="my-10 flex gap-10 mx-10">
                    <div className="w-[65%]">
                    <div className=" py-10"
                        style={{
                            borderRadius: "20px",
                            background: "#081765",
                            boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.25)"
                        }}
                    >
                        <div className=" flex justify-end">
                            <div className=" flex p-5 text-xl font-semibold gap-10 mx-10 w-[75%]"

                            >
                                <p className="w-[90%] text-center bg-[#fff] py-2 rounded-xl">Product Lab</p>
                                <p className="w-[90%] text-center bg-[#fff] py-2 rounded-xl ">Business Lab</p>
                                <p className="w-[90%] text-center bg-[#fff] py-2 rounded-xl ">Creative Lab</p>



                            </div>
                        </div>


                        <div className=" flex gap-5 mx-5 text-lg font-semibold">

                            <div className=" w-[20%] flex items-center justify-center text-[#fff] rounded-xl border border-[#fff]  ">

                                <p className="w-[100%] text-center text-lg font-semibold ">Batch-1</p>
                            </div>

                            <div className=" w-[100%] flex p-3 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>
                        <div className=" flex gap-5 mx-5 text-lg font-semibold mt-3">

                            <div className=" w-[20%] flex items-center justify-center text-[#fff] rounded-xl border border-[#fff]  ">

                                <p className="w-[100%] text-center text-lg font-semibold ">Batch-1</p>
                            </div>

                            <div className=" w-[100%] flex p-3 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>
                        <div className=" flex gap-5 mx-5 text-lg font-semibold mt-3">

                            <div className=" w-[20%] flex items-center justify-center text-[#fff] rounded-xl border border-[#fff]  ">

                                <p className="w-[100%] text-center text-lg font-semibold ">Batch-1</p>
                            </div>

                            <div className=" w-[100%] flex p-3 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>
                        <div className=" flex gap-5 mx-5 text-lg font-semibold mt-3">

                            <div className=" w-[20%] flex items-center justify-center text-[#fff] rounded-xl border border-[#fff]  ">

                                <p className="w-[100%] text-center text-lg font-semibold ">Batch-1</p>
                            </div>

                            <div className=" w-[100%] flex p-3 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>
                        <div className=" flex gap-5 mx-5 text-lg font-semibold mt-3">

                            <div className=" w-[20%] flex items-center justify-center text-[#fff] rounded-xl border border-[#fff]  ">

                                <p className="w-[100%] text-center text-lg font-semibold ">Batch-1</p>
                            </div>

                            <div className=" w-[100%] flex p-3 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>


                 
                    </div>
                       
                    </div>
                    <div className="w-[30%] flex flex-col items-center gap-2 p-4"
                        style={{
                            borderRadius: "20px",
                            background: "#FFF",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <p className="text-lg font-semibold">Best performer </p>
                        <p>
                            <img src={img2} alt="img" />
                        </p>
                        <p className="text-[#3E4DAC] text-xl font-bold">BATCH - 2</p>
                        <p className="text-[#676767] text-base font-medium">Overall achieved - 90%</p>
                        <p className="text-[#676767] text-base font-medium">Product Lab</p>
                        <p className="text-[#676767] text-xs font-medium">Give Feedback to the class to boost their endeavours !</p>


                    </div>

                </div>

            

            </>


        </div >




    );
};

export default Overall;

