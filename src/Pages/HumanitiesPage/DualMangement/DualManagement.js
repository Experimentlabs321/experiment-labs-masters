import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Stories from "react-insta-stories";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import "./style.css";
import logo2 from "../../../assets/Logos/Group 2859890.png";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CleanHandsTwoToneIcon from "@mui/icons-material/CleanHandsTwoTone";
import CurrencyExchangeTwoToneIcon from "@mui/icons-material/CurrencyExchangeTwoTone";
import MoneyTwoToneIcon from "@mui/icons-material/MoneyTwoTone";
import img from "../../../assets/wepik-export-20230516131526jrNm.png";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HearStraight from "../HearStraight";
import HearFromStudents from "../HearFromStudents/HearFromStudents";

const DualManagement = () => {
  const stickyRef = useRef(null);
  const stickyRef2 = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const containerRect = containerRef.current.getBoundingClientRect();
      const stickyRect = stickyRef.current.getBoundingClientRect();
      const stickyRect2 = stickyRef2.current.getBoundingClientRect();
      const bottomOffset = containerRect.bottom - stickyRect.height;
      const bottomOffset2 = containerRect.bottom - stickyRect2.height;

      // console.log(bottomOffset, bottomOffset2);

      if (bottomOffset < 0 && window.innerWidth > 1024) {
        stickyRef.current.style.position = "block";
        stickyRef2.current.style.position = "block";
        stickyRef.current.style.bottom = "0";
        stickyRef2.current.style.bottom = "0";
      } else {
        stickyRef.current.style.position = "sticky";
        stickyRef2.current.style.position = "sticky";
        stickyRef.current.style.bottom = "auto";
        stickyRef2.current.style.bottom = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mt-28 px-5 py-10 lg:px-30 xl:px-32 font" ref={containerRef}>
      {/* <h1 className="font-bold text-4xl font block lg:hidden mb-6 lg:mb-0">
        Curriculum with Dual Focus on Tech And Management
      </h1> */}
      <div
        ref={stickyRef}
        style={{
          top: 80,
          backgroundColor: "#141414",
          padding: "35px 0",
          zIndex: "1000",
          width: "100%",
        }}
        className="hidden lg:block"
      >
        {/* <h1 className="font-bold text-3xl">
          Curriculum with Dual Focus on Tech And Management
        </h1> */}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 items-start w-full">
        <div
          ref={stickyRef2}
          style={{ top: 190, zIndex: "1" }}
          className="hidden lg:flex flex-col gap-5 w-full max-w-[370px] min-w-[300px] sticky"
        >
          <h1 className="text-lg">New Age Concentrations</h1>

          <div className="p-4 rounded-md lg:w-[370px] w-full">
            <p className="p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold">
              CORE TOPICS
            </p>
            <div className="my-6 flex flex-col gap-y-1">
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  What is creativity and career options for me
                </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  Writing your own scripts
                </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  The art of direction
                </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  Managing actors and people in real life
                </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  Art Direction and business of films
                </span>
              </div>
              <div className="flex flex-row items-start lg:ml-8 gap-1">
                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                 */}{" "}
                <span className="text-sm font-light">And Many More...</span>
              </div>
            </div>
            <p className="p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold">
              SKILL CONCENTRATIONS
            </p>
            <div className="my-6 flex flex-col gap-y-1">
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Leadership</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Observation and listening skills</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Cinematography</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Communication</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Analytics</span>
              </div>

              <div className="flex flex-row items-start lg:ml-8 gap-1">
                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                 */}{" "}
                <span className="text-sm font-light">And Many More...</span>
              </div>
            </div>
            <p className="p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold">
              EXPLORE CAREERS IN
            </p>
            <div className="mt-6 flex flex-col gap-y-1">
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Film Making</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Event Management </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Marketing and copywriting</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Advertising</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Design</span>
              </div>
              <div className="flex flex-row items-start lg:ml-8 gap-1">
                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                 */}{" "}
                <span className="text-sm font-light">And Many More...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:hidden flex-col gap-5 w-full">
          <h1 className="text-lg">New Age Concentrations</h1>

          <div className=" p-4 rounded-md lg:w-[370px] w-full">
            <p className="p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold">
              CORE TOPICS
            </p>
            <div className="my-6 flex flex-col gap-y-1">
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  What is creativity and career options for me
                </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  Writing your own scripts
                </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  The art of direction
                </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  Managing actors and people in real life
                </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">
                  Art Direction and business of films
                </span>
              </div>
              <div className="flex flex-row items-start lg:ml-8 gap-1">
                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                 */}{" "}
                <span className="text-sm font-light">And Many More...</span>
              </div>
            </div>
            <p className="p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold">
              SKILL CONCENTRATIONS
            </p>
            <div className="my-6 flex flex-col gap-y-1">
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Leadership</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Observation and listening skills</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Cinematography</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Communication</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Analytics</span>
              </div>

              <div className="flex flex-row items-start lg:ml-8 gap-1">
                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                 */}{" "}
                <span className="text-sm font-light">And Many More...</span>
              </div>
            </div>
            <p className="p-1 rounded-full pl-3 text-sm w-[250px] bg-[#9747FF]  font-bold">
              EXPLORE CAREERS IN
            </p>
            <div className="mt-6 flex flex-col gap-y-1">
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Film Making</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Event Management </span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Marketing and copywriting</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Advertising</span>
              </div>
              <div className="flex flex-row items-start gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span className="text-sm font-light">Design</span>
              </div>
              <div className="flex flex-row items-start lg:ml-8 gap-1">
                {/*                                 <span><PlayArrowRoundedIcon sx={{ color: '#FFFFFF' }} /></span>
                 */}{" "}
                <span className="text-sm font-light">And Many More...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <VerticalTimeline layout={"1-column-left"} lineColor={"#424242"}>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                backgroundColor: "transparent",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
                border: "none",
              }}
              contentArrowStyle={{ backgroundColor: "transparent" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 1
                  </span>

                  <div className="w-full border rounded-2xl">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      what is Film Making?
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Explore the captivating world of film making – from production techniques to leadership roles.{" "}
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 2
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Screenwriting
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Master the art of screenwriting, harnessing the power of observation to bring compelling stories to life.{" "}
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 3
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Directing
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Master the art of directing, from pitching captivating ideas to fostering empathy-driven storytelling.{" "}
                    </p>
                  </div>
                  {/*  <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 4
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Cinematography
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      {" "}
                      Master the art of Cinematography: Explore camera knowledge and capture emotional context with precision
                    </p>
                  </div>
                  {/*  <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 5
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Lightning
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Unleash your potential with Lightning: Gaffing the Power of Understanding Mood. Experience accelerated learning and enhance your comprehension abilities with Lightning's innovative approach.
                    </p>
                  </div>
                  {/*  <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 6
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Sound
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Dive into the world of Sound: Master sound mixing, recording, and understanding clarity for immersive experiences.{" "}
                    </p>
                  </div>
                  {/*   <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 7
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Editing
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Master the art of Editing: Seamlessly blend video and audio, while understanding the art of flow.{" "}
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 8
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      HMU+ Art Direction
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Explore the transformative power of Art Direction and unleash the beauty and impact of creative decor
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 9
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Film Business + Festivals
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Explore the world of Film Business + Festivals, promoting your film with perseverance and success.
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 10
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Film Preparation
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Master the art of film preparation through pre-production and planning. Learn the essential steps to bring your creative vision to life on the big screen.
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 11
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Live Edit Support
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Experience post-production excellence with Live Edit Support. Enhance your skills and understand criticism for flawless content creation.
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              iconStyle={{ color: "#397EFB", backgroundColor: "#94A4FF" }}
              contentStyle={{
                background: "#141414",
                minWidth: "500px",
                maxWidth: "600px",
                width: "100%",
              }}
              contentArrowStyle={{ background: "#141414" }}
            >
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 12
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                      Demo Day
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                      Experience the excitement of Demo Day, where debut filmmakers showcase their work with confidence and passion.
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>

        <div className="block lg:hidden w-full">
          <div className="w-full">
            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 1
                  </span>

                  <div className="w-full border rounded-2xl">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    what is Film Making?
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Explore the captivating world of film making – from production techniques to leadership roles.{" "}
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>

            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 2
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Screenwriting
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                     Master the art of screenwriting, harnessing the power of observation to bring compelling stories to life.{" "}
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            Core and Skill Concentrations</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>

            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 3
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Directing
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Master the art of directing, from pitching captivating ideas to fostering empathy-driven storytelling.{" "}
                    </p>
                  </div>
                  {/*  <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>

            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 4
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Cinematography
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Master the art of Cinematography: Explore camera knowledge and capture emotional context with precision
                    </p>
                  </div>
                  {/*  <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>

            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 5
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Lightning
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Unleash your potential with Lightning: Gaffing the Power of Understanding Mood. Experience accelerated learning and enhance your comprehension abilities with Lightning's innovative approach.
                    </p>
                  </div>
                  {/*  <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>

            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 6
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Sound
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Dive into the world of Sound: Master sound mixing, recording, and understanding clarity for immersive experiences.{" "}
                    </p>
                  </div>
                  {/*   <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>

            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 7
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Editing
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Master the art of Editing: Seamlessly blend video and audio, while understanding the art of flow.{" "}
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>
                                            VIP Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>

            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 8
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    HMU+ Art Direction
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Explore the transformative power of Art Direction and unleash the beauty and impact of creative decor
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>
            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 9
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Film Business + Festivals
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Explore the world of Film Business + Festivals, promoting your film with perseverance and success.
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>
            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 10
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Film Preparation
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Master the art of film preparation through pre-production and planning. Learn the essential steps to bring your creative vision to life on the big screen.
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>
            <div className="mb-10 w-full">
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 11
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Live Edit Support
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Experience post-production excellence with Live Edit Support. Enhance your skills and understand criticism for flawless content creation.
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
              <div className="w-full">
                <div className="space-y-4 text-white w-full">
                  <span className="font-bold text-white mb-4 text-xl">
                    Week 12
                  </span>

                  <div className="w-full border rounded-lg">
                    <p className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600">
                    Demo Day
                    </p>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4">
                    Experience the excitement of Demo Day, where debut filmmakers showcase their work with confidence and passion.
                    </p>
                  </div>
                  {/* <div className="w-full border rounded-lg">
                                        <summary className="px-4 py-6 focus:outline-none focus-visible:ring-cyan-600"><span className='bg-custom-blue p-1 font-bold mr-2 rounded-md bg-opacity-60'>In Class</span>

                                            One Day Profit Challenge</summary>
                                        <p className="px-4 py-6 pt-0 ml-4 -mt-4">Tincidunt ut hac condimentum rhoncus phasellus nostra. Magna porttitor egestas tincidunt neque vehicula potenti. </p>
                                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <HearFromStudents /> */}
    </div>
  );
};

export default DualManagement;
