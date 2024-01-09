import React from "react";
import MyHelmet from "../../Components/MyHelmet/MyHelpmet";

const InternShips = () => {
  return (
    <>
      <MyHelmet>Experiment Labs Internship Portal</MyHelmet>
      <iframe
        className="h-full w-full min-h-[100vh]"
        src={`https://experimentlabsinternshipportal.web.app/organization/6592c0dd78cc2e19998da1a8`}
        width="100%"
        height="100%"
        title="Experiment Labs Internship Portal"
      ></iframe>
    </>
  );
};

export default InternShips;
