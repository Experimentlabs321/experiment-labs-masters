/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./style.css";
import { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import ReactGA from "react-ga4";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HearFromStudents = () => {
  const containerRef = useRef(null);

  function handleScrollLeft() {
    containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
  }

  function handleScrollRight() {
    containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
  }


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    ReactGA.event({
      category: "Click",
      action: "More Info From Dual Management",
      label: "Submit",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const form = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    ReactGA.event({
      category: "Click",
      action: "Submit Data From More Info From Dual Management",
      label: "Submit Data",
    });
    const form = event.target;
    const name = form.name.value;
    const number = form.number.value;
    const email = form.email.value;
    const option = form.option.value;
    const city = form.city.value;

    const data = {
      Name: name,
      Number: "+91" + number,
      Email: email,
      Option: option,
      City: city,
      Time: new Date(),
    };

    console.log(data);

    fetch(
      "https://sheet.best/api/sheets/5c4ca56d-67bb-4f49-a538-9fdde568c68d",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((data) => {
        // The response comes here
        console.log(data);
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });

    const templateParams = {
      from_name: name,
      message: `
            Name: ${name},
            Number: ${"+91" + number},
            Email: ${email},
            ${option},
            City: ${city},
            Time: ${new Date()},
            `,
    };

    emailjs
      .send(
        "service_s3bklnu",
        "template_l0yacbb",
        templateParams,
        "U0g6Ht1DVmnBbENk0"
      )
      .then(
        (result) => {
          console.log(result.text);
          // toast.success("Successfully Added Your Info");
          event.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };



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
        {/* <h1 className="text-xl">Hear Straight from our Students</h1> */}

        <button onClick={handleClickOpen} className="px-5 py-1 bg-[#FF557A] rounded-3xl hover:bg-opacity-75">
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="bg-dark w-full min-w-[300px] sm:min-w-[350px] lg:w-[500px] p-5 cursor-pointer">
          <div className="w-full">
            <h4
              onClick={handleClose}
              className="text-xl text-white text-right hover:text-purple"
            >
              x
            </h4>
            <h1 className="text-2xl font-semibold text-pink text-center">
              Connect With Counsellor
            </h1>
          </div>
          <form
            ref={form}
            onSubmit={handleSubmit}
            autoComplete="off"
            className="lg:px-10"
          >
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="name">Enter Name</label>
              <input
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                placeholder="Enter your Name"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="number">Enter Number</label>
              <input
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                placeholder="Enter your number"
                type="number"
                name="number"
                id="number"
              />
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="email">Enter Email</label>
              <input
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                placeholder="Enter your email"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="option">Select One</label>
              <select
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                name="option"
                id="option"
              >
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
                <option value="Counselor">Counselor</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <label htmlFor="city">Enter City</label>
              <input
                required
                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                placeholder="Enter your city"
                type="text"
                name="city"
                id="city"
              />
            </div>
            <div className="flex flex-col items-center mt-6 gap-1 text-white">
              <input
                className="text-white py-2 font-bold rounded-3xl bg-pink hover:bg-purple w-1/2 text-center"
                type="submit"
                value={"Submit"}
              />
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default HearFromStudents;
