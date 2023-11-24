import React, { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import { Button } from "@mui/material";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import "./style.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
//import guptaImg from "../../../assets/Masters/guptaImg.png";
//import guptaLogo from "../../../assets/Masters/guptaLogo.png";
//import handaImg from "../../../assets/Masters/handaImg.png";
//import handaLogo from "../../../assets/Masters/handaLogo.png";
//import jainImg from "../../../assets/Masters/jainImg.png";
//import jainLogo from "../../../assets/Masters/jainLogo.png";
//import gargImg from "../../../assets/Masters/gargImg.png";
//import gargLogo from "../../../assets/Masters/gargLogo.png";
//import moulikImg from "../../../assets/Masters/moulikImg.png";
//import moulikLogo from "../../../assets/Masters/moulikLogo.png";

const MeetTheMaster = ({ meetTheMasterData }) => {
  const containerRef = useRef(null);
  const [mastersData, setMastersData] = useState([...meetTheMasterData]);
  function handleScrollLeft() {
    containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
  }

  function handleScrollRight() {
    containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
  }

  return (
    <div className="mt-44 px-10 lg:px-28">
      <div className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-3xl xl:text-4xl font-extrabold capitalize">
            Meet Your MENTORS{" "}
          </h1>
          <p className="text-xl mt-2 font-thin lowercase">
            Take a closer look into our classrooms
          </p>
        </div>
        <div className="hidden lg:block">
          <Button
            endIcon={<ArrowForwardIosIcon />}
            size="large"
            variant="contained"
            sx={{
              bgcolor: "#94A4FF",
              ":hover": { bgcolor: "#6278FF" },
              textTransform: "capitalize",
              borderRadius: "24px",
            }}
          >
            Meet the Masters
          </Button>
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
                background: "#94A4FF",
                height: "40px",
                width: "40px",
                padding: "5px",
              }}
            />
          </button>

          <div
            ref={containerRef}
            className="flex overflow-x-scroll scroll-smooth gap-5 mtm-container lg:w-[85vw]"
          >
            {
              mastersData.map((master) => (
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderBottom: "4px solid #94A4FF",
                    borderRight: "4px solid #94A4FF",
                    color: "black",
                    borderRadius: "24px",
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
                  <img src={master?.logo} alt="" />
                </div>
              ))
            }


            {/*  <div
              style={{
                backgroundColor: "#FFFFFF",
                borderBottom: "4px solid #94A4FF",
                borderRight: "4px solid #94A4FF",
                color: "black",
                borderRadius: "24px",
              }}
              className="min-w-[290px] max-w-[290px] px-2 pb-4"
            >
              <img src={MeetTheMaster.images?.handaImg} alt="" />
              <div className="pt-3">
                <h4 className="font-bold text-xl">Pulkit Handa</h4>
                <h6 className="text-sm font-normal">
                  Director-Sales, Magicpin
                </h6>
              </div>
              <img src={MeetTheMaster.images?.handaLogo} alt="" />
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderBottom: "4px solid #94A4FF",
                borderRight: "4px solid #94A4FF",
                color: "black",
                borderRadius: "24px",
              }}
              className="min-w-[290px] max-w-[290px] px-2 pb-4"
            >
              <img src={MeetTheMaster.images?.jainImg} alt="" />
              <div className="py-3">
                <h4 className="font-bold text-xl">Naman Jain</h4>
                <h6 className="text-sm font-normal">
                  Founder, Experiment Labs
                </h6>
              </div>
              <img src={MeetTheMaster.images?.jainLogo} alt="" />
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderBottom: "4px solid #94A4FF",
                borderRight: "4px solid #94A4FF",
                color: "black",
                borderRadius: "24px",
              }}
              className="min-w-[290px] max-w-[290px] px-2 pb-4"
            >
              <img src={MeetTheMaster.images?.gargImg} alt="" />
              <div className="py-3">
                <h4 className="font-bold text-xl">Aayush Garg</h4>
                <h6 className="text-sm font-normal">
                  Ex-Head of Growth, Zilingo
                </h6>
              </div>
              <img src={MeetTheMaster.images?.gargLogo} alt="" />
            </div> */}

           {/*  <div
              style={{
                backgroundColor: "#FFFFFF",
                borderBottom: "4px solid #94A4FF",
                borderRight: "4px solid #94A4FF",
                color: "black",
                borderRadius: "24px",
              }}
              className="min-w-[290px] max-w-[290px] px-2 pb-4"
            >
              <img src={MeetTheMaster.images?.moulikImg} alt="" />
              <div className="py-3">
                <h4 className="font-bold text-xl">Siddharth Moulik</h4>
                <h6 className="text-sm font-normal">Ad Film Director</h6>
              </div>
              <img src={MeetTheMaster.images?.moulikLogo} alt="" />
            </div> */}

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
                background: "#94A4FF",
                height: "40px",
                width: "40px",
                padding: "5px",
              }}
            />
          </button>
        </div>
      </div>
      <div className="block lg:hidden mt-10">
        <Button
          endIcon={<ArrowForwardIosIcon />}
          size="large"
          variant="contained"
          sx={{
            bgcolor: "#94A4FF",
            ":hover": { bgcolor: "#6278FF" },
            textTransform: "capitalize",
            borderRadius: "24px",
            width: "100%",
          }}
        >
          Meet the Masters
        </Button>
      </div>
    </div>
  );
};

export default MeetTheMaster;
