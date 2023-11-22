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
      title : "aaaaaaaaaaxaxkaop"
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
    featureData: {
      images: {
        img1: img1,
        img2: img2,
        img3: img3,
        imgL1: imgL1,
        imgL2: imgL2,
        imgL3: imgL3,
      }
    },
    lifeAtUnionData: {
      collan: collan
    },
    MeetTheMaster : {
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
    },
    takeTest : {
      takeTestImage : takeTestImage
    }


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
      <TakeTest takeTest={data.takeTest}/>
      <AllCourses allCoursesData={data.allCoursesData} />
      {/* <AiTutor/> */}
      <MeetTheMaster MeetTheMaster={data.MeetTheMaster}/>
      <CEOChallenge />
      <LifeAtUnion lifeAtUnionData={data.lifeAtUnionData}/>
      <Campus />
      {/* <ExperienceUnion/> */}
    </div>
  );
};

export default ExperimentLabsHome;
