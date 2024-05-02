import Layout from "../Layout";
import required from "../../../assets/ContentManagement/required.png";
import youtube from "../../../assets/ContentManagement/youtube.svg";
import Audioimg from "../../../assets/ContentManagement/audio.png";
import { useContext, useEffect, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import QuizGeneralInformation from "./QuizGeneralInformation";
import QuizResult from "./QuizResult";
import QuizEvaluationParameter from "./QuizEvaluationParameter";
import ManageQuestionBank from "./ManageQuestionBank";
import ManageQuestion from "./ManageQuestion";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import Swal from "sweetalert2";

const ManageQuiz = () => {
  const [selectedTab, setSelectedTab] = useState("Quiz General Information");
  const { user, userInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [chapter, setChapter] = useState({});
  const [skillCategories, setSkillCategories] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [skillParameterData, setSkillParameterData] = useState([]);
  const [earningParameterData, setEarningParameterData] = useState([]);
  const [course, setCourse] = useState({});
  const [preview, setPreview] = useState(false);
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [orgData, setOrgData] = useState({});
  const [taskDrip, setTaskDrip] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/chapter/${id}`)
      .then((response) => {
        setChapter(response?.data);
        const fetchData = {
          organizationId: userInfo?.organizationId,
          courseId: response?.data?.courseId,
        };
        if (fetchData && userInfo?.organizationId && chapter?.courseId) {
          axios
            .get(
              `${process.env.REACT_APP_SERVER_API}/api/v1/skillCategories/organizationId/${fetchData?.organizationId}/courseId/${fetchData?.courseId}`,
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
  }, [id, userInfo, userInfo?.email]);

  useEffect(() => {
    if (chapter?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${chapter?.courseId}`
        )
        .then((response) => {
          setCourse(response?.data);
        });
  }, [chapter]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${chapter?.courseId}`
      )
      .then((response) => {
        setBatchesData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [chapter]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
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
                  to={`/questLevels/${course?._id}`}
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  {course?.courseFullName}
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
                  {chapter?.chapterName}
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
        <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
          <p>Manage Quiz in Topic 1</p>
        </div>
        <div className="px-10 flex  justify-between pb-3 text-lg">
          <button
            onClick={() => handleTabClick("Quiz General Information")}
            style={{
              fontWeight:
                selectedTab === "Quiz General Information" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Quiz General Information"
                  ? "2px solid black"
                  : "none",
            }}
          >
            Quiz General Information
          </button>
          <button
            onClick={() => {
              Swal.fire({
                title: "Please Save General Information",
                text: "You have to save the general information before adding other information.",
                icon: "warning",
              });
            }}
            style={{
              fontWeight: selectedTab === "Questions" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Questions" ? "2px solid black" : "none",
            }}
          >
            Questions
          </button>
          <button
            onClick={() => {
              Swal.fire({
                title: "Please Save General Information",
                text: "You have to save the general information before adding other information.",
                icon: "warning",
              });
            }}
            style={{
              fontWeight: selectedTab === "Question Bank" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Question Bank" ? "2px solid black" : "none",
            }}
          >
            Question Bank
          </button>
          <button
            onClick={() => {
              Swal.fire({
                title: "Please Save General Information",
                text: "You have to save the general information before adding other information.",
                icon: "warning",
              });
            }}
            style={{
              fontWeight: selectedTab === "Results" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Results" ? "2px solid black" : "none",
            }}
          >
            Results
          </button>
          <button
            onClick={() => {
              Swal.fire({
                title: "Please Save General Information",
                text: "You have to save the general information before adding other information.",
                icon: "warning",
              });
            }}
            style={{
              fontWeight:
                selectedTab === "Evaluation Parameter" ? "bold" : "normal",
              borderBottom:
                selectedTab === "Evaluation Parameter"
                  ? "2px solid black"
                  : "none",
            }}
          >
            Evaluation Parameter
          </button>
        </div>

        {selectedTab === "Quiz General Information" && (
          <QuizGeneralInformation />
        )}
        {selectedTab === "Results" && <QuizResult />}
        {selectedTab === "Evaluation Parameter" && <QuizEvaluationParameter />}
        {selectedTab === "Question Bank" && <ManageQuestionBank />}
        {selectedTab === "Questions" && <ManageQuestion />}
      </Layout>
    </div>
  );
};

export default ManageQuiz;
