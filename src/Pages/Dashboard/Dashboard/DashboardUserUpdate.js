import React, { useContext } from "react";
import Vector from "../../../assets/Dashboard/Vector.png";
import VectorMobile from "../../../assets/Dashboard/VectorMobile.png";
import Person from "../../../assets/Dashboard/person.png";
import PersonForMobile from "../../../assets/Dashboard/personForMobile.png";
import Flower from "../../../assets/Dashboard/Periwinkle.png";
import Flower1 from "../../../assets/Dashboard/Periwinkle1.png";
import Star from "../../../assets/Dashboard/Star.png";
import OpenBox from "../../../assets/Dashboard/OpenBox.png";
import WeekUpdate from "../../../assets/Dashboard/WeekUpdate.png";
import RightArrowBlack from "../../../assets/Dashboard/RightArrowBlack.png";
import DashboardPrimaryButton from "../Shared/DashboardPrimaryButton";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DialogLayout from "../Shared/DialogLayout";
import { AuthContext } from "../../../contexts/AuthProvider";

// Define a custom theme
const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "purple", // Set your desired background color here
          borderRadius: "20px",
          padding: "0px",
        },
      },
    },
  },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 0 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const DialogContentWrapper = styled(DialogContent)(({ theme }) => ({
  width: "500px",
  height: "300px",
  padding: theme.spacing(2),
}));

const DashboardUserUpdate = () => {
  const [open, setOpen] = React.useState(false);
  const { userInfo } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className=" relative w-fit">
        <h1 className="text-[22px] lg:text-[40px] font-[700]">
          Welcome, {userInfo?.name}
        </h1>
        <img
          className=" absolute top-10 right-0 left-72 hidden lg:block"
          src={Vector}
          alt="vector"
        />
        <img
          className=" absolute top-6 right-0 left-40 lg:hidden block"
          src={VectorMobile}
          alt="vector"
        />
      </div>
      <div>
        <div
          style={{
            filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
          }}
          className="bg-[#3E4DAC] h-[132px] lg:h-[185px] mt-[20px] lg:mt-[80px] rounded-[14px]"
        >
          <img
            className=" float-left mt-[-50px] hidden lg:block"
            src={Person}
            alt="person"
          />
          <img
            className=" float-left mt-[-13px] lg:hidden"
            src={PersonForMobile}
            alt="person"
          />
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:justify-around h-full">
            <h1 className="lg:text-[26px] text-[15px] font-[600] text-white text-center z-[1]">
              Your course is <span className="text-[#FFDB70]">35%</span>{" "}
              complete
            </h1>
            <DashboardPrimaryButton
              bgColor="#FFDB70"
              shadow="0px 7.50435px 0px #F08323"
            >
              Open Feedback
            </DashboardPrimaryButton>
            {/* <DialogLayout
              title={
                <p className="bg-[#6278FF] h-[69px] lg:h-[95px] text-center text-[18px] lg:text-[25px] font-[700] flex items-center justify-center text-white py-5">
                  Modal from layout
                </p>
              }
              open={open}
              setOpen={setOpen}
              bgColor="#FFDB70"
              width={700}
            >
              <p className="bg-white">This is the dialog content.</p>
              <p>It has a width of 500px and a height of 300px.</p>
            </DialogLayout>
            <Button variant="outlined" onClick={handleClickOpen}>
              Open dialog
            </Button> */}
          </div>
          <img
            className=" absolute left-32 lg:left-60 top-0 z-0 w-[22px] lg:w-[57px]"
            src={Flower}
            alt="Flower"
          />
          <img
            className=" absolute bottom-1 right-8 lg:right-52 z-0 w-[22px] lg:w-[57px]"
            src={Star}
            alt="Star"
          />
          <img
            className=" absolute top-0 right-0 z-0 w-[22px] lg:w-[57px]"
            src={Flower1}
            alt="Flower1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-[50px]">
        <div
          style={{
            filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
          }}
          className="bg-[#FFC7C7] py-[30px] px-[30px] flex flex-col justify-between items-center gap-8 rounded-[14px]"
        >
          <img src={OpenBox} alt="open box" />
          <DashboardPrimaryButton
            bgColor="#3E4DAC"
            shadow="0px 5.85246px 0px #CA5F98"
          >
            <p className="flex items-center text-white justify-center">
              Open Box
            </p>
          </DashboardPrimaryButton>
        </div>
        <div
          style={{
            filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
          }}
          className="lg:col-span-2 flex flex-col lg:flex-row items-center bg-[#0F3934] rounded-[14px] px-[12px] lg:px-[32px] py-[23px] lg:py-[54px] gap-3"
        >
          <div className="bg-[#FF74BE] rounded-md h-full flex items-center justify-center">
            <img src={WeekUpdate} alt="WeekUpdate" />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-white text-[13px] lg:text-[22px] font-[700] text-center lg:text-left">
              Week 4: Product development
            </h1>
            <DashboardPrimaryButton
              bgColor="#FFDB70"
              shadow="0px 7.50435px 0px #F08323"
              classes="mb-[12px]"
            >
              <p className="flex items-center justify-center ">
                Join Quest{" "}
                <img
                  className="pl-1 w-[21px] lg:w-[32px]"
                  src={RightArrowBlack}
                  alt="RightArrowBlack"
                />
              </p>
            </DashboardPrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserUpdate;
