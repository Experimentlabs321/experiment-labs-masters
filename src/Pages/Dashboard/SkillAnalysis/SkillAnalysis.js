import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import FluentCommunication from "../../../assets/Dashboard/FluentCommunication.png";
import Teamwork from "../../../assets/Dashboard/Teamwork.png";
import Computer from "../../../assets/Dashboard/Computer.png";
import LogicalReasoning from "../../../assets/Dashboard/LogicalReasoning.png";
import Language from "../../../assets/Dashboard/Language.png";
import Science from "../../../assets/Dashboard/Science.png";
import SkillsStatistics from "./SkillsStatistics";
import Tailored from "./Tailored";
import FeedbackAndSession from "./FeedbackAndSession";
import FAQs from "./FAQs";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";

const skillsData = [
  {
    type: "Super Skills",
    themeColor: "#FFDBC1",
    subSkills: [
      {
        subSkillName: "Communication Skills",
        percentage: 30,
        icon: FluentCommunication,
      },
      {
        subSkillName: "Teamwork",
        percentage: 60,
        icon: Teamwork,
      },
    ],
  },
  {
    type: "Hard Skills",
    themeColor: "#FFC7C7",
    subSkills: [
      {
        subSkillName: "Computer Analytics",
        percentage: 80,
        icon: Computer,
      },
      {
        subSkillName: "Logical Reasoning",
        percentage: 70,
        icon: LogicalReasoning,
      },
    ],
  },
  {
    type: "Academic Skills",
    themeColor: "#BCC5FF",
    subSkills: [
      {
        subSkillName: "Language Proficiency",
        percentage: 50,
        icon: Language,
      },
      {
        subSkillName: "Science",
        percentage: 75,
        icon: Science,
      },
    ],
  },
];

const Faqs = [
  {
    question: "What is the difference between my hard skills and soft skills ?",
    answer:
      "The difference between hard skills and soft skills is that hard skills are specific technical abilities or knowledge related to a particular field, while soft skills are interpersonal and transferable skills that are applicable in various situations.",
  },
  {
    question: "How can I enhance my academic skills ?",
    answer:
      "You can enhance your academic skills by setting goals, managing your time effectively, seeking help from teachers or tutors of the labs, practicing active learning techniques, and staying organized.",
  },
  {
    question:
      "How can the educational platform support students in developing both soft and hard skills?",
    answer:
      "An educational platform can support students in developing both soft and hard skills by providing interactive and engaging learning experiences, offering skill-specific courses or modules, providing feedback and assessments, and facilitating collaborative projects and activities.",
  },
  {
    question:
      "How can the Experiment Labs support students in developing personal skills?",
    answer:
      "Experiment Labs can support students in developing personal skills by providing hands-on learning opportunities, encouraging experimentation and creativity, fostering critical thinking and problem-solving skills, and promoting self-reflection and personal growth.",
  },
];

const SkillAnalysis = () => {
  const { userInfo } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/courses/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
        if (localStorage.getItem("course")) {
          const findCourse = response?.data?.find(
            (item) => item?.courseFullName === localStorage.getItem("course")
          );
          if (findCourse) {
            setSelectedCourse(findCourse);
          } else setSelectedCourse(response?.data[0]);
        } else setSelectedCourse(response?.data[0]);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  return (
    <div>
      <Layout>
        <div>
          <div className="relative inline-block w-full px-4 mb-[10px]">
            <div
              className="flex items-center justify-right mt-5 w-full "
              onClick={() => setIsOpen(!isOpen)}
            >
              <button className="cursor-pointer mt-16 lg:mt-2 bg-[#FF557A] text-[15px] font-[700] py-3 px-4 rounded-full flex items-center justify-center shadow-[0px_2px_4px_0px_#00000026]">
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
              <ul className="absolute  top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100 z-10 ">
                {courses?.map((option, index) => (
                  <li
                    key={index}
                    className="cursor-pointer py-2 text-[#6A6A6A] text-[14px] font-[400] "
                    onClick={() => {
                      setSelectedCourse(option);
                      localStorage.setItem("course", option?.courseFullName);
                    }}
                  >
                    {option?.courseFullName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="pb-[65px] pt-[30px] ">
            <SkillsStatistics
              selectedCourse={selectedCourse}
              skillsData={skillsData}
            />
            {/* <Tailored /> */}
            {/* <FeedbackAndSession /> */}
            {/* <FAQs Faqs={Faqs} /> */}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SkillAnalysis;
