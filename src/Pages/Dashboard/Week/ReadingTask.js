import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
import Document from "react-pdf-js";
// import pdf from ".";

const ReadingTask = ({ readingData }) => {
  const pdfURL = "../../../assets/Dashboard/ExperimentalLabs.pdf";
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState("Category");
  const options = ["Category name"];

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };
  return (
    <div>
      <div
        className={`relative  w-[400px] mt-[40px] px-4 mb-[10px] flex items-center gap-[32px] `}
      >
        <div className=" " onClick={toggleOptions}>
          <button className="cursor-pointer bg-[#FFDB70] text-[15px] font-[600] py-[20px] px-[25px] rounded-[15px] flex items-center justify-center shadow-[0px_2px_4px_0px_#00000026]">
            Week 1: Week Name{" "}
            <svg
              className="ml-[20px]"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
            >
              <g clip-path="url(#clip0_3016_13126)">
                <path
                  d="M1.52352 5.08398L5.82231 9.38277L10.1211 5.08398"
                  stroke="#282828"
                  stroke-width="1.43293"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3016_13126">
                  <rect
                    width="12.5818"
                    height="12.5818"
                    fill="white"
                    transform="matrix(0 1 -1 0 12.6328 0.890625)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        {isOpen && (
          <ul className="absolute top-full left-0 w-full bg-gray-200 border border-gray-300 py-1 px-4 rounded mt-1 transition-opacity duration-300 ease-in-out delay-100">
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer py-2 text-[#6A6A6A] text-[14px] font-[400] "
                onClick={() => selectOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="h-full flex items-center justify-center ">
        <object
          className="  border-x-[30px] mt-[40px] border-t-[30px] border-b-[50px] rounded-lg border-[#292929]"
          data={readingData?.additionalFiles}
          type="application/pdf"
          width="865px"
          height="500px"
        >
          <p>
            Alternative text - include a link{" "}
            <a href="http://africau.edu/images/default/sample.pdf">
              to the PDF!
            </a>
          </p>
        </object>
      </div>
    </div>
  );
};

export default ReadingTask;
