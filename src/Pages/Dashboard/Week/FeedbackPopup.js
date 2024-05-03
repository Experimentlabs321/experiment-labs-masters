import React, { useContext, useEffect, useState } from "react";
import LiveClass from "../../../assets/Dashboard/LiveClass.png";
import HttpsIcon from "@mui/icons-material/Https";
import Swal from "sweetalert2";
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
import { AuthContext } from "../../../contexts/AuthProvider";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const FeedbackPopup = ({ taskData }) => {
  //console.log(taskData)
  //console.log(taskData?.meetingData?.created_at)
  const { id } = useParams();
  // console.log(id)
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, user } = useContext(AuthContext);

  const [selectedOption, setSelectedOption] = useState("Category");
  const [feedbacks, setFeedbacks] = useState();
  const [feedbackGiven, setFeedbackGiven] = useState();
  const options = ["Category name"];
  //feedback//
  const [open, setOpen] = useState(false);
  const [getFeedback, setGetFeedback] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [courseId, setCourseId] = useState();
  const [comment, setComment] = useState();
  const [existing, setExisting] = useState();
  const [checkZero, setCheckZero] = useState(false);
  const [CategoryRatingValue, setCategoryRatingValue] = useState({});
  const [itemRatingValue, setItemRatingValue] = useState({});

  const durationInMinutes = taskData?.duration;
  const startDateTime = new Date(taskData?.meetingData?.created_at);

  // Calculate end time by adding duration in minutes to the start time
  const endDateTime = new Date(
    startDateTime.getTime() + durationInMinutes * 60000
  );

  // Get the current date and time
  const currentDate = new Date();

  // Compare the current date with the end date
  const isDurationEnded = currentDate > endDateTime;

  //console.log(isDurationEnded)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // console.log(taskData)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/chapters/${id}`)
      .then((response) => {
        setCourseId(response?.data?.map((item) => item.courseId));
      })
      .catch((error) => console.error(error));

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/getFeedback/${taskData?._id}`)

      .then((response) => {
        if (response?.data) {
          const result = response?.data?.givenFeedbacks?.filter(
            (data) => data?.submitterId === userInfo?._id
          );
          setExisting(result);
        } else {
          setGetFeedback(false);
        }
      })
      .catch((error) => console.error(error));
  }, [id, taskData?._id, userInfo?._id]);
  console.log(taskData);
  console.log(taskData?._id);
  //console.log(previousFeedback)

  console.log(feedbacks);
  console.log(existing);
  console.log(isDurationEnded);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/feedback_categories/${userInfo?.organizationId}`
      )
      .then((response) => {
        const feedbacks = response?.data?.courses?.find(
          (data) => data?.courseId === courseId[0]
        );

        if (feedbacks && !existing && isDurationEnded && !getFeedback) {
          setOpen(true);
        } else {
          setOpen(false);
        }

        setFeedbacks(feedbacks);

        setSelectedCategory(feedbacks?.categories[0].categoryName);
      })
      .catch((error) => console.error(error));
  }, [userInfo?.organizationId, courseId, existing]);

  // console.log(feedbacks)
  // console.log(existing)
  // console.log(userInfo?._id)

  const handleCategoryRatingChange = (e, category) => {
    // Create a copy of the existing items object
    const updatedItems = { ...CategoryRatingValue };

    // Update the new or existing feedbackItemName with the new value
    updatedItems[category.categoryName] = e.target.value;

    // Set the updated items object to state
    setCategoryRatingValue(updatedItems);
  };

  const handleItemRatingChange = (e, item) => {
    // Create a copy of the existing items object
    const updatedItems = { ...itemRatingValue };

    // Update the new or existing feedbackItemName with the new value
    updatedItems[item.feedbackItemName] = e.target.value;

    // Set the updated items object to state
    setItemRatingValue(updatedItems);
  };

  // console.log(CategoryRatingValue)
  // console.log(itemRatingValue)
  ////////////////////////

  useEffect(() => {
    if (feedbacks) {
      const updatedFeedbacks = {
        ...feedbacks,
        categories: feedbacks.categories?.map((category) => {
          return {
            ...category,
            rating: CategoryRatingValue[category.categoryName] || "0",
            feedbackItems: category.feedbackItems?.map((item) => {
              return {
                ...item,
                itemRating: itemRatingValue[item.feedbackItemName] || "0",
              };
            }),
          };
        }),
      };

      setFeedbackGiven(updatedFeedbacks);
    }
  }, [feedbacks, CategoryRatingValue, itemRatingValue]);

  // console.log(feedbackGiven)

  useEffect(() => {
    if (feedbackGiven) {
      let foundZero = false; // Initialize foundZero variable

      feedbackGiven.categories.forEach((category) => {
        if (category.rating === "0") {
          foundZero = true;
        } else {
          category.feedbackItems.forEach((item) => {
            if (item.itemRating === "0") {
              foundZero = true;
            }
          });
        }
      });

      // Set checkZero based on foundZero value
      setCheckZero(foundZero);
    }
  }, [feedbackGiven]);

  console.log(open);
  // console.log(userInfo)

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitFeedback = async () => {
    const manageFeedback = {
      taskId: taskData?._id,
      taskName: taskData?.taskName,
      organizationId: userInfo?.organizationId,
      courseId: feedbackGiven?.courseId,
      givenFeedback: {
        submitterId: userInfo?._id,
        submitterName: userInfo?.name,
        categories: feedbackGiven?.categories,
        comment: comment || " ",
        dateAndTime: new Date(),
      },
    };

    // console.log(manageFeedback)

    try {
      const addFeedback = await axios.post(
       // `${process.env.REACT_APP_BACKEND_API}/givenFeedbacks`,
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/givenFeedbacks`,
        manageFeedback
      );
      //console.log(addFeedback?.data)
      if (addFeedback?.data?.acknowledged) {
        toast.success("Feedback added Successfully");
        setOpen(false);

        //  console.log(addFeedback?.data)
      } else if (addFeedback?.data?._id) {
        toast.success("Feedback added Successfully");
        //  console.log(addFeedback?.data)
        setOpen(false);
      } else if (!addFeedback?.data?._id) {
        toast.error("Feedback not added ");
      } else {
        toast.error("Feedback not added");
      }

      //   console.log(manageFeedback);
    } catch (error) {
      console.error("Error occurred while submitting feedback:", error);
    }
  };

  return (
    <form>
      {/*     <Button variant="outlined" onClick={handleClickOpen}>
            Open dialog
          </Button> */}
      <BootstrapDialog
        //onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 5 }} id="customized-dialog-title">
          Give feedback "{taskData?.className}"
        </DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>
            {/* <h1>Category</h1> */}
            <div className="flex gap-3 items-center">
              {feedbacks?.categories?.map((category) => (
                <div>
                  <p
                    onClick={() => setSelectedCategory(category?.categoryName)}
                    className={`border text-center rounded-3xl text-xl font-semibold p-2 ${
                      selectedCategory === category?.categoryName
                        ? "bg-[#0040ff] text-[#fff] mt-6"
                        : ""
                    }`}
                  >
                    {category?.categoryName}
                  </p>
                  {selectedCategory === category?.categoryName &&
                    category?.rating === "5" && (
                      <Rating
                        name="size-medium"
                        defaultValue={
                          CategoryRatingValue[category?.categoryName]
                        }
                        onChange={(e) =>
                          handleCategoryRatingChange(e, category)
                        }
                        // value={CategoryRatingValue} // Controlled value
                      />
                    )}
                  {selectedCategory === category?.categoryName &&
                    category?.rating === "10" && (
                      <Rating
                        // name="size-medium"
                        name="customized-10"
                        max={10}
                        defaultValue={
                          CategoryRatingValue[category?.categoryName]
                        }
                        //  value={CategoryRatingValue} // Controlled value
                        onChange={(e) =>
                          handleCategoryRatingChange(e, category)
                        }
                      />
                    )}
                </div>
              ))}
            </div>
          </Typography>
          <Typography gutterBottom>
            {feedbacks?.categories?.map(
              (category) =>
                selectedCategory === category?.categoryName &&
                category.feedbackItems?.map((item) => (
                  <div className="lg:flex items-center justify-between lg:gap-20 mt-5">
                    <p className="text-lg font-medium">
                      {item?.feedbackItemName}
                    </p>
                    {selectedCategory === category?.categoryName &&
                      item?.itemRating === "5" && (
                        <Rating
                          name={item.feedbackItemName}
                          // value={itemRatingValue} // Controlled value
                          // onChange={handleItemRatingChange}
                          defaultValue={itemRatingValue[item.feedbackItemName]}
                          onChange={(e) => handleItemRatingChange(e, item)}
                        />
                      )}
                    {selectedCategory === category?.categoryName &&
                      item?.itemRating === "10" && (
                        <Rating
                          name={item.feedbackItemName}
                          max={10}
                          //value={itemRatingValue} // Controlled value
                          // onChange={handleItemRatingChange}
                          defaultValue={itemRatingValue[item.feedbackItemName]}
                          onChange={(e) => handleItemRatingChange(e, item)}
                        />
                      )}
                  </div>
                ))
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          {/*   <Button autoFocus  type="submit" >
                Send feedback
              </Button> */}
          <div className="flex flex-col gap-3 justify-between w-full">
            <input
              onChange={handleComment}
              className=" border border-black rounded-xl p-1"
              type="text"
              placeholder="comment"
            />
            {!checkZero && (
              <input
                style={{
                  borderRadius: "8.856px",
                  border: "1px solid #CECECE",
                  background: "#3E4DAC",
                }}
                className=" text-[#fff] text-base font-bold px-5 py-2"
                type="submit"
                value="Submit"
                //onClick={handleClose}
                onClick={handleSubmitFeedback}
              />
            )}
          </div>
        </DialogActions>
      </BootstrapDialog>
    </form>
  );
};

export default FeedbackPopup;
