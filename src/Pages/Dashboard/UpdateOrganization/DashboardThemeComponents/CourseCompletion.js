import React from 'react';
import Flower from "../../../../assets/Dashboard/Periwinkle.png";
import Flower1 from "../../../../assets/Dashboard/Periwinkle1.png";
import Star from "../../../../assets/Dashboard/Star.png";


const CourseCompletion = ({courseCompletionImg, courseCompletionText, courseCompletionBgColor}) => {
    return (
        <div className='my-5'>
            <div
                style={{
                    filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                    backgroundColor: courseCompletionBgColor
                }}
                className={`h-[132px] lg:h-[185px] mt-[20px] lg:mt-[80px] rounded-[14px]`}
            >
                <img
                    className="float-left mt-[-50px] hidden lg:block"
                    src={courseCompletionImg}
                    alt="person"
                />
                <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:justify-around h-full">
                    <h1 className="lg:text-[26px] text-[15px] font-[600] text-white text-center z-[1]">
                        {courseCompletionText}{" "}
                        <span className="text-[#FFDB70]">0%</span>{" "}
                        complete
                    </h1>
                </div>
                <img
                    className=" absolute left-32 lg:left-60 top-0 z-0 w-[22px] lg:w-[57px]"
                    src={Flower}
                    alt="Flower"
                />
                <img
                    className=" absolute bottom-1 right-8 lg:right-52 z-0 w-[22px] lg:w-[57px]"
                    src={Star}
                    alt="Star"
                />
                <img
                    className=" absolute top-0 right-0 z-0 w-[22px] lg:w-[57px]"
                    src={Flower1}
                    alt="Flower1"
                />
            </div>
        </div>
    );
};

export default CourseCompletion;