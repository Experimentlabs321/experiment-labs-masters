import React from 'react';
import DashboardPrimaryButton from '../../Shared/DashboardPrimaryButton';
import RightArrowWhite from "../../../../assets/Dashboard/RightArrowWhite.png";

const RequestSlots = ({ slotsHeaderText, slotsBtnText, slotsBtnBg, slotsCardBg , itemDetails }) => {
    return (
        <div className="w-[250px] lg:w-[355px] min-w-[250px] lg:min-w-min h-[370px] lg:h-[515px]">
            <h1 className="text-[18px] lg:text-[25px] font-[700] text-center pb-[32px]">
                {slotsHeaderText}
            </h1>
            <div
                style={{
                    filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                    backgroundColor: slotsCardBg
                }}
                className="w-full h-full rounded-[14px] py-[20px] px-[15px] lg:p-[30px] flex flex-col justify-between items-center gap-5"
            >
                <div>
                    <h1 className="text-white text-[18px] font-[700]">
                        <span className="pr-4">{"<"}</span>
                        {itemDetails?.postProgrammeSupport ? itemDetails?.postProgrammeSupport : "Post Programme Support"}
                        
                        <span className=" pl-4 ">{">"}</span>
                    </h1>
                </div>
                <div className="w-full relative">
                    <p className="text-[#C0C0C0] text-[18px] font-[600] pb-[18px]">
                    {itemDetails?.date ? itemDetails?.date : "Date"}
                        
                    </p>
                    <div className="relative inline-flex w-full">
                        <input
                            // required
                            className=" text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                            name="date"
                            id="date"
                            type="date"
                        />
                    </div>
                    <p className="text-[#C0C0C0] text-[18px] font-[600] py-[18px]">
                    {itemDetails?.time ? itemDetails?.time : "Time"}
                        
                    </p>
                    <div className="relative inline-flex w-full">
                        <input
                            // required
                            // onChange={handleTimeChange}
                            className=" text-[18px] font-sans font-[700] h-[45px] lg:h-[60px] w-full py-2 px-[24px] rounded-[14px] text-black focus:outline-none appearance-none"
                            name="time"
                            // defaultValue={() => {const startEvent = new Date(reservedEvent?.start)?toTimeString().slice(0, 8)}}
                            // defaultValue={startTime?.toTimeString().slice(0, 8)}
                            id="time"
                            type="time"
                        />
                    </div>
                </div>
                {false ? (
                    <a
                        href="/#"
                        // href={reservedEvent?.hangoutLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ boxShadow: "0px 6.32482px 0px #CA5F98" }}
                        className="bg-[#0F3934] w-full py-[15px] px-[23px] rounded-[13px] text-[12px] lg:text-[18px] font-[700] z-[1]"
                    >
                        <p className="flex items-center justify-center text-white">
                        {itemDetails?.joinMeeting ? itemDetails?.joinMeeting : "Join Meeting"}{" "}
                            <img
                                className="pl-1 w-[21px] lg:w-[32px]"
                                src={RightArrowWhite}
                                alt="RightArrowBlack"
                            />
                        </p>
                    </a>
                ) : (
                    <DashboardPrimaryButton
                        bgColor={slotsBtnBg}
                        shadow="0px 6.32482px 0px #CA5F98"
                        width="full"
                    // onClick={addEvent}
                    >
                        <p className="flex items-center justify-center text-white">
                            {slotsBtnText}{" "}
                            <img
                                className="pl-1 w-[21px] lg:w-[32px]"
                                src={RightArrowWhite}
                                alt="RightArrowBlack"
                            />
                        </p>
                    </DashboardPrimaryButton>
                )}
            </div>
        </div>
    );
};

export default RequestSlots;