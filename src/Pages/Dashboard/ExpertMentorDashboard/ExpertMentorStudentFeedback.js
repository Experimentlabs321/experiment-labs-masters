//ExpertMentorStudentFeedback

import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import "react-circular-progressbar/dist/styles.css";
import SearchIcon from "@mui/icons-material/Search";
import notification from "../../../assets/ExecutionMentor/notification.svg";
import IconNav from "../../../assets/ExpertMentorDashboard/Iconnav.svg";
import ranking from "../../../assets/ExpertMentorDashboard/ranking.svg";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ExpertMentorStudentFeedback = ({admin}) => {
  const { userInfo, user } = useContext(AuthContext);
  console.log(admin);
  const [open, setOpen] = useState(false);
  const [selectedTab1, setSelectedTab1] = useState("All");
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState();
  const [mainCourse, setMainCourse] = useState();
  const [selectedCourse, setSelectedCourse] = useState(
    courses?.length > 0 ? courses[0] : {}
  );
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedClass, setSelectedClass] = useState(
    classes?.length > 0 ? classes[0] : {}
  );
  const [selectedClassShow, setSelectedClassShow] = useState(
    classes?.length > 0 ? classes[0] : {}
  );
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getFeedbackSubDetailsByOrganizationAndName/liveClassFeedback/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {

          console.log(response)
          setItemDetails(response?.data);

        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);
  console.log(itemDetails)

  const handleTabClick1 = (tab) => {
    setSelectedTab1(tab);
  };
  const [selectedTab2, setSelectedTab2] = useState("All");

  const handleTabClick2 = (tab) => {
    setSelectedTab2(tab);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
        setSelectedCourse(response?.data[0]);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/feedback_categories/${userInfo?.organizationId}`
      )
      .then((response) => {
        const feedbacks = response?.data?.courses?.find(
          (data) => data?.courseId === selectedCourse?._id
        );

        const ItemData = {};
        feedbacks?.categories?.forEach((data) => {
          data?.feedbackItems?.forEach((item) => {
            ItemData[item?.feedbackItemName] = item?.itemRating;
            setMainCourse(item?.itemRating);
          });
        });

        setMainCourse(ItemData);

        //console.log(feedbacks)
      })
      .catch((error) => console.error(error));
  }, [userInfo?.organizationId, selectedCourse?._id]);

  console.log(mainCourse);
  console.log(courses?.length);
  // console.log(selectedCourse?._id)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/getFeedbacks/${selectedCourse?._id}`
      )
      .then((response) => {
        const filteredFeedbacks = response?.data.reduce((acc, accessClass) => {
          const filteredAccessClass = {
            ...accessClass,
            givenFeedbacks: accessClass?.givenFeedbacks.reduce(
              (feedbackAcc, givenFeedback) => {
                const filteredGivenFeedback = {
                  ...givenFeedback,
                  categories: givenFeedback?.categories.reduce(
                    (categoryAcc, category) => {
                      const filteredCategory = {
                        ...category,
                        feedbackItems: category?.feedbackItems.reduce(
                          (feedbackItemAcc, feedbackItem) => {
                            const filteredFeedbackItem = {
                              ...feedbackItem,
                              giveAccess:
                                feedbackItem?.giveAccess?.filter(
                                  (access) => access === "Expert mentor"
                                ) || [],
                            };
                            if (filteredFeedbackItem.giveAccess.length > 0) {
                              feedbackItemAcc.push(filteredFeedbackItem);
                            }
                            return feedbackItemAcc;
                          },
                          []
                        ),
                      };
                      if (filteredCategory.feedbackItems.length > 0) {
                        categoryAcc.push(filteredCategory);
                      }
                      return categoryAcc;
                    },
                    []
                  ),
                };
                if (filteredGivenFeedback.categories.length > 0) {
                  feedbackAcc.push(filteredGivenFeedback);
                }
                return feedbackAcc;
              },
              []
            ),
          };
          if (filteredAccessClass.givenFeedbacks.length > 0) {
            acc.push(filteredAccessClass);
          }
          return acc;
        }, []);

        console.log(filteredFeedbacks);
        setClasses(filteredFeedbacks);
        setSelectedClass(filteredFeedbacks[0]);
        setSelectedClass(filteredFeedbacks[0]);
        //  setSelectedClassShow(filteredFeedbacks[0]);
      })
      .catch((error) => console.error(error));
  }, [selectedCourse?._id]);

  useEffect(() => {
    if (selectedClass) {
      selectedClass?.givenFeedbacks?.map((item, i) =>
        // console.log(selectedClass?.givenFeedbacks[0])
        setSelectedClassShow(selectedClass?.givenFeedbacks[0])
      );
    }
  }, [selectedClass]);

  /*   console.log(classes)
      console.log(selectedClassShow)
      console.log(selectedClass) */

  const handleSelectCourse = (item) => {
    setSelectedCourse(item);
  };
  const handleSelectUser = (userName, comment) => {
    setSelectedUser({
      userName,
      comment,
    });
    setOpen(true);
  };

  console.log(selectedUser);

  const handleSelectClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  /*   const [givenRating, setGivenRating] = useState({});
  
      useEffect(() => {
          if (classes) {
              const ratingsMap = {};
              const counts = {};
  
              classes.forEach((data) => {
                  if (data?.taskId === selectedClass?.taskId || data?.taskId === selectedClass) {
                      data?.givenFeedbacks?.forEach((givenFeedback) => {
                          givenFeedback.categories?.forEach((category) => {
                              category?.feedbackItems?.forEach((m) => {
                                  if (m?.feedbackItemName) {
                                      if (!ratingsMap[m.feedbackItemName]) {
                                          ratingsMap[m.feedbackItemName] = 0;
                                          counts[m.feedbackItemName] = 0;
                                      }
  
                                      ratingsMap[m.feedbackItemName] += +(m.itemRating);
                                      counts[m.feedbackItemName]++;
                                  }
                              });
                          });
                      });
                  }
              });
  
              // Calculate the average rating for each feedbackItemName
              const averageRatings = {};
              Object.keys(ratingsMap).forEach((feedbackItemName) => {
                  const average = ratingsMap[feedbackItemName] / counts[feedbackItemName];
                  averageRatings[feedbackItemName] = Math.round(average);
              });
  
              setGivenRating(averageRatings);
          }
      }, [classes, selectedClass]);
  
      console.log(givenRating); */

  const [givenRating, setGivenRating] = useState([]);

  useEffect(() => {
    if (classes) {
      const ratingsMap = {};
      const counts = {};

      classes.forEach((data) => {
        if (
          data?.taskId === selectedClass?.taskId ||
          data?.taskId === selectedClass
        ) {
          data?.givenFeedbacks?.forEach((givenFeedback) => {
            givenFeedback.categories?.forEach((category) => {
              category?.feedbackItems?.forEach((m) => {
                if (m?.feedbackItemName) {
                  if (!ratingsMap[m.feedbackItemName]) {
                    ratingsMap[m.feedbackItemName] = 0;
                    counts[m.feedbackItemName] = 0;
                  }

                  ratingsMap[m.feedbackItemName] += +m.itemRating;
                  counts[m.feedbackItemName]++;
                }
              });
            });
          });
        }
      });

      // Calculate the average rating for each feedbackItemName and store it as an array of objects
      const averageRatings = Object.keys(ratingsMap).map((feedbackItemName) => {
        const average = ratingsMap[feedbackItemName] / counts[feedbackItemName];
        return {
          feedbackItemName: feedbackItemName,
          averageRating: Math.round(average),
        };
      });

      setGivenRating(averageRatings);
    }
  }, [classes, selectedClass]);

  console.log(givenRating);

  return (
    <div>
      {
        (admin) ? <>
       

        <div className="mt-20 ms-10">
          <div>
            <h1 className=" text-[#737373] text-[24px] font-[500] mb-2 ">
              {itemDetails?.selectCourse ? itemDetails?.selectCourse :"Select Course"}
              
            </h1>
            <div className="flex flex-wrap">
              {!courses[0] && (
                <div
                  className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                >
                  {itemDetails?.noCourseAddedYet ? itemDetails?.noCourseAddedYet :"No course added yet!"}
                  
                </div>
              )}
              {courses?.map((item, index) => (
                <button
                  key={index}
                  className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 ${
                    selectedCourse?._id === item?._id
                      ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                      : "text-[#949494]"
                  }`}
                  onClick={() => handleSelectCourse(item)}
                >
                  {item?.courseFullName}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <p className="text-[#676767] text-xl font-semibold">
            {itemDetails?.selectClass ? itemDetails?.selectClass :"Select Class"}
              
               :
            </p>
            {!classes?.length ? (
              <p className="my-10 text-red-600">
                {itemDetails?.classNotFound ? itemDetails?.classNotFound :"Class not found"}
                </p>
            ) : (
              <select
                className="my-10 py-3 px-5 text-[#676767] text-lg font-semibold focus:outline-none"
                name="selectCourse"
                id="selectCourse"
                style={{
                  borderRadius: "8px",
                  background: "#F8F9FE",
                  boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)",
                }}
                value={selectedClass?.taskId}
                onChange={handleSelectClassChange}
              >
                {classes?.map((cls) => (
                  <option key={cls.id} value={cls.taskId}>
                    {cls.taskName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <p className="text-[#3E4DAC] text-xl font-bold mt-10 flex items-center gap-3">
            <span>
              <img src={ranking} alt="icon" />
            </span>{" "}
            {itemDetails?.rating ? itemDetails?.rating :"Rating"}
            
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="my-10">
            {/*    <div className="flex justify-between items-center">
                            <div className='px-10 flex gap-10 pb-3 text-lg  '>
                                <button

                                    onClick={() => handleTabClick1('All')}
                                    style={{
                                        fontWeight: selectedTab1 === 'All' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'All' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'All' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    All
                                </button>
                                <button

                                    onClick={() => handleTabClick1('Labwise')}
                                    style={{
                                        fontWeight: selectedTab1 === 'Labwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'Labwise' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'Labwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Labwise
                                </button>
                                <button

                                    onClick={() => handleTabClick1('Batchwise')}
                                    style={{
                                        fontWeight: selectedTab1 === 'Batchwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'Batchwise' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'Batchwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Batchwise
                                </button>




                            </div>

                        </div> */}
          </div>

          <div className="my-10 me-10">
            <p>{itemDetails?.totalStudents ? itemDetails?.totalStudents :"Total Students"} - 1000</p>
          </div>
        </div>

        {selectedTab1 === "All" && classes?.length ? (
          <>
            <div className="mx-10 mb-10 ">
              <div className="grid grid-cols-4 gap-5 items-center ">
                {selectedClassShow?.submitterId &&
                  selectedClassShow?.categories?.map((category) =>
                    category?.feedbackItems?.map((item) => (
                      <div className="flex flex-col items-center h-[100%] justify-end">
                        <div className="">
                          <div>
                            <img
                              className="h-[150px]"
                              src={item?.selectedIcon}
                              alt="Icon"
                            />
                          </div>
                        </div>
                        <p className="text-lg font-bold">
                          {item?.feedbackItemName}
                        </p>
                        <div className="my-3">
                          {givenRating.map(
                            (data) =>
                              data.feedbackItemName ==
                                item?.feedbackItemName && (
                                <>
                                  {mainCourse[item?.feedbackItemName] ===
                                    "10" && (
                                    <Rating
                                      readOnly
                                      // name="size-medium"
                                      name=""
                                      max={10}
                                      value={data?.averageRating}
                                      //  value={CategoryRatingValue} // Controlled value
                                    />
                                  )}
                                  {mainCourse[item?.feedbackItemName] ===
                                    "5" && (
                                    <Rating
                                      readOnly
                                      // name="size-medium"
                                      name=""
                                      value={data?.averageRating}
                                      //  value={CategoryRatingValue} // Controlled value
                                    />
                                  )}
                                </>
                              )
                          )}

                          {}

                          {/*  <Stack spacing={1}>
                                                                <Rating size="large" name="half-rating" defaultValue={2.5} precision={0.5} />

                                                            </Stack> */}
                        </div>
                        {classes?.map(
                          (data) =>
                            (data?.taskId === selectedClass?.taskId ||
                              data?.taskId === selectedClass) && (
                              <div>
                                <p className="text-lg font-normal">
                                  {data?.givenFeedbacks.length} {itemDetails?.students ? itemDetails?.students :"students"}
                                </p>
                                {data?.givenFeedbacks?.map((givenFeedback) =>
                                  givenFeedback.categories?.map((category) =>
                                    category.feedbackItems?.map(
                                      (m) =>
                                        m.feedbackItemName ===
                                          item?.feedbackItemName && (
                                          <>
                                            <p
                                              onClick={() =>
                                                handleSelectUser(
                                                  givenFeedback?.submitterName,
                                                  givenFeedback?.comment
                                                )
                                              }
                                              className="mt-3 text-lg font-bold cursor-pointer"
                                            >
                                              {givenFeedback?.submitterName}
                                            </p>

                                            <div>
                                              <BootstrapDialog
                                                onClose={handleClose}
                                                aria-labelledby="customized-dialog-title"
                                                open={open}
                                              >
                                                <DialogTitle
                                                  sx={{ m: 0, px: 20 }}
                                                  id="customized-dialog-title"
                                                >
                                                  {selectedUser?.userName}
                                                </DialogTitle>
                                                <IconButton
                                                  aria-label="close"
                                                  onClick={handleClose}
                                                  sx={{
                                                    position: "absolute",
                                                    right: 8,
                                                    top: 8,
                                                    color: (theme) =>
                                                      theme.palette.grey[500],
                                                  }}
                                                >
                                                  <CloseIcon />
                                                </IconButton>
                                                <DialogContent dividers>
                                                  <Typography gutterBottom>
                                                    {selectedUser?.comment}
                                                  </Typography>
                                                </DialogContent>
                                              </BootstrapDialog>
                                            </div>

                                            {mainCourse[m?.feedbackItemName] ===
                                              "5" && (
                                              <Rating
                                                readOnly
                                                name="read-only"
                                                defaultValue={m?.itemRating}

                                                // value={CategoryRatingValue} // Controlled value
                                              />
                                            )}
                                            {mainCourse[m?.feedbackItemName] ===
                                              "10" && (
                                              <Rating
                                                readOnly
                                                // name="size-medium"
                                                name="read-only"
                                                max={10}
                                                defaultValue={m?.itemRating}
                                                //  value={CategoryRatingValue} // Controlled value
                                              />
                                            )}
                                          </>
                                        )
                                    )
                                  )
                                )}
                              </div>
                            )
                        )}

                        {/* <p className="text-lg font-normal">Needs Improvement </p> */}

                        {/*   <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                                        <p className="text-[#8A8A8A] text-base">Week -3</p> */}

                        {/* <button className="bg-[#6278FF] rounded-md text-[#fff] text-base font-medium mt-5 px-10 py-2">View More</button> */}
                      </div>
                    ))
                  )}
              </div>
            </div>

            <div className="ms-10 text-lg font-semibold">{itemDetails?.allComments ? itemDetails?.allComments :"All Comments"}</div>

            <div className="grid grid-cols-2 my-10 gap-10 overflow-auto h-[500px] mx-10">
              {classes?.map(
                (data) =>
                  (data?.taskId === selectedClass?.taskId ||
                    data?.taskId === selectedClass) &&
                  data?.givenFeedbacks?.map((givenFeedback) => (
                    // <p>{givenFeedback?.comment}</p>
                    <div
                      className="p-5 h-[170px]"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #E3E3E3",
                        background: "#FFF",
                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <p className=" text-base font-semibold">
                        {givenFeedback?.comment}{" "}
                      </p>
                      <p className="text-[#838383] text-base font-normal my-2">
                        {userInfo?.organizationName}
                      </p>
                      <p className="flex justify-between text-[#838383] text-base font-normal mt-5   ">
                        {" "}
                        {givenFeedback?.submitterName}{" "}
                        <span> {givenFeedback?.dateAndTime}</span>
                      </p>
                    </div>
                    /*    givenFeedback.categories?.map((category) => (
                                                       category.feedbackItems?.map((m,) => (

                                                         <p>aaaaaaa</p>


                                                       )))) */
                  ))
              )}

              {/*   <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div> */}
            </div>
          </>
        ) : (
          <p className="text-[red] ms-10 mt-10 text-lg font-semibold text-center">
            {itemDetails?.thereIsNoResult ? itemDetails?.thereIsNoResult :"There is no Result"}
            
          </p>
        )}
        </> 
        : 
        <> <Layout>
        <div className="px-20  py-4 flex items-center  fixed w-[100%] justify-between bg-[#FFF] top-0  border-b ">
          <div>
            <p className="flex items-center gap-2 text-lg font-semibold text-[#3E4DAC]">
              {" "}
              {itemDetails?.studentFeedback ? itemDetails?.studentFeedback :"Student Feedback"}  
            </p>
          </div>

          <div className="flex items-center gap-5 me-80 ">
            <div
              className=" p-2"
              style={{
                borderRadius: "8px",
                background: "#F8F9FE",
                boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)",
              }}
            >
              <SearchIcon />
              <input type="text rounded-lg p-2" placeholder="Search" />
            </div>

            <div>
              <img src={IconNav} alt="Iconnav" />
            </div>
          </div>
        </div>

        <div className="mt-20 ms-10">
          <div>
            <h1 className=" text-[#737373] text-[24px] font-[500] mb-2 ">
            {itemDetails?.selectCourse ? itemDetails?.selectCourse :"Select Course"}
              
            </h1>
            <div className="flex flex-wrap">
              {!courses[0] && (
                <div
                  className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                >
                  {itemDetails?.noCourseAddedYet ? itemDetails?.noCourseAddedYet :"No course added yet!"}
                  
                </div>
              )}
              {courses?.map((item, index) => (
                <button
                  key={index}
                  className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 ${
                    selectedCourse?._id === item?._id
                      ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                      : "text-[#949494]"
                  }`}
                  onClick={() => handleSelectCourse(item)}
                >
                  {item?.courseFullName}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <p className="text-[#676767] text-xl font-semibold">
            {itemDetails?.selectClass ? itemDetails?.selectClass :"Select Class"} :
            </p>
            {!classes?.length ? (
              <p className="my-10 text-red-600">{itemDetails?.classNotFound ? itemDetails?.classNotFound :"Class not found"}</p>
            ) : (
              <select
                className="my-10 py-3 px-5 text-[#676767] text-lg font-semibold focus:outline-none"
                name="selectCourse"
                id="selectCourse"
                style={{
                  borderRadius: "8px",
                  background: "#F8F9FE",
                  boxShadow: "2px 2px 10px 0px rgba(149, 156, 225, 0.50)",
                }}
                value={selectedClass?.taskId}
                onChange={handleSelectClassChange}
              >
                {classes?.map((cls) => (
                  <option key={cls.id} value={cls.taskId}>
                    {cls.taskName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <p className="text-[#3E4DAC] text-xl font-bold mt-10 flex items-center gap-3">
            <span>
              <img src={ranking} alt="icon" />
            </span>{" "}
            {itemDetails?.rating ? itemDetails?.rating :"Rating"}
            
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="my-10">
            {/*    <div className="flex justify-between items-center">
                            <div className='px-10 flex gap-10 pb-3 text-lg  '>
                                <button

                                    onClick={() => handleTabClick1('All')}
                                    style={{
                                        fontWeight: selectedTab1 === 'All' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'All' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'All' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    All
                                </button>
                                <button

                                    onClick={() => handleTabClick1('Labwise')}
                                    style={{
                                        fontWeight: selectedTab1 === 'Labwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'Labwise' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'Labwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Labwise
                                </button>
                                <button

                                    onClick={() => handleTabClick1('Batchwise')}
                                    style={{
                                        fontWeight: selectedTab1 === 'Batchwise' ? 'bold' : 'normal',
                                        borderBottom: selectedTab1 === 'Batchwise' ? '2px solid black' : 'none',
                                        color: selectedTab1 === 'Batchwise' ? '#081765' : '#BEBEBE'
                                    }}
                                >
                                    Batchwise
                                </button>




                            </div>

                        </div> */}
          </div>

          <div className="my-10 me-10">
            <p>{itemDetails?.totalStudents ? itemDetails?.totalStudents :"Total Students"} - 1000</p>
          </div>
        </div>

        {selectedTab1 === "All" && classes?.length ? (
          <>
            <div className="mx-10 mb-10 ">
              <div className="grid grid-cols-4 gap-5 items-center ">
                {selectedClassShow?.submitterId &&
                  selectedClassShow?.categories?.map((category) =>
                    category?.feedbackItems?.map((item) => (
                      <div className="flex flex-col items-center h-[100%] justify-end">
                        <div className="">
                          <div>
                            <img
                              className="h-[150px]"
                              src={item?.selectedIcon}
                              alt="Icon"
                            />
                          </div>
                        </div>
                        <p className="text-lg font-bold">
                          {item?.feedbackItemName}
                        </p>
                        <div className="my-3">
                          {givenRating.map(
                            (data) =>
                              data.feedbackItemName ==
                                item?.feedbackItemName && (
                                <>
                                  {mainCourse[item?.feedbackItemName] ===
                                    "10" && (
                                    <Rating
                                      readOnly
                                      // name="size-medium"
                                      name=""
                                      max={10}
                                      value={data?.averageRating}
                                      //  value={CategoryRatingValue} // Controlled value
                                    />
                                  )}
                                  {mainCourse[item?.feedbackItemName] ===
                                    "5" && (
                                    <Rating
                                      readOnly
                                      // name="size-medium"
                                      name=""
                                      value={data?.averageRating}
                                      //  value={CategoryRatingValue} // Controlled value
                                    />
                                  )}
                                </>
                              )
                          )}

                          {}

                          {/*  <Stack spacing={1}>
                                                                <Rating size="large" name="half-rating" defaultValue={2.5} precision={0.5} />

                                                            </Stack> */}
                        </div>
                        {classes?.map(
                          (data) =>
                            (data?.taskId === selectedClass?.taskId ||
                              data?.taskId === selectedClass) && (
                              <div>
                                <p className="text-lg font-normal">
                                  {data?.givenFeedbacks.length} {itemDetails?.students ? itemDetails?.students :"students"} 
                                </p>
                                {data?.givenFeedbacks?.map((givenFeedback) =>
                                  givenFeedback.categories?.map((category) =>
                                    category.feedbackItems?.map(
                                      (m) =>
                                        m.feedbackItemName ===
                                          item?.feedbackItemName && (
                                          <>
                                            <p
                                              onClick={() =>
                                                handleSelectUser(
                                                  givenFeedback?.submitterName,
                                                  givenFeedback?.comment
                                                )
                                              }
                                              className="mt-3 text-lg font-bold cursor-pointer"
                                            >
                                              {givenFeedback?.submitterName}
                                            </p>

                                            <div>
                                              <BootstrapDialog
                                                onClose={handleClose}
                                                aria-labelledby="customized-dialog-title"
                                                open={open}
                                              >
                                                <DialogTitle
                                                  sx={{ m: 0, px: 20 }}
                                                  id="customized-dialog-title"
                                                >
                                                  {selectedUser?.userName}
                                                </DialogTitle>
                                                <IconButton
                                                  aria-label="close"
                                                  onClick={handleClose}
                                                  sx={{
                                                    position: "absolute",
                                                    right: 8,
                                                    top: 8,
                                                    color: (theme) =>
                                                      theme.palette.grey[500],
                                                  }}
                                                >
                                                  <CloseIcon />
                                                </IconButton>
                                                <DialogContent dividers>
                                                  <Typography gutterBottom>
                                                    {selectedUser?.comment}
                                                  </Typography>
                                                </DialogContent>
                                              </BootstrapDialog>
                                            </div>

                                            {mainCourse[m?.feedbackItemName] ===
                                              "5" && (
                                              <Rating
                                                readOnly
                                                name="read-only"
                                                defaultValue={m?.itemRating}

                                                // value={CategoryRatingValue} // Controlled value
                                              />
                                            )}
                                            {mainCourse[m?.feedbackItemName] ===
                                              "10" && (
                                              <Rating
                                                readOnly
                                                // name="size-medium"
                                                name="read-only"
                                                max={10}
                                                defaultValue={m?.itemRating}
                                                //  value={CategoryRatingValue} // Controlled value
                                              />
                                            )}
                                          </>
                                        )
                                    )
                                  )
                                )}
                              </div>
                            )
                        )}

                        {/* <p className="text-lg font-normal">Needs Improvement </p> */}

                        {/*   <p className="text-[#8A8A8A] text-base">Product lab | Batch -3</p>
                                                        <p className="text-[#8A8A8A] text-base">Week -3</p> */}

                        {/* <button className="bg-[#6278FF] rounded-md text-[#fff] text-base font-medium mt-5 px-10 py-2">View More</button> */}
                      </div>
                    ))
                  )}
              </div>
            </div>

            <div className="ms-10 text-lg font-semibold"> {itemDetails?.allComments ? itemDetails?.allComments :"All Comments"}</div>

            <div className="grid grid-cols-2 my-10 gap-10 overflow-auto h-[500px] mx-10">
              {classes?.map(
                (data) =>
                  (data?.taskId === selectedClass?.taskId ||
                    data?.taskId === selectedClass) &&
                  data?.givenFeedbacks?.map((givenFeedback) => (
                    // <p>{givenFeedback?.comment}</p>
                    <div
                      className="p-5 h-[170px]"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #E3E3E3",
                        background: "#FFF",
                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <p className=" text-base font-semibold">
                        {givenFeedback?.comment}{" "}
                      </p>
                      <p className="text-[#838383] text-base font-normal my-2">
                        {userInfo?.organizationName}
                      </p>
                      <p className="flex justify-between text-[#838383] text-base font-normal mt-5   ">
                        {" "}
                        {givenFeedback?.submitterName}{" "}
                        <span> {givenFeedback?.dateAndTime}</span>
                      </p>
                    </div>
                    /*    givenFeedback.categories?.map((category) => (
                                                       category.feedbackItems?.map((m,) => (

                                                         <p>aaaaaaa</p>


                                                       )))) */
                  ))
              )}

              {/*   <div className="p-5"
                                    style={{
                                        borderRadius: "10px",
                                        border: "1px solid #E3E3E3",
                                        background: "#FFF",
                                        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                                    }}
                                >
                                    <p className=" text-base font-semibold">Delivery of content was  understandable </p>
                                    <p className="text-[#838383] text-base font-normal my-2">Product Lab | Batch 3</p>
                                    <p className="flex justify-between text-[#838383] text-base font-normal mt-5   "> Mahima Negi <span> 11.45 am</span></p>
                                </div> */}
            </div>
          </>
        ) : (
          <p className="text-[red] ms-10 mt-10 text-lg font-semibold text-center">
            {itemDetails?.thereIsNoResult ? itemDetails?.thereIsNoResult :"There is no Result"}
            
          </p>
        )}
      </Layout></>
      }
     
    </div>
  );
};

export default ExpertMentorStudentFeedback;
