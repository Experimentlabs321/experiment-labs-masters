import React, { useState } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const CopyToClipBoard = ({ fieldName, textToCopy }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(!copySuccess);
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 p-1 rounded-lg">
      <div className="flex flex-row-reverse items-center bg-white p-3 rounded-lg shadow-lg text-center gap-2">
        <p className="text-lg">
          <strong>{fieldName}: </strong>
          {textToCopy}
        </p>
        <button
          onClick={handleCopy}
          className=""
        >
          {copySuccess ? <AssignmentTurnedInIcon /> : <ContentPasteIcon />}
        </button>
      </div>
    </div>
  );
};

export default CopyToClipBoard;
