import React from 'react';
import DashboardPrimaryButton from '../../Shared/DashboardPrimaryButton';
import { Link } from 'react-router-dom';
import questImg from "../../../../assets/Dashboard/WeekUpdate.png";
import RightArrowBlack from "../../../../assets/Dashboard/RightArrowBlack.png";

const JoinQuest = ({joinQuestBtnText,joinQuestBtnBg, joinQuestCardBg, joinQuestImgBg, joinQuestImg}) => {
    return (
        <div
            style={{
                filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                backgroundColor: joinQuestCardBg
            }}
            className="lg:col-span-2 flex flex-col lg:flex-row items-center rounded-[14px] px-[12px] lg:px-[32px] py-[23px] lg:py-[54px] gap-3 w-1/2"
        >
            <div style={{backgroundColor: joinQuestImgBg}} className="rounded-md h-full flex items-center justify-center">
                <img className='h-36' src={joinQuestImg || questImg} alt="WeekUpdate" />
            </div>
            <div className="flex flex-col gap-3">
                <h1 className="text-white text-[13px] lg:text-[22px] font-[700] text-center lg:text-left">
                    Week 1
                </h1>
                <DashboardPrimaryButton
                    bgColor={joinQuestBtnBg}
                    shadow="0px 7.50435px 0px #F08323"
                    classes="mb-[12px]"
                >
                    <Link
                        className="flex items-center justify-center "
                    >
                        {joinQuestBtnText}{" "}
                        <img
                            className="pl-1 w-[21px] lg:w-[32px]"
                            src={RightArrowBlack}
                            alt="RightArrowBlack"
                        />
                    </Link>
                </DashboardPrimaryButton>
            </div>
        </div>
    );
};

export default JoinQuest;