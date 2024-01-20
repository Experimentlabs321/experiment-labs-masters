import React, { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import { Button } from "@mui/material";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
//import "./style.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";


const OnePagerMeetM = ({ meetTheMasterData }) => {
    const containerRef = useRef(null);
    const [mastersData, setMastersData] = useState([...meetTheMasterData]);
    function handleScrollLeft() {
        containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
    }

    function handleScrollRight() {
        containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
    }

    return (
        <div className=" px-10 lg:px-28 bg-[#fff] pt-[58px]">
            <div className="mb-10 flex justify-between items-start">
                <div>
                    <h1 className="text-[32px] text-[#000]  font-bold capitalize">
                    코칭 전문가진 소개
                    </h1>
                    <p style={{borderBottom: "2px solid #4555BA"}}>

                    </p>

                </div>

            </div>

            <div className="carousel-button-group">
                <div className="flex justify-items-center justify-center gap-10 lg:mt-5">
                    <button
                        onClick={handleScrollLeft}
                        className="hidden lg:block"
                        type="button"
                    >
                        <ArrowBackIosNewIcon
                            sx={{
                                fontSize: "28px",
                                color: "#141414",
                                borderRadius: "50%",
                                ":hover": { color: "#397FEB" },
                               // background: "#94A4FF",
                                height: "40px",
                                width: "40px",
                                padding: "5px",
                            }}
                        />
                    </button>

                    <div
                        ref={containerRef}
                        className="flex overflow-x-scroll scroll-smooth gap-5 mtm-container lg:w-[85vw] justify-center"
                    >
                        {
                            mastersData.map((master) => (
                                <div
                                    style={{
                                        borderRadius: "4.929px",
                                        border: "0.986px solid #CECECE",
                                      //  background: "url(<path-to-image>), lightgray 50% / cover no-repeat",
                                        boxShadow: "0px 4px 4px 0px #4555BA",
                                    }}
                                    className="min-w-[290px] max-w-[290px] px-2 pb-4"
                                >
                                    <img src={master?.masterImage} alt="" />
                                    <div className="pt-3">
                                        <h4 className="font-bold text-xl">{master?.masterName}</h4>
                                        <h6 className="text-sm font-normal">
                                            {master?.profession}
                                        </h6>
                                    </div>
                                    <div className="pt-3">
                                    {
                                        master?.about?.map((para) => (
                                            <p>{para}</p>
                                        ))
                                    }
                                    </div>
                                </div>
                            ))
                        }




                    </div>
                    <button
                        onClick={handleScrollRight}
                        className="hidden lg:block"
                        type="button"
                    >
                        <ArrowForwardIosIcon
                            sx={{
                                fontSize: "28px",
                                color: "#141414",
                                borderRadius: "50%",
                                ":hover": { color: "#397FEB" },
                               // background: "#94A4FF",
                                height: "40px",
                                width: "40px",
                                padding: "5px",
                            }}
                        />
                    </button>
                </div>
            </div> 
        </div >
    );
};

export default OnePagerMeetM;
