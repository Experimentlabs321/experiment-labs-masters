import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Stories from "react-insta-stories";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import "./style.css";
import img from "../../../assets/heroImg.png";
import BgImg from "../../../assets/HeroBg.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Hero = () => {
  // const visibleIndex = useRef(0);

  // const [stories, setStories] = useState([
  //     {
  //         url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4',
  //         type: 'video'
  //     },
  //     {
  //         url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1075852-dV3Kxdk8Sn-high.mp4',
  //         type: 'video'
  //     },
  //     {
  //         url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4',
  //         type: 'video'
  //     },
  //     {
  //         url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1347899-LeKv7SHCYU-high.mp4',
  //         type: 'video'
  //     },
  // ]);

  // const [currentVideo, setCurrentVideo] = useState(stories[0]?.url);

  // const [selectedIndex, setSelectedIndex] = useState(0);

  // const mySourceRef = useRef(null);
  // const myVideoRef = useRef(null);

  // const onStoryStart = (index) => {
  //     visibleIndex.current = index;
  //     const mySource = mySourceRef.current;
  //     const myVideo = myVideoRef.current;

  //     if (mySource && myVideo) {
  //         mySource.src = stories[index]?.url;
  //         myVideo.load();
  //     }

  // };

  // const onNext = () => {
  //     const i = (visibleIndex.current + 1) % 4;
  //     visibleIndex.current = i;
  //     setSelectedIndex(i);
  //     setCurrentVideo(stories[i]?.url);
  // };

  // const onPrevious = () => {
  //     let i = (visibleIndex.current - 1);
  //     if (i === -1) {
  //         i += 4;
  //     }
  //     visibleIndex.current = i;
  //     setSelectedIndex(i);
  //     setCurrentVideo(stories[i]?.url);
  // };

  // useEffect(() => {

  //     const mySource = mySourceRef.current;
  //     const myVideo = myVideoRef.current;

  //     if (mySource && myVideo) {
  //         mySource.src = currentVideo;
  //         myVideo.load();
  //     }
  // }, [currentVideo]);

  // console.log(stories[selectedIndex].url, selectedIndex);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    ReactGA.event({
      category: "Click",
      action: "Learn More In Hero",
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
    // console.log("Clicked");
    ReactGA.event({
      category: "Click",
      action: "Submit Data From Navbar",
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

    // console.log("Gone Here ===============>", data);

    fetch(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/interactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        // console.log("Submit ===============>", res);
        const sendMail = await axios.post(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
          {
            from: `${email}`,
            to: `naman.j@experimentlabs.in`,
            subject: `${name} wants to Learn more about Experiment Labs`,
            message: `
            Name: ${name},
            Number: "+91" + ${number},
            Email: ${email},
            Option: ${option},
            City: ${city},
            Tme: ${new Date()},
            `,
          }
        );
        // console.log("Send Mail ===============>", sendMail);
        if (sendMail?.data?.success) {
          Swal.fire({
            icon: "success",
            text: "Thanks For your response!",
          });
        }
        handleClose();
      })
      .catch((error) => {
        // Errors are reported there
        // console.log(error);
      });
  };

  return (
    <section className="lg:h-[585px] text-white">
      <div
        style={{
          height: "100%",
          background:
            "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
        }}
        className="flex lg:justify-end items-center"
      >
        <div className="relative">
          <div className="pt-28 pb-20 px-10 lg:pl-10">
            <h1 className="text-4xl font-bold">
              Discover Your Path to a Successful
              <br />
              Career with Real-World Experience
            </h1>
            <p className="mt-8 mb-12 text-2xl">
              Build leadership like a muscle
            </p>

            {/* <div className='my-8 text-white flex flex-col gap-3 justify-start'>
                            <span><LanguageIcon className='mr-2' /> Curriculum that takes learning<span className='font-bold initial'> {` beyond the classroom`}</span></span>
                            <span><BusinessCenterIcon className='mr-2' /> Classes led by <span className='font-bold initial'>100+ MDs, CEOs & Founders</span></span>
                            <span><CurrencyRupeeIcon className='mr-2' />Placements driven courses with <span className='font-bold initial'>profile building,stream selection and career planning</span></span>
                        </div> */}

            <Button
              onClick={handleClickOpen}
              sx={{
                bgcolor: "#FF557A",
                ":hover": { bgcolor: "#94A4FF" },
                padding: "10px 30px 10px 50px",
                color: "white",
                fontWeight: "500",
                fontSize: "22px",
                textTransform: "initial",
                borderRadius: "45px",
              }}
              variant="contained"
              endIcon={<ArrowForwardIosIcon className="h-6 w-6" />}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* <div className='hidden lg:block lg:col-span-6 lg:h-full relative h-[600px]'>
                        <div style={{ position: 'absolute', top: '0', left: '0', width: "100%", height: "100%", backgroundColor: 'rgba(128,128,128,0.8)' }}></div>
                        <video ref={myVideoRef} style={{ width: "100%", height: "100%", objectFit: "cover", WebkitFilter: "blur(5px) saturate(1)" }} muted>
                            <source ref={mySourceRef} src={currentVideo} type="video/mp4" />
                        </video>
                        <div className='flex justify-center items-center gap-5' style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }}>
                            <button className='hidden sm:block' type="button" onClick={onPrevious}>
                                <ArrowCircleLeftRoundedIcon className='opacity-80' sx={{ fontSize: '30px', color: 'rgb(156 163 175)', ":hover": { color: "rgb(62 232 181)" } }} />
                            </button>
                            <div>
                                <Stories
                                    loop={true}
                                    height={500}
                                    width={300}
                                    keyboardNavigation={true}
                                    storyContainerStyles={{ borderRadius: '15px', border: '1px solid gray' }}
                                    onStoryStart={onStoryStart}
                                    stories={stories}
                                    currentIndex={selectedIndex}
                                />
                            </div>
                            <button className='hidden sm:block' type="button" onClick={onNext}>
                                <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '30px', color: 'rgb(156 163 175)', ":hover": { color: "rgb(62 232 181)" } }} />
                            </button>
                        </div>
                    </div> */}

        <img
          className="z-50 w-[60vw] h-[100%] object-cover hidden lg:block"
          src={img}
          alt=""
        />
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ borderRadius: "40px" }}
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
              Learn More
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
    </section>
  );
};

export default Hero;
