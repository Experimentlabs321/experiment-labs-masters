import React from 'react';

const MakeDifferencePage = ({makeDifferenceData}) => {
    return (
        <div className="w-11/12 mx-auto font-roboto">
            <h1 className="pt-[32px] font-bold text-[40px] border-b-4 border-[#FFC062] py-[4px] w-[768px] ">{makeDifferenceData?.heading}</h1>
            <p className="pt-[28px] text-[18px] font-medium w-[768px]">{makeDifferenceData.subHeading}</p>
            <div className="pt-[44px] flex gap-[27px] ">
                {
                    makeDifferenceData?.makeDifferenceType?.map((item, index) => {
                        return (
                            <div
                            style={{
                                borderRadius: "7px",
                                border: "1px solid #E7E7E7",
                                background: "#F7F9FF",
                                boxShadow: "0px 4px 20px 0px rgba(114, 114, 114, 0.25)",
                            }}
                            key={index} className="h-[420px] text-center w-full items-center  ring-[#EEE]  gap-[40px] ">
                                    <img className="w-full" src={item.img} alt="" />
                                    <div>
                                        <h1 className="font-bold text-[20px] text-[#0E286C] pt-[13px]">{item.title}</h1>
                                        <p className="text-[16px] pt-[15px] pb-[5px]">{item.desc}</p>
                                    </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MakeDifferencePage;