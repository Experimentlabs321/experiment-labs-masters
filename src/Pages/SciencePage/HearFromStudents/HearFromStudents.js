/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./style.css";
import { useRef } from "react";

const HearFromStudents = () => {
  const containerRef = useRef(null);

  function handleScrollLeft() {
    containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
  }

  function handleScrollRight() {
    containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
  }

  return (
    <div>
      {/* <div className='mt-16 flex flex-col lg:flex-row font'>
                <div className='mb-10 flex justify-between items-start'>
                    <div>
                        <h1 className='text-2xl w-[200px] font-bold font'>Hear Straight from our Students</h1>
                        <button className='mt-5 px-6 py-2 bg-custom-blue rounded font-bold hover:bg-opacity-75'>See All</button>
                        <div className="carousel-button-group">
                            <div className='flex justify-left mt-5'>
                                <button onClick={handleScrollLeft} className='hidden lg:block' type="button">
                                    <ArrowCircleLeftRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: 'rgb(156 163 175)', ":hover": { color: "#397FEB" } }} />
                                </button>
                                <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                                    <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    ref={containerRef}
                    className='flex overflow-x-scroll scroll-smooth gap-5 hfs-container'
                >
                    <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                        <iframe
                            className='w-full h-[150px] object-cover'
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        <div className='p-3'>
                            <h4 className='font-extrabold font'>Full Name</h4>
                            <h6 className='text-sm font-thin'>Work Role, Company</h6>
                            <p className='text-sm font-thin mt-2'>Teaching :</p>
                            <p className='text-xs font-semibold'>Full Subject Name</p>
                        </div>
                    </div>
                    <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                        <iframe
                            className='w-full h-[150px] object-cover'
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        <div className='p-3'>
                            <h4 className='font-extrabold font'>Full Name</h4>
                            <h6 className='text-sm font-thin'>Work Role, Company</h6>
                            <p className='text-sm font-thin mt-2'>Teaching :</p>
                            <p className='text-xs font-semibold'>Full Subject Name</p>
                        </div>
                    </div>
                    <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                        <iframe
                            className='w-full h-[150px] object-cover'
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        <div className='p-3'>
                            <h4 className='font-extrabold font'>Full Name</h4>
                            <h6 className='text-sm font-thin'>Work Role, Company</h6>
                            <p className='text-sm font-thin mt-2'>Teaching :</p>
                            <p className='text-xs font-semibold'>Full Subject Name</p>
                        </div>
                    </div>
                    <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                        <iframe
                            className='w-full h-[150px] object-cover'
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        <div className='p-3'>
                            <h4 className='font-extrabold font'>Full Name</h4>
                            <h6 className='text-sm font-thin'>Work Role, Company</h6>
                            <p className='text-sm font-thin mt-2'>Teaching :</p>
                            <p className='text-xs font-semibold'>Full Subject Name</p>
                        </div>
                    </div>
                    <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                        <iframe
                            className='w-full h-[150px] object-cover'
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        <div className='p-3'>
                            <h4 className='font-extrabold font'>Full Name</h4>
                            <h6 className='text-sm font-thin'>Work Role, Company</h6>
                            <p className='text-sm font-thin mt-2'>Teaching :</p>
                            <p className='text-xs font-semibold'>Full Subject Name</p>
                        </div>
                    </div>
                    <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                        <iframe
                            className='w-full h-[150px] object-cover'
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        <div className='p-3'>
                            <h4 className='font-extrabold font'>Full Name</h4>
                            <h6 className='text-sm font-thin'>Work Role, Company</h6>
                            <p className='text-sm font-thin mt-2'>Teaching :</p>
                            <p className='text-xs font-semibold'>Full Subject Name</p>
                        </div>
                    </div>
                    <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                        <iframe
                            className='w-full h-[150px] object-cover'
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        <div className='p-3'>
                            <h4 className='font-extrabold font'>Full Name</h4>
                            <h6 className='text-sm font-thin'>Work Role, Company</h6>
                            <p className='text-sm font-thin mt-2'>Teaching :</p>
                            <p className='text-xs font-semibold'>Full Subject Name</p>
                        </div>
                    </div>
                    <div className='border-2 border-gray-400 bg-[#424242] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                        <iframe
                            className='w-full h-[150px] object-cover'
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        <div className='p-3'>
                            <h4 className='font-extrabold font'>Full Name</h4>
                            <h6 className='text-sm font-thin'>Work Role, Company</h6>
                            <p className='text-sm font-thin mt-2'>Teaching :</p>
                            <p className='text-xs font-semibold'>Full Subject Name</p>
                        </div>
                    </div>

                </div>
            </div> */}
      <div className=" flex justify-between mt-10">
        <h1 className="text-xl">Hear Straight from our Students</h1>

        <button className="px-5 py-1 bg-[#FF557A] rounded-3xl hover:bg-opacity-75">
          More info
        </button>
      </div>

      <div className="mt-10 flex flex-col lg:flex-row">
        <div className="mb-10 flex justify-between items-start">
          <div>
            {/* <h1 className='text-xl w-[200px] font-bold font'>Explore Course <span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>
                                Roster</span></h1> */}
            {/* <button className='mt-5 px-6 py-2 bg-custom-blue rounded font-bold hover:bg-opacity-75'>See All</button> */}
            <div className="carousel-button-group">
              <div className="flex justify-start gap-5 mt-5">
                {/* <button onClick={handleScrollLeft} className='hidden bg-[#94A4FF] rounded-full lg:block' type="button">
                                        <ArrowBackIos className='opacity-80'  sx={{ fontSize: '60px', color: 'black', ":hover": { color: "#397FEB" } }}/>
                                    </button> */}
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
                  className="flex overflow-x-scroll scroll-smooth gap-5 mtm-container w-[75vw]"
                >
                  <div className="border-2  rounded-2xl border-gray-400 bg-black hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]">
                    <img
                      className="object-fill w-full rounded-t-2xl"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiXxUJ4QGUFzLziQKb--ld4QB88QpCNP4SA&usqp=CAU"
                      alt="pic"
                    />
                    <div>
                      <p className="p-4">Experiment Labs Summer Startup Week</p>
                    </div>
                  </div>
                  <div className="border-2  rounded-2xl border-gray-400 bg-black hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]">
                    <img
                      className="object-fill w-full rounded-t-2xl"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiXxUJ4QGUFzLziQKb--ld4QB88QpCNP4SA&usqp=CAU"
                      alt="pic"
                    />
                    <div>
                      <p className="p-4">Experiment Labs Summer Startup Week</p>
                    </div>
                  </div>
                  <div className="border-2  rounded-2xl border-gray-400 bg-black hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]">
                    <img
                      className="object-fill w-full rounded-t-2xl"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiXxUJ4QGUFzLziQKb--ld4QB88QpCNP4SA&usqp=CAU"
                      alt="pic"
                    />
                    <div>
                      <p className="p-4">Experiment Labs Summer Startup Week</p>
                    </div>
                  </div>
                  <div className="border-2  rounded-2xl border-gray-400 bg-black hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]">
                    <img
                      className="object-fill w-full rounded-t-2xl"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiXxUJ4QGUFzLziQKb--ld4QB88QpCNP4SA&usqp=CAU"
                      alt="pic"
                    />
                    <div>
                      <p className="p-4">Experiment Labs Summer Startup Week</p>
                    </div>
                  </div>
                  <div className="border-2  rounded-2xl border-gray-400 bg-black hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]">
                    <img
                      className="object-fill w-full rounded-t-2xl"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiXxUJ4QGUFzLziQKb--ld4QB88QpCNP4SA&usqp=CAU"
                      alt="pic"
                    />
                    <div>
                      <p className="p-4">Experiment Labs Summer Startup Week</p>
                    </div>
                  </div>
                  <div className="border-2  rounded-2xl border-gray-400 bg-black hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]">
                    <img
                      className="object-fill w-full rounded-t-2xl"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiXxUJ4QGUFzLziQKb--ld4QB88QpCNP4SA&usqp=CAU"
                      alt="pic"
                    />
                    <div>
                      <p className="p-4">Experiment Labs Summer Startup Week</p>
                    </div>
                  </div>
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
                {/* <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                                        <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                                    </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HearFromStudents;
