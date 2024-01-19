import React from 'react';
import { Link } from 'react-router-dom';
import RightArrowBlack from "../../../../assets/Dashboard/RightArrowBlack.png";
import challengesImage from "../../../../assets/Dashboard/Challenges.png";

const Challenges = () => {
    return (
        <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
            <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[32px]">
                Challenges
            </h1>
            <div
                style={{
                    filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                }}
                className="bg-[#2B0825] w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5"
            >
                <div className="bg-[#FF881B] rounded-md">
                    <img src={challengesImage} alt="Challenges" />
                </div>
                <h1 className="text-[14px] lg:text-[18px] text-white font-[700]">
                    {/* {currentWeek ? currentWeek?.weekName : "Course Completed"} */}
                    Course Completed
                </h1>
                <div className="w-full">
                    <small className="text-white pb-[10px] font-[700]">
                        {/* {currentWeekCompletion ? currentWeekCompletion : "O"} */}
                        10%  Completed
                    </small>
                    <div className="relative w-full">
                        <div className="w-full bg-gray-200 rounded-lg h-2">
                            <div
                                className="bg-[#3E4DAC] h-2 rounded-lg"
                                // className="bg-cyan-600 h-2 rounded-sm"
                                style={{ width: `10%` }}
                                // style={{ width: `${currentWeekCompletion}%` }}
                            // style={{ width: "20%" }}
                            ></div>
                        </div>
                    </div>
                </div>
                {true && (
                    <Link
                        // to={`/questLevels/${currentWeek?.courseId}?week=${currentWeek?._id}`}
                        style={{ boxShadow: "0px 7.50435px 0px #F08323" }}
                        className="bg-[#FFDB70] w-full py-[15px] px-[23px] rounded-[13px] text-[12px] lg:text-[18px] font-[700] z-[1]"
                    >
                        <p className="flex items-center justify-center text-black">
                            Complete Challenge{" "}
                            <img
                                className="pl-1 w-[21px] lg:w-[32px]"
                                src={RightArrowBlack}
                                alt="RightArrowBlack"
                            />
                        </p>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Challenges;