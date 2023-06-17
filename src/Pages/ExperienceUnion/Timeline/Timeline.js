import React from "react";
import timeLineDesktop from "../../../assets/EnperienceUnion/DesktopProductLab.jpg";
import timeLineMobile from "../../../assets/EnperienceUnion/MobileViewProductLab.jpg";

const Timeline = () => {
  return (
    <div className="">
      <img
        className="hidden md:block"
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        src={timeLineDesktop}
        alt=""
      />
      <img
        className="block md:hidden"
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        src={timeLineMobile}
        alt=""
      />
      <div className="bg-[#141414] text-white px-10 lg:px-28 py-20 pt-40 flex flex-col md:flex-row gap-5">
        <button className="w-full bg-gradient-to-r from-cyan to-green hover:shadow-lg hover:shadow-[#121212] py-10 rounded-lg hover:bg-opacity-60 hover:transition-all hover:delay-200 hover:ease-out text-4xl lg:text-5xl">
          Apply Now
        </button>
        <button className="w-full hover:shadow-lg hover:shadow-[#121212] py-10 rounded-lg border-white border-2 hover:bg-opacity-60 hover:transition-all hover:delay-200 hover:ease-out text-4xl lg:text-5xl">
          Download Brochure
        </button>
      </div>
    </div>
  );
};

export default Timeline;
