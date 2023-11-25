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
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const Reviews = ({ reviewsData }) => {
    const containerRef = useRef(null);
    const [reviews, setReviews] = useState([...reviewsData]);
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
                        Reviews{" "}
                    </h1>
                    <p style={{ borderBottom: "2px solid #4555BA" }}>
                    </p>

                </div>

            </div>

            <div className="carousel-button-group">
                <div className="flex justify-center gap-10 lg:mt-5">
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
                        className="flex overflow-x-scroll scroll-smooth gap-5 mtm-container "
                    >
                        {
                            reviews.map((review) => (
                                <div
                                    style={{
                                        borderRadius: "0px 0px 8px 8px",
                                        borderTop: "3px solid #C5CDFF",
                                        borderRight: "1px solid #C5CDFF",
                                        borderBottom: "1px solid #C5CDFF",
                                        borderLeft: "1px solid #C5CDFF",
                                        boxShadow: "0px 4px 20px 0px #ABB7FF"
                                    }}
                                    className=" w-[395px] lg:h-[460px] h-full p-[20px] text-[#3E3E3E]"
                                >
                                    <div className="lg:flex gap-3 mb-5">
                                        <div>
                                            <img
                                                className="w-[80px] h-[82px] lg:w-[100px] lg:h-[97px]"
                                                style={{
                                                    borderRadius: "99.939px",
                                                    background: "url(<path-to-image>), lightgray 50% / cover no-repeat",
                                                }}
                                                src={review?.reviewerImage} alt="profile" />
                                        </div>
                                        <div>
                                            <h1 className="text-xl lg:text-2xl font-bold">{review?.reviewerName}</h1>
                                            <p className="text-base lg:text-xl font-normal">{review?.class}</p>
                                            <p>
                                                <Stack spacing={1}>
                                                    <Rating name="half-rating" defaultValue={review?.rating} precision={0.5} readOnly />

                                                </Stack>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] lg:text-[18px] font-normal">
                                            {review?.comment}
                                        </p>
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

export default Reviews;
