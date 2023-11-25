import React, { useEffect, useRef } from "react";

import ReactGA from "react-ga4";
import MyHelmet from "../../../../Components/MyHelmet/MyHelpmet";
import OnePagerHero from "./OnePagerHero";
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
import OnePagerMeetTheMaster from "./OnePagerMeetTheMaster";
import Reviews from "./Reviews";
import PeopleSpeak from "./PeopleSpeak";



const OnePagerHome = () => {

  const data = {
    heroData: {
      // heroImg: heroImg,
      heroTitle: "Discover Your Path to a Successful Career with Real-World Experience",
      heroDescription: "Build leadership like a muscle",
      heroButton: "Learn More",
    },

    meetTheMasterData: [

      {
        masterName: "Shekhar gupta",
        profession: "Ex-Group Product Manager, Nykaa",
        masterImage: guptaImg,
        logo: guptaLogo

      },
      {
        masterName: "Pulkit Handa",
        profession: "Director-Sales, Magicpin",
        masterImage: handaImg,
        logo: handaLogo

      },
      {
        masterName: "Naman Jain",
        profession: "Founder, Experiment Labs",
        masterImage: jainImg,
        logo: jainLogo

      },
      {
        masterName: "Aayush Garg",
        profession: "Ex-Head of Growth, Zilingo",
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
        comment: "Experiment Labs provided an unparalleled hands-on experience. The projects challenged me to apply theoretical knowledge to real-world scenarios. The mentors were always available, guiding us through complex problem-solving. It's a fantastic environment for anyone pursuing a career in technology.",
        reviewerImage: Nikhil,

      },
      {
        reviewerName: "harsh",
        class: "10 th class Student",
        rating: "5",
        comment: "Experiment Labs has been a game-changer for my engineering studies. The practical simulations aligned perfectly with my coursework. The lab reports and feedback from mentors helped me refine my skills. I appreciate the emphasis on both individual learning and group projects, preparing us for the professional world.",
        reviewerImage: harsh,

      },

      {
        reviewerName: "Nikhil",
        class: "10 th class Student",
        rating: "5",
        comment: "The leadership class at Experiment Labs has been a transformative experience for me. The hands-on approach to learning has allowed me to apply leadership principles in real-world scenarios. The simulations and team projects have not only honed my leadership skills but also provided insights into my own strengths and areas for improvement. .",
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
      <OnePagerHero />
      <OnePagerMeetTheMaster meetTheMasterData={data.meetTheMasterData} />
      <Reviews reviewsData={data.reviewsData} />
      <PeopleSpeak peopleSpeakData={data.peopleSpeakData} />
    </div>
  );
};

export default OnePagerHome;
