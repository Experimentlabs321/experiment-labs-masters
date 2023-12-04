
import React from 'react';

const ShareCharityPage = ({shareCharityData}) => {
    return (
        <div className="bg-[#FFC062]">
            <div className="flex items-center justify-center py-[60px]">
                <div className="px-[48px]">
                    <h1 className="text-[48px] w-[488px] font-bold text-[#0E286C]">{shareCharityData?.title}</h1>
                    <p className="mt-[20px] w-[488px] text-[18px]">{shareCharityData?.desc}</p>
                    <div className="flex mt-[20px] gap-[16px]">
                        <button className="px-[24px] py-[12px] text-center text-white text-[16px] rounded-sm bg-[#0E286C]">{shareCharityData?.btn1}</button>
                        <button className="px-[24px] py-[12px] border hover:bg-[#0E286C] hover:text-[#fff] border-[#000] text-center text-[16px] rounded-sm">{shareCharityData?.btn2}</button>
                    </div>
                </div>
                <div>
                    <img src={shareCharityData.img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default ShareCharityPage;