import React from 'react';
import DashboardPrimaryButton from "../../Shared/DashboardPrimaryButton";
import OpenBoxImg from "../../../../assets/Dashboard/OpenBox.png";

const OpenBox = ({ openBoxButtonText, openBoxImage, openBoxButtonBg, openBoxCardBg }) => {
    return (
        <div
            style={{
                filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                backgroundColor: openBoxCardBg
            }}
            className="py-[30px] px-[30px] flex flex-col justify-between items-center gap-8 rounded-[14px] w-1/4"
        >
            <img className='h-24' src={openBoxImage || OpenBoxImg} alt="open box" />
            <DashboardPrimaryButton
                bgColor={openBoxButtonBg}
                shadow="0px 5.85246px 0px #CA5F98"
            >
                <p className="flex items-center text-white justify-center">
                    {openBoxButtonText}
                </p>
            </DashboardPrimaryButton>
        </div>
    );
};

export default OpenBox;