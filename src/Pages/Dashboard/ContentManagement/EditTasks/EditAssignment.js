import React, { useContext, useEffect, useState } from "react";
import arrowDown from "../../../../assets/SkillsManagement/arrow.svg";
import arrowright from "../../../../assets/SkillsManagement/arrowright.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "../../Layout";
import { AuthContext } from "../../../../contexts/AuthProvider";
import uploadFileToS3 from "../../../UploadComponent/s3Uploader";
import AssignmentTask from "../../Week/AssignmentTask";
import SkillBasedParameter from "../Components/Shared/SkillBasedParameter";
import ItemEarningParameter from "../Components/Shared/ItemEarningParameter";
import General from "../Components/Assignment/General";

const EditAssignment = () => {
  const [isOpenGeneral, setisOpenGeneral] = useState(true);

  const [isOpenEvaluationParameter, setisOpenEvaluationParameter] =
    useState(false);

  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleDropdownGeneral = () => {
    setisOpenGeneral(!isOpenGeneral);
  };

  const toggleDropdownevaluationParameter = () => {
    setisOpenEvaluationParameter(!isOpenEvaluationParameter);
  };

  // ----   code by shihab   ----
  const { userInfo } = useContext(AuthContext);
  const [chapter, setChapter] = useState({});
  const [skillCategories, setSkillCategories] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [skillParameterData, setSkillParameterData] = useState([]);
  const [earningParameterData, setEarningParameterData] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [course, setCourse] = useState({});
  const [preview, setPreview] = useState(false);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [assignmentData, setAssignmentData] = useState({});

  const [openTask, setOpenTask] = useState(
    JSON.parse(localStorage.getItem("task"))
  );
  const [currentWeek, setCurrentWeek] = useState(
    JSON.parse(localStorage.getItem("currentWeek"))
  );
  useEffect(() => {
    // axios
    //   .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
    //   .then((response) => {
    //     setChapter(response?.data);
    //   })
    //   .then(() => {
    const fetchData = {
      organizationId: currentWeek?.organization?.organizationId,
      courseId: currentWeek?.courseId,
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
    // })
    // .catch((error) => console.error(error));
  }, [currentWeek]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/courses/${chapter?.courseId}`)
      .then((response) => {
        setCourse(response?.data);
      });
  }, [chapter]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/tasks/assignments?id=${openTask?.taskId}`
      )
      .then((response) => {
        setAssignmentData(response?.data);
        setInstructions(response?.data?.instructions);
        setSelectedFile(response?.data?.file);
        setSkillParameterData(response?.data?.skillParameterData);
        setEarningParameterData(response?.data?.earningParameterData);
      });
  }, [openTask]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (selectedFile) fileUrl = await uploadFileToS3(selectedFile);

    const form = event.target;

    const assignmentName = form.assignmentName?.value;
    const AssignmentStartingDateTime = form.AssignmentStartingDateTime?.value;
    const AssignmentEndingDateTime = form.AssignmentEndingDateTime?.value;
    const assignmentTotalPointsMarks = +form.assignmentTotalPointsMarks?.value;

    const manageAssignment = {
      assignmentName,
      taskName: assignmentName,
      AssignmentStartingDateTime,
      assignmentTotalPointsMarks,
      AssignmentEndingDateTime,
      instructions: instructions,
      file: fileUrl,
      skillParameterData: skillParameterData,
      earningParameterData: earningParameterData,
      chapterId: id,
    };

    setAssignmentData(manageAssignment);
    console.log(manageAssignment);

    if (submitPermission) {
      const newAssignment = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/tasks/assignments/${assignmentData?._id}`,
        manageAssignment
      );
      console.log(newAssignment);
      if (newAssignment?.data?.result?.acknowledged) {
        toast.success("Assignment edited Successfully");
        event.target.reset();
      }

      console.log(manageAssignment);
    }
  };

  return (
    <div>
      <Layout>
        <div>
          <div className=" border-b-2 ">
            <div className="container mx-auto px-4 flex items-center justify-between ">
              <div className="flex items-center pt-[30px] pb-[30px] ">
                <Link
                  to="/courseAccess"
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  My Courses
                </Link>
                <svg
                  className="mr-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 18.667L15 12.667L9 6.66699"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Link
                  to={`/questLevels/${currentWeek?.courseId}`}
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  {localStorage.getItem("course")}
                </Link>
                <svg
                  className="mr-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 18.667L15 12.667L9 6.66699"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <button className=" font-sans mr-[30px] text-[20px] font-[400] ">
                  {localStorage.getItem("chapter")}
                </button>
              </div>
              <div className="flex items-center mt-[-10px] ">
                <div className="flex items-center text-black text-[16px] font-[600] mr-[32px] ">
                  <h1 className="mr-[16px]">Preview Mode</h1>
                  {preview ? (
                    <svg
                      className="cursor-pointer"
                      onClick={() => setPreview(!preview)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="27"
                      viewBox="0 0 58 27"
                      fill="none"
                    >
                      <rect
                        width="57.8422"
                        height="26.7841"
                        rx="13.392"
                        fill="#9747FF"
                      />
                      <circle
                        cx="44.4512"
                        cy="13.3916"
                        r="10.1153"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="cursor-pointer"
                      onClick={() => setPreview(!preview)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="28"
                      viewBox="0 0 58 28"
                      fill="none"
                    >
                      <rect
                        y="0.608398"
                        width="57.8422"
                        height="26.7841"
                        rx="13.392"
                        fill="#A3A3A3"
                      />
                      <circle cx="13.3926" cy="14" r="10.1153" fill="white" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${preview ? "block" : "hidden"}`}>
          <AssignmentTask taskData={assignmentData} />
        </div>
        <div className={`${preview ? "hidden" : "block"}`}>
          <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
            <p>Manage Assignment in {localStorage.getItem("chapter")}</p>
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
                <img className="w-6" src={arrowright} alt="" />
              )}

              {isOpenGeneral && <img src={arrowDown} alt="" />}

              <i
                className={`dropdown-arrow ${isOpenGeneral ? "open" : ""}`}
              ></i>
            </div>
            {isOpenGeneral && (
              <General
                assignmentData={assignmentData}
                instructions={instructions}
                setInstructions={setInstructions}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            )}
            <div
              className="select-option flex items-center gap-[40px] mt-12"
              onClick={toggleDropdownevaluationParameter}
            >
              <h1 className=" h-[60px] w-[60px] bg-[#E1E6FF] rounded-full flex justify-center items-center text-[25px]">
                2
              </h1>
              <p className="text-[25px] font-bold">Evaluation Parameter</p>
              {!isOpenEvaluationParameter && (
                <img className="w-6" src={arrowright} alt="arrow" />
              )}

              {isOpenEvaluationParameter && <img src={arrowDown} alt="arrow" />}

              <i
                className={`dropdown-arrow ${
                  isOpenEvaluationParameter ? "open" : ""
                }`}
              ></i>
            </div>
            {isOpenEvaluationParameter && (
              <div className="dropdown-menu mt-[71px] mb-[45px] ">
                <SkillBasedParameter
                  forEdit={true}
                  selectedData={skillParameterData}
                  setSelectedData={setSkillParameterData}
                  categories={skillCategories}
                />

                <ItemEarningParameter
                  forEdit={true}
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
        </div>
      </Layout>
    </div>
  );
};

export default EditAssignment;
