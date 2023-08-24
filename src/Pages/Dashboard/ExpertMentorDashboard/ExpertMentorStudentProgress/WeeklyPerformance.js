//WeeklyPerformance



import React, { useContext, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import eye from '../../../../assets/ExpertMentorDashboard/eye.svg';
import img2 from '../../../../assets/ExpertMentorDashboard/img2.png';




const WeeklyPerformance = () => {


    return (
        <div>

            <>
                <div className="my-10 flex mx-10">
                    <div className="w-[100%] py-10"
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


                        <div className=" flex gap-10 mx-10 text-lg font-semibold">

                            <div className=" w-[20%] flex items-center justify-center text-[#fff] rounded-xl border border-[#fff]  ">

                                <p className="w-[100%] text-center text-lg font-semibold ">Batch-1</p>
                            </div>

                            <div className=" w-[100%] flex p-5 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>

                        <div className=" flex justify-end mx-10 text-lg font-semibold mt-5">

                            <div className=" w-[81%] flex p-5 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>
                        <div className=" flex justify-end mx-10 text-lg font-semibold mt-5">

                            <div className=" w-[81%] flex p-5 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>


                        <div className=" flex gap-10 mx-10 text-lg font-semibold mt-5">

                            <div className=" w-[20%] flex items-center justify-center text-[#fff] rounded-xl border border-[#fff]  ">

                                <p className="w-[100%] text-center text-lg font-semibold ">Batch-2</p>
                            </div>

                            <div className=" w-[100%] flex p-5 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>

                        <div className=" flex justify-end mx-10 text-lg font-semibold mt-5">

                            <div className=" w-[81%] flex p-5 rounded-xl border border-[#fff] text-[#fff] ">
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved</p>
                                <p className="w-[100%] text-center border-e-2">WEEK 1 : 50 % achieved </p>
                                <p className="w-[100%] text-center ">WEEK 1 : 50 % achieved</p>

                            </div>

                        </div>
                     

                        {/*   <table className=" w-[90%]  text-xl font-medium text-[#fff] bg-[]"
                            style={{
                                borderRadius: "20px",
                                background: "#0E2749",
                                boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.25)"
                            }}
                        >
                            <tr>
                                <th className="border border-[#D9D9D9] p-4"> </th>
                                <th className="border border-[#D9D9D9] p-4"> Product Lab</th>
                                <th className="border border-[#D9D9D9] p-4"> Business Lab</th>
                                <th className="border border-[#D9D9D9] p-4"> Creative Lab</th>
                            </tr>
                            <tr>
                                <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                <td className="border border-[#D9D9D9] p-4">50 % achieved</td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                            </tr>
                            <tr>
                                <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                            </tr>
                            <tr>
                                <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                            </tr>
                            <tr>
                                <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                            </tr>
                            <tr>
                                <td className="border border-[#D9D9D9] p-4">Batch-1</td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                                <td className="border border-[#D9D9D9] p-4"></td>
                            </tr>
                        </table> */}
                    </div>


                </div>



            </>


        </div >




    );
};

export default WeeklyPerformance;

