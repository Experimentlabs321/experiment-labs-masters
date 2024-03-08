import React from "react";

const Instructions = ({ instructions }) => {
  return (
    <div>
      <div className="px-4 mt-4 textEditor">
        <div dangerouslySetInnerHTML={{ __html: instructions }} />
      </div>
    </div>
  );
};

export default Instructions;
