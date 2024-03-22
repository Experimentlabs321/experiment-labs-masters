import React, { useContext, useEffect, useState } from "react";
import Vector from "../../../assets/Dashboard/Vector.png";
import VectorMobile from "../../../assets/Dashboard/VectorMobile.png";
import Flower from "../../../assets/Dashboard/Periwinkle.png";
import Flower1 from "../../../assets/Dashboard/Periwinkle1.png";
import Star from "../../../assets/Dashboard/Star.png";
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
import { Link } from "react-router-dom";
import RoundAvatar from "../../Dashboard/Shared/RoundAvatar";
import { CircularProgress } from "@mui/material";
import axios from "axios";
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

const DashboardUserUpdate = ({
  dashboardImages,
  setIsOpen,
  isOpen,
  courses,
  setSelectedCourse,
  selectedCourse,
  weeks,
  currentCourseCompletion,
  dashboardTheme,
  isLoading,
}) => {
  const { userInfo } = useContext(AuthContext);
  const [currentWeek, setCurrentWeek] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);
  useEffect(() => {
    const currentDateTime = new Date();
    weeks?.forEach((element) => {
      const weekStartDate = new Date(element?.weekStartDate);
      const weekEndDate = new Date(element?.weekEndDate);
      if (weekStartDate <= currentDateTime && weekEndDate >= currentDateTime) {
        setCurrentWeek(element);
      }
    });
  }, [weeks]);

  const {
    isAvatar,
    courseCompletionText,
    courseCompletionBgColor,
    avatarBg,
    addCourseCompletion,
    courseCompletionDesign,
    openBoxButtonText,
    openBoxImage,
    openBoxButtonBg,
    openBoxCardBg,
    addOpenBox,
    addJoinQuest,
    joinQuestBtnText,
    joinQuestBtnBg,
    joinQuestCardBg,
    joinQuestImgBg,
    joinQuestImg,
  } = dashboardTheme;
  // console.log(dashboardTheme);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/api/v1/chapters`)
      .then((response) => {
        const currentCourseChapter = response?.data?.filter(
          (item) => item?.courseId === selectedCourse?._id
        );
        if (currentCourseChapter) {
          let totalCompleted = 0;
          let totalTask = 0;
          currentCourseChapter?.forEach((item) => {
            item?.tasks?.forEach((singleTask) => {
              totalTask++;
              if (singleTask?.participants) {
                if (
                  singleTask?.participants?.find(
                    (item) => item?.participantId === userInfo?._id
                  )
                ) {
                  totalCompleted++;
                }
              }
            });
          });
          if (totalCompleted !== 0 && totalTask !== 0)
            setCompletionPercentage(
              parseInt((totalCompleted / totalTask) * 100)
            );
        }
      })
      .catch((error) => console.error(error));
  }, [userInfo, selectedCourse]);

  return (
    <div>
      <div className=" relative w-fit">
        {isLoading && (
          <div className=" flex align-items-center my-5 py-5">
            <CircularProgress className="w-full mx-auto" />
          </div>
        )}
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

      {addCourseCompletion && (
        <>
          <div className="relative inline-block w-full mb-[10px]">
            <div
              className="flex items-center justify-right mt-5 w-full "
              onClick={() => setIsOpen(!isOpen)}
            >
              <button className="cursor-pointer bg-[#FF557A] text-[15px] font-[700] py-3 px-4 rounded-full flex items-center justify-center shadow-[0px_2px_4px_0px_#00000026]">
                {selectedCourse?.courseFullName}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.71484 17.9847L14.5187 12.1808L8.71484 6.37695"
                    stroke="white"
                    stroke-width="1.93462"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            {isOpen && (
              <ul className="absolute top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100 z-10 ">
                {courses?.map((option, index) => (
                  <li
                    key={index}
                    className="cursor-pointer py-2 text-[#6A6A6A] text-[14px] font-[400] "
                    onClick={() => {
                      setSelectedCourse(option);
                      setCompletionPercentage(0);
                      localStorage.setItem("course", option?.courseFullName);
                      setIsOpen(false);
                    }}
                  >
                    {option?.courseFullName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div
              style={{
                filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                backgroundColor: courseCompletionBgColor,
              }}
              className="h-[132px] lg:h-[185px] mt-[20px] lg:mt-[80px] rounded-[14px]"
            >
              {!isAvatar ? (
                <>
                  <img
                    className="float-left mt-[-50px] hidden lg:block"
                    src={dashboardImages?.userImg}
                    alt="person"
                  />

                  <img
                    className=" float-left mt-[-13px] lg:hidden"
                    src={dashboardImages?.userImgMobile}
                    alt="person"
                  />
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:justify-around h-full">
                    <h1 className="lg:text-[26px] text-[15px] font-[600] text-white text-center z-[1]">
                      {courseCompletionText}{" "}
                      <span className="text-[#FFDB70]">
                        {completionPercentage}%
                      </span>{" "}
                      complete
                    </h1>
                  </div>
                </>
              ) : (
                <>
                  <div className="float-left hidden lg:flex h-full ml-4 items-center">
                    <RoundAvatar
                      name={userInfo?.name}
                      avatarBg={avatarBg}
                      imageSrc={userInfo?.profileImg}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:justify-around h-full">
                    <h1 className="lg:text-[26px] text-[15px] font-[600] text-white text-center z-[1]">
                      {courseCompletionText}{" "}
                      <span className="text-[#FFDB70]">
                        {completionPercentage}%
                      </span>{" "}
                      complete
                    </h1>
                  </div>
                </>
              )}
              {/* <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:justify-around h-full">
              <h1 className="lg:text-[26px] text-[15px] font-[600] text-white text-center z-[1]">
                {courseCompletionText}{" "}
                <span className="text-[#FFDB70]">{currentCourseCompletion}%</span>{" "}
                complete
              </h1> */}
              {/* <DashboardPrimaryButton
              bgColor="#FFDB70"
              shadow="0px 7.50435px 0px #F08323"
            >
              Open Feedback
            </DashboardPrimaryButton> */}
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
              {/* </div> */}
              {courseCompletionDesign && (
                <>
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
                </>
              )}
            </div>
          </div>
        </>
      )}

      {(addOpenBox || addJoinQuest) && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-[50px]">
          {addOpenBox && (
            <div
              style={{
                filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                backgroundColor: openBoxCardBg,
              }}
              className="py-[30px] px-[30px] flex flex-col justify-between items-center gap-8 rounded-[14px]"
            >
              <img
                className="h-24"
                src={openBoxImage || dashboardImages?.treasureImg}
                alt="open box"
              />
              <DashboardPrimaryButton
                bgColor={openBoxButtonBg}
                shadow="0px 5.85246px 0px #CA5F98"
              >
                <p className="flex items-center text-white justify-center">
                  {openBoxButtonText}
                </p>
              </DashboardPrimaryButton>
            </div>
          )}

          {addJoinQuest && (
            <div
              style={{
                filter: "drop-shadow(3.75217px 3.75217px 0px #000000)",
                backgroundColor: joinQuestCardBg,
              }}
              className="lg:col-span-2 flex flex-col lg:flex-row items-center rounded-[14px] px-[12px] lg:px-[32px] py-[23px] lg:py-[54px] gap-3"
            >
              <div
                style={{ backgroundColor: joinQuestImgBg }}
                className="rounded-md h-full flex items-center justify-center"
              >
                <img
                  className="max-h-[137px]"
                  src={joinQuestImg || dashboardImages?.questImg}
                  alt="WeekUpdate"
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-white text-[13px] lg:text-[22px] font-[700] text-center lg:text-left">
                  {currentWeek?.weekName}
                </h1>
                <DashboardPrimaryButton
                  bgColor={joinQuestBtnBg}
                  shadow="0px 7.50435px 0px #F08323"
                  classes="mb-[12px]"
                >
                  <Link
                    to={`/questLevels/${selectedCourse?._id}`}
                    className="flex items-center justify-center "
                  >
                    {joinQuestBtnText}{" "}
                    <img
                      className="pl-1 w-[21px] lg:w-[32px]"
                      src={RightArrowBlack}
                      alt="RightArrowBlack"
                    />
                  </Link>
                </DashboardPrimaryButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardUserUpdate;
