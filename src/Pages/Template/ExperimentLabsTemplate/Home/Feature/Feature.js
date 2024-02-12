import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Button } from "@mui/material";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
//import img1 from "../../../assets/feature/Rectangle 28.png";
//import img2 from "../../../assets/feature/Rectangle 26.png";
//import img3 from "../../../assets/feature/Rectangle 27.png";
//import imgL1 from "../../../assets/feature/Rectangle 28L.png";
//import imgL2 from "../../../assets/feature/Rectangle 26L.png";
//import imgL3 from "../../../assets/feature/Rectangle 27L.png";
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

const Feature = ({featureData}) => {
  const [courses, setCourses] = useState([...featureData]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mouseEnteredIndex, setMouseEnteredIndex] = useState(-1);

  const stickyRef = useRef(null);
  const containerRef = useRef(null);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      const handleScroll = () => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const stickyRect = stickyRef?.current?.getBoundingClientRect();
        const bottomOffset = containerRect.bottom - stickyRect?.height;

        if (bottomOffset < 0) {
          stickyRef.current.style.position = "absolute";
          stickyRef.current.style.bottom = "0";
        } else {
          stickyRef.current.style.position = "sticky";
          stickyRef.current.style.bottom = "auto";
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLargeScreen]);

  // console.log(isLargeScreen);

  console.log("Mouse Entered Index-----> ", mouseEnteredIndex);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const form = useRef();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   const name = form.name.value;
  //   const number = form.number.value;
  //   const email = form.email.value;
  //   const option = form.option.value;
  //   const city = form.city.value;

  //   const data = {
  //     Name: name,
  //     Number: "+91" + number,
  //     Email: email,
  //     Option: option,
  //     City: city,
  //     Time: new Date(),
  //   };

  //   console.log(data);

  //   fetch(
  //     "",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   )
  //     .then((data) => {
  //       // The response comes here
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // Errors are reported there
  //       console.log(error);
  //     });

  //   const templateParams = {
  //     from_name: name,
  //     message: `
  //           Name: ${name},
  //           Number: ${"+91" + number},
  //           Email: ${email},
  //           ${option},
  //           City: ${city},
  //           Time: ${new Date()},
  //           `,
  //   };

  //   emailjs
  //     .send(
  //       "service_s3bklnu",
  //       "template_l0yacbb",
  //       templateParams,
  //       "U0g6Ht1DVmnBbENk0"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //         toast.success("Message Sent");
  //         event.target.reset();
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  return (
    <div className="mt-20" ref={containerRef}>
      <div
        ref={stickyRef}
        style={{
          position: `${isLargeScreen ? "sticky" : "block"}`,
          top: 75,
          backgroundColor: "#141414",
          padding: "30px 0",
          zIndex: "1000",
        }}
      >
        <h1 className="text-4xl font-medium px-5 lg:px-40">
          Envision. Experiment. Educate. Enable.
        </h1>
        <h1 className="text-4xl mt-2 font-medium px-5 lg:px-40 ">
          Hands-on & Career Driven Programmes
        </h1>
        <div className="parent-container lg:justify-center justify-start px-5 lg:px-40">
          {courses.map((course, index) => (
            <div
              onClick={() => {
                ReactGA.event({
                  category: "Click",
                  action: course?.category,
                  label: course?.category,
                });
                setSelectedIndex(index);
              }}
              className={`courses ${selectedIndex !== index && "bg-dark"} ${
                selectedIndex === index && "bg-purple text-white"
              }`}
              key={index}
            >
              {course?.category}
            </div>
          ))}
        </div>
      </div>

      {selectedIndex === 0 && (
        <div className="hidden lg:flex overflow-x-scroll  hPart gap-8 mt-8 px-5 lg:px-40 relative justify-evenly">
          {courses[selectedIndex]?.details?.map((course, index) => (
            <Link
              onClick={() => {
                ReactGA.event({
                  category: "Click",
                  action: course?.link,
                  label: course?.link,
                });
                window.location = course?.link;
              }}
              onMouseEnter={() => setMouseEnteredIndex(index)}
              onMouseLeave={() => setMouseEnteredIndex(-1)}
            >
              <div
                className="w-[20vw]"
                style={{
                  background:
                    "linear-gradient(360deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.12192) 25.08%, rgba(0, 0, 0, 0) 50%), #6278FF",
                  borderRadius: "24px",
                  padding: "31px 10px 40px",
                  minHeight: "460px",
                  maxHeight: "460px",
                }}
              >
                <div className="flex justify-between items-center pl-[9px] pr-[14px]">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      padding: "5px 20px",
                      border: "2px solid #94A4FF",
                      borderRadius: "45px",
                    }}
                  >
                    {course.category}
                  </p>
                  <MoreVertIcon />
                </div>

                <p
                  className="pl-[9px] pr-[14px]"
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginTop: "27px",
                    marginBottom: "40px",
                  }}
                >
                  {course?.title}
                </p>
                <img src={course?.img} alt="" />
              </div>

              <Link
                onClick={() => {
                  ReactGA.event({
                    category: "Click",
                    action: course?.link,
                    label: course?.link,
                  });
                  window.location = course?.link;
                }}
              >
                <div
                  style={{ borderRadius: "24px" }}
                  className={`${
                    index === mouseEnteredIndex
                      ? "absolute top-0 z-50 w-[20vw]"
                      : "hidden"
                  } bg-[#94A4FF] pt-1 pl-1`}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(360deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.12192) 25.08%, rgba(0, 0, 0, 0) 50%), #6278FF",
                      borderRadius: "24px",
                    }}
                    key={index}
                    className="min-h-[460px] max-h-[460px]"
                  >
                    <div className="w-full p-5">
                      <div
                        style={{ borderBottom: "2px solid #94A4FF" }}
                        className="pb-5"
                      >
                        <h4 className="text-xl font-bold mt-3 ">
                          {course.title}
                        </h4>
                      </div>
                    </div>
                    <div className="w-full px-5">
                      <div
                        style={{ borderBottom: "2px solid #94A4FF" }}
                        className="pb-5 grid grid-cols-2 justify-between gap-y-4"
                      >
                        <div className="flex items-center">
                          <span className="p-[6px] rounded mr-2 bg-opacity-40">
                            <AccessTimeRoundedIcon sx={{ color: "#94A4FF" }} />
                          </span>
                          <span
                            style={{ fontSize: "12px" }}
                            className="font-bold"
                          >
                            {course?.data[0]}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="p-[6px] rounded mr-2 bg-opacity-40">
                            <LocationOnRoundedIcon sx={{ color: "#94A4FF" }} />
                          </span>
                          <span
                            style={{ fontSize: "12px" }}
                            className="font-bold"
                          >
                            {course?.data[1]}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="p-[6px] rounded mr-2 bg-opacity-40">
                            <WorkRoundedIcon sx={{ color: "#94A4FF" }} />
                          </span>
                          <span
                            style={{ fontSize: "12px" }}
                            className="font-bold"
                          >
                            {course?.data[2]}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="p-[6px] rounded mr-2 bg-opacity-40">
                            <CalendarMonthRoundedIcon
                              sx={{ color: "#94A4FF" }}
                            />
                          </span>
                          <span
                            style={{ fontSize: "12px" }}
                            className="font-bold"
                          >
                            {course?.data[3]}
                          </span>
                        </div>
                      </div>
                      <div className="pt-5 flex flex-col justify-items-stretch gap-3 mb-16">
                        {course?.info?.map((point, index) => (
                          <div className="flex flex-row items-center gap-1">
                            <span>
                              <PlayArrowRoundedIcon
                                sx={{ color: "#94A4FF", opacity: "0.4" }}
                              />
                            </span>
                            <span
                              style={{ fontSize: "12px", fontWeight: "700" }}
                            >
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-0 right-0 p-6">
                        <Link
                          onClick={handleClickOpen}
                          style={{ borderRadius: "22.5px", fontSize: "16px" }}
                          className="mt-5 px-5 py-2 bg-pink text-white hover:bg-purple"
                        >
                          Apply Now{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Link>
          ))}
        </div>
      )}

      {selectedIndex !== 0 && (
        <div className="hidden lg:block mt-8 px-5 lg:px-40 ">
          {courses[selectedIndex]?.details?.map((course, index) => (
            <Link
              onClick={() => {
                ReactGA.event({
                  category: "Click",
                  action: course?.link,
                  label: course?.link,
                });
                window.location = course?.link;
              }}
            >
              <div
                style={{ borderRadius: "24px" }}
                className={`bg-[#94A4FF] pt-1 pl-1`}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(360deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.12192) 25.08%, rgba(0, 0, 0, 0) 50%), #6278FF",
                    borderRadius: "24px",
                  }}
                  key={index}
                  className="flex gap-10 items-center"
                >
                  <img
                    style={{
                      height: "100%",
                      width: "470px",
                      objectFit: "cover",
                    }}
                    src={course?.imgLg}
                    alt=""
                  />

                  <div>
                    <div className="w-full p-5">
                      <div
                        style={{ borderBottom: "2px solid #94A4FF" }}
                        className="pb-10"
                      >
                        <h4 className="text-3xl font-bold mt-3">
                          {course.title}
                        </h4>
                      </div>
                    </div>
                    <div className="w-full px-5 py-5">
                      <div
                        style={{ borderBottom: "2px solid #94A4FF" }}
                        className="flex items-center justify-between gap-10 pb-10"
                      >
                        <div className="grid grid-cols-2 justify-between gap-y-4">
                          <div className="flex items-center">
                            <span className="p-[6px] rounded mr-2 bg-opacity-40">
                              <AccessTimeRoundedIcon
                                sx={{ color: "#94A4FF" }}
                              />
                            </span>
                            <span
                              style={{ fontSize: "12px" }}
                              className="font-bold"
                            >
                              {course?.data[0]}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="p-[6px] rounded mr-2 bg-opacity-40">
                              <LocationOnRoundedIcon
                                sx={{ color: "#94A4FF" }}
                              />
                            </span>
                            <span
                              style={{ fontSize: "12px" }}
                              className="font-bold"
                            >
                              {course?.data[1]}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="p-[6px] rounded mr-2 bg-opacity-40">
                              <WorkRoundedIcon sx={{ color: "#94A4FF" }} />
                            </span>
                            <span
                              style={{ fontSize: "12px" }}
                              className="font-bold"
                            >
                              {course?.data[2]}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="p-[6px] rounded mr-2 bg-opacity-40">
                              <CalendarMonthRoundedIcon
                                sx={{ color: "#94A4FF" }}
                              />
                            </span>
                            <span
                              style={{ fontSize: "12px" }}
                              className="font-bold"
                            >
                              {course?.data[3]}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          {course?.info?.map((point, index) => (
                            <div className="flex flex-row items-center gap-1">
                              <span>
                                <PlayArrowRoundedIcon
                                  sx={{ color: "#94A4FF", opacity: "0.4" }}
                                />
                              </span>
                              <span
                                style={{ fontSize: "12px", fontWeight: "700" }}
                              >
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-center py-10 px-5">
                        <Link
                          style={{ borderRadius: "22.5px", fontSize: "18px" }}
                          className="mt-5 px-5 py-2 bg-pink text-white hover:bg-purple"
                        >
                          Apply Now{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="block lg:hidden px-5 lg:px-40 ">
        <div className="feature-slide-parent-container">
          {courses[selectedIndex]?.details?.map((course, index) => (
            <div
              style={{
                background:
                  "linear-gradient(360deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.12192) 25.08%, rgba(0, 0, 0, 0) 50%), #6278FF",
                borderRadius: "24px",
              }}
              key={index}
              className="relative feature-course"
            >
              <Link
                onClick={() => {
                  ReactGA.event({
                    category: "Click",
                    action: course?.link,
                    label: course?.link,
                  });
                  window.location = course?.link;
                }}
              >
                <div className="w-full p-5">
                  <div
                    style={{ borderBottom: "2px solid #94A4FF" }}
                    className="pb-5"
                  >
                    <h4 className="text-xl font-bold mt-3 ">{course.title}</h4>
                  </div>
                </div>
                <div className="w-full px-5">
                  <div
                    style={{ borderBottom: "2px solid #94A4FF" }}
                    className="pb-5 grid grid-cols-2 justify-between gap-y-4"
                  >
                    <div className="flex items-center">
                      <span className="bg-opacity-40 p-[6px] rounded mr-2">
                        <AccessTimeRoundedIcon sx={{ color: "#94A4FF" }} />
                      </span>
                      <span style={{ fontSize: "12px" }} className="font-bold">
                        {course?.data[0]}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-opacity-40 p-[6px] rounded mr-2">
                        <LocationOnRoundedIcon sx={{ color: "#94A4FF" }} />
                      </span>
                      <span style={{ fontSize: "12px" }} className="font-bold">
                        {course?.data[1]}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-opacity-40 p-[6px] rounded mr-2">
                        <WorkRoundedIcon sx={{ color: "#94A4FF" }} />
                      </span>
                      <span style={{ fontSize: "12px" }} className="font-bold">
                        {course?.data[2]}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-opacity-40 p-[6px] rounded mr-2">
                        <CalendarMonthRoundedIcon sx={{ color: "#94A4FF" }} />
                      </span>
                      <span style={{ fontSize: "12px" }} className="font-bold">
                        {course?.data[3]}
                      </span>
                    </div>
                  </div>
                  <div className="pt-5 flex flex-col justify-items-stretch gap-3 mb-16">
                    {course?.info?.map((point, index) => (
                      <div className="flex flex-row items-center gap-1">
                        <span>
                          <PlayArrowRoundedIcon
                            sx={{ color: "#94A4FF", opacity: "0.4" }}
                          />
                        </span>
                        <span style={{ fontSize: "12px", fontWeight: "700" }}>
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 right-0 p-6">
                    <Link
                      style={{ borderRadius: "22.5px", fontSize: "16px" }}
                      className="mt-5 px-5 py-2 bg-pink text-white hover:bg-purple"
                    >
                      Apply Now{" "}
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
