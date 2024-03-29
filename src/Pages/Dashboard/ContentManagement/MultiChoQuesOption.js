import React, { useEffect, useState } from "react";
import required from "../../../assets/ContentManagement/required.png";
import TextEditor from "../../Shared/TextEditor/TextEditor";

const MultiChoQuesOption = ({
  index,
  answer,
  editingQueInfo,
  options,
  setOptions,
}) => {
  const [answerFormula, setAnswerFormula] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (index, value, name) => {
    const newOptions = [...options];
    newOptions[index][name] = value;
    setOptions(newOptions);
  };

  useEffect(() => {
    if (answerFormula) {
      handleInputChange(index, answerFormula, "answerFormula");
    }
    if (feedback) {
      handleInputChange(index, feedback, "feedback");
    }
  }, [answerFormula, feedback]);

  useEffect(() => {
    if (answer) {
      setAnswerFormula(answer?.answerFormula);
      setFeedback(answer?.feedback);
    }
  }, [answer]);
  return (
    <div className="dropdown-menu mt-[71px] mb-[45px] flex justify-between  bg-[#F7F7F7] p-5 rounded-lg">
      {/* Content of the div */}
      <div className="">
        <div className="">
          <div className="flex items-center gap-4">
            <p className="h-2 w-2 bg-black rounded-full"></p>
            <p className="font-bold text-lg">Choice {index + 1}</p>
            <img src={required} alt="required" />
          </div>
          {/* Text editor for answerFormula */}
          {answerFormula && (
            <div className="mt-10">
              <div
                key={`answerFormula${index}${editingQueInfo?._id}${answerFormula}`}
                className="bg-white text-black textEditor"
              >
                {/* Pass props to the TextEditor component */}
                <TextEditor value={answerFormula} setValue={setAnswerFormula} />
              </div>
            </div>
          )}
        </div>
        <div className="mt-20 ">
          <div className="flex items-center gap-4">
            <p className="h-2 w-2 bg-black rounded-full"></p>
            <p className="font-semibold text-[#000000]  py-2">Answer</p>
            <img src={required} alt="required" />
          </div>
          <div className=" items-center flex gap-2  mt-2 ms-6  w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
            <div className="flex gap-2">
              <input
                type="radio"
                id={`wrong${index}`}
                name={`answer${index}`}
                value="wrong"
                checked={answer.answer === "wrong"}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, "answer")
                }
              />
              <label htmlFor={`wrong${index}`}> Wrong</label>
            </div>
            <div className="flex gap-2 ms-[55px]">
              <input
                type="radio"
                id={`correct${index}`}
                name={`answer${index}`}
                value="correct"
                checked={answer.answer === "correct"}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, "answer")
                }
              />
              <label htmlFor={`correct${index}`}>Correct</label>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="">
          <div className="flex items-center gap-4">
            <p className="h-2 w-2 bg-black rounded-full"></p>
            <p className="font-bold text-lg me-[36px]">Feedback</p>
          </div>
          {/* Text editor for feedback */}
          {answer?.answerFormula && (
            <div className=" mt-10">
              <div
                key={`feedback${index}${editingQueInfo?._id}`}
                className="bg-white text-black textEditor"
              >
                {/* Pass props to the TextEditor component */}
                <TextEditor
                  value={answer?.feedback}
                  setValue={(value) =>
                    handleInputChange(index, value, "feedback")
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiChoQuesOption;
