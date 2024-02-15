import React, { useEffect, useRef } from "react";
import MyHelmet from "../../../Components/MyHelmet/MyHelpmet";
import Hero from "../Hero/Hero";
import Feature from "../Feature/Feature";
import TakeTest from "../TakeTest/TakeTest";
import AllCourses from "../AllCourses/AllCourses";
import AiTutor from "../AIiTutor/AiTutor";
import MeetTheMaster from "../MeetTheMasters/MeetTheMaster";
import CEOChallenge from "../CEOChallenge/CEOChallenge";
import LifeAtUnion from "../LifeAtUnion/LifeAtUnion";
import ExperienceUnion from "../ExperienceUnion/ExperienceUnion";
import Campus from "../../SciencePage/Campus/Campus";
import ReactGA from "react-ga4";
import { useNavigate } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
const Home = () => {
  const navigate = useNavigate();
  const session = useSession();
  // const featureRef = useRef(null);

  // const handleButtonClick = () => {
  //     const featurePosition = featureRef.current.getBoundingClientRect().top;
  //     const headerHeight = 80;
  //     window.scrollTo({ top: featurePosition - headerHeight, behavior: 'smooth' });
  // };
  useEffect(() => {
    const handleRedirectAfterSignIn = () => {
      // If the user is signed in
      if (session?.user) {
        const preAuthUrl = localStorage.getItem('preAuthUrl');
        if (preAuthUrl) {
          navigate(preAuthUrl);
          localStorage.removeItem('preAuthUrl'); // Clean up
        }
      }
    };

    // Call the redirect handler when the component mounts and whenever the session changes
    handleRedirectAfterSignIn();
  }, [session, navigate]);
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
        <Hero />
      </div>
      <div>
        <Feature />
      </div>
      <TakeTest />
      <AllCourses />
      {/* <AiTutor/> */}
      <MeetTheMaster />
      <CEOChallenge />
      <LifeAtUnion />
      <Campus />
      {/* <ExperienceUnion/> */}
    </div>
  );
};

export default Home;
