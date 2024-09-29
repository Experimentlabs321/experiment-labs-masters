import React, { useState } from "react";
import SES from "./EmailComponents/SES";

const ComponentB = () => (
  <div className="mt-4 p-4 w-full text-center font-bold text-red-600 text-3xl rounded-lg">
    Coming Soon
  </div>
);

const EmailIntegration = ({ orgData }) => {
  const [selectedOption, setSelectedOption] = useState("");

  // console.log(orgData);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case "ses":
        return <SES orgData={orgData} />;
      case "brevo":
        return <ComponentB />;
      default:
        return <div className="mt-4"></div>;
    }
  };

  return (
    <div className="flex flex-col items-start justify-center px-4 mt-6 w-full">
      <div className="flex items-center gap-3">
        <label htmlFor="mailOption" className="font-bold">
          Select An Option
        </label>
        <select
          id="mailOption"
          onChange={handleChange}
          className="form-select block px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Email Option</option>
          <option value="brevo">Brevo</option>
          <option value="ses">AWS SES</option>
        </select>
      </div>
      {renderComponent()}
    </div>
  );
};

export default EmailIntegration;
