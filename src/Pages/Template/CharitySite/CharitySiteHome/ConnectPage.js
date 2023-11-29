
import React from 'react';

const ConnectPage = ({ connectData }) => {
    return (
        <div className="bg-[#F3F6FF] font-roboto">
            <div className="w-11/12 mx-auto flex  justify-between">
                <div>
                    <h1 className="font-bold text-[40px] border-b-4 border-[#FFC062] py-[4px] w-[151px] pt-[50px]">{connectData?.heading}</h1>
                    <h1 className="text-[#0E286C] font-bold text-[32px] w-[596px] pt-[130px]">{connectData?.title}</h1>
                    <p className="pt-[15px] text-[18px] w-[616px]">{connectData.description}</p>
                    <div className="flex pt-[42px] pb-[81px] gap-[6px]">
                        <button className="font-bold text-[20px] text-[#0E286C] py-[10px] px-[25px] border-2 border-[#0E286C] rounded-md">{connectData.primaryButton}</button>
                        <button className="font-bold text-[20px]  py-[10px] px-[25px] ">{connectData.secondaryButton}</button>
                    </div>
                </div>
                <div className="pt-[88px]">
                    <div className="flex justify-between gap-[140px]">
                    <div className="grid justify-items-center">
                        <img src={connectData.connectProfiles1.img} alt="" />
                        <p className="text-[20px] font-bold">{connectData.connectProfiles1.name}</p>
                        <p className="text-[18px]">{connectData.connectProfiles1.about}</p>
                    </div>
                    <div className="grid justify-items-center">
                        <img src={connectData.connectProfiles2.img} alt="" />
                        <p className="text-[20px] font-bold">{connectData.connectProfiles2.name}</p>
                        <p className="text-[18px]">{connectData.connectProfiles2.about}</p>
                    </div>
                    </div>
                    <div className="grid justify-items-center">
                        <img src={connectData.connectProfiles3.img} alt="" />
                        <p className="text-[20px] font-bold">{connectData.connectProfiles3.name}</p>
                        <p className="text-[18px]">{connectData.connectProfiles3.about}</p>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default ConnectPage;