import React, { useRef } from "react";
import img from "../../../assets/wepik-export-20230516131526jrNm.png";
import Person3Icon from "@mui/icons-material/Person3";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
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

const GetInTouch = () => {
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
        // handleClose();
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });
  };
  return (
    // <div style={{ background: `url(${img})`, objectFit: 'cover' }} className='pt-40 flex items-center justify-center pb-40'>
    <div
      style={{
        background:
          "linear-gradient(270deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.274309) 35.55%, rgba(0, 0, 0, 0) 100%), #6278FF",
      }}
      className="pt-40 flex items-center justify-center pb-40"
    >
      <div className="px-10 lg:px-32 flex flex-col lg:flex-row gap-20 justify-between items-center w-full">
        <div className="w-full text-center">
          <h1 className="text-4xl font-bold">Is This programme for me?</h1>
          <p className="text-3xl font-light mt-3">
            Talk to the Experiment Labs Counsellor to understand if you are a
            good fit
          </p>
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="text-dark p-8 rounded-md border-custom-blue  border-opacity-40 w-full lg:max-w-[480px]"
          >
            <div>
              <label className="ml-5 text-white">Name</label>
              <div className="flex gap-2  border-2xl bg-[white] px-2 py-2 rounded-3xl">
                <input
                  className="w-full bg-transparent border-0 focus:outline-0 text-center"
                  type="text"
                  placeholder="Enter Your name"
                  name="name"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="ml-5 text-white">Email</label>
              <div className="flex border-2xl gap-2 bg-[white] border px-2 py-2 rounded-3xl">
                <input
                  className="w-full bg-transparent border-0 focus:outline-0 text-center"
                  type="email"
                  placeholder="Enter Your email"
                  name="email"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="ml-5 text-white">Phone no</label>
              <div className="flex gap-2 bg-[white] border-2xl  border px-2 py-2 rounded-3xl">
                <input
                  className="w-full bg-transparent border-0 focus:outline-0 text-center"
                  type="text"
                  placeholder="Enter Your mobile number"
                  name="number"
                />
              </div>
            </div>
            {/*  <div className='mt-6 flex gap-2 items-start'>
                            <input type="checkbox" />
                            <label className='text-xs font-light'>I authorize Masters' Union to contact me with updates via Calls, SMS, WhatsApp and Emails. This will override my registry on DND/NDNC.</label>
                        </div> */}
            <div className="mt-6 flex gap-2 justify-center ">
              <input
                className="w-44 bg-pink text-white py-2 rounded-3xl hover:bg-purple hover:transition-all hover:delay-200 hover:ease-out"
                type="submit"
                value={"Get In Touch"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
