import React from 'react';


import { Link } from "react-router-dom";



const JoinOurThriving = ({ joinOurThrivingData }) => {


    return (
        <div className="bg-[#FFC062]">
            <div className="mx-[50px] flex gap-10 py-[112px] ">
                <div className="w-full">
                    <h1 className="text-[#0E286C] text-[48px] font-bold ">{joinOurThrivingData?.title}</h1>
                </div>
                <div className="w-full">
                    <p className="text-lg font-normal">{joinOurThrivingData?.description}</p>
                    <div className="mt-10 flex gap-5">
                        <Link
                            style={{
                                border: "1px solid #000",
                                background: "var(--Blue, #0E286C)"
                            }}
                            to=''
                            className=" px-6 py-3 text-[#fff] text-base font-normal">Join</Link>
                        <Link
                        to=''
                        style={{border: "1px solid #000"}}
                        className=" px-6 py-3 text-base font-normal"
                        >Learn More</Link>
                    </div>
                </div>

            </div>

        </div>

    );
};

export default JoinOurThriving;
