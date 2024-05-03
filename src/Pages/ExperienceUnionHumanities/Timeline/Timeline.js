import React, { useRef } from "react";
import timeLineDesktop from "../../../assets/EnperienceUnion/DesktopMovieLab.jpg";
import timeLineMobile from "../../../assets/EnperienceUnion/MobileViewMovieLab.jpg";
import ReactGA from "react-ga4";
import emailjs from "@emailjs/browser";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Swal from "sweetalert2";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Timeline = () => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    ReactGA.event({
      category: "Click",
      action: "Apply Now in Product Lab",
      label: "Submit",
    });
    setOpen(true);
  };
  const handleClickOpen1 = () => {
    ReactGA.event({
      category: "Click",
      action: "Download Brochure in Product Lab",
      label: "Submit",
    });
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
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
  const handleSubmitDownloadBrochure = (event) => {
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

    const a = document.createElement("a");
    a.href =
      "https://drive.google.com/uc?export=download&id=16Zpw9uP_ZyWmyjuKAeEi6h11-WXrN8sl";
    a.download = "HandBook.pdf"; // Set the desired file name
    a.click();
  };
  return (
    <div className="bg-[#141414]">
      <img
        className="hidden md:block"
        style={{
          width: "90%",
          height: "auto",
          objectFit: "cover",
          margin: "0 auto",
        }}
        src={timeLineDesktop}
        alt=""
      />
      <img
        className="block md:hidden"
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        src={timeLineMobile}
        alt=""
      />
      <div className="bg-[#141414] text-white px-10 lg:px-28 py-20 pt-40 flex flex-col md:flex-row gap-20">
        <button
          onClick={handleClickOpen}
          className="w-full bg-gradient-to-r from-cyan to-green hover:shadow-lg hover:shadow-[#121212] py-10 lg:m-10 rounded-lg hover:bg-opacity-60 hover:transition-all hover:delay-200 hover:ease-out text-4xl lg:text-5xl"
        >
          Apply Now
        </button>
        <button
          onClick={handleClickOpen1}
          className="w-full hover:shadow-lg hover:shadow-[#121212] py-10 lg:m-10 rounded-lg border-white border-2 hover:bg-opacity-60 hover:transition-all hover:delay-200 hover:ease-out text-4xl lg:text-5xl"
        >
          Download Brochure
        </button>
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
      <Dialog
        open={open1}
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
              DOWNLOAD Career Handbook
            </h1>
          </div>
          <form
            onSubmit={handleSubmitDownloadBrochure}
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
                value={"Download"}
              />
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Timeline;
