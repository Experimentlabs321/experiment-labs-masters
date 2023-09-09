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
import { Link, useParams } from "react-router-dom";
import Level from "../Dashboard/Level";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import SkillBasedParameter from "./Components/Shared/SkillBasedParameter";
import ItemEarningParameter from "./Components/Shared/ItemEarningParameter";

const ManageLiveClasses = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const className = form.className?.value;
    const classType = form.classType?.value;
    const instanceType = form.instanceType?.value;
    const roomNumber = form.roomNumber?.value;
    const sessionmayberecorded = +form.sessionmayberecorded?.value;
    const waitformoderator = +form.waitformoderator?.value;
    const disablewebcams = +form.disablewebcams?.value;
    const disablemicrophones = +form.disablemicrophones?.value;
    const disableprivatechat = +form.disableprivatechat?.value;
    const disablepublicchat = +form.disablepublicchat?.value;
    const disablesharednotes = +form.disablesharednotes?.value;
    const hideuserlist = +form.hideuserlist?.value;
    const courseStartingDateTime = form.courseStartingDateTime?.value;
    const courseEndDateTime = form.courseEndDateTime?.value;
    const itemEarningParameter = form.itemEarningParameter?.value;
    const itemEarningParameter1 = form.itemEarningParameter1?.value;

    const manageclass = {
      className,
      classType,
      instanceType,
      roomNumber,
      sessionmayberecorded,
      waitformoderator,
      disablewebcams,
      disablemicrophones,
      disableprivatechat,
      disablepublicchat,
      disablesharednotes,
      hideuserlist,
      courseStartingDateTime,
      courseEndDateTime,
      skillParameterData: skillParameterData,
      earningParameterData: earningParameterData,
    };

    console.log(manageclass);
  };

  // ----   code by shihab   ----
  const { user, userInfo } = useContext(AuthContext);
  const { id } = useParams();
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
      .then((response) => {
        setChapter(response?.data);
      })
      .then(() => {
        const fetchData = {
          organizationId: userInfo?.organizationId,
          courseId: chapter?.courseId,
        };
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_API}/skillCategoriesByCourseId`,
            fetchData
          )
          .then((res) => setSkillCategories(res?.data))
          .catch((error) => console.error(error));
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_API}/itemCategoryByCourseId`,
            fetchData
          )
          .then((res) => setEarningCategories(res?.data))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [id, userInfo, userInfo?.email, isOpenevaluationParameter]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/courses/${chapter?.courseId}`)
      .then((response) => {
        setCourse(response?.data);
      });
  }, [chapter, isOpenevaluationParameter]);

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
                        name="Location"
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
                    <p className="font-bold text-lg me-[36px]">
                      Agenda
                    </p>
                    <img src={required} />
                  </div>
                  <div className="flex items-center justify-between  mt-6 ms-6 border rounded-md w-[100%] h-[50px] px-5 text-[#535353]  bg-[#F6F7FF] ">
                    <div className="flex gap-2">
                      
                      <input
                        className="focus:outline-0 text-[#535353]  bg-[#F6F7FF]"
                        name=" Agenda"
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
                    name="Password"
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
                    name="Email"
                    type="email"
                    placeholder="Email"
                  />
                </div>


              </div>


            </div>
          )}

        {/*   <div
            className="select-option flex items-center gap-[40px] mt-12"
            onClick={toggleDropdownRoomSettings}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              2
            </h1>
            <p className="text-[25px] font-bold">Room Settings</p>
            {!isOpenRoomSettings && (
              <img className="w-6" src={arrowright}></img>
            )}

            {isOpenRoomSettings && <img src={arrowDown}></img>}

            <i
              className={`dropdown-arrow ${isOpenRoomSettings ? "open" : ""}`}
            ></i>
          </div>
          {isOpenRoomSettings && (
            <div className="dropdown-menu mt-[71px] mb-[45px] border-b-2  ">
              <div className="flex justify-between mb-20">
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Welcome Message
                    </p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[440px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="className"
                    type="text"
                    placeholder="Eg. Excel with Shekhar Gupta"
                  />
                </div>

                <div className=" me-10">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        The session may be recorded.
                      </p>
                    </div>

                    <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                      <div className="">
                        <input
                          type="radio"
                          id="Yes"
                          name="sessionmayberecorded"
                          value="1"
                        />
                        <lebel> Yes</lebel>
                      </div>
                      <div className=" ms-[55px]">
                        <input
                          type="radio"
                          id="No"
                          name="sessionmayberecorded"
                          value="0"
                        />
                        <lebel> No</lebel>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Wait for moderator
                      </p>
                    </div>

                    <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                      <div className="">
                        <input
                          type="radio"
                          id="yes"
                          name="waitformoderator"
                          value="1"
                        />
                        <lebel> Yes</lebel>
                      </div>
                      <div className=" ms-[55px]">
                        <input
                          type="radio"
                          id="No"
                          name="waitformoderator"
                          value="0"
                        />
                        <lebel> No</lebel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}

        {/*   <div
            className="select-option flex items-center gap-[40px] mt-12"
            onClick={toggleDropdownlockSettings}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              3
            </h1>
            <p className="text-[25px] font-bold">Lock Settings</p>
            {!isOpenlockSettings && (
              <img className="w-6" src={arrowright}></img>
            )}

            {isOpenlockSettings && <img src={arrowDown}></img>}

            <i
              className={`dropdown-arrow ${isOpenlockSettings ? "open" : ""}`}
            ></i>
          </div>

          {isOpenlockSettings && (
            <div className="dropdown-menu mt-[71px] mb-[45px] border-b-2 ">
              <div className="flex justify-between mb-20">
                <div className=" ms-5">
                  <div>
                    <input
                      type="checkbox"
                      id="disablewebcams"
                      name="disablewebcams"
                      value="1"
                    />
                    <label
                      className="text-base font-semibold ms-4"
                      for="disablewebcams"
                    >
                      Disable webcams
                    </label>
                  </div>
                  <div className="mt-[75px]">
                    <input
                      type="checkbox"
                      id="disablemicrophones"
                      name="disablemicrophones"
                      value="1"
                    />
                    <label
                      className="text-base font-semibold ms-4"
                      for="disablemicrophones"
                    >
                      Disable microphones
                    </label>
                  </div>
                  <div className="mt-[75px]">
                    <input
                      type="checkbox"
                      id="disableprivatechat"
                      name="disableprivatechat"
                      value="1"
                    />
                    <label
                      className="text-base font-semibold ms-4"
                      for="disableprivatechat"
                    >
                      {" "}
                      Disable private chat
                    </label>
                  </div>
                </div>

                <div className="me-[200px]">
                  <div>
                    <input
                      type="checkbox"
                      id="disablepublicchat"
                      name="disablepublicchat"
                      value="1"
                    />
                    <label
                      className="text-base font-semibold ms-4"
                      for="disablepublicchat"
                    >
                      Disable public chat
                    </label>
                  </div>
                  <div className="mt-[75px]">
                    <input
                      type="checkbox"
                      id="disablesharednotes"
                      name="disablesharednotes"
                      value="1"
                    />
                    <label
                      className="text-base font-semibold ms-4"
                      for="disablesharednotes"
                    >
                      Disable shared notes
                    </label>
                  </div>
                  <div className="mt-[75px]">
                    <input
                      type="checkbox"
                      id="hideuserlist"
                      name="hideuserlist"
                      value="1"
                    />
                    <label
                      className="text-base font-semibold ms-4"
                      for="hideuserlist"
                    >
                      Hide user list
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )} */}

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
                      <p className="font-bold text-lg me-[36px]">
                        {" "}
                        Duration{" "}
                      </p>
                      <img src={required} />
                    </div>
                    <input
                    className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="Duration"
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
