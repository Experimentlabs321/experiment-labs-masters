import React from "react";
import img from "../../../assets/wepik-export-20230516131526jrNm.png";
import img1 from "../../../assets/Overview/Mask group.png";
import "./style.css";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Overview = () => {
  return (
    <div className="pt-40 flex items-center justify-center pb-20 font">
      <div className="px-10 lg:px-32">
        <div className="flex flex-col lg:flex-row gap-16 justify-center items-center">
          <div>
            <h2 className="text-3xl my-8">
              Explore careers and become a leader by building Movies
            </h2>
            <p className="bg-[#6278FF] py-1 px-2 rounded-3xl text-sm text-bold inline">
              Career Planning through Creativity
            </p>
            <div className="mb-8 flex mt-11 flex-col gap-3">
              <div className="flex flex-row items-center gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span style={{ fontWeight: "500" }}>
                  Discover various career options in Marketing, Copywriting,
                  Filmmaking, Liberal Arts, Event Management and 40+ fields.
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span style={{ fontWeight: "500" }}>
                  Create a standout portfolio for Ivy League admissions in India
                  and abroad.
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span style={{ fontWeight: "500" }}>
                  Gain career clarity in Humanities post 12th by working on
                  industry projects.
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-8">
              <button className=" rounded-3xl bg-[#6278FF] font-semibold hover:bg-opacity-80 hover:transition-all hover:delay-300 hover:ease-out w-full py-1">
                Connect With Counsellor
              </button>
              <button className=" border border-[#6278FF] rounded-3xl font-semibold hover:bg-opacity-80 hover:transition-all hover:delay-300 hover:ease-out w-full py-1">
                Download Career Report
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img className="rounded-3xl" src={img1} alt="" />
            {/*   <iframe
                            className='rounded-2xl w-full h-[290px] lg:min-w-[500px]'
                            style={{ borderRight: "5px solid rgb(57 , 127 , 235, 0.2)", borderBottom: "5px solid rgb(57 , 127 , 235, 0.2)" }}
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        /> */}
            {/* <p className='text-sm font-thin bg-custom-blue bg-opacity-50'>Hands on Teaching at Masters' Union <span className='font-semibold'>ft. Kenny and Abish</span></p> */}
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="w-full bg-[#6278ff73] rounded-2xl mt-16 p-5 flex flex-col justify-center lg:flex-row lg:justify-evenly lg:items-start gap-3 gap-y-10 border-opacity-30">
            <div className="h-full">
              <div className="flex gap-2 items-center text-sm">
                <AccessTimeIcon />
                <span>Duration</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">12 Week</h1>
                <p className="font-thin mt-2 text-sm">
                  Includes 7 day industry immersion
                </p>
              </div>
            </div>
            <div
              className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8  "
              style={{ borderLeft: "6px solid rgba(85, 96, 211, 0.5)" }}
            >
              <div className="flex gap-2 items-center text-sm">
                <LocationOnIcon />
                <span>Location</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">Hybrid</h1>
                <p className="font-thin mt-2 text-sm">Online and in campus</p>
              </div>
            </div>
            <div
              className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8"
              style={{ borderLeft: "6px solid rgba(85, 96, 211, 0.5)" }}
            >
              <div className="flex gap-2 items-center text-sm">
                <LiveTvIcon />
                <span>Format</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">Hybrid</h1>
                <p className="font-thin mt-2 text-sm">Multiple methods</p>
              </div>
            </div>
            <div
              className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8 h-full"
              style={{ borderLeft: "6px solid rgba(85, 96, 211, 0.5)" }}
            >
              <div className="flex gap-2 items-center text-sm">
                <CalendarTodayIcon />
                <span>Commencement Date</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">May 26,2023</h1>
                <p
                  style={{ visibility: "hidden" }}
                  className="font-thin mt-2 text-sm"
                >
                  Opt-in Residential
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="block lg:hidden ">
          <div className="w-full sm:hidden bg-[#6278ff73] rounded-2xl mt-16 p-5 flex flex-col justify-center lg:flex-row lg:justify-evenly lg:items-start gap-3 gap-y-10 border-opacity-30">
            <div className="h-full">
              <div className="flex gap-2 items-center text-sm">
                <AccessTimeIcon />
                <span>Duration</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">12 Week</h1>
                <p className="font-thin mt-2 text-sm">
                  Includes 7 day industry immersion
                </p>
              </div>
            </div>
            <div className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8  ">
              <div className="flex gap-2 items-center text-sm">
                <LocationOnIcon />
                <span>Location</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">Hybrid</h1>
                <p className="font-thin mt-2 text-sm">Online and in campus</p>
              </div>
            </div>
            <div className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8">
              <div className="flex gap-2 items-center text-sm">
                <LiveTvIcon />
                <span>Format</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">Hybrid</h1>
                <p className="font-thin mt-2 text-sm">Multiple methods</p>
              </div>
            </div>
            <div className="lg:border-l border-t lg:border-t-0 lg:pt-0 pt-8 lg:px-8 h-full">
              <div className="flex gap-2 items-center text-sm">
                <CalendarTodayIcon />
                <span>Commencement Date</span>
              </div>
              <div className="mt-2">
                <h1 className="text-2xl font-bold">May 26,2023</h1>
                <p
                  style={{ visibility: "hidden" }}
                  className="font-thin mt-2 text-sm"
                >
                  Opt-in Residential
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
