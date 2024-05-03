import React, { useRef } from "react";
import img from "../../../assets/wepik-export-20230516131526jrNm.png";
import img1 from "../../../assets/Overview/thumbnail-teacher-ambassador.png";
import "./style.css";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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

const Overview = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    ReactGA.event({
      category: "Click",
      action: "Open form from Connect With Counselor",
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
    console.log("Clicked");
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

    console.log("Gone Here ===============>", data);

    fetch(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/interactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (res) => {
        console.log("Submit ===============>", res);
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
        console.log("Send Mail ===============>", sendMail);
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
        console.log(error);
      });
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    ReactGA.event({
      category: "Click",
      action: "Open Form for Career Handbook from Science & Innovation Hero",
      label: 'Apply Now'
    });
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };


  const handleSubmit2 = event => {
    event.preventDefault();
    console.log("Clicked");
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

    console.log("Gone Here ===============>", data);

    fetch(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/interactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (res) => {
        console.log("Submit ===============>", res);
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
        console.log("Send Mail ===============>", sendMail);
        if (sendMail?.data?.success) {
          Swal.fire({
            icon: "success",
            text: "Thanks For your response!",
          });
        }
        handleClose2();
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });

    const a = document.createElement('a');
    a.href = 'https://drive.google.com/uc?export=download&id=16Zpw9uP_ZyWmyjuKAeEi6h11-WXrN8sl';
    a.download = 'HandBook.pdf'; // Set the desired file name
    a.click();

  }

  return (
    <div className="pt-40 flex items-center justify-center pb-20 font">
      <div className="px-10 lg:px-32">
        <div className="flex flex-col lg:flex-row gap-16 justify-center items-center">
          <div>
            <h2 className="text-3xl my-8">
              Explore careers and become a leader by building innovative
              products
            </h2>
            <p className="bg-[#6278FF] py-1 px-2 rounded-3xl text-sm text-bold inline">
              Career Planning through Innovation
            </p>
            <div className="mb-8 flex mt-11 flex-col gap-3">
              <div className="flex flex-row items-center gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span style={{ fontWeight: "500" }}>
                  Discover various career options in
                  Engineering,Product Management,Design, Research and 40+
                  fields.
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span style={{ fontWeight: "500" }}>
                  Create a standout portfolio for lvy league admissions in india
                  and abroad
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <span>
                  <PlayArrowRoundedIcon sx={{ color: "#FFFFFF" }} />
                </span>
                <span style={{ fontWeight: "500" }}>
                  Gain career clarity in commerce post 12th by working on
                  Industry projects.
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-8">
              <button onClick={handleClickOpen} className=" rounded-3xl bg-[#6278FF] font-semibold hover:bg-opacity-80 hover:transition-all hover:delay-300 hover:ease-out w-full py-1">
                Connect With Counsellor
              </button>
              <button onClick={handleClickOpen2} className=" border border-[#6278FF] rounded-3xl font-semibold hover:bg-opacity-80 hover:transition-all hover:delay-300 hover:ease-out w-full py-1">
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
                <h1 className="text-2xl font-bold">July 11, 2023</h1>
                <p
                  className="font-thin mt-2 text-sm"
                >
                  Limited seats only
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
                <h1 className="text-2xl font-bold">July 11, 2023</h1>
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
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-labelledby="responsive-dialog-title"
      >

        <div className='bg-dark w-full min-w-[300px] sm:min-w-[350px] lg:w-[500px] p-5 cursor-pointer'>
          <div className='w-full'>
            <h4 onClick={handleClose2} className='text-xl text-white text-right hover:text-purple'>x</h4>
            <h1 className='text-2xl font-semibold text-pink text-center'>DOWNLOAD  Career Handbook</h1>
          </div>
          <form onSubmit={handleSubmit2} autoComplete='off' className='lg:px-10'>
            <div className='flex flex-col items-center mt-6 gap-1 text-white'>
              <label htmlFor="name">Enter Name</label>
              <input required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" placeholder='Enter your Name' type="text" name="name" id="name" />
            </div>
            <div className='flex flex-col items-center mt-6 gap-1 text-white'>
              <label htmlFor="number">Enter Number</label>
              <input required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" placeholder='Enter your number' type="number" name="number" id="number" />
            </div>
            <div className='flex flex-col items-center mt-6 gap-1 text-white'>
              <label htmlFor="email">Enter Email</label>
              <input required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" placeholder='Enter your email' type="email" name="email" id="email" />
            </div>
            <div className='flex flex-col items-center mt-6 gap-1 text-white'>
              <label htmlFor="option">Select One</label>
              <select required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" name="option" id="option">
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
                <option value="Counselor">Counselor</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className='flex flex-col items-center mt-6 gap-1 text-white'>
              <label htmlFor="city">Enter City</label>
              <input required className="text-center w-full py-2 rounded-3xl text-black focus:outline-none" placeholder='Enter your city' type="text" name="city" id="city" />
            </div>
            <div className='flex flex-col items-center mt-6 gap-1 text-white'>
              <input className='text-white py-2 font-bold rounded-3xl bg-pink hover:bg-purple w-1/2 text-center' type="submit" value={'Download'} />
            </div>
          </form>
        </div>

      </Dialog>
    </div>
  );
};

export default Overview;
