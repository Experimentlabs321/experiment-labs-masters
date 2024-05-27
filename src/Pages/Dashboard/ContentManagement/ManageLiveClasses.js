//ManageLiveClasses
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import required from "../../../assets/ContentManagement/required.png";
import arrowDown from "../../../assets/SkillsManagement/arrow.svg";
import arrowright from "../../../assets/SkillsManagement/arrowright.svg";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import Layout from "../Layout";
import ItemEarningParameter from "./Components/Shared/ItemEarningParameter";
import SkillBasedParameter from "./Components/Shared/SkillBasedParameter";

const ManageLiveClasses = () => {
  const { id } = useParams();
  const [isOpenGeneral, setIsOpenGeneral] = useState(true);
  const [isOpenClassTimings, setIsOpenClassTimings] = useState(false);
  const [isOpenEvaluationParameter, setsOpenEvaluationParameter] =
    useState(false);
  const [orgData, setOrgData] = useState({});
  // ----   code by shihab   ----
  const { user, userInfo } = useContext(AuthContext);
  const [chapter, setChapter] = useState({});
  const [skillCategories, setSkillCategories] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [skillParameterData, setSkillParameterData] = useState([]);
  const [earningParameterData, setEarningParameterData] = useState([]);
  const [course, setCourse] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [mentors, setMentors] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [taskDrip, setTaskDrip] = useState(false);
  const [enableDrip, setEnableDrip] = useState();

  const toggleDropdownGeneral = () => {
    setIsOpenGeneral(!isOpenGeneral);
  };
  const toggleDropdownClassTimings = () => {
    setIsOpenClassTimings(!isOpenClassTimings);
  };
  const toggleDropdownEvaluationParameter = () => {
    setsOpenEvaluationParameter(!isOpenEvaluationParameter);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/${id}`)
      // .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
      .then((response) => {
        setChapter(response?.data);
        const fetchData = {
          organizationId: userInfo?.organizationId,
          courseId: response?.data?.courseId,
        };
        if (fetchData && userInfo?.organizationId && chapter?.courseId) {
          axios
            .get(
              `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${chapter?.courseId}`
            )
            .then((res) => setCourse(res?.data))
            .catch((error) => console.error(error));
          axios
            .get(
              `${process.env.REACT_APP_SERVERLESS_API}/api/v1/skillCategories/organizationId/${fetchData?.organizationId}/courseId/${fetchData?.courseId}`,
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
        }
      })
      .catch((error) => console.error(error));
  }, [chapter?.courseId, id, userInfo, userInfo.email]);

  useEffect(() => {
    if (chapter?.courseId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${chapter?.courseId}`
        )
        .then((response) => {
          setBatchesData(response?.data);
        })
        .catch((error) => console.error(error));
    }
  }, [chapter?.courseId]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/mentors/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setMentors(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  const handleOptionChangeBatch = (event, mentorData) => {
    const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedMentors([
        ...selectedMentors,
        {
          mentorName: mentorData?.name,
          mentorEmail: mentorData?.email,
          mentorId: mentorData?._id,
        },
      ]);
    } else {
      setSelectedMentors(
        selectedMentors.filter((option) => option?.mentorEmail !== optionValue)
      );
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Loading();
    const form = event.target;

    const className = form.className?.value;
    const password = form.password?.value;
    const duration = +form.duration?.value;
    const courseStartingDateTime = form.courseStartingDateTime?.value;
    const start_url = form.startUrl.value || "";
    const join_url = form.joinUrl.value || "";
    const week = await JSON.parse(localStorage.getItem("currentWeek"));

    const classData = {
      organizationId: orgData._id,
      classInfo: {
        taskName: className,
        taskType: "Classes",
        password,
        duration,
        taskDrip,
        courseStartingDateTime,
        skillParameterData: skillParameterData || [],
        earningParameterData: earningParameterData || [],
        chapterId: id,
        courseId: chapter?.courseId,
        weekId: week?._id,
        mentors: selectedMentors || [],
        batches: [
          {
            batchName: selectedBatch?.batchName,
            batchId: selectedBatch?._id,
          },
        ],
        meetingData: {
          topic: className,
          duration,
          password,
          timezone: "Asia/Kolkata",
          start_url,
          join_url,
          created_at: new Date(),
          host_email: userInfo?.email,
        },
      },
    };

    // console.log(classData);

    const newClass = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v2/classes`,
      { classData }
    );

    if (
      newClass?.data?.data?.chapterResult?.modifiedCount === 1 &&
      newClass?.data?.data?.classResult?.insertedId &&
      newClass?.data?.data?.courseResult?.modifiedCount === 1
    ) {
      toast.success("Class created successfully!");
      navigate(-1);
    } else {
      toast.error(newClass?.data?.message);
    }

    // console.log(newClass?.data?.data);

    // const newNotification = await axios.post(
    //   `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/addNotification`,
    //   {
    //     message: `New Class material added in course ${course?.courseFullName}.`,
    //     dateTime: new Date(),
    //     redirectLink: `/questLevels/${course?._id}?week=${chapter?.weekId}`,
    //     recipient: {
    //       type: "Students",
    //       organizationId: orgData?._id,
    //       courseId: course?._id,
    //       batches: [
    //         {
    //           batchName: selectedBatch?.batchName,
    //           batchId: selectedBatch?._id,
    //         },
    //       ],
    //     },
    //     type: "Create Task",
    //     readBy: [],
    //     notificationTriggeredBy: user?.email,
    //   }
    // );
  };

  return (
    <div>
      <Layout>
        <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
          <p>Manage Classes in {chapter.chapterName}</p>
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
            {!isOpenGeneral && (
              <img
                className="w-6"
                src={arrowright}
                alt="right arrow icon"
              ></img>
            )}

            {isOpenGeneral && <img src={arrowDown} alt="down arrow icon"></img>}

            <i className={`dropdown-arrow ${isOpenGeneral ? "open" : ""}`}></i>
          </div>
          {isOpenGeneral && (
            <div className="dropdown-menu mt-[71px] mb-[45px] border-b-2  ">
              <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-40">
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]"> Class Name</p>
                    <img src={required} alt="required" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="className"
                    type="text"
                    placeholder="Class name"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg">Select Mentors</p>
                    <img src={required} alt="required" />
                  </div>
                  <ul className="flex flex-col lg:flex-row gap-4 flex-wrap ">
                    {mentors?.map((option, index) => {
                      return (
                        <div key={index}>
                          <li className="cursor-pointer flex items-center py-2 text-[#6A6A6A] text-[14px] font-[400]">
                            <input
                              type="checkbox"
                              id="student"
                              name={option?._id}
                              value={option?.email}
                              checked={selectedMentors.find(
                                (item) => item?.mentorEmail === option?.email
                              )}
                              onChange={(e) =>
                                handleOptionChangeBatch(e, option)
                              }
                            />
                            <div className="flex items-center">
                              <label
                                className="ms-1"
                                htmlFor={option?.batchName}
                              >
                                {option?.name}
                              </label>
                            </div>
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </div>

                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg">Password</p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="password"
                    type="text"
                    placeholder="Password"
                  />
                </div>
              </div>


              <div className="flex flex-col lg:flex-row items-start mt-[50px] lg:gap-40 gap-10">
                <div>
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Select Batch</p>
                    <img src={required} alt="required" />
                  </div>
                  <ul className="flex gap-4 flex-wrap ">
                    {batchesData?.map((option, index) => {
                      return (
                        <div key={index}>
                          <li className="ms-6 cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                            <input
                              type="radio"
                              id="student"
                              name={option?.batchName}
                              value={option?.batchName}
                              checked={
                                selectedBatch?.batchName === option?.batchName
                              }
                              onChange={() => setSelectedBatch(option)}
                              className=" mb-1"
                            />
                            <div className="flex mb-1 items-center">
                              <label
                                className="ms-4"
                                htmlFor={option?.batchName}
                              >
                                {option?.batchName}
                              </label>
                            </div>
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
                <div className="space-y-4 mb-8">
                  <fieldset>
                    <div className="flex items-center gap-4 mb-5">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Enable Drip</p>
                      <img src={required} alt="" />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center ms-6">
                        <input
                          type="radio"
                          id="radioYes"
                          name="radioOption"
                          checked={taskDrip === true}
                          onChange={() => setTaskDrip(true)}
                          disabled={course?.enableDrip}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        />
                        <label
                          htmlFor="radioYes"
                          className={`ml-2 text-sm font-medium ${
                            enableDrip ? "text-gray-400" : "text-gray-900"
                          }`}
                        >
                          Yes
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="radioNo"
                          name="radioOption"
                          checked={taskDrip === false}
                          onChange={() => setTaskDrip(false)}
                          disabled={course?.enableDrip}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        />
                        <label
                          htmlFor="radioNo"
                          className={`ml-2 text-sm font-medium ${
                            enableDrip ? "text-gray-400" : "text-gray-900"
                          }`}
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  {course?.enableDrip && (
                    <p className="text-sm text-red-500">
                      Course Drip Must Be Turned Off to add Task Drip.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start mt-[50px] gap-40 mb-8">
                <div>
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Start URL (Admin)
                    </p>
                  </div>
                  <input
                    className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="startUrl"
                    type="url"
                    placeholder="Start URL"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Join URL (Student)
                    </p>
                  </div>
                  <input
                    className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="joinUrl"
                    type="url"
                    placeholder="Join URL"
                  />
                </div>
              </div>
            </div>
          )}

          <div
            className="select-option flex items-center gap-[40px] mt-12"
            onClick={toggleDropdownClassTimings}
          >
            <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
              2
            </h1>
            <p className="text-[25px] font-bold">Class Timings</p>
            {!isOpenClassTimings && (
              <img
                className="w-6"
                src={arrowright}
                alt="arrow right icon"
              ></img>
            )}

            {isOpenClassTimings && (
              <img src={arrowDown} alt="arrow down icon"></img>
            )}

            <i
              className={`dropdown-arrow ${isOpenClassTimings ? "open" : ""}`}
            ></i>
          </div>

          {isOpenClassTimings && (
            <div className="dropdown-menu  mb-[45px] border-b-2 ">
              <div className="flex flex-col lg:flex-row justify-between mb-20">
                <div className="">
                  <div className="mt-20 flex flex-col">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        {" "}
                        Class Starting Date and Time{" "}
                      </p>
                      <img src={required} alt="required" />
                    </div>

                    <input
                      required
                      className="mt-6 ms-6 border rounded-md lg:w-[100%] w-[80%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="courseStartingDateTime"
                      type="datetime-local"
                      placeholder="Eg. Entrepreneurship Lab"
                    />
                  </div>
                </div>

                <div className="me-20">
                  <div className="mt-20 flex flex-col">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]"> Duration </p>
                      <img src={required} alt="required" />
                    </div>
                    <input
                      required
                      className="mt-6 ms-6 border rounded-md w-[100%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="duration"
                      type="number"
                      placeholder="time"
                      min={30}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {(orgData?.showPointsAndRedemptions ||
            orgData?.showSkillsManagement) && (
            <div
              className="select-option flex items-center gap-[40px] mt-12"
              onClick={toggleDropdownEvaluationParameter}
            >
              <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                3
              </h1>
              <p className="text-[25px] font-bold">Evaluation Parameter</p>
              {!isOpenEvaluationParameter && (
                <img
                  className="w-6"
                  src={arrowright}
                  alt="right arrow icon"
                ></img>
              )}

              {isOpenEvaluationParameter && (
                <img src={arrowDown} alt="down arrow icon"></img>
              )}

              <i
                className={`dropdown-arrow ${
                  isOpenEvaluationParameter ? "open" : ""
                }`}
              ></i>
            </div>
          )}

          {isOpenEvaluationParameter && (
            <div className="dropdown-menu mt-[71px] mb-[45px] ">
              {orgData?.showSkillsManagement && (
                <SkillBasedParameter
                  selectedData={skillParameterData}
                  setSelectedData={setSkillParameterData}
                  categories={skillCategories}
                />
              )}
              {orgData?.showPointsAndRedemptions && (
                <ItemEarningParameter
                  selectedData={earningParameterData}
                  setSelectedData={setEarningParameterData}
                  categories={earningCategories}
                />
              )}
            </div>
          )}

          <div className="flex items-center justify-center mt-20 mb-10">
            <input
              type="submit"
              value="Save"
              className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
            />
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default ManageLiveClasses;
