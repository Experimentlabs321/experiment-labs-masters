import React, { useEffect, useRef } from "react";

import ReactGA from "react-ga4";
import MyHelmet from "../../../../Components/MyHelmet/MyHelpmet";



const OnePagerHome = () => {
 



  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
  }, []);

  return (
    <div style={{ width: "100%" }} className="bg-dark text-white">
      <MyHelmet>
        Experiment Labs | Career Counselling | Sell Online courses
      </MyHelmet>
   
    </div>
  );
};

export default OnePagerHome;
