//ManageLiveClasses

import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import arrowDown from "../../../assets/SkillsManagement/arrow.svg";
import arrowright from "../../../assets/SkillsManagement/arrowright.svg";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import required from "../../../assets/ContentManagement/required.png";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useLocation, useParams } from "react-router-dom";
import Level from "../Dashboard/Level";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import SkillBasedParameter from "./Components/Shared/SkillBasedParameter";
import ItemEarningParameter from "./Components/Shared/ItemEarningParameter";
import toast from "react-hot-toast";

const ManageLiveClasses = () => {
  const { id } = useParams();
  const [isOpenGeneral, setisOpenGeneral] = useState(true);
  const [isOpenRoomSettings, setisOpenRoomSettings] = useState(false);
  const [isOpenlockSettings, setisOpenlockSettings] = useState(false);
  const [isOpenclassTimings, setisOpenclassTimings] = useState(false);
  const [isOpenevaluationParameter, setisOpenevaluationParameter] =
    useState(false);

  const toggleDropdownGeneral = () => {
    setisOpenGeneral(!isOpenGeneral);
  };
  const toggleDropdownRoomSettings = () => {
    setisOpenRoomSettings(!isOpenRoomSettings);
  };
  const toggleDropdownlockSettings = () => {
    setisOpenlockSettings(!isOpenlockSettings);
  };
  const toggleDropdownclassTimings = () => {
    setisOpenclassTimings(!isOpenclassTimings);
  };
  const toggleDropdownevaluationParameter = () => {
    setisOpenevaluationParameter(!isOpenevaluationParameter);
  };

  /////////////////////////  Add new Item earningparameter
  const BootstrapDialogearningparameter = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitleearningparameter(props) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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

  BootstrapDialogTitleearningparameter.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const [openearningparameter, setOpenearningparameter] = React.useState(false);

  const handleClickOpenearningparameter = () => {
    setOpenearningparameter(true);
  };
  const handleCloseearningparameter = () => {
    setOpenearningparameter(false);
  };

  //zoom part

  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log(id);
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    console.log(code);
    if (code) {
      exchangeCodeForToken(code);
    }
  }, [location.search]);

  const connectZoom = async () => {
    const clientIdValue = process.env.REACT_APP_zoom_clientId;
    const redirectURI = process.env.REACT_APP_zoom_redirectUri; // Make sure it matches the URI registered in your Zoom app
    console.log("Clicked", clientIdValue);
    window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientIdValue}&redirect_uri=${redirectURI}`;
  };

  const exchangeCodeForToken = async (code) => {
    let manageClass = JSON.parse(localStorage.getItem("manageClass"));
    console.log(manageClass);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/createMeeting`,
        {
          authCode: code,
          manageClass: {
            topic: manageClass?.agenda,
            // start_time: manageClass?.courseStartingDateTime,
            duration: +manageClass?.duration,
            password: manageClass?.password,
            type: 1,
          },
        }
      );

      setIsConnected(true);
      console.log("Meeting created:", response.data.meeting);
      const meetingData = response.data.meeting;
      manageClass = { ...manageClass, meetingData: meetingData };
      const newClass = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/tasks/classes`,
        manageClass
      );

      console.log(newClass);

      if (newClass?.data?.result?.acknowledged) {
        toast.success("Class added Successfully");
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const className = form.className?.value;
    const classType = form.classType?.value;
    const instanceType = form.instanceType?.value;
    const roomNumber = form.roomNumber?.value;
    const location = form.location?.value;
    const agenda = form.agenda?.value;
    const password = form.password?.value;
    const email = form.email?.value;
    const duration = +form.duration?.value;
    // const sessionmayberecorded = +form.sessionmayberecorded?.value;
    // const waitformoderator = +form.waitformoderator?.value;
    // const disablewebcams = +form.disablewebcams?.value;
    // const disablemicrophones = +form.disablemicrophones?.value;
    // const disableprivatechat = +form.disableprivatechat?.value;
    // const disablepublicchat = +form.disablepublicchat?.value;
    // const disablesharednotes = +form.disablesharednotes?.value;
    // const hideuserlist = +form.hideuserlist?.value;
    const courseStartingDateTime = form.courseStartingDateTime?.value;
    // const courseEndDateTime = form.courseEndDateTime?.value;
    // const itemEarningParameter = form.itemEarningParameter?.value;
    // const itemEarningParameter1 = form.itemEarningParameter1?.value;
    const manageClass = {
      className,
      classType,
      instanceType,
      roomNumber,
      location,
      agenda,
      taskName: agenda,
      taskType: "Classes",
      password,
      email,
      duration,
      // sessionmayberecorded,
      // waitformoderator,
      // disablewebcams,
      // disablemicrophones,
      // disableprivatechat,
      // disablepublicchat,
      // disablesharednotes,
      // hideuserlist,
      courseStartingDateTime,
      skillParameterData: skillParameterData,
      earningParameterData: earningParameterData,
      chapterId: id,
    };

    localStorage.setItem("manageClass", JSON.stringify(manageClass));
    // console.log(JSON.parse(localStorage.getItem('manageClass')));
    connectZoom();
  };

  // ----   code by shihab   ----
  const { user, userInfo } = useContext(AuthContext);
  const [chapter, setChapter] = useState({});
  const [skillCategories, setSkillCategories] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [skillParameterData, setSkillParameterData] = useState([]);
  const [earningParameterData, setEarningParameterData] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [course, setCourse] = useState({});
  const [preview, setPreview] = useState(false);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [classesData, setClassesData] = useState({});

  return (
    <div>
      <Layout>
        <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
          <p>Manage Classes in Topic 1</p>
        </div>
        <form onSubmit={handleSubmit} className="ms-[40px]  mt-12">
          <div
            className="select-option flex items-center gap-[40px]"
            onClick={toggleDropdownGeneral}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              1
            </h1>
            <p className="text-[25px] font-bold">General </p>
            {!isOpenGeneral && <img className="w-6" src={arrowright}></img>}

            {isOpenGeneral && <img src={arrowDown}></img>}

            <i className={`dropdown-arrow ${isOpenGeneral ? "open" : ""}`}></i>
          </div>
          {isOpenGeneral && (
            <div className="dropdown-menu mt-[71px] mb-[45px] border-b-2  ">
              <div className="flex justify-between">
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]"> Class Name</p>
                    <img src={required} />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="className"
                    type="text"
                    placeholder="Class name"
                  />
                </div>

                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Class Type</p>
                    <img src={required} />
                  </div>

                  <div
                    className=" flex gap-2  mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                    style={{
                      boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <select
                      required
                      className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0"
                      name="classType"
                    >
                      <option className="" value="Online">
                        Online
                      </option>
                      <option className="text-[#6A6A6A] " value="Offline">
                        {" "}
                        Offline
                      </option>
                      <option className="text-[#6A6A6A]" value="Offline">
                        {" "}
                        Hybrid
                      </option>
                    </select>
                  </div>
                </div>

                <div className="me-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Instance Type</p>
                    <img src={required} />
                  </div>

                  <div
                    className=" flex gap-2  mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                    style={{
                      boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <select
                      required
                      className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0"
                      name="instanceType"
                    >
                      <option className="" value="Room with recordings">
                        Room with recordings
                      </option>
                      <option className="text-[#6A6A6A]" value="Room Only">
                        {" "}
                        Room Only
                      </option>
                      <option
                        className="text-[#6A6A6A]"
                        value="Recordings Only"
                      >
                        {" "}
                        Recordings Only
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-[116px] mb-20">
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Location (For offline & Hybrid)
                    </p>
                    <img src={required} />
                  </div>
                  <div className="flex items-center justify-between  mt-6 ms-6 border rounded-md w-[100%] h-[50px] px-5 text-[#535353]  bg-[#F6F7FF] ">
                    <div className="flex gap-2">
                      <SearchIcon />
                      <input
                        className="focus:outline-0 text-[#535353]  bg-[#F6F7FF]"
                        name="location"
                        type="text"
                        placeholder="Search Location"
                      />
                    </div>

                    <MyLocationIcon />
                  </div>
                </div>
                <div className="me-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Room Number</p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="roomNumber"
                    type="text"
                    placeholder="Number"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-[116px] mb-20">
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Agenda</p>
                    <img src={required} />
                  </div>
                  <div className="flex items-center justify-between  mt-6 ms-6 border rounded-md w-[100%] h-[50px] px-5 text-[#535353]  bg-[#F6F7FF] ">
                    <div className="flex gap-2">
                      <input
                        className="focus:outline-0 text-[#535353]  bg-[#F6F7FF]"
                        name="agenda"
                        type="text"
                        placeholder=" Agenda"
                      />
                    </div>
                  </div>
                </div>

                <div className="me-10">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Password</p>
                    <img src={required} />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="password"
                    type="text"
                    placeholder="Password"
                  />
                </div>
                <div className="me-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Email</p>
                    <img src={required} />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
          )}

          <div
            className="select-option flex items-center gap-[40px] mt-12"
            onClick={toggleDropdownclassTimings}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              2
            </h1>
            <p className="text-[25px] font-bold">Class Timings</p>
            {!isOpenclassTimings && (
              <img className="w-6" src={arrowright}></img>
            )}

            {isOpenclassTimings && <img src={arrowDown}></img>}

            <i
              className={`dropdown-arrow ${isOpenclassTimings ? "open" : ""}`}
            ></i>
          </div>

          {isOpenclassTimings && (
            <div className="dropdown-menu  mb-[45px] border-b-2 ">
              <div className="flex justify-between mb-20">
                <div className=" ms-5">
                  <div className="mt-20 flex flex-col">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        {" "}
                        Class Starting Date and Time{" "}
                      </p>
                      <img src={required} />
                    </div>

                    <input
                      required
                      className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="courseStartingDateTime"
                      type="datetime-local"
                      placeholder="Eg. Entrepreneurship Lab"
                    />
                    {/* <input required className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
                  </div>
                </div>

                <div className="me-20">
                  <div className="mt-20 flex flex-col">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]"> Duration </p>
                      <img src={required} />
                    </div>
                    <input
                      className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="duration"
                      type="text"
                      placeholder="time"
                    />

                    {/*    <input
                      required
                      className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="courseEndDateTime"
                      type="datetime-local"
                      placeholder="Eg. Entrepreneurship Lab"
                    /> */}
                    {/* <input required className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="select-option flex items-center gap-[40px] mt-12"
            onClick={toggleDropdownevaluationParameter}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              3
            </h1>
            <p className="text-[25px] font-bold">Evaluation Parameter</p>
            {!isOpenevaluationParameter && (
              <img className="w-6" src={arrowright}></img>
            )}

            {isOpenevaluationParameter && <img src={arrowDown}></img>}

            <i
              className={`dropdown-arrow ${
                isOpenevaluationParameter ? "open" : ""
              }`}
            ></i>
          </div>

          {isOpenevaluationParameter && (
            <div className="dropdown-menu mt-[71px] mb-[45px] ">
              <SkillBasedParameter
                selectedData={skillParameterData}
                setSelectedData={setSkillParameterData}
                categories={skillCategories}
              />

              <ItemEarningParameter
                selectedData={earningParameterData}
                setSelectedData={setEarningParameterData}
                categories={earningCategories}
              />
            </div>
          )}

          <div className="flex items-center justify-center mt-20 mb-10">
            <input
              type="submit"
              value="Save"
              className="px-[30px] py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
            />
            <input
              type="submit"
              onClick={() => setSubmitPermission(true)}
              value="Save & Display"
              className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
            />
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default ManageLiveClasses;
