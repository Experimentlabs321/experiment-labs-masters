//AssignmentEvaluation2.js

import React, { useContext, useState } from "react";
import Layout from "../Layout";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AssignmentUpNev from "./AssignmentUpNev";
import AssignmentRightNev from "./AssignmentRightNev";
import arrowRight from "../../../assets/ExecutionMentor/arrowRight.svg";
import { useEffect } from "react";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toast } from "react-hot-toast";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import EditResult from "./EditResult";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AssignmentEvaluation2 = () => {
  const { id } = useParams();
  //  console.log(id)
  const navigate = useNavigate();
  const { userInfo, user } = useContext(AuthContext);
  console.log(userInfo);
  
  //console.log(user.displayName);
 // console.log(user.photoURL);

  const [selectedTab, setSelectedTab] = useState("mentorAssignments");
  const [pointGiven, setPointGiven] = useState(false);
  const [assignment, setAssignment] = useState();
  const [mainAssignments, setMainAssignments] = useState();
  const [newAssignment, setNewAssignment] = useState();
  const [newValueAssignment, setNewValueAssignment] = useState();
  const [changeValueAssignment, setChangeValueAssignment] = useState();
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedEarningCategoryCategoryName, setSelectedEarningCategoryName] =
    useState("");
  const [selectedSkillName, setSelectedSkillName] = useState("");
  const [categoryValue, setCategoryValue] = useState();
  const [changeCategoryName, setChangeCategoryName] = useState();
  const [error2, setError2] = useState(false);
  const [error, setError] = useState(true);
  const [error1, setError1] = useState(false);
  const [error3, setError3] = useState(false);
  const [feedback, setFeedback] = useState(false);

  //console.log(mainAssignments.skillParameterData)
  //file upload
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(user?.email);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  ///
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  ///
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  // Event handler to update the textarea value when the user types

  //const {userInfo} = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/getSingleSubmitAssignment/${id}`
      )
      .then((response) => {
        setAssignment(response?.data);
        // console.log(response?.data.taskName)
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    if (assignment)
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/assignments/taskId/${assignment?.taskId}`
        )
        .then((response) => {
          const ass = response?.data;

          // console.log(response);
          setMainAssignments(ass);
          // setNewValueAssignment(ass)
        })
        .catch((error) => console.error(error));
  }, [assignment]);

  console.log(assignment);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/assignments/taskId/${assignment?.taskId}`
      )
      .then((response) => {
        if (
          mainAssignments?.skillParameterData ||
          mainAssignments?.earningParameterData
        ) {
          const newAssignmentUp = response?.data;

          newAssignmentUp?.skillParameterData?.map((a) =>
            a?.skills?.map((skill) => (skill.skillValue = 0))
          );

          newAssignmentUp?.skillParameterData?.map((a) =>
            a?.skills?.map((skill) =>
              skill?.parameters?.map((par) => (par.parameterValue = 0))
            )
          );
          newAssignmentUp?.earningParameterData?.map((a) =>
            a?.earningItems?.map((skill) => (skill.itemValue = 0))
          );

          // setMainAssignments(ass)
          setNewValueAssignment(newAssignmentUp);
        }
      })
      .catch((error) => console.error(error));
  }, [assignment, assignment?.taskId, id, mainAssignments]);

  // console.log(mainAssignments)

  const handleClickCategory = (categoryName) => {
    setSelectedCategoryName(categoryName);
    //  const assignment = newValueAssignment

    //setChangeValueAssignment(assignment)
  };

  // console.log(changeValueAssignment)

  const handleClickEarningCategory = (categoryName) => {
    setSelectedEarningCategoryName(categoryName);
  };

  // console.log(mainAssignments)

  const handleClickSkill = (skillName) => {
    setSelectedSkillName(skillName);
    console.log(skillName);
    console.log(changeCategoryName);
    if (
      mainAssignments?.skillParameterData ||
      mainAssignments?.earningParameterData
    ) {
      if (changeCategoryName === skillName) {
        ///    console.log("aaaaaaaaaa")
        const categoryName = newValueAssignment?.skillParameterData.find(
          (item) => item?.categoryName === selectedCategoryName
        );
        const skillsName = categoryName.skills.find(
          (item) => item?.skillName === skillName
        );
        console.log(skillsName);
        //  const parameters = skillsName.parameters.map((item) => item?.parameterName === parameter?.parameterName)
        skillsName?.parameters?.map(
          (par) =>
            (par.parameterValue = categoryValue / skillsName?.parameters?.length)
        );
        //  parameters.parameterValue = +(e.target?.value);

        setNewAssignment(newValueAssignment);
      }
    }
  };

  const handleSkillValue = (e, skill) => {
    // console.log(mainAssignments.skillParameterData)

    const categoryName = newValueAssignment?.skillParameterData.find(
      (item) => item?.categoryName === selectedCategoryName
    );
    const skillsName = categoryName?.skills.find(
      (item) => item?.skillName === skill?.skillName
    );
    skillsName.skillValue = +e.target?.value;
    setCategoryValue(skillsName.skillValue);
    setChangeCategoryName(skillsName?.skillName);
    //setCategoryName(skill?.skillName)
    setNewAssignment(newValueAssignment);
    const check = skill.skillValue;
    const value = +e.target?.value;
    if (check < value) {
      setError2(true);
    } else {
      setError2(false);
    }
  };

  const handleParameterValue = (e, parameter, defaultValue) => {
    const categoryName = newValueAssignment?.skillParameterData.find(
      (item) => item?.categoryName === selectedCategoryName
    );
    const skillsName = categoryName.skills.find(
      (item) => item?.skillName === selectedSkillName
    );

    const parameters = skillsName.parameters.find(
      (item) => item?.parameterName === parameter?.parameterName
    );
    const check = parameter.parameterValue;
    const value = +e.target?.value;

    if (check < value) {
      setError(true);
      setError1(true);
    } else {
      setError(false);
      setError1(false);
    }
    parameters.parameterValue = +e.target?.value;
    console.log(parameters.parameterValue);
    console.log(defaultValue);

    setNewAssignment(newValueAssignment);
  };

  const handleEarningParameterValue = (e, earningItem) => {
    const categoryName = newValueAssignment?.earningParameterData.find(
      (item) => item?.categoryName === selectedEarningCategoryCategoryName
    );
    const earningItems = categoryName.earningItems.find(
      (item) => item?.earningItemName === earningItem?.earningItemName
    );
    earningItems.itemValue = +e.target?.value;
    setNewAssignment(newValueAssignment);
    const check = earningItem.itemValue;
    const value = +e.target?.value;
    if (check < value) {
      setError3(true);
    } else {
      setError3(false);
    }
  };

  // console.log(newAssignment)
  // console.log(id)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = newAssignment;
    if (error1 || error2 || error3) {
      toast.error("Value error");
    } else {
      const manageAssignment = {
        // markGiven: data,
        skillParameterData: data?.skillParameterData,
        earningParameterData: data?.earningParameterData,
        dateAndTime: new Date(),
        // submitterId: assignment?.submitter._id,
        //   taskId: assignment?.taskId
      };

      console.log(manageAssignment);
      const addMarks = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/submitAssignment/${id}/addResult`,
        manageAssignment
      );

      if (addMarks?.data?.acknowledged) {
        setFeedback(true);
        toast.success("Result added Successfully");
        //  event.target.reset();
      } else {
        toast.error("Result not added ");
        //  event.target.reset();
      }

      const sendData = {
        participantChapter: {
          email: assignment?.submitter?.email,
          participantId: assignment?.submitter?._id,
          status: "Completed",
        },
        participantTask: {
          participant: {
            email: assignment?.submitter?.email,
            participantId: assignment?.submitter?._id,
            status: "Completed",
          },
        },
      };
      const submitCompletion = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/Assignment/taskId/${assignment?.taskId}/chapterId/${mainAssignments?.chapterId}`,
        sendData
      );

      console.log(submitCompletion);
    }
  };

  //////////

  // const [curDT, setCurDT] = useState(new Date().toLocaleString());

  // useEffect(() => {
  //   // Update the current date and time every second
  //   const intervalId = setInterval(() => {
  //     setCurDT(new Date().toLocaleString());
  //   }, 1000);

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);

  /*     const handleSubmitFeedback1 = async (event) => {
            event.preventDefault();
            const feedback = event.target.feedback.value;
    
            const manageFeedback = {
                feedback,
                resultSubmitterName: user.displayName,
                resultSubmitterPhotoURL: user.photoURL,
                dateAndTime: curDT
    
            };
    
            console.log(manageFeedback)
    
    
    
            const addFeedback = await axios.post(
                `${process.env.REACT_APP_BACKEND_API}/submitAssignment/${id}/addResult`,
                manageFeedback
    
    
     */
  const handleSubmitFeedback1 = async (event) => {
    event.preventDefault();
    const feedback = event.target.feedback.value;

    let fileUrl = "";
    if (selectedFile) {
      fileUrl = await uploadFileToS3(selectedFile);
    }

    const manageFeedback = {
      attachFile : fileUrl,
      feedback,
      resultSubmitterName: user.displayName,
      resultSubmitterPhotoURL: user.photoURL,
      dateAndTime: new Date(),
    };

    console.log(manageFeedback);
Loading();
    const sendMail = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
      {
       // from: `${user?.email}`,
    //    to: `${user?.email},shihab77023@gmail.com`,
        to: `${assignment?.submitter?.email}`,
        templateType: "emailAction",
        templateName:"assignmentEvaluation",
        organizationId: userInfo?.organizationId,
       /*  subject: `Feedback of ${assignment?.taskName}`,
        message: `Dear student, \nYour assignment on ${assignment?.taskName} result has been published. Please check it on the portal.`, */
      }
    );

    console.log(sendMail);

    const addFeedback = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/submitAssignment/${id}/addResult`,
      manageFeedback
    );

    if (addFeedback?.data?.acknowledged) {
      toast.success("Feedback added Successfully");
       event.target.reset();
       Loading().close();
       setOpen1(false);
    } else {
      toast.error("Feedback not added");
      //  event.target.reset();
    }

    const sendData = {
      participantChapter: {
        email: assignment?.submitter?.email,
        participantId: assignment?.submitter?._id,
        status: "Completed",
      },
      participantTask: {
        participant: {
          email: assignment?.submitter?.email,
          participantId: assignment?.submitter?._id,
          status: "Completed",
        },
      },
    };
    const submitCompletion = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/Assignment/taskId/${assignment?.taskId}/chapterId/${mainAssignments?.chapterId}`,
      sendData
    );

    console.log(submitCompletion, sendData);
  };
  const handleSubmitFeedback = async (event) => {
    event.preventDefault();
    const feedback = event.target.feedback.value;
    let fileUrl = "";
    if (selectedFile) {
      fileUrl = await uploadFileToS3(selectedFile);
    }
    const manageFeedback = {
      attachFile : fileUrl,
      feedback,
      resultSubmitterName: user.displayName,
      resultSubmitterPhotoURL: user.photoURL,
      dateAndTime: new Date(),
    };

    console.log(manageFeedback);
    Loading()
    const sendMail = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
      {
        to: `${assignment?.submitter?.email}`,
        templateType: "emailAction",
        templateName:"assignmentEvaluation",
        organizationId: userInfo?.organizationId,
     /*    from: `${user?.email}`,
        to: `${user?.email},shihab77023@gmail.com`,
        subject: `Feedback of ${assignment?.taskName}`,
        message: `Dear student, \nYour assignment on ${assignment?.taskName} result has been published. Please check it on the portal.`, */
      }
    );

    console.log(sendMail);

    const addFeedback = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/submitAssignment/${id}/addReview`,
      manageFeedback
    );

    if (addFeedback?.data?.acknowledged) {
      toast.success("Feedback added Successfully");

       event.target.reset();
       Loading().close();
       setOpen(false);
    } else {
      toast.error("Feedback not added");
      //   //  event.target.reset();
      // }
    }

    const sendData = {
      participantChapter: {
        email: assignment?.submitter?.email,
        participantId: assignment?.submitter?._id,
        status: "Completed",
      },
      participantTask: {
        participant: {
          email: assignment?.submitter?.email,
          participantId: assignment?.submitter?._id,
          status: "Completed",
        },
      },
    };
    const submitCompletion = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/Assignment/taskId/${assignment?.taskId}/chapterId/${mainAssignments?.chapterId}`,
      sendData
    );

    console.log(submitCompletion, sendData);
  };

  const handleAcceptOrReject = async (status) => {
    console.log(status)
    const manageStatus = {
      status,
      resultSubmitterName: user.displayName,
      resultSubmitterPhotoURL: user.photoURL,
      dateAndTime: new Date(),
    };

    console.log(manageStatus);
    Loading();
    const sendMail = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
      {
        to: `${assignment?.submitter?.email}`,
        templateType: "emailAction",
        templateName:"assignmentEvaluation",
        organizationId: userInfo?.organizationId,
       /*  from: `${user?.email}`,
        to: `${user?.email},shihab77023@gmail.com`,
        subject: `Feedback of ${assignment?.taskName}`,
        message: `Dear student, \nYour assignment on ${assignment?.taskName} is ${status}. Please check it on the portal.`, */
      }
    );

    console.log(sendMail);

    const addFeedback = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/submitAssignment/${id}/addResult`,
      manageStatus
    );

    if (addFeedback?.data?.acknowledged) {
      Loading().close()
      toast.success(`${status} Successfully`);
      navigate(`/mentorAssignments`)


      //  event.target.reset();
    } else {
      toast.error("status not added");
      Loading().close()
      //  event.target.reset();
    }

    const sendData = {
      participantChapter: {
        email: assignment?.submitter?.email,
        participantId: assignment?.submitter?._id,
        status: "Completed",
      },
      participantTask: {
        participant: {
          email: assignment?.submitter?.email,
          participantId: assignment?.submitter?._id,
          status: "Completed",
        },
      },
    };
    const submitCompletion = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/tasks/taskType/Assignment/taskId/${assignment?.taskId}/chapterId/${mainAssignments?.chapterId}`,
      sendData
    );

    console.log(submitCompletion, sendData);


  };


  return (
    <div>
      <Layout>
        <div className="">
          <AssignmentUpNev />
        </div>

        <div className="flex mt-24 me-10">
          <div className="w-full">
            <div className="flex justify-between gap-10">
              <div className="px-10 flex gap-10 pb-3 text-lg mt-10">
                <p className="text-lg font-bold">Assignment</p>
                {/*   <Link
                  to="/mentorAssignments"
                  onClick={() => handleTabClick("Assignments")}
                  style={{
                    fontWeight:
                      selectedTab === "mentorAssignments" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "mentorAssignments"
                        ? "2px solid black"
                        : "none",
                  }}
                >
                  Assignments
                </Link> */}
                {/*   <Link
                  to="/assignmentsQuiz"
                  onClick={() => handleTabClick("Quiz")}
                  style={{
                    fontWeight: selectedTab === "Quiz" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "Quiz" ? "2px solid black" : "none",
                  }}
                >
                  Quiz
                </Link>
                <Link
                  to="/assignmentsLiveTest"
                  onClick={() => handleTabClick("Live Test")}
                  style={{
                    fontWeight: selectedTab === "Live Test" ? "bold" : "normal",
                    borderBottom:
                      selectedTab === "Live Test" ? "2px solid black" : "none",
                  }}
                >
                  Live Test
                </Link> */}
              </div>
              <div>
                <div className="flex gap-5 mt-5">
                  <button onClick={() => handleAcceptOrReject("Accepted")} className="bg-[green] hover:bg-opacity-70 p-2 rounded-2xl px-5 text-[#fff]">Accept</button>
                  <button onClick={() => handleAcceptOrReject("Rejected")} className="bg-[red] hover:bg-opacity-70 p-2 rounded-2xl px-5 text-[#fff]">Reject</button>
                </div>
                {feedback && (
                  <div className=" ">
                    <button
                      variant="outlined"
                      onClick={handleClickOpen}
                      className="bg-[#FFEAE9] text-base font-bold px-3 py-1 rounded-md"
                    >
                      {" "}
                      <span className="me-3 ">+</span>Add additional feedback
                    </button>
                  </div>
                )}
                {!mainAssignments?.skillParameterData?.length && (
                  <div className="mt-10 ">
                    <button
                      variant="outlined"
                      onClick={handleClickOpen1}
                      className="bg-[#FFEAE9] text-base font-bold px-3 py-1 rounded-md"
                    >
                      {" "}
                      <span className="me-3 ">+</span>Add additional feedback
                    </button>
                  </div>
                )}

              </div>



              {/*   <Button variant="outlined" onClick={handleClickOpen}>
                                Open dialog
                            </Button> */}
            </div>
            <div>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  {assignment?.taskName}
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <form className=" m-5" onSubmit={handleSubmitFeedback}>
                  <div>
                    <textarea
                      className="p-5 border rounded-xl m-5"
                      rows="6"
                      cols="50"
                      placeholder="Write feedback"
                      name="feedback"
                    />
                  </div>
                  <div className="mb-10">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>

                      <p className="font-bold text-lg me-[36px]">
                        Attach File
                      </p>
                    </div>

                    <div
                      onChange={handleFileChange}
                      className=" flex gap-2  mt-2 ms-6 border rounded-md w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                    >
                      <div className=" flex items-center">
                        <input
                          className="w-full h-full flex items-center text-[#3E4DAC] text-base font-semibold mt-4"
                          type="file"
                        />
                        <p className="w-[105px] h-full bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center">
                          Browse
                        </p>
                      </div>
                    </div>
                  </div>


                  <div className="flex justify-center">
                    <button
                      className="bg-[#3E4DAC] text-[#fff] p-2 text-xl font-bold rounded-lg"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </BootstrapDialog>
            </div>

            <div>
              <BootstrapDialog
                onClose={handleClose1}
                aria-labelledby="customized-dialog-title"
                open={open1}
              >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                  {assignment?.taskName}
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose1}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <form className=" m-5" onSubmit={handleSubmitFeedback1}>
                  <div>
                    <textarea
                      className="p-5 border rounded-xl m-5"
                      rows="6"
                      cols="50"
                      placeholder="Write feedback"
                      name="feedback"
                    />
                  </div>
                  <div className="mb-10">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>

                      <p className="font-bold text-lg me-[36px]">
                        Attach File
                      </p>
                    </div>

                    <div
                      onChange={handleFileChange}
                      className=" flex gap-2  mt-2 ms-6 border rounded-md w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                    >
                      <div className=" flex items-center">
                        <input
                          className="w-full h-full flex items-center text-[#3E4DAC] text-base font-semibold mt-4"
                          type="file"
                        />
                        <p className="w-[105px] h-full bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center">
                          Browse
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="bg-[#3E4DAC] text-[#fff] p-2 text-xl font-bold rounded-lg"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </BootstrapDialog>
            </div>

            <div className="ms-10 bg-[#F0F7FF] rounded-[20px]  my-5 p-5">
              {/*  <p>
                                PDF/MOV
                            </p> */}
              {assignment?.fileUrl && (
                <>
                  <p>PDF/MOV</p>
                  {
                    (assignment?.fileUrl.endsWith('.png') ||
                      assignment?.fileUrl.endsWith('.jpg') ||
                      assignment?.fileUrl.endsWith('.jpeg') ||
                      assignment?.fileUrl.endsWith('.gif') ||
                      assignment?.fileUrl.endsWith('.bmp')) ? (

                      <div className="">
                        <img src={assignment?.fileUrl} alt="Img" className="w-[90%] mx-auto h-[68vh] border-[10px] border-b-50 rounded-lg border-[#292929]" />
                      </div>
                    ) : (
                      <iframe
                        className="h-[68vh] mx-auto border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929]"
                        src={`https://docs.google.com/viewer?url=${assignment?.fileUrl}&embedded=true`}
                        width="90%"
                        height="80vh"
                        title="W3Schools Free Online Web Tutorials"
                      ></iframe>
                    )
                  }

                </>
              )}
              {!assignment?.fileUrl && (
                <>
                  <p className="text-3xl text-center font-bold">
                    PDF NOT FOUND
                  </p>
                </>
              )}
            </div>

            {(mainAssignments?.skillParameterData ||
              mainAssignments?.earningParameterData) && (
                <>
                  {!assignment?.submitter.result && (
                    <form onSubmit={handleSubmit}>
                      <div className=" ms-10 my-10">
                        <p className="text-2xl font-bold mb-10">SkillParameter</p>

                        <div className=" flex ">
                          {!pointGiven && (
                            <div className="">
                              {mainAssignments?.skillParameterData?.map(
                                (mainAssignment) => (
                                  <div
                                    className={` p-3 flex gap-2 items-center justify-between rounded-md h-[60px] mb-5 ${selectedCategoryName ===
                                      mainAssignment.categoryName
                                      ? "bg-[#F0F7FF]"
                                      : " border"
                                      }`}
                                  >
                                    <div className="">
                                      <p>{mainAssignment.categoryName}</p>
                                      <p className="text-[#B7B7B7] text-[10px] font-bold">
                                        Marks
                                      </p>
                                    </div>
                                    <img
                                      onClick={() =>
                                        handleClickCategory(
                                          mainAssignment.categoryName
                                        )
                                      }
                                      src={arrowRight}
                                      alt=""
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                          {/*   {

                              </div>
                              <img
                                onClick={() =>
                                  handleClickCategory(
                                    mainAssignment.categoryName
                                  )
                                }
                                src={arrowRight}
                                alt=""
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {/*   {
>>>>>>> e81148a6d3646bd240b3b23041ad44370a04e9b1
                                            pointGiven && (
                                                <div>
                                                    <div className=" bg-[#F0F7FF] p-3 flex gap-2 items-center justify-between rounded-md ">
                                                        <div className="">
                                                            <p>Points Given</p>
                                                            <p className="text-[#B7B7B7] text-[10px] font-bold">Marks</p>
                                                        </div>
                                                        <img src={arrowRight} alt='' />
    
                                                    </div>
                                                </div>
    
                                            )
                                        } */}

                          <div className=" ms-5">
                            {mainAssignments?.skillParameterData?.map((data) => (
                              <>
                                {data?.categoryName === selectedCategoryName && (
                                  <>
                                    {data?.skills?.map((skill) => (
                                      <>
                                        <div
                                          className={`flex items-center justify-between p-2 mb-5  w-[100%] h-[60px] ${selectedSkillName === skill.skillName
                                            ? "bg-[#F0F7FF]"
                                            : ""
                                            }`}
                                          style={{
                                            borderRadius: "5px",
                                            border: "1px solid #D9D9D9",
                                          }}
                                        >
                                          <div className="text-xs font-semibold flex items-center gap-2 ">
                                            <label htmlFor={skill.skillName}>
                                              {skill.skillName}
                                            </label>
                                          </div>
                                          <div className=" flex gap-2 ms-5">
                                            <div className="flex flex-col">
                                              <input
                                                required
                                                className="w-[50px] h-[25px] text-[14px] font-semibold border rounded-lg text-center"
                                                name={skill?.skillName}
                                                type="number"
                                                onChange={(e) =>
                                                  handleSkillValue(e, skill)
                                                }
                                                placeholder="mark"
                                              />
                                              {error2 && (
                                                <>
                                                  <span className="text-[red] text-[10px]">
                                                    error
                                                  </span>
                                                </>
                                              )}
                                            </div>

                                            <p>/{skill?.skillValue}</p>

                                            <p
                                              onClick={() =>
                                                handleClickSkill(skill.skillName)
                                              }
                                            >
                                              <ArrowForwardIcon />
                                            </p>
                                          </div>
                                        </div>
                                      </>
                                    ))}
                                  </>
                                )}
                              </>
                            ))}
                          </div>

                          <div className=" ms-5">
                            {mainAssignments?.skillParameterData?.map((data) => (
                              <>
                                {data?.categoryName === selectedCategoryName && (
                                  <>
                                    {data?.skills?.map((skill) => (
                                      <>
                                        {skill.skillName ===
                                          selectedSkillName && (
                                            <>
                                              {skill?.parameters?.map(
                                                (parameter) => (
                                                  <>
                                                    <div
                                                      className={`flex items-center justify-between p-2 mb-5  w-[100%] h-[60px] ${selectedSkillName ===
                                                        skill.skillName
                                                        ? "bg-[#F0F7FF]"
                                                        : ""
                                                        }`}
                                                      style={{
                                                        borderRadius: "5px",
                                                        border: "1px solid #D9D9D9",
                                                      }}
                                                    >
                                                      <div className="text-xs font-semibold flex items-center gap-2 ">
                                                        <label
                                                          htmlFor={
                                                            parameter.parameterName
                                                          }
                                                        >
                                                          {parameter.parameterName}
                                                        </label>
                                                      </div>
                                                      <div className=" flex gap-2 ms-5">
                                                        <div className="flex flex-col">
                                                          <input
                                                            required
                                                            className="w-[50px] h-[25px] text-[14px] font-semibold border rounded-lg text-center"
                                                            name={
                                                              parameter.parameterName
                                                            }
                                                            type="number"
                                                            // defaultValue={categoryValue / (skill?.parameters.length)}
                                                            defaultValue={
                                                              changeCategoryName ===
                                                                selectedSkillName
                                                                ? categoryValue /
                                                                skill?.parameters?.length
                                                                : ""
                                                            }
                                                            onChange={(e) =>
                                                              handleParameterValue(
                                                                e,
                                                                parameter,
                                                                skill
                                                              )
                                                            }
                                                          // placeholder={categoryValue/(skill?.parameters.length)}
                                                          />
                                                          {error && (
                                                            <>
                                                              {categoryValue /
                                                                skill?.parameters?.length >
                                                                parameter.parameterValue && (
                                                                  <span className="text-[red] text-[10px]">
                                                                    error
                                                                  </span>
                                                                )}
                                                            </>
                                                          )}
                                                          {error1 && (
                                                            <>
                                                              <span className="text-[red] text-[10px]">
                                                                error
                                                              </span>
                                                            </>
                                                          )}
                                                        </div>

                                                        <p>
                                                          /
                                                          {parameter.parameterValue}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </>
                                                )
                                              )}
                                            </>
                                          )}
                                      </>
                                    ))}
                                  </>
                                )}
                              </>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className=" ms-10 my-10">
                        <p className="text-2xl font-bold mb-10">
                          earningParameter
                        </p>

                        <div className=" flex ">
                          {!pointGiven && (
                            <div className="">
                              {mainAssignments?.earningParameterData?.map(
                                (mainAssignment) => (
                                  <div
                                    className={` p-3 flex gap-2 items-center justify-between rounded-md h-[60px] mb-5 ${selectedEarningCategoryCategoryName ===
                                      mainAssignment.categoryName
                                      ? "bg-[#F0F7FF]"
                                      : " border"
                                      }`}
                                  >
                                    <div className="">
                                      <p>{mainAssignment.categoryName}</p>
                                      <p className="text-[#B7B7B7] text-[10px] font-bold">
                                        Marks
                                      </p>
                                    </div>
                                    <img
                                      onClick={() =>
                                        handleClickEarningCategory(
                                          mainAssignment.categoryName
                                        )
                                      }
                                      src={arrowRight}
                                      alt=""
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                          {/*  {
                                            pointGiven && (
                                                <div>
                                                    <div className=" bg-[#F0F7FF] p-3 flex gap-2 items-center justify-between rounded-md ">
                                                        <div className="">
                                                            <p>Points Given</p>
                                                            <p className="text-[#B7B7B7] text-[10px] font-bold">Marks</p>
                                                        </div>
                                                        <img src={arrowRight} alt='' />
    
                                                    </div>
                                                </div>
    
                                            )
                                        } */}

                          <div className=" ms-5">
                            {mainAssignments?.earningParameterData?.map(
                              (data) => (
                                <>
                                  {data?.categoryName ===
                                    selectedEarningCategoryCategoryName && (
                                      <>
                                        {data?.earningItems?.map((earningItem) => (
                                          <>
                                            <div
                                              className={`flex items-center justify-between p-2 mb-5  w-[100%] h-[60px] ${selectedEarningCategoryCategoryName ===
                                                data?.categoryName
                                                ? "bg-[#F0F7FF]"
                                                : " border"
                                                }`}
                                              style={{
                                                borderRadius: "5px",
                                                border: "1px solid #D9D9D9",
                                              }}
                                            >
                                              <div className="text-xs font-semibold flex items-center gap-2 ">
                                                <label
                                                  htmlFor={
                                                    earningItem.earningItemName
                                                  }
                                                >
                                                  {earningItem.earningItemName}
                                                </label>
                                              </div>
                                              <div className=" flex gap-2 ms-5">
                                                <div className="flex flex-col">
                                                  <input
                                                    className="w-[50px] h-[25px] text-[14px] font-semibold border rounded-lg text-center"
                                                    name={
                                                      earningItem.earningItemName
                                                    }
                                                    type="number"
                                                    //   value={skill?.skillValue}
                                                    onChange={(e) =>
                                                      handleEarningParameterValue(
                                                        e,
                                                        earningItem
                                                      )
                                                    }
                                                    placeholder="mark"
                                                  />
                                                  {error3 && (
                                                    <span className="text-[red] text-[10px]">
                                                      error
                                                    </span>
                                                  )}
                                                </div>

                                                <p>/{earningItem.itemValue}</p>

                                                {/* <p onClick={() => handleClickSkill(earningItem.earningItemName)}><ArrowForwardIcon /></p> */}
                                              </div>
                                            </div>
                                          </>
                                        ))}
                                      </>
                                    )}
                                </>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* <div className="mt-5 flex gap-3 justify-center mb-20"> */}

                      <div className="mt-5 flex gap-3 justify-center mb-20">
                        <input
                          style={{
                            borderRadius: "8.856px",
                            border: "1px solid #CECECE",

                          }}
                          className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                          type="submit"
                          value="Save"
                        />
                        <input
                          style={{
                            borderRadius: "8.856px",
                            border: "1px solid #CECECE",
                            background: "#FF557A",
                          }}
                          className=" px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                          type="submit"
                          value="Save all"
                        />
                      </div>
                    </form>
                  )}
                  {assignment?.submitter.result && (
                    <EditResult submittedAssignment={assignment} />
                  )}
                </>
              )}
          </div>

          {/*  <div>
            <AssignmentRightNev />
          </div> */}
        </div>
      </Layout>
    </div>
  );
};

export default AssignmentEvaluation2;
