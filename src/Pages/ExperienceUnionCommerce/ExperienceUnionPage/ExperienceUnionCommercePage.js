import React from "react";
import { useEffect } from "react";
import Footer from "../../Shared/Footer/Footer";
import ExperienceUnionNav from "../ExperienceUnionNav/ExperienceUnionNav";
import ExperienceUnionHero from "../EcperienceUnionHero/ExperienceUnionHero";
import MyHelmet from "../../../Components/MyHelmet/MyHelpmet";
import SummerStartUp from "../SummerStartUp/SummerStartUp";
import Timeline from "../Timeline/Timeline";
import EUFooter from "../EUFooter/EUFooter";
import ReactGA from "react-ga4";

const ExperienceUnionCommercePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.send({
      hitType: "pageview",
      page: "/businessLab-landingPage",
      title: "Business Lab by Experiment Labs",
    });
  }, []);

  return (
    <div className="bg- h-[100vh]">
      <MyHelmet>Experience Union</MyHelmet>
      <ExperienceUnionNav />

      {/* <div>
                <ExperienceUnionHero/>
            </div> */}
      <SummerStartUp />

      <Timeline />

      <EUFooter />
    </div>
  );
};

export default ExperienceUnionCommercePage;
