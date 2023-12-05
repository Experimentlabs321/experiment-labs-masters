import React from 'react';

import { Link } from "react-router-dom";



const YourAdvice = ({ yourAdviceData }) => {


    return (
        <div className="bg-[#FFC062]">
            <div className="mx-[50px] flex items-center gap-10 py-[112px] ">
                <div className="w-full">
                    <h1 className="text-[#0E286C] text-[48px] font-bold ">{yourAdviceData?.title}</h1>
                    <p className="text-lg font-normal">{yourAdviceData?.subTitle}</p>
                </div>
                <div className="w-full flex justify-end items-center">
                 
                    <div className=" flex gap-5">
                        <Link
                            style={{
                                border: "1px solid #000",
                                background: "var(--Blue, #0E286C)"
                            }}
                            to=''
                            className=" px-6 py-3 text-[#fff] text-base font-normal">Post</Link>
                        <Link
                        to=''
                        style={{border: "1px solid #000"}}
                        className=" px-6 py-3 text-base font-normal hover:bg-[#0E286C] hover:text-[#fff]"
                        >Join Now</Link>
                    </div>
                </div>

            </div>

        </div>

    );
};

export default YourAdvice;
