import React from "react";
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
  return (
    <div>
      <Layout>
        <div>
          <div className="py-[65px]">
            <SkillsStatistics skillsData={skillsData} />
            <Tailored />
            <FeedbackAndSession />
            <FAQs Faqs={Faqs} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SkillAnalysis;
