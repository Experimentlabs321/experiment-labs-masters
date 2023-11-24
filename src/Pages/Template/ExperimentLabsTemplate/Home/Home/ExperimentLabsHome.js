import React, { useEffect, useRef } from "react";
//import MyHelmet from "../../../../Components/MyHelmet/MyHelpmet";
import Hero from "../Hero/Hero";
import Feature from "../Feature/Feature";
import TakeTest from "../TakeTest/TakeTest";
import AllCourses from "../AllCourses/AllCourses";
import AiTutor from "../AIiTutor/AiTutor";
import MeetTheMaster from "../MeetTheMasters/MeetTheMaster";
import CEOChallenge from "../CEOChallenge/CEOChallenge";
import LifeAtUnion from "../LifeAtUnion/LifeAtUnion";
//import ExperienceUnion from "../ExperienceUnion/ExperienceUnion";
//import Campus from "../../SciencePage/Campus/Campus";
import ReactGA from "react-ga4";
import heroImg from "../../../../../assets/heroImg.png";
import oneLogo1 from "../../../../../assets/logog/Gift a song 1.png";
import oneLogo2 from "../../../../../assets/logog/logo2 1.png";
import oneLogo3 from "../../../../../assets/logog/logo-png 1.png";
import techLearnt from "../../../../../assets/logog/Group 2860107.png";
import pathImg from "../../../../../assets/logog/Clip path group.png";
import collegeImg from "../../../../../assets/logog/colleges.png";
import competition from "../../../../../assets/logog/competition.png";
import gamifiedImg from "../../../../../assets/logog/gamifiedImg.png";
import prizeImg from "../../../../../assets/logog/prizeImg.png";
import img1 from "../../../../../assets/feature/Rectangle 28.png";
import img2 from "../../../../../assets/feature/Rectangle 26.png";
import img3 from "../../../../../assets/feature/Rectangle 27.png";
import imgL1 from "../../../../../assets/feature/Rectangle 28L.png";
import imgL2 from "../../../../../assets/feature/Rectangle 26L.png";
import imgL3 from "../../../../../assets/feature/Rectangle 27L.png";
import collan from "../../../../../assets/collan.png";
import guptaImg from "../../../../../assets/Masters/guptaImg.png";
import guptaLogo from "../../../../../assets/Masters/guptaLogo.png";
import handaImg from "../../../../../assets/Masters/handaImg.png";
import handaLogo from "../../../../../assets/Masters/handaLogo.png";
import jainImg from "../../../../../assets/Masters/jainImg.png";
import jainLogo from "../../../../../assets/Masters/jainLogo.png";
import gargImg from "../../../../../assets/Masters/gargImg.png";
import gargLogo from "../../../../../assets/Masters/gargLogo.png";
import moulikImg from "../../../../../assets/Masters/moulikImg.png";
import moulikLogo from "../../../../../assets/Masters/moulikLogo.png";
import takeTestImage from "../../../../../assets/taket-test/Mask group.png";

import MyHelmet from "../../../../../Components/MyHelmet/MyHelpmet";
import Campus from "../../../../SciencePage/Campus/Campus";

const ExperimentLabsHome = () => {
  // const featureRef = useRef(null);

  // const handleButtonClick = () => {
  //     const featurePosition = featureRef.current.getBoundingClientRect().top;
  //     const headerHeight = 80;
  //     window.scrollTo({ top: featurePosition - headerHeight, behavior: 'smooth' });
  // };

  const data = {
    heroData: {
      heroImg: heroImg,
      heroTitle : "Discover Your Path to a Successful Career with Real-World Experience",
      heroDescription: "Build leadership like a muscle",
      heroButton : "Learn More",
    },
    allCoursesData: {
      images: {
        oneLogo1: oneLogo1,
        oneLogo2: oneLogo2,
        oneLogo3: oneLogo3,
        techLearnt: techLearnt,
        pathImg: pathImg,
        collegeImg: collegeImg,
        competition: competition,
        gamifiedImg: gamifiedImg,
        prizeImg: prizeImg,
      }

    },
    meetTheMasterData: [
   
      {
        masterName: "Shekhar gupta",
        profession : "Ex-Group Product Manager, Nykaa",
        masterImage : guptaImg,
        logo : guptaLogo
       
      },
      {
        masterName: "Pulkit Handa",
        profession : "Director-Sales, Magicpin",
        masterImage : handaImg,
        logo : handaLogo
       
      },
      {
        masterName: "Naman Jain",
        profession : "Founder, Experiment Labs",
        masterImage : jainImg,
        logo : jainLogo
       
      },
      {
        masterName: "Aayush Garg",
        profession : "Ex-Head of Growth, Zilingo",
        masterImage : gargImg,
        logo : gargLogo
       
      },
      {
        masterName: "Siddharth Moulik",
        profession : "Ad Film Director",
        masterImage : moulikImg,
        logo : moulikLogo
       
      },
     
      
    ],
    featureData: [
      // Science/Innovation
      // Commerce/Entrepreneurship
      // Humanities/Arts
      // Delete the option
      {
        category: "All",
        details: [
          {
            category: "Science/Innovation",
            title: "Leadership and career planning through innovation",
            data: [
              "12 Weeks",
              "Hybrid",
              "130+ Hours",
              "Entrance Based Selection: Olympiad",
            ],
            info: [
              "Experience 12+ careers based on 40+ Skills",
              "Build your own innovative products and learn about different innovation based careers",
              "Industry projects from Zomato, Swiggy, Nykaa and many more",
            ],
            img: img1,
            imgLg:imgL1,
            link: "/science-innovation",
          },
          {
            title: "Leadership and career planning through Business",
            category: "Commerce/Entrepreneurship",
            data: [
              "12 Weeks",
              "Hybrid",
              "130+ Hours",
              "Entrance Based Selection: Olympiad",
            ],
            info: [
              "Experience 20+ careers based on 40+ Skills",
              "Build your own ventures and learn about different business based careers and path to leadership",
              "Build Strong portfolios, chart out the best indian and international institutions and how to get admissions",
            ],
            img: img2,
            imgLg:imgL2,
            link: "/commerce-entrepreneurship/",
          },
          {
            category: "Humanities/Arts",
            title: "Leadership and career planning through Creativity",
            data: [
              "12 Weeks",
              "Hybrid",
              "130+ Hours",
              "Entrance Based Selection: Olympiad",
            ],
            info: [
              "Experience 15+ careers based on 40+ Skills",
              "Learn about different career options by experiential learning",
              "Connect with industry experts and mentors to get guidance and advice.",
            ],
            img:img3,
            imgLg:imgL3,
            link: "/humanities-arts/",
          },
        ],
      },
      {
        category: "Innovation Track",
        details: [
          {
            category: "Science/Innovation",
            title: "Leadership and career planning through innovation",
            data: [
              "12 Weeks",
              "Hybrid",
              "130+ Hours",
              "Entrance Based Selection: Olympiad",
            ],
            info: [
              "Experience 12+ careers based on 40+ Skills",
              "Build your own innovative products and learn about different innovation based careers",
              "Industry projects from Zomato, Swiggy, Nykaa and many more",
            ],
            img: img1,
            imgLg: imgL1,
            link: "/science-innovation",
          },
        ],
      },
      {
        category: "Business Track",
        details: [
          {
            title: "Leadership and career planning through Business",
            category: "Commerce/Entrepreneurship",
            data: [
              "12 Weeks",
              "Hybrid",
              "130+ Hours",
              "Entrance Based Selection: Olympiad",
            ],
            info: [
              "Experience 20+ careers based on 40+ Skills",
              "Build your own ventures and learn about different business based careers and path to leadership",
              "Build Strong portfolios, chart out the best indian and international institutions and how to get admissions",
            ],
            img: img2,
            imgLg:imgL2,
            link: "/commerce-entrepreneurship/",
          },
        ],
      },
      {
        category: "Creative Track",
        details: [
          {
            category: "Humanities/Arts",
            title: "Leadership and career planning through Creativity",
            data: [
              "12 Weeks",
              "Hybrid",
              "130+ Hours",
              "Entrance Based Selection: Olympiad",
            ],
            info: [
              "Experience 15+ careers based on 40+ Skills",
              "Learn about different career options by experiential learning",
              "Connect with industry experts and mentors to get guidance and advice.",
            ],
            img: img3,
            imgLg: imgL3,
            link: "/humanities-arts/",
          },
        ],
      },
    ],

    lifeAtUnionData: {
      image: collan,
      organizationName : "Experiment Labs",
      reviews : [
        {
          videoLink : "https://www.youtube.com/embed/lKkFKWQvaLs"
        },
        {
          videoLink : "https://www.youtube.com/embed/B4QHMqNAP2g"
        },
        {
          videoLink : "https://www.youtube.com/embed/wa617J4UUpw"
        },
      ]
    },
  /*   MeetTheMaster : {
      images : {
        guptaImg : guptaImg,
        guptaLogo : guptaLogo,
        handaImg : handaImg,
        handaLogo : handaLogo,
        jainImg : jainImg,
        jainLogo : jainLogo,
        gargImg : gargImg,
        gargLogo : gargLogo,
        moulikImg : moulikImg,
        moulikLogo : moulikLogo,
      }
    }, */
    takeTestData : {
      takeTestImage : takeTestImage,
      takeTestButton : "Take Test",
      takeTestHeading : "Take a free personality Evaluation test & Book a 1 on 1 counseling session.",
    },
    ceoChallengeData : {
      ceoChallengeTitle:  "Unlock the world of Potential Career Options!",
      ceoChallengeDescription : "Download our career PDF and delve deeper into the career options available for you",
      ceoChallengeButton : "Download Career Handbook",
      ceoChallengePdf : "https://drive.google.com/uc?export=download&id=16Zpw9uP_ZyWmyjuKAeEi6h11-WXrN8sl",
    },

  }

  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
  }, []);

  return (
    <div style={{ width: "100%" }} className="bg-dark text-white">
      <MyHelmet>
        Experiment Labs | Career Counselling | Sell Online courses
      </MyHelmet>
      <div className="mt-[3rem]">
        <Hero heroData={data.heroData} />
      </div>
      <div>
        <Feature featureData={data.featureData} />
      </div>
      <TakeTest takeTestData={data.takeTestData}/>
      <AllCourses allCoursesData={data.allCoursesData} />
      {/* <AiTutor/> */}
      <MeetTheMaster meetTheMasterData={data.meetTheMasterData}/>
      <CEOChallenge ceoChallengeData={data.ceoChallengeData}/>
      <LifeAtUnion lifeAtUnionData={data.lifeAtUnionData}/>
      <Campus />
      {/* <ExperienceUnion/> */}
    </div>
  );
};

export default ExperimentLabsHome;
