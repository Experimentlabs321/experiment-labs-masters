import React, { useEffect, useState } from "react";

const Parameters = ({
  skillCategories,
  allParameters,
  parameters,
  setParameters,
  itemDetails,
}) => {
  const [evaluation, setEvaluation] = useState("");
  const [evaluationDropdown, setEvaluationDropdown] = useState(false);

  const handleEvaluationInputChange = (event) => {
    setEvaluation(event.target.value);
  };

  const handleEvaluationSelectParameter = (item) => {
    setEvaluation(item);
    if (parameters?.find((parameter) => parameter === item)) {
      // console.log(parameters);
    } else setParameters([...parameters, item]);
    setEvaluation("");
    setEvaluationDropdown(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // console.log("Enter key pressed in input!");
      // You can add any logic you want here
    }
  };

  const addParameters = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.length > 0) {
        if (
          e.target.value === "" ||
          parameters.indexOf(e.target.value) !== -1
        ) {
          e.target.value = "";
          return;
        }
        setParameters([...parameters, e.target.value]);
        e.target.value = "";
      }
    }
    if (e.key === ",") {
      if (e.target.value.length > 0) {
        if (
          e.target.value === "" ||
          parameters.indexOf(
            e.target.value.substring(0, e.target.value.length - 1)
          ) !== -1 ||
          e.target.value === ","
        ) {
          e.target.value = "";
          return;
        }
        setParameters([
          ...parameters,
          e.target.value.substring(0, e.target.value.length - 1),
        ]);
        e.target.value = "";
      }
    }
  };

  const removeParameters = (removedTag) => {
    const newParameters = parameters.filter((tag) => tag !== removedTag);
    setParameters(newParameters);
  };

  return (
    <>
      <div className="relative">
        <label className="text-[16px] font-[600]" htmlFor="case">
          {itemDetails?.evaluationOn
            ? itemDetails?.evaluationOn
            : "Evaluation on"}
        </label>
        <input
          onKeyPress={handleKeyPress}
          onKeyUp={addParameters}
          onChange={handleEvaluationInputChange}
          onFocus={() => setEvaluationDropdown(true)}
          onBlur={() => setEvaluationDropdown(false)}
          name="Parameters"
          placeholder="Parameters"
          className="block w-full px-4 py-2 mt-2 rounded-md border bg-white border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
        />
        {evaluationDropdown && (
          <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[200px] overflow-y-auto">
            {allParameters
              ?.filter((parameter) =>
                parameter?.toLowerCase()?.includes(evaluation?.toLowerCase())
              )
              .map((parameter, index) => (
                <div
                  key={index}
                  className={` px-4 py-2 cursor-pointer hover:bg-gray-100`}
                  onMouseDown={() => handleEvaluationSelectParameter(parameter)}
                >
                  {parameter}
                </div>
              ))}
          </div>
        )}
        {parameters[0] && (
          <div className="tag-container my-2 flex flex-wrap rounded-lg border-2 p-2">
            {parameters?.map((parameter, index) => {
              return (
                <div
                  key={index}
                  className="m-1 h-fit rounded-lg border-2 py-1 px-2"
                >
                  {parameter}{" "}
                  <span
                    className="cursor-pointer pl-1 text-xl font-bold"
                    onClick={() => removeParameters(parameter)}
                  >
                    ×
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Parameters;
