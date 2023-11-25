import React, { useEffect, useRef } from "react";

import ReactGA from "react-ga4";
import MyHelmet from "../../../../Components/MyHelmet/MyHelpmet";
import tick from "../../../../assets/OnePager/CourseInfo/material-symbols_done.svg";
import rupee from "../../../../assets/OnePager/CourseInfo/mdi_rupee.svg";
import benefitIcon1 from "../../../../assets/OnePager/LearnerBenefit/benefitIcon1.svg";
import benefitIcon2 from "../../../../assets/OnePager/LearnerBenefit/benefitIcon2.svg";
import benefitIcon3 from "../../../../assets/OnePager/LearnerBenefit/benefitIcon3.svg";
import ellipse from "../../../../assets/OnePager/LearnerBenefit/Ellipse.svg";
import gameIcon from "../../../../assets/OnePager/LearnerBenefit/lets-icons_gamepad-light.svg";
import businessIcon from "../../../../assets/OnePager/LearnerBenefit/material-symbols-light_business-center-outline.svg";
import chalkboardIcon from "../../../../assets/OnePager/LearnerBenefit/la_chalkboard-teacher.svg";
import leaderIcon from "../../../../assets/OnePager/LearnerBenefit/fluent-mdl2_party-leader.svg";
import compuerIcon from "../../../../assets/OnePager/LearnerBenefit/material-symbols-light_computer-outline.svg";
import questionIcon from "../../../../assets/OnePager/LearnerBenefit/radix-icons_question-mark-circled.svg";

import ExploreCourse from "./ExploreCourse";
import LearningBenefit from "./LearningBenefit";

const OnePagerHome = () => {

  const data = {
    CourseInfoData: {
      courseInfoTick: tick,
      courseInfoOutHeading: "Explore our Courses",
      courseInfoOutUnderHeading: "Most students choice",
      courseInfoInHeading: "Get all Subject knowledge",
      courseInfoInHeadline: "Course",
      courseInfoInTitle: "Learn valuable subjects to build a successful career.",
      courseInfoInDescription: "Make your career interesting and pursue an in-demand profession with our professional teachers to gain knowledge.",
      courseInfoInShowMoreButton: "Show more",
      courseInfoInOutline: "Course Subjects",
      courseInfoPriceIcon: rupee,
      courseInfoPrice: "770.00",
      courseInfoButton: "Enroll now",
      courseInfoSubjects: [
        "Business",
        "Creative suit",
        "Legal",
        "Technology",
      ]
    },
    LearnerBenefitData: {
      learnerBenefitHeading: "Learning Benefits",
      learnerBenefitEllipse: ellipse,
      // benefitSystem : [
      //   {
      //     sysicon :  gameIcon,
      //     description : "Gamified Learning"
      //   },
      //   {
      //     sysicon :  businessIcon,
      //     description : "Business study"
      //   },
      //   {
      //     sysicon :  chalkboardIcon,
      //     description : "1:1 Mentorship"
      //   },
      //   {
      //     sysicon :  compuerIcon,
      //     description : "Technology"
      //   },
      //   {
      //     sysicon :  leaderIcon,
      //     description : "Leadership"
      //   },
      //   {
      //     sysicon :  questionIcon,
      //     description : "Problem solving"
      //   },

      // ],
      benefitDetails: [
        {
          icon: benefitIcon1,
          description: [
            "Understand core business concepts.",
            "Learn strategic planning and decision-making.",
            "Gain insights into market analysis and competition."
          ],
          benefitSystem: [
            {
              sysicon: gameIcon,
              description: "Gamified Learning",
            },
            {
              sysicon: businessIcon,
              description: "Business study",
            },
          ]
        },
        {
          icon: benefitIcon2,
          description: [
            "Gain proficiency in industry-relevant software.",
            "Develop creative problem-solving abilities.",
            "Enhance presentation and communication skills."
          ],
          benefitSystem: [
            {
              sysicon: chalkboardIcon,
              description: "1:1 Mentorship"
            },
            {
              sysicon: compuerIcon,
              description: "Technology"
            },
          ]
        },
        {
          icon: benefitIcon3,
          description: [
            "Learn about emerging technologies.",
            "Gain proficiency in industry-relevant software.",
            "Acquire technical skills for modern workplaces."
          ],
          benefitSystem: [
            {
              sysicon: leaderIcon,
              description: "Leadership"
            },
            {
              sysicon: questionIcon,
              description: "Problem solving"
            }
          ]
        },
      ],
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
  }, []);

  return (
    <div style={{ width: "100%" }} className="bg-white text-black">
      <MyHelmet>
        Experiment Labs | Career Counselling | Sell Online courses
      </MyHelmet>
      <ExploreCourse courseInfoData={data.CourseInfoData}></ExploreCourse>
      <LearningBenefit learnerBenefitData={data.LearnerBenefitData}></LearningBenefit>
    </div>
  );
};

export default OnePagerHome;
