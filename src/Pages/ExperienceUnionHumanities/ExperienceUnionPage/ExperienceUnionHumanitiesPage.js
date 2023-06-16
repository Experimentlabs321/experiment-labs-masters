import React from "react";
import { useEffect } from "react";
import Footer from "../../Shared/Footer/Footer";
import ExperienceUnionNav from "../ExperienceUnionNav/ExperienceUnionNav";
import ExperienceUnionHero from "../EcperienceUnionHero/ExperienceUnionHero";
import MyHelmet from "../../../Components/MyHelmet/MyHelpmet";
import SummerStartUp from "../SummerStartUp/SummerStartUp";
import Timeline from "../Timeline/Timeline";
import EUFooter from "../EUFooter/EUFooter";

const ExperienceUnionHumanitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg- h-[100vh]">
      <MyHelmet>Experience Union</MyHelmet>
      <ExperienceUnionNav />

      {/* <div>
                <ExperienceUnionHero/>
            </div> */}
      <SummerStartUp />

      <div className="my-32">
        <Timeline />
      </div>

      <EUFooter />
    </div>
  );
};

export default ExperienceUnionHumanitiesPage;
