import React, { useState } from "react";
import background from "../../../assets/background.avif";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Person3Icon from "@mui/icons-material/Person3";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import ListIcon from "@mui/icons-material/List";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const ExperienceUnionHero = () => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const selectClass = form.selectClass.value;

    // console.log(name, email , phone , selectClass);

    if (!name || !email || !phone || !selectClass) {
      setError("Please fill in all the fields");
    } else {
      const a = document.createElement("a");
      a.href =
        "https://drive.google.com/uc?export=download&id=1-g7Bsun3RvKAezjWFZOL9QOvlnfcELRk";
      a.download = "Brochure.pdf"; // Set the desired file name
      a.click();
      handleClose();
    }
  };

  return (
    <div className="bg-[#121212] flex flex-col lg:flex-row justify-between items-center text-white border-b-4 border-b-cyan">
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ width: "100%", borderRadius: "10px" }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-[#424242] p-8 rounded-md border-2 border-custom-blue border-opacity-40 w-full lg:min-w-[480px] text-white"
        >
          <div className="mb-6 flex justify-between text-lg">
            <p>Download Brochure</p>
            <button onClick={handleClose}>X</button>
          </div>
          <div>
            <label>
              Name<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2 mt-4 border px-3 py-3 rounded-md">
              <Person3Icon />
              <input
                required
                name="name"
                className="w-full bg-transparent border-0 focus:outline-0"
                type="text"
                placeholder="Enter Your name"
              />
            </div>
          </div>
          <div className="mt-6">
            <label>
              Email<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2 mt-4 border px-3 py-3 rounded-md">
              <EmailIcon />
              <input
                required
                name="email"
                className="w-full bg-transparent border-0 focus:outline-0"
                type="email"
                placeholder="Enter Your email"
              />
            </div>
          </div>
          <div className="mt-6">
            <label>
              Mobile Number<span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2 mt-4 border px-3 py-3 rounded-md">
              <CallIcon />
              <input
                required
                name="phone"
                className="w-full bg-transparent border-0 focus:outline-0"
                type="text"
                placeholder="Enter Your mobile number"
              />
            </div>
          </div>

          <div className="mt-6">
            <label>
              Class<span className="text-red-600">*</span>
            </label>
            <div
              required
              className="flex gap-2 mt-4 border px-3 py-3 rounded-md"
            >
              <ListIcon />
              <select
                required
                name="selectClass"
                className="w-full bg-[#424242] border-0 focus:outline-0"
                type=""
                placeholder="Enter Your mobile number"
              >
                <option>Select the option</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>
          </div>

          {error && <p className="my-4 text-red-600">{error}</p>}

          <div className="mt-8 flex gap-2 items-start">
            <input
              type="submit"
              value={"Download Brochure"}
              href="https://drive.google.com/uc?export=download&id=1-g7Bsun3RvKAezjWFZOL9QOvlnfcELRk"
              className="w-full bg-gradient-to-r from-cyan to-green hover:shadow-lg hover:shadow-[#121212] py-3 rounded-md hover:bg-opacity-60 hover:transition-all hover:delay-200 hover:ease-out font-bold text-center"
            />
          </div>
        </form>
      </Dialog>
      <div className="pt-40 lg:pb-0 pb-20 lg:pl-28 pl-10 w-full">
        <div className="flex items-center gap-3 bg-[#424242] w-fit p-3 rounded-lg">
          <CalendarTodayIcon className="text-cyan" />
          5th June - 11th June, 2023
        </div>
        <h1 className="text-6xl font-semibold mt-4">
          Summer{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
            Startup <br />
            Week
          </span>
        </h1>
        <p className="mt-4 text-2xl">
          For students in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-green">
            Grades 9-12
          </span>
        </p>
        <div className="flex flex-wrap mt-8 gap-3">
          <button className="bg-gradient-to-r from-cyan to-green py-3 min-w-[250px] text-2xl rounded-lg hover:transition-all hover:ease-out hover:delay-200 hover:shadow-lg hover:shadow-[#424242]">
            Apply Now
          </button>
          <button
            onClick={handleClickOpen}
            className="hover:shadow-[#424242] border-2 py-3 min-w-[250px] text-2xl rounded-lg  hover:shadow-lg"
          >
            Download Brochure
          </button>
        </div>
      </div>
      <img
        className="bg-[#4242421d] h-[100vh] w-1/2 object-cover lg:block hidden"
        src={background}
        alt=""
      />
    </div>
  );
};

export default ExperienceUnionHero;
