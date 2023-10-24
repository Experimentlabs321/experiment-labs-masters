//ExpertMentorResourceCentre

import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Layout";
import "react-circular-progressbar/dist/styles.css";
import SearchIcon from "@mui/icons-material/Search";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import IconNav from "../../../../assets/ExpertMentorDashboard/Iconnav.svg";
import arrow1 from "../../../../assets/ExpertMentorDashboard/arrow1.svg";
import PreviousClassHomework from "./PreviousClassHomework";
import MyRecordings from "./MyRecordings";
import MyLabs from "./MyLabs";
import OtherRecordings from "./OtherRecordings";
import MyCourseContent from "./MyCourseContent";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthProvider";
import CoursesOptions from "./CoursesOptions";
import BatchesOptions from "./BatchesOptions";
import StageInfo from "./StageInfo";

const ExpertMentorResourceCentre = () => {
  const [selectedTab1, setSelectedTab1] = useState("Previous Class Homework");

  const handleTabClick1 = (tab) => {
    setSelectedTab1(tab);
  };
  const [selectedTab2, setSelectedTab2] = useState("My Recordings");

  const handleTabClick2 = (tab) => {
    setSelectedTab2(tab);
  };
  const [selectedTab3, setSelectedTab3] = useState("My Labs");

  const handleTabClick3 = (tab) => {
    setSelectedTab3(tab);
  };

  //////
  const pieParams = { height: 60, width: 100, margin: { right: 1 } };
  const palette = ["#6278FF", "#BEBEBE"];

  //

  const [isOn, setIsOn] = useState(false);
  const handleToggle = () => {
    setIsOn(!isOn);
  };
  const toggleStyles = {
    container: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
    },
    button: {
      backgroundColor: isOn ? "#94A4FF" : "#e0e0e0",
      border: "none",
      borderRadius: "30px",
      width: "60px",
      height: "30px",
      position: "relative",
      cursor: "pointer",
    },
    slider: {
      width: "26px",
      height: "26px",
      borderRadius: "50%",
      backgroundColor: isOn ? "white" : "#bdc3c7",
      position: "absolute",
      top: "2px",
      left: isOn ? "32px" : "2px",
      transition: "0.2s",
    },
  };

  const { userInfo } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [weeks, setWeeks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState({});
  const [chapters, setChapters] = useState([]);
  const [previousWeek, setPreviousWeek] = useState({});
  const [previousChapters, setPreviousChapters] = useState([]);

  // Function to handle option change
  const handleCourseChange = async (event) => {
    const courseId = event?.target.value;
    setSelectedCourseId(courseId);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/batches/courseId/${courseId}`
      );
      setBatches(response?.data);
      console.log("response =========>", response?.data);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
        );
        // console.log("response =========>", response?.data);
        setCourses(response?.data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, [userInfo?.organizationId]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/weeks/courseId/${selectedCourseId}`
      )
      .then((response) => {
        setWeeks(response?.data);
        const currentDateTime = new Date();
        response?.data?.forEach((element, index) => {
          const selectedBatchSchedule = element?.schedules?.find(
            (item) => item?.batchId === selectedBatchId
          );
          const weekStartDate = new Date(selectedBatchSchedule?.weekStartDate);
          const weekEndDate = new Date(selectedBatchSchedule?.weekEndDate);
          if (
            weekStartDate <= currentDateTime &&
            weekEndDate >= currentDateTime
          ) {
            setCurrentWeek(element);
            setPreviousWeek(response?.data[index - 1]);
            return;
          }
          if (!currentWeek) {
            setCurrentWeek(response?.data[0]);
          }
        });
      })
      .catch((error) => console.error(error));
  }, [selectedCourseId, selectedBatchId]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/chapters/weekId/${currentWeek?._id}`
      )
      .then((response) => {
        setChapters(response?.data);
      })
      .catch((error) => console.error(error));
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/chapters/weekId/${previousWeek?._id}`
      )
      .then((response) => {
        setPreviousChapters(response?.data);
      })
      .catch((error) => console.error(error));
  }, [currentWeek, previousWeek]);

  return (
    <div>
      <Layout>
        <div className="px-20  py-5 flex items-center  fixed w-[100%] justify-between bg-[#FFF] top-0  border-b ">
          <div className="flex gap-10">
            <CoursesOptions
              courses={courses}
              selectedCourseId={selectedCourseId}
              handleCourseChange={handleCourseChange}
            />

            <BatchesOptions
              batches={batches}
              setSelectedBatchId={setSelectedBatchId}
            />
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
              <img src={IconNav} alt="IconNav" />
            </div>
          </div>
        </div>

        <div className="mt-32 mx-10 flex justify-between items-center">
          <div className=" w-full">
            <p className="text-[#3E4DAC] text-xl font-bold">
              Curriculum With Dual Focus On Tech And Management{" "}
            </p>
            <p className="text-[#3E4DAC] text-base font-medium mt-2">
              New Age Concentration
            </p>
          </div>

          <div className="flex items-center">
            <p>
              <PieChart
                colors={palette}
                series={[{ data: [{ value: 75 }, { value: 25 }] }]}
                {...pieParams}
              />
            </p>

            <p className="text-[#3E4DAC] text-xl font-medium">
              Course is 75% Completed{" "}
            </p>
          </div>
        </div>

        <div className="mt-10 w-full">
          <div className="flex justify-between items-center ">
            <div className="px-10 flex gap-10 pb-3 text-lg  ">
              <button
                onClick={() => handleTabClick1("Previous Class Homework")}
                style={{
                  fontWeight:
                    selectedTab1 === "Previous Class Homework"
                      ? "bold"
                      : "normal",
                  borderBottom:
                    selectedTab1 === "Previous Class Homework"
                      ? "2px solid black"
                      : "none",
                  color:
                    selectedTab1 === "Previous Class Homework"
                      ? "#081765"
                      : "#BEBEBE",
                }}
              >
                Previous Class Homework
              </button>
              <button
                onClick={() => handleTabClick1("Pre-Class Reading Material")}
                style={{
                  fontWeight:
                    selectedTab1 === "Pre-Class Reading Material"
                      ? "bold"
                      : "normal",
                  borderBottom:
                    selectedTab1 === "Pre-Class Reading Material"
                      ? "2px solid black"
                      : "none",
                  color:
                    selectedTab1 === "Pre-Class Reading Material"
                      ? "#081765"
                      : "#BEBEBE",
                }}
              >
                Pre-Class Reading Material
              </button>
              <button
                onClick={() => handleTabClick1("Class Material")}
                style={{
                  fontWeight:
                    selectedTab1 === "Class Material" ? "bold" : "normal",
                  borderBottom:
                    selectedTab1 === "Class Material"
                      ? "2px solid black"
                      : "none",
                  color:
                    selectedTab1 === "Class Material" ? "#081765" : "#BEBEBE",
                }}
              >
                Class Material
              </button>
              <button
                onClick={() => handleTabClick1("Post Class Homework")}
                style={{
                  fontWeight:
                    selectedTab1 === "Post Class Homework" ? "bold" : "normal",
                  borderBottom:
                    selectedTab1 === "Post Class Homework"
                      ? "2px solid black"
                      : "none",
                  color:
                    selectedTab1 === "Post Class Homework"
                      ? "#081765"
                      : "#BEBEBE",
                }}
              >
                Post Class Homework
              </button>
              <button
                onClick={() => handleTabClick1("Exercises")}
                style={{
                  fontWeight: selectedTab1 === "Exercises" ? "bold" : "normal",
                  borderBottom:
                    selectedTab1 === "Exercises" ? "2px solid black" : "none",
                  color: selectedTab1 === "Exercises" ? "#081765" : "#BEBEBE",
                }}
              >
                Exercises
              </button>
            </div>
            <div className="me-10">
              <img src={arrow1} alt="icon" />
            </div>
          </div>
        </div>

        {selectedTab1 === "Previous Class Homework" && (
          <>
            <div className="mx-10 my-10 ">
              <StageInfo
                chapters={previousChapters}
                stage={"Post Class Homework"}
                week={previousWeek}
              />
            </div>
          </>
        )}
        {selectedTab1 === "Pre-Class Reading Material" && (
          <>
            <div className="mx-10 my-10 ">
              <StageInfo
                chapters={chapters}
                stage={"Pre-Class Reading Material"}
                week={currentWeek}
              />
            </div>
          </>
        )}
        {selectedTab1 === "Class Material" && (
          <>
            <div className="mx-10 my-10 ">
              <StageInfo
                chapters={chapters}
                stage={"Class Material"}
                week={currentWeek}
              />
            </div>
          </>
        )}
        {selectedTab1 === "Post Class Homework" && (
          <>
            <div className="mx-10 my-10 ">
              <StageInfo
                chapters={chapters}
                stage={"Post Class Homework"}
                week={currentWeek}
              />
            </div>
          </>
        )}
        {selectedTab1 === "Exercises" && (
          <>
            <div className="mx-10 my-10 ">
              <StageInfo
                chapters={chapters}
                stage={"Exercises"}
                week={currentWeek}
              />
            </div>
          </>
        )}

        <div className="ms-10 my-10">
          <p className="text-[#3E4DAC] text-xl font-bold">Class Recordings</p>
        </div>

        <div className="my-10 w-full">
          <div className="flex justify-between items-center ">
            <div className="px-10 flex  pb-3 text-lg font-semibold  ">
              <button
                className=" px-5 py-2 rounded-s-xl"
                onClick={() => handleTabClick2("My Recordings")}
                style={{
                  fontWeight:
                    selectedTab2 === "My Recordings" ? "bold" : "normal",
                  color:
                    selectedTab2 === "My Recordings" ? "#081765" : "#676767",

                  boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
                }}
              >
                My Recordings
              </button>
              <button
                className=" px-5 py-2 rounded-e-xl"
                onClick={() => handleTabClick2("Other Recordings")}
                style={{
                  fontWeight:
                    selectedTab2 === "Other Recordings" ? "bold" : "normal",
                  color:
                    selectedTab2 === "Other Recordings" ? "#081765" : "#676767",

                  boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
                }}
              >
                Other Recordings
              </button>
            </div>
            <div className="me-10 flex items-center gap-5">
              <p className="text-[#858585] text-lg font-medium ">
                Hide from other Mentors
              </p>

              <div style={toggleStyles.container}>
                <button style={toggleStyles.button} onClick={handleToggle}>
                  <span
                    style={{
                      ...toggleStyles.slider,
                      ...(isOn ? toggleStyles.sliderOn : {}),
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {selectedTab2 === "My Recordings" && (
          <>
            <div className="mx-10 my-10 ">
              <MyRecordings courses={courses} />
            </div>
          </>
        )}
        {selectedTab2 === "Other Recordings" && (
          <>
            <div className="mx-10 my-10 ">
              <OtherRecordings courses={courses} />
            </div>
          </>
        )}

        <div className="my-10 w-full">
          <div className="flex justify-between items-center mt-20">
            <div className="px-10 flex  pb-3 text-lg font-semibold  ">
              <button
                className=" px-5 py-2 rounded-s-xl"
                onClick={() => handleTabClick3("My Labs")}
                style={{
                  fontWeight: selectedTab3 === "My Labs" ? "bold" : "normal",
                  color: selectedTab3 === "My Labs" ? "#081765" : "#676767",

                  boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
                }}
              >
                My Labs
              </button>
              <button
                className=" px-5 py-2 rounded-e-xl"
                onClick={() => handleTabClick3("My Course Content")}
                style={{
                  fontWeight:
                    selectedTab3 === "My Course Content" ? "bold" : "normal",
                  color:
                    selectedTab3 === "My Course Content"
                      ? "#081765"
                      : "#676767",

                  boxShadow: "5px 5px 15px 0px rgba(93, 110, 255, 0.60)",
                }}
              >
                My Course Content
              </button>
            </div>
          </div>
        </div>

        {selectedTab3 === "My Labs" && (
          <>
            <div className="mx-10 my-10 ">
              <MyLabs />
            </div>
          </>
        )}
        {selectedTab3 === "My Course Content" && (
          <>
            <div className="mx-10 my-10 ">
              <MyCourseContent />
            </div>
          </>
        )}
      </Layout>
    </div>
  );
};

export default ExpertMentorResourceCentre;
