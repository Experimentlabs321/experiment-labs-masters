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

import Nikhil from "../../../../assets/OnePager/Reviews/Nikhil.svg";
import Nikhil1 from "../../../../assets/OnePager/Reviews/Nikhil1.svg";
import harsh from "../../../../assets/OnePager/Reviews/harsh.svg";
import guptaImg from "../../../../assets/Masters/guptaImg.png";
import guptaLogo from "../../../../assets/Masters/guptaLogo.png";
import handaImg from "../../../../assets/Masters/handaImg.png";
import handaLogo from "../../../../assets/Masters/handaLogo.png";
import jainImg from "../../../../assets/Masters/jainImg.png";
import jainLogo from "../../../../assets/Masters/jainLogo.png";
import gargImg from "../../../../assets/Masters/gargImg.png";
import gargLogo from "../../../../assets/Masters/gargLogo.png";
import moulikImg from "../../../../assets/Masters/moulikImg.png";
import moulikLogo from "../../../../assets/Masters/moulikLogo.png";
import collan from "../../../../assets/collan.png";
import OnePagerH from "./OnePagerH";
import ExploreC from "./ExploreC";
import LearningB from "./LearningB";
import OnePagerMeetM from "./OnePagerMeetM";
import Review from "./Review";
import PeopleS from "./PeopleS";

const OnePagerKoreaHome = () => {
    const data = {
        heroData: {
          // heroImg: heroImg,
          heroTitle: "Discover Your Path to a Successful Career with Real-World Experience",
          heroDescription: "Build leadership like a muscle",
          heroButton: "Learn More",
        },
    
        meetTheMasterData: [
    
          {
            masterName: "마스터캘리",
            profession: "디지털융합 마케터",
            masterImage: guptaImg,
            logo: guptaLogo
    
          },
          {
            masterName: "마스터캘리",
            profession: "디지털융합 마케터",
            masterImage: handaImg,
            logo: handaLogo
    
          },
          {
            masterName: "마스터캘리",
            profession: "디지털융합 마케터",
            masterImage: jainImg,
            logo: jainLogo
    
          },
          {
            masterName: "마스터캘리",
            profession: "디지털융합 마케터",
            masterImage: gargImg,
            logo: gargLogo
    
          },
          /*   {
              masterName: "Siddharth Moulik",
              profession : "Ad Film Director",
              masterImage : moulikImg,
              logo : moulikLogo
             
            }, */
    
    
        ],
    
        reviewsData: [
    
          {
            reviewerName: "Nikhil",
            class: "9 th class student",
            rating: "5",
            comment: "지식 크리에이터 창업 과정은 효과적인 콘텐츠 전략과 마케팅 기술을 배울 수 있는 훌륭한 기회였습니다. 강의는 실전 중심이어서 실무에 바로 적용 가능하며, 업계 전문가들의 피드백은 매우 가치 있었습니다.",
            reviewerImage: Nikhil,
    
          },
          {
            reviewerName: "harsh",
            class: "10 th class Student",
            rating: "5",
            comment: "브랜드 홍보와 콘텐츠 제작에서 더욱 자신감을 가질 수 있게 되었습니다. 강사들의 열정과 업계 동향에 대한 최신 정보는 창업자로서의 비전을 높이는 데 큰 도움이 되었습니다",
            reviewerImage: harsh,
    
          },
    
          {
            reviewerName: "Nikhil",
            class: "10 th class Student",
            rating: "5",
            comment: "지식 크리에이터 창업 과정에서는 다양한 플랫폼을 활용하는 방법과 유익한 네트워킹 기회를 제공받았습니다. 이는 나에게 새로운 협업 기회를 만들어 주었고, 다양한 분야의 전문가들과 소통하는 데 도움이 되었습니다.",
            reviewerImage: Nikhil1,
    
          },
    
        ],
    
    
        peopleSpeakData: {
          image: collan,
          organizationName: "Experiment Labs",
          reviews: [
            {
              videoLink: "https://www.youtube.com/embed/lKkFKWQvaLs"
            },
            {
              videoLink: "https://www.youtube.com/embed/B4QHMqNAP2g"
            },
            {
              videoLink: "https://www.youtube.com/embed/wa617J4UUpw"
            },
          ]
        },
        CourseInfoData: {
          courseInfoTick: tick,
          courseInfoOutHeading: "코스 소개",
          courseInfoOutUnderHeading: "인기 코스",
          courseInfoInHeading: "모든 코스 보기",
          courseInfoInHeadline: "코스",
          courseInfoInTitle: "성공적인 1인 지식 크리에이터 창업 마스터클래스",
          courseInfoInDescription: "나의 지식과 노하우를 수익화하는 방법을 콘텐츠 기획부터 마케팅까지 상세하게 알려드립니다.",
          courseInfoInShowMoreButton: "더 알아보기",
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
          learnerBenefitHeading: "코스 수강을 통해 얻게 되는 것",
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
                "크리에이터 이코노미의 전망과 비전",
                "지식 크리에이터에게 필요한 기술과 역량",
                "지식 크리에이터 성공사례"
              ],
              benefitSystem: [
                {
                  sysicon: gameIcon,
                  description: "개별 진도 관리",
                },
                {
                  sysicon: businessIcon,
                  description: "비즈니스 전략 컨설팅",
                },
              ]
            },
            {
              icon: benefitIcon2,
              description: [
                "트렌드 분석과 시장 조사",
                "독특한 콘텐츠 아이디어 개발",
                "대상 독자를 고려한 콘텐츠 전략 수립"
              ],
              benefitSystem: [
                {
                  sysicon: chalkboardIcon,
                  description: "일대일 멘토링"
                },
                {
                  sysicon: compuerIcon,
                  description: "디지털 플랫폼 지원"
                },
              ]
            },
            {
              icon: benefitIcon3,
              description: [
                "개인 브랜딩의 중요성",
                "소셜 미디어 활용 전략",
                "마케팅 및 홍보 전략"
              ],
              benefitSystem: [
                {
                  sysicon: leaderIcon,
                  description: "마케팅 전략 상담"
                },
                {
                  sysicon: questionIcon,
                  description: "네트워킹"
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
          <OnePagerH />
          <ExploreC courseInfoData={data?.CourseInfoData}></ExploreC>
          <LearningB learnerBenefitData={data?.LearnerBenefitData}></LearningB>
          <OnePagerMeetM meetTheMasterData={data?.meetTheMasterData} />
          <Review reviewsData={data?.reviewsData} />
          <PeopleS peopleSpeakData={data?.peopleSpeakData} />
        </div>
      );
};

export default OnePagerKoreaHome;