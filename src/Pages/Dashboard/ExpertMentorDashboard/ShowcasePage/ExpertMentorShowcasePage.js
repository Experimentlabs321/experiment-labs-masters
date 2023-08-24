
//ExpertMentorShowcasePage

import React, { useContext, useState } from "react";
import Layout from "../../Layout";
import "react-circular-progressbar/dist/styles.css";
import SearchIcon from '@mui/icons-material/Search';

import IconNav from '../../../../assets/ExpertMentorDashboard/Iconnav.svg';
import courseImage from '../../../../assets/ExpertMentorDashboard/courseImage.png';





const ExpertMentorShowcasePage = () => {



    return (
        <div>
            <Layout>

                <div className="px-20  py-5 flex items-center  fixed w-[100%] justify-between bg-[#FFF] top-0  border-b ">

                    <p className="text-[#3E4DAC] text-xl font-bold">Lab Assignment Updates</p>

                    <div className="flex items-center gap-5 me-80 ">
                        <div className=" p-2"
                            style={{
                                borderRadius: "8px",
                                background: "#F8F9FE",
                                boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                            }}
                        >
                            <SearchIcon />
                            <input type="text rounded-lg p-2" placeholder="Search" />
                        </div>

                        <div>
                            <img src={IconNav} alt="Iconnav" />
                        </div>
                    </div>


                </div >

                <div className="mt-32 ms-10">
                    <p>
                        <select className=" py-3 px-8 text-[#676767] text-lg font-semibold" name="" id=""
                            style={{
                                borderRadius: "8px",
                                background: "#F8F9FE",
                                boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                            }}
                        >
                            <option value="Product lab">Product lab </option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </p>
                </div>

                <div className="my-10 ms-10 text-[#3E4DAC]">
                    <p className="text-xl font-semibold">Curriculum With Dual Focus On Tech And Management</p>
                    <p className="text-base font-medium">New Age Concentration</p>
                </div>

                <div className="mt-32 ms-10">
                    <p>
                        <select className=" py-3 px-8 text-[#676767] text-lg font-semibold" name="" id=""
                            style={{
                                borderRadius: "8px",
                                background: "#F8F9FE",
                                boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)"
                            }}
                        >
                            <option value="Batch-1">Batch-1 </option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </p>
                </div>

                <div className="mx-10 grid grid-cols-3 my-10 gap-16 ">

                    <div className=" p-5"
                        style={{
                            borderRadius: "20px",
                            background: "#FFF",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <p className="flex justify-center"><img className="w-full" src={courseImage} alt="img" /></p>
                        <p className="text-lg font-semibold my-2">Automobile Product Design-Car</p>
                        <p className=" flex justify-between items-center text-[#676767] text-base font-medium mb-5"><span>By- Sakshi Pal</span>Batch - 1</p>

                        <p className="text-[#6278FF] text-xs font-medium mt-2 " ><a href="https://www.figma.com/proto/ZkpzU70DzCLYHkdNaiI0R7/Experiment-Labs-Website?">https://www.figma.com/proto</a></p>


                    </div>

                    <div className=" p-5"
                        style={{
                            borderRadius: "20px",
                            background: "#FFF",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <p className="flex justify-center"><img className="w-full" src={courseImage} alt="img" /></p>
                        <p className="text-lg font-semibold my-2">Automobile Product Design-Car</p>
                        <p className=" flex justify-between items-center text-[#676767] text-base font-medium mb-5"><span>By- Sakshi Pal</span>Batch - 1</p>

                        <p className="text-[#6278FF] text-xs font-medium mt-2 " ><a href="https://www.figma.com/proto/ZkpzU70DzCLYHkdNaiI0R7/Experiment-Labs-Website?">https://www.figma.com/proto</a></p>


                    </div>

                    <div className=" p-5"
                        style={{
                            borderRadius: "20px",
                            background: "#FFF",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <p className="flex justify-center"><img className="w-full" src={courseImage} alt="img" /></p>
                        <p className="text-lg font-semibold my-2">Automobile Product Design-Car</p>
                        <p className=" flex justify-between items-center text-[#676767] text-base font-medium mb-5"><span>By- Sakshi Pal</span>Batch - 1</p>

                        <p className="text-[#6278FF] text-xs font-medium mt-2 " ><a href="https://www.figma.com/proto/ZkpzU70DzCLYHkdNaiI0R7/Experiment-Labs-Website?">https://www.figma.com/proto</a></p>


                    </div>

                    <div className=" p-5"
                        style={{
                            borderRadius: "20px",
                            background: "#FFF",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <p className="flex justify-center"><img className="w-full" src={courseImage} alt="img" /></p>
                        <p className="text-lg font-semibold my-2">Automobile Product Design-Car</p>
                        <p className=" flex justify-between items-center text-[#676767] text-base font-medium mb-5"><span>By- Sakshi Pal</span>Batch - 1</p>

                        <p className="text-[#6278FF] text-xs font-medium mt-2 " ><a href="https://www.figma.com/proto/ZkpzU70DzCLYHkdNaiI0R7/Experiment-Labs-Website?">https://www.figma.com/proto</a></p>


                    </div>


                    <div className=" p-5"
                        style={{
                            borderRadius: "20px",
                            background: "#FFF",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <p className="flex justify-center"><img className="w-full" src={courseImage} alt="img" /></p>
                        <p className="text-lg font-semibold my-2">Automobile Product Design-Car</p>
                        <p className=" flex justify-between items-center text-[#676767] text-base font-medium mb-5"><span>By- Sakshi Pal</span>Batch - 1</p>

                        <p className="text-[#6278FF] text-xs font-medium mt-2 " ><a href="https://www.figma.com/proto/ZkpzU70DzCLYHkdNaiI0R7/Experiment-Labs-Website?">https://www.figma.com/proto</a></p>


                    </div>

                    <div className=" p-5"
                        style={{
                            borderRadius: "20px",
                            background: "#FFF",
                            boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.50)"
                        }}
                    >
                        <p className="flex justify-center"><img className="w-full" src={courseImage} alt="img" /></p>
                        <p className="text-lg font-semibold my-2">Automobile Product Design-Car</p>
                        <p className=" flex justify-between items-center text-[#676767] text-base font-medium mb-5"><span>By- Sakshi Pal</span>Batch - 1</p>

                        <p className="text-[#6278FF] text-xs font-medium mt-2 " ><a href="https://www.figma.com/proto/ZkpzU70DzCLYHkdNaiI0R7/Experiment-Labs-Website?">https://www.figma.com/proto</a></p>


                    </div>

                   


                </div>



            </Layout>
        </div >




    );
};

export default ExpertMentorShowcasePage;

